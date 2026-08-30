import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { sendToGoogleAppScript } from '@/lib/google-app-script';
import { triggerWebhook, getWebhookUrl } from '@/lib/webhook';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { success: false, error: 'Email or phone number is required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email ? email.trim() : '';
    const cleanPhone = phone ? String(phone).trim() : '';
    const cleanName = name ? String(name).trim() : 'Subscriber';
    const pageUrl = body.pagePath
      ? (body.pagePath.startsWith('http') ? body.pagePath : `https://www.makhanaghar.in${body.pagePath}`)
      : 'https://www.makhanaghar.in';

    // ── 1. Send to Google Sheets immediately & reliably ──
    const googleSheetPromise = sendToGoogleAppScript({
      form_type: 'subscribe',
      website: 'Makhana Ghar',
      form: 'Newsletter Subscription',
      name: cleanName,
      email: trimmedEmail || 'makhanaghar.marketing@gmail.com',
      phone: cleanPhone,
      country_code: '+91',
      status: 'Active',
      url: pageUrl,
      pageUrl: pageUrl,
      source: 'Footer',
    }, 'suscribe');

    // ── 2. Save to Payload CMS (MongoDB) safely ──
    let subscriberId: string | null = null;
    try {
      if (trimmedEmail) {
        const payload = await getPayload({ config: configPromise });
        const existing = await payload.find({
          collection: 'subscribers',
          where: { email: { equals: trimmedEmail } },
          limit: 1,
        });

        if (existing.totalDocs === 0) {
          const subscriber = await payload.create({
            collection: 'subscribers',
            data: {
              email: trimmedEmail,
              source: body.pagePath ? `newsletter (${body.pagePath})` : 'newsletter',
            },
          });
          subscriberId = String(subscriber.id);
        }
      }
    } catch (cmsErr: any) {
      console.warn('Could not save subscriber to CMS DB (Google Sheets capture active):', cmsErr?.message || cmsErr);
    }

    // ── 3. Webhook ──
    getWebhookUrl().then((webhookUrl) => {
      triggerWebhook(body, 'Newsletter Subscription', webhookUrl).catch(() => {});
    }).catch(() => {});

    // Await Google Sheet submission
    await googleSheetPromise;

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!',
      id: subscriberId || 'subscribed',
    });
  } catch (error: any) {
    console.error('Newsletter submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
