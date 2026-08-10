'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import { getImageUrlWithOverride } from '../../../lib/getImageUrl';
import styles from './Categories.module.css';

/* ── Types ── */
interface Product {
  slug: string;
  name: string;
  category: string;
  grade: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
}

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* Fetch products from CMS */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          const mapped: Product[] = data.products.map((doc: any) => ({
            slug: doc.slug || '',
            name: doc.name || '',
            category: (doc.grade || 'all').toLowerCase().replace(/\s+/g, '-'),
            grade: doc.grade || '',
            description: doc.description || '',
            image: getImageUrlWithOverride(doc.mainImageUrl, doc.mainImage, '/4+.webp'),
            rating: doc.rating || 4.8,
            reviews: doc.reviews || 0,
            tags: doc.isOrganic ? ['Organic'] : [],
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  /* Build category filters dynamically from products */
  const uniqueGrades = Array.from(new Set(products.map(p => p.grade).filter(Boolean)));
  const categories = [
    { key: 'all', label: 'All Products' },
    ...uniqueGrades.map(g => ({
      key: g.toLowerCase().replace(/\s+/g, '-'),
      label: g,
    })),
  ];

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
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
          <h1 className={styles.heroHeading}>Our Products</h1>
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
                {cat.label}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.emptyState}>
              <p>Loading products…</p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🔍</span>
              <p>No products found in this category.</p>
            </div>
          ) : !loading && (
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
                    {product.grade && (
                      <span className={styles.gradeBadge}>{product.grade}</span>
                    )}
                  </div>

                  {/* Body */}
                  <div className={styles.cardBody}>
                    {/* Tags */}
                    {product.tags.length > 0 && (
                      <div className={styles.cardTags}>
                        {product.tags.map((tag) => (
                          <span key={tag} className={styles.cardTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

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
              <Link href="/contact-us" className={styles.ctaButton}>
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
