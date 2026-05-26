import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const fallbackSupabaseUrl = "https://placeholder.supabase.co";
const fallbackSupabaseAnonKey = "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabaseSetupMessage = isSupabaseConfigured
  ? "Supabase configurado. Autenticação e feedback podem usar o backend."
  : "Supabase ainda não configurado. O site continua funcionando em modo de preparação.";

export const supabase = createClient(
  supabaseUrl || fallbackSupabaseUrl,
  supabaseAnonKey || fallbackSupabaseAnonKey,
  {
    auth: {
      persistSession: isSupabaseConfigured,
      autoRefreshToken: isSupabaseConfigured,
      detectSessionInUrl: isSupabaseConfigured
    }
  }
);
