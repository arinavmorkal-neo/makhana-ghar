'use client';

import { useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import 'react-phone-input-2/lib/style.css';
import { useGeo } from '../../components/GeoProvider';
import styles from './ContactUs.module.css';

const PhoneInput = dynamic(() => import('react-phone-input-2'), {
  ssr: false,
  loading: () => <input placeholder="Phone" className={styles.formInput} disabled />,
});

export default function ContactUsClient() {
  const { countryCode: defaultCountry } = useGeo();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;
    if (name === 'name') {
      value = value.replace(/[0-9]/g, '');
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address containing @.');
      return;
    }
    if (!formData.phone) {
      alert('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, pagePath: window.location.href }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 6000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactInner}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            We&apos;d Love To <span className={styles.sectionTitleAccent}>Hear From You</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Whether you&apos;re a wholesaler, distributor, or individual buyer — we welcome all enquiries. Reach out via any channel below.
          </p>
        </div>

        {/* ── Info Cards ── */}
        <div className={styles.infoGrid}>
          {/* Phone */}
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>Call Us</h3>
            <p className={styles.infoText}>
              <a href="tel:+918002661555">+91 8002 66 1555</a>
              <br />
              Mon – Sat, 9 AM – 7 PM IST
            </p>
          </div>

          {/* Email */}
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>Email Us</h3>
            <p className={styles.infoText}>
              <a href="mailto:makhanaghar.marketing@gmail.com">makhanaghar.marketing@gmail.com</a>
              <br />
              We reply within 24 hours
            </p>
          </div>

          {/* Address */}
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className={styles.infoTitle}>Visit Us</h3>
            <p className={styles.infoText}>
              Mangal Bazar, Katihar,
              <br />
              Bihar 854105, India
            </p>
          </div>
        </div>

        {/* ── Form + Map ── */}
        <div className={styles.contactMain}>
          {/* Contact Form */}
          <div className={styles.formSection}>
            <h3 className={styles.formTitle}>Send Us a Message</h3>
            <p className={styles.formSubtitle}>
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} id="contact-form">
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-name">
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={styles.formInput}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-email">
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={styles.formInput}
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-phone">
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <div style={{ color: '#000' }}>
                    <PhoneInput
                      country={defaultCountry}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      inputStyle={{ width: '100%', height: '44px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '15px' }}
                      buttonStyle={{ borderRadius: '8px 0 0 8px', border: '1px solid #e0e0e0', backgroundColor: '#f8f9fa' }}
                      enableSearch={true}
                      disableSearchIcon={true}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-subject">
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    className={`${styles.formInput} ${styles.formSelect}`}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select enquiry type…</option>
                    <option value="Wholesale / Bulk Order">Wholesale / Bulk Order</option>
                    <option value="Export Enquiry">Export Enquiry</option>
                    <option value="Distribution Partnership">Distribution Partnership</option>
                    <option value="Custom Grade / Packaging">Custom Grade / Packaging</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="contact-message">
                  Your Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={`${styles.formInput} ${styles.formTextarea}`}
                  placeholder="Tell us about your requirements, quantities, or questions…"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {success && (
                <div className={styles.successMessage}>
                  ✓ Thank you! Your message has been sent successfully. We&apos;ll be in touch soon.
                </div>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send Message'}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

          {/* Processing Facility Info */}
          <div className={styles.facilitySection}>
            <div className={styles.facilityCard}>
              <div className={styles.facilityHeader}>
                <div className={styles.facilityBadge}>
                  <span className={styles.pulseDot} />
                  <span>Katihar, Bihar · Processing Hub</span>
                </div>
                <h3 className={styles.facilityTitle}>
                  Our Processing <span className={styles.facilityTitleAccent}>Facility</span>
                </h3>
                <p className={styles.facilitySubtitle}>
                  Located at the heart of India&apos;s primary Makhana growing region in Bihar, directly connected to pristine harvest ponds for unmatched quality &amp; traceability.
                </p>
              </div>

              <div className={styles.facilityHighlights}>
                <div className={styles.facilityItem}>
                  <div className={`${styles.facilityIconWrap} ${styles.iconWheat}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 22 16 8" />
                      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
                      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
                      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
                      <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
                    </svg>
                  </div>
                  <div className={styles.facilityItemText}>
                    <div className={styles.facilityItemTop}>
                      <strong className={styles.facilityItemTitle}>Direct Farm Access</strong>
                      <span className={styles.facilityStatPill}>&lt; 15 km Radius</span>
                    </div>
                    <p className={styles.facilityItemDesc}>
                      Ponds within 15 km of our processing unit ensure immediate sorting and farm-fresh flavor.
                    </p>
                  </div>
                </div>

                <div className={styles.facilityItem}>
                  <div className={`${styles.facilityIconWrap} ${styles.iconSun}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </div>
                  <div className={styles.facilityItemText}>
                    <div className={styles.facilityItemTop}>
                      <strong className={styles.facilityItemTitle}>Natural Sun-Drying</strong>
                      <span className={styles.facilityStatPill}>20,000+ sq ft</span>
                    </div>
                    <p className={styles.facilityItemDesc}>
                      Over 20,000 sq ft of clean drying yards preserving natural nutrients, aroma, and crispness.
                    </p>
                  </div>
                </div>

                <div className={styles.facilityItem}>
                  <div className={`${styles.facilityIconWrap} ${styles.iconBox}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16.5 9.4-9-5.19" />
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.29 7 12 12 20.71 7" />
                      <line x1="12" x2="12" y1="22" y2="12" />
                    </svg>
                  </div>
                  <div className={styles.facilityItemText}>
                    <div className={styles.facilityItemTop}>
                      <strong className={styles.facilityItemTitle}>Modern Packaging Facility</strong>
                      <span className={styles.facilityStatPill}>Food-Grade</span>
                    </div>
                    <p className={styles.facilityItemDesc}>
                      Hygienic climate-controlled facility with moisture-lock bags and export-ready grading.
                    </p>
                  </div>
                </div>

                <div className={styles.facilityItem}>
                  <div className={`${styles.facilityIconWrap} ${styles.iconTruck}`}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                      <path d="M15 18H9" />
                      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                      <circle cx="17" cy="18.5" r="2.5" />
                      <circle cx="7" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className={styles.facilityItemText}>
                    <div className={styles.facilityItemTop}>
                      <strong className={styles.facilityItemTitle}>Pan-India &amp; Global Dispatch</strong>
                      <span className={styles.facilityStatPill}>Freight Ready</span>
                    </div>
                    <p className={styles.facilityItemDesc}>
                      Connected via national highways, freight rail corridors, and sea port transit routes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility Address Bar */}
              <div className={styles.facilityAddressBar}>
                <div className={styles.addressLeft}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.addressPinIcon}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className={styles.addressDetails}>
                    <span className={styles.addressLabel}>Processing Unit Address</span>
                    <span className={styles.addressValue}>Mangal Bazar, Katihar, Bihar 854105, India</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Mangal+Bazar,+Katihar,+Bihar+854105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLinkBtn}
                  title="Open location in Google Maps"
                >
                  <span>View Map</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* Quick WhatsApp Banner */}
              <div className={styles.quickContactBanner}>
                <div className={styles.qcTextWrap}>
                  <div className={styles.qcHeadline}>
                    <span className={styles.qcPulseDot} />
                    <strong>Need immediate assistance?</strong>
                  </div>
                  <p className={styles.qcText}>
                    Chat live with our wholesale desk for real-time stock, pricing &amp; lot samples.
                  </p>
                </div>
                <a
                  href="https://wa.me/918002661555?text=Hello%2C%20I%20have%20an%20urgent%20enquiry%20regarding%20makhana%20wholesale."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.qcWhatsappBtn}
                >
                  <svg
                    className={styles.qcWhatsappIcon}
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.628.75 5.08 2.053 7.153L3 29.5l6.568-1.52A13.436 13.436 0 0016 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.636c-2.296 0-4.453-.664-6.28-1.808l-.45-.28-4.148.96 1.002-3.992-.295-.468A11.144 11.144 0 014.864 16C4.864 9.86 9.86 4.864 16 4.864S27.136 9.86 27.136 16 22.14 27.136 16 27.136zm6.818-8.777c-.373-.187-2.207-1.089-2.55-1.213-.342-.125-.59-.187-.84.187-.248.373-.964 1.213-1.182 1.462-.218.249-.436.28-.809.094a10.22 10.22 0 01-3.003-1.854 11.272 11.272 0 01-2.079-2.587c-.218-.374-.023-.576.164-.762.168-.168.374-.436.56-.654.187-.218.249-.374.374-.623.125-.25.062-.467-.031-.654-.094-.187-.84-2.024-1.152-2.772-.303-.728-.612-.629-.84-.641l-.717-.012c-.25 0-.654.094-.996.467s-1.308 1.277-1.308 3.114c0 1.838 1.34 3.613 1.526 3.863.187.249 2.637 4.027 6.39 5.648.893.385 1.59.615 2.133.788.897.285 1.713.245 2.358.149.72-.108 2.207-.903 2.518-1.774.312-.872.312-1.62.218-1.775-.093-.156-.342-.25-.716-.436z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
