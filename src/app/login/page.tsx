import { PageHeader } from "@/components/PageHeader";
import { GlowCard } from "@/components/GlowCard";

export default function Page() {
  return (
    <>
      <PageHeader title="Login" description="Estrutura inicial da página login. Conteúdo detalhado será expandido nas próximas sprints." />
      <GlowCard>
        <p className="text-slate-300">Esta seção faz parte da base oficial do site Tester, com layout responsivo e visual sombrio alinhado ao universo do jogo.</p>
      </GlowCard>
    </>
  );
}
