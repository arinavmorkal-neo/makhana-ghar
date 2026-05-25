import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileNavBar from '../../../components/MobileNavBar';
import styles from './BlogDetail.module.css';
import { Metadata } from 'next';

/* ── Fallback blog data ── */
const defaultBlogs = [
  {
    id: 1,
    slug: 'how-uae-importers-can-source-premium-fox-nuts-from-india',
    title: 'How UAE Importers Can Source Premium Fox Nuts From India',
    date: '10 Jan 26',
    author: 'Admin',
    category: 'EXPORT',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Explore how UAE importers can source premium quality fox nuts from trusted Indian suppliers with proper export standards, packaging, and logistics support.',
    readTime: '5 min read',
    views: 350,
    content: `India is one of the leading sources of premium quality Fox Nuts, also known as Makhana. For UAE importers, sourcing from India can be a profitable opportunity because of the growing demand for healthy, roasted, and natural snacks.

To source high-quality fox nuts, importers should first focus on choosing a trusted Indian supplier. A reliable supplier provides consistent quality, proper grading, hygienic packing, and export-ready documentation.

The next important step is quality checking. Premium makhana should be fresh, crunchy, properly sorted, and free from moisture. UAE buyers should always ask for product samples, size details, packaging options, and lab-tested quality reports before placing bulk orders.

Packaging also plays a major role in international trade. Bulk packaging, private label packaging, and retail-ready packs should be selected according to the buyer's business model.

Logistics and documentation are equally important. Importers should confirm export documents, shipping timelines, invoice details, and customs-related requirements before finalizing the deal.

By partnering with a professional supplier from India, UAE importers can build a strong supply chain for premium fox nuts and serve the growing healthy snack market with confidence.`,
  },
  {
    id: 2,
    slug: 'why-premium-makhana-is-growing-in-global-markets',
    title: 'Why Premium Makhana Is Growing In Global Markets',
    date: '15 Jan 26',
    author: 'Admin',
    category: 'MARKET',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Makhana is becoming popular worldwide as a healthy, light, and nutritious snack option for modern consumers.',
    readTime: '4 min read',
    views: 280,
    content: `Premium makhana is gaining popularity in global markets because consumers are shifting toward healthier snack options. It is light, crunchy, easy to roast, and suitable for different age groups.

For wholesalers and importers, makhana offers a strong business opportunity because it can be sold in bulk, retail packs, flavored packs, and private label packaging.

The demand is especially increasing in markets where people prefer gluten-free, roasted, and plant-based snacks. With proper sourcing and packaging, makhana can become a highly profitable product category.

Countries like UAE, USA, UK, and Australia are seeing a surge in demand for Indian Makhana. The key to success in these markets is ensuring consistent quality, attractive packaging, and proper certifications.

Wholesale buyers and distributors are increasingly looking for reliable Indian suppliers who can provide bulk quantities with proper export documentation and competitive pricing.`,
  },
  {
    id: 3,
    slug: 'health-benefits-of-makhana-for-daily-diet',
    title: 'Health Benefits of Makhana For Daily Diet',
    date: '20 Feb 26',
    author: 'Admin',
    category: 'HEALTH',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Discover the incredible health benefits of Makhana and why it\'s becoming a staple in healthy diets around the world.',
    readTime: '6 min read',
    views: 420,
    content: `Makhana, also known as fox nuts or lotus seeds, has been a part of Indian cuisine and Ayurvedic traditions for centuries. Today, it is being recognized globally as a superfood due to its remarkable nutritional profile.

Rich in protein and low in cholesterol, makhana makes an excellent snack for health-conscious consumers. It is naturally gluten-free, making it suitable for people with gluten sensitivity or celiac disease.

Makhana is an excellent source of magnesium and potassium, which are essential minerals for heart health and blood pressure regulation. Regular consumption can help maintain cardiovascular health.

The anti-aging properties of makhana come from the amino acid L-arginine and the flavonoid kaempferol, which help fight free radicals and reduce signs of aging.

For those looking to manage their weight, makhana is an ideal snack — it is low in calories but high in fiber, keeping you full for longer periods.`,
  },
  {
    id: 4,
    slug: 'makhana-packaging-guide-for-wholesale-buyers',
    title: 'Makhana Packaging Guide For Wholesale Buyers',
    date: '5 Mar 26',
    author: 'Admin',
    category: 'WHOLESALE',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Understanding the right packaging options for bulk Makhana orders — from private label to retail-ready packs.',
    readTime: '5 min read',
    views: 190,
    content: `Proper packaging is crucial for maintaining the quality and freshness of Makhana during storage and transportation. For wholesale buyers, understanding the available packaging options can make a significant difference in business success.

Bulk packaging typically comes in PP bags ranging from 5kg to 50kg, suitable for large-scale distribution and repackaging. These are the most cost-effective option for wholesale buyers.

Private label packaging allows buyers to sell Makhana under their own brand name. This option includes customized pouches with your brand design, nutritional information, and certifications printed on the packaging.

Retail-ready packaging is designed for direct shelf placement in stores. These come in attractive consumer packs ranging from 100g to 1kg with proper branding and regulatory compliance.

Vacuum-sealed packaging is recommended for international shipments as it extends shelf life and prevents moisture absorption, which is critical for maintaining the crunchiness of Makhana.`,
  },
  {
    id: 5,
    slug: 'quality-grading-standards-for-indian-makhana',
    title: 'Quality Grading Standards For Indian Makhana',
    date: '12 Mar 26',
    author: 'Admin',
    category: 'QUALITY',
    image: '/blog/uae-makhana.png',
    excerpt:
      'Learn about the grading system for Makhana in India and how to choose the right grade for your business needs.',
    readTime: '7 min read',
    views: 310,
    content: `Understanding the grading system for Indian Makhana is essential for buyers who want to source the right quality for their specific business requirements.

The grading of Makhana is primarily based on size. The most common grades are 4 Sutta (smallest), 5 Sutta (medium), and 6 Sutta Plus (largest and most premium). The sutta measurement refers to the diameter of the popped Makhana seed.

6 Sutta Plus Makhana is the premium grade, typically used for direct retail consumption and premium packaging. These are the largest, crunchiest, and most visually appealing.

5 Sutta Makhana is the mid-range grade, popular for both retail and wholesale markets. It offers a good balance of quality and price.

4 Sutta Makhana is commonly used for flavored products, crushed Makhana, and value-oriented retail packs. It is the most affordable grade and is widely used in food processing.

Quality also depends on factors like moisture content, color uniformity, crunchiness, and absence of broken pieces. Reputable suppliers provide lab-tested quality reports to verify these parameters.`,
  },
  {
    id: 6,
    slug: 'building-a-makhana-supply-chain-for-international-trade',
    title: 'Building A Makhana Supply Chain For International Trade',
    date: '25 Mar 26',
    author: 'Admin',
    category: 'EXPORT',
    image: '/blog/uae-makhana.png',
    excerpt:
      'A comprehensive guide to establishing a reliable Makhana supply chain for cross-border distribution and exports.',
    readTime: '8 min read',
    views: 250,
    content: `Building a reliable supply chain for Makhana in international trade requires careful planning and partnership with trusted Indian suppliers. The key steps involve sourcing, quality control, packaging, logistics, and documentation.

The first step is identifying reliable sourcing regions. Bihar, particularly areas like Darbhanga, Madhubani, and Katihar, are the primary production hubs for Makhana in India. These regions have the ideal environmental conditions for lotus seed cultivation.

Quality control should be established at multiple stages — from raw material procurement to final packaging. Regular quality audits, lab testing, and sample verification are essential practices.

Documentation for international trade includes FSSAI certification, phytosanitary certificates, certificates of origin, commercial invoices, packing lists, and bills of lading. A professional supplier handles all these requirements.

Logistics planning should consider shipping routes, transit times, storage conditions, and customs clearance procedures. Sea freight is the most cost-effective option for bulk shipments.

Building long-term relationships with suppliers ensures consistent quality, competitive pricing, and reliable delivery schedules — the three pillars of a successful international supply chain.`,
  },
];

