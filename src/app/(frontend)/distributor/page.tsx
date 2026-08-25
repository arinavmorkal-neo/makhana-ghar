import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import styles from './Distributor.module.css';
import type { Metadata } from 'next';

export const revalidate = 120; // ISR

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('distributor', {
    title: 'Become a Distributor | Makhana Ghar – Partner With Us',
    description:
      'Become a Makhana Ghar distributor and grow your business with premium Bihar Makhana. Competitive wholesale pricing, marketing support, and a trusted supply chain.',
    primaryKeywords: 'makhana distributor, become makhana dealer, makhana distribution partnership, fox nuts distributor opportunity',
    secondaryKeywords: 'makhana wholesale business, makhana dealership india, makhana supply chain partner, bihar makhana franchise',
    path: '/distributor',
  });
}
/* ── Icon map for CMS icon field ── */
const iconMap: Record<string, React.ReactNode> = {
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

/* ── Fallback benefits data (shown when CMS is empty) ── */
const fallbackBenefits = [
  { icon: 'pricing', title: 'Competitive Wholesale Pricing', description: 'Direct-from-manufacturer pricing with no middlemen. Maximize your margins with the most competitive rates in the market.' },
  { icon: 'quality', title: 'Premium Quality Assurance', description: 'Every batch is quality-tested and graded. FSSAI certified, export-grade Makhana that meets the highest international standards.' },
  { icon: 'shipping', title: 'Reliable Supply Chain', description: 'Consistent, year-round supply with established logistics infrastructure. On-time delivery across India and international markets.' },
  { icon: 'packaging', title: 'Custom Packaging & Branding', description: 'Private label solutions tailored to your market. Custom retail packs, bulk bags, and branded packaging to build your Makhana brand.' },
  { icon: 'global', title: 'Global Market Access', description: "Tap into Makhana Ghar's established presence across 15+ countries. Expert support for export documentation and compliance." },
  { icon: 'support', title: 'Dedicated Support Team', description: 'A dedicated account manager for every distributor. End-to-end support from product consultation to after-sales service.' },
];

async function getBenefits() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'distributor-benefits',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 20,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        icon: doc.icon || 'pricing',
        title: doc.title,
        description: doc.description,
      }));
    }
  } catch (e) {
    console.warn('Could not fetch distributor benefits from Payload CMS:', e);
  }
  return fallbackBenefits;
}

export default async function DistributorPage() {
  const benefits = await getBenefits();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Become Distributor', url: 'https://www.makhanaghar.in/distributor' },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Become a Makhana Ghar Distributor"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Partner With Us</span>
          <h1 className={styles.heroHeading}>Become A Distributor</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Join India&apos;s most trusted Makhana supply network. Grow your
            business with premium products, competitive pricing, and dedicated
            support.
          </p>
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

      {/* ── DISTRIBUTOR CONTENT ── */}
      <section className={styles.distributorContainer}>
        <div className={styles.distributorInner}>

          {/* ── Intro Section ── */}
          <div className={styles.introSection}>
            <div className={styles.introContent}>
              <div className={styles.introEyebrow}>
                <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                  <path
                    d="M0 7H32M26 1L32 7L26 13"
                    stroke="#2e7d32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Distribution Partnership
              </div>
              <h2 className={styles.introTitle}>
                Grow Your Business With{' '}
                <span>Premium Makhana</span>
              </h2>
              <p className={styles.introText}>
                Makhana Ghar is looking for dedicated distributors and channel
                partners across India and international markets. As a Makhana Ghar
                distributor, you get access to premium-quality, farm-fresh Makhana
                at the most competitive wholesale prices — backed by a brand that
                has been trusted for over 10 years.
              </p>
              <p className={styles.introText}>
                Whether you operate a retail chain, a wholesale network, an
                e-commerce store, or an import business — we have the right
                partnership model for you. Our dedicated team provides end-to-end
                support from onboarding to order fulfillment.
              </p>
            </div>
            <div className={styles.introImageWrap}>
              <Image
                src="/banner2.webp"
                alt="Makhana Ghar Distribution Partnership"
                width={600}
                height={500}
                sizes="(max-width: 900px) 100vw, 50vw"
                quality={80}
              />
              <span className={styles.introBadge}>10+ Years Trusted</span>
            </div>
          </div>

          {/* ── Why Partner With Us ── */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Why Partner With{' '}
              <span className={styles.sectionTitleAccent}>Makhana Ghar</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Here&apos;s what makes Makhana Ghar the ideal partner for your
              distribution business.
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => (
              <div key={idx} className={styles.benefitCard}>
                <div className={styles.benefitIconWrap}>
                  {iconMap[benefit.icon] || iconMap.pricing}
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitText}>{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* ── How It Works ── */}
          <div className={styles.stepsSection}>
            <div className={styles.stepsHeader}>
              <h2 className={styles.stepsTitle}>
                How It <span>Works</span>
              </h2>
              <p className={styles.stepsSubtitle}>
                Getting started as a Makhana Ghar distributor is simple. Follow
                these four steps to begin your partnership.
              </p>
            </div>

            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>1</div>
                <h4 className={styles.stepTitle}>Submit Your Enquiry</h4>
                <p className={styles.stepText}>
                  Fill out our contact form or call us directly. Share your
                  business details, target market, and volume requirements.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>2</div>
                <h4 className={styles.stepTitle}>Product Consultation</h4>
                <p className={styles.stepText}>
                  Our team will discuss product grades, pricing, packaging
                  options, and help you choose the right products for your
                  market.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>3</div>
                <h4 className={styles.stepTitle}>Sample & Agreement</h4>
                <p className={styles.stepText}>
                  Receive product samples for quality evaluation. Once
                  satisfied, we finalize the distribution agreement and terms.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>4</div>
                <h4 className={styles.stepTitle}>Start Distributing</h4>
                <p className={styles.stepText}>
                  Place your first order and start distributing premium Makhana
                  Ghar products to your customers and retail network.
                </p>
              </div>
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>
              Ready To <span>Partner</span> With Us?
            </h3>
            <p className={styles.ctaBody}>
              Take the first step towards building a profitable Makhana
              distribution business. Contact us today for wholesale pricing,
              product samples, and partnership details.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/contact-us" className={styles.ctaBtnPrimary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                Contact Us Now
              </a>
              <a href="tel:+918002661555" className={styles.ctaBtnSecondary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call +91 8002661555
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
