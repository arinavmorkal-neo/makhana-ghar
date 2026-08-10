import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise });
    const slug = req.nextUrl.searchParams.get('slug');

    if (slug) {
      // Fetch a single product by slug
      const result = await payload.find({
        collection: 'products',
        where: {
          slug: { equals: slug },
          status: { equals: 'published' },
        },
        limit: 1,
        depth: 1,
      });

      if (result.docs.length === 0) {
        return NextResponse.json({ product: null }, { status: 404 });
      }

      return NextResponse.json({ product: result.docs[0] });
    }

    // Fetch all published products
    const result = await payload.find({
      collection: 'products',
      where: {
        status: { equals: 'published' },
      },
      sort: 'name',
      limit: 100,
      depth: 1,
    });

    return NextResponse.json({ products: result.docs });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}
