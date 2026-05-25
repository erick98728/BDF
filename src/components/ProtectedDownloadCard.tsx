import { GlowCard } from "./GlowCard";
import { GameButton } from "./GameButton";

type ProtectedDownloadCardProps = {
  isAuthenticated: boolean;
  preparationMode?: boolean;
};

export function ProtectedDownloadCard({ isAuthenticated, preparationMode = false }: ProtectedDownloadCardProps) {
  const publicDownloadUrl = process.env.NEXT_PUBLIC_BETA_DOWNLOAD_URL;
  const canDownload = isAuthenticated && Boolean(publicDownloadUrl) && !preparationMode;
  const status = canDownload ? "Disponível" : isAuthenticated ? "Download em preparação" : "Login necessário";
  const statusClass = canDownload ? "text-emerald-200" : isAuthenticated ? "text-amber-200" : "text-cyan-200";
  const title = canDownload
    ? "Build liberada para download"
    : isAuthenticated
      ? "Download em preparação"
      : preparationMode
        ? "Prévia da área de download"
        : "Acesso reservado ao beta";
  const description = canDownload
    ? "Sua conta está autenticada e o link oficial da build beta está disponível."
    : isAuthenticated
      ? "Sua conta já está pronta. O botão de download será ativado assim que o link oficial da build for configurado."
      : preparationMode
        ? "Este painel mostra como será a experiência do jogador. O login e o download real serão ativados após a configuração do Supabase."
        : "Entre com sua conta de beta tester para visualizar o status da build e acessar o download quando ele estiver liberado.";

  return (
    <GlowCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Tester Beta</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Build</p>
          <p className="mt-1 font-medium text-white">Tester Beta 0.1</p>
        </div>
        <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Plataforma</p>
          <p className="mt-1 font-medium text-white">Windows</p>
        </div>
        <div className="rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Acesso</p>
          <p className={`mt-1 font-medium ${statusClass}`}>{status}</p>
        </div>
      </div>

      {canDownload ? (
        <a
          href={publicDownloadUrl}
          className="mt-5 inline-flex rounded-lg border border-cyan-200/30 bg-cyan-300/12 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
          rel="noreferrer"
        >
          Baixar beta
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

      <p className="mt-3 text-xs text-slate-400">
        Nenhum arquivo do jogo é versionado no repositório. A liberação usa apenas o link configurado no ambiente.
      </p>
    </GlowCard>
  );
}
