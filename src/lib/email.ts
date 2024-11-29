import axios from './axios';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

interface Event {
  title: string;
  date: string;
  location: string;
}

interface Notification {
  title: string;
  message: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions): Promise<boolean> => {
  try {
    await axios.post('/api/email/send', {
      to,
      subject,
      text,
      html: html || text
    });
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};

// Helper function to send welcome email
export const sendWelcomeEmail = async (to: string, name: string): Promise<boolean> => {
  const subject = 'Welcome to Auroville Community Platform';
  const text = `
    Dear ${name},

    Welcome to the Auroville Community Platform! We're excited to have you join our community.

    Here are some quick links to get you started:
    - Complete your profile
    - Explore upcoming events
    - Join community discussions

    If you have any questions, feel free to reach out to our support team.

    Best regards,
    The Auroville Community Team
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #E27B58;">Welcome to Auroville Community Platform!</h2>
      <p>Dear ${name},</p>
      <p>We're excited to have you join our community!</p>
      <div style="margin: 20px 0;">
        <p><strong>Here are some quick links to get you started:</strong></p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore upcoming events</li>
          <li>Join community discussions</li>
        </ul>
      </div>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>The Auroville Community Team</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};

// Helper function to send notification email
export const sendNotificationEmail = async (to: string, notification: Notification): Promise<boolean> => {
  const subject = notification.title;
  const text = notification.message;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #E27B58;">${notification.title}</h2>
      <p>${notification.message}</p>
      <p>Best regards,<br>The Auroville Community Team</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};

// Helper function to send event reminder email
export const sendEventReminderEmail = async (to: string, event: Event): Promise<boolean> => {
  const subject = `Reminder: ${event.title}`;
  const text = `
    Don't forget about the upcoming event: ${event.title}
    Date: ${event.date}
    Location: ${event.location}

    We look forward to seeing you there!

    Best regards,
    The Auroville Community Team
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #E27B58;">Event Reminder</h2>
      <p>Don't forget about the upcoming event:</p>
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin: 0 0 10px 0;">${event.title}</h3>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${event.date}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${event.location}</p>
      </div>
      <p>We look forward to seeing you there!</p>
      <p>Best regards,<br>The Auroville Community Team</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendNotificationEmail,
  sendEventReminderEmail
};