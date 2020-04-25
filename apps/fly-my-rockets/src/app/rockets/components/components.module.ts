import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { FlightComponent } from './flight/flight.component';
import { RocketListComponent } from './rocket-list/rocket-list.component';
import { RocketShowComponent } from './rocket-show/rocket-show.component';

const components = [FlightComponent, RocketListComponent, RocketShowComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule, PipesModule],
  exports: [...components]
})
export class ComponentsModule {}
