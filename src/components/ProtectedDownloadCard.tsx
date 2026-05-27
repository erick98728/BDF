import { GlowCard } from "./GlowCard";
import { GameButton } from "./GameButton";

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

  const statusClass = canDownload
    ? "border-emerald-200/25 bg-emerald-300/10 text-emerald-200"
    : isWaitingForLink
      ? "border-amber-200/25 bg-amber-300/10 text-amber-200"
      : "border-cyan-200/25 bg-cyan-300/10 text-cyan-200";

  const textStatusClass = canDownload
    ? "text-emerald-200"
    : isWaitingForLink
      ? "text-amber-200"
      : "text-cyan-200";

  const title = canDownload
    ? "Tester Beta 0.1 disponível"
    : isWaitingForLink
      ? "Download em preparação"
      : preparationMode
        ? "Prévia da área de download"
        : "Acesso reservado ao beta";

  const description = canDownload
    ? "Sua conta está autenticada e o link oficial configurado no ambiente já pode ser usado para baixar a build de teste."
    : isWaitingForLink
      ? "Sua conta está pronta, mas o link oficial da build ainda não foi configurado. Quando NEXT_PUBLIC_BETA_DOWNLOAD_URL estiver ativo, o botão será liberado automaticamente."
      : preparationMode
        ? "Este painel mostra como será a experiência do beta. O login real e o download serão ativados depois da configuração do Supabase e do link oficial da build."
        : "Entre com sua conta de beta tester para visualizar o status da build e acessar o download quando ele estiver liberado.";

  return (
    <GlowCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Tester Beta</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <span className={`status-chip w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Build</p>
          <p className="mt-1 font-medium text-white">Tester Beta 0.1</p>
        </div>
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Plataforma</p>
          <p className="mt-1 font-medium text-white">Windows</p>
        </div>
        <div className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Arquivo</p>
          <p className={`mt-1 font-medium ${textStatusClass}`}>{hasDownloadUrl ? "Link configurado" : "Sem link público"}</p>
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

      <p className="mt-3 text-xs leading-5 text-slate-400">
        O executável do jogo não fica no GitHub. O site apenas lê o link configurado em NEXT_PUBLIC_BETA_DOWNLOAD_URL ou, futuramente, uma URL assinada de storage privado.
      </p>
    </GlowCard>
  );
}
