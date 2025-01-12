const corsConfig = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
  preflight: true
};

const security = {
  timeWindow: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100 // Higher limit for development
};

const port = process.env.PORT || 5000;

export { corsConfig, security, port };
