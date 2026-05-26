"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { supabase, isSupabaseConfigured, supabaseSetupMessage } from "@/lib/supabaseClient";

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

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Login"
        description="Entre ou crie sua conta para acessar o dashboard do beta, acompanhar a build e baixar Tester quando o acesso for liberado."
      />
      <SectionContainer>
        <SectionTitle
          title="Conta do beta"
          subtitle="Use e-mail e senha para preparar seu acesso de participante. O mesmo login será usado para dashboard, download e envio de feedback."
        />
        <GlowCard>
          {!isSupabaseConfigured ? (
            <div className="mb-5 rounded-lg border border-amber-200/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
              {supabaseSetupMessage} Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel para ativar contas reais.
            </div>
          ) : (
            <div className="mb-5 rounded-lg border border-emerald-200/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-100">
              Autenticação pronta para uso. Entre ou crie uma conta para acessar o painel do beta.
            </div>
          )}
          <p className="mb-5 text-sm leading-6 text-slate-300">
            A conta serve para identificar beta testers, liberar o dashboard privado e organizar o acesso ao download da build quando ela estiver disponível.
          </p>
          <div className="mb-5 flex gap-2">
            <button type="button" onClick={() => setMode("login")} className={`rounded-lg px-3 py-2 text-sm ${mode === "login" ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300"}`}>Entrar</button>
            <button type="button" onClick={() => setMode("signup")} className={`rounded-lg px-3 py-2 text-sm ${mode === "signup" ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300"}`}>Criar conta</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Seu e-mail" className="w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Sua senha" className="w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm" />
            <button disabled={loading} className="rounded-lg border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 disabled:opacity-60">
              {loading ? "Processando..." : mode === "login" ? "Entrar no beta" : "Criar conta do beta"}
            </button>
          </form>
          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
          {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
