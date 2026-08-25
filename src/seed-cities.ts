// Seed sample city pages for Makhana Ghar
// Run: npx tsx src/seed-cities.ts

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

const sampleCities = [
  {
    cityName: 'Pune',
    state: 'Maharashtra',
    slug: 'pune',
    status: 'published',
    order: 1,
    heroTag: 'Direct Farm Sourcing from Bihar to Pune',
    heroHeading: 'Makhana Wholesale Supplier in Pune',
    heroDescription: 'Get export-grade, machine-graded, and hand-sorted Phool Makhana delivered across Pune & PCMC at direct Bihar farm-gate wholesale prices.',
    ctaText: 'Get Pune Wholesale Rates',
    ctaPhone: '+91 8002661555',
    introTitle: 'Direct Origin-Sourced Makhana Supply Across Pune & PCMC',
    introDescription: 'Makhana Ghar supplies premium quality Phool Makhana across Pune, catering to grocery retail chains, dry fruit wholesalers, supermarket distributors, and food processing brands. Sourced from the pristine harvest wetlands of Katihar, Bihar, our fox nuts guarantee superior puffiness, consistent sizing, and uncompromised crispness.',
    deliveryAreasTitle: 'Key Delivery Zones in Pune & PCMC',
    deliveryAreas: [
      { name: 'Market Yard (Gultekdi APMC)', badge: 'Daily Wholesale Dispatch' },
      { name: 'Hadapsar & Magarpatta', badge: 'Fast Delivery' },
      { name: 'Pimpri-Chinchwad (PCMC)', badge: 'Industrial Supply' },
      { name: 'Kothrud & Deccan', badge: 'Retail Hubs' },
      { name: 'Viman Nagar & Kharadi', badge: 'Commercial Centers' },
      { name: 'Chakan & Bhosari MIDC', badge: 'Bulk Pallet Loads' },
    ],
    aboutTitle: 'Why Pune Food Businesses Choose Makhana Ghar',
    aboutDescription: 'As a direct Bihar-based manufacturer, we eliminate unnecessary middlemen layers, ensuring that dry fruit traders and FMCG companies in Pune receive true harvest freshness and competitive per-kg margins.',
    whyChooseTitle: 'The Makhana Ghar Edge for Pune Traders',
    whyChooseCards: [
      { title: 'Direct Farm-Gate Rates', description: 'Zero middlemen markups — direct supply from Katihar processing units to Pune.', icon: 'pricing' },
      { title: 'Moisture Below 12% & FSSAI Certified', description: 'Lab-tested moisture levels to guarantee long shelf-life and maximum crunch in Pune weather.', icon: 'quality' },
      { title: 'Prompt Logistics to Pune Hubs', description: 'Regular freight connections ensuring dispatch within 24-48 hours.', icon: 'shipping' },
      { title: 'Private Label & Custom Packs', description: 'Retail pouches (50g, 100g, 250g) with your brand logo for supermarkets in Pune.', icon: 'packaging' },
      { title: 'Export-Grade Sizing', description: 'Consistent sorting in 4+, 5+, and 6+ Sutta grades without hollow or black defect kernels.', icon: 'global' },
      { title: 'Flexible Wholesale MOQs', description: 'Orders starting from 50 kg trial batches to multi-ton container consignments.', icon: 'support' },
    ],
    faqsTitle: 'Frequently Asked Questions – Pune Supply',
    faqs: [
      { question: 'What is the MOQ for delivery in Pune?', answer: 'Our minimum wholesale order for Pune is 50 kg. For distributors and retail chains, we also supply 500 kg to 5+ Ton commercial consignments.' },
      { question: 'How long does delivery take to Market Yard or PCMC?', answer: 'Standard shipments from our processing plant arrive in Pune within 3 to 5 working days via reliable express road transport.' },
      { question: 'Can I get sample packs before placing a bulk order in Pune?', answer: 'Yes, sample boxes containing all grades (4+, 5+, 6+ Sutta) can be couriered to your Pune address upon request.' },
      { question: 'Do you offer private labeling for retail snack brands in Pune?', answer: 'Yes, we provide full private labeling, packaging design, and nitrogen-flushed pouch packing for your brand.' },
    ],
    testimonialsTitle: 'Client Feedback from Pune & Maharashtra',
    testimonials: [
      { name: 'Rahul Patil', role: 'Dry Fruits Trader, Market Yard Pune', rating: 5, review: 'We have been ordering 5+ Sutta Makhana from Makhana Ghar for our wholesale shop in Market Yard. Clean sorting, consistent size, and great customer service.' },
      { name: 'Aniket Shinde', role: 'Supermarket Chain Buyer, Kothrud', rating: 5, review: 'Best farm-gate pricing in Maharashtra. Their moisture-proof packing keeps the product crisp even during monsoons.' },
    ],
    seo: {
      metaTitle: 'Makhana Wholesale Supplier in Pune | Makhana Ghar',
      metaDescription: 'Buy export-grade Makhana (Fox Nuts) at wholesale rates in Pune. 100% natural, direct farm sourcing from Bihar, FSSAI certified with fast delivery across Pune.',
      focusKeyword: 'makhana wholesale supplier in pune',
      secondaryKeywords: 'phool makhana wholesale pune, bulk fox nuts pune market yard, makhana manufacturer in pune, buy makhana in pune',
      robotsIndex: true,
      robotsFollow: true,
    },
  },
  {
    cityName: 'Mumbai',
    state: 'Maharashtra',
    slug: 'mumbai',
    status: 'published',
    order: 2,
    heroTag: 'Direct Farm Sourcing to Mumbai & Navi Mumbai',
    heroHeading: 'Makhana Wholesale Supplier in Mumbai',
    heroDescription: 'Supplying premium export-grade Makhana (Fox Nuts) to wholesale traders, dry fruit markets, and FMCG brands across Mumbai & Navi Mumbai.',
    ctaText: 'Get Mumbai Wholesale Rates',
    ctaPhone: '+91 8002661555',
    introTitle: 'Premium Fox Nuts Distribution Across Mumbai Metropolitan Region',
    introDescription: 'Makhana Ghar is a trusted supplier of authentic Bihar Makhana across Mumbai, Vashi APMC, and Thane. We supply export-grade raw Makhana puffs to major food brands, dry fruit exporters, and modern retail chains across Mumbai.',
    deliveryAreasTitle: 'Key Supply Hubs in Mumbai & MMR',
    deliveryAreas: [
      { name: 'Vashi APMC Market (Navi Mumbai)', badge: 'Major Wholesale Mandi' },
      { name: 'Masjid Bunder & Crawford Market', badge: 'Dry Fruit Hub' },
      { name: 'Andheri & Goregaon', badge: 'Commercial Centers' },
      { name: 'Bandra & South Mumbai', badge: 'Premium Retail' },
      { name: 'Thane & Bhiwandi Warehousing Hub', badge: 'Bulk Storage & Pallets' },
    ],
    aboutTitle: 'Why Mumbai Importers & Wholesalers Partner With Us',
    aboutDescription: 'Direct farm links in Bihar and strict quality control ensure that our Mumbai clients get the crispest, largest, and cleanest Makhana at unbeatable wholesale prices.',
    whyChooseTitle: 'Why Choose Makhana Ghar in Mumbai',
    whyChooseCards: [
      { title: 'Direct Farm Pricing', description: 'Zero middlemen markups — direct supply from Katihar, Bihar.', icon: 'pricing' },
      { title: 'FSSAI & Export Certified', description: 'Export-grade compliance with complete quality documentation for Mumbai traders.', icon: 'quality' },
      { title: 'Daily Freight to MMR', description: 'Fast transit and daily cargo handling to Vashi APMC and Bhiwandi warehouses.', icon: 'shipping' },
      { title: 'Private Labeling Solutions', description: 'Custom printed retail pouches and gift boxes for Mumbai supermarkets.', icon: 'packaging' },
      { title: 'Full Grade Range', description: 'Available in 4+, 5+, and 6+ Jumbo Sutta sizes.', icon: 'global' },
      { title: 'Reliable Year-Round Supply', description: 'Guaranteed supply even during peak festive and fasting seasons.', icon: 'support' },
    ],
    faqsTitle: 'Frequently Asked Questions – Mumbai Supply',
    faqs: [
      { question: 'Do you deliver to Vashi APMC and Bhiwandi warehouses?', answer: 'Yes, we supply partial and full truckload shipments directly to Vashi APMC and Bhiwandi logistics hubs.' },
      { question: 'What is the shelf life of Makhana in coastal Mumbai humidity?', answer: 'Our products are packed with moisture below 12% in food-grade sealed bags, maintaining 9-12 months freshness in humid climates.' },
      { question: 'Can you supply export containers from Mumbai ports (JNPT)?', answer: 'Yes, we handle complete export shipments with phytosanitary certificates, customized container packing, and port delivery to JNPT/Nhava Sheva.' },
    ],
    testimonialsTitle: 'What Mumbai Buyers Say',
    testimonials: [
      { name: 'Kishore Shah', role: 'Wholesale Merchant, Masjid Bunder', rating: 5, review: 'Makhana Ghar has been supplying our wholesale store in South Mumbai for 2 years. Top quality 6+ Sutta with genuine farm pricing.' },
      { name: 'Rajesh Mehta', role: 'FMCG Packager, Vashi APMC', rating: 5, review: 'Prompt logistics to Navi Mumbai, no moisture damage, and clean handpicked flakes. Highly recommend.' },
    ],
    seo: {
      metaTitle: 'Makhana Wholesale Supplier in Mumbai | Makhana Ghar',
      metaDescription: 'Leading Makhana wholesale supplier in Mumbai and Navi Mumbai. Direct farm sourcing from Bihar, FSSAI certified 4+, 5+, 6+ Sutta grades at competitive wholesale rates.',
      focusKeyword: 'makhana wholesale supplier in mumbai',
      secondaryKeywords: 'phool makhana wholesale vashi apmc, bulk fox nuts mumbai, makhana manufacturer mumbai, buy makhana in mumbai',
      robotsIndex: true,
      robotsFollow: true,
    },
  },
  {
    cityName: 'Delhi',
    state: 'Delhi NCR',
    slug: 'delhi',
    status: 'published',
    order: 3,
    heroTag: 'Direct Bihar Farm Sourcing to Delhi NCR',
    heroHeading: 'Makhana Wholesale Supplier in Delhi NCR',
    heroDescription: 'Direct farm-fresh Phool Makhana supply across Khari Baoli, Okhla, Azadpur, Noida & Gurgaon at unmatchable wholesale rates.',
    ctaText: 'Get Delhi Wholesale Rates',
    ctaPhone: '+91 8002661555',
    introTitle: 'Leading Makhana Wholesaler & Bulk Exporter Serving Delhi NCR',
    introDescription: 'Makhana Ghar brings Bihar’s finest hand-sorted and machine-graded Makhana to Delhi NCR. From the bustling lanes of Khari Baoli to modern FMCG snack brands in Noida and Gurgaon, we provide dependable bulk deliveries with strict moisture and size standards.',
    deliveryAreasTitle: 'Key Supply Locations in Delhi NCR',
    deliveryAreas: [
      { name: 'Khari Baoli (Asia’s Largest Spice Market)', badge: 'Daily Wholesale Supply' },
      { name: 'Azadpur Mandi & Okhla Industrial Area', badge: 'Bulk Logistics' },
      { name: 'Noida & Greater Noida', badge: 'FMCG Manufacturers' },
      { name: 'Gurgaon (Gurugram) Corporate Hub', badge: 'Retail & Supermarket Chains' },
      { name: 'Kundli & Ghaziabad Warehousing Zones', badge: 'Pallet Delivery' },
    ],
    aboutTitle: 'Why Delhi NCR Wholesalers Trust Makhana Ghar',
    aboutDescription: 'Direct origin processing in Katihar, Bihar ensures that our Delhi NCR buyers bypass middle-tier trading commissions and receive export-grade products with guaranteed crunch.',
    whyChooseTitle: 'Why Choose Makhana Ghar in Delhi',
    whyChooseCards: [
      { title: 'Best Farm-Gate Rates', description: 'Direct Bihar supply without Khari Baoli broker markups.', icon: 'pricing' },
      { title: '100% Purity & FSSAI Certified', description: 'Unadulterated, chemical-free processing with low moisture levels.', icon: 'quality' },
      { title: 'Fast Road Logistics to NCR', description: 'Express freight reaching Delhi warehouses in 48-72 hours.', icon: 'shipping' },
      { title: 'Custom OEM & Branding', description: 'Retail-ready pouches customized for Delhi FMCG and dry fruit brands.', icon: 'packaging' },
      { title: 'Complete Grade Portfolio', description: '4+ Sutta, 5+ Sutta, 6+ Jumbo, and custom mixes.', icon: 'global' },
      { title: 'Year-Round Price Stability', description: 'Direct farm contracts protect you against sudden market price spikes.', icon: 'support' },
    ],
    faqsTitle: 'Frequently Asked Questions – Delhi NCR Supply',
    faqs: [
      { question: 'How quickly can Makhana Ghar deliver to Khari Baoli or Okhla?', answer: 'We maintain regular freight trucks from Bihar to Delhi NCR, with dispatches arriving in 2-3 business days.' },
      { question: 'Do you offer bulk trial orders for Delhi buyers?', answer: 'Yes! You can start with a 50 kg trial order to inspect sizing, puffiness, and moisture before placing larger truckloads.' },
      { question: 'Can you provide private label pouches for our Delhi snack brand?', answer: 'Yes, we supply customized nitrogen-flushed retail pouches with your brand branding and barcode.' },
    ],
    testimonialsTitle: 'Feedback from Delhi NCR Traders',
    testimonials: [
      { name: 'Vipin Aggarwal', role: 'Dry Fruit Merchant, Khari Baoli Delhi', rating: 5, review: 'We compared multiple Bihar suppliers, and Makhana Ghar has the best quality control. Jumbo grade is consistently clean and white.' },
      { name: 'Aman Verma', role: 'Snack Brand Co-founder, Noida', rating: 5, review: 'Reliable supplier for our roasted makhana brand. Great pricing, zero delays, and excellent customer service.' },
    ],
    seo: {
      metaTitle: 'Makhana Wholesale Supplier in Delhi NCR | Makhana Ghar',
      metaDescription: 'Direct farm-gate Makhana wholesale supplier in Delhi NCR. Export-grade Fox Nuts, 4+, 5+, 6+ Sutta delivered to Khari Baoli, Okhla, Noida, and Gurgaon.',
      focusKeyword: 'makhana wholesale supplier in delhi',
      secondaryKeywords: 'phool makhana khari baoli delhi, bulk makhana supplier delhi ncr, makhana wholesale price delhi, buy makhana in delhi',
      robotsIndex: true,
      robotsFollow: true,
    },
  },
  {
    cityName: 'Bangalore',
    state: 'Karnataka',
    slug: 'bangalore',
    status: 'published',
    order: 4,
    heroTag: 'Direct Farm Sourcing to Bangalore (Bengaluru)',
    heroHeading: 'Makhana Wholesale Supplier in Bangalore',
    heroDescription: 'Supplying export-grade, nutrient-dense Phool Makhana across Bangalore to organic store chains, e-commerce brands, and wholesale traders.',
    ctaText: 'Get Bangalore Wholesale Rates',
    ctaPhone: '+91 8002661555',
    introTitle: 'Premium Makhana (Fox Nuts) Wholesale Supply in Bengaluru',
    introDescription: 'As the superfood revolution grows in Karnataka, Makhana Ghar provides Bengaluru businesses with direct origin access to fresh Bihar Makhana. We cater to health snack startups, organic supermarkets, dry fruit stores, and ayurvedic companies across Bangalore.',
    deliveryAreasTitle: 'Key Supply Hubs in Bangalore (Bengaluru)',
    deliveryAreas: [
      { name: 'Yeshwanthpur APMC Yard', badge: 'Wholesale Mandi' },
      { name: 'Koramangala & Indiranagar', badge: 'Organic Retail Hubs' },
      { name: 'Whitefield & Electronic City', badge: 'Supermarket Chains' },
      { name: 'Peenya Industrial Area', badge: 'Packaging & FMCG Units' },
      { name: 'Jayanagar & Malleshwaram', badge: 'Traditional Retail' },
    ],
    aboutTitle: 'Why Bangalore Health Brands Choose Makhana Ghar',
    aboutDescription: 'Bangalore consumers demand natural, unadulterated quality. Our direct farm harvesting and chemical-free popping guarantee the purest superfood experience for your customers.',
    whyChooseTitle: 'Why Partner with Makhana Ghar in Bangalore',
    whyChooseCards: [
      { title: 'Farm-Direct Pricing', description: 'Eliminate intermediate trader markups with origin-direct pricing.', icon: 'pricing' },
      { title: 'FSSAI & Organic Standards', description: 'Strict quality control with moisture tested below 12%.', icon: 'quality' },
      { title: 'Prompt Logistics to South India', description: 'Established cargo routes with weekly dispatches to Yeshwanthpur APMC.', icon: 'shipping' },
      { title: 'Private Labeling for Startups', description: 'Assisting Bangalore health snack brands from packaging to bulk supply.', icon: 'packaging' },
      { title: 'Uniform Sutta Grading', description: 'True 4+, 5+, and 6+ Sutta classification without mixing.', icon: 'global' },
      { title: 'Dedicated Customer Support', description: 'Direct point-of-contact for samples, order tracking, and freight coordination.', icon: 'support' },
    ],
    faqsTitle: 'Frequently Asked Questions – Bangalore Supply',
    faqs: [
      { question: 'What is the delivery timeline from Bihar to Bangalore?', answer: 'Bulk consignments are shipped via express logistics and arrive in Bangalore within 4 to 6 business days.' },
      { question: 'Can health food startups in Bangalore order sample kits?', answer: 'Yes, we provide sample boxes covering all grades so you can test moisture and flavor before placing bulk orders.' },
      { question: 'Do you offer nitrogen-flushed packaging for humid seasons?', answer: 'Yes, our packaging preserves crunch and extends shelf life up to 12 months in any climate.' },
    ],
    testimonialsTitle: 'Client Testimonials from Bangalore',
    testimonials: [
      { name: 'Girish Murthy', role: 'Organic Foods Retailer, Indiranagar', rating: 5, review: 'Our customers in Bangalore are very discerning about snack quality. Makhana Ghar delivers pure, crispy fox nuts every batch.' },
      { name: 'Deepa Rao', role: 'D2C Superfood Founder, Bangalore', rating: 5, review: 'Exceptional private label support and competitive pricing. The team is very responsive and reliable.' },
    ],
    seo: {
      metaTitle: 'Makhana Wholesale Supplier in Bangalore | Makhana Ghar',
      metaDescription: 'Buy export-grade Makhana (Fox Nuts) at wholesale rates in Bangalore. Direct farm sourcing from Bihar, FSSAI certified with prompt delivery across Bengaluru.',
      focusKeyword: 'makhana wholesale supplier in bangalore',
      secondaryKeywords: 'phool makhana wholesale bangalore, bulk fox nuts yeshwanthpur, makhana supplier bangalore, buy makhana in bangalore',
      robotsIndex: true,
      robotsFollow: true,
    },
  },
];

async function seedCities() {
  console.log('🌱 Seeding City Landing Pages into Payload CMS...\n');

  const { getPayload } = await import('payload');
  const config = (await import('./payload.config')).default;
  const payload = await getPayload({ config });

  for (const city of sampleCities) {
    const existing = await payload.find({
      collection: 'city-pages',
      where: { slug: { equals: city.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`ℹ️  City "${city.cityName}" (${city.slug}) already exists. Updating...`);
      await payload.update({
        collection: 'city-pages',
        id: existing.docs[0].id,
        data: city as any,
      });
      console.log(`✅ Updated "${city.cityName}"`);
    } else {
      console.log(`➕ Creating City "${city.cityName}" (${city.slug})...`);
      await payload.create({
        collection: 'city-pages',
        data: city as any,
      });
      console.log(`✅ Created "${city.cityName}"`);
    }
  }

  console.log('\n🎉 City Pages seeding completed successfully!');
  process.exit(0);
}

seedCities().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
