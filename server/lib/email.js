import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from parent directory's .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

// Create reusable transporter object using environment variables
const transportConfig = {
  host: process.env.SMTP_SERVER || 'smtp.ionos.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // false for port 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USERNAME || 'notifications@aurovillenetwork.us',
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: true
  }
};

// Debug configuration
console.log('SMTP Configuration:', {
  ...transportConfig,
  auth: {
    ...transportConfig.auth,
    pass: transportConfig.auth.pass ? '****' : undefined
  }
});

const transporter = nodemailer.createTransport(transportConfig);

// Verify transporter configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP connection error:', {
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      host: process.env.SMTP_SERVER || 'smtp.ionos.com',
      port: process.env.SMTP_PORT || '587',
      username: process.env.SMTP_USERNAME || 'notifications@aurovillenetwork.us'
    });
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

export async function sendVerificationEmail(email, token) {
  console.log('Starting email send process for:', email);
  
  // Construct verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  console.log('Verification URL:', verificationUrl);
  
  const mailOptions = {
    from: `"Auroville Community" <${process.env.SMTP_USERNAME || 'notifications@aurovillenetwork.us'}>`,
    to: email,
    subject: 'Verify your email - Auroville Community',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #E27B58; text-align: center;">Welcome to Auroville Community!</h1>
        <p style="font-size: 16px; line-height: 1.5;">Thank you for joining our community. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #E27B58; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 4px;
                    display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          If the button doesn't work, you can also copy and paste this link into your browser:
          <br>
          <a href="${verificationUrl}" style="color: #E27B58;">${verificationUrl}</a>
        </p>
        <p style="font-size: 14px; color: #666;">This link will expire in 24 hours.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          If you didn't create an account with Auroville Community, you can safely ignore this email.
        </p>
      </div>
    `,
    text: `
      Welcome to Auroville Community!
      
      Please verify your email address by clicking the following link:
      ${verificationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create an account with Auroville Community, you can safely ignore this email.
    `
  };

  try {
    console.log('Attempting to send email with config:', {
      host: process.env.SMTP_SERVER || 'smtp.ionos.com',
      port: process.env.SMTP_PORT || '587',
      username: process.env.SMTP_USERNAME || 'notifications@aurovillenetwork.us',
      to: email,
      verificationUrl
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      envelope: info.envelope
    });
    return info;
  } catch (error) {
    console.error('Email sending failed:', {
      error: error.message,
      code: error.code,
      response: error.response,
      command: error.command,
      stack: error.stack,
      config: {
        host: process.env.SMTP_SERVER || 'smtp.ionos.com',
        port: process.env.SMTP_PORT || '587',
        username: process.env.SMTP_USERNAME || 'notifications@aurovillenetwork.us'
      }
    });
    throw error;
  }
}

export async function sendNotificationEmail(email, notification) {
  const mailOptions = {
    from: `"Auroville Community" <${process.env.SMTP_USERNAME || 'notifications@aurovillenetwork.us'}>`,
    to: email,
    subject: notification.title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #E27B58; text-align: center;">${notification.title}</h1>
        <div style="font-size: 16px; line-height: 1.5;">
          ${notification.message}
        </div>
        ${notification.link ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${notification.link}" 
             style="background-color: #E27B58; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 4px;
                    display: inline-block;">
            View Details
          </a>
        </div>
        ` : ''}
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">
          This is an automated message from Auroville Community platform.
        </p>
      </div>
    `,
    text: `
      ${notification.title}
      
      ${notification.message}
      
      ${notification.link ? `View details at: ${notification.link}` : ''}
      
      This is an automated message from Auroville Community platform.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    return info;
  } catch (error) {
    console.error('Failed to send notification email:', {
      error: error.message,
      code: error.code,
      response: error.response,
      command: error.command
    });
    throw error;
  }
}
