import { CollectionConfig } from 'payload';

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (e.g. my-blog-post)',
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
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd MMM yyyy',
        },
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Admin',
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Category tag displayed on the card (e.g. EXPORT, HEALTH)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary shown on the blog listing cards',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '5 min read',
      admin: {
        description: 'Estimated reading time (e.g. 5 min read)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this post in the Featured Stories section',
      },
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    // SEO fields
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
