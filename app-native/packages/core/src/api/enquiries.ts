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
  try {
    // 1. Primary: Submit to Next.js backend API (/api/enquiry)
    // This saves to MongoDB via Payload CMS, syncs to Google Sheets via Apps Script, and triggers Webhook
    const res = await apiRequest<{ success: boolean; id?: string; message?: string }>('/enquiry', {
      method: 'POST',
      body: {
        name: data.name,
        contact: data.contact,
        email: data.email || 'N/A',
        product: data.product || 'custom',
        message: data.message || '',
        countryCode: data.countryCode || '+91',
        sourceComponent: data.sourceComponent || 'Mobile App',
        pagePath: 'mobile://enquiry',
        source: data.source ?? 'Mobile App',
      },
    });

    return {
      id: res.id || String(Date.now()),
      name: data.name,
      contact: data.contact,
      email: data.email,
      product: data.product,
      message: data.message,
      status: 'new',
      source: data.source ?? 'Mobile App',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    // 2. Fallback: Submit directly to Payload CMS REST collection (/api/enquiries)
    const fallbackResult = await apiRequest<{ doc: Enquiry }>('/enquiries', {
      method: 'POST',
      body: {
        ...data,
        source: data.source ?? 'Mobile App',
      },
    });
    return fallbackResult.doc;
  }
}
