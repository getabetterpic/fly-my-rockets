import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogState
} from '@angular/material/dialog';
import { PhotoUploadService } from '../../services/photo-upload/photo-upload.service';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import {
  rocketPhotoRef,
  ThumbnailSizes
} from '../../functions/rocket-photo-ref';

@Component({
  selector: 'fmr-rocket-dialog',
  templateUrl: './rocket-dialog.component.html',
  styleUrls: ['./rocket-dialog.component.scss']
})
export class RocketDialogComponent implements OnDestroy {
  rocketForm: FormGroup;
  readonly uploading$ = new BehaviorSubject(false);
  readonly processing$ = new BehaviorSubject(false);
  readonly percentComplete$ = new BehaviorSubject(0);

  private readonly destroy = new Subject();

  constructor(
    public dialogRef: MatDialogRef<RocketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private photos: PhotoUploadService,
    fb: FormBuilder
  ) {
    this.rocketForm = fb.group({
      name: [data?.name, Validators.required],
      fileToUpload: [undefined, FileValidator.maxContentSize(10 * 2 ** 19)] // ~5.24MB
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get fileToUpload(): AbstractControl {
    return this.rocketForm.get('fileToUpload');
  }

  emitRocket(): void {
    if (this.fileToUpload.value) {
      const file = this.fileToUpload.value.files[0];
      this.uploading$.next(true);
      this.photos
        .uploadRocketPhoto(file)
        .pipe(
          switchMap(upload => upload.snapshotChanges()),
          tap(snapshot => {
            const uploadPercent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.percentComplete$.next(uploadPercent);
          }),
          filter(snapshot => snapshot.bytesTransferred === snapshot.totalBytes),
          switchMap(snapshot => {
            this.uploading$.next(false);
            this.processing$.next(true);
            const thumbnail = rocketPhotoRef(
              snapshot.ref.fullPath,
              ThumbnailSizes.Medium
            );
            return this.photos.getMetadata(thumbnail).pipe(map(() => snapshot));
          }),
          takeUntil(this.destroy)
        )
        .subscribe(
          snapshot => {
            this.processing$.next(false);
            const refPath = snapshot.ref.fullPath;
            if (this.dialogRef.getState() === MatDialogState.OPEN) {
              this.dialogRef.close({
                name: this.rocketForm.get('name').value,
                photos: [refPath]
              });
            }
          },
          err => {
            console.error(err);
          }
        );
    } else {
      this.dialogRef.close({
        name: this.rocketForm.get('name').value
      });
    }
  }
}
