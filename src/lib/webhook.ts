import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function triggerWebhook(data: any, formType: string) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Fetch Settings global
    const settings = await payload.findGlobal({
      slug: 'settings',
    });

    if (settings && settings.webhookUrl) {
      const payloadData = {
        formType,
        timestamp: new Date().toISOString(),
        ...data,
      };

      await fetch(settings.webhookUrl as string, {
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
