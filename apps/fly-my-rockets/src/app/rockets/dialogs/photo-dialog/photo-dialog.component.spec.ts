import { PhotoDialogComponent } from './photo-dialog.component';

describe('PhotoDialogComponent', () => {
  let component: PhotoDialogComponent;
  let data;

  beforeEach(() => {
    data = {};
    component = new PhotoDialogComponent(data);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
