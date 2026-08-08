'use client';

import { useState, useEffect, FormEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MobileNavBar from '../../components/MobileNavBar';
import styles from './ContactUs.module.css';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState('in');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code) {
          setDefaultCountry(data.country_code.toLowerCase());
        }
      })
      .catch(err => console.error('Failed to fetch country code:', err));
  }, []);

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
    // For contact-us API, we can just send the full formatted phone number string
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address containing @.');
      return;
    }
    // We only do a basic validation for presence of phone here because PhoneInput 
    // already helps structure it, and international lengths vary.
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
        body: JSON.stringify(formData),
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
    <main>
      <Header />

      {/* ── HERO BANNER ── */}
      <section className={styles.heroSection}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroBg}
          src="/banner1.png"
          alt="Contact Makhana Ghar"
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Get In Touch</span>
          <h1 className={styles.heroHeading}>Contact Us</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.heroRule}
            src="/line-throw-title.png"
            alt=""
            aria-hidden="true"
          />
          <p className={styles.heroBody}>
            Have questions about our premium Makhana products? Want a bulk quote
            or need export assistance? We&apos;re here to help — reach out to us
            anytime.
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.grassEdge}
          src="/grassnew-white.png"
          alt=""
          aria-hidden="true"
        />
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section className={styles.contactContainer}>
        <div className={styles.contactInner}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              We&apos;d Love To{' '}
              <span className={styles.sectionTitleAccent}>Hear From You</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Whether you&apos;re a wholesaler, distributor, or individual buyer — we
              welcome all enquiries. Reach out via any channel below.
            </p>
          </div>

          {/* ── Info Cards ── */}
          <div className={styles.infoGrid}>
            {/* Phone */}
            <div className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Email Us</h3>
              <p className={styles.infoText}>
                <a href="mailto:makhanaghar.marketing@gmail.com">
                  makhanaghar.marketing@gmail.com
                </a>
                <br />
                We reply within 24 hours
              </p>
            </div>

            {/* Address */}
            <div className={styles.infoCard}>
              <div className={styles.infoIconWrap}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                Fill out the form below and our team will get back to you
                shortly.
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
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-phone">
                      Phone Number
                    </label>
                    <div style={{ color: '#000' }}>
                      <PhoneInput
                        country={defaultCountry}
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputStyle={{ width: '100%', height: '48px', borderRadius: '8px', border: '1px solid var(--border)' }}
                        buttonStyle={{ borderRadius: '8px 0 0 8px', border: '1px solid var(--border)', backgroundColor: '#fff' }}
                        enableSearch={true}
                        disableSearchIcon={true}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label
                      className={styles.formLabel}
                      htmlFor="contact-subject"
                    >
                      Subject <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className={styles.formSelect}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="Wholesale Enquiry">
                        Wholesale Enquiry
                      </option>
                      <option value="Export / Import Query">
                        Export / Import Query
                      </option>
                      <option value="Product Information">
                        Product Information
                      </option>
                      <option value="Distributorship">
                        Distributorship
                      </option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Feedback / Suggestion">
                        Feedback / Suggestion
                      </option>
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
                    className={styles.formTextarea}
                    placeholder="Tell us about your requirements, quantity needed, preferred packaging, or any questions you have..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                  id="contact-submit-btn"
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

                {success && (
                  <div className={styles.successMessage}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2e7d32"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Thank you! Your message has been sent successfully.
                    We&apos;ll get back to you within 24 hours.
                  </div>
                )}
              </form>
            </div>

            {/* Map + Hours */}
            <div>
              <div className={styles.mapSection}>
                <div className={styles.mapHeader}>
                  <h3 className={styles.mapTitle}>Our Location</h3>
                  <p className={styles.mapAddress}>
                    Mangal Bazar, Katihar, Bihar 854105, India
                  </p>
                </div>
                <div className={styles.mapWrap}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.5!2d87.5714!3d25.5500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f02e19ac4bfc7d%3A0x8f14567c07ef3f07!2sKatihar%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Makhana Ghar Location - Katihar, Bihar"
                  />
                </div>
              </div>

              {/* Business Hours */}
              <div className={styles.hoursSection}>
                <h4 className={styles.hoursTitle}>
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
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Business Hours
                </h4>
                <div className={styles.hoursGrid}>
                  <div className={styles.hoursRow}>
                    <span className={styles.hoursDay}>Monday – Friday</span>
                    <span className={styles.hoursTime}>9:00 AM – 7:00 PM</span>
                  </div>
                  <div className={styles.hoursDivider} />
                  <div className={styles.hoursRow}>
                    <span className={styles.hoursDay}>Saturday</span>
                    <span className={styles.hoursTime}>9:00 AM – 5:00 PM</span>
                  </div>
                  <div className={styles.hoursDivider} />
                  <div className={styles.hoursRow}>
                    <span className={styles.hoursDay}>Sunday</span>
                    <span className={`${styles.hoursTime} ${styles.closed}`}>
                      Closed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>
              Looking For <span>Bulk Orders</span> or Export Solutions?
            </h3>
            <p className={styles.ctaBody}>
              We offer competitive wholesale pricing, custom packaging, and
              worldwide export services. Get a personalized quote for your
              business needs today.
            </p>
            <div className={styles.ctaButtons}>
              <a href="tel:+918002661555" className={styles.ctaBtnPrimary}>
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
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Now
              </a>
              <a
                href="mailto:makhanaghar.marketing@gmail.com"
                className={styles.ctaBtnSecondary}
              >
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
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNavBar />
    </main>
  );
}
