import { CollectionConfig } from 'payload';
import { imagekit } from '../lib/imagekit';
import { toFile } from '@imagekit/nodejs';

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
          } catch (error) {
            console.error('ImageKit upload error:', error);
            throw new Error(
              'Failed to upload file to ImageKit: ' +
                (error instanceof Error ? error.message : String(error))
            );
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};
