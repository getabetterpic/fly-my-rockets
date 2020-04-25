import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { FlightComponent } from './flight/flight.component';
import { RocketListComponent } from './rocket-list/rocket-list.component';

@NgModule({
  declarations: [FlightComponent, RocketListComponent],
  imports: [CommonModule, SharedModule, PipesModule],
  exports: [FlightComponent, RocketListComponent]
})
export class ComponentsModule {}
