import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flight } from '../../rocket.model';

@Component({
  selector: 'fmr-flight-dialog',
  templateUrl: './flight-dialog.component.html',
  styles: [
    `
      mat-form-field {
        display: block;
      }

      .float-right {
        float: right;
      }
    `
  ]
})
export class FlightDialogComponent {
  flightForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FlightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flight,
    fb: FormBuilder
  ) {
    this.flightForm = fb.group({
      date: [data.date?.toDate(), Validators.required],
      altitude: data.altitude,
      motors: fb.array((data.motors || ['']).map(m => new FormControl(m))),
      notes: data.notes
    });
  }

  get motors(): FormArray {
    return this.flightForm.get('motors') as FormArray;
  }

  addMotor(): void {
    this.motors.push(new FormControl(''));
  }

  removeMotor(index: number): void {
    if (this.motors.length < 2) {
      return;
    }
    this.motors.removeAt(index);
  }
}
