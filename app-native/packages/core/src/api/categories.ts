/**
 * Categories API — Payload CMS collection: "categories"
 */
import { apiRequest } from './client';
import type { Category, PaginatedResponse } from '../types';

export interface GetCategoriesOptions {
  status?: 'published' | 'draft';
  limit?: number;
  page?: number;
  sort?: string;
  depth?: number;
}

/**
 * Fetch all categories, sorted by `order` field.
 * Defaults to published categories only.
 */
export async function getCategories(
  options: GetCategoriesOptions = {},
): Promise<PaginatedResponse<Category>> {
  const { status = 'published', limit = 50, page = 1, sort = 'order', depth = 2 } = options;

  const params: Record<string, string | number | boolean> = {
    limit,
    page,
    sort,
    depth,
  };

  if (status) {
    params['where[status][equals]'] = status;
  }

  return apiRequest<PaginatedResponse<Category>>('/categories', { params });
}

/**
 * Fetch a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await apiRequest<PaginatedResponse<Category>>('/categories', {
    params: {
      'where[slug][equals]': slug,
      'where[status][equals]': 'published',
      limit: 1,
      depth: 2,
    },
  });

  return result.docs[0] ?? null;
}
