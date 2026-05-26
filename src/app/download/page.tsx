import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameButton } from "@/components/GameButton";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const betaStatus = [
  { label: "Versão atual", value: "Tester Beta 0.1" },
  { label: "Plataforma", value: "Windows" },
  { label: "Estado", value: "Preparação para beta fechado" },
  { label: "Arquivo", value: "Não versionado no GitHub" },
  { label: "Download", value: "Liberado somente quando houver link oficial" },
  { label: "Feedback", value: "Obrigatório para orientar melhorias" }
];

const minimumRequirements = [
  { item: "Sistema", value: "Windows 10 ou superior" },
  { item: "Processador", value: "Preliminar, será definido após testes em PCs reais" },
  { item: "Memória", value: "Preliminar, será ajustada conforme desempenho da build" },
  { item: "Placa de vídeo", value: "Preliminar, depende dos testes de iluminação e efeitos" },
  { item: "Armazenamento", value: "Será informado junto com o arquivo oficial da build" }
];

const betaGuidelines = [
  "Jogue a demo do início ao fim, sem pular áreas importantes.",
  "Anote problemas de movimentação, combate, câmera, iluminação e leitura do mapa.",
  "Informe onde parou, quanto tempo jogou e se encontrou algum bloqueio de progressão.",
  "Envie feedback mesmo que não encontre bugs, porque ritmo e clareza também precisam ser avaliados."
];

const changelogItems = [
  "Mapa expandido do Bosque da Névoa Perdida",
  "Sistema de Dash e rotas pós-Dash",
  "Confronto com Lucarelli",
  "Checkpoints e respawn básico",
  "HUD inicial de vida e progresso",
  "Área de validação para fim da demo"
];

export const metadata: Metadata = {
  title: "Download",
  description: "Acompanhe o status do beta de Tester, requisitos preliminares e acesso controlado ao download para Windows.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download | Tester",
    description: "Acompanhe o status do beta de Tester, requisitos preliminares e acesso controlado ao download para Windows.",
    url: "/download"
  },
  twitter: {
    card: "summary",
    title: "Download | Tester",
    description: "Acompanhe o status do beta de Tester, requisitos preliminares e acesso controlado ao download para Windows."
  }
};

export default function DownloadPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Baixar Tester Beta"
        description="A página de download já está preparada para a Beta 0.1. A liberação real será feita de forma controlada para Windows, com feedback obrigatório dos jogadores de teste."
      />

      <SectionContainer>
        <SectionTitle title="Status do beta" subtitle="Informações atuais da build planejada para testes fechados." />
        <GlowCard>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {betaStatus.map((entry) => (
              <div key={entry.label} className="rounded-xl border border-cyan-200/10 bg-black/15 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/80">{entry.label}</p>
                <p className="mt-1 text-sm font-medium text-slate-100">{entry.value}</p>
              </div>
            ))}
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Como o download será liberado" subtitle="O arquivo do jogo não fica no repositório e só aparece no dashboard quando houver link oficial." />
        <GlowCard>
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <p>
              A distribuição atual foi pensada para um beta fechado. O jogador entra com uma conta, acessa o dashboard e, quando a variável
              <span className="font-semibold text-cyan-100"> NEXT_PUBLIC_BETA_DOWNLOAD_URL</span> estiver configurada, o botão de download da build aparece automaticamente.
            </p>
            <p>
              Enquanto o link não estiver ativo, o site mostra o estado "Download em preparação". Isso evita página quebrada e deixa claro que a build ainda não foi liberada.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <GameButton href="/login">Entrar para baixar</GameButton>
            <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Requisitos mínimos" subtitle="Valores ainda preliminares, sujeitos a mudança depois dos primeiros testes em máquinas reais." />
        <GlowCard>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-sm">
              <tbody>
                {minimumRequirements.map((req) => (
                  <tr key={req.item} className="border-b border-cyan-200/10 last:border-none">
                    <th className="w-1/3 px-3 py-3 text-left font-semibold text-slate-200">{req.item}</th>
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
        <GlowCard>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Tester ainda está em desenvolvimento ativo.</li>
            <li>A versão beta pode conter bugs, travamentos, áreas incompletas, ajustes de ritmo e mudanças de balanceamento.</li>
            <li>O feedback dos testers será usado para melhorar gameplay, estabilidade, clareza visual, mapa e dificuldade.</li>
            <li>A Beta 0.1 não representa o produto final.</li>
          </ul>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Como testar" subtitle="Guia rápido para quem receber acesso à build." />
        <div className="grid gap-3 md:grid-cols-2">
          {betaGuidelines.map((item) => (
            <GlowCard key={item}>
              <p className="text-sm leading-6 text-slate-200">{item}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Conteúdo previsto na Beta 0.1" subtitle="Resumo das entregas que devem ser avaliadas pelos testers." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {changelogItems.map((item) => (
            <GlowCard key={item}>
              <p className="text-sm text-slate-200">{item}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-16 text-center">
          <SectionTitle title="Feedback" subtitle="Depois de jogar, registre sua experiência para ajudar a transformar a demo em uma versão mais estável e clara." />
          <GameButton href="/feedback" variant="secondary">Abrir formulário de feedback</GameButton>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
