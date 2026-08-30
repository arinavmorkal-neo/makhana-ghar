import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { sendToGoogleAppScript } from '@/lib/google-app-script';
import { triggerWebhook, getWebhookUrl } from '@/lib/webhook';

function extractPageSlug(pagePath?: string): string {
  if (!pagePath) return 'contact-us';
  try {
    let path = pagePath;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const url = new URL(path);
      path = url.pathname;
    }
    path = path.split('?')[0].replace(/^\/+|\/+$/g, '');
    return path || 'contact-us';
  } catch {
    return pagePath.replace(/^\/+|\/+$/g, '') || 'contact-us';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // ── Validation ──
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { success: false, error: 'Name and either email or phone are required.' },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email && email.includes('@') ? email.trim() : 'makhanaghar.marketing@gmail.com';
    const cleanPhone = phone ? String(phone).trim() : '';
    const formattedMessage = `Subject: ${subject || 'General Enquiry'}\n\n${message || ''}`;
    const pageSlug = extractPageSlug(body.pagePath || body.url || body.slug);
    const pageUrl = body.pagePath
      ? (body.pagePath.startsWith('http') ? body.pagePath : `https://www.makhanaghar.in/${pageSlug}`)
      : 'https://www.makhanaghar.in/contact-us';

    // ── 1. Send to Google Sheets immediately (source = page slug) ──
    const googleSheetPromise = sendToGoogleAppScript({
      form_type: 'enquiry',
      website: 'Makhana Ghar',
      form: 'Contact Us',
      name: cleanName,
      email: cleanEmail,
      country_code: '+91',
      phone: cleanPhone,
      grade: subject || 'Contact Inquiry',
      product: subject || 'Contact Inquiry',
      message: formattedMessage,
      status: 'New',
      url: pageUrl,
      pageUrl: pageUrl,
      source: pageSlug,
    }, 'enquire');

    // ── 2. Save to Payload CMS (MongoDB) safely ──
    let enquiryId: string | null = null;
    try {
      const payload = await getPayload({ config: configPromise });
      const enquiry = await payload.create({
        collection: 'enquiries',
        data: {
          name: cleanName,
          contact: cleanPhone || 'N/A',
          email: cleanEmail,
          message: formattedMessage,
          status: 'new',
          source: pageSlug,
        },
      });
      enquiryId = String(enquiry.id);
    } catch (cmsErr: any) {
      console.warn('Could not save contact to CMS DB (Google Sheets capture active):', cmsErr?.message || cmsErr);
    }

    // ── 3. Webhook ──
    getWebhookUrl().then((webhookUrl) => {
      triggerWebhook({ ...body, source: pageSlug }, 'Contact Us', webhookUrl).catch(() => {});
    }).catch(() => {});

    // Await Google Sheet submission
    await googleSheetPromise;

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent.',
      id: enquiryId || 'contact-recorded',
    });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
