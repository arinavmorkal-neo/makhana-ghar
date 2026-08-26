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
    path: '/gallery',
    noIndex: true,
  });
}

const fallbackItems: GalleryItem[] = [
  {
    id: '1',
    title: '6+ Sutta Jumbo Makhana',
    category: 'products',
    featured: true,
    order: 1,
    image: { url: '/4+.webp', alt: '6+ Sutta Jumbo Makhana' },
  },
  {
    id: '2',
    title: '5+ Sutta Premium Makhana',
    category: 'products',
    featured: false,
    order: 2,
    image: { url: '/5+.webp', alt: '5+ Sutta Premium Makhana' },
  },
  {
    id: '3',
    title: '4+ Sutta Raw Makhana',
    category: 'products',
    featured: false,
    order: 3,
    image: { url: '/4+.webp', alt: '4+ Sutta Raw Makhana' },
  },
  {
    id: '4',
    title: 'Flavored Roasted Makhana Series',
    category: 'products',
    featured: false,
    order: 4,
    image: { url: '/new-section.webp', alt: 'Flavored Roasted Makhana' },
  },
  {
    id: '5',
    title: 'Freshwater Pond Cultivation in Katihar',
    category: 'farm',
    featured: true,
    order: 5,
    image: { url: '/process-step-1.png', alt: 'Freshwater Pond Cultivation' },
  },
  {
    id: '6',
    title: 'Traditional Skilled Divers Harvesting Seeds',
    category: 'farm',
    featured: false,
    order: 6,
    image: { url: '/process-step-2.png', alt: 'Traditional Skilled Divers Harvesting Seeds' },
  },
  {
    id: '7',
    title: 'Natural Sun-Drying & Moisture Conditioning',
    category: 'farm',
    featured: false,
    order: 7,
    image: { url: '/process-step-3.png', alt: 'Natural Sun-Drying Yards' },
  },
  {
    id: '8',
    title: 'Our Bihar Farmer Community Partners',
    category: 'farm',
    featured: false,
    order: 8,
    image: { url: '/farmer-popup.webp', alt: 'Bihar Farmer Community Partners' },
  },
  {
    id: '9',
    title: 'Artisanal Fire Roasting & Hand Popping',
    category: 'processing',
    featured: true,
    order: 9,
    image: { url: '/process-step-4.png', alt: 'Artisanal Fire Roasting & Popping' },
  },
  {
    id: '10',
    title: 'Mechanical Sieve Size Grading (4+, 5+, 6+ Sutta)',
    category: 'processing',
    featured: false,
    order: 10,
    image: { url: '/process-step-5.png', alt: 'Size Grading' },
  },
  {
    id: '11',
    title: 'Quality Testing & Moisture Inspection (<12%)',
    category: 'processing',
    featured: false,
    order: 11,
    image: { url: '/process-step-6.png', alt: 'Moisture Inspection' },
  },
  {
    id: '12',
    title: 'Nitrogen-Flushed Airtight Packing',
    category: 'packaging',
    featured: true,
    order: 12,
    image: { url: '/process-step-7.png', alt: 'Nitrogen-Flushed Packaging' },
  },
  {
    id: '13',
    title: 'Bulk Freight & Global Container Logistics',
    category: 'packaging',
    featured: false,
    order: 13,
    image: { url: '/process-step-8.png', alt: 'Bulk Freight & Container Logistics' },
  },
  {
    id: '14',
    title: 'Export-Grade Pallets & Retail Cartons',
    category: 'packaging',
    featured: false,
    order: 14,
    image: { url: '/banner2.webp', alt: 'Export-Grade Pallets' },
  },
  {
    id: '15',
    title: 'Leadership & Direct Farm Sourcing Vision',
    category: 'team',
    featured: false,
    order: 15,
    image: { url: '/image/arinav.png', alt: 'Arinav Morkal - Founder & CEO' },
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
