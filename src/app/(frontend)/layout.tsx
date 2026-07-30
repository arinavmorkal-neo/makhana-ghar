import type { Metadata } from 'next';
import Script from 'next/script';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import LoadingScreen from '../components/LoadingScreen';
import { organizationJsonLd } from '../lib/jsonLd';
import './globals.css';

const defaultMeta = {
  title: 'Makhana Shop – Premium Organic Fox Nuts',
  description:
    'Hand-picked, organic makhana (fox nuts) roasted to perfection. A premium guilt-free snack delivered straight to your door.',
  keywords: 'makhana, fox nuts, organic snacks, healthy snacks, roasted makhana',
};

export async function generateMetadata(): Promise<Metadata> {
  const base: Metadata = {
    metadataBase: new URL('https://www.makhanaghar.com'),
    alternates: { canonical: '/' },
  };

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
        ...base,
        title: seo?.metaTitle || defaultMeta.title,
        description: seo?.metaDescription || defaultMeta.description,
        keywords: seo?.metaKeywords || defaultMeta.keywords,
      };
    }
  } catch {
    // Database may not be available during build — use defaults
  }

  return {
    ...base,
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
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W2TM4GPB');`}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J38ME748LK"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-J38ME748LK');`}
        </Script>
        {/* End Google tag */}

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

        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W2TM4GPB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LoadingScreen>
          {children}
        </LoadingScreen>
      </body>
    </html>
  );
}

