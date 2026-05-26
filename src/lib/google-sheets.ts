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
export async function appendToSheet(row: string[], tabName?: string) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = tabName || process.env.GOOGLE_SHEET_NAME || 'Sheet1';

  if (!email || !key || !sheetId) {
    console.warn('⚠️ Google Sheets env vars missing — skipping sheet append.');
    return null;
  }

  try {
    const auth = new google.auth.JWT({
      email,
      key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Ensure the tab exists before appending to it
    try {
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
      const sheetExists = spreadsheet.data.sheets?.some(s => s.properties?.title === sheetName);
      if (!sheetExists) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: sheetId,
          requestBody: {
            requests: [{
              addSheet: {
                properties: {
                  title: sheetName,
                }
              }
            }]
          }
        });
      }
    } catch (e: any) {
      console.warn('Could not check or add tab sheet:', e.message);
    }

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:H`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return result.data;
  } catch (error: any) {
    console.error('Google Sheets append failed:', error.message);
    return null;
  }
}

/**
 * Clear a specific tab and overwrite it with headers and data rows.
 * Automatically adds the tab if it does not exist.
 */
export async function syncAllToSheet(sheetName: string, headers: string[], rows: string[][]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    throw new Error('Google Sheets credentials are not configured. Please check your environment variables.');
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // 1. Ensure tab exists
  try {
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const sheetExists = spreadsheet.data.sheets?.some(s => s.properties?.title === sheetName);
    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName,
              }
            }
          }]
        }
      });
    }
  } catch (error: any) {
    console.warn(`Tab check/creation for "${sheetName}" failed:`, error.message);
  }

  // 2. Clear previous entries in this range
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:Z`,
    });
  } catch (error: any) {
    console.warn(`Clearing tab "${sheetName}" failed:`, error.message);
  }

  // 3. Write data
  const values = [headers, ...rows];
  const result = await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values,
    },
  });

  return result.data;
}
