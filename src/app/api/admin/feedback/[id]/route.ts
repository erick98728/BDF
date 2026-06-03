import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { canManageFeedback } from "@/lib/adminTypes";
import { getAuthenticatedUser, getServerProfile, setAuthSessionCookies } from "@/lib/serverAuth";
import type { FeedbackStatus } from "@/types/feedback";

const allowedStatuses: FeedbackStatus[] = ["new", "reviewing", "resolved", "ignored"];
const feedbackColumns = "id,created_at,user_id,beta_version,nickname,email,playtime,progress_point,movement_rating,combat_rating,map_rating,difficulty_rating,found_bug,bug_description,suggestions,status,admin_notes,reviewed_by,reviewed_at";

type PatchPayload = {
  status?: unknown;
  admin_notes?: unknown;
};

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const auth = await requireFeedbackAdmin(request);
  if (auth.response) return auth.response;

  const reviewerId = auth.user?.id;
  if (!reviewerId) {
    return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
  }

  const supabaseAdmin = createAdminClient();
  if (!supabaseAdmin) {
    return jsonWithOptionalRefresh({ error: "Configuração administrativa do Supabase ausente." }, 500, auth);
  }

  let payload: PatchPayload;
  try {
    payload = (await request.json()) as PatchPayload;
  } catch {
    return jsonWithOptionalRefresh({ error: "JSON inválido para atualização de feedback." }, 400, auth);
  }

  const updates = parseUpdates(payload, reviewerId);
  if (!updates.ok) {
    return jsonWithOptionalRefresh({ error: updates.error }, 400, auth);
  }

  const { data, error } = await supabaseAdmin
    .from("beta_feedback")
    .update(updates.data)
    .eq("id", id)
    .select(feedbackColumns)
    .maybeSingle();

  if (error) {
    return jsonWithOptionalRefresh({ error: "Não foi possível atualizar o feedback." }, 500, auth);
  }

  if (!data) {
    return jsonWithOptionalRefresh({ error: "Feedback não encontrado." }, 404, auth);
  }

  return jsonWithOptionalRefresh({ feedback: data }, 200, auth);
}

function parseUpdates(payload: PatchPayload, reviewerId: string) {
  const updates: { status?: FeedbackStatus; admin_notes?: string | null; reviewed_by: string; reviewed_at: string } = {
    reviewed_by: reviewerId,
    reviewed_at: new Date().toISOString()
  };

  if (payload.status !== undefined) {
    if (typeof payload.status !== "string" || !allowedStatuses.includes(payload.status as FeedbackStatus)) {
      return { ok: false as const, error: "Status de feedback inválido." };
    }
    updates.status = payload.status as FeedbackStatus;
  }

  if (payload.admin_notes !== undefined) {
    if (payload.admin_notes !== null && typeof payload.admin_notes !== "string") {
      return { ok: false as const, error: "Notas administrativas inválidas." };
    }
    updates.admin_notes = typeof payload.admin_notes === "string" ? payload.admin_notes.trim().slice(0, 4000) || null : null;
  }

  if (updates.status === undefined && updates.admin_notes === undefined) {
    return { ok: false as const, error: "Informe status ou notas administrativas para atualizar." };
  }

  return { ok: true as const, data: updates };
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

function jsonWithOptionalRefresh(body: Record<string, unknown>, status: number, auth: Awaited<ReturnType<typeof getAuthenticatedUser>>) {
  const response = NextResponse.json(body, { status });
  if (auth.refreshed && auth.session) {
    setAuthSessionCookies(response, auth.session);
  }
  return response;
}
