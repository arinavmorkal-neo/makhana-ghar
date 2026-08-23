/**
 * ══════════════════════════════════════════════════════════════
 *  Makhana Ghar — Design Tokens
 * ══════════════════════════════════════════════════════════════
 *
 *  Single source of truth for every visual token used across
 *  the Next.js website AND the React Native mobile app.
 *
 *  Extracted from the live website CSS (globals.css, Hero, Header,
 *  ProductSection, Footer, EnquiryPopup, MobileNavBar modules).
 *
 *  USAGE
 *  ─────
 *  Web  → import { colors } from '@makhana-ghar/design-system'
 *         then map to CSS custom properties or inline styles.
 *  RN   → import { colors } from '@makhana-ghar/design-system'
 *         then use directly in StyleSheet.create({}).
 * ══════════════════════════════════════════════════════════════
 */

// ── Colors ────────────────────────────────────────────────
export const colors = {
  // Brand primaries
  primary:      '#2d7a27',   // --color-primary  (green CTA, nav hover)
  primaryDark:  '#1a3a1a',   // hero content bg, submit buttons, header CTA
  primaryDeep:  '#1e3d1a',   // topbar bg, header CTA bg
  primaryLight: '#2d5a27',   // hover state for primary buttons
  primaryDim:   'rgba(45,122,39,0.08)', // --color-primary-dim

  accent:       '#F5C800',   // golden CTA, badge, hero button, product highlights
  accentHover:  '#ffd600',   // accent hover state
  accentMuted:  '#f5c518',   // footer social, links
  accentWarm:   '#f5c842',   // hero tag text, dots
  accentSoft:   '#f0c02a',   // --color-accent, promo link

  // Background surfaces
  bg:           '#f5f8f4',   // --color-bg (page background)
  surface:      '#ffffff',   // --color-surface (cards, main nav)
  surfaceDark:  '#0d2d1a',   // footer background
  heroBg:       '#1a2e12',   // hero section background

  // Text
  text:         '#1a2e19',   // --color-text (primary body text)
  textDark:     '#1a2e12',   // headings, section titles
  textNav:      '#2a3d28',   // nav links, drawer links
  textMuted:    '#5a7a58',   // --color-muted (secondary text)
  textSubtle:   '#888888',   // form subtitles
  textLight:    'rgba(255,255,255,0.80)', // body copy on dark bg
  textFooter:   'rgba(255,255,255,0.70)', // footer body text
  textDisabled: 'rgba(255,255,255,0.40)', // copyright, placeholders on dark

  // Borders
  border:       '#dce8da',   // --color-border, input borders
  borderLight:  '#e2ede0',   // dropdown border, hamburger border
  borderFooter: 'rgba(255,255,255,0.15)', // footer dividers

  // Status / Feedback
  success:      '#2e7d32',   // focus ring, success messages
  successBg:    '#e8f5e9',   // success message background
  successBorder:'#a5d6a7',   // success border
  error:        '#d32f2f',   // error messages
  errorBg:      '#fbe9e7',   // error message background
  errorBorder:  '#ffcdd2',   // error border

  // Misc
  white:        '#ffffff',
  black:        '#000000',
  whatsapp:     '#25D366',   // WhatsApp CTA
  whatsappDark: '#128C7E',   // WhatsApp hover
  overlay:      'rgba(0,0,0,0.6)',     // modal backdrop
  cardOverlay:  'rgba(10,10,10,0.92)', // product card hover panel
  topBarText:   '#c8d8c4',   // top bar text color
  chevron:      '#7a9a78',   // nav chevron color
  inputBg:      '#fafdf9',   // form input background
} as const;


