import { PhotoUploadService } from './photo-upload.service';
import { Subject } from 'rxjs';

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
      expect(storage.upload).toHaveBeenCalledWith('1234/images/rockets/something.jpg', file);
    });
  });
});