export async function generateStaticParams() {
  return defaultBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = defaultBlogs.find((item) => item.slug === slug);

  if (!blog) {
    return { title: 'Blog Not Found | Makhana Ghar' };
  }

  return {
    title: `${blog.title} | Makhana Ghar Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = defaultBlogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  const dateParts = blog.date.split(' ');

  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="Makhana Ghar Blog"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Blog Post</span>
          <h1 className={styles.heroHeading}>Blog & Insights</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>Read our latest article below.</p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.grassEdge}
          src="/grass-4.png"
          alt=""
          aria-hidden="true"
        />
      </section>

      {/* ── DETAIL CONTENT ── */}
      <section className={styles.detailContainer}>
        <div className={styles.detailGrid}>
          {/* Article */}
          <article>
            <div className={styles.articleBanner}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={blog.title}
                className={styles.articleBannerImg}
              />
              <div className={styles.articleDateBadge}>
                <span className={styles.articleDateDay}>{dateParts[0]}</span>
                <span className={styles.articleDateMonth}>
                  {dateParts.slice(1).join(' ')}
                </span>
              </div>
            </div>

            <div className={styles.articleMeta}>
              <span className={styles.articleMetaItem}>
                <span className={styles.articleMetaDot} />
                By {blog.author}
              </span>
              <span className={styles.articleMetaSep}>/</span>
              <span className={styles.articleMetaItem}>
                <span className={styles.articleMetaDot} />
                {blog.views}+ Views
              </span>
              <span className={styles.articleMetaSep}>/</span>
              <span className={styles.articleMetaItem}>
                <span className={styles.articleMetaDot} />
                {blog.readTime}
              </span>
            </div>

            <div className={styles.articleDivider} />

            <h1 className={styles.articleTitle}>{blog.title}</h1>

            <div className={styles.articleContent}>
              {blog.content
                .trim()
                .split('\n\n')
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            <div className={styles.articleBackWrap}>
              <Link href="/blog" className={styles.articleBackBtn}>
                ← Back To Blogs
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <aside className={styles.sidebarCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blog/admin.png"
                alt="Admin"
                className={styles.sidebarAvatar}
              />
              <h3 className={styles.sidebarName}>Admin</h3>
              <p className={styles.sidebarRole}>Makhana Ghar</p>
              <div className={styles.sidebarDivider} />
              <p className={styles.sidebarBio}>
                Welcome to Makhana Ghar, your trusted supplier of premium-quality
                Makhana. With a commitment to freshness and authenticity, we deliver
                rich, healthy products sourced directly from the farms of Bihar.
              </p>
              <div className={styles.sidebarSocials}>
                <a
                  href="https://www.facebook.com/profile.php?id=61590384691167"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sidebarSocialLink}
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href="#"
                  className={styles.sidebarSocialLink}
                  aria-label="Instagram"
                >
                  ◎
                </a>
                <a
                  href="#"
                  className={styles.sidebarSocialLink}
                  aria-label="Twitter"
                >
                  x
                </a>
                <a
                  href="#"
                  className={styles.sidebarSocialLink}
                  aria-label="LinkedIn"
                >
                  in
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
