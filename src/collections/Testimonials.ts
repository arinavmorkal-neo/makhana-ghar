import { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'rating', 'status', 'updatedAt'],
    description: 'Manage client testimonials displayed on the Testimonials page.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Client or company name',
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Role / Company / Location (e.g. "Wholesale Distributor, Delhi")',
      },
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial / review text (2–4 sentences recommended)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      defaultValue: 5,
      min: 1,
      max: 5,
      admin: {
        description: 'Star rating from 1 to 5',
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
