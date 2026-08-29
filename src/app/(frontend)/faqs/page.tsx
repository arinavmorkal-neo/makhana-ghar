import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import FaqAccordion from './FaqAccordion';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import styles from './Faqs.module.css';
import type { Metadata } from 'next';

export const revalidate = 120; // ISR

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('faqs', {
    title: "FAQ's | Makhana Ghar – Your Questions Answered",
    description:
      'Find answers to frequently asked questions about Makhana Ghar products, wholesale ordering, bulk pricing, shipping, certifications, and more.',
    primaryKeywords: 'makhana faq, makhana wholesale questions, buy makhana bulk faq, fox nuts wholesale queries',
    secondaryKeywords: 'makhana order process, makhana shipping details, makhana certifications, makhana minimum order, makhana storage tips',
    path: '/faqs',
  });
}

/* ── Fallback FAQ data (shown when CMS is empty) ── */
const fallbackFaqs = [
  {
    question: 'What is Makhana (Fox Nuts)?',
    answer:
      'Makhana, also known as Fox Nuts or Lotus Seeds, is a highly nutritious superfood harvested from the Euryale Ferox plant that grows in stagnant freshwater ponds, primarily in Bihar, India. It is rich in protein, calcium, iron, and antioxidants — making it a popular choice for healthy snacking, cooking, and fasting.',
  },
  {
    question: 'What grades of Makhana does Makhana Ghar offer?',
    answer:
      'We offer a wide range of Makhana grades including Baal Bhog, Top Fox (Round), 4+ Sutta, White Plain, 16.5mm, and 12.7mm Makhana flakes. Each grade is carefully sorted by size and quality to meet different market requirements — from premium retail to bulk wholesale.',
  },
  {
    question: 'What is the minimum order quantity (MOQ) for wholesale?',
    answer:
      'Our minimum order quantity varies by product and destination. For domestic orders, the typical MOQ starts from 50 kg. For international exports, MOQ usually starts from 500 kg or one pallet load. Contact us for specific pricing and availability based on your requirements.',
  },
  {
    question: 'Do you export Makhana to international markets?',
    answer:
      'Yes! Makhana Ghar is an established exporter supplying premium Makhana to markets across the globe, including the UAE, Thailand, USA, UK, Australia, and many other countries. All our export-grade products comply with international food safety standards.',
  },
  {
    question: 'What certifications does Makhana Ghar have?',
    answer:
      'Our products are FSSAI certified and comply with export-grade quality standards. We follow strict quality control protocols including moisture testing (below 12%), purity verification, and size-based grading. We can also provide specific certifications required by your target market.',
  },
  {
    question: 'Do you offer private labeling and custom packaging?',
    answer:
      'Absolutely! We provide complete private label solutions including custom packaging design, branding, and labeling. Whether you need retail-ready packs, bulk bags, or gift packaging — we can tailor the packaging to your brand specifications and market requirements.',
  },
  {
    question: 'How should Makhana be stored for maximum freshness?',
    answer:
      'Makhana should be stored in airtight containers in a cool, dry place away from direct sunlight and moisture. When stored properly, it maintains its quality and crunch for 6–12 months. For bulk storage, we recommend food-grade moisture-proof packaging.',
  },
  {
    question: 'How can I place a wholesale or bulk order?',
    answer:
      'You can place a wholesale order by contacting us directly through our Contact Us page, by calling us at +91 8002661555, or by emailing makhanaghar.marketing@gmail.com. Our team will provide you with pricing, available grades, and delivery timelines based on your requirements.',
  },
  {
    question: 'What are the payment terms for wholesale orders?',
    answer:
      'For domestic orders, we accept advance payment via bank transfer, UPI, or demand draft. For international orders, we work with standard trade terms including Letter of Credit (L/C), Telegraphic Transfer (T/T), and other mutually agreed payment methods.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Domestic shipments typically take 3–7 business days depending on the destination. International shipments take 15–30 days via sea freight and 5–10 days via air freight. We provide full tracking and documentation support for all shipments.',
  },
];

async function getFaqs() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'faqs',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 50,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        question: doc.question,
        answer: doc.answer,
      }));
    }
  } catch (e) {
    console.warn('Could not fetch FAQs from Payload CMS:', e);
  }
  return fallbackFaqs;
}

export default async function FaqsPage() {
  const faqs = await getFaqs();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: "FAQ's", url: 'https://www.makhanaghar.in/faqs' },
  ]);

  /* FAQPage structured data for Google rich results */
  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Makhana Ghar FAQ's"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Got Questions?</span>
          <h1 className={styles.heroHeading}>FAQ&apos;s</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Everything you need to know about our premium Makhana products,
            wholesale ordering, and export services — all in one place.
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

      {/* ── FAQ CONTENT ── */}
      <section className={styles.faqContainer}>
        <div className={styles.faqInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Frequently Asked{' '}
              <span className={styles.sectionTitleAccent}>Questions</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Browse our most commonly asked questions about Makhana products,
              ordering, shipping, and partnerships.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />

          {/* ── CTA Banner ── */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>
              Still Have <span>Questions</span>?
            </h3>
            <p className={styles.ctaBody}>
              Can&apos;t find what you&apos;re looking for? Our team is always ready to
              help. Reach out to us for any queries about wholesale pricing,
              export documentation, or custom orders.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/contact-us" className={styles.ctaBtnPrimary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                Contact Us
              </a>
              <a href="/categories" className={styles.ctaBtnSecondary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                View Products
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
