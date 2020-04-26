export enum ThumbnailSizes {
  Small = 'small',
  Medium = 'medium',
  Original = 'original'
}

/**
 * Takes a Firebase Storage ref and returns the ref necessary to get a smaller
 * sized thumbnail photo. originalRef should look something like this:
 * qOm4icLQTnRnNInGTrl3lQqSwtE3/images/rockets/IMG_20191130_110701.jpg
 * where the format is `<userId>/images/rockets/<fileName>`.
 * @param originalRef
 * @param size
 */
export function rocketPhotoRef(originalRef: string, size: ThumbnailSizes): string {
  const refArr = originalRef.split('/');
  const uid = refArr.shift(); // first item
  const fileName = refArr.pop(); // last item
  const [file, extension] = fileName.split('.');
  switch (size) {
    case ThumbnailSizes.Small:
      return `${uid}/images/rockets/thumbnails/${file}_50x50.${extension}`;
    case ThumbnailSizes.Medium:
      return `${uid}/images/rockets/thumbnails/${file}_400x600.${extension}`;
    case ThumbnailSizes.Original:
      const thumbnailArr = file.split('_');
      thumbnailArr.pop(); // remove last item
      const originalFile = thumbnailArr.join('_'); // preserve any underscores in the file name
      return `${uid}/images/rockets/${originalFile}.${extension}`;
  }
}
