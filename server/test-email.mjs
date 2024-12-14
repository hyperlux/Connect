import { sendVerificationEmail } from './lib/email.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory's .env
dotenv.config({ path: join(__dirname, '..', '.env') });

// Verify SMTP settings are loaded
console.log('Loaded SMTP settings:', {
  server: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD ? '****' : undefined
});

async function testEmail() {
  try {
    // Using a real Gmail address for testing
    await sendVerificationEmail('love@auroville.org.in', 'test-token');
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test failed:', error);
    // Log the actual environment variables (masking sensitive data)
    console.error('Environment variables:', {
      SMTP_SERVER: process.env.SMTP_SERVER,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USERNAME: process.env.SMTP_USERNAME,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD ? 'set' : 'not set'
    });
  }
}

testEmail();
