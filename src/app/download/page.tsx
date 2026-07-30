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
  { label: "Versão atual", value: "Protótipo Beta 0.1", icon: "build", status: "beta" },
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

const validationItems: { text: string; icon: GameGlyphName; stage: "Implementado" | "Em ajuste" | "Planejado" | "Fora da build atual" }[] = [
  { text: "Trecho inicial do Bosque com trilhas, clareiras e atalhos", icon: "map", stage: "Em ajuste" },
  { text: "Sistema de Dash e rotas pós-Dash", icon: "dash", stage: "Em ajuste" },
  { text: "Arena de Lucarelli como chefe inicial", icon: "boss", stage: "Planejado" },
  { text: "Checkpoints e respawn básico", icon: "status", stage: "Em ajuste" },
  { text: "HUD inicial de vida e progresso", icon: "beta", stage: "Implementado" },
  { text: "Novas áreas além do Bosque", icon: "content", stage: "Fora da build atual" }
];

export const metadata: Metadata = {
  title: "Download",
  description: "Painel oficial da build de teste de Protótipo para Windows, com escopo da Beta 0.1, requisitos preliminares e acesso controlado.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download | Protótipo",
    description: "Painel oficial da build de teste de Protótipo para Windows, com escopo da Beta 0.1, requisitos preliminares e acesso controlado.",
    url: "/download"
  },
  twitter: {
    card: "summary_large_image",
    title: "Download | Protótipo",
    description: "Painel oficial da build de teste de Protótipo para Windows, com escopo da Beta 0.1, requisitos preliminares e acesso controlado."
  }
};

export default function DownloadPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        variant="compact"
        eyebrow="Download fechado"
        title="Build de teste Protótipo"
        description="Estado da build de teste para Windows. O download fica fechado até a Beta 0.1 estar pronta para testadores autorizados."
      />

      <SectionContainer>
        <GlowCard variant="highlight" contentClassName="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 opacity-35 tester-panel-grid" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <BetaBadge />
                <StatusBadge status="warning">Build em preparação</StatusBadge>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Central da build interna Beta 0.1</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Esta página informa escopo, requisitos provisórios e critérios de acesso. Ela não promete download imediato nem trata a build como versão final.
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
        <SectionTitle eyebrow="Status" title="Status da build" subtitle="Informações atuais do protótipo para testes fechados." />
        <GlowCard variant="panel">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betaStatus.map((entry) => (
              <div key={entry.label} className="mini-status-card rounded-xl border border-cyan-200/10 bg-black/12 px-4 py-3">
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
        <SectionTitle eyebrow="Acesso" title="Como a build será liberada" subtitle="A Beta 0.1 será disponibilizada somente pelo dashboard quando o trecho inicial estiver pronto para avaliação." />
        <VisualPanel
          title="Liberação controlada pelo dashboard"
          eyebrow="Acesso oficial"
          icon="download"
          tone="gold"
          description="A distribuição atual foi pensada para teste fechado. O jogador entra com uma conta, acessa o dashboard e, quando a build estiver liberada para aquele usuário, o botão de download aparece automaticamente."
        >
          <p className="text-sm leading-6 text-slate-300">
            Enquanto o acesso não estiver ativo, o site mostra Download em preparação. Quando liberado, o botão gera um link seguro temporário pelo dashboard, com expiração rápida, sem expor arquivo permanente.
          </p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <GameButton href="/login">Entrar para baixar</GameButton>
            <GameButton href="/feedback" variant="ghost">Enviar feedback</GameButton>
          </div>
        </VisualPanel>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Requisitos" title="Requisitos mínimos" subtitle="Valores ainda preliminares, sujeitos a mudança depois dos primeiros testes em máquinas reais." />
        <GlowCard variant="quiet">
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
        <SectionTitle eyebrow="Aviso" title="Aviso da build" subtitle="A Beta 0.1 serve para validar controles, rotas, checkpoints e estabilidade antes de divulgação maior." />
        <VisualPanel title="Versão de validação" eyebrow="Aviso oficial" icon="beta" tone="gold">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
            <li>Protótipo ainda está em construção ativa.</li>
            <li>A build pode conter bugs, travamentos, áreas incompletas, ajustes de ritmo e mudanças de balanceamento.</li>
            <li>O retorno dos testadores será usado para melhorar controles, estabilidade, clareza visual, leitura de rota e dificuldade.</li>
            <li>A Beta 0.1 não representa uma versão final do jogo.</li>
          </ul>
        </VisualPanel>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Teste" title="Como testar" subtitle="Guia rápido para quem receber acesso à build." />
        <div className="grid gap-3 md:grid-cols-2">
          {betaGuidelines.map((item) => (
            <GlowCard key={item.text} variant="flat" contentClassName="flex min-h-[112px] items-start gap-4">
              <GameGlyph name={item.icon} />
              <p className="text-sm leading-6 text-slate-200">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Escopo" title="Escopo previsto da Beta 0.1" subtitle="Itens em validação, separados por estágio para não parecer lista final de lançamento." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {validationItems.map((item) => (
            <GlowCard key={item.text} variant="quiet" contentClassName="flex min-h-[112px] items-start gap-4">
              <GameGlyph name={item.icon} />
              <div><span className="mb-2 inline-flex rounded-full border border-cyan-200/15 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-100">{item.stage}</span><p className="text-sm leading-6 text-slate-200">{item.text}</p></div>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-10 text-center sm:pb-16">
          <SectionTitle eyebrow="Próximo passo" title="Feedback" subtitle="Depois de jogar, registre sua experiência para ajudar a transformar a demo em uma versão mais estável e clara." />
          <GameButton href="/feedback" variant="secondary">Abrir formulário de feedback</GameButton>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
