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
          admin: {
            description: 'Blog post meta title (recommended: 50-60 characters)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Post summary for search results (recommended: 150-160 characters)',
          },
        },
        {
          name: 'primaryKeywords',
          type: 'text',
          label: 'Primary Keywords',
          admin: {
            description: 'Target keywords, comma-separated (e.g. makhana health benefits, fox nut nutrition)',
          },
        },
        {
          name: 'secondaryKeywords',
          type: 'textarea',
          label: 'Secondary / LSI Keywords',
          admin: {
            description: 'Secondary and related terms, comma-separated (e.g. roasted makhana weight loss, lotus seeds protein)',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          label: 'Additional / Legacy Keywords',
          admin: {
            description: 'Optional additional tags (Primary and Secondary keywords will be automatically combined into the keywords meta tag).',
          },
        },
      ],
    },
  ],
};
