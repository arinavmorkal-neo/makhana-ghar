import { CollectionConfig } from 'payload';

export const Founders: CollectionConfig = {
  slug: 'founders',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'status', 'updatedAt'],
    description: 'Manage the founders displayed on the About Us page.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the founder',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Founder & CEO, Co-Founder & COO',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short biography (2-3 sentences)',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a photo, OR paste a direct URL below',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Direct ImageKit image URL (use this OR upload above)',
      },
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      admin: {
        description: 'LinkedIn profile URL (optional)',
      },
    },
    {
      name: 'twitterUrl',
      type: 'text',
      admin: {
        description: 'X / Twitter profile URL (optional)',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first (0 = default)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
