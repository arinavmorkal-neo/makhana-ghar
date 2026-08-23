/**
 * Gallery API — Payload CMS collection: "gallery"
 */
import { apiRequest } from './client';
import type { GalleryItem, PaginatedResponse } from '../types';

/**
 * Fetch all gallery items, ordered by `order` field.
 */
export async function getGalleryItems(
  options: { limit?: number; page?: number } = {},
): Promise<PaginatedResponse<GalleryItem>> {
  const { limit = 50, page = 1 } = options;

  return apiRequest<PaginatedResponse<GalleryItem>>('/gallery', {
    params: { limit, page, sort: 'order', depth: 1 },
  });
}
