class GoogleAuthProvider {}
jest.mock('firebase/app', () => {
  return {
    auth: {
      GoogleAuthProvider
    }
  }
});
import { GoogleSigninDirective } from './google-signin.directive';

describe('GoogleSigninDirective', () => {
  let directive;
  let afAuth;

  beforeEach(() => {
    afAuth = { signInWithPopup: jest.fn() };
    directive = new GoogleSigninDirective(afAuth);
  });

  describe('onclick', () => {
    it('calls signInWithPopup', () => {
      directive.onclick();
      expect(afAuth.signInWithPopup).toHaveBeenCalledWith(new GoogleAuthProvider());
    });
  });
});
