import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fmr-multiple-photos',
  templateUrl: './multiple-photos-dialog.component.html',
  styleUrls: ['./multiple-photos-dialog.component.scss']
})
export class MultiplePhotosDialogComponent {
  files = new FormControl('', Validators.required);

  constructor(private dialog: MatDialogRef<MultiplePhotosDialogComponent>) {}

  uploadPhotos(): void {
    this.dialog.close(this.files.value.files);
  }
}
