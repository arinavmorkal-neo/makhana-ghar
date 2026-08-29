import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import { getPageMetadata } from '../../../lib/seo';
import styles from './Refund.module.css';
import type { Metadata } from 'next';

export const revalidate = 120;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('refund-policy', {
    title: 'Refund Policy | Makhana Ghar',
    description:
      'Understand the Return and Refund Policy of Makhana Ghar. In rare cases where you receive damaged, defective, or incorrect products, we are here to help.',
    primaryKeywords: 'refund policy, returns makhana, customer satisfaction, makhana ghar refund',
    secondaryKeywords: 'damaged goods policy, order cancellation makhana, bulk order refund terms',
    path: '/refund-policy',
  });
}

export default function RefundPolicyPage() {
  return (
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        <Image
          className={styles.heroBg}
          src="/banner1.webp"
          alt="Makhana Ghar Refund Policy"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          quality={80}
        />
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Returns</span>
          <h1 className={styles.heroHeading}>Refund Policy</h1>
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

      {/* ── REFUND CONTENT ── */}
      <section className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <p className={styles.introduction}>
            At Makhana Ghar, we strive to provide fresh, clean, and high-quality Makhana products to our customers. In rare cases where you receive a damaged, defective, or incorrect product, we offer a clear and fair refund or replacement process.
          </p>

          {/* Section 1 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1.</span>
              Eligibility for Refunds
            </h2>
            <p className={styles.sectionText}>
              Refunds or replacements may be applicable under the following conditions:
            </p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>The product received is damaged or defective.</li>
              <li className={styles.detailsItem}>The product delivered does not match the order placed.</li>
              <li className={styles.detailsItem}>The wrong size, grade, or quantity of Makhana is delivered.</li>
              <li className={styles.detailsItem}>The refund request is made within 7 days of receiving the product.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2.</span>
              Conditions for Refund
            </h2>
            <p className={styles.sectionText}>
              To qualify for a refund or replacement:
            </p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>The product must be unused and in its original packaging.</li>
              <li className={styles.detailsItem}>Proof of purchase, such as invoice, receipt, or order confirmation, must be provided.</li>
              <li className={styles.detailsItem}>Clear photos or videos of the damaged, defective, or incorrect product must be shared for verification.</li>
              <li className={styles.detailsItem}>The issue must be reported within the eligible refund period.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3.</span>
              Non-Refundable Items
            </h2>
            <p className={styles.sectionText}>
              Refunds are not applicable in the following cases:
            </p>
            <ul className={styles.detailsList}>
              <li className={styles.detailsItem}>Products damaged due to improper handling, storage, or usage by the customer.</li>
              <li className={styles.detailsItem}>Products returned without original packaging or proof of purchase.</li>
              <li className={styles.detailsItem}>Items purchased under clearance, discount, or promotional offers, unless damaged or incorrect.</li>
              <li className={styles.detailsItem}>Delays caused by courier partners, weather conditions, strikes, transport issues, or other unforeseen circumstances.</li>
              <li className={styles.detailsItem}>Change of mind after order confirmation or delivery.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4.</span>
              Refund Process
            </h2>
            <p className={styles.sectionText}>
              To initiate a refund or replacement, please contact us within 7 days of receiving your order.
            </p>
            <p className={styles.sectionText}>
              After receiving your request, our team will review the details and may ask for additional photos, videos, or return of the product.
            </p>
            <p className={styles.sectionText}>
              Once the request is verified and approved, the refund will be processed within 7-10 business days through the original payment method or any other mutually agreed method.
            </p>

            <div className={styles.contactGrid}>
              <div className={styles.contactBox}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>
                  <a href="tel:+918002661555">+91 8002661555</a>
                </span>
              </div>
              <div className={styles.contactBox}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>
                  <a href="mailto:makhanagha.marketing@gmail.com">makhanagha.marketing@gmail.com</a>
                </span>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5.</span>
              Shipping and Return Costs
            </h2>
            <p className={styles.sectionText}>
              If the issue is from our side, such as wrong product, damaged product, or defective product, Makhana Ghar will cover the return shipping cost or arrange a suitable resolution.
            </p>
            <p className={styles.sectionText}>
              For other cases, the customer may be responsible for return shipping charges.
            </p>
          </div>

          {/* Section 6 */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6.</span>
              Contact Us
            </h2>
            <p className={styles.sectionText}>
              For any questions or concerns regarding our Refund Policy, please contact us:
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
                  <a href="mailto:makhanagha.marketing@gmail.com">makhanagha.marketing@gmail.com</a>
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
