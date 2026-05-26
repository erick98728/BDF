import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameButton } from "@/components/GameButton";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const betaStatus = [
  { label: "Versão atual", value: "Beta 0.1" },
  { label: "Plataforma", value: "Windows" },
  { label: "Estado", value: "Em testes fechados" },
  { label: "Arquivo de download", value: "Distribuição controlada" },
  { label: "Última atualização", value: "Beta 0.1 em validação" }
];

const minimumRequirements = [
  { item: "Sistema", value: "Windows 10 ou superior" },
  { item: "Processador", value: "A definir" },
  { item: "Memória", value: "A definir" },
  { item: "Placa de vídeo", value: "A definir" },
  { item: "Armazenamento", value: "A definir" }
];

const changelogItems = [
  "Beta 0.1 com mapa expandido do Bosque da Névoa Perdida",
  "Sistema de Dash",
  "Lucarelli",
  "Checkpoints",
  "HUD",
  "Área pós-Dash"
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
        description="Acesse a versão de testes do jogo, explore o Bosque da Névoa Perdida e envie seu feedback."
      />

      <SectionContainer>
        <SectionTitle title="Status do beta" subtitle="Informações atuais da build de testes." />
        <GlowCard>
          <div className="grid gap-3 sm:grid-cols-2">
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
        <SectionTitle title="Acesso ao beta" subtitle="A build é distribuída de forma controlada para participantes autorizados." />
        <GlowCard>
          <p className="mb-4 text-sm text-slate-300">
            A área de download já está preparada para o Tester Beta. Quando a build pública de teste for liberada, o link oficial será
            exibido no Dashboard para contas validadas. Enquanto isso, você pode criar sua conta, acompanhar o status da build e enviar
            feedback pelo formulário oficial.
          </p>
          <GameButton href="/login">Entrar para baixar</GameButton>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Requisitos mínimos" subtitle="Valores preliminares para referência da fase beta." />
        <GlowCard>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
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
        <SectionTitle title="Aviso de beta" />
        <GlowCard>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Tester ainda está em desenvolvimento ativo.</li>
            <li>Esta versão pode conter bugs e ajustes de balanceamento.</li>
            <li>Seu feedback é essencial para orientar melhorias de gameplay e estabilidade.</li>
            <li>A build beta não representa o produto final.</li>
          </ul>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Changelog da build" subtitle="Resumo das entregas visíveis na Beta 0.1." />
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
          <SectionTitle title="Feedback" subtitle="Use o formulário oficial para registrar sua experiência com a build beta." />
          <GameButton href="/feedback" variant="secondary">Abrir página de feedback</GameButton>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
