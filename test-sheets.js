const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function check() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Enquiries!A:H',
  });
  const rows = result.data.values || [];
  console.log('Total rows:', rows.length);
  // Show last 3 rows
  rows.slice(-3).forEach((row, i) => {
    console.log(`Row ${rows.length - 2 + i}:`, row.join(' | '));
  });
}
check().catch(e => console.error('ERROR:', e.message));
