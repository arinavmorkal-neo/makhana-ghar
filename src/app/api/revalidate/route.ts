import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'makhana-revalidate-secret-key';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret') || req.headers.get('x-revalidation-secret');
    const body = await req.json().catch(() => ({}));
    const path = searchParams.get('path') || body.path;

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ message: 'Path parameter is required' }, { status: 400 });
    }

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret') || req.headers.get('x-revalidation-secret');
    const path = searchParams.get('path');

    if (secret !== REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ message: 'Path parameter is required' }, { status: 400 });
    }

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
