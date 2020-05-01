import { PhotosComponent } from './photos.component';
import { of, Subject } from 'rxjs';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let route;
  let breakpoints;
  let storage;
  let dialog;
  let photoUpload;
  let rocketService;
  let afAuth;

  beforeEach(() => {
    route = {};
    breakpoints = { observe: jest.fn().mockReturnValue(of({})) };
    storage = {};
    dialog = {};
    photoUpload = {};
    rocketService = {};
    afAuth = {};
    component = new PhotosComponent(
      route,
      breakpoints,
      storage,
      dialog,
      photoUpload,
      rocketService,
      afAuth
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
