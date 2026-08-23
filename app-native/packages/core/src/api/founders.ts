/**
 * Founders API — Payload CMS collection: "founders"
 */
import { apiRequest } from './client';
import type { Founder, PaginatedResponse, Settings } from '../types';

/**
 * Fetch all founders, ordered by `order` field.
 */
export async function getFounders(
  options: { limit?: number } = {},
): Promise<PaginatedResponse<Founder>> {
  const { limit = 20 } = options;

  return apiRequest<PaginatedResponse<Founder>>('/founders', {
    params: { limit, sort: 'order', depth: 1 },
  });
}

/**
 * Fetch site settings (Payload global: "settings").
 */
export async function getSettings(): Promise<Settings> {
  return apiRequest<Settings>('/globals/settings');
}
