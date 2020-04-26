import { rocketPhotoRef, ThumbnailSizes } from './rocket-photo-ref';

describe('rocketPhotoRef', () => {
  let originalRef;

  beforeEach(() => {
    originalRef = 'asdf1234/images/rockets/IMG_1234.jpg';
  });

  describe('when getting the small ref', () => {
    it('returns the correct string', () => {
      const ref = rocketPhotoRef(originalRef, ThumbnailSizes.Small);
      expect(ref).toEqual(
        'asdf1234/images/rockets/thumbnails/IMG_1234_50x50.jpg'
      );
    });
  });

  describe('when getting the medium ref', () => {
    it('returns the correct string', () => {
      const ref = rocketPhotoRef(originalRef, ThumbnailSizes.Medium);
      expect(ref).toEqual(
        'asdf1234/images/rockets/thumbnails/IMG_1234_400x600.jpg'
      );
    });
  });

  describe('when getting the original ref', () => {
    it('returns the correct string', () => {
      const thumbnailRef = rocketPhotoRef(originalRef, ThumbnailSizes.Medium);
      expect(rocketPhotoRef(thumbnailRef, ThumbnailSizes.Original)).toEqual(
        originalRef
      );
    });
  });
});
