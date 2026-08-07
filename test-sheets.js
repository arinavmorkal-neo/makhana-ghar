const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function fixSheet() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  const auth = new google.auth.JWT({
    email, key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // 1. Clear the entire Enquiries tab
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: 'Enquiries!A:Z',
  });
  console.log('Cleared Enquiries tab');

  // 2. Write proper headers + fixed data
  const values = [
    ['Timestamp', 'Name', 'Email', 'Phone Number', 'Grade', 'Message', 'Status', 'Source'],
    ['8/8/2026, 3:45:15 AM', 'Makhana Ghar', 'makhanaghar.marketing@gmail.com', "'+91 ", 'Not specified', '', 'New', 'Website Form'],
    ['8/8/2026, 3:50:28 AM', 'Test User', 'test@example.com', "'+91 9876543210", 'Makhana 5+ Sutta', 'Testing Google Sheets integration', 'New', 'Website Form'],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: 'Enquiries!A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });

  console.log('Fixed! Wrote', values.length, 'rows (1 header + 2 data rows)');
  
  // Verify
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Enquiries!A:H',
  });
  console.log('\nVerification:');
  result.data.values?.forEach((row, i) => {
    console.log(`Row ${i + 1}:`, JSON.stringify(row));
  });
}

fixSheet().catch(e => console.error('ERROR:', e.message));
