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
  console.log('Login request body:', req.body); // Log request body
  try {
    const { email, password } = loginSchema.parse(req.body);

    console.error('Login attempt for email:', email);
    console.log('Before prisma.user.findUnique');
    const user = await prisma.user.findUnique({
      where: { email }
    });
    console.log('After prisma.user.findUnique');

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('User found:', user);

    if (!user.emailVerified) {
      return res.status(403).json({ 
        message: 'Please verify your email before logging in',
        needsVerification: true 
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log('Password does not match for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('Password valid for user:', user.email);
    console.log('Attempting to generate token for user:', user.email);
    console.log('Before prisma.user.update');
    // Update lastLoginAt
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });
    console.log('After prisma.user.update');

    console.log('Before jwt.sign');
    const token = jwt.sign(
      { 
        userId: updatedUser.id, 
        email: updatedUser.email, 
        role: updatedUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('Token generated successfully for user:', updatedUser.email);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
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

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          emailVerified: false,
          verificationToken: verificationCode
        }
      });

      await sendVerificationEmail(email, verificationCode);

      res.status(201).json({
        message: 'Registration successful. Please check your email to verify your account.'
      });
    } catch (dbError) {
      console.error('Database error:', {
        error: dbError,
        message: dbError.message,
        code: dbError.code,
        meta: dbError.meta
      });
      res.status(500).json({ 
        message: 'Registration failed. Database error.',
        details: dbError.message,
        code: dbError.code
      });
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
    res.status(500).json({ message: 'Registration failed. Please try again.', error: error.message });
  }
});

// Email verification route
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(400).json({ 
        message: 'Invalid or expired verification link. Please request a new one.',
        error: jwtError.message 
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(200).json({ 
        message: 'Email already verified. You can now log in.',
        alreadyVerified: true 
      });
    }

    const updatedUser = await prisma.user.update({
      where: { email: decoded.email },
      data: { 
        emailVerified: true,
        verificationToken: null 
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true
      }
    });

    // Generate a new token after email verification
    const newToken = jwt.sign(
      { 
        userId: updatedUser.id, 
        email: updatedUser.email, 
        role: updatedUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({ 
      message: 'Email verified successfully! You can now log in.',
      verified: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role
      },
      token: newToken
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      message: 'An error occurred during verification. Please try again.',
      error: error.message 
    });
  }
});

// Resend verification email route
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    const verificationCode = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken: verificationCode }
    });

    await sendVerificationEmail(email, verificationCode);

    res.json({ message: 'Verification email has been resent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
});

export const authRouter = router;
