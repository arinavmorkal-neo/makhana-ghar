import { GlobalConfig } from 'payload';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  access: {
    read: () => true, // Publicly readable for API access
  },
  fields: [
    {
      name: 'webhookUrl',
      label: 'Forms Webhook URL',
      type: 'text',
      required: true,
      defaultValue: 'https://www.litchoo.com/workflow/sendwebhookdata/eyJ3b3JrZmxvd0lkIjoiY21zazI1dm0wMDAwM2llMDRpNDJucjB2cSIsIm5vZGVJZCI6ImtkdWhldzVzZzlmZGtqZ2U4MTh1djJwcCIsImV4cCI6NDEwMjQ0NDgwMDAwMH0.JZrCX0FboR3JMyav5vnrWhniOsBtSqlFK2qShbHM0p0',
      admin: {
        description: 'This URL will be triggered whenever a form is submitted (Contact Us, Enquiries, Newsletter).',
      },
    },
  ],
};