// ── Typography ────────────────────────────────────────────
export const typography = {
  // Font families — these map to CSS variables on web
  // and to loaded fonts on React Native
  families: {
    brand:    { web: "var(--font-farmhame), Georgia, serif",       rn: 'Farmhouse' },
    body:     { web: "var(--font-inter), system-ui, sans-serif",   rn: 'Inter' },
    heading:  { web: "var(--font-poppins), sans-serif",            rn: 'Poppins' },
    display:  { web: "'Little', 'Bebas Neue', sans-serif",         rn: 'BebasNeue' },
    accent:   { web: "var(--font-caveat), cursive",                rn: 'Caveat' },
    serif:    { web: "var(--font-playfair), serif",                rn: 'PlayfairDisplay' },
    ui:       { web: "var(--font-dm-sans), sans-serif",            rn: 'DMSans' },
    subtitle: { web: "var(--font-nunito), sans-serif",             rn: 'Nunito' },
  },

  // Font sizes (px on web, direct number on RN)
  sizes: {
    xs:    10,
    sm:    11,
    base:  13,
    md:    14,
    body:  16,
    lg:    18,
    xl:    20,
    '2xl': 22,
    '3xl': 26,
    '4xl': 28,
    '5xl': 36,
    '6xl': 40,
    '7xl': 48,
  },

  // Font weights
  weights: {
    light:    '300' as const,
    regular:  '400' as const,
    medium:   '500' as const,
    semibold: '600' as const,
    bold:     '700' as const,
    extrabold:'800' as const,
    black:    '900' as const,
  },

  // Line heights
  lineHeights: {
    tight:   1.0,
    snug:    1.15,
    normal:  1.5,
    relaxed: 1.6,
    loose:   1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight:  -0.5,
    normal: 0,
    wide:   0.2,
    wider:  0.4,
    widest: 1.5,
  },
} as const;


// ── Spacing ───────────────────────────────────────────────
// 4px base unit scale
export const spacing = {
  0:   0,
  1:   4,
  2:   8,
  3:   12,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  9:   36,
  10:  40,
  12:  48,
  14:  56,
  16:  64,
  20:  80,
  24:  96,
} as const;


// ── Border Radius ─────────────────────────────────────────
export const radii = {
  none:  0,
  xs:    4,    // social link, tag pill
  sm:    6,    // buttons, CTA, inputs
  md:    8,    // inputs, dropdowns, cards
  lg:    10,   // submit buttons, panels
  xl:    14,   // mobile cards
  '2xl': 16,   // mobile modal
  '3xl': 20,   // desktop modal, tag pills
  full:  50,   // pill buttons, dots, circles
  round: 9999, // fully round
} as const;


// ── Shadows ───────────────────────────────────────────────
export const shadows = {
  // Web format: string
  // RN format: { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }
  none: {
    web: 'none',
    rn: { shadowColor: 'transparent', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
  },
  sm: {
    web: '0 2px 8px rgba(0,0,0,0.05)',
    rn: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  },
  md: {
    web: '0 4px 16px rgba(0,0,0,0.12)',
    rn: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 4 },
  },
  lg: {
    web: '0 10px 36px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
    rn: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 36, elevation: 8 },
  },
  xl: {
    web: '0 24px 80px rgba(0,0,0,0.25)',
    rn: { shadowColor: '#000', shadowOffset: { width: 0, height: 24 }, shadowOpacity: 0.25, shadowRadius: 80, elevation: 12 },
  },
  nav: {
    web: '0 -4px 20px rgba(0,0,0,0.08)',
    rn: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 6 },
  },
  cta: {
    web: '0 4px 16px rgba(30,61,26,0.35)',
    rn: { shadowColor: '#1e3d1a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6 },
  },
  card: {
    web: '0 10px 36px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)',
    rn: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 36, elevation: 8 },
  },
  callButton: {
    web: '0 4px 16px rgba(26,46,18,0.35)',
    rn: { shadowColor: '#1a2e12', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6 },
  },
} as const;


// ── Animation / Easing ────────────────────────────────────
export const animation = {
  durations: {
    fast:    150,
    normal:  250,
    slow:    400,
    slower:  600,
    slowest: 1000,
  },
  easings: {
    default:  'ease',
    inOut:    'ease-in-out',
    outExpo:  'cubic-bezier(0.16, 1, 0.3, 1)',     // --ease-out-expo
    spring:   'cubic-bezier(0.34, 1.56, 0.64, 1)',  // card hover bounce
    smooth:   'cubic-bezier(0.4, 0, 0.2, 1)',       // mobile nav slide
  },
} as const;


// ── Layout ────────────────────────────────────────────────
export const layout = {
  maxWidth:    1280,  // --section-max
  navHeight:   102,   // --nav-height (38px topbar + 64px main)
  topBarH:     38,
  mainNavH:    64,
  mobileNavH:  56,    // bottom tab bar height
  tabBarIconW: 28,
  tabBarIconH: 28,
} as const;


// ── Component Specs ───────────────────────────────────────
// Specifications for common UI components to ensure visual
// consistency across platforms.

