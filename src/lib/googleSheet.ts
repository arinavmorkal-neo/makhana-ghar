import { sendToGoogleAppScript } from './google-app-script';

export async function submitToGoogleSheet(
  data: Record<string, string>
) {
  const payload: Record<string, string> = { ...data };

  if (typeof window !== 'undefined') {
    payload.url = window.location.href;
    if (!data.source || data.source === 'Website') {
      const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
      payload.source = slug || 'home';
    }
  }

  return sendToGoogleAppScript(payload, 'enquire');
}
