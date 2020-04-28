import { PhotosComponent } from './photos.component';

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
    breakpoints = {};
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
