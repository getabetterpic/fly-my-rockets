import { Component, Input } from '@angular/core';
import { Flight } from '../rocket.model';
import { FlightDialogComponent } from '../dialogs/flight-dialog/flight-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RocketService } from '../services/rocket/rocket.service';
import { AreYouSureComponent } from '../../shared/are-you-sure/are-you-sure.component';

@Component({
  selector: 'fmr-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent {
  @Input() public flight: Flight;
  @Input() public rocketId: string;

  constructor(
    private dialog: MatDialog,
    private rocketService: RocketService
  ) {}

  openFlightDialog(): void {
    const oldFlight = { ...this.flight };
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      width: '350px',
      data: this.flight
    });

    dialogRef.afterClosed().subscribe(updatedFlight => {
      if (updatedFlight) {
        this.rocketService
          .updateFlight(this.rocketId, oldFlight, updatedFlight)
          .subscribe();
      }
    });
  }

  removeFlight(flight: Flight): void {
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      data: {
        message: 'Are you sure you want to delete this flight?',
        yesColor: 'warn'
      }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.reallyRemoveFlight(flight);
      }
    });
  }

  private reallyRemoveFlight(flight): void {
    this.rocketService.removeFlight(this.rocketId, flight).subscribe(
      () => {},
      err => {
        console.error({ err });
      }
    );
  }
}
