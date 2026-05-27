'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import styles from './AboutUs.module.css';

export default function AboutUsPage() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="About Makhana Ghar"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Know Our Story</span>
          <h1 className={styles.heroHeading}>About Us</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>
            From the heartland of Bihar to global markets — discover the journey
            of Makhana Ghar and our commitment to premium quality fox nuts.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.grassEdge}
          src="/grassnew-white.png"
          alt=""
          aria-hidden="true"
        />
      </section>

      {/* ── OUR STORY ── */}
      <section className={styles.storySection}>
        <div className={styles.storyInner}>
          <div className={styles.storyImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner2.png"
              alt="Makhana Ghar — Our Story"
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

      {/* ── PROCESSING OF MAKHANA ── */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <div className={styles.processHeader}>
            <h2 className={styles.processTitle}>
              Processing of <span>Makhana</span>
            </h2>
            <p className={styles.processSubtitle}>
              From natural ponds to your plate — here&apos;s the traditional,
              step-by-step process of how premium Makhana is harvested,
              processed, and prepared for you.
            </p>
          </div>

          <div className={styles.processGrid}>
            {/* Step 1 */}
            <div className={styles.processStep} data-step="01">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>01</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Pond Cultivation &amp; Seed Growth
                </h4>
                <p className={styles.processStepText}>
                  Makhana plants (Euryale ferox) grow naturally in the stagnant
                  freshwater ponds of Bihar. The seeds develop inside thorny
                  fruits that mature underwater over several months during the
                  monsoon season.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={styles.processStep} data-step="02">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>02</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                  Manual Harvesting by Divers
                </h4>
                <p className={styles.processStepText}>
                  Skilled local farmers dive into the ponds to manually collect
                  the ripe, spiny fruits from the muddy pond bed. This
                  traditional harvesting method requires immense skill and is
                  done entirely by hand.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.processStep} data-step="03">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>03</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Seed Collection &amp; Sun Drying
                </h4>
                <p className={styles.processStepText}>
                  The black seeds are extracted from the fruit, washed
                  thoroughly, and spread out under direct sunlight for natural
                  drying. This sun-drying process typically takes 2–3 days and
                  reduces moisture to the optimal level.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className={styles.processStep} data-step="04">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>04</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Roasting &amp; Popping (Lawa Process)
                </h4>
                <p className={styles.processStepText}>
                  The dried seeds are roasted in an iron pan over high heat.
                  Once heated, they are quickly struck with a wooden mallet to
                  pop the outer shell — revealing the white, fluffy puff inside.
                  This step requires precise timing and expertise.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className={styles.processStep} data-step="05">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>05</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  Shell Removal &amp; Cleaning
                </h4>
                <p className={styles.processStepText}>
                  The outer hard black shell is carefully peeled off by hand to
                  reveal the white makhana puff. The puffs are then cleaned to
                  remove any remaining shell fragments, ensuring a pure and
                  clean final product.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className={styles.processStep} data-step="06">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>06</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Grading &amp; Quality Sorting
                </h4>
                <p className={styles.processStepText}>
                  The cleaned makhana puffs are sorted by size into grades — 4+
                  Sutta (small), 5+ Sutta (medium), and 6+ Sutta (large/premium).
                  Each grade undergoes quality checks for color, shape, and
                  uniformity.
                </p>
              </div>
            </div>

            {/* Step 7 */}
            <div className={styles.processStep} data-step="07">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>07</div>
                <div className={styles.processStepLine} />
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Moisture Testing &amp; Quality Assurance
                </h4>
                <p className={styles.processStepText}>
                  Every batch is tested for moisture content (ideal: below 12%),
                  checked for purity, and verified against FSSAI standards. This
                  ensures our makhana meets export-grade quality and has a long
                  shelf life.
                </p>
              </div>
            </div>

            {/* Step 8 */}
            <div className={styles.processStep} data-step="08">
              <div className={styles.processStepLeft}>
                <div className={styles.processStepNumber}>08</div>
              </div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  Packaging &amp; Dispatch
                </h4>
                <p className={styles.processStepText}>
                  The graded makhana is sealed in food-grade, moisture-proof
                  packaging — available in bulk bags, retail packs, or custom
                  private-label formats. Orders are dispatched pan-India and
                  internationally with full logistics support.
                </p>
              </div>
            </div>
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
