import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';

export async function authenticate(req, res, next) {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);

    if (!authHeader?.startsWith('Bearer ')) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token details:', {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      });
      console.log('Decoded token:', decoded);
      
      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true
        }
      });

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'User not found' });
      }

      console.log('User authenticated:', user.id);
      // Add user to request
      req.user = user;
      next();
    } catch (jwtError) {
      console.error('JWT verification error:', {
        error: jwtError,
        token,
        secret: process.env.JWT_SECRET?.slice(0, 5) + '...' // Only log first 5 chars of secret
      });
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}