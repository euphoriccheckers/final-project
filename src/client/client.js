const URL = import.meta.env.VITE_DB_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(URL, API_KEY);

export default supabase;