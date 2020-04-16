import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Flight } from './rocket.model';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import FieldValue = firebase.firestore.FieldValue;

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  createFlight(rocketId: string, flight: Flight): Observable<void> {
    return from(this.db.collection('rockets').doc(rocketId)
      .update({ flights: FieldValue.arrayUnion(flight) }));
  }
}
