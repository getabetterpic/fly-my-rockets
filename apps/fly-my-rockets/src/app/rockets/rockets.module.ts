import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RocketsRoutingModule } from './rockets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RocketListComponent } from './rocket-list/rocket-list.component';
import { RocketDialogComponent } from './dialogs/rocket-dialog/rocket-dialog.component';
import { RocketShowComponent } from './rocket-show/rocket-show.component';
import { FlightDialogComponent } from './dialogs/flight-dialog/flight-dialog.component';

@NgModule({
  declarations: [
    RocketListComponent,
    RocketDialogComponent,
    RocketShowComponent,
    FlightDialogComponent
  ],
  imports: [CommonModule, RocketsRoutingModule, SharedModule],
  entryComponents: [RocketDialogComponent]
})
export class RocketsModule {}
