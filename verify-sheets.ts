import { google } from 'googleapis';

// Simulate what Vercel might be doing
const rawKey = process.env.GOOGLE_PRIVATE_KEY;
console.log('=== RAW KEY DIAGNOSTICS ===');
console.log('Key length:', rawKey?.length);
console.log('First 50 chars:', JSON.stringify(rawKey?.substring(0, 50)));
console.log('Last 50 chars:', JSON.stringify(rawKey?.substring((rawKey?.length || 0) - 50)));
console.log('Contains real newlines:', rawKey?.includes('\n'));
console.log('Contains literal \\n:', rawKey?.includes('\\n'));
console.log('Starts with BEGIN:', rawKey?.startsWith('-----BEGIN'));
console.log('');

// Try with the replace
const processed = rawKey?.replace(/\\n/g, '\n').replace(/"/g, '');
console.log('=== PROCESSED KEY ===');
console.log('Processed length:', processed?.length);
console.log('First 50 chars:', JSON.stringify(processed?.substring(0, 50)));
console.log('Starts with BEGIN:', processed?.startsWith('-----BEGIN'));

// Now try to auth
console.log('\n=== AUTH TEST ===');
async function testAuth() {
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: processed,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Enquiries!A1:A2',
    });
    console.log('✅ AUTH SUCCESS! Got data:', res.data.values);
  } catch (e: any) {
    console.error('❌ AUTH FAILED:', e.message);
  }
}
testAuth();
