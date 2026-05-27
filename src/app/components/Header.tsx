'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import EnquiryPopup from './EnquiryPopup';

/* ── Nav data ────────────────────────────────────────── */
type NavLink = { label: string; href: string; dropdown?: string[] };

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact-us' },
];

/* ── Dropdown ────────────────────────────────────────── */
function DropdownMenu({ items }: { items: string[] }) {
  return (
    <ul className={styles.dropdown} role="menu">
      {items.map(item => (
        <li key={item} role="menuitem">
          <a href="#" className={styles.dropdownItem}>{item}</a>
        </li>
      ))}
    </ul>
  );
}

/* ── NavItem ─────────────────────────────────────────── */
function NavItem({ link }: { link: (typeof navLinks)[0] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const hasDropdown = !!link.dropdown;

  return (
    <li
      ref={ref}
      className={`${styles.navItem} ${hasDropdown ? styles.hasDropdown : ''} ${open ? styles.dropdownOpen : ''}`}
      onMouseEnter={() => hasDropdown && setOpen(true)}
      onMouseLeave={() => hasDropdown && setOpen(false)}
    >
      <a
        href={link.href}
        className={styles.navLink}
        aria-haspopup={hasDropdown ? 'true' : undefined}
        aria-expanded={hasDropdown ? open : undefined}
        onClick={() => hasDropdown && setOpen(v => !v)}
      >
        {link.label}
        {hasDropdown && (
          <svg className={`${styles.chevron} ${open ? styles.chevronUp : ''}`}
            width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </a>
      {hasDropdown && open && <DropdownMenu items={link.dropdown!} />}
    </li>
  );
}

/* ══════════════════════════════════════════════════════
   Header — complete rewrite
   Structure:
     headerWrapper (position: relative)
       └─ header (sticky)
            ├─ Top bar
            ├─ Main nav
            └─ Mobile drawer
       └─ decorative strip (position: absolute, overlaps below header)
═══════════════════════════════════════════════════════ */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className={styles.headerWrapper}>

      <header className={styles.headerRoot} id="site-header">

        {/* ══ TOP BAR ══ */}
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>

            {/* promo text */}
            <p className={styles.topPromo}>
              Wholesale prices for bulk buyers.&nbsp;
              <a href="#contact" className={styles.topPromoLink}>Quick Quote</a>
            </p>

            {/* contact */}
            <div className={styles.topContacts}>
              <a href="tel:+917903195957" className={styles.topContact}>
                <span className={styles.contactIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                +91 7903 19 5957
              </a>

              <span className={styles.topDivider} />

              <a href="mailto:makhanaghar.marketing@gmail.com" className={styles.topContact}>
                <span className={styles.contactIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                </span>
                makhanaghar.marketing@gmail.com
              </a>
            </div>

            {/* social icons */}
            <div className={styles.topSocials}>
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61590384691167', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { label: 'Instagram', href: '#', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2z' },
                { label: 'Twitter', href: '#', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'LinkedIn', href: '#', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map(({ label, href, path }) => (
                <a key={label} href={href} aria-label={label} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MAIN NAV ══ */}
        <div className={styles.mainNav}>
          <div className={styles.mainNavInner}>

            {/* Logo */}
            <a href="/" className={styles.logo} aria-label="Makhana Shop – home">
              <Image
                src="/logo.png"
                alt="Makhana Shop logo"
                width={160}
                height={56}
                priority
                className={styles.logoImg}
              />
            </a>

            {/* Desktop nav */}
            <nav className={styles.nav} aria-label="Primary navigation">
              <ul className={styles.navList} role="list">
                {navLinks.map(link => (
                  <NavItem key={link.label} link={link} />
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <button
              type="button"
              className={styles.cta}
              id="header-enquiry-btn"
              onClick={() => setPopupOpen(true)}
            >
              Send Enquiry
              <span className={styles.ctaIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              id="mobile-menu-btn"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* ══ MOBILE DRAWER ══ */}
        <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`} aria-hidden={!mobileOpen}>
          <ul className={styles.drawerList} role="list">
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} className={styles.drawerLink} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={styles.drawerCta}
                onClick={() => { setMobileOpen(false); setPopupOpen(true); }}
              >
                Send Enquiry
              </button>
            </li>
          </ul>
        </div>


        {/* ══ DECORATIVE ROUGH PAPER EDGE ══ */}
        <div className={styles.headerEdge} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/page-title-top.webp"
            alt=""
            className={styles.headerEdgeImg}
          />
        </div>

      </header>

      <EnquiryPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
