import cors from 'express-cors';

export const corsConfig = {
  origin: 'https://auroville.social',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
  preflight: true
};

export const applyCors = cors(corsConfig);
