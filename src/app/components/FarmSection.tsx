"use client";

import styles from "./FarmSection.module.css";

export default function FarmSection({ data }: { data?: any }) {
  const eyebrow = data?.eyebrow || "From Our Farms";
  const description = data?.description || "Our makhana is cultivated in the pristine ponds of Bihar, hand-harvested by local farmers, and sun-dried to perfection — preserving every bit of its natural crunch, nutrition, and earthy flavor. From farm to you, with zero compromise on quality.";
  const ctaText = data?.ctaText || "Get In Touch";
  const ctaHref = (data?.ctaHref === "#contact" || !data?.ctaHref) ? "/about-us" : data.ctaHref;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>
          {data?.heading ? (
            data.heading
          ) : (
            <>
              Straight From Bihar&apos;s <span className={styles.headingAccent}>Finest Fields</span> To Your Table
            </>
          )}
        </h2>
        <p className={styles.description}>
          {description}
        </p>
        <a href={ctaHref} className={styles.ctaBtn}>
          {ctaText}
          <span className={styles.ctaArrow}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
