import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Flight, Rocket } from '../../rocket.model';
import * as firebase from 'firebase/app';
import FieldPath = firebase.firestore.FieldPath;
import FieldValue = firebase.firestore.FieldValue;

@Injectable({
  providedIn: 'root'
})
export class RocketService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  createRocket(data: Rocket): Observable<Rocket> {
    return from(this.afAuth.currentUser).pipe(
      switchMap(user => {
        return this.db.collection('rockets').add({
          ...data,
          uid: user.uid
        })
      })
    )
  }

  updateRocket(rocketId: string, rocket: Rocket): Observable<any> {
    return from(this.db.collection('rockets').doc(rocketId).update(rocket));
  }

  deleteRocket(rocketId: string): Observable<any> {
    return from(this.db.collection('rockets').doc(rocketId).delete());
  }

  updateFlight(rocketId: string, oldFlight: Flight, updatedFlight: Flight): Observable<any> {
    const rocketDoc = this.db.firestore.collection('rockets').doc(rocketId);
    return from(this.db.firestore.runTransaction(transaction => {
      return transaction.get(rocketDoc).then(doc => {
        transaction.update(rocketDoc, {
          flights: FieldValue.arrayRemove(oldFlight)
        });
        transaction.update(rocketDoc, {
          flights: FieldValue.arrayUnion(updatedFlight)
        });
      });
    }));
  }

  removeFlight(rocketId: string, flight: Flight): Observable<any> {
    if (typeof flight === 'string') {
      return from(this.db.collection('rockets').doc(rocketId).update({
        flights: FieldValue.arrayRemove(flight)
      }));
    } else if (flight.id) {
      return from(this.db.collection('rockets').doc(rocketId).update({
        flights: FieldValue.arrayRemove(`/flights/${flight.id}`)
      }));
    }
    return from(this.db.collection('rockets').doc(rocketId).update({
      flights: FieldValue.arrayRemove(flight)
    }))
  }

  getUserRockets() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.collection('rockets', ref => {
            return ref.where('uid', '==', user.uid).orderBy('name');
          }).valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    )
  }

  getRocket(rocketId: string): Observable<Rocket> {
    return this.db.collection('rockets').doc(rocketId).valueChanges();
  }

  getFlights(flightIds: string[]): Observable<Flight[]> {
    flightIds = flightIds.map(fid => fid.split('/').pop());
    return this.db.collection<Flight>('flights', ref => {
      return ref.where(FieldPath.documentId(), 'in', flightIds);
    }).valueChanges({ idField: 'id' });
  }

  createFlight(rocketId: string, flight: Flight): Observable<any> {
    return from(this.db.collection('rockets').doc(rocketId).update({
      flights: FieldValue.arrayUnion(flight)
    }));
  }
}
