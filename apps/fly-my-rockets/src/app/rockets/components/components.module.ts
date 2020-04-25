import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { FlightComponent } from './flight/flight.component';

@NgModule({
  declarations: [FlightComponent],
  imports: [CommonModule, SharedModule, PipesModule],
  exports: [FlightComponent]
})
export class ComponentsModule {}
