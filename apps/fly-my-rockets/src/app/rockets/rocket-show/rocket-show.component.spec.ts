import { fakeAsync, tick } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { RocketShowComponent } from './rocket-show.component';
import { AreYouSureComponent } from '../../shared/are-you-sure/are-you-sure.component';

describe('RocketShowComponent', () => {
  let component: RocketShowComponent;
  let rocketService;
  let route;
  let router;
  let dialog;
  let storage;
  let dialogAfterClosed;

  beforeEach(() => {
    rocketService = {
      removeFlight: jest.fn().mockReturnValue(of({})),
      deleteRocket: jest.fn().mockReturnValue(of({})),
      updateRocket: jest.fn().mockReturnValue(of({}))
    };
    route = { paramMap: new Subject() };
    router = { navigate: jest.fn().mockReturnValue(Promise.resolve()) };
    dialogAfterClosed = new Subject();
    dialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(dialogAfterClosed)
      })
    };
    storage = { ref: jest.fn() };
    component = new RocketShowComponent(
      rocketService,
      route,
      router,
      dialog,
      storage
    );
  });

  describe('confirmDelete', () => {
    it('opens the confirm dialog', fakeAsync(() => {
      component.confirmDelete();
      expect(dialog.open).toHaveBeenCalledWith(AreYouSureComponent, {
        data: {
          message: 'Are you sure you want to delete this rocket?',
          yesColor: 'warn'
        }
      });
      dialogAfterClosed.next(true);
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/rockets'], {
        replaceUrl: true
      });
      expect(rocketService.deleteRocket).toHaveBeenCalledWith(undefined);
    }));
  });

  describe('openRocketDialog', () => {
    it('opens the dialog and updates the rocket', () => {
      component.openRocketDialog({});
      expect(dialog.open).toHaveBeenCalled();
      dialogAfterClosed.next({ name: 'some name' });
      expect(rocketService.updateRocket).toHaveBeenCalledWith(undefined, {
        name: 'some name'
      });
    });
  });

  describe('removePhoto', () => {
    it('sets the rocket photos array to empty', () => {
      component.removePhoto();
      expect(rocketService.updateRocket).toHaveBeenCalledWith(undefined, {
        photos: []
      });
    });
  });
});
