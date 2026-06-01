/'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress while the page hydrates and assets load
    const steps = [
      { target: 30, delay: 200 },
      { target: 55, delay: 500 },
      { target: 75, delay: 800 },
      { target: 90, delay: 1200 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    steps.forEach(({ target, delay }) => {
      timeouts.push(setTimeout(() => setProgress(target), delay));
    });

    // Listen for the page to be fully loaded
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setLoading(false), 400);
    };

    if (document.readyState === 'complete') {
      // Already loaded — finish quickly
      setProgress(100);
      const t = setTimeout(() => setLoading(false), 600);
      timeouts.push(t);
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Absolute maximum wait — never block forever
    const maxWait = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 4000);
    timeouts.push(maxWait);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`${styles.overlay} ${!loading ? styles.hidden : ''}`}
        aria-hidden={!loading}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.logoWrapper}>
          <div className={styles.logoContainer}>
            <div className={styles.glowRing} />
            <Image
              src="/loading-logo.png"
              alt="Makhana Ghar"
              width={180}
              height={180}
              className={styles.logo}
              priority
            />
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.loadingText}>Loading</span>
        </div>
      </div>

      {/* Page Content */}
      <div className={`${styles.content} ${!loading ? styles.visible : ''}`}>
        {children}
      </div>
    </>
  );
}
