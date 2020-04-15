import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let afAuth;
  let router;
  let user;

  beforeEach(() => {
    user = new Subject();
    afAuth = { user };
    router = { navigate: jest.fn() };
    guard = new AuthGuard(afAuth, router);
  });

  describe('canActivate', () => {
    describe('when user logged in', () => {
      it('resolves to true', (done) => {
        guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe((result) => {
          expect(result).toBe(true);
          done();
        });
        user.next(true);
      });
    });

    describe('when user is not logged in', () => {
      it('navigates to the login route', (done) => {
        guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe((result) => {
          expect(result).toBe(false);
          done();
        });
        user.next(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
