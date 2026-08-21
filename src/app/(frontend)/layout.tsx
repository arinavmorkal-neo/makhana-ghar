import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';
import {
  Inter,
  Poppins,
  Playfair_Display,
  Caveat,
  Nunito,
  DM_Sans,
  Bebas_Neue,
} from 'next/font/google';
import LoadingScreen from '../components/LoadingScreen';
import { GeoProvider } from '../components/GeoProvider';
import { organizationJsonLd } from '../lib/jsonLd';
import './globals.css';

/* ── Self-hosted Google Fonts ─────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  display: 'swap',
  variable: '--font-playfair',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-caveat',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-nunito',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bebas',
});

/* ── Local font: Farmhame ─────────────────────────────── */
const farmhame = localFont({
  src: '../../../public/fonts/Farmhouse.ttf',
  display: 'swap',
  variable: '--font-farmhame',
});

/* Combine all CSS variable classes */
const fontVariables = [
  inter.variable,
  poppins.variable,
  playfairDisplay.variable,
  caveat.variable,
  nunito.variable,
  dmSans.variable,
  bebasNeue.variable,
  farmhame.variable,
].join(' ');

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
    <html lang="en" className={fontVariables}>
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
        <GeoProvider>
          <LoadingScreen>
            {children}
          </LoadingScreen>
        </GeoProvider>
      </body>
    </html>
  );
}
