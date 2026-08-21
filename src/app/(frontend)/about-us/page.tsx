import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import FoundersGrid from './FoundersGrid';
import styles from './AboutUs.module.css';

export const revalidate = 120; // ISR — revalidate every 2 minutes

/* ── Fallback data (shown when CMS is empty) ───────── */
const fallbackFounders = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    bio: 'With over a decade of experience in the Makhana industry, Rajesh envisioned building a brand that connects Bihar\'s farmers directly with global markets — ensuring quality, fairness, and sustainability at every step.',
    photoUrl: 'https://ik.imagekit.io/3uuhtxmof/makhana-shop/founder-1_nkMHzY20s.png',
    photoAlt: 'Founder — Makhana Ghar',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    id: '2',
    name: 'Amit Sharma',
    role: 'Co-Founder & COO',
    bio: 'Amit brings deep expertise in supply chain and operations, ensuring that every batch of Makhana Ghar products meets the highest international standards — from Bihar\'s ponds to doorsteps across the globe.',
    photoUrl: 'https://ik.imagekit.io/3uuhtxmof/makhana-shop/founder-2_lfqB3D16V.png',
    photoAlt: 'Co-Founder — Makhana Ghar',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
];

async function getFounders() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'founders',
      where: { status: { equals: 'published' } },
      sort: 'order',
      depth: 1,
      limit: 10,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        role: doc.role,
        bio: doc.bio,
        photoUrl: doc.imageUrl || doc.photo?.url || doc.photo?.imagekitUrl || '',
        photoAlt: doc.photo?.alt || doc.name,
        linkedinUrl: doc.linkedinUrl || '',
        twitterUrl: doc.twitterUrl || '',
      }));
    }
  } catch (e) {
    console.warn('Could not fetch founders from Payload CMS:', e);
  }
  return fallbackFounders;
}

