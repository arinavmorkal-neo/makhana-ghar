import { CollectionConfig } from 'payload';

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'product', 'createdAt'],
    description: 'All form submissions from the website contact form.',
  },
  access: {
    // Only admins can read/update/delete — public can create (submit form)
    create: () => true,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'countryCode',
      type: 'text',
      label: 'Country Code',
      defaultValue: '+91',
    },
    {
      name: 'contact',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'product',
      type: 'select',
      label: 'Product Interest',
      options: [
        { label: 'Makhana 4+ Sutta', value: 'makhana-4' },
        { label: 'Makhana 5+ Sutta', value: 'makhana-5' },
        { label: 'Makhana 6+ Sutta', value: 'makhana-6' },
        { label: 'Phool Makhana Lite', value: 'makhana-lite' },
        { label: 'Custom Grade / Mix', value: 'custom' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message / Quantity',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Enquiry Status',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: '🆕 New', value: 'new' },
        { label: '📞 Contacted', value: 'contacted' },
        { label: '🤝 In Progress', value: 'in-progress' },
        { label: '✅ Converted', value: 'converted' },
        { label: '❌ Closed', value: 'closed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        position: 'sidebar',
        description: 'Private notes for your team — not visible on the website.',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'website',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
};
