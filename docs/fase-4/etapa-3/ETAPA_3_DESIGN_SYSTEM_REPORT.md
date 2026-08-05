# Relatório final — Fase 4 · Etapa 3

## Tipografia, hierarquia e design system

| Campo | Registro |
|---|---|
| Repositório | `erick98728/BDF` |
| Pull Request | `#40 — FASE 4 · ETAPA 3 — Tipografia, hierarquia e design system` |
| Estado do PR | Rascunho, aberto e não mesclado |
| Branch | `agent/fase-4-etapa-3-tipografia-design-system` |
| Commit-base | `b8faffae63a875a542d6f6f29e5401ea41f471ab` |
| HEAD final | registrado automaticamente em `GIT_DATA.txt` e na descrição do PR |
| Produção autoritativa da Etapa 2 | `https://bdf-navy.vercel.app` |
| Commit em produção | `b8faffae63a875a542d6f6f29e5401ea41f471ab` |
| Workflow final da Etapa 3 | registrado no artifact e na descrição do PR |
| Artifact final | `fase-4-etapa-3-design-system` |

## 1. Resumo executivo

A Etapa 3 consolidou um design system semântico sobre a produção aprovada da Etapa 2, sem reconstruir ou substituir o sistema de movimento. O trabalho corrigiu a ausência de fontes efetivamente carregadas, removeu microtipografia funcional inadequada, definiu papéis tipográficos distintos, normalizou cores textuais, superfícies, bordas, raios, espaçamentos e controles compartilhados, além de reforçar foco visível, fallback de fonte e estabilidade de layout.

A validação final cobre 17 rotas públicas em dez larguras — 170 combinações — e compara CLS por rota e largura diretamente entre a branch da Etapa 3 e a produção publicada da Etapa 2. A suíte funcional da Etapa 2 continua sendo executada como gate obrigatório; seus avisos históricos de CLS permanecem registrados separadamente, sem mascarar falhas funcionais.

Resultado final registrado:

- zero erro de build, TypeScript ou ESLint;
- zero texto funcional abaixo de aproximadamente 14px;
- zero metadata necessária abaixo de aproximadamente 12px;
- texto decorativo explicitamente classificado com mínimo próximo de 11px;
- zero overflow horizontal;
- zero heading cortado;
- zero erro de console na matriz;
- zero falha funcional não relacionada a CLS na suíte da Etapa 2;
- zero largura com regressão de CLS contra a produção da Etapa 2;
- fontes auto-hospedadas pelo build, sem requisição externa em runtime;
- evidências antes/depois e pacote consolidado sem arquivos de fonte.

## 2. Baseline e inventário anterior

O inventário inicial é um registro histórico congelado em `ETAPA_3_INITIAL_INVENTORY.json`. Ele não é recalculado após a implementação.

| Indicador anterior | Valor autoritativo |
|---|---:|
| Arquivos analisados | 98 |
| Amostras renderizadas | 51 |
| Nós de texto visíveis | 2.902 |
| Ocorrências abaixo de 12px | 915 |
| Ocorrências funcionais abaixo de 14px | 693 |
| Recursos de fonte requisitados | 0 |
| Faces registradas pelo navegador | 0 |
| Valores/utilitários arbitrários recorrentes | 136 |
| Pesos Tailwind distintos | 5 |
| Maior tracking registrado | aproximadamente `0.22em` |
| Heading cortado | 1 caso |
| Overflow horizontal | 0 casos |
| Violação ARIA no Login | `tablist` sem `tab` |

Famílias eram declaradas em CSS, mas nenhuma fonte principal estava efetivamente carregada. Os principais pontos de microtipografia estavam em índices editoriais, mapas, filtros, Galeria, Devlog, Lore, Personagens, Roadmap, Download e metadata de componentes.

## 3. Decisões implementadas

### 3.1 Fontes explícitas

`src/app/fonts.ts` usa `next/font/google` para incorporar Inter, Oswald e Roboto Mono na build. As famílias são expostas por variáveis CSS no elemento `html`; o navegador recebe arquivos gerados em `/_next/static/media/`, sem chamada a provedores externos em runtime.

Configuração aplicada:

- `display: "optional"`;
- `preload: true`;
- `adjustFontFallback: true`;
- subsets latinos;
- pesos restritos aos papéis reais do sistema.

