import { CollectionConfig } from 'payload';

export const DistributorBenefits: CollectionConfig = {
  slug: 'distributor-benefits',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order', 'status', 'updatedAt'],
    description: 'Manage the benefits cards displayed on the Become Distributor page.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Benefit title (e.g. "Competitive Wholesale Pricing")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Benefit description (1–2 sentences)',
      },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'pricing',
      options: [
        { label: '💰 Pricing', value: 'pricing' },
        { label: '✅ Quality', value: 'quality' },
        { label: '🚚 Shipping', value: 'shipping' },
        { label: '📦 Packaging', value: 'packaging' },
        { label: '🌍 Global', value: 'global' },
        { label: '👥 Support', value: 'support' },
      ],
      admin: {
        description: 'Choose an icon to display with this benefit card',
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
