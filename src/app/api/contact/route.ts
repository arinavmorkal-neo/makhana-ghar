import { NextRequest, NextResponse, after } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { appendToSheet } from '@/lib/google-sheets';
import { triggerWebhook } from '@/lib/webhook';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // ── Validation ──
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const formattedMessage = `Subject: ${subject || 'N/A'}\n\n${message || ''}`;
    // If we have a full formatted phone number from the front end (+919876543210), 
    // we save it entirely into the 'contact' field since we don't know the exact countryCode split.
    const contactNumber = phone || 'N/A';

    // ── 1. Save to Payload CMS (MongoDB) ──
    const payload = await getPayload({ config: configPromise });
    const enquiry = await payload.create({
      collection: 'enquiries',
      data: {
        name,
        contact: contactNumber,
        email,
        message: formattedMessage,
        status: 'new',
        source: body.pagePath ? `Contact Page (${body.pagePath})` : 'Contact Page',
      },
    });

    // ── 2. Run Background Tasks ──
    after(() => {
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const sheetPhone = phone && phone.startsWith('+') ? `'${phone}` : phone;

      appendToSheet([
        timestamp,
        name,
        email,
        sheetPhone,
        'N/A', // product
        formattedMessage,
        'New',
        body.pagePath ? `Contact Page (${body.pagePath})` : 'Contact Page',
      ]).catch((err) => {
        console.error('Google Sheets append failed:', err.message);
      });

      triggerWebhook(body, 'Contact Us').catch((err) => {
        console.error('Webhook failed:', err.message);
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent.',
      id: enquiry.id,
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
