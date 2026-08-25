/**
 * ══════════════════════════════════════════════════════════════
 *  TypeScript types — mirrors the Payload CMS collections
 * ══════════════════════════════════════════════════════════════
 *
 *  Derived from the actual Payload collection configs:
 *    - src/collections/Products.ts
 *    - src/collections/Categories.ts
 *    - src/collections/Enquiries.ts
 *    - src/collections/Blogs.ts
 *    - src/collections/Gallery.ts
 *    - src/collections/Founders.ts
 *    - src/collections/Media.ts
 *    - src/globals/Settings.ts
 */

// ── Media ─────────────────────────────────────────────────
export interface Media {
  id: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  alt?: string;
  createdAt: string;
  updatedAt: string;
}

// ── SEO Fields (shared across collections) ────────────────
export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  primaryKeywords?: string;
  secondaryKeywords?: string;
  metaKeywords?: string;
}

// ── Products ──────────────────────────────────────────────
export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductGalleryImage {
  image?: Media | string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  status: 'published' | 'draft';
  tagline?: string;
  description?: string;
  aboutUs?: string;
  mainImage?: Media | string;
  mainImageUrl?: string;
  galleryImages?: ProductGalleryImage[];
  specs?: ProductSpec[];
  rating?: number;
  reviews?: number;
  grade?: string;
  isOrganic?: boolean;
  seo?: SEOFields;
  createdAt: string;
  updatedAt: string;
}

// ── Categories ────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  status: 'published' | 'draft';
  icon?: string;
  description?: string;
  image?: Media | string;
  imageUrl?: string;
  products?: (Product | string)[];
  order?: number;
  featured?: boolean;
  seo?: SEOFields;
  createdAt: string;
  updatedAt: string;
}

// ── Enquiries ─────────────────────────────────────────────
export type EnquiryStatus = 'new' | 'contacted' | 'in-progress' | 'converted' | 'closed';
export type EnquiryProduct = string;

export interface Enquiry {
  id: string;
  name: string;
  countryCode?: string;
  contact: string;
  email?: string;
  product?: string;
  message?: string;
  status: EnquiryStatus;
  notes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEnquiry {
  name: string;
  countryCode?: string;
  contact: string;
  email?: string;
  product?: string;
  message?: string;
  source?: string;
  sourceComponent?: string;
}

// ── Blogs ─────────────────────────────────────────────────
export interface Blog {
  id: string;
  title: string;
  slug: string;
  status?: 'published' | 'draft';
  date?: string;
  author?: string;
  category?: string;
  image?: Media | string;
  imageUrl?: string;
  excerpt?: string;
  content?: unknown;
  readTime?: string;
  featured?: boolean;
  views?: number;
  tags?: string[];
  seo?: SEOFields;
  createdAt: string;
  updatedAt: string;
}

// ── Gallery ───────────────────────────────────────────────
export interface GalleryItem {
  id: string;
  title?: string;
  image?: Media | string;
  imageUrl?: string;
  category?: string;
  featured?: boolean;
  order?: number;
  status?: 'published' | 'draft';
  caption?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Founders ──────────────────────────────────────────────
export interface Founder {
  id: string;
  name: string;
  title?: string;
  role?: string;
  bio?: string;
  image?: Media | string;
  imageUrl?: string;
  photo?: Media;
  order?: number;
  linkedinUrl?: string;
  twitterUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Settings (Global) ─────────────────────────────────────
export interface Settings {
  siteName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsappNumber?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// ── API Response Types ────────────────────────────────────
export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Array<{ message: string; field?: string }>;
}

// ── Image URL Helper ──────────────────────────────────────
/**
 * Resolves the display URL for a Payload media field.
 * Prioritizes direct URL over uploaded media.
 */
export function resolveImageUrl(
  directUrl?: string,
  media?: Media | string,
  baseUrl?: string,
): string | undefined {
  if (directUrl) return directUrl;
  if (!media) return undefined;
  if (typeof media === 'string') return media;
  if (media.url) {
    if (media.url.startsWith('/') && baseUrl) {
      return `${baseUrl}${media.url}`;
    }
    return media.url;
  }
  return undefined;
}
