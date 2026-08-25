/**
 * Blogs API — Payload CMS collection: "blogs"
 */
import { apiRequest } from './client';
import type { Blog, PaginatedResponse } from '../types';

export interface GetBlogsOptions {
  limit?: number;
  page?: number;
  sort?: string;
  depth?: number;
}

/**
 * Fetch all published blogs, newest first.
 */
export async function getBlogs(
  options: GetBlogsOptions = {},
): Promise<PaginatedResponse<Blog>> {
  const { limit = 20, page = 1, sort = '-createdAt', depth = 1 } = options;

  return apiRequest<PaginatedResponse<Blog>>('/blogs', {
    params: {
      limit,
      page,
      sort,
      depth,
      'where[status][equals]': 'published',
    },
  });
}

/**
 * Fetch a single blog by slug.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const result = await apiRequest<PaginatedResponse<Blog>>('/blogs', {
    params: {
      'where[slug][equals]': slug,
      'where[status][equals]': 'published',
      limit: 1,
      depth: 2,
    },
  });

  return result.docs[0] ?? null;
}
