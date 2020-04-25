import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RocketsRoutingModule } from './rockets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RocketDialogComponent } from './dialogs/rocket-dialog/rocket-dialog.component';
import { FlightDialogComponent } from './dialogs/flight-dialog/flight-dialog.component';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [RocketDialogComponent, FlightDialogComponent],
  imports: [
    CommonModule,
    RocketsRoutingModule,
    SharedModule,
    PipesModule,
    ComponentsModule
  ],
  entryComponents: [FlightDialogComponent, RocketDialogComponent]
})
export class RocketsModule {}
