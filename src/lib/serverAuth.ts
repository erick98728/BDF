import { type NextRequest, type NextResponse } from "next/server";
import { createClient, type Session } from "@supabase/supabase-js";
import { authAccessCookie, authRefreshCookie } from "@/lib/authCookieNames";
import type { AdminProfile } from "@/lib/adminTypes";

export type AuthenticatedUser = {
  id: string;
  email: string | null;
};

export type AuthSessionResult = {
  user: AuthenticatedUser | null;
  token: string | null;
  refreshed: boolean;
  session: Session | null;
};

const refreshCookieMaxAge = 60 * 60 * 24 * 30;

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

export function readRefreshToken(request: NextRequest) {
  return request.cookies.get(authRefreshCookie)?.value ?? null;
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AuthSessionResult> {
  const token = readAuthToken(request);
  const validated = await validateAccessToken(token);

  if (validated.user) {
    return { user: validated.user, token, refreshed: false, session: null };
  }

  return refreshServerSession(request);
}

export async function refreshServerSession(request: NextRequest): Promise<AuthSessionResult> {
  const refreshToken = readRefreshToken(request);
  if (!refreshToken) return emptySessionResult();

  const supabase = createServerSupabaseClient();
  if (!supabase) return emptySessionResult();

  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  const session = data.session;
  const user = data.user ?? session?.user ?? null;

  if (error || !session?.access_token || !session.refresh_token || !user) {
    return emptySessionResult();
  }

  return {
    user: {
      id: user.id,
      email: user.email ?? null
    },
    token: session.access_token,
    refreshed: true,
    session
  };
}

export function setAuthSessionCookies(response: NextResponse, session: Session) {
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set(authAccessCookie, session.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: session.expires_in ?? 3600
  });

  response.cookies.set(authRefreshCookie, session.refresh_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: refreshCookieMaxAge
  });
}

export function clearAuthSessionCookies(response: NextResponse) {
  const secure = process.env.NODE_ENV === "production";

  for (const cookieName of [authAccessCookie, authRefreshCookie]) {
    response.cookies.set(cookieName, "", {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });
  }
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

async function validateAccessToken(token: string | null): Promise<{ user: AuthenticatedUser | null }> {
  if (!token) return { user: null };

  const supabase = createServerSupabaseClient(token);
  if (!supabase) return { user: null };

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return { user: null };

  return {
    user: {
      id: data.user.id,
      email: data.user.email ?? null
    }
  };
}

function emptySessionResult(): AuthSessionResult {
  return { user: null, token: null, refreshed: false, session: null };
}