### 3.2 Hierarquia semântica

Foram separados papéis para display do Hero, título de página, título de capítulo, título de seção, título de componente, título de registro, corpo grande, corpo, corpo secundário, label funcional, metadata necessária, texto decorativo, código e coordenadas.

A hierarquia é aplicada por tokens, classes utilitárias e atributos como `data-heading-role` e `data-surface-role`, evitando depender apenas de tamanhos isolados.

### 3.3 Controles e metadata

Botões, filtros, ações, campos e links funcionais usam aproximadamente 14px ou mais. Datas, estados, categorias, descrições de filtro e informações de dossiê necessárias usam aproximadamente 12px ou mais. Índices e coordenadas redundantes podem usar aproximadamente 11px, desde que sejam explicitamente classificados como decorativos.

### 3.4 Superfícies e componentes

Cards visualmente semelhantes foram reorganizados por intenção: padrão/discreto, funcional, narrativo/editorial, status, personagem, galeria/mídia, painel, destaque e plano.

A alteração não redesenha o movimento, o Dock, o Header nem a composição estrutural das páginas.

### 3.5 Acessibilidade e estabilidade

- removida com segurança a estrutura ARIA inválida de `tablist` do Login;
- foco inicial do modal da Galeria transferido para o botão de fechar em `useLayoutEffect`, antes da pintura;
- fechamento por Escape e devolução de foco preservados;
- `focus-visible` restabelecido com outline tokenizado e suporte a forced colors;
- fallback do título principal estabilizado quando fontes são bloqueadas;
- virtualização aprovada da Etapa 2 preservada em runtime;
- `content-visibility` só é forçado como visível durante a geração controlada de screenshots.

## 4. Fontes finais

| Papel | Família | Pesos configurados | Fallback métrico/seguro |
|---|---|---|---|
| Corpo e interface | Inter | 400, 500, 600 | Arial / sans-serif |
| Display e headings | Oswald | 500, 600, 700 | Arial Narrow / Arial / sans-serif |
| Metadata e código | Roboto Mono | 400, 500 | Courier New / monospace |

Medição do navegador:

- três recursos reais de fonte requisitados;
- 19 faces/variações registradas pelo navegador;
- pesos observados: 400, 500, 600, 700 e variações normais geradas;
- zero recurso de fonte externo em runtime;
- fallback com fontes bloqueadas sem conteúdo invisível, overflow ou heading cortado;
- hidratação preservada sem erro de console.

Os arquivos binários de fonte não fazem parte do pacote final e são excluídos pelo processo de empacotamento.

## 5. Escala tipográfica final

| Token | Valor |
|---|---|
| `--text-display` | `clamp(2.75rem, 2.25rem + 2.4vw, 4.5rem)` |
| `--text-page-title` | `clamp(2.5rem, 2rem + 2vw, 4.25rem)` |
| `--text-chapter-title` | `clamp(2rem, 1.72rem + 1.25vw, 3.25rem)` |
| `--text-section-title` | `clamp(1.625rem, 1.42rem + 0.85vw, 2.375rem)` |
| `--text-component-title` | `clamp(1.25rem, 1.16rem + 0.35vw, 1.625rem)` |
| `--text-record-title` | `clamp(1.125rem, 1.06rem + 0.22vw, 1.375rem)` |
| `--text-body-lg` | `clamp(1.0625rem, 1.02rem + 0.18vw, 1.1875rem)` |
| `--text-body` | `clamp(1rem, 0.98rem + 0.1vw, 1.0625rem)` |
| `--text-body-sm` | `clamp(0.875rem, 0.855rem + 0.08vw, 0.9375rem)` |
| `--text-label` | `0.875rem` |
| `--text-meta` | `0.75rem` |
| `--text-decorative` | `0.6875rem` |
| `--text-code` | `clamp(0.75rem, 0.73rem + 0.08vw, 0.8125rem)` |

### Pesos

O design system usa principalmente 400, 500 e 600. O peso 700 fica disponível para casos de display já existentes, sem introduzir síntese de fonte. `font-synthesis: none` evita falsificação de pesos.

### Altura de linha

| Token | Valor | Uso |
|---|---:|---|
| `--leading-display` | 0.96 | displays e títulos de página |
| `--leading-heading` | 1.08 | headings de seção/componente |
| `--leading-body` | 1.65 | corpo e leitura longa |
| `--leading-compact` | 1.38 | labels e metadata |
| `--leading-code` | 1.5 | código e coordenadas |

