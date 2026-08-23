import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductSection from '../components/ProductSection';
import StatsSection from '../components/StatsSection';
import FarmSection from '../components/FarmSection';
import ThirdSection from '../components/ThirdSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';
import MobileNavBar from '../components/MobileNavBar';
import { breadcrumbJsonLd } from '../lib/jsonLd';

import type { Metadata } from 'next';
import { getPageMetadata } from '../../lib/seo';

// Revalidate every 60 seconds (ISR) so the page is served from cache
// and CMS updates appear within a minute, without cold-start delays.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('home', {
    title: 'Makhana Ghar | Premium Wholesale Makhana Supplier from Bihar',
    description:
      'Makhana Ghar is a premium Makhana manufacturer, wholesaler and exporter from Bihar, supplying high-quality Makhana to domestic and international markets.',
    primaryKeywords: 'makhana supplier, wholesale makhana, bulk makhana bihar, makhana manufacturer',
    secondaryKeywords: 'fox nuts exporter india, phool makhana wholesale price, organic popped lotus seed, premium makhana flakes',
    path: '/',
  });
}

// Map block slugs to component renderers
function renderBlock(block: any, index: number) {
  switch (block.blockType) {
    case 'hero':
      return <Hero key={index} slides={block.slides} />;
    case 'product-section':
      return <ProductSection key={index} data={block} />;
    case 'why-choose':
      return <WhyChooseSection key={index} data={block} />;
    case 'product-slider':
      return <ProductSlider key={index} data={block} />;
    case 'stats':
      return <StatsSection key={index} stats={block.stats} />;
    case 'farm-section':
      return <FarmSection key={index} data={block} />;
    case 'third-section':
      return <ThirdSection key={index} data={block} />;
    default:
      return null;
  }
}

const homeBreadcrumb = breadcrumbJsonLd([
  { name: 'Home', url: 'https://www.makhanaghar.in' },
]);

export default async function HomePage() {
  let pageData: any = null;

  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
      depth: 2,
    });
    if (result.docs.length > 0) {
      pageData = result.docs[0];
    }

    // Enrich product-section blocks with real product slugs
    if (pageData?.layout) {
      const productsResult = await payload.find({
        collection: 'products',
        where: { status: { equals: 'published' } },
        limit: 50,
        depth: 0,
      });
      const dbProducts = productsResult.docs as any[];

      for (const block of pageData.layout) {
        if (block.blockType === 'product-section' && block.products) {
          for (const p of block.products) {
            if (p.slug) continue; // Already has a slug set in CMS
            // Match by checking if product name words appear in the DB product name
            const pName = (p.name || '').toLowerCase();
            const match = dbProducts.find((db) => {
              const dbName = (db.name || '').toLowerCase();
              // Extract the grade number (e.g. "4", "5", "6") and check for match
              const gradeMatch = pName.match(/(\d)\+?\s*sut/);
              const dbGradeMatch = dbName.match(/(\d)\+?\s*sut/);
              if (gradeMatch && dbGradeMatch) {
                return gradeMatch[1] === dbGradeMatch[1] &&
                  pName.includes(gradeMatch[1]) &&
                  dbName.includes(dbGradeMatch[1]);
              }
              return dbName.includes(pName) || pName.includes(dbName);
            });
            if (match) {
              p.slug = match.slug;
            }
          }
        }
      }
    }
  } catch (e) {
    // Database might not be ready yet — fall back to static content
    console.warn('Could not fetch homepage from Payload CMS:', e);
  }

  // If we have CMS layout blocks, render them dynamically
  if (pageData?.layout && pageData.layout.length > 0) {
    return (
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
        />
        <Header />
        {pageData.layout.map((block: any, i: number) => renderBlock(block, i))}
        <Footer />
        <MobileNavBar />
      </main>
    );
  }

  // Fallback: render the original static homepage
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumb) }}
      />
      <Header />
      <Hero />
      <ProductSection />
      <WhyChooseSection />
      <ProductSlider />
      <StatsSection />
      <FarmSection />
      <ThirdSection />
      <Footer />
      <MobileNavBar />
    </main>
  );
}
