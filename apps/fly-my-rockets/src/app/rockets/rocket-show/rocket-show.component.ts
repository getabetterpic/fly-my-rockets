import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { RocketService } from '../rocket.service';
import { Flight, Rocket } from '../rocket.model';
import { FlightDialogComponent } from '../dialogs/flight-dialog/flight-dialog.component';
import { RocketDialogComponent } from '../dialogs/rocket-dialog.component';

@Component({
  selector: 'fmr-rocket-show',
  templateUrl: './rocket-show.component.html',
  styleUrls: ['./rocket-show.component.scss']
})
export class RocketShowComponent {
  rocket: Rocket;
  rocketId: string;
  rocket$: Observable<Rocket> = this.route.paramMap.pipe(
    filter(paramMap => !!paramMap.get('rocketId')),
    switchMap(params => {
      this.rocketId = params.get('rocketId');
      return this.rocketService.getRocket(this.rocketId)
    }),
    tap(rocket => this.rocket = rocket)
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
      })
    })
  );

  constructor(
    private rocketService: RocketService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  openRocketDialog(rocket: Rocket): void {
    const dialogRef = this.dialog.open(RocketDialogComponent, {
      width: '500px',
      data: { ...rocket }
    });
    dialogRef.afterClosed().subscribe(newName => {
      if (newName) {
        this.rocketService.updateRocket(this.rocketId, { name: newName });
      }
    })
  }

  openFlightDialog(flight: Flight): void {
    const oldFlight = { ...flight };
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      position: {
        top: '0',
        left: '0'
      },
      minWidth: '100%',
      height: '100%',
      data: flight
    });

    dialogRef.afterClosed().subscribe(updatedFlight => {
      if (updatedFlight?.delete) {
        this.rocketService.removeFlight(this.rocketId, oldFlight).subscribe();
      } else if (updatedFlight) {
        this.rocketService.updateFlight(this.rocketId, oldFlight, updatedFlight).subscribe();
      }
    });
  }

  newFlightDialog(): void {
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      position: {
        top: '0',
        left: '0'
      },
      minWidth: '100%',
      height: '100%',
      data: { new: true }
    });

    dialogRef.afterClosed().subscribe(newFlight => {
      if (newFlight) {
        this.rocketService.createFlight(this.rocketId, newFlight).subscribe(() => {}, (err) => {
          console.error({ err });
        });
      }
    });
  }

  removeFlight(flight: Flight): void {
    this.rocketService.removeFlight(this.rocketId, flight)
      .subscribe(() => {}, (err) => {
        console.error({ err });
      });
  }

  deleteRocket(): void {
    this.rocketService.deleteRocket(this.rocketId).subscribe(() => {
      this.router.navigate(['/rockets'], { replaceUrl: true });
    })
  }

  flightDate(flight: Flight) {
    const { date } = flight;
    try {
      return date.toDate();
    } catch {
      return date;
    }
  }
}
