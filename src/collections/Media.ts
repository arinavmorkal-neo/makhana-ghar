import { CollectionConfig } from 'payload';
import { imagekit } from '../lib/imagekit';
import { toFile } from '@imagekit/nodejs';

const IMAGEKIT_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/3uuhtxmof/';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
  },
  admin: {
    useAsTitle: 'filename',
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        // Auto-generate alt text from filename if not provided
        if (!data.alt) {
          const fileObj = req.file as any;
          const rawName = data.filename || fileObj?.name || fileObj?.filename || 'image';
          // Convert filename to readable alt text: "my-product_image.jpg" -> "my product image"
          data.alt = rawName
            .replace(/\.[^.]+$/, '') // remove extension
            .replace(/[-_]+/g, ' ') // replace dashes/underscores with spaces
            .replace(/\s+/g, ' ')   // normalize spaces
            .trim();
        }

        if (req.file) {
          try {
            const fileObj = req.file as any;
            let buffer: Buffer;
            if (typeof fileObj.arrayBuffer === 'function') {
              const arrayBuffer = await fileObj.arrayBuffer();
              buffer = Buffer.from(arrayBuffer);
            } else if (fileObj.buffer) {
              buffer = fileObj.buffer;
            } else if (fileObj.data) {
              buffer = Buffer.isBuffer(fileObj.data) ? fileObj.data : Buffer.from(fileObj.data);
            } else {
              console.warn('No file buffer found on req.file, skipping ImageKit upload');
              return data;
            }

            const fileName = fileObj.name || fileObj.filename || 'upload';
            const uploadFile = await toFile(buffer, fileName);
            const uploadResponse = await imagekit.files.upload({
              file: uploadFile,
              fileName: fileName,
              folder: '/makhana-shop',
            });

            console.log('ImageKit upload successful:', uploadResponse.url);

            // Update document data with remote url and name from ImageKit
            data.url = uploadResponse.url;
            data.filename = uploadResponse.name;
            // Store the ImageKit URL separately so it persists
            data.imagekitUrl = uploadResponse.url;
          } catch (error) {
            console.error('ImageKit upload failed:', error);
            // Let Payload save the file locally as a fallback
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
