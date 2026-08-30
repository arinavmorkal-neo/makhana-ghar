import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { sendToGoogleAppScript } from '@/lib/google-app-script';
import { triggerWebhook, getWebhookUrl } from '@/lib/webhook';

function extractPageSlug(pagePath?: string): string {
  if (!pagePath) return 'home';
  try {
    let path = pagePath;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const url = new URL(path);
      path = url.pathname;
    }
    path = path.split('?')[0].replace(/^\/+|\/+$/g, '');
    return path || 'home';
  } catch {
    return pagePath.replace(/^\/+|\/+$/g, '') || 'home';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, countryCode, contact, email, product, message } = body;

    // ── Validation ──
    if (!name || !contact) {
      return NextResponse.json(
        { success: false, error: 'Name and contact number are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email && email !== 'N/A' && email.includes('@') ? email.trim() : '';
    const cleanPhone = String(contact).trim();
    const cleanCountryCode = countryCode || '+91';
    const pageSlug = extractPageSlug(body.pagePath || body.url || body.slug);

    const productLabel = (({
      'makhana-4': 'Makhana 4+ Sutta',
      'makhana-5': 'Makhana 5+ Sutta',
      'makhana-6': 'Makhana 6+ Sutta',
      'makhana-lite': 'Phool Makhana Lite',
      'custom': 'Custom Grade / Mix',
    } as Record<string, string>)[product]) || product || 'Makhana (Fox Nuts)';

    const pageUrl = body.pagePath
      ? (body.pagePath.startsWith('http') ? body.pagePath : `https://www.makhanaghar.in/${pageSlug === 'home' ? '' : pageSlug}`)
      : 'https://www.makhanaghar.in';

    // ── 1. Send to Google Sheets (source = page slug) ──
    const googleSheetPromise = sendToGoogleAppScript({
      form_type: 'enquiry',
      website: 'Makhana Ghar',
      form: 'Product Enquiry',
      name: name.trim(),
      email: cleanEmail || 'makhanaghar.marketing@gmail.com',
      country_code: cleanCountryCode,
      phone: cleanPhone,
      grade: productLabel,
      product: productLabel,
      message: message || '',
      status: 'New',
      url: pageUrl,
      pageUrl: pageUrl,
      source: pageSlug,
    }, 'enquire');

    // ── 2. Save to Payload CMS (MongoDB) safely in parallel ──
    let enquiryId: string | null = null;
    try {
      const payload = await getPayload({ config: configPromise });
      const enquiry = await payload.create({
        collection: 'enquiries',
        data: {
          name: name.trim(),
          countryCode: cleanCountryCode,
          contact: cleanPhone,
          email: cleanEmail || 'makhanaghar.marketing@gmail.com',
          product: productLabel,
          message: message || '',
          status: 'new',
          source: body.sourceComponent ? `${body.sourceComponent} (${pageSlug})` : pageSlug,
        },
      });
      enquiryId = String(enquiry.id);
    } catch (cmsErr: any) {
      console.warn('Could not save enquiry to CMS DB (Google Sheets capture active):', cmsErr?.message || cmsErr);
    }

    // ── 3. Webhook ──
    getWebhookUrl().then((webhookUrl) => {
      triggerWebhook({ ...body, product: productLabel, source: pageSlug }, 'Enquiry', webhookUrl).catch(() => {});
    }).catch(() => {});

    // Await Google Sheet request
    await googleSheetPromise;

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will get back to you shortly.',
      id: enquiryId || 'enquiry-recorded',
    });
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
