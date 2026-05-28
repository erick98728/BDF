import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameButton } from "@/components/GameButton";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { BetaBadge, StatusBadge, VisualPanel } from "@/components/TesterVisualSystem";

const betaStatus: { label: string; value: string; icon: GameGlyphName; status?: "beta" | "locked" | "warning" | "live" }[] = [
  { label: "Versão atual", value: "Tester Beta 0.1", icon: "build", status: "beta" },
  { label: "Plataforma", value: "Windows", icon: "platform", status: "live" },
  { label: "Estado", value: "Preparação para beta fechado", icon: "status", status: "warning" },
  { label: "Distribuição", value: "Canal oficial do site", icon: "download", status: "locked" },
  { label: "Download", value: "Liberado somente quando houver acesso oficial", icon: "download", status: "locked" },
  { label: "Feedback", value: "Obrigatório para orientar melhorias", icon: "feedback", status: "live" }
];

const minimumRequirements: { item: string; value: string; icon: GameGlyphName }[] = [
  { item: "Sistema", value: "Windows 10 ou superior", icon: "platform" },
  { item: "Processador", value: "Preliminar, será definido após testes em PCs reais", icon: "requirement" },
  { item: "Memória", value: "Preliminar, será ajustada conforme desempenho da build", icon: "requirement" },
  { item: "Placa de vídeo", value: "Preliminar, depende dos testes de iluminação e efeitos", icon: "fog" },
  { item: "Armazenamento", value: "Será informado junto com a liberação oficial da build", icon: "download" }
];

const betaGuidelines: { text: string; icon: GameGlyphName }[] = [
  { text: "Jogue a demo do início ao fim, sem pular áreas importantes.", icon: "map" },
  { text: "Anote problemas de movimentação, combate, câmera, iluminação e leitura do mapa.", icon: "checklist" },
  { text: "Informe onde parou, quanto tempo jogou e se encontrou algum bloqueio de progressão.", icon: "status" },
  { text: "Envie feedback mesmo que não encontre bugs, porque ritmo e clareza também precisam ser avaliados.", icon: "feedback" }
];

const changelogItems: { text: string; icon: GameGlyphName }[] = [
  { text: "Mapa expandido do Bosque da Névoa Perdida", icon: "map" },
  { text: "Sistema de Dash e rotas pós-Dash", icon: "dash" },
  { text: "Confronto com Lucarelli", icon: "boss" },
  { text: "Checkpoints e respawn básico", icon: "status" },
  { text: "HUD inicial de vida e progresso", icon: "beta" },
  { text: "Área de validação para fim da demo", icon: "content" }
];

export const metadata: Metadata = {
  title: "Download",
  description: "Painel oficial de download do beta de Tester para Windows, com status da build, requisitos preliminares e acesso controlado por link oficial.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download | Tester",
    description: "Painel oficial de download do beta de Tester para Windows, com status da build, requisitos preliminares e acesso controlado por link oficial.",
    url: "/download"
  },
  twitter: {
    card: "summary_large_image",
    title: "Download | Tester",
    description: "Painel oficial de download do beta de Tester para Windows, com status da build, requisitos preliminares e acesso controlado por link oficial."
  }
};

