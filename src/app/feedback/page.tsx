"use client";
import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { BetaBadge, StatusBadge } from "@/components/TesterVisualSystem";
import {
  playtimeOptions,
  progressOptions,
  ratingOptions,
} from "@/data/feedbackQuestions";
import type { FeedbackFormData, FeedbackRatings } from "@/types/feedback";
import {
  isSupabaseConfigured,
  supabaseSetupMessage,
} from "@/lib/supabaseClient";

const initialData: FeedbackFormData = {
  nickname: "",
  email: "",
  playtime: "",
  progressPoint: "",
  movementRating: 3,
  combatRating: 3,
  mapRating: 3,
  difficultyRating: 3,
  foundBug: false,
  bugDescription: "",
  suggestions: "",
};

type RatingField =
  | "movementRating"
  | "combatRating"
  | "mapRating"
  | "difficultyRating";

const ratingFieldLabels: Array<{ label: string; field: RatingField }> = [
  { label: "Nota para movimento", field: "movementRating" },
  { label: "Nota para combate", field: "combatRating" },
  { label: "Nota para mapa", field: "mapRating" },
  { label: "Nota para dificuldade", field: "difficultyRating" },
];

const fieldClass =
  "min-h-11 w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 hover:border-cyan-200/30 hover:bg-black/25 focus:border-cyan-200/45 focus:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-55";

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured) return;
      const session = await getServerSession();
      const userEmail = session.user?.email;
      if (userEmail) setFormData((p) => ({ ...p, email: userEmail }));
    })();
  }, []);

  const isValid = useMemo(
    () =>
      formData.nickname.trim() &&
      formData.email.trim() &&
      formData.playtime &&
      formData.progressPoint &&
      (!formData.foundBug || formData.bugDescription.trim()),
    [formData],
  );

  function setRating(field: RatingField, value: FeedbackRatings) {
    setFormData((p) => ({ ...p, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isValid) {
      setError(
        "Revise os campos obrigatórios: nome, email, tempo jogado, ponto de progresso e descrição do problema quando marcado.",
      );
      return;
    }

    setLoading(true);

    if (!isSupabaseConfigured) {
      setSuccess(
        "Feedback validado com sucesso neste ambiente. Para registrar envios reais, configure o Supabase e a tabela beta_feedback no deploy.",
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setError(
          data.error ??
            "Não foi possível registrar seu feedback agora. Faça login e tente novamente.",
        );
        setLoading(false);
        return;
      }
    } catch {
      setError(
        "Não foi possível conectar ao servidor de feedback agora. Tente novamente em instantes.",
      );
      setLoading(false);
      return;
    }

    setSuccess(
      "Feedback enviado com sucesso. Obrigado por ajudar a melhorar Protótipo.",
    );
    setLoading(false);
    setFormData((p) => ({ ...initialData, email: p.email }));
  }

  return (
    <AnimatedPageWrapper>
      <PageHeader
        variant="compact"
        eyebrow="Feedback"
        title="Feedback"
        description="Canal oficial para registrar sua experiência com o beta de Protótipo. Seu retorno é privado e essencial."
      />
      <SectionContainer>
        <GlowCard
          variant="panel"
          contentClassName="relative overflow-hidden p-5 sm:p-7"
        >
          <div
            className="absolute inset-0 opacity-35 tester-panel-grid"
            aria-hidden="true"
          />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <BetaBadge>Canal do beta</BetaBadge>
                <StatusBadge status={isSupabaseConfigured ? "live" : "warning"}>
                  {isSupabaseConfigured ? "Envio ativo" : "Modo de teste"}
                </StatusBadge>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Feedback que orienta a build.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use este formulário para registrar tempo jogado, ponto de
                progresso, percepção de combate, movimentação, mapa e
                dificuldade. O objetivo é transformar teste em melhoria
                concreta.
              </p>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <GameGlyph
                    name="checklist"
                    variant="plain"
                    className="mb-2 h-5 w-5 text-cyan-200"
                  />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                    O que avaliar
                  </p>
                  <p className="mt-1 text-slate-200">
                    Movimento, combate, mapa, dificuldade e bugs.
                  </p>
                </div>
                <div className="mini-status-card rounded-lg border border-purple-200/10 bg-purple-300/[0.04] px-3 py-3">
                  <GameGlyph
                    name="feedback"
                    variant="plain"
                    className="mb-2 h-5 w-5 text-purple-200"
                  />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                    Privacidade
                  </p>
                  <p className="mt-1 text-slate-200">
                    Retorno privado para desenvolvimento do beta.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                eyebrow="Formulário"
                title="Registro do teste"
                subtitle="Organize seu retorno por identificação, progresso, avaliações, bugs e sugestões."
              />
              {!isSupabaseConfigured ? (
                <p
                  className="status-chip mb-4 rounded-lg border border-amber-200/20 bg-amber-300/10 px-3 py-2 text-sm leading-6 text-amber-100"
                  role="status"
                >
                  {supabaseSetupMessage} O formulário pode ser testado, mas o
                  salvamento definitivo depende da tabela beta_feedback no
                  Supabase.
                </p>
              ) : null}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-describedby="feedback-help"
              >
                <p id="feedback-help" className="sr-only">
                  Preencha os campos obrigatórios para enviar sua experiência
                  com o beta.
                </p>

                <FeedbackFormGroup
                  title="Identificação"
                  description="Use um apelido e o email da conta que testou a build."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <label
                      className="block text-sm leading-6 text-slate-300"
                      htmlFor="feedback-nickname"
                    >
                      Nome ou apelido
                      <input
                        id="feedback-nickname"
                        className={`${fieldClass} mt-1`}
                        placeholder="Como quer ser identificado"
                        value={formData.nickname}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            nickname: e.target.value,
                          }))
                        }
                        required
                      />
                    </label>
                    <label
                      className="block text-sm leading-6 text-slate-300"
                      htmlFor="feedback-email"
                    >
                      Email
                      <input
                        id="feedback-email"
                        className={`${fieldClass} mt-1`}
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                      />
                    </label>
                  </div>
                </FeedbackFormGroup>

                <FeedbackFormGroup
                  title="Progresso"
                  description="Diga até onde jogou para relacionarmos o retorno ao trecho correto."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <label
                      className="block text-sm leading-6 text-slate-300"
                      htmlFor="feedback-playtime"
                    >
                      Tempo jogado
                      <select
                        id="feedback-playtime"
                        className={`${fieldClass} mt-1`}
                        value={formData.playtime}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            playtime: e.target.value,
                          }))
                        }
                        required
                      >
                        <option value="">Selecione o tempo jogado</option>
                        {playtimeOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label
                      className="block text-sm leading-6 text-slate-300"
                      htmlFor="feedback-progress"
                    >
                      Onde parou
                      <select
                        id="feedback-progress"
                        className={`${fieldClass} mt-1`}
                        value={formData.progressPoint}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            progressPoint: e.target.value,
                          }))
                        }
                        required
                      >
                        <option value="">Selecione o ponto de progresso</option>
                        {progressOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </FeedbackFormGroup>

                <FeedbackFormGroup
                  title="Avaliações"
                  description="Notas rápidas ajudam a comparar diferentes sessões de teste."
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    {ratingFieldLabels.map(({ label, field }) => (
                      <label
                        key={field}
                        className="text-sm leading-6 text-slate-300"
                      >
                        {label}
                        <select
                          className={`${fieldClass} mt-1`}
                          value={formData[field]}
                          onChange={(e) =>
                            setRating(
                              field,
                              Number(e.target.value) as FeedbackRatings,
                            )
                          }
                        >
                          {ratingOptions.map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                </FeedbackFormGroup>

                <FeedbackFormGroup
                  title="Bugs e sugestões"
                  description="Descreva problemas encontrados e oportunidades de melhoria."
                >
                  <div className="grid gap-4">
                    <label className="mini-status-card flex min-h-11 items-start gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-3 text-sm leading-6 text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.foundBug}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            foundBug: e.target.checked,
                          }))
                        }
                        className="mt-1 h-4 w-4 shrink-0 accent-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                      />
                      <span>Encontrou algum problema?</span>
                    </label>
                    <label
                      className="block text-sm leading-6 text-slate-300"
                      htmlFor="feedback-bug"
                    >
                      Descrição do problema
                      <textarea
                        id="feedback-bug"
                        className={`${fieldClass} mt-1 min-h-28 resize-y`}
                        placeholder="Descreva o problema encontrado"
                        value={formData.bugDescription}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            bugDescription: e.target.value,
                          }))
                        }
                        disabled={!formData.foundBug}
                      />
                    </label>
                    <label
                      className="block text-sm leading-6 text-slate-300"
                      htmlFor="feedback-suggestions"
                    >
                      Sugestões gerais
                      <textarea
                        id="feedback-suggestions"
                        className={`${fieldClass} mt-1 min-h-28 resize-y`}
                        placeholder="O que pode melhorar?"
                        value={formData.suggestions}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            suggestions: e.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>
                </FeedbackFormGroup>

                <div className="flex flex-col gap-3 rounded-2xl border border-cyan-200/10 bg-cyan-300/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-slate-300">
                    Revise as informações antes de enviar. O retorno fica
                    privado para triagem do projeto.
                  </p>
                  <button
                    disabled={loading || !Boolean(isValid)}
                    className="tester-button min-h-11 w-full rounded-lg border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:w-auto"
                  >
                    {loading ? "Enviando..." : "Enviar feedback"}
                  </button>
                </div>
              </form>
              {error ? (
                <p
                  className="status-chip mt-4 rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm leading-6 text-red-300"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
              {success ? (
                <p
                  className="status-chip mt-4 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm leading-6 text-emerald-300"
                  role="status"
                >
                  {success}
                </p>
              ) : null}
            </div>
          </div>
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}

function FeedbackFormGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <legend className="px-1 text-sm font-semibold text-white">{title}</legend>
      <p className="mb-4 mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>
      {children}
    </fieldset>
  );
}

type ServerSession = {
  authenticated: boolean;
  user: { id: string; email: string | null } | null;
};

async function getServerSession(): Promise<ServerSession> {
  try {
    const response = await fetch("/api/auth/me", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return { authenticated: false, user: null };
    return (await response.json()) as ServerSession;
  } catch {
    return { authenticated: false, user: null };
  }
}
