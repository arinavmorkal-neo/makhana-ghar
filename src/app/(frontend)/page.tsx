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

// Force dynamic rendering so Payload CMS data is always fresh on Vercel.
// Without this, the page is statically generated at build time and never
// re-fetches data from MongoDB when you update content in the admin panel.
export const dynamic = 'force-dynamic';

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
  { name: 'Home', url: 'https://www.makhanaghar.com' },
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
