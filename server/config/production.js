export default {
  port: process.env.PORT || 3001,
  cors: {
    origin: [
      'https://auroville.social',
      'https://api.auroville.social'
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
  }
};