A validação automática de altura de linha mínima é aplicada a parágrafos, itens, definições e citações longas. Headings usam sua escala compacta intencional e são validados por corte, overflow e leitura visual.

### Tracking

| Token | Valor |
|---|---:|
| `--tracking-display` | `-0.025em` |
| `--tracking-heading` | `-0.012em` |
| `--tracking-label` | `0.075em` |
| `--tracking-meta` | `0.04em` |
| `--tracking-code` | `0.025em` |

Utilitários legados de `0.14em`, `0.16em` e `0.22em` que ainda aparecem no markup de páginas antigas são normalizados pela camada final para `--tracking-label`, sem falsificar o inventário inicial.

### Largura de leitura

| Token | Valor |
|---|---:|
| `--measure-compact` | 55ch |
| `--measure-body` | 68ch |
| `--measure-wide` | 75ch |

A matriz não encontrou composição de leitura longa acima do limite validado de 82em.

## 6. Tokens visuais

### Cores textuais

`--text-primary`, `--text-secondary`, `--text-muted`, `--text-subtle`, `--text-accent`, `--text-inverse` e `--text-disabled`.

### Superfícies

`--surface-page`, `--surface-raised`, `--surface-subtle`, `--surface-interactive`, `--surface-overlay`, `--surface-functional`, `--surface-document` e `--surface-media`.

### Bordas

`--border-subtle`, `--border-default`, `--border-strong`, `--border-accent` e `--border-focus`.

### Raios

- `--radius-sm: 0.5rem`;
- `--radius-md: 0.75rem`;
- `--radius-lg: 1.125rem`;
- `--radius-pill: 999px`.

### Espaçamento

Escala curta de `--space-1` a `--space-16`, além de `--space-inline`, `--space-component`, `--space-editorial` e `--space-section`.

## 7. Componentes compartilhados

### `PageHeader`

Recebe o papel `page` e aplica a escala de título de página, descrição com medida controlada, índice e metadata semânticos.

### `SectionTitle`

Expõe variantes `section`, `chapter`, `compact` e `record`, permitindo que abertura editorial, seção funcional e registro tenham hierarquias diferentes.

### `GameButton`

Normaliza tamanho funcional, peso, altura, raio e estados, preservando as variantes visuais existentes.

### `GlowCard`

Recebe `surfaceRole` e registra a intenção visual do card em vez de depender apenas de nomes históricos.

### `GalleryModal`

Mantém navegação, Escape, touch e reduced motion; corrige foco inicial antes da pintura e usa papéis de metadata e controles do design system.

### Login

A interface foi normalizada tipograficamente e a violação ARIA de `tablist` sem tabs reais foi removida. Fluxos, estados e autenticação não foram reescritos.

## 8. Arquivos alterados

Diff real do PR #40:

- `.github/workflows/fase-4-etapa-3-inventory.yml`;
- `.github/workflows/fase-4-etapa-3-validation.yml`;
- `docs/fase-4/etapa-3/ETAPA_3_INITIAL_INVENTORY.json`;
- `docs/fase-4/etapa-3/DESIGN_SYSTEM_REFERENCE.md`;
- `docs/fase-4/etapa-3/ETAPA_3_DESIGN_SYSTEM_REPORT.md`;
- `docs/fase-4/etapa-3/EVIDENCE_INDEX.md`;
- `scripts/capture-design-system-etapa-3.mjs`;
- `scripts/inventory-design-system-etapa-3.mjs`;
- `scripts/validate-design-system-etapa-3.mjs`;
- `src/app/design-system-stability.css`;
- `src/app/design-system-utilities.css`;
- `src/app/design-system.css`;
- `src/app/fonts.ts`;
- `src/app/layout.tsx`;
- `src/app/login/page.tsx`;
- `src/components/GalleryModal.tsx`;
- `src/components/GameButton.tsx`;
- `src/components/GlowCard.tsx`;
- `src/components/PageHeader.tsx`;
- `src/components/SectionTitle.tsx`.

## 9. Inventário antes/depois

