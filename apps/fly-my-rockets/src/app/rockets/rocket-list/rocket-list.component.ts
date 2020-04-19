import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RocketService } from '../services/rocket/rocket.service';
import { RocketDialogComponent } from '../dialogs/rocket-dialog/rocket-dialog.component';
import { rocketPhotoRef, ThumbnailSizes } from '../functions/rocket-photo-ref';

@Component({
  selector: 'fmr-rocket-list',
  templateUrl: './rocket-list.component.html',
  styleUrls: ['./rocket-list.component.scss']
})
export class RocketListComponent {
  rockets$ = this.rocketService.getUserRockets().pipe(
    tap(rockets => {
      rockets.forEach((rocket) => {
        if (rocket.photos) {
          const photoRef = rocketPhotoRef(rocket.photos[0], ThumbnailSizes.Small);
          this.rocketPhotoMap[rocket.id] = this.storage.ref(photoRef).getDownloadURL();
        } else {
          this.rocketPhotoMap[rocket.id] = of(null);
        }
      });
    })
  );

  rocketPhotoMap: { [key: string]: Observable<string> } = {};

  constructor(
    private rocketService: RocketService,
    public matDialog: MatDialog,
    private storage: AngularFireStorage
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
