// Seed homepage via Payload Local API (no auth needed)
// Run: npx tsx src/seed-local.ts

// Load .env.local FIRST before any imports
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
  console.log('✅ Loaded .env.local');
}

// Dynamic imports AFTER env is loaded
async function main() {
  console.log('🌱 Seeding Makhana Ghar CMS...\n');

  const { getPayload } = await import('payload');
  const config = (await import('./payload.config')).default;

  const payload = await getPayload({ config });

  // Check if homepage already exists
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    console.log('ℹ️  Homepage already exists. Deleting and recreating...');
    await payload.delete({
      collection: 'pages',
      id: existing.docs[0].id,
    });
  }

  const homepage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Homepage',
      slug: 'home',
      seo: {
        metaTitle: 'Makhana Ghar – Premium Wholesale Makhana Supply from Bihar',
        metaDescription:
          "India's trusted wholesale makhana supplier. Premium quality fox nuts sourced from Bihar — FSSAI certified, bulk delivery, competitive pricing.",
        primaryKeywords:
          'wholesale makhana, makhana supplier bihar, bulk makhana manufacturer, fox nuts exporter india',
        secondaryKeywords:
          'phool makhana wholesale price, raw makhana flakes supplier, organic lotus seeds bulk, buy makhana directly from farmers',
        metaKeywords:
          'makhana, fox nuts, wholesale makhana, makhana supplier, Bihar makhana, bulk makhana, organic makhana',
      },
      layout: [
        {
          blockType: 'hero',
          slides: [
            {
              tag: 'Superior Quality Makhana Wholesale Supply',
              heading: 'Premium Quality Makhana At Affordable Wholesale Prices',
              body: 'Trusted Supplier of High-Quality Makhana for Businesses, Retailers, and Wholesalers. Health-Conscious Businesses and Food Retailers Worldwide.',
              ctaText: 'Send Enquiry',
              ctaHref: '#contact',
            },
            {
              tag: 'Farm Fresh & Naturally Processed',
              heading: 'Bulk Makhana Supply Direct From Source',
              body: "From Bihar's finest farms to your doorstep. Consistent quality, competitive pricing, and reliable delivery.",
              ctaText: 'Get Quote',
              ctaHref: '#contact',
            },
          ],
        },
        {
          blockType: 'product-section',
          sectionTag: 'Our Products',
          sectionTitle: 'Premium Makhana Grades',
          sectionSubtitle: "Sourced directly from Bihar's finest farms — graded, sorted, and packed for quality.",
          products: [
            {
              name: 'Makhana 4+ Sutta', weight: '1 kg', price: '₹799', origin: 'Bihar, India',
              category: 'Premium Grade',
              description: '4-sutta grade makhana — compact, crunchy, and perfect for roasting or making namkeen snacks.',
              tags: [{ tag: '4+ Grade' }, { tag: 'Crunchy' }, { tag: 'Roast Ready' }],
              bg: 'linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)',
            },
            {
              name: 'Makhana 5+ Sutta', weight: '1 kg', price: '₹999', origin: 'Bihar, India',
              category: 'Export Grade',
              description: 'Medium-large 5-sutta makhana — fluffy, light, and ideal for both sweet & savory preparations.',
              tags: [{ tag: '5+ Grade' }, { tag: 'Fluffy' }, { tag: 'Versatile' }],
              bg: 'linear-gradient(160deg, #fff8e1 0%, #f9a825 100%)',
            },
            {
              name: 'Makhana 6+ Sutta', weight: '1 kg', price: '₹1,299', origin: 'Bihar, India',
              category: 'Supreme Grade',
              description: 'Largest 6-sutta premium makhana — the top grade for gifting, snacking, and gourmet recipes.',
              tags: [{ tag: '6+ Grade' }, { tag: 'Jumbo Size' }, { tag: 'Gift Pack' }],
              bg: 'linear-gradient(160deg, #fce4ec 0%, #c62828 100%)',
            },
            {
              name: 'Phool Makhana Lite', weight: '500g', price: '₹449', origin: 'Bihar, India',
              category: 'Healthy Snack',
              description: 'Lightly roasted plain makhana — zero oil, zero spice. A clean, guilt-free snacking option.',
              tags: [{ tag: 'Zero Oil' }, { tag: 'Low Calorie' }, { tag: 'Vegan' }],
              bg: 'linear-gradient(160deg, #e0f2f1 0%, #00695c 100%)',
            },
          ],
        },
        {
          blockType: 'why-choose',
          eyebrow: 'Why Choose Us',
          heading: 'The Makhana Ghar Difference',
          body: "We're not just suppliers — we're partners in quality. Every batch is hand-sorted, lab-tested, and delivered with care.",
          ctaText: 'Contact Us Today',
          ctaHref: '#contact',
          cards: [
            { title: 'Hand-Sorted Quality', description: 'Every single makhana seed is hand-sorted to ensure uniformity in size, color, and texture.' },
            { title: 'Farm-to-Fork Traceability', description: 'We trace every batch from the pond to your doorstep — full transparency.' },
            { title: 'Competitive Bulk Pricing', description: 'Get the best rates in the market with our direct-from-source wholesale pricing.' },
          ],
        },
        {
          blockType: 'product-slider',
          headerLabel: 'Featured Products',
          heading: 'Our Best Sellers',
          description: 'Explore our most popular makhana products loved by businesses across India.',
          products: [
            { name: 'Makhana 4+ Sutta', category: 'Premium Grade', badge: 'Best Seller' },
            { name: 'Makhana 5+ Sutta', category: 'Export Grade', badge: 'Popular' },
            { name: 'Makhana 6+ Sutta', category: 'Supreme Grade', badge: 'Premium' },
            { name: 'Phool Makhana Lite', category: 'Healthy Snack', badge: 'New' },
          ],
        },
        {
          blockType: 'stats',
          stats: [
            { icon: 'globe', value: 15, suffix: '+', label: 'Countries Exported' },
            { icon: 'map', value: 200, suffix: '+', label: 'Cities Covered' },
            { icon: 'dashboard', value: 10, suffix: '+', label: 'Years Experience' },
            { icon: 'smile', value: 500, suffix: '+', label: 'Happy Clients' },
          ],
        },
        {
          blockType: 'farm-section',
          eyebrow: 'From Our Farms',
          heading: "Straight From Bihar's Finest Ponds",
          description: 'Our makhana is harvested from natural ponds in Bihar, hand-popped using traditional methods, and sun-dried to preserve its authentic crunch and nutrition.',
          ctaText: 'Learn More About Our Process',
          ctaHref: '#contact',
        },
        {
          blockType: 'third-section',
          tagline: 'We are your trusted partner for bulk natural produce.',
          headline: 'Premium quality',
          headlineAccent: 'Makhana',
          bodyText1: 'At our farms in Bihar, every makhana seed is carefully harvested from natural ponds, hand-popped, and sun-dried to preserve its authentic crunch, rich nutrition, and earthy flavor — just like nature intended.',
          bodyText2: 'From 4+ Sutta to premium 6+ Sutta grades, we supply every variant for retail brands, FMCG companies, and health food businesses — with consistent quality, competitive pricing, and on-time delivery.',
          ctaText: 'Explore Our Products',
          ctaHref: '#products',
          features: [
            { title: '100% Natural', sub: 'No chemical processing', iconType: 'natural' },
            { title: 'FSSAI Certified', sub: 'Export-grade quality', iconType: 'certified' },
            { title: 'Bulk Delivery', sub: 'Pan-India & worldwide', iconType: 'bulk' },
            { title: 'Wholesale Pricing', sub: 'Best rates guaranteed', iconType: 'pricing' },
          ],
        },
      ],
    } as any,
  });

  console.log(`✅ Homepage created! (ID: ${homepage.id})`);
  console.log(`   → Admin: http://localhost:3000/admin/collections/pages/${homepage.id}`);
  console.log('\n🎉 Seed complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err.message || err);
  process.exit(1);
});
