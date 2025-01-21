const corsConfig = {
  origin: [
    'https://auroville.social',
    'https://www.auroville.social',
    process.env.NODE_ENV === 'development' && 'http://localhost:3000'
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Origin',
    'X-API-Version'
  ],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false
};

const security = {
  timeWindow: 5 * 60 * 1000, // 5 minutes
  maxRequests: 50 // Stricter limit for production
};

const port = process.env.PORT || 5000;

const databaseUrl = process.env.DATABASE_URL || "postgresql://auroville_user:ok@db:5432/auroville_connect";
const jwtSecret = process.env.JWT_SECRET || "ea21a8d798aa16aacce7fbcff1cde5dfbe50a294d5c7d14aee0ee4f6a6d2a5a7a";
const smtpConfig = {
  server: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  auth: process.env.SMTP_AUTH,
  domain: process.env.SMTP_DOMAIN
};

export { corsConfig, security, port, databaseUrl, jwtSecret, smtpConfig };
