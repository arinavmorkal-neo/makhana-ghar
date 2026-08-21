import type { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import BlogClient, { BlogPostItem } from './BlogClient';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import { getImageUrlWithOverride } from '../../../lib/getImageUrl';
import styles from './Blog.module.css';

export const revalidate = 60; // ISR 60s

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('blog', {
    title: 'Makhana Industry Blog & Insights | Makhana Ghar',
    description:
      'Read expert articles on Makhana health benefits, wholesale export guides, grading standards, and fox nuts market trends from Makhana Ghar.',
    primaryKeywords: 'makhana blog, fox nuts health benefits, makhana wholesale guide, makhana export tips',
    secondaryKeywords: 'popped lotus seed nutrition, bihar makhana market, makhana industry news, roasted makhana recipes and facts',
    path: '/blog',
  });
}

async function getBlogs(): Promise<BlogPostItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'blogs',
      where: { status: { equals: 'published' } },
      sort: '-date',
      limit: 50,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: doc.id,
        slug: doc.slug,
        title: doc.title,
        date: doc.date
          ? new Date(doc.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
          : '',
        author: doc.author || 'Makhana Ghar',
        category: doc.category || 'Makhana',
        image: getImageUrlWithOverride(doc.imageUrl, doc.image, '/banner1.webp'),
        excerpt: doc.excerpt || '',
        featured: Boolean(doc.featured),
        readTime: doc.readTime || '5 min read',
      }));
    }
  } catch (err) {
    console.error('Failed to fetch blogs for blog page:', err);
  }
  return [];
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Blog', url: 'https://www.makhanaghar.in/blog' },
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Makhana Ghar Blog"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Our Blog</span>
          <h1 className={styles.heroHeading}>Blog & Insights</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Insights on premium Makhana sourcing, export tips, health benefits,
            and wholesale business strategies.
          </p>
        </div>

        <Image
          className={styles.grassEdge}
          src="/grassnew-white.webp"
          alt=""
          aria-hidden="true"
          width={1920}
          height={40}
          sizes="100vw"
        />
      </section>

      {/* ── BLOG CONTENT ── */}
      <BlogClient initialBlogs={blogs} />

      <Footer />
      <MobileNavBar />
    </main>
  );
}
