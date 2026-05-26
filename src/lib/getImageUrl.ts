/**
 * Resolves an image URL from a Payload CMS media field.
 *
 * Handles all the different shapes a media field can have:
 * - A string URL (already resolved)
 * - An object with `url` (populated media relation from Payload)
 * - An object with `filename` but broken `url` (fallback to ImageKit endpoint)
 * - A number/string ID (un-populated relation — can't resolve, returns fallback)
 *
 * Also handles the `imageUrl` text field override pattern used in Pages collection.
 */

const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '';

export function getImageUrl(
  media: any,
  fallback: string = '/4+.png'
): string {
  // If it's already a string, use it directly
  if (typeof media === 'string') {
    // If it looks like a full URL, use it
    if (media.startsWith('http://') || media.startsWith('https://') || media.startsWith('/')) {
      return media;
    }
    return fallback;
  }

  // If it's an object (populated media relation)
  if (media && typeof media === 'object') {
    // If it has a url field that's a valid URL, use it
    if (media.url && typeof media.url === 'string') {
      // Check if the URL is an ImageKit URL or an absolute URL
      if (media.url.startsWith('http://') || media.url.startsWith('https://')) {
        return media.url;
      }
      // If it's a relative Payload API path like /api/media/file/xxx
      // and we have an ImageKit endpoint + filename, construct the ImageKit URL
      if (media.filename && IMAGEKIT_ENDPOINT) {
        return `${IMAGEKIT_ENDPOINT.replace(/\/$/, '')}/makhana-shop/${media.filename}`;
      }
      // Otherwise return the URL as-is (it might be a relative path like /media/xxx)
      return media.url;
    }

    // If it has a filename but no valid url, try to construct the ImageKit URL
    if (media.filename && IMAGEKIT_ENDPOINT) {
      return `${IMAGEKIT_ENDPOINT.replace(/\/$/, '')}/makhana-shop/${media.filename}`;
    }
  }

  return fallback;
}

/**
 * Resolves an image URL with an `imageUrl` text override (used in Pages collection).
 * The `imageUrl` text field takes priority over the `image` upload relation.
 */
export function getImageUrlWithOverride(
  imageUrl: string | undefined | null,
  media: any,
  fallback: string = '/4+.png'
): string {
  // Text field URL takes priority
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
    return imageUrl.trim();
  }
  return getImageUrl(media, fallback);
}
