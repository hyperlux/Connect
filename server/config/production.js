const corsConfig = {
  origin: 'https://auroville.social',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
  preflight: true
};

const security = {
  timeWindow: 5 * 60 * 1000, // 5 minutes
  maxRequests: 50 // Stricter limit for production
};

const port = process.env.PORT || 5000;

export { corsConfig, security, port };
