import { appendToSheet } from './src/lib/google-sheets.js';
import { config } from 'dotenv';
config({ path: '.env.local' });

async function test() {
  try {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    await appendToSheet([
      timestamp,
      'Test User',
      'test@example.com',
      '+91 0000000000',
      'Test Product',
      'Test Message via AI Assistant',
      'New',
      'Test Script'
    ]);
    console.log('✅ Success! Data appended to Google Sheets.');
  } catch (error) {
    console.error('❌ Failed to append to Google Sheets:', error);
  }
}

test();
