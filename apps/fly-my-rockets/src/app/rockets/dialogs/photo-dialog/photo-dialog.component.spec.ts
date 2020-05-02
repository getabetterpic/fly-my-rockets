import { PhotoDialogComponent } from './photo-dialog.component';

describe('PhotoDialogComponent', () => {
  let component: PhotoDialogComponent;
  let data;
  let afAuth;

  beforeEach(() => {
    data = {};
    afAuth = {};
    component = new PhotoDialogComponent(data, afAuth);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
