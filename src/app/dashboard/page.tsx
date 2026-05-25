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
  "Acesse o painel com sua conta do beta",
  "Baixe a versão mais recente quando ela for liberada",
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
  const isPreparationMode = !isSupabaseConfigured;

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
      <PageHeader
        title="Dashboard"
        description={
          isPreparationMode
            ? "Prévia do painel do jogador enquanto o acesso por conta é preparado."
            : "Área privada para participantes do Tester Beta."
        }
      />

      <SectionContainer>
        <SectionTitle
          title={isPreparationMode ? "Prévia do painel do jogador" : "Bem-vindo ao Tester Beta"}
          subtitle="Acompanhe acesso, download, checklist de teste e envio de feedback em um só lugar."
        />
        <GlowCard>
          {isPreparationMode ? (
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="font-medium text-amber-200">Modo de preparação ativo</p>
                <p className="mt-2 leading-6">
                  Esta página já mostra a experiência esperada para beta testers. O login real, a sessão do jogador e o download da
                  build serão ativados quando as variáveis do Supabase e o link oficial do beta estiverem configurados no deploy.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Conta</p>
                  <p className="mt-1 font-medium text-slate-100">Prévia sem autenticação</p>
                </div>
                <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Download</p>
                  <p className="mt-1 font-medium text-amber-200">Liberação após configuração</p>
                </div>
              </div>
            </div>
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
        <SectionTitle
          title="Download"
          subtitle={
            isPreparationMode
              ? "Prévia do estado de download antes da autenticação e do link oficial."
              : "Build oficial do beta para jogadores autenticados."
          }
        />
        <ProtectedDownloadCard isAuthenticated={!isPreparationMode && Boolean(email)} preparationMode={isPreparationMode} />
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
          <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
          {!isPreparationMode && email ? (
            <button onClick={handleSignOut} className="rounded-lg border border-purple-200/30 bg-purple-300/10 px-4 py-2 text-sm text-purple-100">Sair</button>
          ) : null}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
