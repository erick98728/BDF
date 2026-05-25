"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { playtimeOptions, progressOptions, ratingOptions } from "@/data/feedbackQuestions";
import type { FeedbackFormData, FeedbackRatings } from "@/types/feedback";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

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

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!isSupabaseConfigured) return;
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) setFormData((p) => ({ ...p, email: data.user.email }));
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
      setError("Preencha os campos obrigatórios para enviar seu feedback.");
      return;
    }

    setLoading(true);

    if (!isSupabaseConfigured) {
      setSuccess("Feedback validado no frontend. Configure Supabase para salvar os envios.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("beta_feedback").insert({
      nickname: formData.nickname,
      email: formData.email,
      playtime: formData.playtime,
      progress_point: formData.progressPoint,
      movement_rating: formData.movementRating,
      combat_rating: formData.combatRating,
      map_rating: formData.mapRating,
      difficulty_rating: formData.difficultyRating,
      found_bug: formData.foundBug,
      bug_description: formData.bugDescription,
      suggestions: formData.suggestions,
    });

    if (insertError) {
      setError(`Não foi possível salvar no Supabase: ${insertError.message}`);
      setLoading(false);
      return;
    }

    setSuccess("Feedback enviado com sucesso. Obrigado por contribuir com Tester.");
    setLoading(false);
    setFormData((p) => ({ ...initialData, email: p.email }));
  }

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Feedback"
        description="Envie sua experiência com o beta de Tester. Seu retorno é privado e essencial."
      />
      <SectionContainer>
        <SectionTitle
          title="Formulário de feedback"
          subtitle="Não coletamos dados sensíveis. Este formulário é privado para o desenvolvedor."
        />
        <GlowCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm"
                placeholder="Nome ou apelido"
                value={formData.nickname}
                onChange={(e) => setFormData((p) => ({ ...p, nickname: e.target.value }))}
                required
              />
              <input
                className="rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <select
                className="rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm"
                value={formData.playtime}
                onChange={(e) => setFormData((p) => ({ ...p, playtime: e.target.value }))}
                required
              >
                <option value="">Tempo jogado</option>
                {playtimeOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <select
                className="rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm"
                value={formData.progressPoint}
                onChange={(e) => setFormData((p) => ({ ...p, progressPoint: e.target.value }))}
                required
              >
                <option value="">Onde parou</option>
                {progressOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {ratingFieldLabels.map(({ label, field }) => (
                <label key={field} className="text-sm text-slate-300">
                  {label}
                  <select
                    className="mt-1 w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2"
                    value={formData[field]}
                    onChange={(e) => setRating(field, Number(e.target.value) as FeedbackRatings)}
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
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={formData.foundBug}
                onChange={(e) => setFormData((p) => ({ ...p, foundBug: e.target.checked }))}
              />
              Encontrou bug?
            </label>
            <textarea
              className="min-h-24 w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm"
              placeholder="Descrição do bug"
              value={formData.bugDescription}
              onChange={(e) => setFormData((p) => ({ ...p, bugDescription: e.target.value }))}
              disabled={!formData.foundBug}
            />
            <textarea
              className="min-h-24 w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm"
              placeholder="Sugestões gerais"
              value={formData.suggestions}
              onChange={(e) => setFormData((p) => ({ ...p, suggestions: e.target.value }))}
            />
            <button
              disabled={loading || !Boolean(isValid)}
              className="rounded-lg border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar feedback"}
            </button>
          </form>
          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
          {success ? <p className="mt-4 text-sm text-emerald-300">{success}</p> : null}
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
