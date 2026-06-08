import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { setAuthSessionCookies } from "@/lib/serverAuth";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    return jsonError("Supabase ainda não está configurado no servidor.", 503);
  }

  let body: Partial<{ email: string; password: string }>;
  try {
    body = await request.json();
  } catch {
    return jsonError("Dados de login inválidos.", 400);
  }

  const email = body.email?.trim();
  const password = body.password;

  if (!email || !password) {
    return jsonError("Informe e-mail e senha para entrar.", 400);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return jsonError("Não foi possível entrar. Confira e-mail, senha e confirmação da conta antes de tentar novamente.", 401);
  }

  const response = NextResponse.json({ ok: true });
  setAuthSessionCookies(response, data.session);

  return response;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
