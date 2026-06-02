"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductSlider.module.css";
import { getImageUrlWithOverride } from '../../lib/getImageUrl';

const defaultProducts = [
  {
    id: 1,
    name: "Phool Makhana 6+ Grade",
    category: "PREMIUM GRADE",
    image: "/6+.webp",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Roasted Makhana Classic",
    category: "ROASTED MAKHANA",
    image: "/4+.webp",
    badge: "Crunchy",
  },
  {
    id: 3,
    name: "Phool Makhana 5+ Grade",
    category: "EXPORT GRADE",
    image: "/5+.webp",
    badge: "Export Quality",
  },
  {
    id: 4,
    name: "Makhana 4+ Sutta",
    category: "WHOLESALE GRADE",
    image: "/4+.webp",
    badge: "Wholesale",
  },
  {
    id: 5,
    name: "Flavour Spiced Makhana",
    category: "FLAVOURED MAKHANA",
    image: "/5+.webp",
    badge: "New Arrival",
  },
  {
    id: 6,
    name: "Raw Organic Makhana",
    category: "RAW / UNPROCESSED",
    image: "/4+.webp",
    badge: "100% Organic",
  },
];

export default function ProductSlider({ data }: { data?: any }) {
  const headerLabel = data?.headerLabel || "Our Product Category";
  const heading = data?.heading || "The Best Makhana Dealer for Wholesale and Retail";
  const description = data?.description || "Manufacturer, Wholesaler Trader, Supplier and Exporter of the supreme quality spectrum of Makhana Flakes, Roasted Makhana, Natural Makhana, Phool Makhana";

  const products = data?.products && data.products.length > 0
    ? data.products.map((p: any, idx: number) => ({
        id: p.id || idx,
        name: p.name,
        category: p.category,
        image: getImageUrlWithOverride(p.imageUrl, p.image, "/4+.webp"),
        badge: p.badge,
      }))
    : defaultProducts;

  const allProducts = [...products, ...products];
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);
  const cardWidth = 336; // 312px card width + 24px gap
  const totalCards = products.length;

  useEffect(() => {
    const speed = 0.6; // px per frame

    const animate = () => {
      if (!isPaused && trackRef.current) {
        positionRef.current += speed;
        if (positionRef.current >= cardWidth * totalCards) {
          positionRef.current = 0;
        }
        trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;

        const idx = Math.round(positionRef.current / cardWidth) % totalCards;
        setActiveIndex(idx);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, cardWidth, totalCards]);

  const goToSlide = (index: number) => {
    positionRef.current = cardWidth * index;
    setActiveIndex(index);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
    }
  };

  return (
    <section className={styles.sliderSection}>
      {/* ── DECORATIVE TOP EDGE ── */}
      <div className={styles.sliderTopEdge} aria-hidden="true">
        <Image
          src="/page-title-top-1.webp"
          alt=""
          className={styles.sliderTopEdgeImg}
          width={1920}
          height={30}
          sizes="100vw"
        />
      </div>

      {/* ── BACKGROUND WINDMILL ── */}
      <div className={styles.sliderWindmill} aria-hidden="true">
        <Image
          src="/windmill.webp"
          alt=""
          width={480}
          height={480}
          loading="lazy"
        />
      </div>

      {/* Header */}
      <div className={styles.sliderHeader}>
        <span className={styles.sliderHeaderLabel}>{headerLabel}</span>
        <h2 className={styles.sliderHeaderH2}>{heading}</h2>
        <p className={styles.sliderHeaderP}>
          {description}
        </p>
        <div className={styles.sliderDivider}>
          <span className={styles.sliderDividerLine} />
          <div className={styles.sliderDividerDot} />
          <span className={styles.sliderDividerLine} />
        </div>
      </div>

      {/* Infinite Slider */}
      <div
        className={styles.sliderViewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.sliderTrack} ref={trackRef}>
          {allProducts.map((product: any, i: number) => (
            <div className={styles.sliderCard} key={`${product.id}-${i}`}>
              <div className={styles.sliderCardImgWrap}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={312}
                  height={200}
                  loading="lazy"
                  sizes="312px"
                />
                <span className={styles.sliderCardLogo}>Makhana Ghar</span>
                <span className={styles.sliderCardBadge}>{product.badge}</span>
              </div>
              <div className={styles.sliderCardCategoryStrip}>{product.category}</div>
              <div className={styles.sliderCardBody}>
                <div>
                  <div className={styles.sliderCardName}>{product.name}</div>
                  <div className={styles.sliderCardUnderline} />
                </div>
                <div className={styles.sliderCardArrow}>
                  <svg viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className={styles.sliderDots}>
        {products.map((_: any, i: number) => (
          <button
            key={i}
            className={`${styles.sliderDot}${activeIndex === i ? ` ${styles.sliderDotActive}` : ""}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* View All */}
      <div className={styles.sliderViewAllWrap}>
        <Link href="/categories" className={styles.sliderViewAllBtn}>
          View All Products
          <svg viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

