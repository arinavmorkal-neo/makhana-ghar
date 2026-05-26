'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileNavBar from '../../../components/MobileNavBar';
import EnquiryPopup from '../../../components/EnquiryPopup';
import styles from './Product.module.css';

/* ── Product Data ── */
const products: Record<string, {
  name: string;
  tagline: string;
  description: string;
  aboutUs: string;
  specs: { label: string; value: string }[];
  images: string[];
  rating: number;
  reviews: number;
}> = {
  '4-suta-round-makhana-flake': {
    name: '4 Suta Round Makhana Flake',
    tagline: 'Why Choose 4 Suta Round Makhana Flake?',
    description:
      'Discover 4 Suta Round Makhana Flake: The Best Blend of Health and Taste. Organic, gluten-free, and low-calorie round Makhana flakes make them a perfect snack, for weight loss, or to stay fit. A crispy, protein-rich, vegan-friendly option that can be enjoyed by kids, fitness enthusiasts, and health-conscious people.',
    aboutUs:
      'Makhana Ghar is a trusted supplier of premium-quality Makhana, sourced directly from the farms of Bihar, India. With a commitment to freshness, authenticity, and quality, we deliver rich, healthy products to customers and businesses worldwide. Our Makhana is carefully hand-sorted, hygienically packed, and available in all grades — from 4 Suta to 6+ Suta Premium.',
    specs: [
      { label: 'Variety', value: 'Roasted' },
      { label: 'Product Type', value: 'Makhana Flake' },
      { label: 'Cultivation Type', value: 'Common' },
      { label: 'Style', value: 'Dried' },
      { label: 'Color', value: 'Cream' },
      { label: 'Size', value: 'As Per Requirement' },
      { label: 'Grade', value: 'Dry Fruit Supply' },
      { label: 'Ability', value: '10000 Per Day' },
    ],
    images: [
      '/products/4-suta-makhana.png',
      '/4+.png',
      '/5+.png',
      '/6+.png',
    ],
    rating: 4.8,
    reviews: 128,
  },
  '5-suta-round-makhana': {
    name: '5 Suta Round Makhana',
    tagline: 'Why Choose 5 Suta Round Makhana?',
    description:
      'Premium quality 5 Suta Round Makhana with a larger size and superior crunch. Perfect for direct snacking, roasting, and gifting. Sourced fresh from the farms of Bihar with proper grading and hygiene standards.',
    aboutUs:
      'Makhana Ghar is a trusted supplier of premium-quality Makhana, sourced directly from the farms of Bihar, India. With a commitment to freshness, authenticity, and quality, we deliver rich, healthy products to customers and businesses worldwide. Our Makhana is carefully hand-sorted, hygienically packed, and available in all grades — from 4 Suta to 6+ Suta Premium.',
    specs: [
      { label: 'Variety', value: 'Roasted' },
      { label: 'Product Type', value: 'Makhana Round' },
      { label: 'Cultivation Type', value: 'Common' },
      { label: 'Style', value: 'Dried' },
      { label: 'Color', value: 'Cream White' },
      { label: 'Size', value: 'Medium (5 Suta)' },
      { label: 'Grade', value: 'Premium' },
      { label: 'Ability', value: '10000 Per Day' },
    ],
    images: [
      '/5+.png',
      '/4+.png',
      '/products/4-suta-makhana.png',
      '/6+.png',
    ],
    rating: 4.9,
    reviews: 96,
  },
  '6-suta-plus-makhana': {
    name: '6 Suta Plus Makhana',
    tagline: 'Why Choose 6 Suta Plus Makhana?',
    description:
      'The largest and most premium grade of Makhana available. 6 Suta Plus Makhana is the top choice for retail packaging, gift boxes, and export markets. Each piece is hand-sorted for size consistency, crunch, and freshness.',
    aboutUs:
      'Makhana Ghar is a trusted supplier of premium-quality Makhana, sourced directly from the farms of Bihar, India. With a commitment to freshness, authenticity, and quality, we deliver rich, healthy products to customers and businesses worldwide. Our Makhana is carefully hand-sorted, hygienically packed, and available in all grades — from 4 Suta to 6+ Suta Premium.',
    specs: [
      { label: 'Variety', value: 'Roasted' },
      { label: 'Product Type', value: 'Makhana Round' },
      { label: 'Cultivation Type', value: 'Common' },
      { label: 'Style', value: 'Dried' },
      { label: 'Color', value: 'Pure White' },
      { label: 'Size', value: 'Large (6+ Suta)' },
      { label: 'Grade', value: 'Super Premium' },
      { label: 'Ability', value: '8000 Per Day' },
    ],
    images: [
      '/6+.png',
      '/5+.png',
      '/4+.png',
      '/products/4-suta-makhana.png',
    ],
    rating: 5.0,
    reviews: 64,
  },
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'aboutUs' | 'specs'>('description');
  const [popupOpen, setPopupOpen] = useState(false);

  const product = products[slug];

  if (!product) {
    return (
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
          <h1>Product Not Found</h1>
          <p style={{ color: '#888', marginTop: 12 }}>The product you are looking for does not exist.</p>
          <Link href="/" style={{ color: '#2e7d32', marginTop: 20, display: 'inline-block' }}>← Back to Home</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const starsFull = Math.floor(product.rating);
  const starsDisplay = '★'.repeat(starsFull) + (product.rating % 1 >= 0.5 ? '★' : '');

  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="Makhana Ghar Products"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Our Products</span>
          <h1 className={styles.heroHeading}>Product Details</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>
            Premium quality Makhana sourced directly from the farms of Bihar.
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

      {/* ── BREADCRUMB ── */}
      <div className={styles.breadcrumb}>
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span>Makhana</span>
        <span className={styles.breadcrumbSep}>›</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      {/* ── PRODUCT LAYOUT ── */}
      <section className={styles.productContainer}>
        <div className={styles.productGrid}>
          {/* LEFT: Images */}
          <div>
            {/* Main Image */}
            <div
              className={styles.mainImageWrap}
              onClick={() => setZoomed(!zoomed)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className={`${styles.mainImage}${zoomed ? ` ${styles.mainImageZoomed}` : ''}`}
              />
              <span className={styles.organicBadge}>ORGANIC</span>
            </div>

            {/* Thumbnails */}
            <div className={styles.thumbnailGrid}>
              {product.images.slice(1).map((src, i) => (
                <div
                  key={i}
                  className={`${styles.thumbnail}${activeImg === i + 1 ? ` ${styles.thumbnailActive}` : ''}`}
                  onClick={() => { setActiveImg(i + 1); setZoomed(false); }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${product.name} thumbnail ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className={styles.dotIndicators}>
              {product.images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot}${activeImg === i ? ` ${styles.dotActive}` : ''}`}
                  onClick={() => { setActiveImg(i); setZoomed(false); }}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className={styles.detailsSection}>
            <h1 className={styles.productTitle}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <span className={styles.stars}>{starsDisplay}</span>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className={styles.tagline}>{product.tagline}</p>
            <p className={styles.description}>{product.description}</p>

            {/* Cylinder Tabbed Section */}
            <div className={styles.tabbedSection}>
              {/* Ask Price */}
              <button className={styles.askPriceBtn}>
                🏷 Ask Latest Price
              </button>

              {/* Tabbed Layout */}
              <div className={styles.tabbedLayout}>
                {/* Cylinder Tabs */}
                <div className={styles.cylinderTabs}>
                  <button
                    className={`${styles.cylinderTab}${activeTab === 'description' ? ` ${styles.cylinderTabActive}` : ''}`}
                    onClick={() => setActiveTab('description')}
                  >
                    📝 Description
                  </button>
                  <button
                    className={`${styles.cylinderTab}${activeTab === 'aboutUs' ? ` ${styles.cylinderTabActive}` : ''}`}
                    onClick={() => setActiveTab('aboutUs')}
                  >
                    🏢 About Us
                  </button>
                  <button
                    className={`${styles.cylinderTab}${activeTab === 'specs' ? ` ${styles.cylinderTabActive}` : ''}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    📋 Specifications
                  </button>
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                  {activeTab === 'description' && (
                    <p className={styles.tabContentText}>{product.description}</p>
                  )}

                  {activeTab === 'aboutUs' && (
                    <p className={styles.tabContentText}>{product.aboutUs}</p>
                  )}

                  {activeTab === 'specs' && (
                    <div className={styles.specsTable}>
                      {product.specs.map((spec, i) => (
                        <div
                          key={i}
                          className={`${styles.specRow}${i % 2 === 0 ? ` ${styles.specRowEven}` : ''}`}
                        >
                          <span className={styles.specLabel}>{spec.label}</span>
                          <span className={styles.specValue}>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.ctaRow}>
              <button
                type="button"
                className={styles.ctaEnquiry}
                onClick={() => setPopupOpen(true)}
              >
                🛒 Send Enquiry
              </button>
              <a
                href="https://wa.me/917903195957?text=I%20am%20interested"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaCallback}
              >
                📞 Get Callback
              </a>
            </div>

            {/* Share */}
            <div className={styles.shareRow}>
              <span className={styles.shareLabel}>Share:</span>
              <a
                href={`https://wa.me/?text=Check out ${product.name} from Makhana Ghar!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareBtnWhatsapp}`}
                aria-label="Share on WhatsApp"
              >
                💬
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590384691167"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareBtnFacebook}`}
                aria-label="Share on Facebook"
              >
                f
              </a>
              <button
                className={`${styles.shareBtn} ${styles.shareBtnTwitter}`}
                aria-label="Share on Twitter"
              >
                𝕏
              </button>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              {[
                ['🌿', '100% Organic'],
                ['🚚', 'Fast Delivery'],
                ['✅', 'Quality Assured'],
                ['🔒', 'Secure Payments'],
              ].map(([icon, text]) => (
                <div key={text} className={styles.trustBadge}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavBar />
      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </main>
  );
}
