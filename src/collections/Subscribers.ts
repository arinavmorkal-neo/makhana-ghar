import { CollectionConfig } from 'payload';

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'createdAt'],
    description: 'All newsletter subscription submissions.',
  },
  access: {
    // Anyone can subscribe, only admins can view/edit/delete
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email Address',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'newsletter',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
};
