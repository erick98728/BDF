import { GlowCard } from "./GlowCard";

type ProtectedDownloadCardProps = {
  isAuthenticated: boolean;
};

export function ProtectedDownloadCard({ isAuthenticated }: ProtectedDownloadCardProps) {
  const publicDownloadUrl = process.env.NEXT_PUBLIC_BETA_DOWNLOAD_URL;

  if (!isAuthenticated) return null;

  return (
    <GlowCard>
      <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p>Build: <span className="text-white">Tester Beta 0.1</span></p>
        <p>Plataforma: <span className="text-white">Windows</span></p>
        <p>Status: <span className="text-cyan-200">{publicDownloadUrl ? "Disponível" : "Disponível em breve"}</span></p>
      </div>

      {publicDownloadUrl ? (
        <a
          href={publicDownloadUrl}
          className="mt-4 inline-flex rounded-lg border border-cyan-200/30 bg-cyan-300/12 px-4 py-2 text-sm text-cyan-100"
          rel="noreferrer"
        >
          Baixar beta
        </a>
      ) : (
        <button disabled className="mt-4 rounded-lg border border-cyan-200/20 bg-cyan-300/8 px-4 py-2 text-sm text-slate-300">
          Download em breve
        </button>
      )}

      <p className="mt-3 text-xs text-slate-400">Este acesso é exclusivo para jogadores autenticados do beta.</p>
    </GlowCard>
  );
}
