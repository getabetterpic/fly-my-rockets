import { FlightNewComponent } from './flight-new.component';
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('FlightNewComponent', () => {
  let component: FlightNewComponent;
  let rocketService;
  let route;
  let router;
  let flightService;

  beforeEach(() => {
    rocketService = {};
    route = { paramMap: new Subject() };
    router = { navigate: jest.fn() };
    flightService = { createFlight: jest.fn() };
    component = new FlightNewComponent(
      new FormBuilder(),
      rocketService,
      route,
      router,
      flightService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
