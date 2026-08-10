import { CollectionConfig } from 'payload';
import { imagekit } from '../lib/imagekit';
import { toFile } from '@imagekit/nodejs';

const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/3uuhtxmof/';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    disableLocalStorage: true,
  },
  admin: {
    useAsTitle: 'filename',
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (req.file) {
          try {
            const fileObj = req.file as any;
            let buffer: Buffer;
            if (typeof fileObj.arrayBuffer === 'function') {
              const arrayBuffer = await fileObj.arrayBuffer();
              buffer = Buffer.from(arrayBuffer);
            } else if (fileObj.buffer) {
              buffer = fileObj.buffer;
            } else {
              throw new Error('No file buffer or arrayBuffer method found on req.file');
            }

            const uploadFile = await toFile(buffer, fileObj.name || fileObj.filename || 'upload');
            const uploadResponse = await imagekit.files.upload({
              file: uploadFile,
              fileName: fileObj.name || fileObj.filename || 'upload',
              folder: '/makhana-shop',
            });
            // Update document data with remote url and name from ImageKit
            data.url = uploadResponse.url;
            data.filename = uploadResponse.name;
            // Store the ImageKit URL separately so it persists
            data.imagekitUrl = uploadResponse.url;
          } catch (error) {
            console.warn('ImageKit upload failed (continuing with local file):', error);
            // Don't block the upload — let Payload save the file locally as a fallback
            const fileObj = req.file as any;
            data.filename = fileObj.name || fileObj.filename || 'upload';
          }
        }
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        // If the stored url is not an ImageKit URL, fix it
        if (doc.url && typeof doc.url === 'string' && !doc.url.startsWith('http')) {
          // Try to use the stored imagekitUrl first
          if (doc.imagekitUrl) {
            doc.url = doc.imagekitUrl;
          } else if (doc.filename) {
            // Reconstruct the ImageKit URL from the filename
            doc.url = `${IMAGEKIT_ENDPOINT.replace(/\/$/, '')}/makhana-shop/${doc.filename}`;
          }
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'imagekitUrl',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-populated ImageKit URL (do not edit)',
      },
    },
  ],
};
