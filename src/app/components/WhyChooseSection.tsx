"use client";

import { useState } from "react";
import styles from "./WhyChooseSection.module.css";
import { getImageUrl, getImageUrlWithOverride } from '../../lib/getImageUrl';

const defaultCards = [
  {
    id: 1,
    title: "Best Makhana Supplier",
    description:
      "Makhana Ghar is a trusted best makhana supplier and exporter, providing premium quality makhana and fox nuts worldwide with guaranteed freshness.",
    image: "/4+.png",
  },
  {
    id: 2,
    title: "4 Suta Round Makhana Flake",
    description:
      "Discover 4 Suta Round Makhana Flake: The Best Blend of Health and Taste. Organic, gluten-free, and low-calorie round Makhana for every diet.",
    image: "/5+.png",
  },
  {
    id: 3,
    title: "White Plain Makhana Flake",
    description:
      "White Plain Makhana Flake: A wholesome snack with gluten-free and protein-rich goodness. Perfect for healthy living and weight management.",
    image: "/6+.png",
  },
];

export default function WhyChooseSection({ data }: { data?: any }) {
  const [videoOpen, setVideoOpen] = useState(false);

  const eyebrow = data?.eyebrow || "Why Choose Makhana Ghar?";
  const heading = data?.heading || "We are a trusted makhana Dealer, Supplier";
  const body = data?.body || "At Makhana Ghar, we are a trusted makhana dealer, supplier, and manufacturer, delivering the finest quality makhana straight from reliable sources. Our makhanas are 100% natural, fresh, and free from chemicals, ensuring a healthy and nutritious snack for everyone. As leading makhana suppliers, we maintain export-quality standards, offering makhanas rich in essential nutrients like protein, fiber, magnesium, and potassium. Whether you're looking for a makhana manufacturer for bulk orders or a makhana supplier for retail needs, we guarantee reliable supply at affordable prices.";
  const ctaText = data?.ctaText || "Tell us about your need";
  const ctaHref = data?.ctaHref || "#contact";
  const videoThumbnail = getImageUrlWithOverride(data?.videoThumbnailUrl, data?.videoThumbnail, "/banner1.png");
  const videoUrl = data?.videoUrl || "https://www.youtube.com/embed/dKDRhqPcpts?autoplay=1";
  const heroImage = getImageUrlWithOverride(data?.heroImageUrl, data?.heroImage, "/banner2.png");

  const CARDS = data?.cards && data.cards.length > 0
    ? data.cards.map((c: any, idx: number) => ({
        id: c.id || idx,
        title: c.title,
        description: c.description,
        image: getImageUrlWithOverride(c.imageUrl, c.image, "/4+.png"),
      }))
    : defaultCards;

  return (
    <>
      <section className={styles.wrap} suppressHydrationWarning>
        {/* ── TOP SECTION ── */}
        <div className={styles.top} suppressHydrationWarning>

          {/* LEFT: hero image + floating video card */}
          <div className={styles.left} suppressHydrationWarning>
            {/* floating video card */}
            <div
              className={styles.videoCard}
              onClick={() => setVideoOpen(true)}
              role="button"
              aria-label="Play video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={videoThumbnail}
                alt="Watch our story"
              />
              <div className={styles.videoOverlay}>
                <div className={styles.playBtn}>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M2 1.5L14.5 9L2 16.5V1.5Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* hero image */}
            <div className={styles.heroWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt="Trusted makhana dealer and supplier"
              />
            </div>
          </div>

          {/* RIGHT: content */}
          <div className={styles.right}>
            <div className={styles.eyebrow}>
              <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                <path
                  d="M0 7H32M26 1L32 7L26 13"
                  stroke="#4A7C3F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {eyebrow}
            </div>

            <h2 className={styles.heading} style={{ whiteSpace: 'pre-line' }}>
              {heading}
            </h2>

            <p className={styles.body} style={{ whiteSpace: 'pre-line' }}>
              {body}
            </p>

            <a href={ctaHref} className={styles.ctaBtn}>
              {ctaText}
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
            </a>
          </div>
        </div>

        {/* ── DARK CARDS BAR ── */}
        <div className={styles.dark}>
          <div className={styles.cards}>
            {CARDS.map((card: any) => (
              <div className={styles.card} key={card.id}>
                <div className={styles.cardImgWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.cardImg}
                    src={card.image}
                    alt={card.title}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardCheck}>
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M1 5L4.5 8.5L11 1.5"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <div
          className={styles.modal}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className={styles.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              src={videoUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Makhana Ghar – Our Story"
            />
          </div>
        </div>
      )}
    </>
  );
}
