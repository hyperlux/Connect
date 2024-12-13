import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { authRouter } from './routes/auth.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://auroville.social', 'http://localhost:5173'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRouter);
app.use('/users', (await import('./routes/users.js')).default);
app.use('/forums', (await import('./routes/forums.js')).default);
app.use('/events', (await import('./routes/events.js')).default);
app.use('/services', (await import('./routes/services.js')).default);
app.use('/notifications', (await import('./routes/notifications.js')).default);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
