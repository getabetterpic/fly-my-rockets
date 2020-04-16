import { Component, OnInit } from '@angular/core';
import { RocketService } from '../rocket.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FlightDialogComponent } from '../dialogs/flight-dialog.component';
import { Flight, Rocket } from '../rocket.model';

@Component({
  selector: 'fmr-rocket-show',
  templateUrl: './rocket-show.component.html',
  styleUrls: ['./rocket-show.component.scss']
})
export class RocketShowComponent implements OnInit {
  rocket: Rocket;
  rocketId: string;
  rocket$ = this.route.paramMap.pipe(
    filter(paramMap => !!paramMap.get('rocketId')),
    switchMap(params => {
      this.rocketId = params.get('rocketId');
      return this.rocketService.getRocket(this.rocketId)
    }),
    tap(rocket => this.rocket = rocket)
  );
  flights$ = this.rocket$.pipe(
    map(rocket => rocket.flights)
  );

  constructor(
    private rocketService: RocketService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openFlightDialog(): void {
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rocketService.createFlight(this.rocketId, result).subscribe();
      }
    });
  }

  removeFlight(flight: Flight): void {
    this.rocketService.removeFlight(this.rocketId, flight)
      .subscribe(() => {}, (err) => {
        console.error({ err });
      });
  }

  flightDate(flight) {
    const { date } = flight;
    try {
      return date.toDate();
    } catch {
      return date;
    }
  }
}
