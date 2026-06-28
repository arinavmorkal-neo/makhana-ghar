'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import styles from './Blog.module.css';

/* ── Blog data (populated from CMS) ── */
const defaultBlogs: {
  id: number;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  featured: boolean;
  readTime: string;
  content: string;
}[] = [];

const tags = ['All'];

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
