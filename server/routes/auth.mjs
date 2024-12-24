import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
import { sendVerificationEmail } from '../lib/email.js';
import { authenticate } from '../middleware/authenticate.js';
import { z } from 'zod';

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

router.post('/login', async (req, res) => {
  try {
    console.log('🔍 Login attempt:', { email: req.body.email });
    
    // Validate input
    const { email, password } = loginSchema.parse(req.body);
    console.log('✅ Input validation passed');

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    console.log('👤 User lookup result:', { found: !!user, userId: user?.id });

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      console.log('❌ Email not verified');
      return res.status(403).json({ 
        message: 'Please verify your email before logging in',
        needsVerification: true 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('🔐 Password check:', { isValid: isValidPassword });
    
    if (!isValidPassword) {
      console.log('❌ Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('🎟️ JWT token created');

    // Return user data and token
    console.log('✅ Login successful');
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        bio: user.bio,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Invalid input', 
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

router.post('/register', async (req, res) => {
  try {
    // Validate input
    const { name, email, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    try {
      // Create user with email auto-verified for development
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'USER',
          verificationToken,
          emailVerified: true // Auto-verify for development
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          bio: true,
          profilePicture: true,
          createdAt: true
        }
      });

      // Create JWT token for immediate login
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Return user data and token
      res.status(201).json({
        user,
        token,
        message: 'Registration successful. You can now log in.',
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({ message: 'Registration failed. Database error.' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Invalid input', 
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Email verification route
router.get('/verify-email', async (req, res) => {
  try {
    console.log('📧 Email verification request received:', { 
      token: req.query.token?.substring(0, 10) + '...' 
    });
    
    const { token } = req.query;
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(400).json({ message: 'Verification token is required' });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token verified successfully:', { email: decoded.email });
    } catch (jwtError) {
      console.log('❌ Token verification failed:', jwtError.message);
      return res.status(400).json({ 
        message: 'Invalid or expired verification link. Please request a new one.',
        error: jwtError.message 
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: decoded.email }
    });

    if (!user) {
      console.log('❌ User not found:', { email: decoded.email });
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      console.log('ℹ️ Email already verified:', { email: decoded.email });
      return res.status(200).json({ 
        message: 'Email already verified. You can now log in.',
        alreadyVerified: true 
      });
    }

    // Update user verification status
    const updatedUser = await prisma.user.update({
      where: { email: decoded.email },
      data: { 
        emailVerified: true,
        verificationToken: null 
      },
      select: {
        id: true,
        email: true,
        emailVerified: true
      }
    });

    console.log('✅ Email verification successful:', {
      userId: updatedUser.id,
      email: updatedUser.email
    });

    return res.status(200).json({ 
      message: 'Email verified successfully! You can now log in.',
      verified: true
    });
  } catch (error) {
    console.error('❌ Verification error:', error);
    return res.status(500).json({ 
      message: 'An error occurred during verification. Please try again.',
      error: error.message 
    });
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Save reset token and expiry to user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour from now
      }
    });

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    await sendVerificationEmail(email, resetToken); // Reusing verification email function for now

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Failed to process password reset request' });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    res.json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

// Resend verification email route
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update user with new verification token
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken }
    });

    // Send new verification email
    await sendVerificationEmail(email, verificationToken);

    res.json({ message: 'Verification email has been resent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
});

// Verify auth token endpoint
router.get('/verify', authenticate, async (req, res) => {
  try {
    // Since we're using the authenticate middleware, we already have the verified user ID
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
        profilePicture: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ message: 'Token verification failed' });
  }
});

// Temporary admin verify endpoint
router.post('/admin-verify', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await prisma.user.update({
      where: { email },
      data: { 
        emailVerified: true,
        verificationToken: null 
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error('Admin verification error:', error);
    return res.status(500).json({ 
      message: 'Failed to verify user',
      error: error.message 
    });
  }
});

export const authRouter = router;
