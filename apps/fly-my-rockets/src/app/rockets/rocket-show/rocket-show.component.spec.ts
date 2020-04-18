import { RocketShowComponent } from './rocket-show.component';
import { of, Subject } from 'rxjs';

describe('RocketShowComponent', () => {
  let component: RocketShowComponent;
  let rocketService;
  let route;
  let router;
  let dialog;
  let dialogAfterClosed;

  beforeEach(() => {
    rocketService = {
      removeFlight: jest.fn().mockReturnValue(of({})),
      deleteRocket: jest.fn().mockReturnValue(of({})),
      updateRocket: jest.fn().mockReturnValue(of({}))
    };
    route = { paramMap: new Subject() };
    router = { navigate: jest.fn() };
    dialogAfterClosed = new Subject();
    dialog = {
      open: jest.fn().mockReturnValue({ afterClosed: jest.fn().mockReturnValue(dialogAfterClosed) })
    };
    component = new RocketShowComponent(
      rocketService,
      route,
      router,
      dialog
    );
  });

  describe('removeFlight', () => {
    it('calls rocketService.removeFlight', () => {
      component.removeFlight({});
      expect(rocketService.removeFlight).toHaveBeenCalled();
    });
  });

  describe('deleteRocket', () => {
    it('deletes the rocket and navigates back to rockets', () => {
      component.deleteRocket();
      expect(rocketService.deleteRocket).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/rockets'], { replaceUrl: true });
    });
  });

  describe('openRocketDialog', () => {
    it('opens the dialog and updates the rocket', () => {
      component.openRocketDialog({});
      expect(dialog.open).toHaveBeenCalled();
      dialogAfterClosed.next('some name');
      expect(rocketService.updateRocket).toHaveBeenCalledWith(undefined, { name: 'some name' });
    });
  });
});