export default function DownloadPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Baixar Tester Beta"
        description="Painel oficial da build de teste para Windows. O beta está em desenvolvimento e o download só será liberado quando houver acesso oficial."
      />

      <SectionContainer>
        <GlowCard variant="status" contentClassName="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 opacity-35 tester-panel-grid" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <BetaBadge />
                <StatusBadge status="warning">Build em preparação</StatusBadge>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Central oficial da Beta 0.1</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Esta página informa o estado da build, requisitos preliminares e próximos passos. Ela não promete download imediato e apresenta apenas o acesso oficial do beta.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:min-w-72 lg:grid-cols-1">
              <StatusBadge status="locked">Download depende de liberação</StatusBadge>
              <StatusBadge status="live">Feedback ativo</StatusBadge>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Status do beta" subtitle="Informações atuais da build planejada para testes fechados." />
        <GlowCard variant="status">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betaStatus.map((entry) => (
              <div key={entry.label} className="mini-status-card rounded-xl border border-cyan-200/10 bg-black/15 px-4 py-3">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <GameGlyph name={entry.icon} variant="plain" className="h-5 w-5 text-cyan-200" />
                  {entry.status ? <StatusBadge status={entry.status}>{entry.status === "locked" ? "Controlado" : entry.status === "warning" ? "Em preparação" : entry.status === "beta" ? "Beta" : "Ativo"}</StatusBadge> : null}
                </div>
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/80">{entry.label}</p>
                <p className="mt-1 text-sm font-medium leading-6 text-slate-100">{entry.value}</p>
              </div>
            ))}
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Como o download será liberado" subtitle="A build do beta será disponibilizada apenas por acesso oficial, quando estiver pronta para testes." />
        <VisualPanel
          title="Liberação controlada pelo dashboard"
          eyebrow="Acesso oficial"
          icon="download"
          tone="gold"
          description="A distribuição atual foi pensada para um beta fechado. O jogador entra com uma conta, acessa o dashboard e, quando a build estiver liberada oficialmente, o botão de download aparece automaticamente."
        >
          <p className="text-sm leading-6 text-slate-300">
            Enquanto o acesso não estiver ativo, o site mostra o estado Download em preparação. Isso evita confusão e deixa claro que a build ainda não foi liberada.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <GameButton href="/login">Entrar para baixar</GameButton>
            <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
          </div>
        </VisualPanel>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Requisitos mínimos" subtitle="Valores ainda preliminares, sujeitos a mudança depois dos primeiros testes em máquinas reais." />
        <GlowCard variant="functional">
          <div className="grid gap-3 text-sm md:hidden">
            {minimumRequirements.map((req) => (
              <div key={req.item} className="mini-status-card rounded-lg border border-cyan-200/10 bg-black/20 px-3 py-3">
                <GameGlyph name={req.icon} variant="plain" className="mb-2 h-5 w-5 text-cyan-200" />
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{req.item}</p>
                <p className="mt-1 leading-6 text-slate-300">{req.value}</p>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <tbody>
                {minimumRequirements.map((req) => (
                  <tr key={req.item} className="border-b border-cyan-200/10 last:border-none">
                    <th className="w-1/3 px-3 py-3 text-left font-semibold text-slate-200">
                      <span className="inline-flex items-center gap-2">
                        <GameGlyph name={req.icon} variant="plain" className="h-4 w-4 text-cyan-200" />
                        {req.item}
                      </span>
                    </th>
                    <td className="px-3 py-3 text-slate-300">{req.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Aviso de beta" subtitle="A build será usada para encontrar problemas antes de qualquer divulgação maior." />
        <VisualPanel title="Versão em desenvolvimento" eyebrow="Aviso oficial" icon="beta" tone="gold">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
            <li>Tester ainda está em desenvolvimento ativo.</li>
            <li>A versão beta pode conter bugs, travamentos, áreas incompletas, ajustes de ritmo e mudanças de balanceamento.</li>
            <li>O feedback dos testers será usado para melhorar gameplay, estabilidade, clareza visual, mapa e dificuldade.</li>
            <li>A Beta 0.1 não representa o produto final.</li>
          </ul>
        </VisualPanel>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Como testar" subtitle="Guia rápido para quem receber acesso à build." />
        <div className="grid gap-3 md:grid-cols-2">
          {betaGuidelines.map((item) => (
            <GlowCard key={item.text} variant="functional" contentClassName="flex min-h-[112px] items-start gap-4">
              <GameGlyph name={item.icon} />
              <p className="text-sm leading-6 text-slate-200">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Conteúdo previsto na Beta 0.1" subtitle="Resumo das entregas que devem ser avaliadas pelos testers." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {changelogItems.map((item) => (
            <GlowCard key={item.text} variant="status" contentClassName="flex min-h-[112px] items-start gap-4">
              <GameGlyph name={item.icon} />
              <p className="text-sm leading-6 text-slate-200">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-10 text-center sm:pb-16">
          <SectionTitle title="Feedback" subtitle="Depois de jogar, registre sua experiência para ajudar a transformar a demo em uma versão mais estável e clara." />
          <GameButton href="/feedback" variant="secondary">Abrir formulário de feedback</GameButton>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
