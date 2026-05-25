"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { GameButton } from "@/components/GameButton";
import { ProtectedDownloadCard } from "@/components/ProtectedDownloadCard";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

const betaSteps = [
  "Baixe a versão mais recente",
  "Jogue do início ao fim",
  "Anote bugs e pontos confusos",
  "Envie feedback"
];

const playerChecklist = [
  "Entendi os controles",
  "Testei o Dash",
  "Enfrentei Lucarelli",
  "Cheguei ao fim da demo",
  "Encontrei algum bug"
];



export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      if (!isSupabaseConfigured) {
        setChecking(false);
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setEmail(data.user.email ?? "Jogador");
      setChecking(false);
    }
    checkSession();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (checking) return <div className="py-16 text-center text-slate-300">Verificando sessão...</div>;

  return (
    <AnimatedPageWrapper>
      <PageHeader title="Dashboard" description="Área privada para participantes do Tester Beta." />

      <SectionContainer>
        <SectionTitle title="Bem-vindo ao Tester Beta" subtitle="Painel do jogador para acesso, progresso de teste e próximos passos." />
        <GlowCard>
          {!isSupabaseConfigured ? (
            <p className="text-amber-200">Configure o Supabase no arquivo .env para habilitar autenticação real.</p>
          ) : (
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                Usuário: <span className="font-semibold text-white">{email}</span>
              </p>
              <p>
                Status da conta: <span className="font-semibold text-emerald-300">Autenticada</span>
              </p>
            </div>
          )}
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Download" subtitle="Estrutura preparada para liberar builds oficiais do beta." />
        <ProtectedDownloadCard isAuthenticated={isSupabaseConfigured && Boolean(email)} />
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Instruções do beta" />
        <div className="grid gap-3 md:grid-cols-2">
          {betaSteps.map((step) => (
            <GlowCard key={step}>
              <p className="text-sm text-slate-200">{step}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Checklist do jogador" subtitle="Use este checklist como guia durante os testes da demo." />
        <GlowCard>
          <div className="space-y-3">
            {playerChecklist.map((item) => (
              <label key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <input type="checkbox" className="h-4 w-4 rounded border-cyan-300/30 bg-black/20" />
                {item}
              </label>
            ))}
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="flex flex-wrap gap-3">
          <GameButton href="/feedback" variant="secondary">Enviar feedback (em breve)</GameButton>
          <button onClick={handleSignOut} className="rounded-lg border border-purple-200/30 bg-purple-300/10 px-4 py-2 text-sm text-purple-100">Sair</button>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
