import { sendVerificationEmail } from '../lib/email.js';

const testEmail = async () => {
  try {
    const email = 'polletkiro@gmail.com';
    const token = 'test-token';
    console.log('Sending test email to:', email);
    await sendVerificationEmail(email, token);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
};

testEmail();