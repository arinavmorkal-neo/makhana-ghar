import type { Metadata } from 'next';
import Script from 'next/script';
import LoadingScreen from '../components/LoadingScreen';
import { organizationJsonLd } from '../lib/jsonLd';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.makhanaghar.in'),

  title: {
    default: 'Makhana Ghar | Premium Wholesale Makhana Supplier from Bihar',
    template: '%s | Makhana Ghar',
  },

  description:
    'Makhana Ghar is a premium Makhana manufacturer, wholesaler and exporter from Bihar, supplying high-quality Makhana to domestic and international markets.',

  applicationName: 'Makhana Ghar',

  alternates: {
    canonical: 'https://www.makhanaghar.in/',
  },

  openGraph: {
    title: 'Makhana Ghar | Premium Wholesale Makhana Supplier from Bihar',
    description:
      'Premium Makhana manufacturer, wholesaler and exporter from Bihar.',
    url: 'https://www.makhanaghar.in/',
    siteName: 'Makhana Ghar',
    type: 'website',
  },
};

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

