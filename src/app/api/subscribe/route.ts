import { NextRequest, NextResponse } from 'next/server';
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

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Save to Payload CMS (MongoDB)
    const payload = await getPayload({ config: configPromise });
    
    // Check if email already exists
    const existing = await payload.find({
      collection: 'subscribers',
      where: {
        email: { equals: trimmedEmail },
      },
    });

    if (existing.docs.length > 0) {
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

    // 2. Append to Google Sheet (async, non-blocking)
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const tabName = process.env.GOOGLE_SUBSCRIBERS_SHEET_NAME || 'Subscribers';

    // Fire-and-forget — don't block the response
    appendToSheet([
      timestamp,
      trimmedEmail,
      body.pagePath ? `newsletter (${body.pagePath})` : 'newsletter',
    ], tabName).catch((err) => {
      console.error('Google Sheets subscriber append failed:', err.message);
    });

    // 3. Trigger Webhook
    triggerWebhook(body, 'Newsletter Subscription').catch((err) => {
      console.error('Webhook failed:', err.message);
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
