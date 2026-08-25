import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import styles from './Testimonials.module.css';
import type { Metadata } from 'next';

export const revalidate = 120; // ISR

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('testimonials', {
    title: 'Testimonials | Makhana Ghar – What Our Clients Say',
    description:
      'Read what our wholesale buyers, distributors, and partners say about Makhana Ghar products. Trusted by 500+ clients across 15+ countries.',
    primaryKeywords: 'makhana ghar reviews, makhana wholesale testimonials, fox nuts supplier feedback, makhana buyer reviews',
    secondaryKeywords: 'makhana export reviews, bulk makhana quality feedback, makhana ghar client stories, trusted makhana supplier',
    path: '/testimonials',
  });
}

/* ── Testimonial data ── */
/* ── Fallback testimonial data (shown when CMS is empty) ── */
const fallbackTestimonials = [
  {
    name: 'Ramesh Agarwal',
    role: 'Wholesale Distributor, Delhi',
    review:
      'Makhana Ghar has been our primary supplier for over 3 years. The quality of their 4+ Sutta Makhana is consistently excellent — uniform size, perfect crunch, and moisture levels always within export standards. Highly reliable.',
    rating: 5,
  },
  {
    name: 'Sarah Thompson',
    role: 'Health Food Importer, UK',
    review:
      'We import Makhana from India for our organic snack brand in the UK. Makhana Ghar stands out with their prompt communication, quality documentation, and timely shipments. The product quality is premium every single time.',
    rating: 5,
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Food Distributor, UAE',
    review:
      'Outstanding product quality and professional service. Makhana Ghar supplies our Dubai-based distribution network with the finest Bihar Makhana. Their custom packaging and private labeling services are a great value add.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Organic Store Owner, Mumbai',
    review:
      'As a health food retailer, quality matters the most to our customers. Makhana Ghar delivers 100% natural, chemical-free Makhana that my customers love. Their pricing is competitive and delivery is always on time.',
    rating: 5,
  },
  {
    name: 'Tanaka Hiroshi',
    role: 'Food Importer, Thailand',
    review:
      'We have been importing Makhana from Makhana Ghar for the Thai market. The grading and sorting is impeccable — every batch meets our strict quality standards. Excellent export documentation support as well.',
    rating: 4,
  },
  {
    name: 'Vikram Patel',
    role: 'FMCG Brand Owner, Gujarat',
    review:
      'We partnered with Makhana Ghar for our private label Makhana snack line. From product sourcing to custom packaging, they handled everything professionally. Great team to work with for anyone starting a Makhana brand.',
    rating: 5,
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={filled ? styles.starFilled : styles.starEmpty}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

async function getTestimonials() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'testimonials',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 50,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        name: doc.name,
        role: doc.role || '',
        review: doc.review,
        rating: doc.rating || 5,
      }));
    }
  } catch (e) {
    console.warn('Could not fetch testimonials from Payload CMS:', e);
  }
  return fallbackTestimonials;
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Testimonials', url: 'https://www.makhanaghar.in/testimonials' },
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
          alt="Makhana Ghar Testimonials"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Client Stories</span>
          <h1 className={styles.heroHeading}>Testimonials</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Hear from our valued partners, distributors, and wholesale buyers
            about their experience with Makhana Ghar products.
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

      {/* ── TESTIMONIALS CONTENT ── */}
      <section className={styles.testimonialsContainer}>
        <div className={styles.testimonialsInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              What Our Clients{' '}
              <span className={styles.sectionTitleAccent}>Say</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Trusted by 500+ clients across 15+ countries — here&apos;s what our
              partners have to say about Makhana Ghar products and services.
            </p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                {/* Quote icon */}
                <svg
                  className={styles.quoteIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Star rating */}
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= t.rating} />
                  ))}
                </div>

                {/* Review text */}
                <p className={styles.reviewText}>&ldquo;{t.review}&rdquo;</p>

                {/* Reviewer info */}
                <div className={styles.reviewerInfo}>
                  <div className={styles.reviewerAvatar}>
                    {t.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div className={styles.reviewerDetails}>
                    <span className={styles.reviewerName}>{t.name}</span>
                    <span className={styles.reviewerRole}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Stats Section ── */}
          <div className={styles.statsSection}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Happy Clients</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Countries Served</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>4.8★</div>
              <div className={styles.statLabel}>Average Rating</div>
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>
              Ready To Join Our <span>Happy Clients</span>?
            </h3>
            <p className={styles.ctaBody}>
              Experience the Makhana Ghar difference — premium quality, competitive
              pricing, and trusted service. Get in touch to start your journey
              with us.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/contact-us" className={styles.ctaBtnPrimary}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                Get In Touch
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
