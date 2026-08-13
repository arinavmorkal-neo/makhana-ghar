"use client";

import { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from "./ThirdSection.module.css";

/* ─── Inline SVG icons ─── */
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/* ─── Static data ─── */
const iconPaths: Record<string, React.ReactNode> = {
  natural: (
    <>
      <path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10z" />
      <path d="M11.6 3C10 7 11 13 14 14s9-1 9-6c-2 1-6 1-11.4-5z" />
      <path d="M11 20c0-5.5 3-9 9-10" />
    </>
  ),
  certified: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bulk: (
    <>
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </>
  ),
  pricing: (
    <>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </>
  ),
};

const defaultFeatures = [
  { title: "100% Natural", sub: "No chemical processing", iconType: "natural" },
  { title: "FSSAI Certified", sub: "Export-grade quality", iconType: "certified" },
  { title: "Bulk Delivery", sub: "Pan-India & worldwide", iconType: "bulk" },
  { title: "Wholesale Pricing", sub: "Best rates guaranteed", iconType: "pricing" },
];

const trust = [
  { label: "Secure & Private", icon: "🔒" },
  { label: "24hr Response", icon: "⏱" },
  { label: "500+ Clients", icon: "⭐" },
];

export default function ThirdSection({ data }: { data?: any }) {
  const tagline = data?.tagline || "We are your trusted partner for bulk natural produce.";
  const headline = data?.headline || "Premium quality";
  const headlineAccent = data?.headlineAccent || "Makhana";
  const bodyText1 = data?.bodyText1 || "At our farms in Bihar, every makhana seed is carefully harvested from natural ponds, hand-popped, and sun-dried to preserve its authentic crunch, rich nutrition, and earthy flavor — just like nature intended.";
  const bodyText2 = data?.bodyText2 || "From 4+ Sutta to premium 6+ Sutta grades, we supply every variant for retail brands, FMCG companies, and health food businesses — with consistent quality, competitive pricing, and on-time delivery.";
  const ctaText = data?.ctaText || "Explore Our Products";
  const ctaHref = data?.ctaHref || "#products";

  const features = data?.features && data.features.length > 0
    ? data.features.map((f: any) => ({
        title: f.title,
        sub: f.sub,
        iconType: f.iconType || "natural",
      }))
    : defaultFeatures;

  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    contact: "",
    email: "",
    product: "",
    message: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let { name, value } = e.target;
    
    if (name === 'name') {
      value = value.replace(/[0-9]/g, '');
    }
    
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value: string, country: any) => {
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

    // Front-end validation
    if (!form.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!form.contact.trim()) {
      setErrorMessage("Please enter your contact number.");
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setErrorMessage("Please enter a valid email address containing @.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, pagePath: window.location.href, sourceComponent: 'Get a Quote' }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage(result.message || "Thank you! We will get back to you shortly.");
        // Clear form fields
        setForm({
          name: "",
          countryCode: form.countryCode,
          contact: "",
          email: "",
          product: "",
          message: "",
        });
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      {/* ── LEFT COLUMN ── */}
      <div className={styles.leftCol}>
        <p className={styles.tagline}>
          {tagline}
        </p>

        <h2 className={styles.headline}>
          {headline}{" "}
          <span className={styles.headlineAccent}>{headlineAccent}</span>{" "}
          sourced directly from Bihar&apos;s finest farms.
        </h2>

        <p className={styles.bodyText}>
          {bodyText1}
        </p>

        <p className={styles.bodyText}>
          {bodyText2}
        </p>

        {/* Feature grid */}
        <div className={styles.featuresGrid}>
          {features.map((f: any) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {iconPaths[f.iconType] || iconPaths.natural}
                </svg>
              </div>
              <div>
                <strong className={styles.featureTitle}>{f.title}</strong>
                <span className={styles.featureSub}>{f.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <a href={ctaHref} className={styles.ctaBtn}>
          {ctaText}
          <span className={styles.ctaArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>

      {/* ── RIGHT COLUMN — FORM CARD ── */}
      <div className={styles.rightCol}>
        <div className={styles.formCard}>
          <h3 className={styles.cardTitle}>Get a Quote?</h3>
          <p className={styles.cardSub}>
            Submit Your Enquiry For Makhana Bulk Orders
          </p>

          {successMessage ? (
            <div className={styles.successMessage} style={{ margin: '40px 0' }}>
              ✓ {successMessage}
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}

              {/* Name */}
              <div className={styles.inputWrap}>
                <UserIcon />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name*"
                  value={form.name}
                  onChange={handleChange}
                  className={styles.fieldInput}
                />
              </div>

              {/* Contact with auto-detect country code */}
              <div className={styles.inputWrap}>
                <div className={styles.phoneInputWrap} style={{ color: '#000' }}>
                  <PhoneInput
                    country={defaultCountry}
                    value={`${form.countryCode.replace('+', '')}${form.contact}`}
                    onChange={handlePhoneChange}
                    inputStyle={{ width: '100%', height: '42px', borderRadius: '4px', border: '1px solid #ccc', paddingLeft: '48px' }}
                    buttonStyle={{ borderRadius: '4px 0 0 4px', border: '1px solid #ccc', backgroundColor: '#f8f9fa' }}
                    enableSearch={true}
                    disableSearchIcon={true}
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.inputWrap}>
                <MailIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email*"
                  value={form.email}
                  onChange={handleChange}
                  className={styles.fieldInput}
                />
              </div>

              {/* Product select */}
              <div className={styles.inputWrap}>
                <PackageIcon />
                <select
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  className={`${styles.fieldInput} ${styles.fieldSelect}`}
                >
                  <option value="" disabled>
                    Select Product*
                  </option>
                  <option value="makhana-4">Makhana 4+ Sutta</option>
                  <option value="makhana-5">Makhana 5+ Sutta</option>
                  <option value="makhana-6">Makhana 6+ Sutta</option>
                  <option value="makhana-lite">Phool Makhana Lite</option>
                  <option value="custom">Custom Grade / Mix</option>
                </select>
              </div>

              {/* Message */}
              <div className={`${styles.inputWrap} ${styles.inputWrapTop}`}>
                <MessageIcon />
                <textarea
                  name="message"
                  placeholder="Your Message / Quantity Required..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${styles.fieldInput} ${styles.fieldTextarea}`}
                  rows={3}
                />
              </div>

              {/* Submit */}
              <button 
                className={styles.submitBtn} 
                onClick={handleSubmit} 
                disabled={loading}
                style={loading ? { opacity: 0.8, cursor: 'not-allowed' } : undefined}
              >
                {loading ? "Submitting..." : "Submit & Get Callback"}
                <span className={styles.submitArrow}>
                  {loading ? (
                    <svg 
                      viewBox="0 0 50 50" 
                      style={{ 
                        width: 16, 
                        height: 16, 
                        animation: `${styles.spin} 1s linear infinite` || 'spin 1s linear infinite' 
                      }}
                    >
                      <circle 
                        cx="25" 
                        cy="25" 
                        r="20" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="5" 
                        strokeDasharray="31.4"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