| Indicador | Antes | Depois |
|---|---:|---:|
| Fontes principais requisitadas | 0 | 3 recursos internos |
| Faces registradas | 0 | 19 |
| Casos funcionais abaixo de 14px | 693 ocorrências nas 51 amostras iniciais | 0 casos nas 170 combinações finais |
| Metadata necessária abaixo de 12px | não distinguida honestamente no inventário inicial | 0 casos finais |
| Texto decorativo abaixo de 11px | microtipografia recorrente | 0 casos finais |
| Overflow horizontal | 0 | 0 |
| Heading cortado | 1 | 0 |
| Erros de console | inventário diagnóstico | 0 na matriz final |
| Violação `tablist` no Login | presente | removida |
| Design tokens semânticos | ausentes como sistema consolidado | 86 tokens CSS inventariados |
| Utilitários semânticos | ausentes como camada consolidada | 29 classes inventariadas |

### Valores arbitrários

O inventário inicial registrou 136 ocorrências pela metodologia histórica. O scanner final separa 110 utilitários tipográficos e 28 de forma. Os totais não são uma comparação direta porque o scanner final cobre categorias adicionais. A dívida residual permanece no código de páginas antigas, mas seus valores renderizados críticos de tracking e tamanho são normalizados pelos tokens da Etapa 3. Não foi feita uma substituição mecânica fora do escopo apenas para reduzir um contador.

## 10. CLS contra a produção da Etapa 2

Metodologia:

1. um documento novo para cada rota e largura;
2. mesma viewport e preferência de movimento;
3. espera por `document.fonts.ready` e duas pinturas;
4. coleta do CLS limpo antes da rolagem funcional;
5. comparação direta da mesma rota/largura entre produção e branch;
6. registro de média, mediana, máximo, rota máxima e shifts causadores;
7. tolerância média de 0,01 e tolerância por rota de 0,02, registradas no JSON.

| Largura | Média Etapa 2 | Média Etapa 3 | Delta | Mediana Etapa 2 | Mediana Etapa 3 | Máximo Etapa 3 | Rota do máximo |
|---:|---:|---:|---:|---:|---:|---:|---|
| 1920 | 0,024198 | 0,016200 | -0,007998 | 0 | 0 | 0,135966 | Dashboard |
| 1440 | 0,012239 | 0,012239 | 0 | 0 | 0 | 0,103356 | Dashboard |
| 1280 | 0,019826 | 0,013367 | -0,006459 | 0 | 0 | 0,109809 | Dashboard |
| 1024 | 0,024181 | 0,016581 | -0,007599 | 0 | 0 | 0,129191 | Dashboard |
| 900 | 0,026500 | 0,018338 | -0,008162 | 0 | 0 | 0,138759 | Dashboard |
| 768 | 0,029232 | 0,019488 | -0,009744 | 0 | 0 | 0,165646 | Dashboard |
| 640 | 0,016044 | 0,016044 | 0 | 0 | 0 | 0,136375 | Dashboard |
| 430 | 0,013769 | 0,013769 | 0 | 0 | 0 | 0,101772 | Dashboard |
| 390 | 0,013718 | 0,013718 | 0 | 0 | 0 | 0,101394 | Dashboard |
| 360 | 0,012698 | 0,013672 | +0,000974 | 0 | 0 | 0,101056 | Dashboard |

Conclusão: nenhuma das dez larguras ultrapassou a tolerância de regressão contra a produção da Etapa 2. O maior valor individual permanece no estado público do Dashboard em 768px; ele não representa regressão atribuída à Etapa 3 e está documentado no JSON com os shifts observados.

### Diagnóstico histórico da suíte da Etapa 2

O validador antigo da Etapa 2 continua comparando a branch com um baseline histórico anterior à produção atual e registra avisos em algumas execuções. Esses avisos são preservados no relatório de movimento. A mesma execução confirma zero erro funcional não relacionado a CLS, zero reveal pendente, zero animação infinita e zero background fixo. A aprovação de CLS da Etapa 3 usa exclusivamente a comparação direta com `bdf-navy.vercel.app`.

## 11. Quality Gate final

