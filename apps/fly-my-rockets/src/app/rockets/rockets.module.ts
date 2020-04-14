import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RocketsRoutingModule } from './rockets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RocketListComponent } from './rocket-list/rocket-list.component';
import { RocketDialogComponent } from './dialogs/rocket-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RocketShowComponent } from './rocket-show/rocket-show.component';
import { FlightDialogComponent } from './dialogs/flight-dialog.component';


@NgModule({
  declarations: [RocketListComponent, RocketDialogComponent, RocketShowComponent, FlightDialogComponent],
  imports: [
    CommonModule,
    RocketsRoutingModule,
    SharedModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [RocketDialogComponent]
})
export class RocketsModule { }
