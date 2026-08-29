import type { CollectionConfig } from 'payload';

const formatSlug = (val: string): string =>
  val
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || '';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'status', 'grade', 'updatedAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          if (!data.slug && data.name) {
            data.slug = formatSlug(data.name);
          } else if (data.slug) {
            data.slug = formatSlug(data.slug);
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from Product Name if left blank (e.g. makhana-4-sutta)',
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
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Short tagline shown below the title (e.g. Why Choose this product?)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Product Description',
    },
    {
      name: 'aboutUs',
      type: 'textarea',
      label: 'About Us',
      admin: {
        description: 'Company/brand info shown in the About Us tab on the product page',
      },
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Product Image',
      admin: {
        description: 'Upload an image, OR paste a direct URL below',
      },
    },
    {
      name: 'mainImageUrl',
      type: 'text',
      label: 'Main Image Direct URL',
      admin: {
        description: 'Paste a direct image URL here (use this OR upload above). This takes priority over upload.',
      },
    },
    {
      name: 'galleryImages',
      type: 'array',
      label: 'Gallery Images (Thumbnails)',
      maxRows: 5,
      fields: [
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
            description: 'Paste a direct image URL (use this OR upload above). This takes priority.',
          },
        },
      ],
    },
    // Specs
    {
      name: 'specs',
      type: 'array',
      label: 'Product Specifications',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { width: '40%' },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { width: '60%' },
        },
      ],
    },
    // Ratings
    {
      name: 'rating',
      type: 'number',
      defaultValue: 4.8,
      min: 0,
      max: 5,
      admin: {
        position: 'sidebar',
        step: 0.1,
      },
    },
    {
      name: 'reviews',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    // Grade info
    {
      name: 'grade',
      type: 'text',
      label: 'Grade / Category',
      admin: {
        position: 'sidebar',
        description: 'e.g. 4 Suta, 5 Suta, 6+ Suta',
      },
    },
    {
      name: 'isOrganic',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Organic Badge',
      admin: {
        position: 'sidebar',
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
          admin: {
            description: 'Product page title (e.g. 6+ Suta Makhana Wholesale | Makhana Ghar)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Short summary of the product for search results (recommended: 150-160 characters)',
          },
        },
        {
          name: 'primaryKeywords',
          type: 'text',
          label: 'Primary Keywords',
          admin: {
            description: 'Core product keywords, comma-separated (e.g. 6 suta makhana, jumbo makhana wholesale, buy 6+ suta fox nuts)',
          },
        },
        {
          name: 'secondaryKeywords',
          type: 'textarea',
          label: 'Secondary / LSI Keywords',
          admin: {
            description: 'Secondary and related search terms, comma-separated (e.g. bihar grade A makhana, export quality phool makhana, organic popped lotus seed)',
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
