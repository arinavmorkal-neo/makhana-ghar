"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./StatsSection.module.css";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const startValue = 1;

    const easeOutExpo = (t: number) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.floor(startValue + (target - startValue) * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, start]);

  return count;
}

function CounterStat({
  stat,
  delay,
  started,
}: {
  stat: Stat;
  delay: number;
  started: boolean;
}) {
  const [localStarted, setLocalStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setLocalStarted(true), delay);
    return () => clearTimeout(timer);
  }, [started, delay]);

  const count = useCountUp(stat.value, 2200, localStarted);

  const displayValue = stat.suffix
    ? count.toLocaleString() + stat.suffix
    : count.toLocaleString();

  return (
    <div className={styles.statItem}>
      <div className={styles.iconWrapper}>{stat.icon}</div>
      <div className={styles.number}>{displayValue}</div>
      <div className={styles.label}>{stat.label}</div>
    </div>
  );
}

// SVG Icons
const GlobeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const MapIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const DashboardIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
    <circle cx="12" cy="12" r="1" fill="white" />
  </svg>
);

const SmileIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function StatsSection({ stats: cmsStats }: { stats?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const stats = cmsStats && cmsStats.length > 0
    ? cmsStats.map((s: any) => {
        let icon: React.ReactNode = <GlobeIcon />;
        if (s.icon === 'map') icon = <MapIcon />;
        else if (s.icon === 'dashboard') icon = <DashboardIcon />;
        else if (s.icon === 'smile') icon = <SmileIcon />;
        return {
          icon,
          value: Number(s.value),
          suffix: s.suffix || '',
          label: s.label,
        };
      })
    : [
        { icon: <GlobeIcon />, value: 10, label: "Countries" },
        { icon: <MapIcon />, value: 128, label: "District Covered" },
        { icon: <DashboardIcon />, value: 35, label: "Product Category" },
        { icon: <SmileIcon />, value: 3925, suffix: "", label: "Happy Clients" },
      ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.statsSection} ref={sectionRef}>
      <Image
        className={styles.topEdge}
        src="/page-title-top--brown.webp"
        alt=""
        aria-hidden="true"
        width={1920}
        height={20}
        sizes="100vw"
      />
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <CounterStat
            key={stat.label}
            stat={stat}
            delay={i * 150}
            started={started}
          />
        ))}
      </div>
      <Image
        className={styles.bottomEdge}
        src="/page-title-bottom-brown.webp"
        alt=""
        aria-hidden="true"
        width={1920}
        height={20}
        sizes="100vw"
      />
    </div>
  );
}
