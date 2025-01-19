const corsConfig = {
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true
};

const security = {
  timeWindow: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // More lenient limit for development
};

const port = process.env.PORT || 5000;

const databaseUrl = process.env.DATABASE_URL || "postgresql://auroville_user:ok@db:5432/auroville_connect";
const jwtSecret = process.env.JWT_SECRET || "dev_secret_key_for_local_development";
const smtpConfig = {
  server: process.env.SMTP_SERVER || 'localhost',
  port: process.env.SMTP_PORT || 1025,
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  auth: process.env.SMTP_AUTH,
  domain: process.env.SMTP_DOMAIN
};

export { corsConfig, security, port, databaseUrl, jwtSecret, smtpConfig };
