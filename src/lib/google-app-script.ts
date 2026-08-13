export async function sendToGoogleAppScript(data: Record<string, any>) {
  const url = process.env.GOOGLE_APP_SCRIPT_URL;
  
  if (!url) {
    console.warn('⚠️ Google App Script URL is missing.');
    return;
  }

  try {
    // We send data both as JSON and as form data since some apps scripts 
    // are configured to read from `e.postData.contents` and others from `e.parameter`.
    // Sending it as JSON inside the body is the cleanest way. 
    // If the apps script requires application/x-www-form-urlencoded, we can also use that, 
    // but typically fetch uses JSON if we send JSON string.
    // Let's use URLSearchParams to be safe and compatible with basic doPost(e) e.parameter.
    
    const params = new URLSearchParams();
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        params.append(key, String(data[key]));
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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
