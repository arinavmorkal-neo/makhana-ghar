"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
} from "lucide-react";
import styles from "./Footer.module.css";

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
    logo: "/logo.webp",
    description:
      "Makhana Ghar is a global exporter of premium agro products, supplying high-quality Makhana, Cashew, Raisins, and Maize to international markets. With sourcing hubs in India, Thailand, and UAE, we deliver export-grade, ethically sourced food products to global distributors, wholesalers, and importers with consistent quality and reliability.",
    contact: {
      address:
        "Mangal Bazar, Katihar, Bihar 854105",
      phone: "+91 8002661555",
      email: "makhanaghar.marketing@gmail.com",
    },
    socials: [
      { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61590384691167", label: "Facebook" },
      { icon: Instagram, href: "https://www.instagram.com/makhanaghar/", label: "Instagram" },
      { icon: Twitter, href: "https://x.com/makhanaghar", label: "Twitter" },
      { icon: Linkedin, href: "https://www.linkedin.com/in/makhana-ghar-a155ba41a", label: "LinkedIn" },
    ],
  },
  quickLinks: [
    { label: "About Us", href: "/about-us" },
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
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
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
      className={styles.socialBtn}
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
    <div className={styles.linkColumn}>
      <h3 className={styles.colTitle}>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className={styles.footerLink}>
              <ChevronRight size={12} className={styles.chevron} />
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
  const [footerForm, setFooterForm] = useState({ name: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subMessage, setSubMessage] = useState("");

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "name") {
      value = value.replace(/[0-9]/g, "");
    }
    if (name === "contact") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFooterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerForm.name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!footerForm.contact.trim() || footerForm.contact.length < 7) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setSubMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: footerForm.name.trim(),
          countryCode: "+91",
          contact: footerForm.contact.trim(),
          email: "N/A",
          pagePath: window.location.href,
          sourceComponent: "Footer Quick Enquiry",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setSubMessage(result.message || "Thank you! We'll call you back shortly.");
        setFooterForm({ name: "", contact: "" });
        setTimeout(() => {
          setSubmitted(false);
          setSubMessage("");
        }, 5000);
      } else {
        alert(result.error || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Footer form error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { brand, quickLinks, rangeCol1, rangeCol2, legal, copyright } =
    footerData;

  return (
    <footer className={styles.siteFooter}>
      <Image
        src="/grass-green.webp"
        alt=""
        className={styles.footerGrass}
        aria-hidden="true"
        width={1920}
        height={30}
        sizes="100vw"
      />
      {/* ── Top bar ── */}
      <div className={styles.footerTopbar}>
        {/* Brand */}
        <div className={styles.brandArea}>
          <Image
            src="/logo.webp"
            alt="Makhana Ghar"
            className={styles.brandLogoImg}
            width={160}
            height={80}
            loading="lazy"
          />
        </div>

        {/* Tagline */}
        <div className={styles.taglinePill}>{brand.tagline}</div>

        {/* Socials */}
        <div className={styles.socialsGroup}>
          {brand.socials.map((s) => (
            <SocialButton key={s.label} icon={s.icon} href={s.href} label={s.label} />
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className={styles.footerMain}>
        {/* About */}
        <div className={styles.aboutCol}>
          <h3 className={styles.colTitle}>About Us!</h3>
          <p className={styles.aboutDesc}>{brand.description}</p>

          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin size={15} className={styles.contactIcon} />
              <span>{brand.contact.address}</span>
            </li>
            <li className={styles.contactItem}>
              <Phone size={15} className={styles.contactIcon} />
              <span>{brand.contact.phone}</span>
            </li>
            <li className={styles.contactItem}>
              <Mail size={15} className={styles.contactIcon} />
              <span>{brand.contact.email}</span>
            </li>
          </ul>

          {/* Quick Enquiry */}
          {submitted ? (
            <p className={styles.subscribedMsg}>✓ {subMessage}</p>
          ) : (
            <form className={styles.newsletterForm} onSubmit={handleFooterSubmit}>
              <div className={styles.formInputRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  className={styles.newsletterInput}
                  value={footerForm.name}
                  onChange={handleFooterChange}
                  required
                  disabled={loading}
                />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Phone Number*"
                  className={styles.newsletterInput}
                  value={footerForm.contact}
                  onChange={handleFooterChange}
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" className={styles.newsletterBtn} disabled={loading}>
                {loading ? 'Sending...' : 'Get Callback'} <Send size={13} />
              </button>
            </form>
          )}
        </div>

        {/* Quick Links */}
        <FooterLinkList title="Quick Links" links={quickLinks} />

        {/* Our Range col 1 */}
        <FooterLinkList title="Our Range" links={rangeCol1} />

        {/* Our Range col 2 */}
        <div className={styles.rangeCol2}>
          <FooterLinkList title="Our Range" links={rangeCol2} />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.footerBottom}>
        <p className={styles.copyrightText}>
          Copyright © {copyright.year} {copyright.company} by{" "}
          <a href={copyright.builtByHref}>{copyright.builtBy}</a>. All Rights Reserved.
        </p>

        <nav className={styles.legalLinks} aria-label="Legal">
          {legal.map((l, i) => (
            <span key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {i > 0 && <span className={styles.legalSep}>✦</span>}
              <Link href={l.href} className={styles.legalLink}>
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}

