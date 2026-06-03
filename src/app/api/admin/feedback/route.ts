import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { canManageFeedback } from "@/lib/adminTypes";
import { getAuthenticatedUser, getServerProfile, setAuthSessionCookies } from "@/lib/serverAuth";
import type { FeedbackStatus } from "@/types/feedback";

const allowedStatuses: FeedbackStatus[] = ["new", "reviewing", "resolved", "ignored"];
const feedbackColumns = "id,created_at,user_id,beta_version,nickname,email,playtime,progress_point,movement_rating,combat_rating,map_rating,difficulty_rating,found_bug,bug_description,suggestions,status,admin_notes,reviewed_by,reviewed_at";

export async function GET(request: NextRequest) {
  const auth = await requireFeedbackAdmin(request);
  if (auth.response) return auth.response;

  const supabaseAdmin = createAdminClient();
  if (!supabaseAdmin) {
    return jsonWithOptionalRefresh({ error: "Configuração administrativa do Supabase ausente." }, 500, auth);
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const foundBug = searchParams.get("found_bug");
  const version = searchParams.get("version")?.trim();
  const search = sanitizeSearch(searchParams.get("search"));
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

  let query = supabaseAdmin
    .from("beta_feedback")
    .select(feedbackColumns)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status && allowedStatuses.includes(status as FeedbackStatus)) {
    query = query.eq("status", status);
  }

  if (foundBug === "true" || foundBug === "false") {
    query = query.eq("found_bug", foundBug === "true");
  }

  if (version) {
    query = query.eq("beta_version", version);
  }

  if (search) {
    query = query.or(`nickname.ilike.%${search}%,email.ilike.%${search}%,progress_point.ilike.%${search}%,bug_description.ilike.%${search}%,suggestions.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return jsonWithOptionalRefresh({ error: "Não foi possível listar feedbacks." }, 500, auth);
  }

  return jsonWithOptionalRefresh({ feedbacks: data ?? [] }, 200, auth);
}

async function requireFeedbackAdmin(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);
  if (!auth.user || !auth.token) {
    return { ...auth, response: NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 }) };
  }

  const profile = await getServerProfile(auth.user.id, auth.token);
  if (!canManageFeedback(profile)) {
    return { ...auth, response: jsonWithOptionalRefresh({ error: "Usuário sem permissão para gerenciar feedbacks." }, 403, auth) };
  }

  return { ...auth, response: null };
}

function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

function sanitizeSearch(value: string | null) {
  return value?.trim().replace(/[%_,()]/g, "").slice(0, 80) || "";
}

function jsonWithOptionalRefresh(body: Record<string, unknown>, status: number, auth: Awaited<ReturnType<typeof getAuthenticatedUser>>) {
  const response = NextResponse.json(body, { status });
  if (auth.refreshed && auth.session) {
    setAuthSessionCookies(response, auth.session);
  }
  return response;
}
