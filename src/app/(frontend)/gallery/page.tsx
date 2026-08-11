'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import styles from './Gallery.module.css';

/* ── Types ─────────────────────────────────────────── */
interface GalleryItem {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  order: number;
  image: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

/* ── Fallback data (shown when CMS is empty) ───────── */
const fallbackItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Premium Makhana Selection',
    category: 'products',
    featured: true,
    order: 0,
    image: { url: '/products/product1.png', alt: 'Premium Makhana' },
  },
  {
    id: '2',
    title: 'Farm Fresh Harvest',
    category: 'farm',
    featured: false,
    order: 1,
    image: { url: '/new-section.png', alt: 'Farm Harvest' },
  },
  {
    id: '3',
    title: 'Quality Packaging',
    category: 'packaging',
    featured: false,
    order: 2,
    image: { url: '/banner2.png', alt: 'Packaging' },
  },
];

const categories = ['all', 'products', 'farm', 'events', 'packaging', 'team'];

/* ── Component ─────────────────────────────────────── */
export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  /* Fetch gallery items from API */
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/frontend/gallery');
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          // Map CMS data to our shape
          const mapped: GalleryItem[] = data.items.map((doc: any) => ({
            id: doc.id,
            title: doc.title,
            category: doc.category || 'products',
            featured: doc.featured || false,
            order: doc.order || 0,
            image: {
              url: doc.imageUrl || doc.image?.url || doc.image?.imagekitUrl || '',
              alt: doc.image?.alt || doc.title,
              width: doc.image?.width,
              height: doc.image?.height,
            },
          }));
          setItems(mapped);
        } else {
          setItems(fallbackItems);
        }
      } catch {
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  /* Filter items */
  const filtered =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.category === activeFilter);

  /* Keyboard navigation for lightbox */
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : filtered.length - 1));
  }, [filtered.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : 0));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="Makhana Ghar Gallery"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Our Gallery</span>
          <h1 className={styles.heroHeading}>Photo Gallery</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>
            A glimpse into our journey — from lush farms to premium products,
            events, and the passionate team behind Makhana Ghar.
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

      {/* ── GALLERY CONTENT ── */}
      <section className={styles.galleryContainer}>
        <div className={styles.galleryInner}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Explore Our{' '}
              <span className={styles.sectionTitleAccent}>Moments</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Browse through our collection of images showcasing our premium
              makhana products, farm practices, and more.
            </p>
          </div>

          {/* Category Filters */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn}${activeFilter === cat ? ` ${styles.filterBtnActive}` : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner} />
              <p className={styles.loadingText}>Loading gallery…</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filtered.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📷</div>
              <h3 className={styles.emptyTitle}>No images found</h3>
              <p className={styles.emptyText}>
                Try selecting a different category or check back later.
              </p>
            </div>
          )}

          {/* Masonry Grid */}
          {!loading && filtered.length > 0 && (
            <div className={styles.masonryGrid}>
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className={styles.gridItem}
                  onClick={() => setLightboxIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIndex(index);
                    }
                  }}
                >
                  {item.featured && (
                    <span className={styles.featuredBadge}>★ Featured</span>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.gridItemImg}
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    loading="lazy"
                  />

                  <div className={styles.gridItemOverlay}>
                    <h3 className={styles.gridItemTitle}>{item.title}</h3>
                    <span className={styles.gridItemCategory}>
                      {item.category}
                    </span>
                  </div>

                  <span className={styles.gridItemZoom} aria-hidden="true">
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
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <div
        className={`${styles.lightboxBackdrop}${lightboxIndex !== null ? ` ${styles.lightboxOpen}` : ''}`}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <div
          className={styles.lightboxContent}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Image */}
          {currentItem && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.lightboxImg}
                src={currentItem.image.url}
                alt={currentItem.image.alt || currentItem.title}
              />
              <div className={styles.lightboxCaption}>
                <h3 className={styles.lightboxTitle}>{currentItem.title}</h3>
                <span className={styles.lightboxCategory}>
                  {currentItem.category}
                </span>
              </div>
              <span className={styles.lightboxCounter}>
                {(lightboxIndex ?? 0) + 1} / {filtered.length}
              </span>
            </>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>
          )}
        </div>
      </div>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
