import { GameGlyph, type GameGlyphName } from "./GameGlyph";

type InterestPoint = {
  label: string;
  detail: string;
  icon: GameGlyphName;
};

const interestPoints: InterestPoint[] = [
  { label: "Clareira velada", detail: "ponto de entrada", icon: "fog" },
  { label: "Ruína partida", detail: "sinal antigo", icon: "ruin" },
  { label: "Rota pós-Dash", detail: "passagem em teste", icon: "dash" },
  { label: "Eco hostil", detail: "ameaça próxima", icon: "enemy" }
];

export function LoreMapPanel() {
  return (
    <div className="world-map">
      <div className="world-map__light" aria-hidden="true" />
      <div className="world-map__canvas">
        <svg
          viewBox="0 0 620 430"
          className="world-map__drawing"
          fill="none"
          aria-hidden="true"
        >
          <path d="M48 338C96 244 184 300 231 209C272 130 363 137 407 202C452 268 503 201 568 94" className="world-map__route" />
          <path d="M231 209C187 163 146 136 86 128" className="world-map__route world-map__route--branch" />
          <path d="M407 202C447 169 486 151 539 156" className="world-map__route world-map__route--branch" />
          <path d="M90 348C138 316 178 327 218 368M411 309C466 272 515 286 558 325" className="world-map__contour" />
          <path d="M123 70h130M148 91h81M390 362h140M419 383h79" className="world-map__record" />
          <path d="M62 112 104 80 146 112 104 145 62 112ZM466 76 509 43 552 76 509 109 466 76Z" className="world-map__ruin" />
          <circle cx="48" cy="338" r="10" className="world-map__node" />
          <circle cx="231" cy="209" r="8" className="world-map__node world-map__node--ember" />
          <circle cx="407" cy="202" r="8" className="world-map__node" />
          <circle cx="568" cy="94" r="11" className="world-map__node world-map__node--ember" />
        </svg>

        <GameGlyph name="fog" variant="plain" className="world-map__point world-map__point--one" />
        <GameGlyph name="ruin" variant="plain" className="world-map__point world-map__point--two" />
        <GameGlyph name="dash" variant="plain" className="world-map__point world-map__point--three" />
        <GameGlyph name="enemy" variant="plain" className="world-map__point world-map__point--four" />
        <p className="world-map__caption">Mapa simbólico · escala não representada</p>
      </div>

      <div className="world-map__records">
        <div className="world-map__note">
          <p className="editorial-label">Mapa simbólico</p>
          <p>
            Não representa escala real do jogo. É uma leitura abstrata de
            caminhos, ruínas e bloqueios do beta.
          </p>
        </div>

        <ol className="world-map__legend">
          {interestPoints.map((point, index) => (
            <li key={point.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <GameGlyph
                name={point.icon}
                variant="plain"
                className="world-map__legend-glyph"
              />
              <div>
                <h3>{point.label}</h3>
                <p>{point.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
