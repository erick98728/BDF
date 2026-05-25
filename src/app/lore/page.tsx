import { PageHeader } from "@/components/PageHeader";
import { GlowCard } from "@/components/GlowCard";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";

export default function Page() {
  return (
    <AnimatedPageWrapper>
      <PageHeader title="Lore" description="Estrutura inicial da página lore. Conteúdo detalhado será expandido nas próximas sprints." />
      <GlowCard>
        <p className="text-slate-300">Esta seção faz parte da base oficial do site Tester, com layout responsivo e visual sombrio alinhado ao universo do jogo.</p>
      </GlowCard>
    </AnimatedPageWrapper>
  );
}
