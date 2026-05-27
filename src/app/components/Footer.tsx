"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
} from "lucide-react";

// Brand SVG Icons to prevent export mismatches across lucide-react versions
const Facebook = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const Linkedin = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const footerData = {
  brand: {
    name: "Makhana Ghar",
    tagline: "Best Makhana Manufacturing Company",
    logo: "/logo.png", // replace with your logo path
    description:
      "Makhana Ghar is a global exporter of premium agro products, supplying high-quality Makhana, Cashew, Raisins, and Maize to international markets. With sourcing hubs in India, Thailand, and UAE, we deliver export-grade, ethically sourced food products to global distributors, wholesalers, and importers with consistent quality and reliability.",
    contact: {
      address:
        "Mangal Bazar, Katihar, Bihar 854105",
      phone: "+91 7903195957",
      email: "makhanaghar.marketing@gmail.com",
    },
    socials: [
      { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61590384691167", label: "Facebook" },
      { icon: Instagram, href: "#", label: "Instagram" },
      { icon: Twitter, href: "#", label: "Twitter" },
      { icon: Linkedin, href: "#", label: "LinkedIn" },
    ],
  },
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ's", href: "/faqs" },
    { label: "Become Distributor", href: "/distributor" },
  ],
  rangeCol1: [
    { label: "Baal Bhog Makhana Flake", href: "#" },
    { label: "Top Fox Round Makhana Flake", href: "#" },
    { label: "4 Suta Round Makhana Flake", href: "#" },
    { label: "White Plain Makhana Flake", href: "#" },
  ],
  rangeCol2: [
    { label: "16.5mm Makhana Flake", href: "#" },
    { label: "12.7mm Plain Makhana Flake", href: "#" },
    { label: "Makhana Flake", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-&-Conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
  copyright: {
    year: 2026,
    company: "Makhana Ghar",
    builtBy: "Arinav",
    builtByHref: "#",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SocialButton({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="social-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={16} strokeWidth={2} />
    </a>
  );
}

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="link-column">
      <h3 className="col-title">{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="footer-link">
              <ChevronRight size={12} className="chevron" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subMessage, setSubMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setSubMessage("");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubscribed(true);
        setSubMessage(result.message || "Thanks for subscribing!");
        setEmail("");
        setTimeout(() => {
          setSubscribed(false);
          setSubMessage("");
        }, 5000);
      } else {
        alert(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { brand, quickLinks, rangeCol1, rangeCol2, legal, copyright } =
    footerData;

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@400;700&display=swap');

        :root {
          --green-900: #0d2d1a;
          --green-800: #14421f;
          --green-700: #1a5428;
          --green-600: #1e6630;
          --gold:       #f5c518;
          --gold-hover: #e6b800;
          --white:      #ffffff;
          --white-70:   rgba(255,255,255,0.70);
          --white-40:   rgba(255,255,255,0.40);
          --white-15:   rgba(255,255,255,0.15);
          --white-08:   rgba(255,255,255,0.08);
        }

        /* ── Footer shell ── */
        .site-footer {
          background: var(--green-900);
          font-family: 'DM Sans', sans-serif;
          color: var(--white-70);
          position: relative;
          overflow: visible;
        }

        .footer-grass {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
          display: block;
          margin-top: -15px;
          z-index: 10;
          pointer-events: none;
        }

        /* faint leaf watermark */
        .site-footer::before {
          content: '';
          position: absolute;
          right: -60px;
          bottom: 0;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, var(--green-700) 0%, transparent 70%);
          opacity: .35;
          pointer-events: none;
        }

        /* ── Top bar ── */
        .footer-topbar {
          border-bottom: 1px dashed var(--white-15);
          padding: 22px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .brand-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo-img {
          height: 80px;
          width: auto;
          display: block;
        }

        .brand-logo-box {
          width: 52px;
          height: 52px;
          background: var(--white-08);
          border: 1px solid var(--white-15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: var(--gold);
          font-weight: 700;
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--white);
          line-height: 1.1;
        }
        .brand-name span { color: var(--gold); }

        .brand-sub {
          font-size: 11px;
          letter-spacing: .06em;
          color: var(--white-40);
          text-transform: uppercase;
        }

        .tagline-pill {
          font-family: 'Caveat', cursive;
          font-size: 26px;
          font-weight: 700;
          color: var(--gold);
        }

        .socials-group {
          display: flex;
          gap: 10px;
        }

        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--gold);
          color: var(--green-900);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .2s, transform .2s;
          text-decoration: none;
        }
        .social-btn:hover {
          background: var(--gold-hover);
          transform: translateY(-2px);
        }

        /* ── Main grid ── */
        .footer-main {
          padding: 48px 60px 36px;
          display: grid;
          grid-template-columns: 2fr 1fr 1.4fr 1.4fr;
          gap: 40px;
        }

        /* About column */
        .about-col {}

        .col-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--white);
          margin: 0 0 12px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--gold);
          display: inline-block;
        }

        .about-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--white-70);
          margin: 0 0 24px;
        }

        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0 0 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 13px;
          line-height: 1.6;
          color: var(--white-70);
        }

        .contact-icon {
          color: var(--gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Newsletter */
        .newsletter-form {
          display: flex;
          gap: 0;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--white-15);
        }

        .newsletter-input {
          flex: 1;
          background: var(--white-08);
          border: none;
          outline: none;
          padding: 10px 14px;
          font-size: 13px;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
        }
        .newsletter-input::placeholder { color: var(--white-40); }

        .newsletter-btn {
          background: var(--gold);
          color: var(--green-900);
          border: none;
          cursor: pointer;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: background .2s;
          white-space: nowrap;
        }
        .newsletter-btn:hover { background: var(--gold-hover); }

        .subscribed-msg {
          font-size: 13px;
          color: var(--gold);
          padding: 10px 0;
        }

        /* Link columns */
        .link-column {
          min-width: 0;
        }

        .link-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: var(--white-70);
          text-decoration: none;
          transition: color .18s, gap .18s;
        }
        .footer-link:hover {
          color: var(--gold);
          gap: 8px;
        }
        .chevron {
          flex-shrink: 0;
          opacity: .5;
          transition: opacity .18s;
        }
        .footer-link:hover .chevron { opacity: 1; }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px dashed var(--white-15);
          padding: 18px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .copyright-text {
          font-size: 13px;
          color: var(--white-40);
        }

        .copyright-text a {
          color: var(--gold);
          text-decoration: none;
          font-weight: 500;
        }
        .copyright-text a:hover { text-decoration: underline; }

        .legal-links {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }

        .legal-link {
          font-size: 12.5px;
          color: var(--white-40);
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color .18s, background .18s;
        }
        .legal-link:hover {
          color: var(--gold);
          background: var(--white-08);
        }

        .legal-sep {
          color: var(--white-15);
          font-size: 12px;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            padding: 40px 40px 28px;
          }
          .footer-topbar { padding: 18px 40px; }
          .footer-bottom { padding: 16px 40px; }
        }

        @media (max-width: 700px) {
          .footer-grass {
            margin-top: -4.5px;
          }
          .footer-main {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 20px;
            padding: 32px 24px 24px;
          }
          .about-col {
            grid-column: span 2;
          }
          .range-col-2 {
            display: none;
          }
          .footer-topbar {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 24px;
          }
          .tagline-pill { font-size: 13px; }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            padding: 14px 24px;
          }
        }
      `}</style>

      <footer className="site-footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/grass-green.webp"
          alt=""
          className="footer-grass"
          aria-hidden="true"
        />
        {/* ── Top bar ── */}
        <div className="footer-topbar">
          {/* Brand */}
          <div className="brand-area">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Makhana Ghar"
              className="brand-logo-img"
            />
          </div>

          {/* Tagline */}
          <div className="tagline-pill">{brand.tagline}</div>

          {/* Socials */}
          <div className="socials-group">
            {brand.socials.map((s) => (
              <SocialButton key={s.label} icon={s.icon} href={s.href} label={s.label} />
            ))}
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="footer-main">
          {/* About */}
          <div className="about-col">
            <h3 className="col-title">About Us!</h3>
            <p className="about-desc">{brand.description}</p>

            <ul className="contact-list">
              <li className="contact-item">
                <MapPin size={15} className="contact-icon" />
                <span>{brand.contact.address}</span>
              </li>
              <li className="contact-item">
                <Phone size={15} className="contact-icon" />
                <span>{brand.contact.phone}</span>
              </li>
              <li className="contact-item">
                <Mail size={15} className="contact-icon" />
                <span>{brand.contact.email}</span>
              </li>
            </ul>

            {/* Newsletter */}
            {subscribed ? (
              <p className="subscribed-msg">✓ {subMessage}</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email address*"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <button type="submit" className="newsletter-btn" disabled={loading}>
                  {loading ? 'Subscribing...' : 'Subscribe Now!'} <Send size={13} />
                </button>
              </form>
            )}
          </div>

          {/* Quick Links */}
          <FooterLinkList title="Quick Links" links={quickLinks} />

          {/* Our Range col 1 */}
          <FooterLinkList title="Our Range" links={rangeCol1} />

          {/* Our Range col 2 */}
          <div className="range-col-2">
            <FooterLinkList title="Our Range" links={rangeCol2} />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="copyright-text">
            Copyright © {copyright.year} {copyright.company} by{" "}
            <a href={copyright.builtByHref}>{copyright.builtBy}</a>. All Rights Reserved.
          </p>

          <nav className="legal-links" aria-label="Legal">
            {legal.map((l, i) => (
              <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {i > 0 && <span className="legal-sep">✦</span>}
                <Link href={l.href} className="legal-link">
                  {l.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
