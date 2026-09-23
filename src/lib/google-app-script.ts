export async function sendToGoogleAppScript(data: Record<string, any>, sheetName?: string) {
  const url = process.env.GOOGLE_APP_SCRIPT_URL;

  if (!url) {
    console.warn('⚠️ Google App Script URL is missing.');
    return;
  }

  try {
    // Build the payload — include sheetName so the Apps Script knows which tab to use
    const payload: Record<string, any> = { ...data };
    if (sheetName) payload.sheetName = sheetName;

    // Send as JSON via POST.
    // Google Apps Script will redirect (302) but we follow it to confirm success.
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const text = await response.text();
    console.log('✅ Google Sheet response:', text);
    return text;
  } catch (error: any) {
    console.error('❌ Failed to send data to Google App Script:', error.message);
  }
}


