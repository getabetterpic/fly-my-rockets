import { ShellComponent } from './shell.component';
import { Subject } from 'rxjs';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let afAuth;
  let breakpointObserver;
  let observeSubject;

  beforeEach(() => {
    afAuth = {};
    observeSubject = new Subject();
    breakpointObserver = {
      observe: jest.fn().mockReturnValue(observeSubject)
    };
    component = new ShellComponent(afAuth, breakpointObserver);
  });

  describe('isHandset$', () => {
    it('checks to see if device is handset', (done) => {
      component.isHandset$.subscribe((result) => {
        expect(result).toBe(true);
        done();
      });
      observeSubject.next({ matches: true });
    });
  });
});
