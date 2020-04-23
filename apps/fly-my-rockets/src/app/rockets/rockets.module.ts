import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RocketsRoutingModule } from './rockets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RocketListComponent } from './rocket-list/rocket-list.component';
import { RocketDialogComponent } from './dialogs/rocket-dialog/rocket-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RocketShowComponent } from './rocket-show/rocket-show.component';
import { FlightDialogComponent } from './dialogs/flight-dialog/flight-dialog.component';
import { FlightNewComponent } from './flight-new/flight-new.component';

@NgModule({
  declarations: [
    RocketListComponent,
    RocketDialogComponent,
    RocketShowComponent,
    FlightDialogComponent,
    FlightNewComponent
  ],
  imports: [CommonModule, RocketsRoutingModule, SharedModule, MatDialogModule],
  entryComponents: [RocketDialogComponent]
})
export class RocketsModule {}
