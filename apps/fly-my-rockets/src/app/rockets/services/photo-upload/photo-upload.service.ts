import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {
  constructor(
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  uploadRocketPhoto(file: File): Observable<AngularFireUploadTask> {
    return this.afAuth.authState.pipe(
      map(user => {
        const filePath = `${user.uid}/images/rockets/${file.name}`;
        return this.storage.upload(filePath, file);
      })
    );
  }

  getMetadata(ref: string): Observable<any> {
    // Using AngularFireStorage#ref().getMetadata wasn't returning. So
    // use raw storage API instead.
    const storage = firebase.storage();
    const getMetadata = storage.ref(ref).getMetadata();
    return timer(1_000).pipe(
      switchMap(() => {
        return from(getMetadata).pipe(
          catchError((err) => {
            return this.getMetadata(ref);
          })
        );
      })
    );
  }
}
