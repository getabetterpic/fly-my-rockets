import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;
  let afAuth;
  let db;
  let doc;
  let update;

  beforeEach(() => {
    afAuth = {};
    update = jest.fn();
    doc = jest.fn().mockReturnValue({ update });
    db = { collection: jest.fn().mockReturnValue({ doc }) }
    service = new FlightService(
      afAuth,
      db
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
