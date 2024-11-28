import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.com',
  port: 587,
  secure: false,
  auth: {
    user: 'notifications@aurovillenetwork.us',
    pass: 'lovelightforever888!'
  },
  authMethod: 'LOGIN',
  debug: true,
  logger: true,
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  }
});

export async function sendVerificationEmail(email, token) {
  console.log('Starting email send process...');
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  
  const mailOptions = {
    from: '"Auroville Community" <notifications@aurovillenetwork.us>',
    to: email,
    subject: 'Verify your email - Auroville Community',
    html: `
      <h1>Welcome to Auroville Community!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });
    return info;
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      code: error.code,
      response: error.response,
      command: error.command
    });
    throw error;
  }
}