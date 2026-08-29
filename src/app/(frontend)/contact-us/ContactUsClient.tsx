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
              <a href="mailto:makhanagha.marketing@gmail.com">makhanagha.marketing@gmail.com</a>
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

          {/* Map / Facility Info */}
          <div className={styles.mapSection}>
            <div className={styles.mapCard}>
              <h3 className={styles.mapTitle}>Our Processing Facility</h3>
              <p className={styles.mapSubtitle}>
                Located at the heart of India&apos;s primary Makhana growing region in Bihar.
              </p>

              <div className={styles.facilityHighlights}>
                <div className={styles.facilityItem}>
                  <span className={styles.facilityIcon}>🌾</span>
                  <div>
                    <strong>Direct Farm Access</strong>
                    <p>Ponds within 15 km of our processing unit</p>
                  </div>
                </div>
                <div className={styles.facilityItem}>
                  <span className={styles.facilityIcon}>☀️</span>
                  <div>
                    <strong>Natural Sun-Drying</strong>
                    <p>Over 20,000 sq ft of clean drying yards</p>
                  </div>
                </div>
                <div className={styles.facilityItem}>
                  <span className={styles.facilityIcon}>📦</span>
                  <div>
                    <strong>Modern Packaging Facility</strong>
                    <p>Food-grade, climate-controlled packaging</p>
                  </div>
                </div>
                <div className={styles.facilityItem}>
                  <span className={styles.facilityIcon}>🚛</span>
                  <div>
                    <strong>Pan-India &amp; Global Dispatch</strong>
                    <p>Connected via road, rail, and port logistics</p>
                  </div>
                </div>
              </div>

              <div className={styles.quickContactBanner}>
                <p className={styles.qcText}>Need immediate assistance?</p>
                <a
                  href="https://wa.me/918002661555?text=Hello%2C%20I%20have%20an%20urgent%20enquiry%20regarding%20makhana%20wholesale."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.qcWhatsappBtn}
                >
                  Chat on WhatsApp 💬
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
