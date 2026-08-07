import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { headers } from 'next/headers';
import { syncAllToSheet } from '@/lib/google-sheets';

export async function POST(req: NextRequest) {
  try {
    // 1. Authorize user (Must be a logged-in admin user)
    const payload = await getPayload({ config: configPromise });
    const headersList = await headers();
    const { user } = await payload.auth({ headers: headersList });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log into the admin panel.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (!type || (type !== 'enquiries' && type !== 'subscribers')) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing "type" parameter. Must be "enquiries" or "subscribers".' },
        { status: 400 }
      );
    }

    if (type === 'enquiries') {
      // Fetch all enquiries
      const result = await payload.find({
        collection: 'enquiries',
        limit: 5000,
        sort: '-createdAt',
      });

      const sheetName = process.env.GOOGLE_SHEET_NAME || 'Enquiries';
      const headers = [
        'Timestamp / Created At',
        'Name',
        'Email Address',
        'Phone Number',
        'Product Interest',
        'Message',
        'Status',
        'Source',
        'Internal Notes',
      ];

      const rows = result.docs.map((doc: any) => {
        const phone = `'${doc.countryCode || '+91'} ${doc.contact || ''}`.trim();
        const timestamp = doc.createdAt ? new Date(doc.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '';
        
        // Resolve product grade label
        const productLabel = (({
          'makhana-4': 'Makhana 4+ Sutta',
          'makhana-5': 'Makhana 5+ Sutta',
          'makhana-6': 'Makhana 6+ Sutta',
          'makhana-lite': 'Phool Makhana Lite',
          'custom': 'Custom Grade / Mix',
        } as Record<string, string>)[doc.product]) || doc.product || 'Not specified';

        // Resolve status label
        const statusLabel = (({
          'new': 'New',
          'contacted': 'Contacted',
          'in-progress': 'In Progress',
          'converted': 'Converted',
          'closed': 'Closed',
        } as Record<string, string>)[doc.status]) || doc.status || 'New';

        return [
          timestamp,
          doc.name || '',
          doc.email || '',
          phone,
          productLabel,
          doc.message || '',
          statusLabel,
          doc.source || 'website',
          doc.notes || '',
        ];
      });

      await syncAllToSheet(sheetName, headers, rows);
      return NextResponse.json({ success: true, count: rows.length, tab: sheetName });
    } else {
      // Fetch all subscribers
      const result = await payload.find({
        collection: 'subscribers',
        limit: 5000,
        sort: '-createdAt',
      });

      const sheetName = process.env.GOOGLE_SUBSCRIBERS_SHEET_NAME || 'Subscribers';
      const headers = [
        'Timestamp / Subscribed At',
        'Email Address',
        'Source',
      ];

      const rows = result.docs.map((doc: any) => {
        const timestamp = doc.createdAt ? new Date(doc.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '';
        return [
          timestamp,
          doc.email || '',
          doc.source || 'newsletter',
        ];
      });

      await syncAllToSheet(sheetName, headers, rows);
      return NextResponse.json({ success: true, count: rows.length, tab: sheetName });
    }
  } catch (error: any) {
    console.error('Google Sheets manual sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync to Google Sheets. Check your credentials.' },
      { status: 500 }
    );
  }
}
