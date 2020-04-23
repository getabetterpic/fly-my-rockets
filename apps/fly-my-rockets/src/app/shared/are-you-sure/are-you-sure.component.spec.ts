import { AreYouSureComponent } from './are-you-sure.component';

describe('AreYouSureComponent', () => {
  let component: AreYouSureComponent;
  let dialogRef;
  let data;

  beforeEach(() => {
    dialogRef = { close: jest.fn() };
    data = {};
    component = new AreYouSureComponent(dialogRef, data);
  });

  describe('onNoClick', () => {
    it('closes the dialog with false', () => {
      component.onNoClick();
      expect(dialogRef.close).toHaveBeenCalledWith(false);
    });
  });

  describe('onYesClick', () => {
    it('closes the dialog with true', () => {
      component.onYesClick();
      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
