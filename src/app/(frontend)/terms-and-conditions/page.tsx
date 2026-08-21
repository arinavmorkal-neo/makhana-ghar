import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import { getPageMetadata } from '../../../lib/seo';
import styles from './Terms.module.css';
import type { Metadata } from 'next';

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('terms-and-conditions', {
    title: 'Terms and Conditions | Makhana Ghar',
    description:
      'Read the Terms and Conditions of using Makhana Ghar services, products, or website. Sourced directly from Bihar\'s finest farms.',
    primaryKeywords: 'terms and conditions, makhana ghar terms, wholesale makhana purchase terms',
    secondaryKeywords: 'makhana supply agreement, payment terms makhana exporter, bulk order terms',
    path: '/terms-and-conditions',
  });
}

export default function TermsPage() {
  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Makhana Ghar Terms and Conditions"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Agreement</span>
          <h1 className={styles.heroHeading}>Terms &amp; Conditions</h1>
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

      {/* ── TERMS CONTENT ── */}
      <section className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <p className={styles.introduction}>
            Welcome to Makhana Ghar. By using our website, services, or purchasing our products, you agree to comply with the following Terms and Conditions. Please read these terms carefully before placing any order.
          </p>

          {/* Section 1 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1.</span>
              Acceptance of Terms
            </h2>
            <p className={styles.sectionText}>
              By accessing our website or purchasing products from Makhana Ghar, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our website, services, or products.
            </p>
          </div>

          {/* Section 2 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2.</span>
              Product Information
            </h2>
            <p className={styles.sectionText}>
              Makhana Ghar provides quality Makhana products in different sizes, grades, and packaging options.
            </p>
            <p className={styles.sectionText}>
              We try to ensure that all product descriptions, images, sizes, grades, and pricing details are accurate. However, product appearance, availability, pricing, and packaging may vary slightly and can be changed or updated at any time without prior notice.
            </p>
          </div>

          {/* Section 3 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3.</span>
              Orders and Payments
            </h2>
            <p className={styles.sectionText}>
              All orders placed through our website, phone, WhatsApp, or any other communication channel are subject to acceptance by Makhana Ghar.
            </p>
            <p className={styles.sectionText}>
              We reserve the right to cancel, reject, or modify any order at our discretion.
            </p>
            <p className={styles.sectionText}>
              Payments must be made in full before processing the order, unless otherwise agreed in writing.
            </p>
            <p className={styles.sectionText}>
              We may accept payments through online payment methods, bank transfer, UPI, or other approved payment options.
            </p>
          </div>

          {/* Section 4 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4.</span>
              Shipping and Delivery
            </h2>
            <p className={styles.sectionText}>
              Makhana Ghar offers delivery across India, subject to serviceability and order confirmation.
            </p>
            <p className={styles.sectionText}>
              We make every effort to dispatch and deliver orders on time. However, delivery timelines are estimates and may vary due to courier delays, location, weather conditions, stock availability, or other unavoidable reasons.
            </p>
            <p className={styles.sectionText}>
              Shipping charges may vary depending on order quantity, delivery location, and shipping partner.
            </p>
            <p className={styles.sectionText}>
              Customers are responsible for providing accurate and complete delivery details. Makhana Ghar will not be responsible for delays or failed delivery due to incorrect address or contact information.
            </p>
          </div>

          {/* Section 5 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5.</span>
              Return and Refund Policy
            </h2>
            <p className={styles.sectionText}>
              Due to the nature of food products, returns or exchanges are accepted only if the product received is damaged, defective, or incorrect.
            </p>
            <p className={styles.sectionText}>
              If you receive a damaged, defective, or wrong product, please contact us within 7 days of receiving the order with proper details, photos, or videos for verification.
            </p>
            <p className={styles.sectionText}>
              Refunds or replacements will be processed only after verification of the issue.
            </p>
            <p className={styles.sectionText}>
              Refunds, if approved, will be made through the original payment method or any other mutually agreed method.
            </p>
          </div>

          {/* Section 6 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6.</span>
              Quality Assurance
            </h2>
            <p className={styles.sectionText}>
              At Makhana Ghar, we focus on providing fresh, clean, and quality makhana products. We follow proper sorting, packing, and storage practices to maintain product quality.
            </p>
            <p className={styles.sectionText}>
              If you face any issue related to product quality, please contact our support team, and we will try to resolve the matter appropriately.
            </p>
          </div>

          {/* Section 7 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7.</span>
              Limitation of Liability
            </h2>
            <p className={styles.sectionText}>
              Makhana Ghar shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our products, website, or services.
            </p>
            <p className={styles.sectionText}>
              Our total liability, if any, shall be limited to the amount paid by the customer for the specific product in question.
            </p>
          </div>

          {/* Section 8 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8.</span>
              Intellectual Property
            </h2>
            <p className={styles.sectionText}>
              All content available on our website or marketing materials, including text, images, logos, product descriptions, graphics, and branding, belongs to Makhana Ghar unless otherwise stated.
            </p>
            <p className={styles.sectionText}>
              Unauthorized copying, reproduction, distribution, or use of our content is strictly prohibited.
            </p>
          </div>

          {/* Section 9 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>9.</span>
              Privacy Policy
            </h2>
            <p className={styles.sectionText}>
              We respect your privacy and are committed to protecting your personal information. By using our website or services, you agree to our Privacy Policy, which explains how we collect, use, and protect your data.
            </p>
            <p className={styles.sectionText}>
              Please refer to our Privacy Policy for more details.
            </p>
          </div>

          {/* Section 10 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>10.</span>
              Changes to Terms and Conditions
            </h2>
            <p className={styles.sectionText}>
              Makhana Ghar reserves the right to update, modify, or change these Terms and Conditions at any time.
            </p>
            <p className={styles.sectionText}>
              Any changes will be posted on this page with the updated effective date. We encourage you to review these terms periodically.
            </p>
          </div>

          {/* Section 11 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>11.</span>
              Governing Law
            </h2>
            <p className={styles.sectionText}>
              These Terms and Conditions shall be governed by and interpreted according to the laws of India.
            </p>
            <p className={styles.sectionText}>
              Any disputes arising under or related to these terms shall be subject to the jurisdiction of the appropriate courts in India.
            </p>
          </div>

          {/* Section 12 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>12.</span>
              Contact Us
            </h2>
            <p className={styles.sectionText}>
              For any questions, concerns, or support related to these Terms and Conditions, please contact us at:
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
