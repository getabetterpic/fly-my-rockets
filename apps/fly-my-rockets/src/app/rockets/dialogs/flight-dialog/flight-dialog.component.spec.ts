import { FormBuilder } from '@angular/forms';
import { FlightDialogComponent } from './flight-dialog.component';

describe('FlightDialogComponent', () => {
  let component: FlightDialogComponent;
  let dialogRef;
  let data;

  beforeEach(() => {
    dialogRef = { close: jest.fn() };
    data = {};
    component = new FlightDialogComponent(dialogRef, data, new FormBuilder());
  });

  describe('addMotor', () => {
    it('adds a form control to the motors array', () => {
      component.addMotor();
      expect(component.motors.length).toEqual(2);
    });
  });

  describe('removeMotor', () => {
    it('removes a form control from the motors array', () => {
      component.addMotor();
      expect(component.motors.length).toEqual(2);
      component.removeMotor(1);
      expect(component.motors.length).toEqual(1);
    });
  });
});
