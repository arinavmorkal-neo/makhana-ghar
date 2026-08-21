import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import MobileNavBar from '../../../../components/MobileNavBar';
import ProductDetailClient, { ProductData } from './ProductDetailClient';
import { getProductMetadata } from '../../../../../lib/seo';
import { productJsonLd, breadcrumbJsonLd } from '../../../../lib/jsonLd';
import { getImageUrlWithOverride } from '../../../../../lib/getImageUrl';
import styles from './Product.module.css';

export const revalidate = 60; // Revalidate every 60s for ISR

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getProductMetadata(slug);
}

async function getProduct(slug: string): Promise<ProductData | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const doc = result.docs[0] as any;

      const images: string[] = [];
      const mainImg = getImageUrlWithOverride(doc.mainImageUrl, doc.mainImage, '');
      if (mainImg) images.push(mainImg);

      if (doc.galleryImages && doc.galleryImages.length > 0) {
        for (const gi of doc.galleryImages) {
          const url = getImageUrlWithOverride(gi.imageUrl, gi.image, '');
          if (url) images.push(url);
        }
      }

      if (images.length === 0) images.push('/4+.webp');

      return {
        name: doc.name || '',
        tagline: doc.tagline || `Why Choose ${doc.name}?`,
        description: doc.description || '',
        aboutUs: doc.aboutUs || '',
        specs: doc.specs || [],
        images,
        rating: doc.rating || 4.8,
        reviews: doc.reviews || 0,
        isOrganic: doc.isOrganic !== false,
      };
    }
  } catch (err) {
    console.error('Failed to fetch product server-side:', err);
  }
  return null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main>
        <Header />
        <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'var(--font-poppins), sans-serif' }}>
          <h1>Product Not Found</h1>
          <p style={{ color: '#888', marginTop: 12 }}>The product you are looking for does not exist.</p>
          <Link href="/categories" style={{ color: '#2e7d32', marginTop: 20, display: 'inline-block' }}>
            ← Back to All Products
          </Link>
        </div>
        <Footer />
        <MobileNavBar />
      </main>
    );
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Products', url: 'https://www.makhanaghar.in/categories' },
    { name: product.name, url: `https://www.makhanaghar.in/product/${slug}` },
  ]);

  const structuredProduct = productJsonLd({
    name: product.name,
    slug,
    description: product.description,
    images: product.images,
    rating: product.rating,
    reviews: product.reviews,
  });

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredProduct) }}
      />

      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Makhana Ghar Products"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Our Products</span>
          <h1 className={styles.heroHeading}>{product.name}</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            {product.tagline || 'Premium quality Makhana sourced directly from the farms of Bihar.'}
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

      {/* ── INTERACTIVE PRODUCT DETAIL ── */}
      <ProductDetailClient product={product} />

      <Footer />
      <MobileNavBar />
    </main>
  );
}
