import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authAccessCookie } from "./src/lib/authCookie";
import { canAccessAdmin } from "./src/lib/adminTypes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/acesso-negado")) {
    return NextResponse.next();
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/acesso-negado";
    url.searchParams.set("motivo", "supabase");
    return NextResponse.redirect(url);
  }

  const token = request.cookies.get(authAccessCookie)?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } }
  });
  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role,permissions,active")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (profileError || !canAccessAdmin(profile)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/acesso-negado";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
