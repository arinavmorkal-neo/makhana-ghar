const SITE_URL = 'https://www.makhanaghar.in';

/**
 * Organization + WebSite schema — injected once in the layout.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Makhana Ghar',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.webp`,
          width: 512,
          height: 512,
        },
        description:
          'Makhana Ghar is a trusted supplier of premium-quality Makhana, sourced directly from the farms of Bihar, India.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bihar',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-8002661555',
          contactType: 'customer service',
          email: 'makhanaghar.marketing@gmail.com',
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61590384691167',
          'https://www.instagram.com/makhanaghar/',
          'https://x.com/makhanaghar',
          'https://www.linkedin.com/in/makhana-ghar-a155ba41a',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Makhana Ghar',
        alternateName: 'Makhana Ghar',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
}

/**
 * BreadcrumbList schema helper.
 */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Product schema for individual product pages.
 */
export function productJsonLd(product: {
  name: string;
  slug: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((img) =>
      img.startsWith('http') ? img : `${SITE_URL}${img}`,
    ),
    url: `${SITE_URL}/product/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Makhana Ghar',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
    category: 'Makhana (Fox Nuts)',
    manufacturer: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Article schema for blog pages.
 */
export function articleJsonLd(blog: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image.startsWith('http')
      ? blog.image
      : `${SITE_URL}${blog.image}`,
    url: `${SITE_URL}/blog/${blog.slug}`,
    datePublished: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${blog.slug}`,
    },
  };
}
