import { FlightDatePipe } from './flight-date.pipe';

describe('FlightDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FlightDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms an object that responds to toDate()', () => {
    const date = {
      toDate: () => {
        return '2020-04-20';
      }
    };
    const pipe = new FlightDatePipe();
    expect(pipe.transform(date)).toEqual('2020-04-20');
  });

  it('returns the original object if it does not respond to toDate()', () => {
    const date = '2020-04-20';
    const pipe = new FlightDatePipe();
    expect(pipe.transform(date)).toEqual('2020-04-20');
  });
});
