"use client";

import { useEffect, useRef, useState } from "react";

const defaultProducts = [
  {
    id: 1,
    name: "Phool Makhana 6+ Grade",
    category: "PREMIUM GRADE",
    image: "/6+.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Roasted Makhana Classic",
    category: "ROASTED MAKHANA",
    image: "/4+.png",
    badge: "Crunchy",
  },
  {
    id: 3,
    name: "Phool Makhana 5+ Grade",
    category: "EXPORT GRADE",
    image: "/5+.png",
    badge: "Export Quality",
  },
  {
    id: 4,
    name: "Makhana 4+ Sutta",
    category: "WHOLESALE GRADE",
    image: "/4+.png",
    badge: "Wholesale",
  },
  {
    id: 5,
    name: "Flavour Spiced Makhana",
    category: "FLAVOURED MAKHANA",
    image: "/5+.png",
    badge: "New Arrival",
  },
  {
    id: 6,
    name: "Raw Organic Makhana",
    category: "RAW / UNPROCESSED",
    image: "/4+.png",
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
        image: typeof p.image === 'object' && p.image?.url ? p.image.url : p.image || "/4+.png",
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap');

        @font-face {
          font-family: 'Little';
          src: url('/fonts/Little.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .slider-section {
          background: linear-gradient(to bottom, #1a3a1a 55%, #f2ede6 55%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0 25px;
          position: relative;
          overflow: hidden;
          font-family: 'Nunito', sans-serif;
        }

        .slider-top-edge {
          line-height: 0;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 10;
        }

        .slider-top-edge-img {
          display: block;
          width: 100%;
          height: auto;
        }

        .slider-windmill {
          position: absolute;
          bottom: 45%;
          right: 0px;
          width: 480px;
          height: auto;
          opacity: 0.9;
          pointer-events: none;
          z-index: 0;
        }

        .slider-windmill img {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (max-width: 768px) {
          .slider-windmill {
            width: 240px;
            right: 0px;
            bottom: 45%;
            opacity: 0.8;
          }
        }

        @media (max-width: 480px) {
          .slider-section {
            min-height: 80vh;
          }
          .slider-windmill {
            width: 400px;
            right: auto;
            left: 50%;
            transform: translateX(-50%);
            bottom: 45%;
            opacity: 0.85;
          }
        }

        /* Background decorative element */
        .slider-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .slider-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .slider-header {
          text-align: center;
          margin-bottom: 50px;
          z-index: 1;
        }

        .slider-header-label {
          font-family: 'Caveat', cursive;
          font-size: 24px;
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 12px;
          display: block;
        }

        .slider-header h2 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900;
          color: #fff;
          line-height: 1.15;
          max-width: 700px;
          margin: 0 auto 14px;
        }

        .slider-header p {
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .slider-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          margin-top: 18px;
        }
        .slider-divider span {
          width: 40px;
          height: 1px;
          background: #d4af37;
          opacity: 0.5;
        }
        .slider-divider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af37;
        }

        /* Slider viewport */
        .slider-viewport {
          width: 984px;
          max-width: 100%;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }

        .slider-track {
          display: flex;
          gap: 24px;
          padding: 20px 0;
          will-change: transform;
        }

        /* Card */
        .slider-card {
          flex: 0 0 312px;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .slider-card:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .slider-card-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .slider-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }

        .slider-card:hover .slider-card-img-wrap img {
          transform: scale(1.08);
        }

        /* Logo watermark on image */
        .slider-card-logo {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(26, 58, 26, 0.85);
          border-radius: 8px;
          padding: 4px 10px;
          font-family: 'Playfair Display', serif;
          font-size: 10px;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
        }

        /* Badge */
        .slider-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #d4af37;
          color: #1a3a1a;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Category strip */
        .slider-card-category-strip {
          background: rgba(26,58,26,0.92);
          padding: 6px 16px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #d4af37;
          text-transform: uppercase;
        }

        /* Card bottom */
        .slider-card-body {
          background: #fff;
          padding: 14px 18px 18px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .slider-card-name {
          font-family: 'Little', cursive;
          font-size: 18px;
          font-weight: 700;
          color: #1a3a1a;
          line-height: 1.2;
        }

        .slider-card-underline {
          width: 36px;
          height: 3px;
          background: #d4af37;
          border-radius: 2px;
          margin-top: 8px;
        }

        .slider-card-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1a3a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .slider-card:hover .slider-card-arrow {
          background: #d4af37;
          transform: rotate(45deg);
        }

        .slider-card-arrow svg {
          width: 16px;
          height: 16px;
          stroke: #fff;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .slider-card:hover .slider-card-arrow svg {
          stroke: #1a3a1a;
        }

        /* Dots */
        .slider-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 32px;
          z-index: 1;
        }

        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(26,58,26,0.2);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;
        }

        .slider-dot.active {
          background: #1a3a1a;
          width: 24px;
          border-radius: 4px;
          transform: scale(1.1);
        }

        /* View All */
        .slider-view-all-wrap {
          margin-top: 36px;
          z-index: 1;
        }

        .slider-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1.5px solid rgba(26,58,26,0.4);
          color: #1a3a1a;
          font-family: 'Nunito', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 28px;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
        }

        .slider-view-all-btn:hover {
          background: #1a3a1a;
          border-color: #1a3a1a;
          color: #d4af37;
          transform: translateY(-2px);
        }

        .slider-view-all-btn svg {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.2s ease;
        }

        .slider-view-all-btn:hover svg {
          transform: translateX(4px);
        }

        /* Entry animation */
        @keyframes sliderFadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .slider-header { animation: sliderFadeSlideUp 0.7s ease both; }
        .slider-viewport { animation: sliderFadeSlideUp 0.7s 0.2s ease both; }
        .slider-dots { animation: sliderFadeSlideUp 0.7s 0.35s ease both; }
        .slider-view-all-wrap { animation: sliderFadeSlideUp 0.7s 0.5s ease both; }

        @media (max-width: 1024px) {
          .slider-viewport {
            width: 100%;
            padding: 0 24px;
          }
        }
      `}</style>

      <section className="slider-section">
        {/* ── DECORATIVE TOP EDGE ── */}
        <div className="slider-top-edge" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/page-title-top-1.webp"
            alt=""
            className="slider-top-edge-img"
          />
        </div>

        {/* ── BACKGROUND WINDMILL ── */}
        <div className="slider-windmill" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/windmill.png" alt="" />
        </div>

        {/* Header */}
        <div className="slider-header">
          <span className="slider-header-label">{headerLabel}</span>
          <h2>{heading}</h2>
          <p>
            {description}
          </p>
          <div className="slider-divider">
            <span />
            <div className="slider-divider-dot" />
            <span />
          </div>
        </div>

        {/* Infinite Slider */}
        <div
          className="slider-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="slider-track" ref={trackRef}>
            {allProducts.map((product: any, i: number) => (
              <div className="slider-card" key={`${product.id}-${i}`}>
                <div className="slider-card-img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="slider-card-logo">Makhana Ghar</span>
                  <span className="slider-card-badge">{product.badge}</span>
                </div>
                <div className="slider-card-category-strip">{product.category}</div>
                <div className="slider-card-body">
                  <div>
                    <div className="slider-card-name">{product.name}</div>
                    <div className="slider-card-underline" />
                  </div>
                  <div className="slider-card-arrow">
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
        <div className="slider-dots">
          {products.map((_: any, i: number) => (
            <button
              key={i}
              className={`slider-dot${activeIndex === i ? " active" : ""}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* View All */}
        <div className="slider-view-all-wrap">
          <button className="slider-view-all-btn">
            View All Products
            <svg viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
