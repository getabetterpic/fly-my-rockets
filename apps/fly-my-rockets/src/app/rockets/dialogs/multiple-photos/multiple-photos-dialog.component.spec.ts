import { MultiplePhotosDialogComponent } from './multiple-photos-dialog.component';

describe('MultiplePhotosDialogComponent', () => {
  let component: MultiplePhotosDialogComponent;
  let dialog;

  beforeEach(() => {
    dialog = {};
    component = new MultiplePhotosDialogComponent(dialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
