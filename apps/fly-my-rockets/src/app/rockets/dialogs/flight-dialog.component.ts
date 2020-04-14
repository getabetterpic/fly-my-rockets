import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'fmr-flight-dialog',
  template: `
    <h1 mat-dialog-title>Flight</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput [matDatepicker]="datepicker" [(ngModel)]="data.date">
        <mat-datepicker-toggle matSuffix [for]="datepicker"></mat-datepicker-toggle>
        <mat-datepicker #datepicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <input type="tel" placeholder="Altitude" matInput [(ngModel)]="data.altitude">
      </mat-form-field>
      <mat-form-field>
        <input type="text" placeholder="Motor" matInput [(ngModel)]="data.motor">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="accent" [mat-dialog-close]="data">Create</button>
    </div>
  `,
  styles: [
  ]
})
export class FlightDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FlightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
