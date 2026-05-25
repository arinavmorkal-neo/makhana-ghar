import { google } from 'googleapis';

/**
 * Append a row to Google Sheets.
 * 
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  – e.g. mybot@project.iam.gserviceaccount.com
 *   GOOGLE_PRIVATE_KEY            – the full PEM private key (with \n line-breaks)
 *   GOOGLE_SHEET_ID               – the spreadsheet ID from the URL
 *   GOOGLE_SHEET_NAME             – (optional) tab name, defaults to "Sheet1"
 */
export async function appendToSheet(row: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

  if (!email || !key || !sheetId) {
    console.warn('⚠️ Google Sheets env vars missing — skipping sheet append.');
    return null;
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const result = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheetName}!A:H`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });

  return result.data;
}
