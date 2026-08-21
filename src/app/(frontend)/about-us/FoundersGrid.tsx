'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './AboutUs.module.css';

/* ── Types ─────────────────────────────────────────── */
interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  photoAlt: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

/**
 * Client-side portion of the About Us page — handles the interactive
 * founder cards (social link hovers). Receives pre-fetched data from
 * the server component parent.
 */
export default function FoundersGrid({ founders }: { founders: Founder[] }) {
  const [, setHovered] = useState<string | null>(null);

  return (
    <div className={styles.foundersGrid}>
      {founders.map((founder) => (
        <div
          key={founder.id}
          className={styles.founderCard}
          onMouseEnter={() => setHovered(founder.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className={styles.founderImageWrap}>
            <Image
              src={founder.photoUrl}
              alt={founder.photoAlt}
              className={styles.founderImage}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            />
            <div className={styles.founderImageOverlay} />
          </div>
          <div className={styles.founderInfo}>
            <h3 className={styles.founderName}>{founder.name}</h3>
            <span className={styles.founderRole}>{founder.role}</span>
            <p className={styles.founderBio}>{founder.bio}</p>
            <div className={styles.founderSocials}>
              {founder.linkedinUrl && (
                <a href={founder.linkedinUrl} className={styles.founderSocialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {founder.twitterUrl && (
                <a href={founder.twitterUrl} className={styles.founderSocialLink} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
