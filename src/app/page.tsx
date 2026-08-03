import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { GameButton } from "@/components/GameButton";
import { GameGlyph } from "@/components/GameGlyph";
import { SectionContainer } from "@/components/SectionContainer";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { characters, devlogs, homeFeatures, homePillars } from "@/data/site";
import { loadSiteContent } from "@/lib/adminApi";

export const metadata: Metadata = {
  title: "Início",
  description: "Portal oficial de Protótipo, metroidvania 2D sombrio em protótipo jogável com trilhas conectadas, katana, Dash, devlog e roadmap público.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Protótipo | Site Oficial do Jogo Indie",
    description: "Portal oficial de Protótipo, metroidvania 2D sombrio em protótipo jogável com trilhas conectadas, katana, Dash, devlog e roadmap público.",
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: "Protótipo | Site Oficial do Jogo Indie",
    description: "Portal oficial de Protótipo, metroidvania 2D sombrio em protótipo jogável com trilhas conectadas, katana, Dash, devlog e roadmap público."
  }
};

function AbstractMapPanel() {
  return (
    <div className="region-map" aria-hidden="true" data-fx-reveal="map">
      <div className="region-map__light" />
      <svg viewBox="0 0 560 380" className="region-map__drawing" fill="none">
        <path d="M35 304C94 238 153 286 202 211C250 139 312 151 352 202C391 252 440 204 521 103" className="region-map__route fx-map-route" />
        <path d="M202 211C167 170 136 145 82 138" className="region-map__route region-map__route--secondary fx-map-route" />
        <path d="M352 202C388 170 422 154 467 157" className="region-map__route region-map__route--secondary fx-map-route" />
        <path d="M96 324C131 296 162 304 188 334M381 282C424 254 462 261 501 292" className="region-map__branch fx-map-route" />
        <path d="M97 72h114M121 91h66M367 327h116M393 346h67" className="region-map__record fx-map-route" />
        <path d="M48 119 83 93 118 119 83 146 48 119ZM451 79 486 52 521 79 486 106 451 79Z" className="region-map__ruin fx-map-route" />
        <circle cx="35" cy="304" r="9" className="region-map__node fx-map-node" />
        <circle cx="202" cy="211" r="7" className="region-map__node region-map__node--ember fx-map-node" />
        <circle cx="352" cy="202" r="7" className="region-map__node fx-map-node" />
        <circle cx="521" cy="103" r="10" className="region-map__node region-map__node--ember fx-map-node" />
      </svg>
      <div className="region-map__legend">
        <span>Trilha da build</span>
        <span>Rotas em teste</span>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const siteContent = await loadSiteContent();

  return (
    <AnimatedPageWrapper>
      <HeroSection />

      <div className="section-rhythm">
      <SectionContainer id="visao-geral">
        <SectionTitle
          eyebrow="Visão geral"
          title="O que é Protótipo?"
          subtitle="Um metroidvania 2D sombrio em protótipo, focado em trilhas conectadas, combate de katana, Dash e leitura de rota."
        />
        <div className="editorial-overview" data-fx-reveal="chapter">
          <div className="editorial-overview__story">
            <div className="editorial-lead">
              <GameGlyph name="fog" variant="plain" className="editorial-lead__glyph fx-record-symbol" />
              <div>
                <p className="editorial-label">{siteContent.home.eyebrow}</p>
                <h2>{siteContent.home.title}</h2>
                <p>{siteContent.home.description}</p>
              </div>
            </div>

            <div className="editorial-pillars">
              {homePillars.map((pillar) => (
                <article key={pillar.title} className="editorial-pillar" data-fx-reveal="record">
                  <span className="editorial-pillar__line fx-record-symbol" aria-hidden="true" />
                  <div>
                    <p className="editorial-label">{pillar.eyebrow}</p>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                  </div>
                  <GameGlyph name={pillar.icon} variant="plain" className="editorial-pillar__glyph fx-record-symbol" />
                </article>
              ))}
            </div>
          </div>

          <aside className="current-state" data-fx-reveal="record">
            <p className="editorial-label">Estado atual</p>
            <h3>Protótipo Beta 0.1 em validação</h3>
            <p>
                Este é o portal oficial do projeto. O trecho inicial está sendo preparado para teste fechado, com foco em controle, rota, arena e ciclo de feedback.
            </p>
            <dl className="current-state__facts">
              <div>
                <dt>Área inicial</dt>
                <dd>Bosque da Névoa Perdida</dd>
              </div>
              <div>
                <dt>Objetivo do teste</dt>
                <dd>Validar katana, Dash, checkpoints e leitura de rota</dd>
              </div>
            </dl>
          </aside>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Protótipo" title="Sistemas em foco" subtitle="O que já orienta o protótipo jogável e o que ainda passa por ajuste." />
        <ol className="system-index">
          {homeFeatures.map((feature, index) => (
            <li key={feature.title} className="system-index__item" data-fx-reveal="record">
              <span className="system-index__number fx-record-symbol">{String(index + 1).padStart(2, "0")}</span>
              <GameGlyph name={feature.icon} variant="plain" className="system-index__glyph fx-record-symbol" />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Área inicial" title="Bosque da Névoa Perdida" subtitle="Primeira área de validação: trilhas, clareiras, atalhos, bloqueios e arena inicial." />
        <div className="region-spread">
          <AbstractMapPanel />
          <article className="region-record" data-fx-reveal="record">
            <GameGlyph name="ruin" variant="plain" className="region-record__glyph fx-record-symbol" />
            <p className="editorial-label">Região inicial</p>
            <h3>Trilhas, clareiras e bloqueios legíveis.</h3>
            <p>
                  Uma floresta esquecida com trilhas quebradas, clareiras de combate, atalhos e criaturas próximas às ruínas. Cada bloqueio deve ajudar o jogador a entender movimentação, retorno e leitura de ambiente.
            </p>
          </article>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Elenco" title="Personagens" subtitle="Rubens e Lucarelli no foco atual; outros nomes ficam reservados para depois." />
        <div className="editorial-roster">
          {characters.map((c) => (
            <article key={c.name} className="editorial-roster__entry" data-fx-reveal="dossier">
              <GameGlyph name={c.icon} variant="plain" className="editorial-roster__glyph fx-dossier-visual" />
              <p className="editorial-label">{c.role}</p>
              <h3>{c.name}</h3>
              <p>{c.bio}</p>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="editorial-callout" data-fx-reveal="chapter">
          <GameGlyph name="feedback" variant="plain" className="editorial-callout__glyph fx-record-symbol" />
          <div>
            <p className="editorial-label">Ciclo de teste fechado</p>
            <h2>Acompanhe progresso, roadmap e feedback.</h2>
            <p>
              O site mostra o estado da build interna, registra feedbacks e publica devlogs/roadmap para separar o que já funciona, o que está em teste e o que fica para depois.
            </p>
            <div className="editorial-callout__actions">
              <GameButton href="/roadmap">Ver roadmap</GameButton>
              <GameButton href="/devlog" variant="subtle">Ler devlog</GameButton>
              <GameButton href="/download" variant="ghost">Estado da build</GameButton>
              <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Progresso" title="Devlog" subtitle="Atualizações recentes do desenvolvimento." />
        <div className="editorial-log">
          {devlogs.map((d, index) => (
            <article key={d.title} className="editorial-log__entry" data-fx-reveal="record">
              <span className="editorial-log__index fx-record-symbol">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="editorial-label">{d.date}</p>
                <h3>{d.title}</h3>
                <p>{d.excerpt}</p>
              </div>
              <GameGlyph name={d.icon} variant="plain" className="editorial-log__glyph fx-record-symbol" />
            </article>
          ))}
        </div>
      </SectionContainer>
      </div>
    </AnimatedPageWrapper>
  );
}
