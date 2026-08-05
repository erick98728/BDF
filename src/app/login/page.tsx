"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { BetaBadge, StatusBadge } from "@/components/TesterVisualSystem";
import { supabase, isSupabaseConfigured, supabaseSetupMessage } from "@/lib/supabaseClient";

const fieldClass = "form-field";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!isSupabaseConfigured) {
      setMessage("O sistema de contas ainda está em preparação neste ambiente. Quando o Supabase for configurado, este formulário fará login real no dashboard do beta.");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setError("Não foi possível criar a conta agora. Confira os dados e tente novamente em alguns instantes.");
        setLoading(false);
        return;
      }

      await supabase.auth.signOut();
      setMessage("Conta criada. Se o Supabase solicitar confirmação, verifique seu e-mail. Depois, entre novamente para iniciar uma sessão segura no servidor.");
      setMode("login");
      setLoading(false);
      return;
    }

    const loginResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const loginPayload = (await loginResponse.json().catch(() => ({}))) as { error?: string };

    if (!loginResponse.ok) {
      setError(loginPayload.error ?? "Não foi possível entrar. Confira e-mail, senha e confirmação da conta antes de tentar novamente.");
      setLoading(false);
      return;
    }

    const redirectTo = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("redirect") : null;
    router.push(redirectTo?.startsWith("/") ? redirectTo : "/dashboard");
    router.refresh();
  }

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Login"
        description="Entre ou crie sua conta para acessar o dashboard do beta, acompanhar a build e baixar Protótipo quando o acesso for liberado."
      />
      <SectionContainer>
        <GlowCard variant="functional" contentClassName="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 opacity-35 tester-panel-grid" aria-hidden="true" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <BetaBadge>Acesso do beta</BetaBadge>
                <StatusBadge status={isSupabaseConfigured ? "ready" : "warning"}>{isSupabaseConfigured ? "Autenticação pronta" : "Configuração pendente"}</StatusBadge>
              </div>
              <h2 className="type-component-title text-role-primary mt-4">Conta do participante</h2>
              <p className="type-body-sm text-role-secondary mt-3">
                A conta serve para identificar testadores beta, liberar o dashboard privado e organizar o acesso ao download da build quando ela estiver disponível.
              </p>
              <div className="mt-5 grid gap-3">
                <div className="mini-status-card surface-role-standard px-3 py-3">
                  <GameGlyph name="user" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                  <p className="type-meta text-role-muted">Uso</p>
                  <p className="type-body-sm text-role-secondary mt-1">Dashboard, download e feedback do beta.</p>
                </div>
                <div className="mini-status-card surface-role-standard px-3 py-3">
                  <GameGlyph name="download" variant="plain" className="mb-2 h-5 w-5 text-amber-200" />
                  <p className="type-meta text-role-muted">Download</p>
                  <p className="type-body-sm text-role-secondary mt-1">Liberado apenas quando houver link oficial.</p>
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                title="Conta do beta"
                subtitle="Use e-mail e senha para preparar seu acesso de participante."
                variant="compact"
              />
              {!isSupabaseConfigured ? (
                <div className="status-chip mb-5 rounded-lg border border-amber-200/20 bg-amber-300/10 px-4 py-3 text-amber-100" role="status">
                  {supabaseSetupMessage} Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel para ativar contas reais.
                </div>
              ) : (
                <div className="status-chip mb-5 rounded-lg border border-emerald-200/20 bg-emerald-300/10 px-4 py-3 text-emerald-100" role="status">
                  Autenticação pronta para uso. Entre ou crie uma conta para acessar o painel do beta.
                </div>
              )}
              <div className="mb-5 grid grid-cols-2 gap-2 sm:inline-grid" role="group" aria-label="Modo do formulário de conta">
                <button type="button" onClick={() => setMode("login")} aria-pressed={mode === "login"} className={`tester-button ds-control border px-3 py-2 ${mode === "login" ? "border-cyan-200/30 bg-cyan-300/15 text-cyan-100" : "border-white/10 text-slate-300 hover:bg-white/5"}`}>Entrar</button>
                <button type="button" onClick={() => setMode("signup")} aria-pressed={mode === "signup"} className={`tester-button ds-control border px-3 py-2 ${mode === "signup" ? "border-cyan-200/30 bg-cyan-300/15 text-cyan-100" : "border-white/10 text-slate-300 hover:bg-white/5"}`}>Criar conta</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="login-help">
                <p id="login-help" className="sr-only">Informe e-mail e senha para entrar ou criar uma conta do beta.</p>
                <label className="form-label block" htmlFor="login-email">
                  E-mail
                  <input id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required placeholder="seu@email.com" className={`${fieldClass} mt-1`} />
                </label>
                <label className="form-label block" htmlFor="login-password">
                  Senha
                  <input id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required placeholder="Digite sua senha" className={`${fieldClass} mt-1`} />
                </label>
                <button disabled={loading} className="tester-button ds-control w-full border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                  {loading ? "Processando..." : mode === "login" ? "Entrar no beta" : "Criar conta do beta"}
                </button>
              </form>
              {error ? <p className="status-chip mt-4 rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-red-300" role="alert">{error}</p> : null}
              {message ? <p className="status-chip mt-4 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-emerald-300" role="status">{message}</p> : null}
            </div>
          </div>
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
