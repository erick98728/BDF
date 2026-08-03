"use client";

import { useState } from "react";
import { GameGlyph } from "./GameGlyph";
import { GlowCard } from "./GlowCard";
import { GameButton } from "./GameButton";
import { BetaBadge, StatusBadge, type TesterStatus } from "./TesterVisualSystem";

export type SecureDownloadState = "preparation" | "login" | "ready" | "loading" | "blocked" | "no-build" | "generated" | "error";

type ProtectedDownloadCardProps = {
  isAuthenticated: boolean;
  preparationMode?: boolean;
  onStateChange?: (state: SecureDownloadState) => void;
};

type DownloadSuccess = {
  downloadUrl: string;
  version: string;
  platform: string;
  expiresIn: number;
};

type DownloadError = {
  error?: string;
};

const fallbackBuild = "Protótipo Beta 0.1";
const fallbackPlatform = "Windows";

export function ProtectedDownloadCard({ isAuthenticated, preparationMode = false, onStateChange }: ProtectedDownloadCardProps) {
  const [downloadState, setDownloadState] = useState<SecureDownloadState>(preparationMode ? "preparation" : isAuthenticated ? "ready" : "login");
  const [message, setMessage] = useState<string | null>(null);
  const [buildInfo, setBuildInfo] = useState<Pick<DownloadSuccess, "version" | "platform" | "expiresIn"> | null>(null);

  const effectiveState: SecureDownloadState = preparationMode ? "preparation" : !isAuthenticated ? "login" : downloadState;
  const canRequestDownload = effectiveState === "ready" || effectiveState === "generated" || effectiveState === "error" || effectiveState === "blocked" || effectiveState === "no-build";
  const isLoading = effectiveState === "loading";

  const statusMap: Record<SecureDownloadState, { label: string; type: TesterStatus; textClass: string; title: string; description: string; access: string }> = {
    preparation: {
      label: "Prévia do download",
      type: "beta",
      textClass: "text-cyan-200",
      title: "Prévia da área de download",
      description: "Este painel mostra como será a experiência do beta. O login real e o download seguro serão ativados quando a área oficial de testes estiver pronta.",
      access: "Prévia sem liberação"
    },
    login: {
      label: "Login necessário",
      type: "locked",
      textClass: "text-cyan-200",
      title: "Acesso reservado ao beta",
      description: "Entre com sua conta de testador beta para validar seu acesso e gerar um link temporário quando a build estiver liberada.",
      access: "Aguardando login"
    },
    ready: {
      label: "Validação segura",
      type: "ready",
      textClass: "text-emerald-200",
      title: "Download seguro do beta",
      description: "Sua sessão está ativa. Gere um link seguro e temporário para baixar a build privada; o link expira rapidamente e não revela o caminho do Storage.",
      access: "Pronto para validar"
    },
    loading: {
      label: "Gerando link",
      type: "warning",
      textClass: "text-amber-200",
      title: "Gerando download seguro...",
      description: "Estamos validando sua whitelist, procurando a build ativa e solicitando uma URL assinada temporária ao servidor.",
      access: "Validando acesso"
    },
    blocked: {
      label: "Acesso não liberado",
      type: "locked",
      textClass: "text-amber-200",
      title: "Acesso ao beta não liberado",
      description: "Sua conta está autenticada, mas ainda não foi incluída na lista de testadores beta. Solicite liberação ao administrador do projeto.",
      access: "Sem whitelist"
    },
    "no-build": {
      label: "Build em preparação",
      type: "warning",
      textClass: "text-amber-200",
      title: "Build em preparação",
      description: "Seu acesso foi verificado, mas ainda não existe build ativa cadastrada para download seguro. Volte quando a próxima versão for publicada.",
      access: "Sem build ativa"
    },
    generated: {
      label: "Link temporário gerado",
      type: "ready",
      textClass: "text-emerald-200",
      title: "Download seguro gerado",
      description: "O link assinado foi aberto em uma nova aba ou janela. Ele expira rapidamente; gere outro link se o prazo acabar.",
      access: "Liberado temporariamente"
    },
    error: {
      label: "Erro no download",
      type: "warning",
      textClass: "text-amber-200",
      title: "Não foi possível gerar o download",
      description: "Ocorreu um problema ao solicitar o link seguro. Tente novamente em instantes ou avise o administrador se o erro persistir.",
      access: "Erro temporário"
    }
  };

  const current = statusMap[effectiveState];
  const version = buildInfo?.version ?? fallbackBuild;
  const platform = buildInfo?.platform ?? fallbackPlatform;

  function updateState(nextState: SecureDownloadState, nextMessage?: string | null) {
    setDownloadState(nextState);
    setMessage(nextMessage ?? null);
    onStateChange?.(nextState);
  }

  async function handleSecureDownload() {
    if (!isAuthenticated || preparationMode || isLoading) return;

    updateState("loading");

    try {
      const response = await fetch("/api/beta/download", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json"
        }
      });
      const payload = (await response.json().catch(() => ({}))) as Partial<DownloadSuccess & DownloadError>;

      if (!response.ok) {
        const errorMessage = payload.error ?? "Não foi possível gerar o download seguro.";
        if (response.status === 403) {
          updateState("blocked", errorMessage);
          return;
        }
        if (response.status === 404) {
          updateState("no-build", errorMessage);
          return;
        }
        if (response.status === 401) {
          updateState("login", errorMessage);
          return;
        }
        updateState("error", errorMessage);
        return;
      }

      if (!payload.downloadUrl || !payload.version || !payload.platform || !payload.expiresIn) {
        updateState("error", "A resposta do servidor não trouxe um link de download válido.");
        return;
      }

      setBuildInfo({ version: payload.version, platform: payload.platform, expiresIn: payload.expiresIn });
      updateState("generated", `Link temporário gerado. Ele expira em ${payload.expiresIn} segundos.`);
      window.location.assign(payload.downloadUrl);
    } catch {
      updateState("error", "Falha de conexão ao gerar o download seguro. Tente novamente.");
    }
  }

  return (
    <GlowCard variant="highlight">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <GameGlyph name="download" className={effectiveState === "ready" || effectiveState === "generated" ? "border-emerald-200/25 bg-emerald-300/10 text-emerald-100" : "border-amber-200/25 bg-amber-300/10 text-amber-100"} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <BetaBadge>Build oficial</BetaBadge>
              <StatusBadge status={current.type}>{current.label}</StatusBadge>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{current.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{message ?? current.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <GameGlyph name="build" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Build</p>
          <p className="mt-1 font-medium text-white">{version}</p>
        </div>
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <GameGlyph name="platform" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Plataforma</p>
          <p className="mt-1 font-medium text-white">{platform}</p>
        </div>
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <GameGlyph name="status" variant="plain" className={`mb-2 h-5 w-5 ${current.textClass}`} />
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Acesso</p>
          <p className={`mt-1 font-medium ${current.textClass}`}>{current.access}</p>
        </div>
      </div>

      {isAuthenticated && !preparationMode ? (
        <button
          type="button"
          disabled={!canRequestDownload || isLoading}
          onClick={handleSecureDownload}
          className="tester-button mt-5 inline-flex min-h-11 rounded-xl border border-cyan-200/55 bg-cyan-300/16 px-5 py-2.5 text-sm font-semibold text-cyan-50 hover:border-cyan-100/70 hover:bg-cyan-300/24 disabled:cursor-not-allowed disabled:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        >
          {isLoading ? "Gerando link seguro..." : "Gerar download seguro"}
        </button>
      ) : isAuthenticated ? (
        <button disabled className="mt-5 rounded-lg border border-amber-200/20 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-100 disabled:cursor-not-allowed">
          Download em preparação
        </button>
      ) : (
        <div className="mt-5">
          <GameButton href="/login" variant="secondary">Entrar para acessar</GameButton>
        </div>
      )}

      <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs leading-5 text-slate-400">
        O download seguro é gerado por uma rota privada do site. O link assinado expira em poucos segundos, não expõe o caminho do Storage e só é criado para contas autorizadas na whitelist.
      </p>
    </GlowCard>
  );
}
