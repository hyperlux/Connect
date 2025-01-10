import cors from 'express-cors';
import { createClient } from '@supabase/supabase-js';

export const corsConfig = {
  origin: 'https://auroville.social',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
  preflight: true
};

export const applyCors = cors(corsConfig);

export const supabaseClient = createClient({
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_KEY
});

export const db = supabaseClient;
