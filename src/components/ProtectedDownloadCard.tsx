import { GlowCard } from "./GlowCard";

type ProtectedDownloadCardProps = {
  isAuthenticated: boolean;
  preparationMode?: boolean;
};

export function ProtectedDownloadCard({ isAuthenticated, preparationMode = false }: ProtectedDownloadCardProps) {
  const publicDownloadUrl = process.env.NEXT_PUBLIC_BETA_DOWNLOAD_URL;

  if (!isAuthenticated && !preparationMode) return null;

  return (
    <GlowCard>
      <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p>Build: <span className="text-white">Tester Beta 0.1</span></p>
        <p>Plataforma: <span className="text-white">Windows</span></p>
        <p>Status: <span className="text-cyan-200">{publicDownloadUrl && !preparationMode ? "Disponível" : "Em preparação"}</span></p>
      </div>

      {preparationMode ? (
        <p className="mt-4 text-sm text-amber-100">
          O painel está em modo de preparação. Configure Supabase para autenticar jogadores e defina
          NEXT_PUBLIC_BETA_DOWNLOAD_URL quando a build puder ser distribuída.
        </p>
      ) : null}

      {publicDownloadUrl && !preparationMode ? (
        <a
          href={publicDownloadUrl}
          className="mt-4 inline-flex rounded-lg border border-cyan-200/30 bg-cyan-300/12 px-4 py-2 text-sm text-cyan-100"
          rel="noreferrer"
        >
          Baixar beta
        </a>
      ) : (
        <button disabled className="mt-4 rounded-lg border border-cyan-200/20 bg-cyan-300/8 px-4 py-2 text-sm text-slate-300">
          Download em preparação
        </button>
      )}

      <p className="mt-3 text-xs text-slate-400">
        {preparationMode
          ? "A liberação final depende da configuração de autenticação e do link oficial da build."
          : "Este acesso é exclusivo para jogadores autenticados do beta."}
      </p>
    </GlowCard>
  );
}
