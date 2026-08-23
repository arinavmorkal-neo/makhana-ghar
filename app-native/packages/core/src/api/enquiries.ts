/**
 * Enquiries API — Payload CMS collection: "enquiries"
 *
 * Access control: create is public (no auth needed).
 * Read/update/delete require authentication (admin only).
 */
import { apiRequest } from './client';
import type { Enquiry, CreateEnquiry } from '../types';

/**
 * Submit a new enquiry (public — no auth required).
 * Sets source to 'mobile-app' for tracking.
 */
export async function submitEnquiry(data: CreateEnquiry): Promise<Enquiry> {
  const result = await apiRequest<{ doc: Enquiry }>('/enquiries', {
    method: 'POST',
    body: {
      ...data,
      source: data.source ?? 'mobile-app',
    },
  });

  return result.doc;
}
