"use client";

import { useState } from "react";
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

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 10a19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.61 5.61l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 15z" />
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    if (!form.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, pagePath: window.location.href }),
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

          {successMessage && (
            <div className={styles.successMessage}>
              {successMessage}
            </div>
          )}

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

          {/* Contact with country code */}
          <div className={styles.inputWrap}>
            <PhoneIcon />
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className={styles.countrySelect}
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+966">🇸🇦 +966</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+81">🇯🇵 +81</option>
              <option value="+86">🇨🇳 +86</option>
              <option value="+880">🇧🇩 +880</option>
              <option value="+977">🇳🇵 +977</option>
              <option value="+92">🇵🇰 +92</option>
              <option value="+94">🇱🇰 +94</option>
            </select>
            <span className={styles.codeDivider} />
            <input
              type="tel"
              name="contact"
              placeholder="Enter Contact Number*"
              value={form.contact}
              onChange={handleChange}
              className={styles.fieldInput}
            />
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
        </div>
      </div>
    </section>
  );
}
