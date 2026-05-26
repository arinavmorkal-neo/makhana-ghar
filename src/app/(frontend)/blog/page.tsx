'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import styles from './Blog.module.css';

/* ── Fallback blog data (used when CMS is not available) ── */
const defaultBlogs = [
  {
    id: 1,
    slug: 'how-uae-importers-can-source-premium-fox-nuts-from-india',
    title: 'How UAE Importers Can Source Premium Fox Nuts From India',
    date: '10 Jan 26',
    author: 'Admin',
    category: 'EXPORT',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Explore how UAE importers can source premium quality fox nuts from trusted Indian suppliers with proper export standards, packaging, and logistics support.',
    featured: true,
    readTime: '5 min read',
    content: '',
  },
  {
    id: 2,
    slug: 'why-premium-makhana-is-growing-in-global-markets',
    title: 'Why Premium Makhana Is Growing In Global Markets',
    date: '15 Jan 26',
    author: 'Admin',
    category: 'MARKET',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Makhana is becoming popular worldwide as a healthy, light, and nutritious snack option for modern consumers.',
    featured: true,
    readTime: '4 min read',
    content: '',
  },
  {
    id: 3,
    slug: 'health-benefits-of-makhana-for-daily-diet',
    title: 'Health Benefits of Makhana For Daily Diet',
    date: '20 Feb 26',
    author: 'Admin',
    category: 'HEALTH',
    image: '/blog/uae-makhana.png',
    excerpt:
      "Discover the incredible health benefits of Makhana and why it's becoming a staple in healthy diets around the world.",
    featured: false,
    readTime: '6 min read',
    content: '',
  },
  {
    id: 4,
    slug: 'makhana-packaging-guide-for-wholesale-buyers',
    title: 'Makhana Packaging Guide For Wholesale Buyers',
    date: '5 Mar 26',
    author: 'Admin',
    category: 'WHOLESALE',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Understanding the right packaging options for bulk Makhana orders — from private label to retail-ready packs.',
    featured: false,
    readTime: '5 min read',
    content: '',
  },
  {
    id: 5,
    slug: 'quality-grading-standards-for-indian-makhana',
    title: 'Quality Grading Standards For Indian Makhana',
    date: '12 Mar 26',
    author: 'Admin',
    category: 'QUALITY',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Learn about the grading system for Makhana in India and how to choose the right grade for your business needs.',
    featured: false,
    readTime: '7 min read',
    content: '',
  },
  {
    id: 6,
    slug: 'building-a-makhana-supply-chain-for-international-trade',
    title: 'Building A Makhana Supply Chain For International Trade',
    date: '25 Mar 26',
    author: 'Admin',
    category: 'EXPORT',
    image: '/blog/uae-makhana.png',
    excerpt:
      'A comprehensive guide to establishing a reliable Makhana supply chain for cross-border distribution and exports.',
    featured: false,
    readTime: '8 min read',
    content: '',
  },
];

const tags = ['All', 'EXPORT', 'MARKET', 'HEALTH', 'WHOLESALE', 'QUALITY'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const blogs = defaultBlogs;
  const featured = blogs.filter((p) => p.featured);
  const latest = blogs
    .filter((p) => !p.featured)
    .filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchTag = activeTag === 'All' || p.category === activeTag;
      return matchSearch && matchTag;
    });

  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="Makhana Ghar Blog"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Our Blog</span>
          <h1 className={styles.heroHeading}>Blog & Insights</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>
            Insights on premium Makhana sourcing, export tips, health benefits,
            and wholesale business strategies.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.grassEdge}
          src="/grassnew-white.png"
          alt=""
          aria-hidden="true"
        />
      </section>

      {/* ── BLOG CONTENT ── */}
      <section className={styles.blogContainer}>
        <div className={styles.blogInner}>
          {/* Featured Stories */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Featured <span className={styles.sectionTitleAccent}>Stories</span>
            </h2>
          </div>

          <div className={styles.featuredGrid}>
            {featured.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={styles.card}
              >
                <div className={styles.cardImg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} />
                  <div className={styles.cardImgOverlay} />
                  <span className={styles.cardTag}>{post.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardDate}>{post.date}</span>
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.readMore}>Read More →</span>
                    <span className={styles.readTime}>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Latest Blogs */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Latest <span className={styles.sectionTitleAccent}>Blogs</span>
            </h2>
            <div className={styles.searchBarWrap}>
              <div className={styles.searchInputWrap}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  className={styles.searchInput}
                  placeholder="Search blogs…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.tagFilters}>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`${styles.tagBtn}${activeTag === tag ? ` ${styles.tagBtnActive}` : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {latest.length === 0 ? (
            <div className={styles.empty}>
              No posts found. Try a different search or filter.
            </div>
          ) : (
            <div className={styles.latestGrid}>
              {latest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={styles.card}
                >
                  <div className={`${styles.cardImg} ${styles.cardImgSm}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} />
                    <div className={styles.cardImgOverlay} />
                    <span className={styles.cardTag}>{post.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardDate}>{post.date}</span>
                    <h3
                      className={`${styles.cardTitle} ${styles.cardTitleSm}`}
                    >
                      {post.title}
                    </h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.readMore}>Read More →</span>
                      <span className={styles.readTime}>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
