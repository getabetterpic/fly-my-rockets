import { fakeAsync, tick } from '@angular/core/testing';

class GoogleAuthProvider {}
jest.mock('firebase/app', () => {
  return {
    auth: {
      GoogleAuthProvider
    }
  };
});
import { GoogleSigninDirective } from './google-signin.directive';

describe('GoogleSigninDirective', () => {
  let directive;
  let afAuth;
  let router;

  beforeEach(() => {
    afAuth = { signInWithPopup: jest.fn().mockReturnValue(Promise.resolve()) };
    router = { navigate: jest.fn() };
    directive = new GoogleSigninDirective(afAuth, router);
  });

  describe('onclick', () => {
    it('calls signInWithPopup then redirects to /rockets', fakeAsync(() => {
      directive.onclick();
      expect(afAuth.signInWithPopup).toHaveBeenCalledWith(
        new GoogleAuthProvider()
      );
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/rockets']);
    }));
  });
});
