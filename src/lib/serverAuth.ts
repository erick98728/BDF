import { type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authAccessCookie } from "@/lib/authCookieNames";
import type { AdminProfile } from "@/lib/adminTypes";

export type AuthenticatedUser = {
  id: string;
  email: string | null;
};

export function createServerSupabaseClient(token?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseAnonKey) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
  });
}

export function readAuthToken(request: NextRequest) {
  return request.cookies.get(authAccessCookie)?.value ?? null;
}

export async function getAuthenticatedUser(request: NextRequest): Promise<{ user: AuthenticatedUser | null; token: string | null }> {
  const token = readAuthToken(request);
  if (!token) return { user: null, token: null };

  const supabase = createServerSupabaseClient(token);
  if (!supabase) return { user: null, token };

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return { user: null, token };

  return {
    token,
    user: {
      id: data.user.id,
      email: data.user.email ?? null
    }
  };
}

export async function getServerProfile(userId: string, token: string): Promise<AdminProfile | null> {
  const supabase = createServerSupabaseClient(token);
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name,role,permissions,active,created_at,updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    ...(data as AdminProfile),
    role: (data as AdminProfile).role ?? "user",
    permissions: Array.isArray((data as AdminProfile).permissions) ? (data as AdminProfile).permissions : [],
    active: (data as AdminProfile).active !== false
  };
}
