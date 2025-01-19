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
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // false for port 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: true
  }
};

// Debug configuration
console.log('Environment Variables:', {
  SMTP_SERVER: process.env.SMTP_SERVER,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ? 'set' : 'not set'
});

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
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      username: process.env.SMTP_USERNAME
    });
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

export async function sendVerificationEmail(email, token) {
  console.log('Starting email send process for:', email);
  
  // Construct verification URL
  const verificationUrl = `${process.env.VITE_FRONTEND_URL}/verify-email?token=${token}`;
  console.log('Verification URL:', verificationUrl);
  
  const mailOptions = {
    from: `"Auroville Community" <${process.env.SMTP_USERNAME}>`,
    to: email,
    subject: 'Verify your email - Auroville Community',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #2A2A2A; color: #FFFFFF; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${process.env.VITE_FRONTEND_URL}/logodark.png" alt="Auroville" style="height: 60px; margin-bottom: 20px;" />
          <h1 style="color: #E27B58; margin: 0;">Welcome to Auroville Community!</h1>
        </div>

        <div style="background-color: #1E1E1E; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            Thank you for joining our community. To complete your registration and ensure the security of your account, please verify your email address by clicking the button below:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="display: inline-block;
                      background-color: #E27B58;
                      color: white;
                      padding: 14px 28px;
                      text-decoration: none;
                      border-radius: 6px;
                      font-weight: bold;
                      font-size: 16px;">
              Verify Email Address
            </a>
          </div>

          <p style="font-size: 14px; color: #999; margin-top: 25px;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br>
            <a href="${verificationUrl}" style="color: #E27B58; word-break: break-all;">${verificationUrl}</a>
          </p>
        </div>

        <div style="border-top: 1px solid #444; padding-top: 20px; margin-top: 30px;">
          <p style="font-size: 14px; color: #999; text-align: center; margin-bottom: 10px;">
            This verification link will expire in 24 hours for security reasons.
          </p>
          <p style="font-size: 14px; color: #999; text-align: center;">
            If you didn't create an account with Auroville Community, you can safely ignore this email.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 12px; color: #666;">
            Need help? Contact us at <a href="mailto:support@auroville.social" style="color: #E27B58;">support@auroville.social</a>
          </p>
        </div>
      </div>
    `,
    text: `
      Welcome to Auroville Community!
      
      Thank you for joining our community. To complete your registration and ensure the security of your account, please verify your email address by clicking the following link:
      
      ${verificationUrl}
      
      This verification link will expire in 24 hours for security reasons.
      
      If you didn't create an account with Auroville Community, you can safely ignore this email.
      
      Need help? Contact us at support@auroville.social
    `
  };

  try {
    console.log('Attempting to send email with config:', {
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      username: process.env.SMTP_USERNAME,
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
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        username: process.env.SMTP_USERNAME
      }
    });
    throw error;
  }
}

export async function sendNotificationEmail(email, notification) {
  const mailOptions = {
    from: `"Auroville Community" <${process.env.SMTP_USERNAME}>`,
    to: email,
    subject: notification.title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #2A2A2A; color: #FFFFFF; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${process.env.VITE_FRONTEND_URL}/logodark.png" alt="Auroville" style="height: 60px; margin-bottom: 20px;" />
          <h1 style="color: #E27B58; margin: 0;">${notification.title}</h1>
        </div>

        <div style="background-color: #1E1E1E; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
          <div style="font-size: 16px; line-height: 1.6;">
            ${notification.message}
          </div>

          ${notification.link ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${notification.link}" 
               style="display: inline-block;
                      background-color: #E27B58;
                      color: white;
                      padding: 14px 28px;
                      text-decoration: none;
                      border-radius: 6px;
                      font-weight: bold;
                      font-size: 16px;">
              View Details
            </a>
          </div>
          ` : ''}
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="font-size: 12px; color: #666;">
            This is an automated message from Auroville Community platform.
            <br>
            Need help? Contact us at <a href="mailto:support@auroville.social" style="color: #E27B58;">support@auroville.social</a>
          </p>
        </div>
      </div>
    `,
    text: `
      ${notification.title}
      
      ${notification.message}
      
      ${notification.link ? `View details at: ${notification.link}` : ''}
      
      This is an automated message from Auroville Community platform.
      Need help? Contact us at support@auroville.social
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
