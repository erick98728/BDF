"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";



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
      setError("Supabase não configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    const authCall =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { data, error: authError } = await authCall;

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (mode === "signup" && !data.session) {
      setMessage("Conta criada. Verifique seu e-mail para confirmar o cadastro.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AnimatedPageWrapper>
      <PageHeader title="Login" description="Entre ou crie sua conta para acessar futuramente o download do beta." />
      <SectionContainer>
        <GlowCard>
          <div className="mb-5 flex gap-2">
            <button type="button" onClick={() => setMode("login")} className={`rounded-lg px-3 py-2 text-sm ${mode === "login" ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300"}`}>Entrar</button>
            <button type="button" onClick={() => setMode("signup")} className={`rounded-lg px-3 py-2 text-sm ${mode === "signup" ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300"}`}>Criar conta</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Seu e-mail" className="w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Sua senha" className="w-full rounded-lg border border-cyan-200/20 bg-black/20 px-3 py-2 text-sm" />
            <button disabled={loading} className="rounded-lg border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 disabled:opacity-60">
              {loading ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>
          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
          {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
