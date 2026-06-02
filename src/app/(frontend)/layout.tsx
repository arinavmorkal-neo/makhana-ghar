import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import LoadingScreen from '../components/LoadingScreen';
import './globals.css';

const defaultMeta = {
  title: 'Makhana Shop – Premium Organic Fox Nuts',
  description:
    'Hand-picked, organic makhana (fox nuts) roasted to perfection. A premium guilt-free snack delivered straight to your door.',
  keywords: 'makhana, fox nuts, organic snacks, healthy snacks, roasted makhana',
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    });

    if (result.docs.length > 0) {
      const page = result.docs[0] as any;
      const seo = page.seo;
      return {
        title: seo?.metaTitle || defaultMeta.title,
        description: seo?.metaDescription || defaultMeta.description,
        keywords: seo?.metaKeywords || defaultMeta.keywords,
      };
    }
  } catch {
    // Database may not be available during build — use defaults
  }

  return {
    title: defaultMeta.title,
    description: defaultMeta.description,
    keywords: defaultMeta.keywords,
  };
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Single consolidated Google Fonts request — all families in one call */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&family=Nunito:wght@400;600;700&family=Playfair+Display:wght@600;700;900&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Preload LCP image — hero banner */}
        <link
          rel="preload"
          as="image"
          href="/banner1.webp"
          type="image/webp"
        />
      </head>
      <body suppressHydrationWarning>
        <LoadingScreen>
          {children}
        </LoadingScreen>
      </body>
    </html>
  );
}

