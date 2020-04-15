import { RocketListComponent } from './rocket-list.component';
import { of } from 'rxjs';

describe('RocketListComponent', () => {
  let component: RocketListComponent;
  let rocketService;
  let matDialog;

  beforeEach(() => {
    rocketService = { getUserRockets: jest.fn().mockReturnValue(of({})) };
    matDialog = {};
    component = new RocketListComponent(
      rocketService,
      matDialog
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
