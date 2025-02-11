import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './environment.js';

// Supabase client initialization
export const supabase = createClient(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY
);
