import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'fmr-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public afAuth: AngularFireAuth
  ) {}
}
