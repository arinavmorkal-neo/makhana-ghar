'use client';

import { useState, useCallback } from 'react';
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

const categories = ['all', 'products', 'farm', 'events', 'packaging', 'team'];

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
    setLightboxIndex((prev) =>
      prev! > 0 ? prev! - 1 : filtered.length - 1
    );
  }, [lightboxIndex, filtered.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev! < filtered.length - 1 ? prev! + 1 : 0
    );
  }, [lightboxIndex, filtered.length]);

  return (
    <>
      <section className={styles.galleryContainer}>
        <div className={styles.galleryInner}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Moments from <span className={styles.sectionTitleAccent}>Farm to Factory</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Take a visual tour through our harvest ponds in Bihar, our sorting &amp;
              grading facility, and the premium Makhana we deliver worldwide.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn}${
                  activeFilter === cat ? ` ${styles.filterBtnActive}` : ''
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📷</span>
              <p>No photos in this category yet.</p>
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
                      width={item.image.width || 600}
                      height={item.image.height || 450}
                      loading="lazy"
                      className={styles.cardImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
                    />
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardInfo}>
                        <span className={styles.cardCategory}>
                          {item.category.toUpperCase()}
                        </span>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                      </div>
                      <div className={styles.expandIcon}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={styles.closeBtn}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Prev button */}
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Image */}
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
                  {filtered[lightboxIndex].category.toUpperCase()}
                </span>
                <h4 className={styles.lightboxTitle}>
                  {filtered[lightboxIndex].title}
                </h4>
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
