import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RocketListComponent } from './components/rocket-list/rocket-list.component';
import { RocketShowComponent } from './rocket-show/rocket-show.component';

const routes: Routes = [
  {
    path: '',
    component: RocketListComponent
  },
  {
    path: ':rocketId',
    component: RocketShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RocketsRoutingModule {}