export const componentSpecs = {
  button: {
    primary: {
      bg: colors.primaryDeep,
      color: colors.white,
      hoverBg: colors.primaryLight,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      paddingV: spacing[3],    // 12
      paddingH: spacing[5],    // 20
      borderRadius: radii.sm,  // 6
      letterSpacing: 0.02,
    },
    accent: {
      bg: colors.accent,
      color: colors.textDark,
      hoverBg: colors.accentHover,
      fontSize: typography.sizes.base, // 13
      fontWeight: typography.weights.bold,
      paddingV: spacing[3],
      paddingH: spacing[5],
      borderRadius: radii.full, // 50 (pill)
    },
    whatsapp: {
      bg: colors.whatsapp,
      color: colors.white,
      hoverBg: colors.whatsappDark,
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.bold,
      paddingV: spacing[3],
      paddingH: spacing[5],
      borderRadius: radii.full,
    },
    submit: {
      bg: colors.primaryDark,
      color: colors.white,
      hoverBg: colors.primaryLight,
      fontSize: typography.sizes.md,    // 14 (0.88rem)
      fontWeight: typography.weights.bold,
      paddingV: spacing[3],
      paddingH: spacing[5],
      borderRadius: radii.lg, // 10
    },
  },

  input: {
    bg: colors.inputBg,
    color: colors.primaryDark,
    placeholderColor: '#aaa',
    borderColor: colors.border,
    focusBorderColor: colors.success,
    focusRingColor: 'rgba(46,125,50,0.1)',
    fontSize: typography.sizes.base, // ~13px (0.82rem)
    paddingV: spacing[3],           // 12
    paddingH: spacing[4],           // 16 (14px)
    borderRadius: radii.md,         // 8
    borderWidth: 1.5,
  },

  card: {
    bg: colors.surface,
    borderRadius: radii.md,        // 7 on desktop, 14 on mobile
    borderRadiusMobile: radii.xl,  // 14
    shadow: shadows.card,
    hoverTranslateY: -14,
    hoverScale: 1.04,
  },

  productCard: {
    maxWidth: 270,
    hoverPanelBg: colors.cardOverlay,
    hoverPanelBlur: 8,
    nameColor: colors.accent,
    nameFontSize: typography.sizes.body, // 16
    nameFontWeight: typography.weights.bold,
    descColor: '#ccc',
    descFontSize: typography.sizes.sm,   // 11
    tagBg: 'rgba(245,200,0,0.12)',
    tagBorder: 'rgba(245,200,0,0.35)',
    tagColor: colors.accent,
    tagFontSize: 9,
    mobileBarBg: 'rgba(26,46,18,0.92)',
    mobileNameColor: colors.white,
    mobileNameFontSize: typography.sizes.sm,
    mobileBtnBg: colors.accent,
    mobileBtnColor: colors.textDark,
  },

  header: {
    topBarBg: colors.primaryDeep,
    topBarColor: colors.topBarText,
    topBarH: layout.topBarH,
    mainNavBg: colors.surface,
    mainNavH: layout.mainNavH,
    logoHeight: 95,
    navLinkColor: colors.textNav,
    navLinkHoverColor: colors.primary,
    navFontSize: typography.sizes.md,   // 14 (0.875rem)
    navFontWeight: typography.weights.medium,
    dropdownBg: colors.surface,
    dropdownBorder: '#e2ede0',
    dropdownAccent: colors.primary,
  },

  footer: {
    bg: colors.surfaceDark,
    textColor: colors.textFooter,
    headingColor: colors.white,
    accentColor: colors.accentMuted,
    linkHoverColor: colors.accentMuted,
    socialBtnBg: colors.accentMuted,
    socialBtnColor: colors.surfaceDark,
    inputBg: 'rgba(255,255,255,0.08)',
    inputBorder: 'rgba(255,255,255,0.15)',
  },

  tabBar: {
    bg: colors.surface,
    borderColor: '#e8e8e8',
    inactiveColor: '#666666',
    activeColor: colors.textDark,
    highlightBg: colors.textDark,
    highlightColor: colors.white,
    highlightSize: 46,
    highlightBorderRadius: 23,
    labelFontSize: typography.sizes.xs,  // 10
    labelFontWeight: typography.weights.medium,
  },

  enquiryForm: {
    modalBg: colors.surface,
    modalBorderRadius: radii['3xl'], // 20
    modalBorderRadiusMobile: radii['2xl'], // 16
    imageTitleFontSize: typography.sizes.xl,  // 20 (1.3rem)
    formTitleFontSize: typography.sizes.xl,
    formTitleColor: colors.primaryDark,
    labelFontSize: typography.sizes.sm,       // 12 (0.75rem)
    labelColor: '#555555',
    labelFontWeight: typography.weights.semibold,
  },
} as const;
