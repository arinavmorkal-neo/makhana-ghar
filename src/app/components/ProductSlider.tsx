"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductSlider.module.css";
import { getImageUrlWithOverride } from '../../lib/getImageUrl';

const defaultProducts: { id: number; name: string; slug: string; category: string; image: string; badge: string }[] = [];

export default function ProductSlider({ data }: { data?: any }) {
  const headerLabel = data?.headerLabel || "Our Product Category";
  const heading = data?.heading || "The Best Makhana Dealer for Wholesale and Retail";
  const description = data?.description || "Manufacturer, Wholesaler Trader, Supplier and Exporter of the supreme quality spectrum of Makhana Flakes, Roasted Makhana, Natural Makhana, Phool Makhana";

  const products = data?.products && data.products.length > 0
    ? data.products.map((p: any, idx: number) => ({
        id: p.id || idx,
        name: p.name,
        slug: p.slug || '',
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

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const hasDragged = useRef(false);
  const DRAG_THRESHOLD = 5; // px — beyond this, it's a drag, not a click

  useEffect(() => {
    const speed = 0.6; // px per frame

    const animate = () => {
      if (!isPaused && !isDragging.current && trackRef.current) {
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

  // ── Drag Handlers ──
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = clientX;
    dragStartPos.current = positionRef.current;
    setIsPaused(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || !trackRef.current) return;
    const delta = dragStartX.current - clientX;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      hasDragged.current = true;
    }
    let newPos = dragStartPos.current + delta;
    // Wrap around for infinite loop
    const maxPos = cardWidth * totalCards;
    if (newPos < 0) newPos += maxPos;
    if (newPos >= maxPos) newPos -= maxPos;
    positionRef.current = newPos;
    trackRef.current.style.transform = `translateX(-${newPos}px)`;
    const idx = Math.round(newPos / cardWidth) % totalCards;
    setActiveIndex(idx);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    // Snap to nearest card
    const nearest = Math.round(positionRef.current / cardWidth);
    const snapped = nearest * cardWidth;
    positionRef.current = snapped >= cardWidth * totalCards ? 0 : snapped;
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.3s ease';
      trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
      setTimeout(() => {
        if (trackRef.current) trackRef.current.style.transition = '';
      }, 300);
    }
    setActiveIndex(Math.round(positionRef.current / cardWidth) % totalCards);
  };

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    if (isDragging.current) handleDragEnd();
    setIsPaused(false);
  };

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  // Prevent link navigation when dragging
  const onCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
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
        className={`${styles.sliderViewport}${isDragging.current ? ` ${styles.sliderDragging}` : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.sliderTrack} ref={trackRef}>
          {allProducts.map((product: any, i: number) => (
            <Link
              href={product.slug ? `/product/${product.slug}` : '/categories'}
              className={styles.sliderCard}
              key={`${product.id}-${i}`}
              onClick={onCardClick}
              draggable={false}
            >
              <div className={styles.sliderCardImgWrap}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={312}
                  height={200}
                  loading="lazy"
                  sizes="312px"
                  draggable={false}
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
            </Link>
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

