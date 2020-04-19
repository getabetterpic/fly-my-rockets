import { FormBuilder } from '@angular/forms';
import { RocketDialogComponent } from './rocket-dialog.component';
import { of } from 'rxjs';
import { MatDialogState } from '@angular/material/dialog';

describe('RocketDialogComponent', () => {
  let component: RocketDialogComponent;
  let dialogRef;
  let data;
  let photosService;
  let mockFileInput;

  beforeEach(() => {
    dialogRef = { close: jest.fn(), getState: jest.fn().mockReturnValue(MatDialogState.OPEN) };
    data = {};
    photosService = {
      uploadRocketPhoto: jest.fn().mockReturnValue(
        of({
          snapshotChanges: () => of({
            ref: { fullPath: 'asdf1234/images/rockets/IMG_1234.jpg' },
            bytesTransferred: 1000,
            totalBytes: 1000
          })
        })
      )
    };
    mockFileInput = {
      files: [
        { size: 100 }
      ]
    };
    component = new RocketDialogComponent(dialogRef, data, photosService, new FormBuilder());
  });

  describe('onNoClick', () => {
    it('closes the dialog', () => {
      component.onNoClick();
      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('emitRocket', () => {
    describe('when no file to upload', () => {
      it('closes the dialog, passing just the name', () => {
        component.rocketForm.get('name').setValue('PML Ariel');
        component.emitRocket();
        expect(dialogRef.close).toHaveBeenCalledWith({ name: 'PML Ariel' });
      });
    });

    describe('when file to upload is present', () => {
      it('uploads the file then closes the dialog', () => {
        component.rocketForm.get('name').setValue('PML Ariel');
        component.fileToUpload.setValue(mockFileInput);
        component.emitRocket();
        expect(photosService.uploadRocketPhoto).toHaveBeenCalledWith(mockFileInput.files[0]);
        expect(dialogRef.close).toHaveBeenCalledWith({
          name: 'PML Ariel',
          photos: ['asdf1234/images/rockets/IMG_1234.jpg']
        })
      });
    });
  });
});
