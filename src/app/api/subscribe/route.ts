import { NextRequest, NextResponse, after } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { sendToGoogleAppScript } from '@/lib/google-app-script';
import { triggerWebhook, getWebhookUrl } from '@/lib/webhook';

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

    const [subscriber, webhookUrl] = await Promise.all([
      payload.create({
        collection: 'subscribers',
        data: {
          email: trimmedEmail,
          source: body.pagePath ? `newsletter (${body.pagePath})` : 'newsletter',
        },
      }),
      getWebhookUrl(),
    ]);

    // ── 2. Run Background Tasks ──
    after(() => {
      const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

      triggerWebhook(body, 'Newsletter Subscription', webhookUrl).catch((err) => {
        console.error('Webhook failed:', err.message);
      });

      sendToGoogleAppScript({
        form_type: 'subscribe',
        website: 'Makhana Ghar',
        form: 'Newsletter Subscription',
        name: body.name || 'Subscriber',
        email: trimmedEmail,
        phone: body.phone || '',
        status: 'Active',
        url: body.pagePath ? `https://www.makhanaghar.in${body.pagePath}` : 'https://www.makhanaghar.in',
        pageUrl: body.pagePath || '',
        source: 'Footer',
      }, 'suscribe');
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
