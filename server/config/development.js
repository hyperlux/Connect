export default {
  port: process.env.PORT || 5000,
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  db: {
    url: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/auroville"
  }
};
