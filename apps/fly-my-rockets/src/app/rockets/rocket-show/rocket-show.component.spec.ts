import { RocketShowComponent } from './rocket-show.component';
import { of, Subject } from 'rxjs';

describe('RocketShowComponent', () => {
  let component: RocketShowComponent;
  let rocketService;
  let route;
  let dialog;

  beforeEach(() => {
    rocketService = { removeFlight: jest.fn().mockReturnValue(of({})) };
    route = { paramMap: new Subject() };
    dialog = {};
    component = new RocketShowComponent(
      rocketService,
      route,
      dialog
    );
  });

  describe('removeFlight', () => {
    it('calls rocketService.removeFlight', () => {
      component.removeFlight({});
      expect(rocketService.removeFlight).toHaveBeenCalled();
    });
  });
});