| Gate | Resultado |
|---|---|
| `git diff --check` | aprovado |
| `npm ci` | aprovado |
| `npx tsc --noEmit --incremental false` | aprovado |
| `npx eslint src scripts` | aprovado, zero erro e zero aviso |
| `npm run build` | aprovado |
| Páginas geradas | 29 |
| Script `test` | nenhum script `test` declarado no `package.json` |
| Matriz da Etapa 3 | 170/170 |
| Suíte funcional da Etapa 2 | 170/170; zero falha funcional não relacionada a CLS |
| Overflow horizontal | zero |
| Heading cortado | zero |
| Console | zero erro relevante |
| Texto funcional abaixo de 14px | zero |
| Metadata necessária abaixo de 12px | zero |
| Texto decorativo abaixo de 11px | zero |
| Tracking acima do papel semântico validado | zero |
| Corpo longo com altura de linha insuficiente | zero |
| CLS contra produção | zero largura reprovada |
| Fontes externas em runtime | zero |
| Fallback bloqueado | aprovado |
| Zoom 200% equivalente | aprovado |
| Keyboard e focus-visible | aprovado |
| Forced colors | aprovado |
| Reduced motion | aprovado |
| Pointer coarse / touch | aprovado |
| Resize, back e forward | aprovado |
| Galeria e modal | aprovado |
| Login, Feedback, Home, Hero, Lore, Roadmap, rodapé e 404 | aprovados na matriz/evidências |

O `npm ci` continua relatando vulnerabilidades existentes do ecossistema npm. Elas são registradas como limitação e não foram tratadas com atualização forçada ou breaking change, pois isso ampliaria o escopo da Etapa 3.

## 12. Evidências

O índice completo está em `evidence-index.json` e `EVIDENCE_INDEX.md`. Foram geradas comparações antes/depois e capturas direcionadas de Home desktop, tablet e mobile; Hero desktop e mobile; cabeçalho de página interna; Lore; Personagens; Roadmap; Devlog; Galeria; modal da Galeria em desktop e mobile; Login; Feedback; rodapé; zoom de 200% equivalente; fallback de fonte; e reduced motion.

As capturas direcionadas posicionam o conteúdo de interesse dentro da viewport; full-page é usado como complemento, não como única evidência.

## 13. Pacote consolidado

O artifact do workflow contém `BDF_Fase4_Etapa3_COMPLETO.zip`, incluindo este relatório, referência curta do design system, inventário inicial congelado, JSON de validação final, JSON de comparação de CLS, relatório de regressão do movimento, índice de evidências, screenshots, logs relevantes, dados do Git, limitações e manifesto SHA-256.

O workflow exclui `.woff`, `.woff2`, `.ttf` e `.otf`, valida a ausência desses formatos antes de finalizar e não compartilha arquivos de fonte.

## 14. Limitações

- Dashboard e Admin foram validados nos estados públicos acessíveis sem credenciais; estados autenticados não foram inventados.
- O cenário de zoom a 200% é representado por viewport CSS equivalente de 720px sobre uma referência de 1440px, além de toda a matriz responsiva.
- Há dívida residual de utilitários Tailwind arbitrários em páginas antigas; a Etapa 3 normaliza o resultado renderizado crítico sem reescrever páginas fora do escopo.
- Vulnerabilidades npm já existentes foram documentadas e não receberam correção forçada com breaking changes.
- Os avisos históricos de CLS da suíte antiga da Etapa 2 continuam registrados como diagnóstico, separados da comparação autoritativa da Etapa 3.

## 15. Itens fora do escopo

Não foram executados merge do PR, promoção de Preview para produção, alteração manual de alias ou deployment, reconstrução do sistema de movimento, redefinição estrutural do Header/Dock/Hero, início da Etapa 4, atualização ampla de dependências ou criação artificial de script `test`.

## 16. Git, PR e produção

- base preservada: `b8faffae63a875a542d6f6f29e5401ea41f471ab`;
- trabalho mantido em `agent/fase-4-etapa-3-tipografia-design-system`;
- HEAD final registrado em `GIT_DATA.txt` e na descrição do PR;
- PR #40 permanece em modo rascunho;
- `main` não foi alterada;
- PR não foi mesclado;
- produção `bdf-navy.vercel.app` continua em `b8faffae63a875a542d6f6f29e5401ea41f471ab`;
- nenhuma produção foi promovida manualmente;
- Etapa 4 não foi iniciada.

## 17. Conclusão

A Etapa 3 está concluída após a execução final confirmar todos os gates e publicar o pacote consolidado. O próximo passo depende de autorização explícita para merge ou continuação. Nenhuma ação posterior faz parte desta entrega.
