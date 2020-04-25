import { FlightComponent } from './flight.component';
import { of, Subject } from 'rxjs';
import { FlightDialogComponent } from '../../dialogs/flight-dialog/flight-dialog.component';
import { Flight } from '../../rocket.model';

describe('FlightComponent', () => {
  let component: FlightComponent;
  let dialog;
  let rocketService;
  let dialogAfterClosed;

  beforeEach(() => {
    dialogAfterClosed = new Subject();
    dialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(dialogAfterClosed)
      })
    };
    rocketService = {
      removeFlight: jest.fn().mockReturnValue(of({})),
      updateFlight: jest.fn().mockReturnValue(of({}))
    };
    component = new FlightComponent(dialog, rocketService);
  });

  describe('openFlightDialog', () => {
    it('opens the dialog', () => {
      const flight = {};
      component.flight = flight;
      component.openFlightDialog();
      expect(dialog.open).toHaveBeenCalledWith(FlightDialogComponent, {
        width: '350px',
        data: flight
      });
    });

    it('updates the flight', () => {
      const flight = ({ date: '2020-04-19' } as unknown) as Flight;
      component.flight = flight;
      component.openFlightDialog();
      dialogAfterClosed.next({ date: '2020-04-20' });
      expect(rocketService.updateFlight).toHaveBeenCalledWith(
        undefined,
        { date: '2020-04-19' },
        { date: '2020-04-20' }
      );
    });
  });

  describe('removeFlight', () => {
    it('calls rocketService.removeFlight', () => {
      component.removeFlight({});
      expect(dialog.open).toHaveBeenCalled();
      dialogAfterClosed.next(true);
      expect(rocketService.removeFlight).toHaveBeenCalled();
    });
  });
});
