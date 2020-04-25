import { ProfileComponent } from './profile.component';
import { of, Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let afAuth;
  let router;

  beforeEach(() => {
    afAuth = {
      user: new Subject(),
      signOut: jest.fn().mockReturnValue(Promise.resolve())
    };
    router = { navigate: jest.fn() };
    component = new ProfileComponent(afAuth, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signOut', () => {
    it('signs out then navigates to login', fakeAsync(() => {
      component.signOut();
      expect(afAuth.signOut).toHaveBeenCalled();
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/user/login']);
    }));
  });
});
