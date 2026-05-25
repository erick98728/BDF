import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const timeline = [
  { title: "Antes da Névoa", text: "Registros antigos citam um bosque vivo, onde técnicas eram ensinadas em silêncio e disciplina." },
  { title: "O avanço da corrupção", text: "A névoa se adensa e marca trilhas, ruínas e criaturas com um padrão que ninguém explica por completo." },
  { title: "A chegada de Rubens", text: "Rubens entra na região carregando respostas incompletas e a necessidade de avançar mesmo sem mapa seguro." },
  { title: "O confronto com Lucarelli", text: "Lucarelli surge como presença decisiva: guia, obstáculo ou guardião de algo maior." },
  { title: "O caminho além do Dash", text: "Depois do domínio do Dash, novas rotas aparecem, mas nem toda passagem deveria ser aberta cedo demais." }
];

const mysteries = [
  "Quem controla a névoa?",
  "Por que Lucarelli guarda a passagem?",
  "O que existe além do Bosque?",
  "Qual é o limite das técnicas de Rubens?"
];


export const metadata: Metadata = { title: "Lore", description: "Conheça o mundo misterioso de Tester.", openGraph: { title: "Lore | Tester", description: "Conheça o mundo misterioso de Tester." } };

export default function LorePage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Lore"
        description="O mundo de Tester guarda memórias, técnicas e sombras que ainda não foram reveladas."
      />

      <SectionContainer>
        <SectionTitle title="Mundo" subtitle="Um universo em desenvolvimento, construído com camadas de mistério." />
        <GlowCard>
          <p className="text-slate-300">
            Tester acontece em um cenário de ruínas, disciplina de combate e sinais de uma força que altera o ambiente.
            A narrativa é fragmentada: você descobre o mundo por encontros, marcas esquecidas e decisões de exploração.
          </p>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Bosque da Névoa Perdida" subtitle="Primeira região explorável, densa e imprevisível." />
        <GlowCard>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Névoa constante que reduz leitura de distância e muda a percepção de risco.</li>
            <li>Caminhos conectados com atalhos, retornos estratégicos e passagens ocultas.</li>
            <li>Criaturas hostis que pressionam ritmo, posicionamento e técnica.</li>
            <li>Ruínas e marcas esquecidas que sugerem conflitos antigos ainda sem resposta.</li>
            <li>Presença de Lucarelli em pontos críticos da progressão.</li>
          </ul>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Técnicas" subtitle="Poder e mobilidade apresentados sem revelar toda a progressão." />
        <div className="grid gap-4 md:grid-cols-3">
          <GlowCard>
            <h3 className="text-lg font-semibold text-white">Katana</h3>
            <p className="mt-2 text-sm text-slate-300">Base do combate: precisão, leitura de abertura e controle de distância.</p>
          </GlowCard>
          <GlowCard>
            <h3 className="text-lg font-semibold text-white">Dash</h3>
            <p className="mt-2 text-sm text-slate-300">Movimento essencial para evasão, reposicionamento e acesso a novas rotas.</p>
          </GlowCard>
          <GlowCard>
            <h3 className="text-lg font-semibold text-white">Habilidades futuras</h3>
            <p className="mt-2 text-sm text-slate-300">Conteúdo bloqueado por enquanto, ligado a técnicas avançadas e áreas além do Bosque.</p>
          </GlowCard>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Linha do tempo" subtitle="Eventos vagos para preservar o mistério do enredo." />
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <GlowCard key={item.title}>
              <div className="flex gap-4">
                <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full border border-cyan-200/30 bg-cyan-300/10 text-center text-xs leading-7 text-cyan-200">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.text}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Mistérios" subtitle="Perguntas que definem o tom da jornada em Tester." />
        <div className="grid gap-4 sm:grid-cols-2">
          {mysteries.map((question) => (
            <GlowCard key={question}>
              <p className="text-sm font-medium text-slate-200">{question}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
