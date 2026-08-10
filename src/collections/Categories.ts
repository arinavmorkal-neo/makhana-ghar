import { CollectionConfig } from 'payload';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'status', 'order', 'updatedAt'],
    description: 'Manage product categories displayed on the Categories page.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
      admin: {
        description: 'Display name (e.g. Round Makhana, Makhana Flakes)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (e.g. round-makhana)',
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
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Emoji',
      admin: {
        description: 'Emoji icon shown on the filter pill (e.g. ⚪ 🥜 ⭐)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Category Description',
      admin: {
        description: 'Short description of the category for the page',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Category Image',
      admin: {
        description: 'Upload an image, OR paste a direct URL below',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Direct Image URL',
      admin: {
        description: 'Paste a direct image URL here (use this OR upload above). This takes priority over upload.',
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Products in this Category',
      admin: {
        description: 'Select products that belong to this category',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Sort order (lower = shown first)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Highlight this category on the page',
      },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Metadata',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
  ],
};
