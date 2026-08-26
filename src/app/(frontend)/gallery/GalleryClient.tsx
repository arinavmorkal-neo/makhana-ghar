'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

export interface GalleryItem {
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

const categoryLabels: Record<string, string> = {
  all: 'All Photos',
  products: 'Makhana Products',
  farm: 'Farm & Harvest',
  processing: 'Processing & Sorting',
  packaging: 'Packaging & Export',
  team: 'Leadership & Team',
};

const filterCategories = ['all', 'products', 'farm', 'processing', 'packaging', 'team'];

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = initialItems;

  const filtered =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.category === activeFilter);

  /* Lightbox navigation */
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1));
  }, [lightboxIndex, filtered.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, filtered.length]);

  /* Keyboard controls for lightbox */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  return (
    <>
      <section className={styles.galleryContainer}>
        <div className={styles.galleryInner}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>
              <svg width="24" height="12" viewBox="0 0 36 14" fill="none">
                <path d="M0 7H32M26 1L32 7L26 13" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              High Purity Fox Nuts
            </span>
            <h2 className={styles.sectionTitle}>
              Moments from <span>Farm to Factory</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Take a visual tour through our harvest ponds in Katihar, traditional sun-drying yards, automated grading facilities, and premium export-grade packaging.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={styles.filterBar}>
            {filterCategories.map((cat) => {
              const count =
                cat === 'all'
                  ? items.length
                  : items.filter((i) => i.category === cat).length;

              if (cat !== 'all' && count === 0) return null;

              return (
                <button
                  key={cat}
                  className={`${styles.filterBtn}${
                    activeFilter === cat ? ` ${styles.filterBtnActive}` : ''
                  }`}
                  onClick={() => setActiveFilter(cat)}
                >
                  <span>{categoryLabels[cat] || cat}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Image Grid */}
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📷</span>
              <p>No photos found in this category yet.</p>
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {filtered.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.galleryCard}${
                    item.featured ? ` ${styles.featuredCard}` : ''
                  }`}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                >
                  <div className={styles.cardImageWrap}>
                    <Image
                      src={item.image.url || '/4+.webp'}
                      alt={item.image.alt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className={styles.cardImage}
                    />

                    {/* Featured Badge */}
                    {item.featured && (
                      <span className={styles.featuredBadge}>Featured</span>
                    )}

                    {/* Category Chip Top Right */}
                    <span className={styles.categoryChip}>
                      {categoryLabels[item.category]?.split(' ')[0] || item.category}
                    </span>

                    {/* Overlay with Title & Expand Icon */}
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardInfo}>
                        <span className={styles.cardCategory}>
                          {categoryLabels[item.category] || item.category}
                        </span>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                      </div>
                      <div className={styles.expandIcon}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX MODAL ── */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div className={styles.lightbox} onClick={closeLightbox} role="dialog" aria-modal="true">
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar inside Lightbox */}
            <div className={styles.lightboxTopBar}>
              <span className={styles.lightboxCounter}>
                {lightboxIndex + 1} / {filtered.length}
              </span>
              <button
                className={styles.closeBtn}
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                ✕
              </button>
            </div>

            {/* Prev button */}
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Image Main Container */}
            <div className={styles.lightboxImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[lightboxIndex].image.url}
                alt={
                  filtered[lightboxIndex].image.alt ||
                  filtered[lightboxIndex].title
                }
                className={styles.lightboxImage}
              />
              <div className={styles.lightboxCaption}>
                <span className={styles.lightboxCategory}>
                  {categoryLabels[filtered[lightboxIndex].category] ||
                    filtered[lightboxIndex].category}
                </span>
                <h3 className={styles.lightboxTitle}>
                  {filtered[lightboxIndex].title}
                </h3>
              </div>
            </div>

            {/* Next button */}
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
