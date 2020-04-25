import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightDate'
})
export class FlightDatePipe implements PipeTransform {
  transform(date) {
    try {
      return date.toDate();
    } catch {
      return date;
    }
  }
}
