import { RocketDialogComponent } from './rocket-dialog.component';

describe('RocketDialogComponent', () => {
  let component: RocketDialogComponent;
  let dialogRef;
  let data;

  beforeEach(() => {
    dialogRef = { close: jest.fn() };
    data = {};
    component = new RocketDialogComponent(dialogRef, data);
  });

  describe('onNoClick', () => {
    it('closes the dialog', () => {
      component.onNoClick();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
