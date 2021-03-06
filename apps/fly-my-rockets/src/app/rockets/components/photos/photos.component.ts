import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatest, Observable } from 'rxjs';
import { Rocket } from '../../rocket.model';
import {
  rocketPhotoRef,
  ThumbnailSizes
} from '../../functions/rocket-photo-ref';
import { AngularFireStorage } from '@angular/fire/storage';
import { MultiplePhotosDialogComponent } from '../../dialogs/multiple-photos/multiple-photos-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PhotoUploadService } from '../../services/photo-upload/photo-upload.service';
import { RocketService } from '../../services/rocket/rocket.service';
import { PhotoDialogComponent } from '../../dialogs/photo-dialog/photo-dialog.component';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import { AngularFireAuth } from '@angular/fire/auth';

interface Photo {
  ref: string;
  backgroundUrl: Observable<string>;
  imageUrl: Observable<string>;
}

@Component({
  selector: 'fmr-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {
  photoUrls: Photo[] = [];
  uploading = [];
  processing = [];
  rocketId: string;
  rocketName: string;
  rocket$: Observable<Rocket> = combineLatest([
    this.route.data,
    this.route.paramMap
  ]).pipe(
    tap(([data, params]) => {
      this.rocketId = params.get('rocketId');
    }),
    map(([data]) => data.rocket),
    tap(rocket => {
      this.rocketName = rocket.name;
      this.photoUrls = (rocket.photos || []).map(photoRef => {
        const mediumRef = rocketPhotoRef(photoRef, ThumbnailSizes.Medium);
        const downloadUrl$ = this.storage
          .ref(mediumRef)
          .getDownloadURL()
          .pipe(shareReplay(1));
        return {
          ref: mediumRef,
          backgroundUrl: downloadUrl$.pipe(map(url => `url(${url})`)),
          imageUrl: downloadUrl$
        };
      });
    })
  );
  handset$ = this.breakpoints
    .observe([Breakpoints.Handset])
    .pipe(map(result => result.matches));

  constructor(
    private route: ActivatedRoute,
    private breakpoints: BreakpointObserver,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private photoUpload: PhotoUploadService,
    private rocketService: RocketService,
    public afAuth: AngularFireAuth
  ) {}

  addPhotos(): void {
    const dialogRef = this.dialog.open(MultiplePhotosDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(files => {
      if (files) {
        const uploads: Array<Observable<UploadTaskSnapshot>> = files.map(f =>
          this.photoUpload
            .uploadRocketPhoto(f)
            .pipe(switchMap(task => task.snapshotChanges()))
        );
        this.uploading = this.uploadingUploads(uploads);
        this.processing = this.processingUploads(uploads);
      }
    });
  }

  deletePhoto(photo: Photo, index: number): void {
    const originalRef = rocketPhotoRef(photo.ref, ThumbnailSizes.Original);
    this.rocketService.remotePhoto(this.rocketId, originalRef).subscribe(() => {
      this.photoUrls.splice(index, 1);
    });
  }

  showPhoto(photo: Photo): void {
    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      data: {
        photo,
        rocketName: this.rocketName
      }
    });
    dialogRef.afterClosed().subscribe(results => {
      if (results && results.delete) {
        const originalRef = rocketPhotoRef(photo.ref, ThumbnailSizes.Original);
        this.rocketService
          .remotePhoto(this.rocketId, originalRef)
          .subscribe(() => {
            const idx = this.photoUrls.indexOf(photo);
            this.photoUrls.splice(idx, 1);
          });
      }
    });
  }

  private uploadingUploads(
    uploads: Array<Observable<UploadTaskSnapshot>>
  ): Array<Observable<number>> {
    return uploads.map(u => {
      return u.pipe(
        map(snapshot => (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
    });
  }

  private processingUploads(
    uploads: Array<Observable<UploadTaskSnapshot>>
  ): Array<Observable<boolean>> {
    return uploads.map(u => {
      return u.pipe(
        filter(snapshot => {
          return (
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100 === 100
          );
        }),
        switchMap(snapshot => {
          const ref = snapshot.ref.fullPath;
          const mediumRef = rocketPhotoRef(ref, ThumbnailSizes.Medium);
          return this.photoUpload.getMetadata(mediumRef);
        }),
        switchMap(metadata => {
          const ref = metadata.fullPath;
          const originalRef = rocketPhotoRef(ref, ThumbnailSizes.Original);
          const downloadUrl$ = this.storage
            .ref(ref)
            .getDownloadURL()
            .pipe(shareReplay(1));
          this.photoUrls.push({
            ref,
            backgroundUrl: downloadUrl$.pipe(map(url => `url(${url})`)),
            imageUrl: downloadUrl$
          });
          return this.rocketService.addPhoto(this.rocketId, originalRef);
        }),
        map(() => true),
        startWith(false)
      );
    });
  }
}
