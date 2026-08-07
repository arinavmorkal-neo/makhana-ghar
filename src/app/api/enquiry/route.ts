import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { appendToSheet } from '@/lib/google-sheets';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, countryCode, contact, email, product, message } = body;

    // ── Validation ──
    if (!name || !contact || !email) {
      return NextResponse.json(
        { success: false, error: 'Name, contact, and email are required.' },
        { status: 400 }
      );
    }

    // ── 1. Save to Payload CMS (MongoDB) ──
    const payload = await getPayload({ config: configPromise });
    const enquiry = await payload.create({
      collection: 'enquiries',
      data: {
        name,
        countryCode: countryCode || '+91',
        contact,
        email,
        product: product || undefined,
        message: message || '',
        status: 'new',
        source: 'website',
      },
    });

    // ── 2. Append to Google Sheet (async, non-blocking) ──
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const phone = `'${countryCode || '+91'} ${contact}`;
    const productLabel = (({
      'makhana-4': 'Makhana 4+ Sutta',
      'makhana-5': 'Makhana 5+ Sutta',
      'makhana-6': 'Makhana 6+ Sutta',
      'makhana-lite': 'Phool Makhana Lite',
      'custom': 'Custom Grade / Mix',
    } as Record<string, string>)[product]) || product || 'Not specified';

    // Fire-and-forget — don't block the response
    appendToSheet([
      timestamp,
      name,
      email,
      phone,
      productLabel,
      message || '',
      'New',
      'Website Form',
    ]).catch((err) => {
      console.error('Google Sheets append failed:', err.message);
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will get back to you shortly.',
      id: enquiry.id,
    });
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
