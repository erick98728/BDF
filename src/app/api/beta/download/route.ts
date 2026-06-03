import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authAccessCookie } from "@/lib/authCookieNames";

const bucketName = "tester-beta-builds";
const signedUrlExpiresIn = 120;

type BetaAccessRow = {
  allowed: boolean;
};

type BetaBuildRow = {
  id: string;
  version: string;
  storage_path: string;
  platform: string;
};

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return jsonError("Configuração segura do Supabase ausente no servidor.", 500);
  }

  const token = readBearerToken(request) ?? request.cookies.get(authAccessCookie)?.value;

  if (!token) {
    return jsonError("Usuário não autenticado.", 401);
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  const user = userData.user;

  if (userError || !user) {
    return jsonError("Usuário não autenticado.", 401);
  }

  const { data: access, error: accessError } = await supabaseAdmin
    .from("beta_access")
    .select("allowed")
    .eq("user_id", user.id)
    .maybeSingle<BetaAccessRow>();

  if (accessError) {
    return jsonError("Erro ao verificar acesso ao beta.", 500);
  }

  if (!access?.allowed) {
    return jsonError("Usuário sem acesso ao beta.", 403);
  }

  const { data: build, error: buildError } = await supabaseAdmin
    .from("beta_builds")
    .select("id,version,storage_path,platform")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<BetaBuildRow>();

  if (buildError) {
    return jsonError("Erro ao buscar build ativa.", 500);
  }

  if (!build) {
    return jsonError("Nenhuma build ativa encontrada.", 404);
  }

  const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
    .from(bucketName)
    .createSignedUrl(build.storage_path, signedUrlExpiresIn);

  if (signedUrlError || !signedUrlData?.signedUrl) {
    return jsonError("Erro ao gerar URL assinada.", 500);
  }

  const { error: logError } = await supabaseAdmin.from("beta_download_logs").insert({
    user_id: user.id,
    build_id: build.id
  });

  if (logError) {
    return jsonError("Erro ao registrar download.", 500);
  }

  return NextResponse.json({
    downloadUrl: signedUrlData.signedUrl,
    version: build.version,
    platform: build.platform,
    expiresIn: signedUrlExpiresIn
  });
}

function readBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) return null;

  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;

  return token.trim();
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
