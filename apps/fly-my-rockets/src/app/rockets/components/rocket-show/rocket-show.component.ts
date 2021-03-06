import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { RocketService } from '../../services/rocket/rocket.service';
import { Flight, Rocket } from '../../rocket.model';
import { FlightDialogComponent } from '../../dialogs/flight-dialog/flight-dialog.component';
import { RocketDialogComponent } from '../../dialogs/rocket-dialog/rocket-dialog.component';
import {
  rocketPhotoRef,
  ThumbnailSizes
} from '../../functions/rocket-photo-ref';
import { AreYouSureComponent } from '../../../shared/are-you-sure/are-you-sure.component';

@Component({
  selector: 'fmr-rocket-show',
  templateUrl: './rocket-show.component.html',
  styleUrls: ['./rocket-show.component.scss']
})
export class RocketShowComponent {
  rocket: Rocket;
  rocketId: string;
  rocketPhotoUrl$: Observable<any>;
  private rocketUpdated$ = new BehaviorSubject<void>(null);
  rocket$: Observable<Rocket> = combineLatest([
    this.route.paramMap,
    this.rocketUpdated$
  ]).pipe(
    filter(([paramMap]) => !!paramMap.get('rocketId')),
    switchMap(([params]) => {
      this.rocketId = params.get('rocketId');
      return this.rocketService.getRocket(this.rocketId);
    }),
    tap(rocket => {
      this.rocket = rocket;
      if (
        rocket.photos &&
        Array.isArray(rocket.photos) &&
        rocket.photos.length > 0
      ) {
        const originalRef = rocket.photos[0];
        const mediumRef = rocketPhotoRef(originalRef, ThumbnailSizes.Medium);
        this.rocketPhotoUrl$ = this.storage.ref(mediumRef).getDownloadURL();
      } else {
        this.rocketPhotoUrl$ = of(null);
      }
    })
  );
  flights$: Observable<Flight[]> = this.rocket$.pipe(
    map(rocket => rocket.flights),
    map(flights => {
      return flights.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (b.date > a.date) {
          return 1;
        } else {
          return 0;
        }
      });
    })
  );

  constructor(
    private rocketService: RocketService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private storage: AngularFireStorage
  ) {}

  openRocketDialog(rocket: Rocket): void {
    const dialogRef = this.dialog.open(RocketDialogComponent, {
      width: '500px',
      data: { ...rocket }
    });
    dialogRef.afterClosed().subscribe(update => {
      if (update) {
        this.rocketService.updateRocket(this.rocketId, update).subscribe(() => {
          this.rocketUpdated$.next();
        });
      }
    });
  }

  newFlightDialog(): void {
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      width: '350px',
      data: { new: true }
    });

    dialogRef.afterClosed().subscribe(newFlight => {
      if (newFlight) {
        this.rocketService.createFlight(this.rocketId, newFlight).subscribe(
          () => {},
          err => {
            console.error({ err });
          }
        );
      }
    });
  }

  confirmDelete(): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      data: {
        message: 'Are you sure you want to delete this rocket?',
        yesColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteRocket();
      }
    });
  }

  removePhoto(): void {
    this.rocketService
      .updateRocket(this.rocketId, {
        photos: []
      })
      .subscribe(() => {
        this.rocketUpdated$.next();
      });
  }

  private deleteRocket(): void {
    this.router.navigate(['/rockets'], { replaceUrl: true }).then(() => {
      this.rocketService.deleteRocket(this.rocketId).subscribe();
    });
  }
}
