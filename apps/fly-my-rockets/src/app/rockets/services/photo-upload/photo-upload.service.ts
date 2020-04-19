import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
}
