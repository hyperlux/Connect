import { sendVerificationEmail } from './lib/email.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory's .env
dotenv.config({ path: join(__dirname, '..', '.env') });

async function testEmail() {
  try {
    // Using a real Gmail address for testing
    await sendVerificationEmail('love@auroville.org.in', 'test-token');
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testEmail();