export default async function AboutUsPage() {
  const founders = await getFounders();

  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="About Makhana Ghar"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Know Our Story</span>
          <h1 className={styles.heroHeading}>About Us</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            From the heartland of Bihar to global markets — discover the journey
            of Makhana Ghar and our commitment to premium quality fox nuts.
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

      {/* ── OUR STORY ── */}
      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <div className={styles.storyImageWrap}>
            <Image
              src="/banner2.webp"
              alt="Makhana Ghar — Our Story"
              width={600}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
            />
            <span className={styles.storyBadge}>Since 2015</span>
          </div>

          <div className={styles.storyContent}>
            <div className={styles.storyEyebrow}>
              <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                <path
                  d="M0 7H32M26 1L32 7L26 13"
                  stroke="#2e7d32"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Our Story
            </div>

            <h2 className={styles.storyTitle}>
              From Bihar&apos;s Pristine Ponds To{' '}
              <span>Your Doorstep</span>
            </h2>

            <p className={styles.storyText}>
              Makhana Ghar was founded with a simple yet powerful vision — to
              bring the finest quality Makhana (Fox Nuts) from Bihar&apos;s pristine
              ponds directly to consumers and businesses worldwide. What started as a
              small family venture in Katihar has grown into one of India&apos;s most
              trusted Makhana manufacturing and export companies.
            </p>

            <p className={styles.storyText}>
              We work directly with local farmers, ensuring fair trade practices
              and maintaining the highest quality standards from harvest to
              packaging. Every batch of Makhana is hand-sorted, naturally
              sun-dried, and carefully graded to deliver the perfect crunch and
              nutrition our customers expect.
            </p>

            <div className={styles.storyHighlight}>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className={styles.highlightText}>100% Natural &amp; Chemical Free</span>
              </div>
              <div className={styles.highlightItem}>
                <div className={styles.highlightIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className={styles.highlightText}>Export Quality Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDERS SECTION ── */}
      <section className={styles.foundersSection}>
        <div className={styles.foundersInner}>
          <div className={styles.foundersHeader}>
            <h2 className={styles.foundersTitle}>
              Meet Our <span>Founders</span>
            </h2>
            <p className={styles.foundersSubtitle}>
              Founded in 2015, Makhana Ghar has been led by Arinav since 2025,
              with a vision to bring premium Bihar Makhana to global markets.
            </p>
          </div>

          <FoundersGrid founders={founders} />
        </div>
      </section>

      {/* ── PROCESSING OF MAKHANA ── */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <div className={styles.processHeader}>
            <span className={styles.processEyebrow}>Our Process</span>
            <h2 className={styles.processTitle}>
              Processing of <span>Makhana</span>
            </h2>
            <p className={styles.processSubtitle}>
              From natural ponds to your plate — here&apos;s the traditional,
              step-by-step process of how premium Makhana is harvested,
              processed, and prepared for you.
            </p>
          </div>

          {/* Grid Layout for Processing Cards */}
          <div className={styles.processGrid}>
            {[
              { img: '/process-step-1.png', alt: 'Pond Cultivation', num: '01', title: 'Pond Cultivation & Seed Growth', text: "Makhana plants grow naturally in stagnant freshwater ponds of Bihar. Seeds develop inside thorny fruits that mature underwater during monsoon." },
              { img: '/process-step-2.png', alt: 'Manual Harvesting', num: '02', title: 'Manual Harvesting by Divers', text: "Skilled local farmers dive into ponds to manually collect ripe, spiny fruits from the muddy pond bed — entirely by hand." },
              { img: '/process-step-3.png', alt: 'Seed Collection and Sun Drying', num: '03', title: 'Seed Collection & Sun Drying', text: "Black seeds are extracted, washed thoroughly, and spread under direct sunlight for 2–3 days of natural drying." },
              { img: '/process-step-4.png', alt: 'Roasting and Popping', num: '04', title: 'Roasting & Popping (Lawa)', text: "Dried seeds are roasted in an iron pan over high heat, then struck with a wooden mallet to pop the outer shell — revealing fluffy white puffs." },
              { img: '/process-step-5.png', alt: 'Shell Removal', num: '05', title: 'Shell Removal & Cleaning', text: "The hard black shell is peeled off by hand to reveal white makhana puffs, then cleaned to remove any remaining fragments." },
              { img: '/process-step-6.png', alt: 'Quality Sorting', num: '06', title: 'Grading & Quality Sorting', text: "Cleaned puffs are sorted by size — 4+ Sutta (small), 5+ Sutta (medium), and 6+ Sutta (large/premium) with quality checks." },
              { img: '/process-step-7.png', alt: 'Quality Assurance', num: '07', title: 'Moisture Testing & QA', text: "Every batch is tested for moisture (below 12%), checked for purity, and verified against FSSAI & export-grade standards." },
              { img: '/process-step-8.png', alt: 'Packaging and Dispatch', num: '08', title: 'Packaging & Dispatch', text: "Graded makhana is sealed in food-grade, moisture-proof packaging — bulk bags, retail packs, or custom private-label formats." },
            ].map((step) => (
              <div key={step.num} className={styles.processCard}>
                <div className={styles.processCardImageWrap}>
                  <Image
                    src={step.img}
                    alt={step.alt}
                    className={styles.processCardImage}
                    width={400}
                    height={300}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                  />
                  <span className={styles.processCardBadge}>{step.num}</span>
                </div>
                <div className={styles.processCardBody}>
                  <h4 className={styles.processCardTitle}>{step.title}</h4>
                  <p className={styles.processCardText}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ── */}
      <section className={styles.mvvSection}>
        <div className={styles.mvvInner}>
          <div className={styles.mvvHeader}>
            <h2 className={styles.mvvTitle}>
              What <span>Drives Us</span>
            </h2>
            <p className={styles.mvvSubtitle}>
              Our mission, vision, and values guide everything we do — from
              sourcing to delivery.
            </p>
          </div>

          <div className={styles.mvvGrid}>
            {/* Mission */}
            <div className={styles.mvvCard}>
              <div className={styles.mvvCardIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className={styles.mvvCardTitle}>Our Mission</h3>
              <p className={styles.mvvCardText}>
                To make premium, ethically-sourced Makhana accessible to every
                household and business globally, while empowering local farmers
                in Bihar with fair trade practices and sustainable livelihoods.
              </p>
            </div>

            {/* Vision */}
            <div className={styles.mvvCard}>
              <div className={styles.mvvCardIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className={styles.mvvCardTitle}>Our Vision</h3>
              <p className={styles.mvvCardText}>
                To become the world&apos;s most recognized and trusted Makhana brand
                — setting global benchmarks for quality, nutrition, and
                sustainability in the superfood industry.
              </p>
            </div>

            {/* Values */}
            <div className={styles.mvvCard}>
              <div className={styles.mvvCardIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className={styles.mvvCardTitle}>Our Values</h3>
              <p className={styles.mvvCardText}>
                Quality without compromise, transparency in every process,
                respect for farmers, and commitment to delivering the purest and
                most nutritious Makhana to our customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className={styles.statsSection}>
        <div className={styles.statsInner}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>10+</div>
            <div className={styles.statLabel}>Years of Experience</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Happy Clients</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>15+</div>
            <div className={styles.statLabel}>Countries Exported</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>1000+</div>
            <div className={styles.statLabel}>Tons Supplied Yearly</div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US / JOURNEY ── */}
      <section className={styles.journeySection}>
        <div className={styles.journeyInner}>
          <div className={styles.journeyHeader}>
            <h2 className={styles.journeyTitle}>
              Why Choose <span>Makhana Ghar</span>
            </h2>
            <p className={styles.journeySubtitle}>
              From sourcing to delivery, here&apos;s what sets us apart from the rest.
            </p>
          </div>

          <div className={styles.journeyGrid}>
            {/* Card 1 */}
            <div className={styles.journeyCard}>
              <div className={styles.journeyCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.journeyCardContent}>
                <h4 className={styles.journeyCardTitle}>Direct Farm Sourcing</h4>
                <p className={styles.journeyCardText}>
                  We source directly from trusted farmers in Bihar&apos;s Makhana-growing
                  regions, cutting out middlemen to ensure freshness, quality, and
                  fair pricing for both farmers and buyers.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.journeyCard}>
              <div className={styles.journeyCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className={styles.journeyCardContent}>
                <h4 className={styles.journeyCardTitle}>Rigorous Quality Control</h4>
                <p className={styles.journeyCardText}>
                  Every batch undergoes multi-stage quality checks — from moisture
                  content and size grading to purity tests — meeting international
                  export standards.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.journeyCard}>
              <div className={styles.journeyCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.journeyCardContent}>
                <h4 className={styles.journeyCardTitle}>Global Shipping &amp; Logistics</h4>
                <p className={styles.journeyCardText}>
                  With established supply chains across India, UAE, Thailand, and
                  beyond, we deliver reliably to wholesalers, importers, and
                  distributors worldwide.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className={styles.journeyCard}>
              <div className={styles.journeyCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <div className={styles.journeyCardContent}>
                <h4 className={styles.journeyCardTitle}>Custom Packaging Solutions</h4>
                <p className={styles.journeyCardText}>
                  We offer private labeling and custom packaging for retail,
                  wholesale, and gifting — tailored to your brand requirements
                  and market needs.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className={styles.journeyCard}>
              <div className={styles.journeyCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className={styles.journeyCardContent}>
                <h4 className={styles.journeyCardTitle}>Competitive Wholesale Pricing</h4>
                <p className={styles.journeyCardText}>
                  As manufacturers, we offer the most competitive prices without
                  compromising on quality — perfect for bulk buyers,
                  distributors, and retail chains.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className={styles.journeyCard}>
              <div className={styles.journeyCardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div className={styles.journeyCardContent}>
                <h4 className={styles.journeyCardTitle}>Dedicated Support Team</h4>
                <p className={styles.journeyCardText}>
                  Our expert team provides end-to-end support — from product
                  consultation and sampling to order tracking and after-sales
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className={styles.ctaSection}>
        <h3 className={styles.ctaTitle}>
          Ready To Partner With <span>Makhana Ghar</span>?
        </h3>
        <p className={styles.ctaBody}>
          Whether you&apos;re a wholesaler, importer, retailer, or distributor — we&apos;d
          love to work with you. Get in touch for bulk pricing, samples, and
          partnership opportunities.
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

      <Footer />
      <MobileNavBar />
    </main>
  );
}
