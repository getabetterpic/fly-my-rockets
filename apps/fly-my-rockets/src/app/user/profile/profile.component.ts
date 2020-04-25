import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'fmr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$ = this.afAuth.user;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signOut(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
