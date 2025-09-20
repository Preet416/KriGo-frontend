
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';


dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; 


if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase URL or Service Key in .env');
  throw new Error('Supabase URL or Service Key is missing! Check your .env file.');
}


export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
