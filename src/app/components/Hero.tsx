'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import EnquiryPopup from './EnquiryPopup';
import { getImageUrlWithOverride } from '../../lib/getImageUrl';

const defaultSlides = [
  {
    image: '/banner1.webp',
    tag: 'Superior Quality Makhana Wholesale Supply',
    heading: (
      <>
        Premium Quality Makhana At<br />
        Affordable Wholesale Prices
      </>
    ),
    body: (
      <>
        Trusted Supplier of High-Quality Makhana for Businesses, Retailers, and Wholesalers.
        <br />
        Health-Conscious Businesses and Food Retailers Worldwide.
      </>
    ),
    ctaText: 'Send Enquiry',
    ctaHref: '#contact',
  },
  {
    image: '/banner2.webp',
    tag: 'Farm Fresh & Naturally Processed',
    heading: (
      <>
        Bulk Makhana Supply<br />
        Direct From Source
      </>
    ),
    body: (
      <>
        From Bihar&apos;s finest farms to your doorstep.
        <br />
        Consistent quality, competitive pricing, and reliable delivery.
      </>
    ),
    ctaText: 'Get Quote',
    ctaHref: '#contact',
  },
];

const INTERVAL = 6000;

export default function Hero({ slides: cmsSlides }: { slides?: any[] }) {
  const slides = cmsSlides && cmsSlides.length > 0
    ? cmsSlides.map((s: any) => ({
        image: getImageUrlWithOverride(s.imageUrl, s.image, '/banner1.webp'),
        tag: s.tag,
        heading: s.heading,
        body: s.body,
        ctaText: s.ctaText,
        ctaHref: s.ctaHref,
      }))
    : defaultSlides;

  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setAnimKey((k) => k + 1);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      goTo(current === slides.length - 1 ? 0 : current + 1);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className={styles.section}>

      {/* Slide backgrounds — use Next.js Image for optimization */}
      {slides.map((s, i) => (
        <Image
          key={i}
          className={`${styles.bgImg} ${i === current ? styles.bgImgActive : ''}`}
          src={s.image}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          priority={i === 0}
          loading={i === 0 ? 'eager' : 'lazy'}
          sizes="100vw"
          quality={80}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className={styles.overlay} />

      {/* Animated text content */}
      <div className={styles.content} key={animKey}>
        <span className={styles.tag}>{slide.tag}</span>

        <h1 className={styles.heading} style={{ whiteSpace: 'pre-line' }}>{slide.heading}</h1>

        <Image
          className={styles.rule}
          src="/line-throw-title.webp"
          alt=""
          aria-hidden="true"
          width={200}
          height={10}
        />

        <p className={styles.body} style={{ whiteSpace: 'pre-line' }}>{slide.body}</p>

        <button
          type="button"
          className={styles.cta}
          onClick={() => setPopupOpen(true)}
        >
          {slide.ctaText}
          <span className={styles.ctaArrow}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M1 6.5H12M7 1.5L12 6.5L7 11.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Dot navigation */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Decorative grass edge at the bottom */}
      <Image
        className={styles.grassEdge}
        src="/grass-4.webp"
        alt=""
        aria-hidden="true"
        width={1920}
        height={40}
        sizes="100vw"
      />

      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}

