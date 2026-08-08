import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function triggerWebhook(data: any, formType: string) {
  if (formType !== 'Enquiry') return;
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Fetch Settings global
    const settings = await payload.findGlobal({
      slug: 'settings',
    });

    let targetUrl = settings?.webhookUrl;
    if (!targetUrl && formType === 'Enquiry') {
      targetUrl = 'https://www.litchoo.com/workflow/sendwebhookdata/eyJ3b3JrZmxvd0lkIjoiY21zazI1dm0wMDAwM2llMDRpNDJucjB2cSIsIm5vZGVJZCI6ImtkdWhldzVzZzlmZGtqZ2U4MTh1djJwcCIsImV4cCI6NDEwMjQ0NDgwMDAwMH0.JZrCX0FboR3JMyav5vnrWhniOsBtSqlFK2qShbHM0p0';
    }

    if (targetUrl) {
      const payloadData = {
        formType,
        timestamp: new Date().toISOString(),
        ...data,
      };

      await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadData),
      });
      console.log(`Webhook triggered successfully for ${formType}`);
    }
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
  }
}
