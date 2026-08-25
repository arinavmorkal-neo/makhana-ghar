'use client';

import { useState, FormEvent } from 'react';
import styles from './CityPage.module.css';

interface CityFaqItem {
  question: string;
  answer: string;
}

interface CityFaqAccordionProps {
  faqs: CityFaqItem[];
}

export function CityFaqAccordion({ faqs }: CityFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={styles.faqList}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
          >
            <button
              className={`${styles.faqButton} ${isOpen ? styles.faqButtonOpen : ''}`}
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              aria-controls={`city-faq-${idx}`}
              id={`city-faq-btn-${idx}`}
              type="button"
            >
              <span className={styles.faqNumber}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className={styles.faqQuestion}>{faq.question}</span>
              <svg
                className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              id={`city-faq-${idx}`}
              role="region"
              aria-labelledby={`city-faq-btn-${idx}`}
              className={`${styles.faqPanel} ${isOpen ? styles.faqPanelOpen : ''}`}
            >
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface CityQuoteFormProps {
  cityName: string;
}

export function CityQuoteForm({ cityName }: CityQuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    product: 'makhana-4',
    quantity: '50-200 kg',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.phone,
          email: formData.email || 'N/A',
          product: formData.product,
          message: `[City Landing Page - ${cityName}] Estimated Quantity: ${formData.quantity}. ${formData.message ? `Details: ${formData.message}` : ''}`,
          sourceComponent: `City Landing Page (${cityName})`,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : `/makhana-supplier/${cityName.toLowerCase()}`,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          product: 'makhana-4',
          quantity: '50-200 kg',
          message: '',
        });
        setTimeout(() => setSuccess(false), 7000);
      } else {
        alert('Failed to submit enquiry. Please try again or call us directly.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.quoteFormWrap} id="quote-form">
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="quote-name">Your Name *</label>
            <input
              id="quote-name"
              type="text"
              name="name"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="quote-phone">Phone / WhatsApp *</label>
            <input
              id="quote-phone"
              type="tel"
              name="phone"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="quote-email">Email Address</label>
            <input
              id="quote-email"
              type="email"
              name="email"
              placeholder="e.g. buyer@company.com"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="quote-product">Makhana Grade</label>
            <select
              id="quote-product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              className={styles.selectField}
            >
              <option value="makhana-4">Makhana 4+ Sutta (Regular)</option>
              <option value="makhana-5">Makhana 5+ Sutta (Premium)</option>
              <option value="makhana-6">Makhana 6+ Sutta (Jumbo/Export)</option>
              <option value="makhana-lite">Phool Makhana Lite</option>
              <option value="custom">Mixed / Custom Packaging</option>
            </select>
          </div>

          <div className={styles.formFull}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="quote-quantity">Estimated Order Quantity</label>
              <select
                id="quote-quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="50-200 kg">50 kg – 200 kg (Small Wholesale)</option>
                <option value="200-500 kg">200 kg – 500 kg (Standard Wholesale)</option>
                <option value="500kg - 1 Ton">500 kg – 1 Ton (Bulk Order)</option>
                <option value="1+ Tons">1+ Tons (Container / Distributor)</option>
                <option value="Retail Packs / Private Label">Retail Packs / Private Label</option>
              </select>
            </div>
          </div>

          <div className={styles.formFull}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="quote-msg">Delivery Address / Area in {cityName}</label>
              <textarea
                id="quote-msg"
                name="message"
                placeholder={`Mention your delivery location or requirements in ${cityName}...`}
                value={formData.message}
                onChange={handleChange}
                className={styles.textareaField}
              />
            </div>
          </div>

          <div className={styles.formFull}>
            <button
              type="submit"
              disabled={loading}
              className={styles.formSubmitBtn}
            >
              {loading ? 'Submitting Enquiry...' : `Get Wholesale Rates in ${cityName}`}
            </button>
          </div>
        </div>
      </form>

      {success && (
        <div className={styles.successNotice}>
          ✓ Thank you! Our wholesale team will contact you shortly with rates for {cityName}.
        </div>
      )}
    </div>
  );
}
