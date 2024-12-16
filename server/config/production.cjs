module.exports = {
  port: process.env.PORT || 5000,
  cors: {
    origin: [
      'https://auroville.social',
      'https://api.auroville.social',
      'http://localhost:5000',
      'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
      'X-Requested-With',
      'X-Custom-Header',
      'Accept',
      'Cache-Control'
    ]
  },
  security: {
    rateLimiting: true,
    maxRequests: 100,
    timeWindow: 15 * 60 * 1000 // 15 minutes
  },
  db: {
    url: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/auroville"
  }
};
