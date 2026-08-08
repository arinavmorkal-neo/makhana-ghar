import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';

export async function GET() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const diagnostics = {
    emailPresent: !!email,
    emailValue: email?.substring(0, 15) + '...',
    keyPresent: !!rawKey,
    keyLength: rawKey?.length,
    keyFirst30: rawKey?.substring(0, 30),
    keyLast30: rawKey?.substring((rawKey?.length || 0) - 30),
    keyContainsRealNewlines: rawKey?.includes('\n'),
    keyContainsLiteralBackslashN: rawKey?.includes('\\n'),
    keyStartsWithBegin: rawKey?.startsWith('-----BEGIN'),
    keyStartsWithQuote: rawKey?.startsWith('"'),
    sheetIdPresent: !!sheetId,
    sheetIdValue: sheetId,
  };

  // Try to actually write a test row
  try {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const result = await appendToSheet([
      timestamp,
      'DIAGNOSTIC TEST',
      'diagnostic@test.com',
      '+91 0000000000',
      'N/A',
      'Diagnostic test from API',
      'New',
      'Diagnostic API',
    ]);
    return NextResponse.json({
      diagnostics,
      sheetResult: result ? 'SUCCESS' : 'RETURNED NULL (check logs)',
    });
  } catch (error: any) {
    return NextResponse.json({
      diagnostics,
      sheetError: error.message,
    });
  }
}
