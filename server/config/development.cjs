module.exports = {
  port: process.env.PORT || 5000,
  cors: {
    origin: '*', // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
  },
  db: {
    url: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/auroville"
  }
};
