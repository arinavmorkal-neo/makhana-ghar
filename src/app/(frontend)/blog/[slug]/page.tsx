import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileNavBar from '../../../components/MobileNavBar';
import { articleJsonLd, breadcrumbJsonLd } from '../../../lib/jsonLd';
import { getBlogMetadata } from '../../../../lib/seo';
import { getImageUrlWithOverride } from '../../../../lib/getImageUrl';
import styles from './BlogDetail.module.css';

export const revalidate = 60; // ISR 60s

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getBlogMetadata(slug);
}

async function getBlogPost(slug: string) {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'blogs',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 1,
    });

    if (result.docs.length > 0) {
      const doc = result.docs[0] as any;
      return {
        id: doc.id,
        slug: doc.slug,
        title: doc.title,
        date: doc.date
          ? new Date(doc.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
          : '',
        author: doc.author || 'Admin',
        category: doc.category || 'Makhana',
        image: getImageUrlWithOverride(doc.imageUrl, doc.image, '/banner1.webp'),
        excerpt: doc.excerpt || '',
        readTime: doc.readTime || '5 min read',
        views: doc.views || 0,
        content: doc.content || '',
      };
    }
  } catch (err) {
    console.error('Failed to fetch blog post server-side:', err);
  }
  return null;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    notFound();
  }

  const dateParts = blog.date ? blog.date.split(' ') : ['Today'];

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Blog', url: 'https://www.makhanaghar.in/blog' },
    { name: blog.title, url: `https://www.makhanaghar.in/blog/${blog.slug}` },
  ]);

  const articleStructuredData = articleJsonLd({
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    date: blog.date,
    author: blog.author,
    image: blog.image,
  });

  return (
    <main>
      {/* Article + Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
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
          alt="Makhana Ghar Blog"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Blog Post</span>
          <h1 className={styles.heroHeading}>{blog.title}</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>{blog.excerpt || 'Read our latest article below.'}</p>
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

      {/* ── DETAIL CONTENT ── */}
      <section className={styles.detailContainer}>
        <div className={styles.detailGrid}>
          {/* Article */}
          <article>
            <div className={styles.articleBanner}>
              <Image
                src={blog.image}
                alt={blog.title}
                width={800}
                height={450}
                className={styles.articleBannerImg}
                priority
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
              {typeof blog.content === 'string' ? (
                blog.content
                  .trim()
                  .split('\n\n')
                  .map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))
              ) : (
                <p>{blog.excerpt}</p>
              )}
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
              <Image
                src="/founder-1.webp"
                alt="Author"
                width={80}
                height={80}
                className={styles.sidebarAvatar}
              />
              <h3 className={styles.sidebarName}>Makhana Ghar Editorial</h3>
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
                  href="https://www.instagram.com/makhanaghar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sidebarSocialLink}
                  aria-label="Instagram"
                >
                  ◎
                </a>
                <a
                  href="https://x.com/makhanaghar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sidebarSocialLink}
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="https://www.linkedin.com/in/makhana-ghar-a155ba41a"
                  target="_blank"
                  rel="noopener noreferrer"
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
