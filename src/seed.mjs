/**
 * Seed the homepage content into Payload CMS.
 * Run: node src/seed.mjs
 * 
 * Make sure the dev server (npm run dev) is running first.
 */

const API = process.env.SEED_API_URL || process.argv[2] || 'https://www.makhanaghar.in/api';

// ── First, ensure we have a user. Create one if needed. ──
async function ensureUser() {
  const res = await fetch(`${API}/users/first-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@makhanaghar.com',
      password: 'Admin@123',
    }),
  });
  if (res.ok) {
    console.log('✅ Created first admin user: admin@makhanaghar.com / Admin@123');
  } else {
    console.log('ℹ️  Admin user already exists (or first-register disabled).');
  }
}

// ── Login to get a token ──
async function login() {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@makhanaghar.com',
      password: 'Admin@123',
    }),
  });
  if (!res.ok) {
    console.error('❌ Login failed. Please create a user first via /admin/create-first-user');
    process.exit(1);
  }
  const data = await res.json();
  console.log('✅ Logged in');
  return data.token;
}

// ── Seed homepage ──
async function seedHomepage(token) {
  // Check if homepage already exists
  const check = await fetch(`${API}/pages?where[slug][equals]=home`, {
    headers: { Authorization: `JWT ${token}` },
  });
  const existing = await check.json();
  if (existing.docs && existing.docs.length > 0) {
    console.log('ℹ️  Homepage already exists. Skipping seed.');
    return;
  }

  const homepage = {
    title: 'Homepage',
    slug: 'home',
    seo: {
      metaTitle: 'Makhana Ghar – Premium Wholesale Makhana Supply from Bihar',
      metaDescription:
        'India\'s trusted wholesale makhana supplier. Premium quality fox nuts sourced from Bihar — FSSAI certified, bulk delivery, competitive pricing.',
      metaKeywords:
        'makhana, fox nuts, wholesale makhana, makhana supplier, Bihar makhana, bulk makhana, organic makhana',
    },
    layout: [
      // ─── 1. HERO SECTION ───
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
      // ─── 2. PRODUCT SECTION ───
      {
        blockType: 'product-section',
        sectionTag: 'Our Products',
        sectionTitle: 'Premium Makhana Grades',
        sectionSubtitle:
          "Sourced directly from Bihar's finest farms — graded, sorted, and packed for quality.",
        products: [
          {
            name: 'Makhana 4+ Sutta',
            weight: '1 kg',
            price: '₹799',
            origin: 'Bihar, India',
            category: 'Premium Grade',
            description:
              '4-sutta grade makhana — compact, crunchy, and perfect for roasting or making namkeen snacks.',
            tags: [{ tag: '4+ Grade' }, { tag: 'Crunchy' }, { tag: 'Roast Ready' }],
            bg: 'linear-gradient(160deg, #e8f5e9 0%, #2e7d32 100%)',
          },
          {
            name: 'Makhana 5+ Sutta',
            weight: '1 kg',
            price: '₹999',
            origin: 'Bihar, India',
            category: 'Export Grade',
            description:
              'Medium-large 5-sutta makhana — fluffy, light, and ideal for both sweet & savory preparations.',
            tags: [{ tag: '5+ Grade' }, { tag: 'Fluffy' }, { tag: 'Versatile' }],
            bg: 'linear-gradient(160deg, #fff8e1 0%, #f9a825 100%)',
          },
          {
            name: 'Makhana 6+ Sutta',
            weight: '1 kg',
            price: '₹1,299',
            origin: 'Bihar, India',
            category: 'Supreme Grade',
            description:
              'Largest 6-sutta premium makhana — the top grade for gifting, snacking, and gourmet recipes.',
            tags: [{ tag: '6+ Grade' }, { tag: 'Jumbo Size' }, { tag: 'Gift Pack' }],
            bg: 'linear-gradient(160deg, #fce4ec 0%, #c62828 100%)',
          },
          {
            name: 'Phool Makhana Lite',
            weight: '500g',
            price: '₹449',
            origin: 'Bihar, India',
            category: 'Healthy Snack',
            description:
              'Lightly roasted plain makhana — zero oil, zero spice. A clean, guilt-free snacking option.',
            tags: [{ tag: 'Zero Oil' }, { tag: 'Low Calorie' }, { tag: 'Vegan' }],
            bg: 'linear-gradient(160deg, #e0f2f1 0%, #00695c 100%)',
          },
        ],
      },
      // ─── 3. WHY CHOOSE SECTION ───
      {
        blockType: 'why-choose',
        eyebrow: 'Why Choose Us',
        heading: 'The Makhana Ghar Difference',
        body: "We're not just suppliers — we're partners in quality. Every batch is hand-sorted, lab-tested, and delivered with care.",
        ctaText: 'Contact Us Today',
        ctaHref: '#contact',
        cards: [
          {
            title: 'Hand-Sorted Quality',
            description:
              'Every single makhana seed is hand-sorted to ensure uniformity in size, color, and texture.',
          },
          {
            title: 'Farm-to-Fork Traceability',
            description:
              'We trace every batch from the pond to your doorstep — full transparency.',
          },
          {
            title: 'Competitive Bulk Pricing',
            description:
              'Get the best rates in the market with our direct-from-source wholesale pricing.',
          },
        ],
      },
      // ─── 4. PRODUCT SLIDER ───
      {
        blockType: 'product-slider',
        headerLabel: 'Featured Products',
        heading: 'Our Best Sellers',
        description:
          'Explore our most popular makhana products loved by businesses across India.',
        products: [
          { name: 'Makhana 4+ Sutta', category: 'Premium Grade', badge: 'Best Seller' },
          { name: 'Makhana 5+ Sutta', category: 'Export Grade', badge: 'Popular' },
          { name: 'Makhana 6+ Sutta', category: 'Supreme Grade', badge: 'Premium' },
          { name: 'Phool Makhana Lite', category: 'Healthy Snack', badge: 'New' },
        ],
      },
      // ─── 5. STATS SECTION ───
      {
        blockType: 'stats',
        stats: [
          { icon: 'globe', value: 15, suffix: '+', label: 'Countries Exported' },
          { icon: 'map', value: 200, suffix: '+', label: 'Cities Covered' },
          { icon: 'dashboard', value: 10, suffix: '+', label: 'Years Experience' },
          { icon: 'smile', value: 500, suffix: '+', label: 'Happy Clients' },
        ],
      },
      // ─── 6. FARM SECTION ───
      {
        blockType: 'farm-section',
        eyebrow: 'From Our Farms',
        heading: 'Straight From Bihar\'s Finest Ponds',
        description:
          'Our makhana is harvested from natural ponds in Bihar, hand-popped using traditional methods, and sun-dried to preserve its authentic crunch and nutrition.',
        ctaText: 'Learn More About Our Process',
        ctaHref: '#contact',
      },
      // ─── 7. THIRD SECTION (Contact & Features) ───
      {
        blockType: 'third-section',
        tagline: 'We are your trusted partner for bulk natural produce.',
        headline: 'Premium quality',
        headlineAccent: 'Makhana',
        bodyText1:
          "At our farms in Bihar, every makhana seed is carefully harvested from natural ponds, hand-popped, and sun-dried to preserve its authentic crunch, rich nutrition, and earthy flavor — just like nature intended.",
        bodyText2:
          'From 4+ Sutta to premium 6+ Sutta grades, we supply every variant for retail brands, FMCG companies, and health food businesses — with consistent quality, competitive pricing, and on-time delivery.',
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
  };

  const res = await fetch(`${API}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(homepage),
  });

  if (res.ok) {
    const created = await res.json();
    console.log(`✅ Homepage created successfully! (ID: ${created.doc.id})`);
    console.log('   → View in admin: http://localhost:3000/admin/collections/pages/' + created.doc.id);
  } else {
    const err = await res.json().catch(() => ({}));
    console.error('❌ Failed to create homepage:', res.status, JSON.stringify(err, null, 2));
  }
}

// ── Main ──
async function main() {
  console.log('🌱 Seeding Makhana Ghar CMS...\n');
  await ensureUser();
  const token = await login();
  await seedHomepage(token);
  console.log('\n🎉 Seed complete! Visit http://localhost:3000/admin to manage content.');
}

main().catch(console.error);
