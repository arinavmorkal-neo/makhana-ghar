import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pages } from './collections/Pages';
import { Media } from './collections/Media';
import { Users } from './collections/Users';
import { Enquiries } from './collections/Enquiries';
import { Subscribers } from './collections/Subscribers';
import { Blogs } from './collections/Blogs';
import { Products } from './collections/Products';
import { Categories } from './collections/Categories';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
    components: {
      beforeDashboard: ['/src/components/CustomDashboard#CustomDashboard'],
    },
  },
  collections: [Pages, Media, Users, Enquiries, Subscribers, Blogs, Products, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-local-dev-only',
  db: mongooseAdapter({
    url: process.env.MONGODB_URI!,
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
