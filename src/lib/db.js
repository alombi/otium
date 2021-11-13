import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$lib/env'

let supabaseUrl, supabaseKey;

if (process.env.NODE_ENV === 'production') {
   // For production
   supabaseUrl = process.env.SUPABASE_URL;
   supabaseKey = process.env.SUPABASE_ANON_KEY;
} else {
   // For development
   supabaseUrl = SUPABASE_URL;
   supabaseKey = SUPABASE_ANON_KEY;
}

const supabase = createClient(
   supabaseUrl,
   supabaseKey
)

export default supabase