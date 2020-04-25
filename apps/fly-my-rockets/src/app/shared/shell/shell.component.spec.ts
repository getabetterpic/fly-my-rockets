import { ShellComponent } from './shell.component';
import { Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let afAuth;
  let breakpointObserver;
  let observeSubject;
  let router;

  beforeEach(() => {
    afAuth = { signOut: jest.fn().mockReturnValue(Promise.resolve()) };
    observeSubject = new Subject();
    breakpointObserver = {
      observe: jest.fn().mockReturnValue(observeSubject)
    };
    router = { navigate: jest.fn() };
    component = new ShellComponent(afAuth, breakpointObserver, router);
  });

  describe('isHandset$', () => {
    it('checks to see if device is handset', done => {
      component.isHandset$.subscribe(result => {
        expect(result).toBe(true);
        done();
      });
      observeSubject.next({ matches: true });
    });
  });

  describe('signOut', () => {
    it('navigates to login after signout', fakeAsync(() => {
      component.signOut();
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/user/login']);
    }));
  });
});
