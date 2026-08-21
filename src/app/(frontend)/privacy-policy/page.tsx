import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import { getPageMetadata } from '../../../lib/seo';
import styles from './Privacy.module.css';
import type { Metadata } from 'next';

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('privacy-policy', {
    title: 'Privacy Policy | Makhana Ghar',
    description:
      'Learn how Makhana Ghar collects, uses, and safeguards your personal data when you interact with our website, products, or services.',
    primaryKeywords: 'makhana ghar privacy policy, data protection makhana shop, privacy terms',
    secondaryKeywords: 'user data security, cookies policy, wholesale enquiry privacy',
    path: '/privacy-policy',
  });
}

export default function PrivacyPage() {
  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Makhana Ghar Privacy Policy"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Our Policy</span>
          <h1 className={styles.heroHeading}>Privacy Policy</h1>
          <Image
            className={styles.heroRule}
            src="/line-throw-title.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={10}
          />
          <p className={styles.heroBody}>Effective Date: 10 Jun 2024</p>
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

      {/* ── PRIVACY CONTENT ── */}
      <section className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <p className={styles.introduction}>
            At Makhana Ghar, we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, products, or services. By using our website or placing an order, you agree to the practices described in this policy.
          </p>

          {/* Section 1 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1.</span>
              Information We Collect
            </h2>
            <p className={styles.sectionText}>
              We may collect the following types of information to provide and improve our services:
            </p>

            <h3 className={styles.subheading}>a. Personal Information</h3>
            <p className={styles.sectionText}>
              Name, email address, phone number, billing address, and delivery address when you contact us, place an order, or subscribe to updates.
            </p>

            <h3 className={styles.subheading}>b. Transaction Information</h3>
            <p className={styles.sectionText}>
              Details related to your purchases, payment method, order history, and delivery preferences.
            </p>

            <h3 className={styles.subheading}>c. Technical Information</h3>
            <p className={styles.sectionText}>
              IP address, browser type, device information, and website usage data collected through cookies and analytics tools.
            </p>
          </div>

          {/* Section 2 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2.</span>
              How We Use Your Information
            </h2>
            <p className={styles.sectionText}>
              We use the collected information for the following purposes:
            </p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>To process and fulfill orders for Makhana products.</li>
              <li className={styles.detailsItem}>To communicate with you regarding your inquiries, orders, delivery updates, or support requests.</li>
              <li className={styles.detailsItem}>To improve our website, products, services, and customer experience.</li>
              <li className={styles.detailsItem}>To send promotional offers, updates, or newsletters, only where applicable. You can opt out at any time.</li>
              <li className={styles.detailsItem}>To comply with legal obligations and maintain website security.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3.</span>
              Cookies and Tracking Technologies
            </h2>
            <p className={styles.sectionText}>
              Our website may use cookies to improve your browsing experience. Cookies help us analyze website traffic, remember your preferences, and provide a better user experience.
            </p>
            <p className={styles.sectionText}>
              You can manage or disable cookies through your browser settings.
            </p>
          </div>

          {/* Section 4 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4.</span>
              Data Sharing and Disclosure
            </h2>
            <p className={styles.sectionText}>
              We do not sell or rent your personal information to third parties.
            </p>
            <p className={styles.sectionText}>
              However, we may share your information with trusted service providers who help us operate our business, such as:
            </p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>Shipping and delivery partners</li>
              <li className={styles.detailsItem}>Payment processing partners</li>
              <li className={styles.detailsItem}>Website hosting or analytics service providers</li>
              <li className={styles.detailsItem}>Legal authorities, if required by law</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5.</span>
              Data Security
            </h2>
            <p className={styles.sectionText}>
              We take reasonable security measures to protect your personal information from unauthorized access, misuse, loss, or disclosure. However, no online system is completely secure, and we cannot guarantee absolute security of your data.
            </p>
          </div>

          {/* Section 6 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6.</span>
              Your Rights
            </h2>
            <p className={styles.sectionText}>
              You have the right to:
            </p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>Access and update your personal information</li>
              <li className={styles.detailsItem}>Request deletion of your data, subject to legal and operational requirements</li>
              <li className={styles.detailsItem}>Opt out of promotional communications</li>
              <li className={styles.detailsItem}>Raise concerns about how your information is used</li>
            </ul>
            <p className={styles.sectionText}>
              To exercise these rights, please contact us using the details mentioned below.
            </p>
          </div>

          {/* Section 7 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7.</span>
              Third-Party Links
            </h2>
            <p className={styles.sectionText}>
              Our website may contain links to third-party websites. Makhana Ghar is not responsible for the privacy practices, content, or policies of external websites. We recommend reviewing their privacy policies before sharing any personal information.
            </p>
          </div>

          {/* Section 8 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8.</span>
              Changes to This Privacy Policy
            </h2>
            <p className={styles.sectionText}>
              Makhana Ghar reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with the updated effective date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* Section 9 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>9.</span>
              Contact Us
            </h2>
            <p className={styles.sectionText}>
              For any questions, concerns, or requests related to this Privacy Policy, please contact us at:
            </p>

            <div className={styles.contactGrid}>
              <div className={styles.contactBox}>
                <span className={styles.contactLabel}>Company</span>
                <span className={styles.contactValue}>Makhana Ghar</span>
              </div>
              <div className={styles.contactBox}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>
                  <a href="tel:+918002661555">+91 8002661555</a>
                </span>
              </div>
              <div className={styles.contactBox}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>
                  <a href="mailto:arinav@makhanaghar.in">arinav@makhanaghar.in</a>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
