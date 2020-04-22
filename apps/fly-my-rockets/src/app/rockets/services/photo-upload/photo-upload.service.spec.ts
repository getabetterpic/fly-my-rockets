import { PhotoUploadService } from './photo-upload.service';
import { Subject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

jest.mock('firebase/app', () => {
  return {
    storage: jest.fn().mockReturnValue({
      ref: jest.fn().mockReturnValue({
        getMetadata: jest.fn().mockReturnValue(Promise.resolve('some value'))
      })
    })
  };
});
import * as firebase from 'firebase/app';

describe('PhotoUploadService', () => {
  let service: PhotoUploadService;
  let storage;
  let afAuth;

  beforeEach(() => {
    storage = { upload: jest.fn() };
    afAuth = { authState: new Subject() };
    service = new PhotoUploadService(storage, afAuth);
  });

  describe('uploadRocketPhoto', () => {
    it('uploads a file', () => {
      const file = { name: 'something.jpg' } as File;
      service.uploadRocketPhoto(file).subscribe();
      afAuth.authState.next({ uid: '1234' });
      expect(storage.upload).toHaveBeenCalledWith(
        '1234/images/rockets/something.jpg',
        file
      );
    });
  });

  describe('getMetadata', () => {
    it('gets metadata for a ref', fakeAsync(() => {
      service.getMetadata('someref').subscribe(val => {
        expect(val).toEqual('some value');
      });
      tick(1_000);
    }));
  });
});
