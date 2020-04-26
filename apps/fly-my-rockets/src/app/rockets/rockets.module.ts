import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RocketsRoutingModule } from './rockets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';
import { RocketDialogComponent } from './dialogs/rocket-dialog/rocket-dialog.component';
import { FlightDialogComponent } from './dialogs/flight-dialog/flight-dialog.component';
import { MultiplePhotosDialogComponent } from './dialogs/multiple-photos/multiple-photos-dialog.component';
import { PhotoDialogComponent } from './dialogs/photo-dialog/photo-dialog.component';

@NgModule({
  declarations: [
    RocketDialogComponent,
    FlightDialogComponent,
    MultiplePhotosDialogComponent,
    PhotoDialogComponent
  ],
  imports: [
    CommonModule,
    RocketsRoutingModule,
    SharedModule,
    PipesModule,
    ComponentsModule
  ],
  entryComponents: [
    FlightDialogComponent,
    RocketDialogComponent,
    MultiplePhotosDialogComponent,
    PhotoDialogComponent
  ]
})
export class RocketsModule {}
