import type { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import GalleryClient, { GalleryItem } from './GalleryClient';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import styles from './Gallery.module.css';

export const revalidate = 60; // ISR 60s

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gallery', {
    title: 'Photo Gallery | Farm to Factory Tour – Makhana Ghar',
    description:
      'Explore photos of our Makhana ponds in Bihar, manual harvesting divers, sun-drying yards, sorting facilities, and premium packaging at Makhana Ghar.',
    primaryKeywords: 'makhana gallery, makhana farm photos, bihar makhana harvesting pictures, makhana factory images',
    secondaryKeywords: 'popped lotus seed processing photos, makhana processing unit bihar, katihar makhana farm pictures',
    path: '/gallery',
  });
}

const fallbackItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Premium Makhana Selection',
    category: 'products',
    featured: true,
    order: 0,
    image: { url: '/4+.webp', alt: 'Premium Makhana' },
  },
  {
    id: '2',
    title: 'Farm Fresh Harvest',
    category: 'farm',
    featured: false,
    order: 1,
    image: { url: '/new-section.webp', alt: 'Farm Harvest' },
  },
  {
    id: '3',
    title: 'Quality Packaging',
    category: 'packaging',
    featured: false,
    order: 2,
    image: { url: '/banner2.webp', alt: 'Packaging' },
  },
];

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'gallery',
      where: { status: { equals: 'published' } },
      sort: 'order',
      limit: 100,
      depth: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        category: doc.category || 'products',
        featured: doc.featured || false,
        order: doc.order || 0,
        image: {
          url: doc.imageUrl || doc.image?.url || doc.image?.imagekitUrl || '/4+.webp',
          alt: doc.image?.alt || doc.title,
          width: doc.image?.width,
          height: doc.image?.height,
        },
      }));
    }
  } catch (err) {
    console.error('Failed to fetch gallery items server-side:', err);
  }
  return fallbackItems;
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Gallery', url: 'https://www.makhanaghar.in/gallery' },
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
          alt="Makhana Ghar Gallery"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Visual Journey</span>
          <h1 className={styles.heroHeading}>Photo Gallery</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Explore our ponds, harvesting process, state-of-the-art grading
            facility, and premium Makhana products.
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

      {/* ── GALLERY CONTENT ── */}
      <GalleryClient initialItems={items} />

      <Footer />
      <MobileNavBar />
    </main>
  );
}
