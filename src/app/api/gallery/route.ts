import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: 'gallery',
      where: {
        status: { equals: 'published' },
      },
      sort: '-featured,order',
      limit: 200,
      depth: 1, // populate media relation
    });

    return NextResponse.json({ items: result.docs });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
