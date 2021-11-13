import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
   "https://alvntboybhsaexjtmsum.supabase.co",
   process.env.VITE_SUPABASE_ANON_KEY
)

export default supabase