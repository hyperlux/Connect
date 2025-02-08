import nodemailer from 'nodemailer';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Create a transport using the SMTP configuration from environment variables
const createTransport = () => {
  try {
    const transportConfig = {
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false // Use with caution, only in development
      }
    };

    console.log('SMTP Configuration:', {
      host: transportConfig.host,
      port: transportConfig.port,
      secure: transportConfig.secure,
      username: transportConfig.auth.user ? transportConfig.auth.user.replace(/./g, '*') : 'Not set'
    });

    return nodemailer.createTransport(transportConfig);
  } catch (error) {
    logger.error('Failed to create SMTP transport:', error);
    return null;
  }
};

// Send email function with robust error handling
export const sendEmail = async (to, subject, text, html) => {
  const transporter = createTransport();
  
  if (!transporter) {
    logger.error('Email transporter not initialized');
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      text,
      html
    });

    logger.info('Email sent successfully', { 
      messageId: info.messageId, 
      accepted: info.accepted 
    });

    return true;
  } catch (error) {
    logger.error('Failed to send email:', {
      error: error.message,
      stack: error.stack
    });
    return false;
  }
};

// Verify SMTP connection
export const verifySmtpConnection = async () => {
  const transporter = createTransport();
  
  if (!transporter) {
    logger.error('Cannot verify SMTP connection: Transporter not initialized');
    return false;
  }

  try {
    await transporter.verify();
    logger.info('SMTP connection verified successfully');
    return true;
  } catch (error) {
    logger.error('SMTP connection verification failed:', {
      error: error.message,
      stack: error.stack
    });
    return false;
  }
};

// Send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `https://auroville.social/verify-email?token=${verificationToken}`;
  
  const subject = 'Verify Your Email for Auroville Connect';
  const text = `Please verify your email by clicking the following link: ${verificationLink}`;
  const html = `
    <h1>Email Verification</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationLink}">Verify Email</a>
  `;

  try {
    const result = await sendEmail(email, subject, text, html);
    
    if (result) {
      logger.info(`Verification email sent to ${email}`);
      return true;
    } else {
      logger.error(`Failed to send verification email to ${email}`);
      return false;
    }
  } catch (error) {
    logger.error('Error in sendVerificationEmail:', {
      error: error.message,
      stack: error.stack
    });
    return false;
  }
};
