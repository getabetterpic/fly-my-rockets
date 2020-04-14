import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fmr-rocket-dialog',
  template: `
    <h1 mat-dialog-title>Rocket</h1>
    <div mat-dialog-content>
      <p>What's the name of the rocket?</p>
      <mat-form-field>
        <input type="text" placeholder="Name" matInput [(ngModel)]="data.name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="accent" [mat-dialog-close]="data.name">Create</button>
    </div>
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
