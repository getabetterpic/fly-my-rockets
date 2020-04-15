import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let afAuth;

  beforeEach(() => {
    afAuth = {};
    component = new LoginPageComponent(afAuth);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
