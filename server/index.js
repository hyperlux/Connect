import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.mjs';
import { forumsRouter } from './routes/forums.js';
import { usersRouter } from './routes/users.js';

// Load environment variables from parent directory's .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

// Load configuration based on environment
const config = (process.env.NODE_ENV === 'production')
  ? (await import('./config/production.js')).default
  : { port: 3001, cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'cache-control', 'x-custom-header']
    }
  };

// CORS configuration
app.use(cors(config.cors));

// Rate limiting in production
if (process.env.NODE_ENV === 'production') {
  app.use(rateLimit({
    windowMs: config.security.timeWindow,
    max: config.security.maxRequests
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic CORS headers for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Debug logging for file requests
app.use('/api/uploads', (req, res, next) => {
  console.log('File request:', req.path);
  console.log('Full URL:', req.url);
  console.log('Absolute path:', path.join(__dirname, 'uploads', req.path));
  next();
});

// Serve static files from uploads directory with absolute path
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Uploads directory path:', uploadsPath);
app.use('/api/uploads', express.static(uploadsPath, {
  setHeaders: (res) => {
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));

// Routes with /api prefix
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/forums', forumsRouter);

// Import and use other routes
const { eventsRouter } = await import('./routes/events.js');
const { servicesRouter } = await import('./routes/services.js');
const { notificationsRouter } = await import('./routes/notifications.js');

app.use('/api/events', eventsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/notifications', notificationsRouter);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`
    🚀 Server is running in ${process.env.NODE_ENV} mode
    🔊 Listening on ${process.env.HOST || '0.0.0.0'}:${PORT}
    📱 API URL: ${process.env.API_URL}
    🌐 Frontend URL: ${process.env.FRONTEND_URL}
    `);
});
