import { Component } from '@angular/core';
import { RocketService } from '../rocket.service';
import { RocketDialogComponent } from '../dialogs/rocket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'fmr-rocket-list',
  templateUrl: './rocket-list.component.html',
  styleUrls: ['./rocket-list.component.scss']
})
export class RocketListComponent {
  rockets$ = this.rocketService.getUserRockets().pipe(
    tap(rockets => console.log({ rockets }))
  );

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
        this.rocketService.createRocket({
          name: result
        }).subscribe();
      }
    })
  }

}
