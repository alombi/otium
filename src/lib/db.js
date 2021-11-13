import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
   process.env.VITE_SUPABASE_URL,
   process.env.VITE_SUPABASE_ANON_KEY
)

export default supabase