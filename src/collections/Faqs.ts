import { CollectionConfig } from 'payload';

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'status', 'updatedAt'],
    description: 'Manage FAQ items displayed on the FAQ\'s page.',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        description: 'The FAQ question (e.g. "What is Makhana?")',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The answer to the question (2–4 sentences recommended)',
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
