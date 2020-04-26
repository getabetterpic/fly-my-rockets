import { PhotosComponent } from './photos.component';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let route;
  let breakpoints;
  let storage;
  let dialog;
  let photoUpload;
  let rocketService;

  beforeEach(() => {
    route = {};
    breakpoints = {};
    storage = {};
    dialog = {};
    photoUpload = {};
    rocketService = {};
    component = new PhotosComponent(
      route,
      breakpoints,
      storage,
      dialog,
      photoUpload,
      rocketService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
