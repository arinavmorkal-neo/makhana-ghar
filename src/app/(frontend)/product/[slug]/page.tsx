'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileNavBar from '../../../components/MobileNavBar';
import EnquiryPopup from '../../../components/EnquiryPopup';
import { getImageUrlWithOverride } from '../../../../lib/getImageUrl';
import styles from './Product.module.css';

/* ── Types ── */
interface ProductData {
  name: string;
  tagline: string;
  description: string;
  aboutUs: string;
  specs: { label: string; value: string }[];
  images: string[];
  rating: number;
  reviews: number;
  isOrganic: boolean;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('specs');
  const [popupOpen, setPopupOpen] = useState(false);

  /* Fetch product from CMS */
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.product) {
          const doc = data.product;

          // Build image list: mainImage first, then gallery images
          const images: string[] = [];
          const mainImg = getImageUrlWithOverride(doc.mainImageUrl, doc.mainImage, '');
          if (mainImg) images.push(mainImg);

          if (doc.galleryImages && doc.galleryImages.length > 0) {
            for (const gi of doc.galleryImages) {
              const url = getImageUrlWithOverride(gi.imageUrl, gi.image, '');
              if (url) images.push(url);
            }
          }

          // Fallback if no images at all
          if (images.length === 0) images.push('/4+.webp');

          setProduct({
            name: doc.name || '',
            tagline: doc.tagline || `Why Choose ${doc.name}?`,
            description: doc.description || '',
            aboutUs: doc.aboutUs || '',
            specs: doc.specs || [],
            images,
            rating: doc.rating || 4.8,
            reviews: doc.reviews || 0,
            isOrganic: doc.isOrganic !== false,
          });
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  /* Loading state */
  if (loading) {
    return (
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'Poppins, sans-serif' }}>
          <p style={{ color: '#888' }}>Loading product…</p>
        </div>
        <Footer />
      </main>
    );
  }

  /* Not found */
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
              {product.isOrganic && (
                <span className={styles.organicBadge}>ORGANIC</span>
              )}
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

            {/* CTA Buttons — mobile only (below image) */}
            <div className={`${styles.ctaRow} ${styles.ctaRowMobile}`}>
              <button
                type="button"
                className={styles.ctaEnquiry}
                onClick={() => setPopupOpen(true)}
              >
                🛒 Send Enquiry
              </button>
              <a
                href="https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20and%20available%20varieties."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaCallback}
              >
                📞 Get Callback
              </a>
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
              {/* Tabbed Layout */}
              <div className={styles.tabbedLayout}>
                {/* Cylinder Tabs */}
                <div className={styles.cylinderTabs}>
                  <div className={styles.tabsGroup}>
                    <button
                      className={`${styles.cylinderTab}${activeTab === 'specs' ? ` ${styles.cylinderTabActive}` : ''}`}
                      onClick={() => setActiveTab('specs')}
                    >
                      Specifications
                    </button>
                    <button
                      className={`${styles.cylinderTab}${activeTab === 'description' ? ` ${styles.cylinderTabActive}` : ''}`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                  </div>

                  {/* Ask Price Button attached to the tab bar */}
                  <a
                    href={`https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20and%20available%20varieties%20for%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.askPriceBtn}
                  >
                    🏷 Ask Latest Price
                  </a>
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                  {activeTab === 'description' && (
                    <p className={styles.tabContentText}>{product.description}</p>
                  )}

                  {activeTab === 'specs' && (
                    <div className={styles.specsTable}>
                      {product.specs.length > 0 ? (
                        product.specs.map((spec, i) => (
                          <div
                            key={i}
                            className={`${styles.specRow}${i % 2 === 0 ? ` ${styles.specRowEven}` : ''}`}
                          >
                            <span className={styles.specLabel}>{spec.label}</span>
                            <span className={styles.specValue}>{spec.value}</span>
                          </div>
                        ))
                      ) : (
                        <p style={{ padding: '16px', color: '#888' }}>No specifications added yet.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buttons — desktop only */}
            <div className={`${styles.ctaRow} ${styles.ctaRowDesktop}`}>
              <button
                type="button"
                className={styles.ctaEnquiry}
                onClick={() => setPopupOpen(true)}
              >
                🛒 Send Enquiry
              </button>
              <a
                href="https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20and%20available%20varieties."
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
