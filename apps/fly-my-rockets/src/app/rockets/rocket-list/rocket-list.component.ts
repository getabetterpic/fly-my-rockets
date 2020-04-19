import { Component } from '@angular/core';
import { RocketService } from '../services/rocket/rocket.service';
import { RocketDialogComponent } from '../dialogs/rocket-dialog/rocket-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'fmr-rocket-list',
  templateUrl: './rocket-list.component.html',
  styleUrls: ['./rocket-list.component.scss']
})
export class RocketListComponent {
  rockets$ = this.rocketService.getUserRockets();

  constructor(
    private rocketService: RocketService,
    public matDialog: MatDialog
  ) { }

  openRocketDialog(): void {
    const dialogRef = this.matDialog.open(RocketDialogComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newRocket = { ...result, flights: [] };
        this.rocketService.createRocket(newRocket).subscribe();
      }
    })
  }

}
