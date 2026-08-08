import { NextRequest, NextResponse, after } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { appendToSheet } from '@/lib/google-sheets';
import { triggerWebhook } from '@/lib/webhook';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();

    // ── 1. Save to Payload CMS (MongoDB) ──
    const payload = await getPayload({ config: configPromise });
    
    // Optional: check if already exists
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: trimmedEmail } },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed!',
      });
    }

    const subscriber = await payload.create({
      collection: 'subscribers',
      data: {
        email: trimmedEmail,
        source: body.pagePath ? `newsletter (${body.pagePath})` : 'newsletter',
      },
    });

    // ── 2. Run Background Tasks ──
    after(() => {
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      // Newsletter specific sheet handling
      const tabName = process.env.GOOGLE_SUBSCRIBERS_SHEET_NAME || 'Subscribers';
      
      appendToSheet([
        timestamp,
        trimmedEmail,
        body.pagePath ? `newsletter (${body.pagePath})` : 'newsletter',
      ], tabName).catch((err) => {
        console.error('Google Sheets subscriber append failed:', err.message);
      });

      triggerWebhook(body, 'Newsletter Subscription').catch((err) => {
        console.error('Webhook failed:', err.message);
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!',
      id: subscriber.id,
    });
  } catch (error: any) {
    console.error('Newsletter submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
