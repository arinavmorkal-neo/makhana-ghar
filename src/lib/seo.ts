import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const SITE_URL = 'https://www.makhanaghar.in';
export const SITE_NAME = 'Makhana Ghar';

export interface SeoInput {
  title?: string | null;
  description?: string | null;
  primaryKeywords?: string | null;
  secondaryKeywords?: string | null;
  metaKeywords?: string | null;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Combines primary, secondary, and legacy keywords into a clean, deduplicated array.
 */
export function combineKeywords(
  primary?: string | null,
  secondary?: string | null,
  legacy?: string | null,
  fallback: string[] = []
): string[] {
  const parts: string[] = [];

  if (primary) {
    parts.push(...primary.split(',').map((k) => k.trim()).filter(Boolean));
  }
  if (secondary) {
    parts.push(...secondary.split(',').map((k) => k.trim()).filter(Boolean));
  }
  if (legacy) {
    parts.push(...legacy.split(',').map((k) => k.trim()).filter(Boolean));
  }

  if (parts.length === 0) {
    return fallback;
  }

  // Deduplicate while preserving case-insensitive uniqueness
  const seen = new Set<string>();
  const result: string[] = [];

  for (const kw of parts) {
    const lower = kw.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(kw);
    }
  }

  return result;
}

/**
 * Builds standard Next.js Metadata object from given SEO attributes.
 */
export function constructMetadata({
  title,
  description,
  primaryKeywords,
  secondaryKeywords,
  metaKeywords,
  path = '',
  image = '/logo.webp',
  noIndex = false,
}: SeoInput): Metadata {
  const pageTitle = title ? `${title}` : `${SITE_NAME} | Premium Wholesale Makhana Supplier from Bihar`;
  const pageDescription =
    description ||
    'Makhana Ghar is a premium Makhana manufacturer, wholesaler and exporter from Bihar, supplying high-quality Makhana to domestic and international markets.';

  const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const ogImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  const keywordsList = combineKeywords(primaryKeywords, secondaryKeywords, metaKeywords, [
    'makhana',
    'wholesale makhana',
    'makhana supplier',
    'fox nuts bihar',
    'bulk makhana',
    'phool makhana',
    'makhana manufacturer',
    'organic makhana export',
  ]);

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywordsList,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Fetches SEO data for a page from the Payload CMS `pages` collection.
 */
export async function getPageMetadata(slug: string, fallback: SeoInput): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const page = result.docs[0] as any;
      const seo = page.seo || {};

      return constructMetadata({
        title: seo.metaTitle || page.title || fallback.title,
        description: seo.metaDescription || fallback.description,
        primaryKeywords: seo.primaryKeywords || fallback.primaryKeywords,
        secondaryKeywords: seo.secondaryKeywords || fallback.secondaryKeywords,
        metaKeywords: seo.metaKeywords || fallback.metaKeywords,
        path: fallback.path || `/${slug === 'home' ? '' : slug}`,
        image: fallback.image,
        noIndex: fallback.noIndex,
      });
    }
  } catch (err) {
    console.warn(`[SEO] Failed to fetch CMS metadata for page "${slug}":`, err);
  }

  return constructMetadata(fallback);
}

/**
 * Fetches SEO data for a single product from the Payload CMS `products` collection.
 */
export async function getProductMetadata(slug: string): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const product = result.docs[0] as any;
      const seo = product.seo || {};

      const defaultPrimaryKws = `${product.name}, ${product.grade || 'Makhana'} wholesale, buy ${product.name} bulk, bihar makhana ${product.grade || ''}`.trim();
      const defaultSecondaryKws = `phool makhana grade ${product.grade || ''}, wholesale fox nuts supplier, organic popped lotus seed, makhana price per kg, bulk lotus seeds bihar`;

      return constructMetadata({
        title: seo.metaTitle || `${product.name} | Premium Wholesale Makhana - Makhana Ghar`,
        description:
          seo.metaDescription ||
          product.description ||
          `Buy ${product.name} at wholesale prices. 100% natural, farm-fresh from Bihar, FSSAI certified. Inquire for bulk orders worldwide.`,
        primaryKeywords: seo.primaryKeywords || defaultPrimaryKws,
        secondaryKeywords: seo.secondaryKeywords || defaultSecondaryKws,
        metaKeywords: seo.metaKeywords,
        path: `/product/${slug}`,
        image: product.mainImageUrl || '/4+.webp',
      });
    }
  } catch (err) {
    console.warn(`[SEO] Failed to fetch product SEO for "${slug}":`, err);
  }

  // Fallback for not found or error
  return constructMetadata({
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | Makhana Ghar`,
    description: 'Premium quality Makhana sourced directly from the pristine ponds of Bihar.',
    path: `/product/${slug}`,
    primaryKeywords: 'makhana product, wholesale makhana, bulk fox nuts',
    secondaryKeywords: 'bihar makhana, phool makhana, organic lotus seed',
  });
}

/**
 * Fetches SEO data for a single blog post from the Payload CMS `blogs` collection.
 */
export async function getBlogMetadata(slug: string): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'blogs',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const blog = result.docs[0] as any;
      const seo = blog.seo || {};

      return constructMetadata({
        title: seo.metaTitle || `${blog.title} | Makhana Ghar Blog`,
        description: seo.metaDescription || blog.excerpt || 'Read the latest insights and industry news from Makhana Ghar.',
        primaryKeywords: seo.primaryKeywords || `${blog.category || 'Makhana'}, makhana benefits, fox nuts guide`,
        secondaryKeywords: seo.secondaryKeywords || 'phool makhana tips, healthy snacks guide, makhana wholesale business',
        metaKeywords: seo.metaKeywords,
        path: `/blog/${slug}`,
        image: blog.imageUrl || '/banner1.webp',
      });
    }
  } catch (err) {
    console.warn(`[SEO] Failed to fetch blog SEO for "${slug}":`, err);
  }

  return constructMetadata({
    title: 'Blog | Makhana Ghar',
    description: 'Insights on premium Makhana sourcing, export tips, and wholesale business.',
    path: `/blog/${slug}`,
  });
}
