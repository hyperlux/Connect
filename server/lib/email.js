import nodemailer from 'nodemailer';

// Debug the environment variables
console.log('Environment variables loaded:', {
  SMTP_SERVER: process.env.SMTP_SERVER,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ? 'set' : 'not set'
});

// Create reusable transporter object using environment variables
const transportConfig = {
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true, // true for port 465 (implicit TLS)
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  debug: true,
  logger: true
};

console.log('Creating transport with config:', {
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
    
    // More specific error messages based on error codes
    switch(error.code) {
      case 'ECONNECTION':
      case 'ETIMEDOUT':
        console.error('Could not connect to SMTP server. Please check if the server is accessible.');
        break;
      case 'EAUTH':
        console.error('Authentication failed. Please verify these items:');
        console.error('1. Check if SMTP_USERNAME and SMTP_PASSWORD are correct');
        console.error('2. Ensure SMTP_SERVER supports TLS');
        console.error('3. Verify if 2FA is enabled and requires app-specific password');
        break;
      case 'ESOCKET':
        console.error('Socket error occurred. Please check if SMTP port is correct and accessible.');
        break;
      default:
        console.error('An unexpected SMTP error occurred:', error.message);
    }
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
    from: `"Auroville Community" <${process.env.SMTP_USERNAME}>`,
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
    
    // Enhanced error handling with more specific messages
    switch(error.code) {
      case 'ECONNREFUSED':
        throw new Error('Could not connect to email server. Please check if SMTP server is accessible.');
      case 'EAUTH':
        throw new Error('Email authentication failed. Please verify SMTP credentials and ensure 2FA settings are properly configured if enabled.');
      case 'ESOCKET':
        throw new Error('Socket error occurred. Please check SMTP port and server accessibility.');
      case 'ETIMEDOUT':
        throw new Error('Connection timed out. Please check SMTP server and network connectivity.');
      case error.responseCode >= 500:
        throw new Error('Email server error. Please try again later.');
      default:
        throw error;
    }
  }
}

export async function sendNotificationEmail(email, notification) {
  const mailOptions = {
    from: `"Auroville Community" <${process.env.SMTP_USERNAME}>`,
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
