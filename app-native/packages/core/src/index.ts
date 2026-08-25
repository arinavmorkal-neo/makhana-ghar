/**
 * Core Package — Public API
 */

// Types
export type {
  Media,
  SEOFields,
  Product,
  ProductSpec,
  ProductGalleryImage,
  Category,
  Enquiry,
  CreateEnquiry,
  EnquiryStatus,
  EnquiryProduct,
  Blog,
  GalleryItem,
  Founder,
  Settings,
  PaginatedResponse,
  ApiError,
} from './types';
export { resolveImageUrl } from './types';

// API Client
export { configureApi, getApiConfig, apiRequest } from './api/client';
export type { ApiClientConfig } from './api/client';

// API Endpoints
export { getProducts, getProductBySlug } from './api/products';
export type { GetProductsOptions } from './api/products';
export { getCategories, getCategoryBySlug } from './api/categories';
export type { GetCategoriesOptions } from './api/categories';
export { submitEnquiry } from './api/enquiries';
export { getBlogs, getBlogBySlug } from './api/blogs';
export type { GetBlogsOptions } from './api/blogs';
export { getGalleryItems } from './api/gallery';
export { getFounders, getSettings } from './api/founders';

// Validation
export {
  isValidPhone,
  isValidEmail,
  isValidName,
  sanitize,
  validateEnquiryForm,
} from './utils/validation';
