import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import MobileNavBar from '../../../components/MobileNavBar';
import styles from './BlogDetail.module.css';
import { Metadata } from 'next';

/* ── Blog data (populated from CMS) ── */
const defaultBlogs: {
  id: number;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  views: number;
  content: string;
}[] = [];

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
          src="/grassnew-white.png"
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
                src="/blog/arinav.png"
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
                  href="https://www.instagram.com/makhanaghar/"
                  target="_blank"
                  rel="noopener noreferrer"
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
