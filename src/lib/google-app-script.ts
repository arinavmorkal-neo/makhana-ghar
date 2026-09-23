const DEFAULT_GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxV4XQzWnpsXyxUQG3SkI2x5kFVdfXPB-LVf8f-obFIIDOAYUs2CvIFG1nte2P8e628NA/exec';

function cleanUrl(raw?: string): string {
  if (!raw) return '';
  let url = raw.trim();
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }
  return url;
}

async function postJson(url: string, payload: Record<string, any>): Promise<string> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });
  return response.text();
}

export async function sendToGoogleAppScript(data: Record<string, any>, sheetName?: string) {
  const configuredUrl = cleanUrl(process.env.GOOGLE_APP_SCRIPT_URL);
  const primaryUrl = configuredUrl || DEFAULT_GOOGLE_SCRIPT_URL;

  const payload: Record<string, any> = { ...data };
  if (sheetName) payload.sheetName = sheetName;

  try {
    let result = await postJson(primaryUrl, payload);

    // If Google returns an HTML authorization/login error page ("You need access")
    // and the primary URL was a custom/configured one, failover to the known working URL.
    const isAuthError =
      result.includes('<html') ||
      result.includes('You need access') ||
      result.includes('accounts.google.com');

    if (isAuthError && primaryUrl !== DEFAULT_GOOGLE_SCRIPT_URL) {
      console.warn('⚠️ Primary Google Script URL failed with access/permission error. Retrying with default working URL...');
      result = await postJson(DEFAULT_GOOGLE_SCRIPT_URL, payload);
    }

    console.log('✅ Google Sheet response:', result);
    return result;
  } catch (error: any) {
    console.error('❌ Failed to send data to primary Google App Script:', error.message);
    if (primaryUrl !== DEFAULT_GOOGLE_SCRIPT_URL) {
      try {
        console.log('🔄 Attempting fallback to default Google Script URL...');
        const fallbackResult = await postJson(DEFAULT_GOOGLE_SCRIPT_URL, payload);
        console.log('✅ Google Sheet fallback response:', fallbackResult);
        return fallbackResult;
      } catch (fallbackError: any) {
        console.error('❌ Fallback to Google App Script also failed:', fallbackError.message);
      }
    }
  }
}
