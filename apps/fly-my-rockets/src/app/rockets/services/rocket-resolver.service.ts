import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Rocket } from '../rocket.model';
import { Observable } from 'rxjs';
import { RocketService } from './rocket/rocket.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RocketResolverService implements Resolve<Rocket>{
  constructor(
    private rocketService: RocketService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rocket> {
    return this.rocketService.getRocket(route.paramMap.get('rocketId')).pipe(take(1));
  }
}
