'use client';

import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    
    if (name === 'name') {
      value = value.replace(/[0-9]/g, '');
    }
    
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value: string, country: any) => {
    // value is the full phone number string (e.g. "919876543210")
    // country.dialCode is "91"
    const dialCode = country.dialCode;
    const contact = value.slice(dialCode.length);
    setForm(prev => ({
      ...prev,
      countryCode: `+${dialCode}`,
      contact: contact
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!form.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!form.contact.trim()) {
      setErrorMessage('Please enter a valid contact number.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setErrorMessage('Please enter a valid email address containing @.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pagePath: window.location.href, sourceComponent: 'Enquiry Popup' }),
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
            <div className={styles.phoneRow} style={{ color: '#000' }}>
              <PhoneInput
                country={defaultCountry}
                value={`${form.countryCode.replace('+', '')}${form.contact}`}
                onChange={handlePhoneChange}
                inputStyle={{ width: '100%', height: '42px', borderRadius: '4px', border: '1px solid #ccc' }}
                buttonStyle={{ borderRadius: '4px 0 0 4px', border: '1px solid #ccc', backgroundColor: '#f8f9fa' }}
                enableSearch={true}
                disableSearchIcon={true}
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
