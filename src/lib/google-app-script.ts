export async function sendToGoogleAppScript(data: Record<string, any>, sheetName?: string) {
  const url = process.env.GOOGLE_APP_SCRIPT_URL;
  
  if (!url) {
    console.warn('⚠️ Google App Script URL is missing.');
    return;
  }

  try {
    const payload = sheetName ? { sheetName, ...data } : data;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Google App Script responded with status: ${response.status}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error('Failed to send data to Google App Script:', error.message);
  }
}
