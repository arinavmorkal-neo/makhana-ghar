import { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'status', 'grade', 'updatedAt'],
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
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (e.g. 4-suta-round-makhana-flake)',
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
      required: true,
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
          required: true,
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
