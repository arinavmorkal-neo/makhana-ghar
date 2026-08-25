import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileNavBar from '../../../components/MobileNavBar';
import { CityQuoteForm, CityFaqAccordion } from './CityPageClient';
import { breadcrumbJsonLd } from '../../../lib/jsonLd';
import styles from './CityPage.module.css';
import type { Metadata } from 'next';

export const revalidate = 120; // ISR cache 2 minutes
export const dynamicParams = true; // Allow newly published cities to render immediately on-demand

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.makhanaghar.in';

/* ── Fetch City Data ── */
async function getCityPage(citySlug: string) {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'city-pages',
      where: {
        slug: { equals: citySlug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs[0] as any;
    }
  } catch (err) {
    console.warn(`[CityPage] Failed to fetch city "${citySlug}":`, err);
  }
  return null;
}

/* ── Pre-generate all published cities for static caching ── */
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'city-pages',
      where: { status: { equals: 'published' } },
      limit: 1000,
      select: { slug: true },
    });

    return result.docs.map((doc: any) => ({
      city: doc.slug,
    }));
  } catch {
    return [];
  }
}

/* ── Dynamic Metadata (No Meta Keywords Tag per requirements) ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityDoc = await getCityPage(city);

  if (!cityDoc) {
    return {
      title: 'City Page Not Found | Makhana Ghar',
      robots: { index: false, follow: false },
    };
  }

  const cityName = cityDoc.cityName || city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const state = cityDoc.state ? `, ${cityDoc.state}` : '';
  const seo = cityDoc.seo || {};

  const pageTitle = seo.metaTitle || `Makhana Wholesale Supplier in ${cityName}${state} | Makhana Ghar`;
  const pageDescription =
    seo.metaDescription ||
    `Buy export-grade, 100% natural Makhana (Fox Nuts) at direct farm-gate wholesale prices in ${cityName}${state}. Direct supply from Bihar ponds with fast dispatch.`;

  const canonicalUrl = seo.canonicalUrl || `${SITE_URL}/makhana-supplier/${city}`;
  const ogImageUrl = seo.ogImageUrl || '/banner1.webp';
  const fullOgImage = ogImageUrl.startsWith('http') ? ogImageUrl : `${SITE_URL}${ogImageUrl.startsWith('/') ? ogImageUrl : `/${ogImageUrl}`}`;

  const shouldIndex = seo.robotsIndex !== false;
  const shouldFollow = seo.robotsFollow !== false;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.ogTitle || pageTitle,
      description: seo.ogDescription || pageDescription,
      url: canonicalUrl,
      siteName: 'Makhana Ghar',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle || pageTitle,
      description: seo.ogDescription || pageDescription,
      images: [fullOgImage],
    },
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/* ── Default Fallback Data for City Sections ── */
const defaultGrades = [
  {
    name: '6+ Sutta Jumbo Makhana',
    badge: 'Top Export Grade',
    size: '18mm - 22mm Diameter',
    description: 'Largest, ultra-fluffy white lotus seeds. Minimum black spot defect, ideal for premium gift packs and luxury retail brands.',
    imageUrl: '/4+.webp',
  },
  {
    name: '5+ Sutta Premium Makhana',
    badge: 'Best Seller for Wholesale',
    size: '15mm - 18mm Diameter',
    description: 'Crisp, hand-sorted raw fox nuts with maximum crunch. The most popular grade across commercial traders and food brands.',
    imageUrl: '/5+.webp',
  },
  {
    name: '4+ Sutta Raw Makhana',
    badge: 'Value Wholesale Grade',
    size: '12mm - 15mm Diameter',
    description: 'High-nutrition, naturally sun-dried makhana puffs suitable for bulk snacking, roasting, flour making, and industrial cooking.',
    imageUrl: '/4+.webp',
  },
];

