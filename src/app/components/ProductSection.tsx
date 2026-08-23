"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductSection.module.css';
import { getImageUrlWithOverride } from '../../lib/getImageUrl';

const defaultProducts: { id: number; name: string; weight: string; price: string; origin: string; category: string; description: string; tags: string[]; image: string; bg: string; slug: string }[] = [];

function slugify(name: string): string {
  return (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProductSection({ data }: { data?: any }) {
  const sectionTag = data?.sectionTag || "Our Products";
  const sectionTitle = data?.sectionTitle || "Premium Makhana Grades";
  const sectionSubtitle = data?.sectionSubtitle || "Sourced directly from Bihar's finest farms — graded, sorted, and packed for quality.";

  const products = data?.products && data.products.length > 0
    ? data.products.map((p: any, idx: number) => ({
        id: p.id || idx,
        name: p.name,
        weight: p.weight,
        price: p.price,
        origin: p.origin || "Bihar, India",
        category: p.category,
        description: p.description,
        tags: p.tags && p.tags.length > 0 ? p.tags.map((t: any) => t.tag) : [],
        image: getImageUrlWithOverride(p.imageUrl, p.image, "/4+.webp"),
        bg: p.bg || "linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)",
        slug: p.slug || slugify(p.name),
      }))
    : defaultProducts;

  return (
    <section id="products" className={styles.sectionWrapper}>

      {/* Kisan logo — top right */}
      <Image
        className={styles.kisanLogo}
        src="/kisan-b-preview.webp"
        alt="Kisan"
        width={120}
        height={120}
        loading="lazy"
      />

      {/* Yellow top half */}
      <div className={styles.yellowHalf} />

      {/* Wavy divider */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className={styles.waveSvg}>
          <path d="M0,0 L0,32 C80,52 160,12 240,32 C320,52 400,12 480,28 C560,44 640,8 720,28 C800,48 880,12 960,28 C1040,44 1120,10 1200,28 C1280,46 1360,14 1440,28 L1440,0 Z" fill="#F5C800" />
        </svg>
      </div>

      {/* White bottom half */}
      <div className={styles.whiteHalf} />

      {/* Section heading */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTag}>{sectionTag}</span>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        <p className={styles.sectionSubtitle}>
          {sectionSubtitle}
        </p>
      </div>

      {/* Product cards */}
      <div className={styles.cardsRow}>
        {products.map((p: any) => (
          <Link key={p.id} href={`/product/${p.slug}`} className={styles.productCardLink}>
            <div className={styles.productCard}>
              {/* Gradient background */}
              <div className={styles.cardBg} style={{ background: p.bg }} />

              {/* Product image */}
              <Image
                className={styles.cardImage}
                src={p.image}
                alt={p.name}
                width={400}
                height={400}
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 280px"
              />

              {/* Hover details panel */}
              <div className={styles.cardHoverPanel}>
                <div className={styles.panelName}>{p.name}</div>
                <div className={styles.panelOrigin}>{p.category} · {p.origin}</div>
                <div className={styles.panelDesc}>{p.description}</div>
                <div className={styles.panelTags}>
                  {p.tags.map((t: any) => (
                    <span key={t} className={styles.panelTag}>{t}</span>
                  ))}
                </div>
                <div className={styles.panelFooter}>
                  <div>
                    <div className={styles.panelPrice}>{p.price}</div>
                    <div className={styles.panelWeight}>{p.weight}</div>
                  </div>
                  <span className={styles.panelBtn}>Enquire Now</span>
                </div>
              </div>

              {/* Mobile-only bottom bar */}
              <div className={styles.mobileBottom}>
                <span className={styles.mobileName}>{p.name}</span>
                <span className={styles.mobileBtn}>Get Now</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
