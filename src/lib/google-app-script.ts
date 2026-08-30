export async function sendToGoogleAppScript(data: Record<string, any>, sheetName?: string) {
  const url = process.env.GOOGLE_APP_SCRIPT_URL;
  
  if (!url) {
    console.warn('⚠️ Google App Script URL is missing.');
    return;
  }

  try {
    const formData = new URLSearchParams();
    if (sheetName) formData.append('sheetName', sheetName);
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value !== undefined && value !== null ? String(value) : '');
    });

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Google App Script responded with status: ${response.status}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error('Failed to send data to Google App Script:', error.message);
  }
}
