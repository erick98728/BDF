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
import { writeAuthCookies } from "@/lib/authCookie";
import { supabase, isSupabaseConfigured, supabaseSetupMessage } from "@/lib/supabaseClient";

const fieldClass = "min-h-11 w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 hover:border-cyan-200/30 hover:bg-black/25 focus:border-cyan-200/45 focus:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";

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

    const authCall =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { data, error: authError } = await authCall;

    if (authError) {
      setError(
        mode === "login"
          ? "Não foi possível entrar. Confira e-mail, senha e confirmação da conta antes de tentar novamente."
          : "Não foi possível criar a conta agora. Confira os dados e tente novamente em alguns instantes."
      );
      setLoading(false);
      return;
    }

    if (mode === "signup" && !data.session) {
      setMessage("Conta criada. Verifique seu e-mail para confirmar o cadastro antes de entrar no dashboard.");
      setLoading(false);
      return;
    }

    writeAuthCookies(data.session?.access_token, data.session?.refresh_token);
    const redirectTo = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("redirect") : null;
    router.push(redirectTo?.startsWith("/") ? redirectTo : "/dashboard");
    router.refresh();
  }

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Login"
        description="Entre ou crie sua conta para acessar o dashboard do beta, acompanhar a build e baixar Tester quando o acesso for liberado."
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
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Conta oficial de tester</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A conta serve para identificar beta testers, liberar o dashboard privado e organizar o acesso ao download da build quando ela estiver disponível.
              </p>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <GameGlyph name="user" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Uso</p>
                  <p className="mt-1 text-slate-200">Dashboard, download e feedback do beta.</p>
                </div>
                <div className="mini-status-card rounded-lg border border-amber-200/10 bg-amber-300/[0.04] px-3 py-3">
                  <GameGlyph name="download" variant="plain" className="mb-2 h-5 w-5 text-amber-200" />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Download</p>
                  <p className="mt-1 text-slate-200">Liberado apenas quando houver link oficial.</p>
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                title="Conta do beta"
                subtitle="Use e-mail e senha para preparar seu acesso de participante."
              />
              {!isSupabaseConfigured ? (
                <div className="status-chip mb-5 rounded-lg border border-amber-200/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100" role="status">
                  {supabaseSetupMessage} Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel para ativar contas reais.
                </div>
              ) : (
                <div className="status-chip mb-5 rounded-lg border border-emerald-200/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-100" role="status">
                  Autenticação pronta para uso. Entre ou crie uma conta para acessar o painel do beta.
                </div>
              )}
              <div className="mb-5 grid grid-cols-2 gap-2 sm:inline-grid" role="tablist" aria-label="Modo do formulário de conta">
                <button type="button" onClick={() => setMode("login")} aria-pressed={mode === "login"} className={`tester-button min-h-11 rounded-lg border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${mode === "login" ? "border-cyan-200/30 bg-cyan-300/15 text-cyan-100" : "border-white/10 text-slate-300 hover:bg-white/5"}`}>Entrar</button>
                <button type="button" onClick={() => setMode("signup")} aria-pressed={mode === "signup"} className={`tester-button min-h-11 rounded-lg border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${mode === "signup" ? "border-cyan-200/30 bg-cyan-300/15 text-cyan-100" : "border-white/10 text-slate-300 hover:bg-white/5"}`}>Criar conta</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="login-help">
                <p id="login-help" className="sr-only">Informe e-mail e senha para entrar ou criar uma conta do beta.</p>
                <label className="block text-sm leading-6 text-slate-300" htmlFor="login-email">
                  E-mail
                  <input id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required placeholder="seu@email.com" className={`${fieldClass} mt-1`} />
                </label>
                <label className="block text-sm leading-6 text-slate-300" htmlFor="login-password">
                  Senha
                  <input id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required placeholder="Digite sua senha" className={`${fieldClass} mt-1`} />
                </label>
                <button disabled={loading} className="tester-button min-h-11 w-full rounded-lg border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:w-auto">
                  {loading ? "Processando..." : mode === "login" ? "Entrar no beta" : "Criar conta do beta"}
                </button>
              </form>
              {error ? <p className="status-chip mt-4 rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm leading-6 text-red-300" role="alert">{error}</p> : null}
              {message ? <p className="status-chip mt-4 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm leading-6 text-emerald-300" role="status">{message}</p> : null}
            </div>
          </div>
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