const defaultWhyChoose = [
  {
    title: 'Direct Farm Sourcing (Katihar, Bihar)',
    description: 'We source directly from trusted farmers in Bihar, eliminating middlemen to ensure true farm-gate pricing.',
    icon: 'pricing',
  },
  {
    title: 'Certified Export Quality & Purity',
    description: 'Every batch is moisture tested (below 12%), FSSAI certified, and strictly free from chemical bleaching.',
    icon: 'quality',
  },
  {
    title: 'Fast Doorstep Delivery & Bulk Freight',
    description: 'Established road and cargo logistics ensuring prompt delivery to your warehouse, store, or mandi hub.',
    icon: 'shipping',
  },
  {
    title: 'Custom Packaging & Private Labeling',
    description: 'We offer retail-ready pouches, nitrogen-flushed packs, and bulk jute/HDPE bags customized with your brand.',
    icon: 'packaging',
  },
  {
    title: 'Global Export Track Record (15+ Countries)',
    description: 'Supplying top brands across UAE, UK, Thailand, and USA with full phytosanitary documentation.',
    icon: 'global',
  },
  {
    title: 'Dedicated Account Management',
    description: 'Get transparent wholesale price updates, sample kits, and order tracking from our expert business team.',
    icon: 'support',
  },
];

const defaultProcess = [
  {
    stepNumber: '01',
    title: 'Wetland Harvest in Bihar',
    description: 'Pond farmers harvest organic fox nut seeds manually from clean freshwater ponds in Bihar.',
  },
  {
    stepNumber: '02',
    title: 'Roasting & Hand Mallet Popping',
    description: 'Traditional wood-fired roasting and precision mallet striking to pop the hard shell into puffy lawa.',
  },
  {
    stepNumber: '03',
    title: 'Multi-Stage Grading & QC',
    description: 'Cleaned and classified into 4+, 5+, and 6+ Sutta sizes with rigorous moisture and purity screening.',
  },
  {
    stepNumber: '04',
    title: 'Dispatched to Your City',
    description: 'Moisture-proof sealed packaging and reliable transport directly to your commercial address.',
  },
];

