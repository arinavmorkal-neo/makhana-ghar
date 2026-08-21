import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import ContactUsClient from './ContactUsClient';
import { getPageMetadata } from '../../../lib/seo';
import { breadcrumbJsonLd } from '../../lib/jsonLd';
import styles from './ContactUs.module.css';

export const revalidate = 120; // ISR

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('contact-us', {
    title: 'Contact Us | Makhana Ghar – Get Wholesale & Export Quotes',
    description:
      'Contact Makhana Ghar for bulk makhana orders, wholesale pricing, export enquiries, and distributor partnerships. Direct phone, email, and facility address in Bihar.',
    primaryKeywords: 'contact makhana ghar, makhana wholesale enquiry, buy bulk makhana quote, makhana exporter contact',
    secondaryKeywords: 'bihar makhana factory phone number, katihar makhana address, makhana distributor inquiry, makhana supplier email',
    path: '/contact-us',
  });
}

export default function ContactUsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://www.makhanaghar.in' },
    { name: 'Contact Us', url: 'https://www.makhanaghar.in/contact-us' },
  ]);

  return (
    <main>
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
          alt="Contact Makhana Ghar"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Get In Touch</span>
          <h1 className={styles.heroHeading}>Contact Us</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>
            Have questions about our premium Makhana products? Want a bulk quote
            or need export assistance? We&apos;re here to help — reach out to us
            anytime.
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

      {/* ── CONTACT CONTENT ── */}
      <ContactUsClient />

      <Footer />
      <MobileNavBar />
    </main>
  );
}
