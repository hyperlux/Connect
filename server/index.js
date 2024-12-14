import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { dirname } from 'path';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.mjs';
import { forumsRouter } from './routes/forums.js';
import { usersRouter } from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Load configuration based on environment
const config = (process.env.NODE_ENV === 'production')
  ? (await import('./config/production.js')).default
  : { port: 3001, cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
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

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
