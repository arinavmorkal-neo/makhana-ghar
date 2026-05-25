import ImageKit from "@imagekit/nodejs";

let _imagekit: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!_imagekit) {
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
      throw new Error('Invalid/Missing environment variable: "IMAGEKIT_PRIVATE_KEY"');
    }
    _imagekit = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });
  }
  return _imagekit;
}

// Legacy export for backward compatibility
export const imagekit = new Proxy({} as ImageKit, {
  get(_, prop) {
    return (getImageKit() as any)[prop];
  },
});
