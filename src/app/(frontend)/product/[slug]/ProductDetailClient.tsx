'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EnquiryPopup from '../../../../components/EnquiryPopup';
import styles from './Product.module.css';

export interface ProductData {
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

export default function ProductDetailClient({ product }: { product: ProductData }) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('specs');
  const [popupOpen, setPopupOpen] = useState(false);

  const starsFull = Math.floor(product.rating);
  const starsDisplay = '★'.repeat(starsFull) + (product.rating % 1 >= 0.5 ? '★' : '');

  return (
    <>
      {/* ── BREADCRUMB ── */}
      <div className={styles.breadcrumb}>
        <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <Link href="/categories" style={{ color: '#999', textDecoration: 'none' }}>Makhana</Link>
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
                src={product.images[activeImg] || '/4+.webp'}
                alt={product.name}
                className={`${styles.mainImage}${zoomed ? ` ${styles.mainImageZoomed}` : ''}`}
              />
              {product.isOrganic && (
                <span className={styles.organicBadge}>ORGANIC</span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
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
            )}

            {/* Dot Indicators */}
            {product.images.length > 1 && (
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
            )}

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
                href={`https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20and%20available%20varieties%20for%20${encodeURIComponent(product.name)}.`}
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
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 448 512" 
                      fill="currentColor"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.6c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.3l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-3.1-5.3-1.6-8.2 1.1-11 2.3-2.3 5.1-5.6 7.6-8.5 2.5-2.8 3.3-4.9 5.1-8.1 1.7-3.2.9-6.2-.5-9.1-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                    Ask Latest Price
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
                href={`https://wa.me/918002661555?text=Hello%2C%20I%E2%80%99m%20interested%20in%20wholesale%20makhana.%20Please%20share%20your%20price%20list%20and%20available%20varieties%20for%20${encodeURIComponent(product.name)}.`}
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
                href={`https://wa.me/?text=Check out ${encodeURIComponent(product.name)} from Makhana Ghar! https://www.makhanaghar.in/product/${encodeURIComponent(product.name)}`}
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
              <a
                href={`https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(product.name)} from Makhana Ghar!`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareBtnTwitter}`}
                aria-label="Share on Twitter"
              >
                𝕏
              </a>
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

      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
