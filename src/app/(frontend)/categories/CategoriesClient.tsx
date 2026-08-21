'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Categories.module.css';

export interface ProductItem {
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

export default function CategoriesClient({ initialProducts }: { initialProducts: ProductItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const products = initialProducts;

  /* Build category filters dynamically from products */
  const uniqueGrades = Array.from(new Set(products.map((p) => p.grade).filter(Boolean)));
  const categories = [
    { key: 'all', label: 'All Products' },
    ...uniqueGrades.map((g) => ({
      key: g.toLowerCase().replace(/\s+/g, '-'),
      label: g,
    })),
  ];

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className={styles.categoryContainer}>
      <div className={styles.categoryInner}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Browse by <span className={styles.sectionTitleAccent}>Category</span>
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
                  <Image
                    src={product.image || '/4+.webp'}
                    alt={product.name}
                    width={400}
                    height={300}
                    loading="lazy"
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
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
  );
}
