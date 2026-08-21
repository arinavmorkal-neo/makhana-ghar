import type { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import CategoriesClient, { ProductItem } from './CategoriesClient';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import { getImageUrlWithOverride } from '../../../lib/getImageUrl';
import styles from './Categories.module.css';

export const revalidate = 60; // ISR 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('categories', {
    title: 'Makhana Products & Grades | Wholesale Supply – Makhana Ghar',
    description:
      'Explore all premium grades of Makhana (Fox Nuts) from Bihar — 4+ Suta, 5+ Suta, and 6+ Suta Jumbo. Wholesale prices, export certified, bulk packaging available.',
    primaryKeywords: 'makhana products, makhana grades, 4 suta makhana, 5 suta makhana, 6 suta makhana, wholesale makhana bihar',
    secondaryKeywords: 'bulk fox nuts catalog, makhana price list wholesale, phool makhana varieties, raw makhana flakes supplier, organic makhana export',
    path: '/categories',
  });
}

async function getProducts(): Promise<ProductItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'products',
      where: { status: { equals: 'published' } },
      sort: 'name',
      limit: 100,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        slug: doc.slug || '',
        name: doc.name || '',
        category: (doc.grade || 'all').toLowerCase().replace(/\s+/g, '-'),
        grade: doc.grade || '',
        description: doc.description || '',
        image: getImageUrlWithOverride(doc.mainImageUrl, doc.mainImage, '/4+.webp'),
        rating: doc.rating || 4.8,
        reviews: doc.reviews || 0,
        tags: doc.isOrganic ? ['Organic'] : [],
      }));
    }
  } catch (err) {
    console.error('Failed to fetch products for categories page:', err);
  }
  return [];
}

export default async function CategoriesPage() {
  const products = await getProducts();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Products', url: 'https://www.makhanaghar.in/categories' },
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
          alt="Makhana Ghar Categories"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Explore</span>
          <h1 className={styles.heroHeading}>Our Products</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Browse our curated collection of premium Makhana — sourced directly
            from the farms of Bihar, hand-sorted for quality, and packed with freshness.
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

      {/* ── CATEGORIES CONTENT ── */}
      <CategoriesClient initialProducts={products} />

      <Footer />
      <MobileNavBar />
    </main>
  );
}
