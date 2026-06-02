'use client';

import { useState } from 'react';
import styles from './EnquiryPopup.module.css';

interface EnquiryPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryPopup({ open, onClose }: EnquiryPopupProps) {
  const [form, setForm] = useState({
    name: '',
    countryCode: '+91',
    contact: '',
    email: '',
    product: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!form.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!form.contact.trim()) {
      setErrorMessage('Please enter your contact number.');
      return;
    }
    if (!form.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(result.message || 'Thank you! We will get back to you shortly.');
        setForm({
          name: '',
          countryCode: form.countryCode,
          contact: '',
          email: '',
          product: '',
          message: '',
        });
      } else {
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Popup form error:', error);
      setErrorMessage('Could not connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setForm({
      name: '',
      countryCode: '+91',
      contact: '',
      email: '',
      product: '',
      message: '',
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={handleReset}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={handleReset} aria-label="Close popup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* LEFT: Image */}
        <div className={styles.imageHalf}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/farmer-popup.webp" alt="Makhana farmer" className={styles.popupImage} />
          <div className={styles.imageOverlay}>
            <h3 className={styles.imageTitle}>Get the Best Price for Premium Makhana</h3>
            <p className={styles.imageSubtitle}>
              Direct from Bihar&apos;s finest farms — wholesale rates, export quality.
            </p>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className={styles.formHalf}>
          <h3 className={styles.formTitle}>Send Your Enquiry</h3>
          <p className={styles.formSubtitle}>Fill in the details and we&apos;ll get back to you within 24 hours.</p>

          {successMessage && (
            <div className={styles.successMsg}>{successMessage}</div>
          )}
          {errorMessage && (
            <div className={styles.errorMsg}>{errorMessage}</div>
          )}

          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Contact */}
          <div className={styles.field}>
            <label className={styles.label}>Contact Number *</label>
            <div className={styles.phoneRow}>
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className={styles.codeSelect}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+49">🇩🇪 +49</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+977">🇳🇵 +977</option>
              </select>
              <input
                type="tel"
                name="contact"
                placeholder="Enter phone number"
                value={form.contact}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Product */}
          <div className={styles.field}>
            <label className={styles.label}>Product</label>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="" disabled>Select product</option>
              <option value="makhana-4">Makhana 4+ Sutta</option>
              <option value="makhana-5">Makhana 5+ Sutta</option>
              <option value="makhana-6">Makhana 6+ Sutta</option>
              <option value="makhana-lite">Phool Makhana Lite</option>
              <option value="custom">Custom Grade / Mix</option>
            </select>
          </div>

          {/* Message */}
          <div className={`${styles.field} ${styles.messageField}`}>
            <label className={styles.label}>Message</label>
            <textarea
              name="message"
              placeholder="Quantity required, special requirements..."
              value={form.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea}`}
              rows={3}
            />
          </div>

          {/* Submit */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Enquiry'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
