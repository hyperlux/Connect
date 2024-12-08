import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { eventsRouter } from './routes/events.js';
import { forumsRouter } from './routes/forums.js';
import { usersRouter } from './routes/users.js';
import { servicesRouter } from './routes/services.js';
import { notificationsRouter } from './routes/notifications.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticate } from './middleware/authenticate.js';

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'https://auroville.social',
  'http://frontend',  // Docker service name
  'https://api.auroville.social',
  process.env.CORS_ORIGIN
].filter(Boolean);

// Debug middleware to log CORS details
app.use((req, res, next) => {
  console.log('🔍 Incoming request details:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    host: req.headers.host,
    'access-control-request-method': req.headers['access-control-request-method'],
    'access-control-request-headers': req.headers['access-control-request-headers']
  });
  next();
});

app.use(cors({
  origin: function(origin, callback) {
    console.log('🔒 CORS Origin Check:', {
      requestOrigin: origin,
      allowedOrigins: allowedOrigins
    });
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ No origin - allowing request');
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.error('❌ Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 204
}));

// Add response header logging
app.use((req, res, next) => {
  // Ensure CORS headers are set on every response
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
  
  const originalSend = res.send;
  res.send = function(...args) {
    console.log('📤 Response headers:', {
      'access-control-allow-origin': res.getHeader('access-control-allow-origin'),
      'access-control-allow-credentials': res.getHeader('access-control-allow-credentials'),
      'access-control-allow-methods': res.getHeader('access-control-allow-methods'),
      'access-control-allow-headers': res.getHeader('access-control-allow-headers')
    });
    return originalSend.apply(res, args);
  };
  next();
});

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, {
    body: req.body,
    headers: req.headers
  });
  next();
});

// Public routes
app.use('/auth', authRouter);
app.use('/api/events', eventsRouter);

// Protected routes
app.use('/api/forums', authenticate, forumsRouter);
app.use('/api/users', authenticate, usersRouter);
app.use('/api/services', authenticate, servicesRouter);
app.use('/api/notifications', authenticate, notificationsRouter);

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});