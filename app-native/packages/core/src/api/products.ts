/**
 * Products API — Payload CMS collection: "products"
 */
import { apiRequest } from './client';
import type { Product, PaginatedResponse } from '../types';

export interface GetProductsOptions {
  status?: 'published' | 'draft';
  limit?: number;
  page?: number;
  sort?: string;
  depth?: number;
}

/**
 * Fetch all products with optional filtering.
 * Defaults to published products only.
 */
export async function getProducts(
  options: GetProductsOptions = {},
): Promise<PaginatedResponse<Product>> {
  const { status = 'published', limit = 50, page = 1, sort = 'name', depth = 2 } = options;

  const params: Record<string, string | number | boolean> = {
    limit,
    page,
    sort,
    depth,
  };

  if (status) {
    params['where[status][equals]'] = status;
  }

  return apiRequest<PaginatedResponse<Product>>('/products', { params });
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await apiRequest<PaginatedResponse<Product>>('/products', {
    params: {
      'where[slug][equals]': slug,
      'where[status][equals]': 'published',
      limit: 1,
      depth: 2,
    },
  });

  return result.docs[0] ?? null;
}
