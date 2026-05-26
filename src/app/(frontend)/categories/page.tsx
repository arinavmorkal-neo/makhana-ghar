'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import styles from './Categories.module.css';

/* ── Category definitions ── */
const categories = [
  { key: 'all', label: 'All Products', icon: '🌾' },
  { key: 'round', label: 'Round Makhana', icon: '⚪' },
  { key: 'flake', label: 'Makhana Flakes', icon: '🥜' },
  { key: 'premium', label: 'Premium Grade', icon: '⭐' },
];

/* ── Product Data ── */
const products = [
  {
    slug: '4-suta-round-makhana-flake',
    name: '4 Suta Round Makhana Flake',
    category: 'flake',
    grade: 'Standard',
    description:
      'Organic, gluten-free, and low-calorie round Makhana flakes. A crispy, protein-rich, vegan-friendly option perfect for health-conscious people.',
    image: '/products/4-suta-makhana.png',
    rating: 4.8,
    reviews: 128,
    tags: ['Organic', 'Gluten-Free', 'Vegan'],
  },
  {
    slug: '5-suta-round-makhana',
    name: '5 Suta Round Makhana',
    category: 'round',
    grade: 'Premium',
    description:
      'Premium quality 5 Suta Round Makhana with a larger size and superior crunch. Perfect for direct snacking, roasting, and gifting.',
    image: '/5+.png',
    rating: 4.9,
    reviews: 96,
    tags: ['Premium', 'Hand-Sorted', 'Fresh'],
  },
  {
    slug: '6-suta-plus-makhana',
    name: '6 Suta Plus Makhana',
    category: 'premium',
    grade: 'Super Premium',
    description:
      'The largest and most premium grade of Makhana. Top choice for retail packaging, gift boxes, and export markets.',
    image: '/6+.png',
    rating: 5.0,
    reviews: 64,
    tags: ['Super Premium', 'Export Quality', 'Large Size'],
  },
];

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main>
      <Header />

      {/* ── HERO BANNER (same style as blog) ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="Makhana Ghar Categories"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Explore</span>
          <h1 className={styles.heroHeading}>Our Categories</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>
            Browse our curated collection of premium Makhana — sourced directly
            from the farms of Bihar, hand-sorted for quality, and packed with freshness.
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

      {/* ── CATEGORIES CONTENT ── */}
      <section className={styles.categoryContainer}>
        <div className={styles.categoryInner}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Browse by{' '}
              <span className={styles.sectionTitleAccent}>Category</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className={styles.categoryFilters}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterPill}${
                  activeCategory === cat.key ? ` ${styles.filterPillActive}` : ''
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span className={styles.filterIcon}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filtered.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className={styles.productCard}
                >
                  {/* Image Section */}
                  <div className={styles.cardImageWrap}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardImageOverlay} />
                    <span className={styles.gradeBadge}>{product.grade}</span>
                  </div>

                  {/* Body */}
                  <div className={styles.cardBody}>
                    {/* Tags */}
                    <div className={styles.cardTags}>
                      {product.tags.map((tag) => (
                        <span key={tag} className={styles.cardTag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <p className={styles.cardDescription}>{product.description}</p>

                    {/* Rating */}
                    <div className={styles.cardRating}>
                      <span className={styles.stars}>
                        {'★'.repeat(Math.floor(product.rating))}
                        {product.rating % 1 >= 0.5 ? '★' : ''}
                      </span>
                      <span className={styles.ratingText}>
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <span className={styles.viewDetails}>
                        View Details
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className={styles.enquiryHint}>Send Enquiry</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaContent}>
                <h3 className={styles.ctaTitle}>
                  Looking for custom grades or bulk orders?
                </h3>
                <p className={styles.ctaText}>
                  We supply all grades from 4 Suta to 6+ Suta Premium. Contact us for
                  wholesale pricing, custom packaging, and export support.
                </p>
              </div>
              <Link href="/#contact" className={styles.ctaButton}>
                📞 Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
