import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameButton } from "@/components/GameButton";
import { GlowCard } from "@/components/GlowCard";
import { SectionContainer } from "@/components/SectionContainer";

export default function NotFoundPage() {
  return (
    <AnimatedPageWrapper>
      <SectionContainer>
        <div className="flex min-h-[54vh] items-center justify-center py-10 text-center sm:py-16">
          <GlowCard>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Erro 404</p>
            <h1 className="mt-4 text-4xl font-black tracking-wide text-white sm:text-5xl md:text-6xl">Você se perdeu na névoa.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              A rota que você tentou acessar não foi encontrada. Volte para o início ou siga para a área de download do Tester Beta.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
              <GameButton href="/">Voltar ao início</GameButton>
              <GameButton href="/download" variant="secondary">Ir para download</GameButton>
            </div>
          </GlowCard>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
