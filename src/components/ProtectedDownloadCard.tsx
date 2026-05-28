import { GameGlyph } from "./GameGlyph";
import { GlowCard } from "./GlowCard";
import { GameButton } from "./GameButton";
import { BetaBadge, StatusBadge, type TesterStatus } from "./TesterVisualSystem";

type ProtectedDownloadCardProps = {
  isAuthenticated: boolean;
  preparationMode?: boolean;
};

const betaDownloadUrl = process.env.NEXT_PUBLIC_BETA_DOWNLOAD_URL?.trim();

export function ProtectedDownloadCard({ isAuthenticated, preparationMode = false }: ProtectedDownloadCardProps) {
  const hasDownloadUrl = Boolean(betaDownloadUrl);
  const canDownload = isAuthenticated && hasDownloadUrl && !preparationMode;
  const isWaitingForLink = isAuthenticated && !hasDownloadUrl && !preparationMode;

  const status = canDownload
    ? "Download liberado"
    : isWaitingForLink
      ? "Download em preparação"
      : preparationMode
        ? "Prévia do download"
        : "Login necessário";

  const statusType: TesterStatus = canDownload ? "ready" : isWaitingForLink ? "warning" : preparationMode ? "beta" : "locked";
  const textStatusClass = canDownload ? "text-emerald-200" : isWaitingForLink ? "text-amber-200" : "text-cyan-200";

  const title = canDownload
    ? "Tester Beta 0.1 disponível"
    : isWaitingForLink
      ? "Download em preparação"
      : preparationMode
        ? "Prévia da área de download"
        : "Acesso reservado ao beta";

  const description = canDownload
    ? "Sua conta está autorizada e a build de teste já está disponível para download pelo canal oficial."
    : isWaitingForLink
      ? "Sua conta está pronta, mas a build ainda não foi liberada oficialmente. Quando o acesso estiver disponível, o botão de download aparecerá automaticamente."
      : preparationMode
        ? "Este painel mostra como será a experiência do beta. O login real e o download serão ativados quando a área oficial de testes estiver pronta."
        : "Entre com sua conta de beta tester para visualizar o status da build e acessar o download quando ele estiver liberado.";

  return (
    <GlowCard variant="status">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <GameGlyph name="download" className={canDownload ? "border-emerald-200/25 bg-emerald-300/10 text-emerald-100" : "border-amber-200/25 bg-amber-300/10 text-amber-100"} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <BetaBadge>Build oficial</BetaBadge>
              <StatusBadge status={statusType}>{status}</StatusBadge>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <GameGlyph name="build" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Build</p>
          <p className="mt-1 font-medium text-white">Tester Beta 0.1</p>
        </div>
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <GameGlyph name="platform" variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Plataforma</p>
          <p className="mt-1 font-medium text-white">Windows</p>
        </div>
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <GameGlyph name="status" variant="plain" className={`mb-2 h-5 w-5 ${textStatusClass}`} />
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Acesso</p>
          <p className={`mt-1 font-medium ${textStatusClass}`}>{hasDownloadUrl ? "Liberado oficialmente" : "Aguardando liberação"}</p>
        </div>
      </div>

      {canDownload ? (
        <a
          href={betaDownloadUrl}
          className="tester-button mt-5 inline-flex rounded-lg border border-cyan-200/30 bg-cyan-300/12 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-300/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
          rel="noreferrer"
        >
          Baixar Tester Beta 0.1
        </a>
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
        O download do beta será liberado apenas pelos canais oficiais do site. Quando a build estiver disponível, jogadores autorizados verão o botão de acesso nesta área.
      </p>
    </GlowCard>
  );
}
