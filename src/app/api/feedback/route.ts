import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser, setAuthSessionCookies, createServerSupabaseClient } from "@/lib/serverAuth";

const betaVersion = "Tester Beta 0.1";
const maxTextLength = 2000;

type FeedbackPayload = {
  nickname?: unknown;
  email?: unknown;
  playtime?: unknown;
  progressPoint?: unknown;
  movementRating?: unknown;
  combatRating?: unknown;
  mapRating?: unknown;
  difficultyRating?: unknown;
  foundBug?: unknown;
  bugDescription?: unknown;
  suggestions?: unknown;
};

type ParsedFeedbackData = {
  nickname: string;
  email: string;
  playtime: string;
  progressPoint: string;
  movementRating: number;
  combatRating: number;
  mapRating: number;
  difficultyRating: number;
  foundBug: boolean;
  bugDescription: string | null;
  suggestions: string | null;
};

export async function POST(request: NextRequest) {
  const auth = await getAuthenticatedUser(request);

  if (!auth.user || !auth.token) {
    return NextResponse.json({ error: "Você precisa estar autenticado para enviar feedback." }, { status: 401 });
  }

  let payload: FeedbackPayload;
  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    return jsonWithOptionalRefresh({ error: "JSON inválido no envio de feedback." }, 400, auth);
  }

  const parsed = parseFeedbackPayload(payload);
  if (!parsed.ok) {
    return jsonWithOptionalRefresh({ error: parsed.error }, 400, auth);
  }

  const supabase = createServerSupabaseClient(auth.token);
  if (!supabase) {
    return jsonWithOptionalRefresh({ error: "Supabase não configurado no servidor." }, 500, auth);
  }

  const { error } = await supabase.from("beta_feedback").insert({
    user_id: auth.user.id,
    beta_version: betaVersion,
    status: "new",
    nickname: parsed.data.nickname,
    email: parsed.data.email,
    playtime: parsed.data.playtime,
    progress_point: parsed.data.progressPoint,
    movement_rating: parsed.data.movementRating,
    combat_rating: parsed.data.combatRating,
    map_rating: parsed.data.mapRating,
    difficulty_rating: parsed.data.difficultyRating,
    found_bug: parsed.data.foundBug,
    bug_description: parsed.data.bugDescription,
    suggestions: parsed.data.suggestions
  });

  if (error) {
    return jsonWithOptionalRefresh({ error: "Não foi possível registrar seu feedback agora." }, 500, auth);
  }

  return jsonWithOptionalRefresh({ ok: true }, 201, auth);
}

function parseFeedbackPayload(payload: FeedbackPayload):
  | { ok: true; data: ParsedFeedbackData }
  | { ok: false; error: string } {
  const nickname = readRequiredText(payload.nickname, "nome ou apelido");
  const email = readRequiredText(payload.email, "email");
  const playtime = readRequiredText(payload.playtime, "tempo jogado");
  const progressPoint = readRequiredText(payload.progressPoint, "ponto de progresso");
  const movementRating = readRating(payload.movementRating, "movimento");
  const combatRating = readRating(payload.combatRating, "combate");
  const mapRating = readRating(payload.mapRating, "mapa");
  const difficultyRating = readRating(payload.difficultyRating, "dificuldade");

  if (!nickname.ok) return nickname;
  if (!email.ok) return email;
  if (!playtime.ok) return playtime;
  if (!progressPoint.ok) return progressPoint;
  if (!movementRating.ok) return movementRating;
  if (!combatRating.ok) return combatRating;
  if (!mapRating.ok) return mapRating;
  if (!difficultyRating.ok) return difficultyRating;

  const foundBug = typeof payload.foundBug === "boolean" ? payload.foundBug : false;
  const bugDescription = readOptionalText(payload.bugDescription);
  const suggestions = readOptionalText(payload.suggestions);

  if (foundBug && !bugDescription) {
    return { ok: false, error: "Descreva o problema encontrado para enviar feedback de bug." };
  }

  return {
    ok: true,
    data: {
      nickname: nickname.value,
      email: email.value,
      playtime: playtime.value,
      progressPoint: progressPoint.value,
      movementRating: movementRating.value,
      combatRating: combatRating.value,
      mapRating: mapRating.value,
      difficultyRating: difficultyRating.value,
      foundBug,
      bugDescription,
      suggestions
    }
  };
}

function readRequiredText(value: unknown, label: string) {
  if (typeof value !== "string") return { ok: false as const, error: `Informe ${label}.` };
  const trimmed = value.trim();
  if (!trimmed) return { ok: false as const, error: `Informe ${label}.` };
  return { ok: true as const, value: trimmed.slice(0, maxTextLength) };
}

function readOptionalText(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, maxTextLength) || null : null;
}

function readRating(value: unknown, label: string) {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false as const, error: `Informe uma nota válida para ${label}.` };
  }
  return { ok: true as const, value: rating };
}

function jsonWithOptionalRefresh(body: Record<string, unknown>, status: number, auth: Awaited<ReturnType<typeof getAuthenticatedUser>>) {
  const response = NextResponse.json(body, { status });
  if (auth.refreshed && auth.session) {
    setAuthSessionCookies(response, auth.session);
  }
  return response;
}
