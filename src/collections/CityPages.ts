import { CollectionConfig } from 'payload';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'makhana-revalidate-secret-key';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.makhanaghar.in';

async function triggerRevalidation(slug: string) {
  if (!slug) return;
  try {
    const targetUrl = `${SITE_URL}/api/revalidate?secret=${encodeURIComponent(REVALIDATION_SECRET)}&path=${encodeURIComponent(`/makhana-supplier/${slug}`)}`;
    // Non-blocking fire & forget
    fetch(targetUrl, { method: 'POST' }).catch(() => {});
    fetch(`${SITE_URL}/api/revalidate?secret=${encodeURIComponent(REVALIDATION_SECRET)}&path=${encodeURIComponent('/sitemap.xml')}`, { method: 'POST' }).catch(() => {});
  } catch {}
}

export const CityPages: CollectionConfig = {
  slug: 'city-pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'cityName',
    defaultColumns: ['cityName', 'slug', 'state', 'status', 'updatedAt'],
    description: 'Manage city-wise SEO landing pages for Makhana wholesale and distribution.',
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        if (doc?.slug) {
          triggerRevalidation(doc.slug);
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) {
          triggerRevalidation(doc.slug);
        }
      },
    ],
  },
  fields: [
    // ── 1. Basic Info ──
    {
      name: 'cityName',
      type: 'text',
      label: 'City Name',
      required: true,
      admin: {
        description: 'e.g. Pune, Mumbai, Delhi, Bangalore, Hyderabad',
      },
    },
    {
      name: 'state',
      type: 'text',
      label: 'State / Region',
      admin: {
        description: 'e.g. Maharashtra, Delhi NCR, Karnataka, Telangana',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly slug (e.g. pune, mumbai, delhi). Accessible at /makhana-supplier/[slug]',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published (Publicly Visible)', value: 'published' },
        { label: 'Draft (Hidden)', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Priority order in lists/sitemaps (lower numbers appear first)',
      },
    },

    // ── 2. Hero Section ──
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero & Overview',
          fields: [
            {
              name: 'heroTag',
              type: 'text',
              label: 'Hero Badge / Tag',
              defaultValue: 'Direct Farm Sourcing from Bihar',
            },
            {
              name: 'heroHeading',
              type: 'text',
              label: 'Hero Main Heading (H1)',
              admin: {
                description: 'Leave empty for auto-generated: "Premium Makhana Wholesale Supplier in {City}"',
              },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Hero Subtitle / Description',
              admin: {
                description: 'Brief overview tailored for buyers, wholesalers, and retail chains in this city.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Background Image',
            },
            {
              name: 'heroImageUrl',
              type: 'text',
              label: 'Hero Image URL (Optional - ImageKit / External)',
              defaultValue: '/banner1.webp',
            },
            {
              name: 'ctaText',
              type: 'text',
              label: 'Primary CTA Button Text',
              defaultValue: 'Get Wholesale Quote',
            },
            {
              name: 'ctaPhone',
              type: 'text',
              label: 'Call Direct Number',
              defaultValue: '+91 8002661555',
            },
          ],
        },

        // ── 3. Local Intro & Delivery Hubs ──
        {
          label: 'Local Delivery & About',
          fields: [
            {
              name: 'introTitle',
              type: 'text',
              label: 'Local Introduction Title',
              admin: {
                description: 'e.g. "Direct Farm-to-Business Makhana Supply Across {City}"',
              },
            },
            {
              name: 'introDescription',
              type: 'textarea',
              label: 'Local Introduction Text',
              admin: {
                description: 'Explain supply capabilities, freshness, delivery timelines, and reliability in this specific market.',
              },
            },
            {
              name: 'deliveryAreasTitle',
              type: 'text',
              label: 'Key Delivery Areas / Hubs Title',
              defaultValue: 'Fast Delivery Across Key Hubs & Markets',
            },
            {
              name: 'deliveryAreas',
              type: 'array',
              label: 'Local Delivery Zones / Markets',
              admin: {
                description: 'Add prominent commercial hubs, wholesale mandis, and retail areas in this city.',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Area / Zone Name',
                },
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Badge / Tag (e.g. "Wholesale Hub", "24-48h Delivery")',
                },
              ],
            },
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'About Makhana Ghar Section Title',
              defaultValue: 'Why Businesses Choose Makhana Ghar',
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              label: 'About Section Description',
            },
            {
              name: 'aboutPoints',
              type: 'array',
              label: 'Key Advantages (Bullet Points)',
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
              ],
            },
          ],
        },

        // ── Founder & Vision ──
        {
          label: 'Founder & Vision',
          fields: [
            {
              name: 'showFounderSection',
              type: 'checkbox',
              label: 'Display Founder Section on this City Page',
              defaultValue: true,
            },
            {
              name: 'founderEyebrow',
              type: 'text',
              label: 'Eyebrow Tag',
              defaultValue: 'Leadership & Vision',
            },
            {
              name: 'founderTitle',
              type: 'text',
              label: 'Founder Section Title',
              admin: {
                description: 'e.g. "Meet Our Founder – Connecting Bihar to {City}" (Leave empty for auto)',
              },
            },
            {
              name: 'founderName',
              type: 'text',
              label: 'Founder Name',
              defaultValue: 'Arinav Morkal',
            },
            {
              name: 'founderRole',
              type: 'text',
              label: 'Founder Role / Title',
              defaultValue: 'Founder & CEO, Makhana Ghar',
            },
            {
              name: 'founderBio',
              type: 'textarea',
              label: 'Founder Bio / Message for this City',
              admin: {
                description: 'Leave empty to use default biography from About Us page.',
              },
            },
            {
              name: 'founderQuote',
              type: 'textarea',
              label: 'Founder Quote / Vision Statement',
              defaultValue: 'Our commitment is to bring the purest, unadulterated Makhana directly from Bihar’s pristine wetlands to wholesale buyers with zero compromise on quality and moisture standards.',
            },
            {
              name: 'founderImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Founder Photo Upload',
            },
            {
              name: 'founderImageUrl',
              type: 'text',
              label: 'Founder Photo URL (ImageKit / External / Public)',
              defaultValue: '/image/arinav.png',
            },
            {
              name: 'founderBadge',
              type: 'text',
              label: 'Image Badge',
              defaultValue: 'Since 2015',
            },
          ],
        },

        // ── 4. Featured Makhana Grades ──
        {
          label: 'Grades & Products',
          fields: [
            {
              name: 'gradesTitle',
              type: 'text',
              label: 'Grades Section Title',
              defaultValue: 'Premium Export-Grade Makhana Varieties Available',
            },
            {
              name: 'gradesSubtitle',
              type: 'text',
              label: 'Grades Section Subtitle',
              defaultValue: 'Handpicked, machine-graded, and moisture-controlled for maximum crunch and shelf-life.',
            },
            {
              name: 'customGrades',
              type: 'array',
              label: 'City-Specific Featured Grades',
              admin: {
                description: 'Customize featured varieties for this market or leave empty to use standard defaults.',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Grade Name (e.g. 6+ Sutta Jumbo Makhana)',
                },
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Badge (e.g. "Top Export Grade", "Best Seller")',
                },
                {
                  name: 'size',
                  type: 'text',
                  label: 'Size / Diameter (e.g. 18mm+, 16.5mm, 12.7mm)',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Short Description',
                },
                {
                  name: 'imageUrl',
                  type: 'text',
                  label: 'Image URL',
                },
                {
                  name: 'productSlug',
                  type: 'text',
                  label: 'Product Details Page Slug (e.g. premium-6-plus-sutta-raw-makhana)',
                  admin: {
                    description: 'Links the button directly to this product detail page (/product/[slug]).',
                  },
                },
              ],
            },
          ],
        },

        // ── 5. Why Choose Us ──
        {
          label: 'Why Choose & Process',
          fields: [
            {
              name: 'whyChooseTitle',
              type: 'text',
              label: 'Why Choose Section Title',
              defaultValue: 'The Makhana Ghar Advantage',
            },
            {
              name: 'whyChooseCards',
              type: 'array',
              label: 'Why Choose Cards',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'quality',
                  options: [
                    { label: '✅ Quality & FSSAI', value: 'quality' },
                    { label: '💰 Direct Farm Pricing', value: 'pricing' },
                    { label: '🚚 Fast Logistics', value: 'shipping' },
                    { label: '📦 Custom Packaging / Private Label', value: 'packaging' },
                    { label: '🌍 Global Standards', value: 'global' },
                    { label: '👥 Dedicated Account Manager', value: 'support' },
                  ],
                },
              ],
            },
            {
              name: 'processTitle',
              type: 'text',
              label: 'Supply Chain Process Title',
              defaultValue: 'From Bihar Ponds to Your Doorstep',
            },
            {
              name: 'processSteps',
              type: 'array',
              label: 'Process Steps',
              fields: [
                {
                  name: 'stepNumber',
                  type: 'text',
                  label: 'Step (e.g. 01, 02)',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── 6. Testimonials & FAQs ──
        {
          label: 'FAQs & Reviews',
          fields: [
            {
              name: 'faqsTitle',
              type: 'text',
              label: 'FAQs Section Title',
              defaultValue: 'Frequently Asked Questions',
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'City-Specific FAQs',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'testimonialsTitle',
              type: 'text',
              label: 'Client Reviews Title',
              defaultValue: 'Trusted by Businesses & Wholesalers',
            },
            {
              name: 'testimonials',
              type: 'array',
              label: 'Local Reviews / Testimonials',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'role',
                  type: 'text',
                  label: 'Business / Area (e.g. "Wholesale Trader, APMC Market")',
                },
                {
                  name: 'rating',
                  type: 'number',
                  defaultValue: 5,
                },
                {
                  name: 'review',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },

        // ── 7. SEO Configuration ──
        {
          label: 'SEO & Metadata',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'Search Engine Optimization',
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  label: 'Meta Title',
                  admin: {
                    description: 'Recommended: 50-60 characters (e.g. "Makhana Wholesale Supplier in Pune | Makhana Ghar")',
                  },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  label: 'Meta Description',
                  admin: {
                    description: 'Recommended: 150-160 characters describing wholesale supply, grades, and contact info in this city.',
                  },
                },
                {
                  name: 'focusKeyword',
                  type: 'text',
                  label: 'Focus / Primary Keyword (Internal Tracking)',
                  admin: {
                    description: 'For admin/content management only. Not emitted as a legacy meta tag.',
                  },
                },
                {
                  name: 'secondaryKeywords',
                  type: 'textarea',
                  label: 'Secondary / LSI Keywords (Internal Tracking)',
                  admin: {
                    description: 'Comma-separated related queries for internal content planning.',
                  },
                },
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  label: 'Custom Canonical URL (Optional)',
                  admin: {
                    description: 'Leave empty for automatic canonical (https://www.makhanaghar.in/makhana-supplier/{slug})',
                  },
                },
                {
                  name: 'ogTitle',
                  type: 'text',
                  label: 'OpenGraph Title',
                },
                {
                  name: 'ogDescription',
                  type: 'textarea',
                  label: 'OpenGraph Description',
                },
                {
                  name: 'ogImageUrl',
                  type: 'text',
                  label: 'OpenGraph Image URL',
                  defaultValue: '/banner1.webp',
                },
                {
                  name: 'robotsIndex',
                  type: 'checkbox',
                  label: 'Allow Search Engines to Index this Page (index)',
                  defaultValue: true,
                },
                {
                  name: 'robotsFollow',
                  type: 'checkbox',
                  label: 'Allow Search Engines to Follow Links (follow)',
                  defaultValue: true,
                },
                {
                  name: 'customSchemaJson',
                  type: 'textarea',
                  label: 'Custom Additional Schema JSON (Optional)',
                  admin: {
                    description: 'Paste any optional custom JSON-LD object to inject alongside Breadcrumb, Organization, and FAQ schema.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
