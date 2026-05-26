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
import { supabase, isSupabaseConfigured, supabaseSetupMessage } from "@/lib/supabaseClient";

const betaVersion = "Tester Beta 0.1";
const hasDownloadUrl = Boolean(process.env.NEXT_PUBLIC_BETA_DOWNLOAD_URL?.trim());

const betaSteps = [
  "Acesse o painel com sua conta do beta",
  "Baixe a versão mais recente quando ela for liberada",
  "Jogue a demo do início ao fim",
  "Anote bugs, pontos confusos e problemas de leitura",
  "Envie feedback pelo formulário oficial"
];

const playerChecklist = [
  "Entendi os controles iniciais",
  "Testei combate e movimentação básica",
  "Usei o Dash depois de desbloquear",
  "Enfrentei Lucarelli",
  "Cheguei ao fim da demo ou registrei onde parei",
  "Enviei feedback com tempo jogado e ponto de progresso"
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

  const downloadStatus = isPreparationMode
    ? "Prévia sem autenticação"
    : hasDownloadUrl
      ? "Download liberado"
      : "Download em preparação";

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
          subtitle="Acompanhe versão, download, checklist de teste e envio de feedback em um só lugar."
        />
        <GlowCard>
          {isPreparationMode ? (
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="font-medium text-amber-200">Modo de preparação ativo</p>
                <p className="mt-2 leading-6">
                  {supabaseSetupMessage} Para transformar esta prévia em painel privado, configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Versão</p>
                  <p className="mt-1 font-medium leading-6 text-slate-100">{betaVersion}</p>
                </div>
                <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Conta</p>
                  <p className="mt-1 font-medium leading-6 text-slate-100">Prévia sem autenticação</p>
                </div>
                <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Download</p>
                  <p className="mt-1 font-medium leading-6 text-amber-200">{downloadStatus}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Versão</p>
                <p className="mt-1 font-medium leading-6 text-white">{betaVersion}</p>
              </div>
              <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Usuário</p>
                <p className="mt-1 break-words font-medium leading-6 text-white">{email}</p>
              </div>
              <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Status</p>
                <p className="mt-1 font-medium leading-6 text-emerald-300">Autenticado</p>
              </div>
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
              : hasDownloadUrl
                ? "Build oficial disponível para jogadores autenticados."
                : "Sua conta está pronta, mas o link oficial da build ainda não foi configurado."
          }
        />
        <ProtectedDownloadCard isAuthenticated={!isPreparationMode && Boolean(email)} preparationMode={isPreparationMode} />
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Instruções do beta" subtitle="Siga estes passos quando a build for liberada." />
        <div className="grid gap-3 md:grid-cols-2">
          {betaSteps.map((step) => (
            <GlowCard key={step}>
              <p className="text-sm leading-6 text-slate-200">{step}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Checklist do jogador" subtitle="Use este checklist como guia durante os testes da demo." />
        <GlowCard>
          <div className="space-y-3">
            {playerChecklist.map((item) => (
              <label key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-cyan-300/30 bg-black/20" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <GlowCard>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Após jogar</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Envie seu feedback</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Relate bugs, dificuldade, clareza do mapa, sensação de combate e qualquer ponto que tenha impedido o avanço.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">
              <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
              {!isPreparationMode && email ? (
                <button onClick={handleSignOut} className="min-h-11 rounded-lg border border-purple-200/30 bg-purple-300/10 px-4 py-2 text-sm text-purple-100">Sair</button>
              ) : null}
            </div>
          </div>
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
