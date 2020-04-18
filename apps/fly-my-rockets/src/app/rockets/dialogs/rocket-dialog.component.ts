import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fmr-rocket-dialog',
  template: `
    <h1 mat-dialog-title>What's the name of the rocket?</h1>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input type="text" placeholder="PML Black Brant X" matInput [(ngModel)]="data.name">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button type="button" mat-raised-button (click)="onNoClick()">Cancel</button>
      <button type="submit" mat-raised-button color="accent" [mat-dialog-close]="data.name">Save</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class RocketDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RocketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
