import Link from "next/link";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";

export default function AdminForbiddenPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader title="Acesso negado" description="Esta área é privada e exige uma conta com permissão administrativa ativa." />
      <SectionContainer>
        <GlowCard contentClassName="relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(99,221,255,0.10),transparent_36%)]" />
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start">
            <GameGlyph name="status" className="border-amber-200/25 bg-amber-300/10 text-amber-100" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">Bloqueio automático</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Você não tem permissão para acessar o painel.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Usuários comuns não veem menus administrativos e também são impedidos caso tentem entrar diretamente pela URL. Peça ao super administrador para ativar seu cargo ou permissões.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/dashboard" className="tester-button rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-50 hover:bg-cyan-300/15">Voltar ao dashboard</Link>
                <Link href="/" className="tester-button rounded-lg border border-slate-200/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">Ir para o site</Link>
              </div>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
