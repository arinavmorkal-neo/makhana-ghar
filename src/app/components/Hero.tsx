'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';

const defaultSlides = [
  {
    image: '/banner1.png',
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
    image: '/banner2.png',
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
        image: typeof s.image === 'object' && s.image?.url ? s.image.url : s.image || '/banner1.png',
        tag: s.tag,
        heading: s.heading,
        body: s.body,
        ctaText: s.ctaText,
        ctaHref: s.ctaHref,
      }))
    : defaultSlides;

  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

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

      {/* Slide backgrounds */}
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          className={`${styles.bgImg} ${i === current ? styles.bgImgActive : ''}`}
          src={s.image}
          alt=""
          aria-hidden="true"
        />
      ))}

      {/* Dark gradient overlay */}
      <div className={styles.overlay} />

      {/* Animated text content */}
      <div className={styles.content} key={animKey}>
        <span className={styles.tag}>{slide.tag}</span>

        <h1 className={styles.heading} style={{ whiteSpace: 'pre-line' }}>{slide.heading}</h1>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.rule}
          src="/line-throw-title.png"
          alt=""
          aria-hidden="true"
        />

        <p className={styles.body} style={{ whiteSpace: 'pre-line' }}>{slide.body}</p>

        <a href={slide.ctaHref} className={styles.cta}>
          <span className={styles.ctaLabel}>{slide.ctaText}</span>
          <span className={styles.ctaArrow}>›</span>
        </a>
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.grassEdge}
        src="/grass-4.png"
        alt=""
        aria-hidden="true"
      />

    </section>
  );
}
