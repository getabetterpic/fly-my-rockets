import { RocketListComponent } from './rocket-list.component';
import { of } from 'rxjs';

describe('RocketListComponent', () => {
  let component: RocketListComponent;
  let rocketService;
  let matDialog;
  let storage;

  beforeEach(() => {
    rocketService = { getUserRockets: jest.fn().mockReturnValue(of({})) };
    matDialog = {};
    storage = {};
    component = new RocketListComponent(
      rocketService,
      matDialog,
      storage
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
