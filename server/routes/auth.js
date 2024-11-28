import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query, withTransaction } from '../lib/db.js';
import { sendVerificationEmail } from '../lib/email.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const { rows: [existingUser] } = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    // Create user with verification token
    const { rows: [user] } = await query(
      `INSERT INTO users (email, password, name, verification_token)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name`,
      [email, hashedPassword, name, verificationToken]
    );

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
      console.log('Verification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails
      // But let the user know
      return res.status(201).json({
        message: 'Registration successful but verification email failed to send. Please contact support.',
        user: { id: user.id, email: user.email, name: user.name }
      });
    }

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user
    const { rows: [user] } = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.email_verified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create session
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await query(
      `INSERT INTO sessions (user_id, token, expires_at)
       VALUES ($1, $2, $3)`,
      [user.id, token, expiresAt]
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Verify email
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const { rows: [user] } = await query(
      `UPDATE users 
       SET email_verified = true, verification_token = null
       WHERE verification_token = $1
       RETURNING id, email`,
      [token]
    );

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Email verification failed' });
  }
});

// Logout
router.post('/logout', authenticate, async (req, res) => {
  try {
    await query(
      'DELETE FROM sessions WHERE user_id = $1',
      [req.user.id]
    );
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Failed to logout' });
  }
});

// Resend verification email
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const { rows: [user] } = await query(
      'SELECT * FROM users WHERE email = $1 AND email_verified = false',
      [email]
    );

    if (!user) {
      return res.status(400).json({ 
        message: 'No pending verification found for this email' 
      });
    }

    // Generate new verification token
    const verificationToken = uuidv4();
    
    // Update user's verification token
    await query(
      'UPDATE users SET verification_token = $1 WHERE id = $2',
      [verificationToken, user.id]
    );

    // Send new verification email
    await sendVerificationEmail(email, verificationToken);

    res.json({ message: 'Verification email resent successfully' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
});

export const authRouter = router;