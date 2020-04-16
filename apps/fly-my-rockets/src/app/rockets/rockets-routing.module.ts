import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RocketListComponent } from './rocket-list/rocket-list.component';
import { RocketShowComponent } from './rocket-show/rocket-show.component';
import { FlightNewComponent } from './flight-new/flight-new.component';


const routes: Routes = [
  {
    path: '', component: RocketListComponent
  },
  {
    path: ':rocketId', component: RocketShowComponent
  },
  {
    path: ':rocketId/flights/new', component: FlightNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RocketsRoutingModule { }
