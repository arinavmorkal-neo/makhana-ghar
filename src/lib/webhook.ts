import { getPayload } from 'payload';
import configPromise from '@payload-config';

const DEFAULT_WEBHOOK_URL =
  'https://www.litchoo.com/workflow/sendwebhookdata/eyJ3b3JrZmxvd0lkIjoiY21zazI1dm0wMDAwM2llMDRpNDJucjB2cSIsIm5vZGVJZCI6ImtkdWhldzVzZzlmZGtqZ2U4MTh1djJwcCIsImV4cCI6NDEwMjQ0NDgwMDAwMH0.JZrCX0FboR3JMyav5vnrWhniOsBtSqlFK2qShbHM0p0';

/**
 * Resolve the webhook URL from the Settings global.
 * Call this while Payload is already initialised (i.e. before `after()`)
 * so the expensive getPayload + DB lookup isn't repeated inside the
 * background callback.
 */
export async function getWebhookUrl(): Promise<string> {
  try {
    const payload = await getPayload({ config: configPromise });
    const settings = await payload.findGlobal({ slug: 'settings' });
    return settings?.webhookUrl || DEFAULT_WEBHOOK_URL;
  } catch {
    return DEFAULT_WEBHOOK_URL;
  }
}

/**
 * Fire the webhook.
 *
 * @param data        – form submission body
 * @param formType    – e.g. 'Enquiry', 'Contact Us', 'Newsletter Subscription'
 * @param webhookUrl  – pre-resolved URL (use `getWebhookUrl()` before `after()`)
 */
export async function triggerWebhook(
  data: any,
  formType: string,
  webhookUrl?: string,
) {
  try {
    // If the caller didn't supply a URL, fall back to resolving it now
    // (slower path — only as a safety net).
    const targetUrl = webhookUrl || (await getWebhookUrl());

    const payloadData = {
      formType,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      pageUrl: data.pagePath || '',
      ...data,
    };

    await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadData),
    });

    console.log(`Webhook triggered successfully for ${formType}`);
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
  }
}
