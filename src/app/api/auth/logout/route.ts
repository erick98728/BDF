import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authAccessCookie, authRefreshCookie } from "@/lib/authCookieNames";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const token = request.cookies.get(authAccessCookie)?.value;

  if (supabaseUrl && supabaseAnonKey && token) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } }
    });
    await supabase.auth.signOut();
  }

  const response = NextResponse.json({ ok: true });
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

  return response;
}
