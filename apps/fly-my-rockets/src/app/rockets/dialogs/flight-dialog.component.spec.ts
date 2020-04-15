import { FlightDialogComponent } from './flight-dialog.component';

describe('FlightDialogComponent', () => {
  let component: FlightDialogComponent;
  let dialogRef;
  let data;

  beforeEach(() => {
    dialogRef = { close: jest.fn() };
    data = {};
    component = new FlightDialogComponent(dialogRef, data);
  });

  describe('onNoClick', () => {
    it('closes the dialog', () => {
      component.onNoClick();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
