"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { GameButton } from "@/components/GameButton";
import { ProtectedDownloadCard, type SecureDownloadState } from "@/components/ProtectedDownloadCard";
import { BetaBadge, StatusBadge, VisualPanel } from "@/components/TesterVisualSystem";
import { supabase, isSupabaseConfigured, supabaseSetupMessage } from "@/lib/supabaseClient";

const betaVersion = "Tester Beta 0.1";
const betaSteps = [
  { text: "Acesse o painel com sua conta do beta", icon: "user" as const },
  { text: "Baixe a versão mais recente quando ela for liberada", icon: "download" as const },
  { text: "Jogue a demo do início ao fim", icon: "map" as const },
  { text: "Anote bugs, pontos confusos e problemas de leitura", icon: "checklist" as const },
  { text: "Envie feedback pelo formulário oficial", icon: "feedback" as const }
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
  const [downloadState, setDownloadState] = useState<SecureDownloadState>("ready");
  const isPreparationMode = !isSupabaseConfigured;

  useEffect(() => {
    async function checkSession() {
      if (!isSupabaseConfigured) {
        setChecking(false);
        return;
      }
      const serverSession = await getServerSession();
      if (serverSession?.user) {
        setEmail(serverSession.user.email ?? "Jogador");
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
    await fetch("/api/auth/logout", { method: "POST" });
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (checking) return <div className="py-16 text-center text-slate-300">Verificando sessão...</div>;

  const downloadStatus = getDownloadStatusLabel(isPreparationMode ? "preparation" : downloadState);
  const downloadStatusType = getDownloadStatusType(isPreparationMode ? "preparation" : downloadState);

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
        <GlowCard variant="status" contentClassName="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 opacity-35 tester-panel-grid" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <BetaBadge>Painel privado</BetaBadge>
                <StatusBadge status={isPreparationMode ? "beta" : "ready"}>{isPreparationMode ? "Modo de preparação" : "Sessão autenticada"}</StatusBadge>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {isPreparationMode ? "Prévia do painel do jogador" : "Bem-vindo ao Tester Beta"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Acompanhe versão, download, checklist de teste e envio de feedback em um painel organizado para participantes do beta.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-72 lg:grid-cols-1">
              <StatusBadge status={downloadStatusType}>{downloadStatus}</StatusBadge>
              <StatusBadge status={isPreparationMode ? "planned" : "live"}>{isPreparationMode ? "Supabase pendente" : "Conta ativa"}</StatusBadge>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Estado da conta" subtitle="Resumo rápido do acesso, versão e disponibilidade do beta." />
        <GlowCard variant="functional">
          {isPreparationMode ? (
            <div className="space-y-4 text-sm text-slate-300">
              <VisualPanel title="Modo de preparação ativo" eyebrow="Configuração" icon="beta" tone="gold">
                <p className="text-sm leading-6 text-slate-300">
                  {supabaseSetupMessage} Para transformar esta prévia em painel privado, configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel.
                </p>
              </VisualPanel>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <GameGlyph name="build" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Versão</p>
                  <p className="mt-1 font-medium leading-6 text-slate-100">{betaVersion}</p>
                </div>
                <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                  <GameGlyph name="user" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Conta</p>
                  <p className="mt-1 font-medium leading-6 text-slate-100">Prévia sem autenticação</p>
                </div>
                <div className="mini-status-card rounded-lg border border-amber-200/15 bg-amber-300/[0.04] px-3 py-3">
                  <GameGlyph name="download" variant="plain" className="mb-2 h-5 w-5 text-amber-200" />
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Download</p>
                  <p className="mt-1 font-medium leading-6 text-amber-200">{downloadStatus}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                <GameGlyph name="build" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Versão</p>
                <p className="mt-1 font-medium leading-6 text-white">{betaVersion}</p>
              </div>
              <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                <GameGlyph name="user" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Usuário</p>
                <p className="mt-1 break-words font-medium leading-6 text-white">{email}</p>
              </div>
              <div className="mini-status-card rounded-lg border border-emerald-200/15 bg-emerald-300/[0.04] px-3 py-3">
                <GameGlyph name="status" variant="plain" className="mb-2 h-5 w-5 text-emerald-200" />
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
              ? "Prévia do estado de download antes da autenticação oficial."
              : "Gere um link temporário e seguro pela rota privada do site. O link expira rapidamente e só funciona para contas liberadas."
          }
        />
        <ProtectedDownloadCard isAuthenticated={!isPreparationMode && Boolean(email)} preparationMode={isPreparationMode} onStateChange={setDownloadState} />
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Instruções do beta" subtitle="Siga estes passos quando a build for liberada." />
        <div className="grid gap-3 md:grid-cols-2">
          {betaSteps.map((step) => (
            <GlowCard key={step.text} variant="functional" contentClassName="flex min-h-[112px] items-start gap-4">
              <GameGlyph name={step.icon} />
              <p className="text-sm leading-6 text-slate-200">{step.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Checklist do jogador" subtitle="Use este checklist como guia durante os testes da demo." />
        <GlowCard variant="functional">
          <div className="space-y-3">
            {playerChecklist.map((item) => (
              <label key={item} className="mini-status-card flex items-start gap-3 rounded-lg border border-cyan-200/10 bg-black/15 px-3 py-2 text-sm leading-6 text-slate-300">
                <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-cyan-300/30 bg-black/20 accent-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <VisualPanel
          title="Envie seu feedback"
          eyebrow="Após jogar"
          icon="feedback"
          tone="purple"
          description="Relate bugs, dificuldade, clareza do mapa, sensação de combate e qualquer ponto que tenha impedido o avanço."
        >
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
            {!isPreparationMode && email ? (
              <button onClick={handleSignOut} className="tester-button min-h-11 rounded-lg border border-purple-200/30 bg-purple-300/10 px-4 py-2 text-sm text-purple-100 hover:bg-purple-300/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">Sair</button>
            ) : null}
          </div>
        </VisualPanel>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}


function getDownloadStatusLabel(state: SecureDownloadState) {
  switch (state) {
    case "preparation":
      return "Prévia sem autenticação";
    case "blocked":
      return "Acesso ao beta não liberado";
    case "no-build":
      return "Build em preparação";
    case "loading":
      return "Gerando link seguro";
    case "generated":
      return "Link temporário gerado";
    case "error":
      return "Erro no download";
    case "login":
      return "Login necessário";
    case "ready":
    default:
      return "Download seguro disponível";
  }
}

function getDownloadStatusType(state: SecureDownloadState) {
  switch (state) {
    case "ready":
    case "generated":
      return "ready" as const;
    case "preparation":
      return "beta" as const;
    case "login":
      return "locked" as const;
    case "blocked":
    case "no-build":
    case "loading":
    case "error":
    default:
      return "warning" as const;
  }
}


type ServerSession = {
  user: { id: string; email: string | null } | null;
};

async function getServerSession(): Promise<ServerSession | null> {
  try {
    const response = await fetch("/api/auth/me", { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    return (await response.json()) as ServerSession;
  } catch {
    return null;
  }
}