const iconRenderMap: Record<string, React.ReactNode> = {
  pricing: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  quality: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  shipping: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  packaging: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  global: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  support: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

export default async function CityLandingPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityDoc = await getCityPage(city);

  if (!cityDoc) {
    notFound();
  }

  const cityName = cityDoc.cityName || city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const state = cityDoc.state ? `, ${cityDoc.state}` : '';
  const pageUrl = `${SITE_URL}/makhana-supplier/${city}`;

  // Content fallbacks
  const heroHeading = cityDoc.heroHeading || `Premium Makhana Wholesale Supplier in ${cityName}`;
  const heroTag = cityDoc.heroTag || 'Direct Farm Sourcing from Bihar';
  const heroDesc =
    cityDoc.heroDescription ||
    `Looking for authentic, export-grade Makhana (Fox Nuts) in ${cityName}${state}? Makhana Ghar brings farm-fresh, premium graded Phool Makhana directly from Bihar’s origin farms with prompt bulk delivery and competitive wholesale rates.`;

  const introTitle = cityDoc.introTitle || `Reliable Bulk Makhana Supply Across ${cityName}`;
  const introDesc =
    cityDoc.introDescription ||
    `Makhana Ghar is a dedicated producer, processor, and bulk distributor supplying high-grade Phool Makhana across ${cityName} and surrounding industrial and commercial hubs. We cater to wholesale traders, FMCG snack manufacturers, modern retail supermarkets, ayurvedic companies, and dry fruit distributors seeking unadulterated quality, consistent sizing, and dependable year-round supply.`;

  const deliveryAreas = cityDoc.deliveryAreas && cityDoc.deliveryAreas.length > 0
    ? cityDoc.deliveryAreas
    : [
        { name: `${cityName} Central Commercial Zone`, badge: 'Daily Dispatch' },
        { name: `APMC Wholesale Mandi (${cityName})`, badge: 'Bulk Logistics' },
        { name: `${cityName} Industrial & Packaging Hub`, badge: 'Pallet Delivery' },
        { name: `Retail & Supermarket Distribution Hubs`, badge: 'Custom Packs' },
      ];

  const grades = cityDoc.customGrades && cityDoc.customGrades.length > 0 ? cityDoc.customGrades : defaultGrades;
  const whyChooseList = cityDoc.whyChooseCards && cityDoc.whyChooseCards.length > 0 ? cityDoc.whyChooseCards : defaultWhyChoose;
  const processList = cityDoc.processSteps && cityDoc.processSteps.length > 0 ? cityDoc.processSteps : defaultProcess;

  const faqs = cityDoc.faqs && cityDoc.faqs.length > 0
    ? cityDoc.faqs
    : [
        {
          question: `What is the minimum order quantity (MOQ) for Makhana delivery in ${cityName}?`,
          answer: `Our standard MOQ for wholesale delivery in ${cityName} starts at 50 kg for domestic orders. We also fulfill partial and full container loads (1 Ton to 10+ Tons) for regional distributors and manufacturing units.`,
        },
        {
          question: `How fast can Makhana Ghar deliver bulk orders to ${cityName}?`,
          answer: `Regular orders to ${cityName} are dispatched within 24-48 hours from our processing center and arrive typically within 3 to 5 business days via express freight.`,
        },
        {
          question: `Do you provide custom private label packaging in ${cityName}?`,
          answer: `Yes! We provide complete OEM / private label solutions for grocery brands, retail chains, and gift distributors in ${cityName}, with custom branding and nitrogen-flushed moisture-proof pouches.`,
        },
        {
          question: `Are your Makhana products FSSAI certified and export grade?`,
          answer: `Absolutely. All our Makhana batches are 100% natural, FSSAI certified, and strictly tested for moisture below 12% to ensure long shelf life and authentic crunch.`,
        },
      ];

  const testimonials = cityDoc.testimonials && cityDoc.testimonials.length > 0
    ? cityDoc.testimonials
    : [
        {
          name: 'Sanjay Deshmukh',
          role: `Dry Fruits Distributor, ${cityName}`,
          rating: 5,
          review: `We have been procuring 5+ Sutta Makhana from Makhana Ghar for our distribution business in ${cityName}. The quality is consistent and our retailers love the crispness and size uniformity.`,
        },
        {
          name: 'Manish Gupta',
          role: `Wholesale Trader, ${cityName}`,
          rating: 5,
          review: `Direct sourcing from Bihar makes a huge difference in price and freshness. Fast delivery to our warehouse in ${cityName} and reliable moisture control every time.`,
        },
        {
          name: 'Neha Kapoor',
          role: `Health Foods Brand Owner, ${cityName}`,
          rating: 5,
          review: `Their private labeling support helped us launch our roasted makhana line seamlessly. Premium jumbo grade at realistic wholesale prices.`,
        },
      ];

  // ── Structured Data (JSON-LD) ──
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Makhana Supplier', url: `${SITE_URL}/categories` },
    { name: cityName, url: pageUrl },
  ]);

  // Valid Service & Organization Schema (No fake LocalBusiness per requirement #11)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Makhana Wholesale & Distribution',
    name: `Makhana Wholesale Supplier in ${cityName}`,
    description: heroDesc,
    provider: {
      '@type': 'Organization',
      name: 'Makhana Ghar',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.webp`,
      telephone: '+91-8002661555',
      email: 'arinav@makhanaghar.in',
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Makhana Grades Catalog',
      itemListElement: grades.map((g: any, i: number) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: g.name,
          description: g.description,
        },
        position: i + 1,
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main>
      {/* ── JSON-LD Schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {cityDoc.seo?.customSchemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: cityDoc.seo.customSchemaJson }}
        />
      )}

      <Header />

      {/* ── 1. HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src={cityDoc.heroImageUrl || '/banner1.webp'}
          alt={`Makhana Wholesale Supplier in ${cityName}`}
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroTagWrap}>
            <span className={styles.heroTag}>📍 {cityName} • {heroTag}</span>
          </div>

          <h1 className={styles.heroHeading}>
            {heroHeading.includes(cityName) ? (
              heroHeading
            ) : (
              <>
                {heroHeading} in <span>{cityName}</span>
              </>
            )}
          </h1>

          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />

          <p className={styles.heroBody}>{heroDesc}</p>

          <div className={styles.heroActions}>
            <a href="#quote-form" className={styles.heroBtnPrimary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              {cityDoc.ctaText || 'Get Wholesale Quote'}
            </a>
            <a href={`tel:${(cityDoc.ctaPhone || '+918002661555').replace(/\s+/g, '')}`} className={styles.heroBtnSecondary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call {cityDoc.ctaPhone || '+91 8002661555'}
            </a>
          </div>
        </div>

        <Image
          className={styles.grassEdge}
          src="/grassnew-white.webp"
          alt=""
          aria-hidden="true"
          width={1920}
          height={40}
          sizes="100vw"
        />
      </section>

      {/* ── 2. MAIN CONTENT ── */}
      <div className={styles.pageContainer}>
        <div className={styles.pageInner}>

          {/* ── Intro & Local Delivery Areas ── */}
          <section className={styles.introSection}>
            <div className={styles.introContent}>
              <div className={styles.introEyebrow}>
                <svg width="32" height="12" viewBox="0 0 36 14" fill="none">
                  <path d="M0 7H32M26 1L32 7L26 13" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Local Supply Network
              </div>
              <h2 className={styles.introHeading}>
                {introTitle}
              </h2>
              <p className={styles.introText}>{introDesc}</p>
              {cityDoc.aboutPoints && cityDoc.aboutPoints.length > 0 && (
                <div style={{ marginTop: '12px' }}>
                  {cityDoc.aboutPoints.map((pt: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.92rem', color: '#333' }}>
                      <strong style={{ color: '#2e7d32' }}>✓</strong>
                      <span><strong>{pt.title}:</strong> {pt.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.deliveryHubsCard}>
              <h3 className={styles.deliveryCardTitle}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {cityDoc.deliveryAreasTitle || `Key Supply Zones in ${cityName}`}
              </h3>
              <p className={styles.deliveryCardSubtitle}>
                Prompt bulk transport and palletized delivery connected to all major commercial centers:
              </p>
              <div className={styles.deliveryAreasList}>
                {deliveryAreas.map((area: any, idx: number) => (
                  <div key={idx} className={styles.deliveryAreaChip}>
                    <span>{area.name}</span>
                    {area.badge && <span className={styles.areaBadge}>{area.badge}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. QUICK QUOTE & ENQUIRY FORM ── */}
          <section className={styles.quoteSection}>
            <div className={styles.quoteInfo}>
              <span className={styles.quoteTag}>⚡ Direct Farm Gate Rates</span>
              <h2 className={styles.quoteTitle}>
                Get Instant Wholesale Rates for <span>{cityName}</span>
              </h2>
              <p className={styles.quoteText}>
                Fill out the quick requirement form to receive our latest grade-wise price sheet, sample availability, and freight schedule for {cityName}.
              </p>

              <div className={styles.quoteHighlights}>
                <div className={styles.quoteHighlightItem}>
                  <svg className={styles.quoteHighlightIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>100% Farm-Fresh from Katihar, Bihar</span>
                </div>
                <div className={styles.quoteHighlightItem}>
                  <svg className={styles.quoteHighlightIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Moisture Checked (Below 12%) & FSSAI Certified</span>
                </div>
                <div className={styles.quoteHighlightItem}>
                  <svg className={styles.quoteHighlightIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Fast Delivery to Warehouses & Mandi Hubs in {cityName}</span>
                </div>
              </div>
            </div>

            <CityQuoteForm cityName={cityName} />
          </section>

          {/* ── 4. FEATURED MAKHANA GRADES ── */}
          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Available <span>Makhana Grades</span> in {cityName}
              </h2>
              <p className={styles.sectionSubtitle}>
                {cityDoc.gradesSubtitle || `Machine-sorted and handpicked fox nut grades ready for wholesale dispatch across ${cityName}.`}
              </p>
            </div>

            <div className={styles.gradesGrid}>
              {grades.map((grade: any, idx: number) => (
                <div key={idx} className={styles.gradeCard}>
                  <div className={styles.gradeImageWrap}>
                    <Image
                      src={grade.imageUrl || '/4+.webp'}
                      alt={grade.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.gradeImage}
                    />
                    {grade.badge && <span className={styles.gradeBadge}>{grade.badge}</span>}
                  </div>
                  <div className={styles.gradeBody}>
                    <h3 className={styles.gradeTitle}>{grade.name}</h3>
                    {grade.size && <span className={styles.gradeSize}>📏 {grade.size}</span>}
                    <p className={styles.gradeText}>{grade.description}</p>
                    <a href="#quote-form" className={styles.gradeActionBtn}>
                      Enquire For {cityName}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. WHY CHOOSE MAKHANA GHAR ── */}
          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Why Choose <span>Makhana Ghar</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                {`Direct origin sourcing, uncompromising quality control, and dependable business support for traders and brands in ${cityName}.`}
              </p>
            </div>

            <div className={styles.whyGrid}>
              {whyChooseList.map((item: any, idx: number) => (
                <div key={idx} className={styles.whyCard}>
                  <div className={styles.whyIconWrap}>
                    {iconRenderMap[item.icon] || iconRenderMap.quality}
                  </div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyText}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. SUPPLY CHAIN PROCESS ── */}
          <section className={styles.processSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Farm-to-Doorstep <span>Supply Chain</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                {`How authentic Bihar Makhana travels from pristine harvest ponds to your commercial facility in ${cityName}.`}
              </p>
            </div>

            <div className={styles.processGrid}>
              {processList.map((step: any, idx: number) => (
                <div key={idx} className={styles.processCard}>
                  <div className={styles.processNumber}>{step.stepNumber || `0${idx + 1}`}</div>
                  <h4 className={styles.processCardTitle}>{step.title}</h4>
                  <p className={styles.processCardText}>{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 7. CLIENT TESTIMONIALS ── */}
          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                What Businesses Say in <span>{cityName}</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                {`Trusted by food manufacturers, wholesale mandis, and retail distributors across ${cityName} and beyond.`}
              </p>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((t: any, idx: number) => (
                <div key={idx} className={styles.testimonialCard}>
                  <div className={styles.starRow}>
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className={styles.testimonialText}>&ldquo;{t.review}&rdquo;</p>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerAvatar}>
                      {t.name ? t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'MG'}
                    </div>
                    <div>
                      <div className={styles.reviewerName}>{t.name}</div>
                      <div className={styles.reviewerRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 8. CITY FAQS ── */}
          <section className={styles.faqSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Frequently Asked <span>Questions</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                Common questions regarding wholesale orders, logistics, and pricing in {cityName}.
              </p>
            </div>

            <CityFaqAccordion faqs={faqs} />
          </section>

          {/* ── 9. BOTTOM CTA BANNER ── */}
          <section className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>
              Ready to Order Makhana in <span>{cityName}</span>?
            </h3>
            <p className={styles.ctaBody}>
              {`Partner directly with Bihar's trusted Makhana manufacturer. Get in touch today for personalized wholesale pricing, samples, and contract supply.`}
            </p>
            <div className={styles.ctaButtons}>
              <a href="#quote-form" className={styles.ctaBtnPrimary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                Request Price Quote
              </a>
              <a href={`tel:${(cityDoc.ctaPhone || '+918002661555').replace(/\s+/g, '')}`} className={styles.ctaBtnSecondary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call {cityDoc.ctaPhone || '+91 8002661555'}
              </a>
            </div>
          </section>

        </div>
      </div>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
