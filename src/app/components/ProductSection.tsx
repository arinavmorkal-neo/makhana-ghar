"use client";

import Link from 'next/link';
import styles from './ProductSection.module.css';

const defaultProducts = [
  {
    id: 1,
    name: "Makhana 4+ Sutta",
    weight: "1 kg",
    price: "₹799",
    origin: "Bihar, India",
    category: "Premium Grade",
    description: "4-sutta grade makhana — compact, crunchy, and perfect for roasting or making namkeen snacks.",
    tags: ["4+ Grade", "Crunchy", "Roast Ready"],
    image: "/4+.png",
    bg: "linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)",
    slug: "4-suta-round-makhana-flake",
  },
  {
    id: 2,
    name: "Makhana 5+ Sutta",
    weight: "1 kg",
    price: "₹999",
    origin: "Bihar, India",
    category: "Export Grade",
    description: "Medium-large 5-sutta makhana — fluffy, light, and ideal for both sweet & savory preparations.",
    tags: ["5+ Grade", "Fluffy", "Versatile"],
    image: "/5+.png",
    bg: "linear-gradient(160deg, #fff8e1 0%, #f9a825 100%)",
    slug: "5-suta-round-makhana",
  },
  {
    id: 3,
    name: "Makhana 6+ Sutta",
    weight: "1 kg",
    price: "₹1,299",
    origin: "Bihar, India",
    category: "Supreme Grade",
    description: "Largest 6-sutta premium makhana — the top grade for gifting, snacking, and gourmet recipes.",
    tags: ["6+ Grade", "Jumbo Size", "Gift Pack"],
    image: "/6+.png",
    bg: "linear-gradient(160deg, #fce4ec 0%, #c62828 100%)",
    slug: "6-suta-plus-makhana",
  },
  {
    id: 4,
    name: "Phool Makhana Lite",
    weight: "500g",
    price: "₹449",
    origin: "Bihar, India",
    category: "Healthy Snack",
    description: "Lightly roasted plain makhana — zero oil, zero spice. A clean, guilt-free snacking option.",
    tags: ["Zero Oil", "Low Calorie", "Vegan"],
    image: "/4+.png",
    bg: "linear-gradient(160deg, #e0f2f1 0%, #00695c 100%)",
    slug: "4-suta-round-makhana-flake",
  },
];

function getSlugFromName(name: string): string {
  const n = (name || "").toLowerCase();
  if (n.includes("6")) return "6-suta-plus-makhana";
  if (n.includes("5")) return "5-suta-round-makhana";
  return "4-suta-round-makhana-flake";
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
        image: p.imageUrl || (typeof p.image === 'object' && p.image?.url ? p.image.url : p.image) || "/4+.png",
        bg: p.bg || "linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)",
        slug: p.slug || getSlugFromName(p.name),
      }))
    : defaultProducts;

  return (
    <section id="products" className={styles.sectionWrapper}>

      {/* Kisan logo — top right */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.kisanLogo}
        src="/kisan-b-preview.png"
        alt="Kisan"
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
          <div key={p.id} className={styles.productCard}>
            {/* Gradient background */}
            <div className={styles.cardBg} style={{ background: p.bg }} />

            {/* Product image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.cardImage}
              src={p.image}
              alt={p.name}
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
                <Link href={`/product/${p.slug}`} className={styles.panelBtn}>Enquire Now</Link>
              </div>
            </div>

            {/* Mobile-only bottom bar */}
            <div className={styles.mobileBottom}>
              <span className={styles.mobileName}>{p.name}</span>
              <Link href={`/product/${p.slug}`} className={styles.mobileBtn}>Get Now</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
