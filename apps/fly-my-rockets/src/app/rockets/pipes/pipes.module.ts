import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightDatePipe } from './flight-date.pipe';

@NgModule({
  declarations: [FlightDatePipe],
  imports: [CommonModule],
  exports: [FlightDatePipe]
})
export class PipesModule {}
