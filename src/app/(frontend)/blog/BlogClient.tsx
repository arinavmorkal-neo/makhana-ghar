'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';

export interface BlogPostItem {
  id: string | number;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  featured: boolean;
  readTime: string;
  content?: string;
}

export default function BlogClient({ initialBlogs }: { initialBlogs: BlogPostItem[] }) {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const blogs = initialBlogs;
  const categoriesList = ['All', ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))];

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
    <section className={styles.blogContainer}>
      <div className={styles.blogInner}>
        {/* Featured Stories */}
        {featured.length > 0 && (
          <>
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
                    <Image
                      src={post.image || '/banner1.webp'}
                      alt={post.title}
                      width={600}
                      height={400}
                      className={styles.cardImg}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
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
          </>
        )}

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

        {categoriesList.length > 1 && (
          <div className={styles.tagFilters}>
            {categoriesList.map((tag) => (
              <button
                key={tag}
                className={`${styles.tagBtn}${activeTag === tag ? ` ${styles.tagBtnActive}` : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {latest.length === 0 ? (
          <div className={styles.empty}>
            {blogs.length === 0
              ? 'No blog posts published yet. Check back soon!'
              : 'No posts found matching your search. Try a different term or filter.'}
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
                  <Image
                    src={post.image || '/banner1.webp'}
                    alt={post.title}
                    width={400}
                    height={260}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 350px"
                  />
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
  );
}
