import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { PhotoUploadService } from '../../services/photo-upload/photo-upload.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { fromTask } from '@angular/fire/storage';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'fmr-rocket-dialog',
  templateUrl: './rocket-dialog.component.html',
  styleUrls: ['./rocket-dialog.component.scss']
})
export class RocketDialogComponent implements OnDestroy {
  rocketForm: FormGroup;

  private readonly destroy = new Subject();

  constructor(
    public dialogRef: MatDialogRef<RocketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private photos: PhotoUploadService,
    fb: FormBuilder
  ) {
    this.rocketForm = fb.group({
      name: data?.name,
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
      this.photos.uploadRocketPhoto(file).pipe(
        switchMap(upload => upload.snapshotChanges()),
        takeUntil(this.destroy)
      ).subscribe(snapshot => {
        const refPath = snapshot.ref.fullPath;
        if (this.dialogRef.getState() === MatDialogState.OPEN && snapshot.bytesTransferred === snapshot.totalBytes) {
          this.dialogRef.close({
            name: this.rocketForm.get('name').value,
            photos: [refPath]
          });
        }
      }, (err) => {
        console.error(err);
      });
    } else {
      this.dialogRef.close({
        name: this.rocketForm.get('name').value
      });
    }
  }
}
