import { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
            description: 'Page title for search engines (recommended: 50-60 characters)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Brief summary of the page for search results (recommended: 150-160 characters)',
          },
        },
        {
          name: 'primaryKeywords',
          type: 'text',
          label: 'Primary Keywords',
          admin: {
            description: 'Core target keywords, comma-separated (e.g. wholesale makhana, bulk makhana supplier, bihar makhana)',
          },
        },
        {
          name: 'secondaryKeywords',
          type: 'textarea',
          label: 'Secondary / LSI Keywords',
          admin: {
            description: 'Secondary, related, and long-tail keywords, comma-separated (e.g. phool makhana price per kg, fox nut exporter india, raw makhana manufacturer)',
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
    // Blocks layout
    {
      name: 'layout',
      type: 'blocks',
      minRows: 1,
      blocks: [
        // 1. Hero block
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              name: 'slides',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Upload image OR use Image URL below (URL takes priority)',
                  },
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'Image URL (ImageKit / External)',
                  admin: {
                    description: 'Paste an ImageKit or external image URL directly. Takes priority over uploaded image.',
                  },
                },
                {
                  name: 'tag',
                  type: 'text',
                },
                {
                  name: 'heading',
                  type: 'text',
                },
                {
                  name: 'body',
                  type: 'text',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // 2. Product Section block
        {
          slug: 'product-section',
          labels: {
            singular: 'Product Grid',
            plural: 'Product Grids',
          },
          fields: [
            {
              name: 'sectionTag',
              type: 'text',
            },
            {
              name: 'sectionTitle',
              type: 'text',
            },
            {
              name: 'sectionSubtitle',
              type: 'text',
            },
            {
              name: 'products',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'weight',
                  type: 'text',
                },
                {
                  name: 'price',
                  type: 'text',
                },
                {
                  name: 'origin',
                  type: 'text',
                },
                {
                  name: 'category',
                  type: 'text',
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'tags',
                  type: 'array',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Upload image OR use Image URL below (URL takes priority)',
                  },
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'Image URL (ImageKit / External)',
                  admin: {
                    description: 'Paste an ImageKit or external image URL directly. Takes priority over uploaded image.',
                  },
                },
                {
                  name: 'bg',
                  type: 'text',
                  defaultValue: 'linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)',
                  admin: {
                    description: 'CSS background gradient for the card',
                  },
                },
              ],
            },
          ],
        },
        // 3. Why Choose block
        {
          slug: 'why-choose',
          labels: {
            singular: 'Why Choose Section',
            plural: 'Why Choose Sections',
          },
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
            },
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'body',
              type: 'textarea',
            },
            {
              name: 'ctaText',
              type: 'text',
            },
            {
              name: 'ctaHref',
              type: 'text',
            },
            {
              name: 'videoThumbnail',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload image OR use URL below (URL takes priority)',
              },
            },
            {
              name: 'videoThumbnailUrl',
              type: 'text',
              label: 'Video Thumbnail URL (ImageKit / External)',
              admin: {
                description: 'Paste an ImageKit or external image URL. Takes priority over uploaded thumbnail.',
              },
            },
            {
              name: 'videoUrl',
              type: 'text',
              admin: {
                description: 'YouTube embed url or direct link',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload image OR use URL below (URL takes priority)',
              },
            },
            {
              name: 'heroImageUrl',
              type: 'text',
              label: 'Hero Image URL (ImageKit / External)',
              admin: {
                description: 'Paste an ImageKit or external image URL. Takes priority over uploaded image.',
              },
            },
            {
              name: 'cards',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Upload image OR use Image URL below (URL takes priority)',
                  },
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'Image URL (ImageKit / External)',
                  admin: {
                    description: 'Paste an ImageKit or external image URL. Takes priority over uploaded image.',
                  },
                },
              ],
            },
          ],
        },
        // 4. Product Slider block
        {
          slug: 'product-slider',
          labels: {
            singular: 'Product Slider',
            plural: 'Product Sliders',
          },
          fields: [
            {
              name: 'headerLabel',
              type: 'text',
            },
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'products',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'category',
                  type: 'text',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Upload image OR use Image URL below (URL takes priority)',
                  },
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'Image URL (ImageKit / External)',
                  admin: {
                    description: 'Paste an ImageKit or external image URL. Takes priority over uploaded image.',
                  },
                },
                {
                  name: 'badge',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // 5. Stats block
        {
          slug: 'stats',
          labels: {
            singular: 'Stats Section',
            plural: 'Stats Sections',
          },
          fields: [
            {
              name: 'stats',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Globe', value: 'globe' },
                    { label: 'Map', value: 'map' },
                    { label: 'Dashboard/Clock', value: 'dashboard' },
                    { label: 'Smile', value: 'smile' },
                  ],
                  required: true,
                },
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'suffix',
                  type: 'text',
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        // 6. Farm Section block
        {
          slug: 'farm-section',
          labels: {
            singular: 'Farm Section',
            plural: 'Farm Sections',
          },
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
            },
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'ctaText',
              type: 'text',
            },
            {
              name: 'ctaHref',
              type: 'text',
            },
          ],
        },
        // 7. Third Section block (Contact/Features)
        {
          slug: 'third-section',
          labels: {
            singular: 'Contact & Features Section',
            plural: 'Contact & Features Sections',
          },
          fields: [
            {
              name: 'tagline',
              type: 'text',
            },
            {
              name: 'headline',
              type: 'text',
            },
            {
              name: 'headlineAccent',
              type: 'text',
            },
            {
              name: 'bodyText1',
              type: 'textarea',
            },
            {
              name: 'bodyText2',
              type: 'textarea',
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'sub',
                  type: 'text',
                },
                {
                  name: 'iconType',
                  type: 'select',
                  options: [
                    { label: '100% Natural Leaf', value: 'natural' },
                    { label: 'FSSAI Certified Shield', value: 'certified' },
                    { label: 'Bulk Delivery Truck', value: 'bulk' },
                    { label: 'Wholesale Price Dollar', value: 'pricing' },
                  ],
                  required: true,
                },
              ],
            },
            {
              name: 'ctaText',
              type: 'text',
            },
            {
              name: 'ctaHref',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
};
