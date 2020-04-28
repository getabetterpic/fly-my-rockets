import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RocketListComponent } from './components/rocket-list/rocket-list.component';
import { RocketShowComponent } from './components/rocket-show/rocket-show.component';
import { PhotosComponent } from './components/photos/photos.component';
import { RocketResolverService } from './services/rocket-resolver.service';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/user/login']);

const routes: Routes = [
  {
    path: '',
    component: RocketListComponent
  },
  {
    path: ':rocketId',
    component: RocketShowComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: ':rocketId/photos',
    component: PhotosComponent,
    resolve: {
      rocket: RocketResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RocketsRoutingModule {}
