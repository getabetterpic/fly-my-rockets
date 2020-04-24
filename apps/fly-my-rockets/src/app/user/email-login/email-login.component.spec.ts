import { EmailLoginComponent } from './email-login.component';
import { FormBuilder } from '@angular/forms';

describe('EmailLoginComponent', () => {
  let component: EmailLoginComponent;
  let afAuth;
  let router;

  beforeEach(() => {
    afAuth = {
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      sendPasswordResetEmail: jest.fn()
    };
    router = { navigate: jest.fn() };
    component = new EmailLoginComponent(afAuth, new FormBuilder(), router);
  });

  describe('ngOnInit', () => {
    it('creates the form', () => {
      component.ngOnInit();
      expect(component.form).not.toBeUndefined();
    });
  });

  describe('changeType', () => {
    it('changes the type', () => {
      expect(component.type).toEqual('signup');
      component.changeType('login');
      expect(component.type).toEqual('login');
    });
  });

  describe('isLogin', () => {
    it('returns true if type is login', () => {
      component.type = 'login';
      expect(component.isLogin).toBe(true);
    });
  });

  describe('isSignup', () => {
    it('returns true if type is signup', () => {
      component.type = 'signup';
      expect(component.isSignup).toBe(true);
    });
  });

  describe('isPasswordReset', () => {
    it('returns true if type is reset', () => {
      component.type = 'reset';
      expect(component.isPasswordReset).toBe(true);
    });
  });
});
