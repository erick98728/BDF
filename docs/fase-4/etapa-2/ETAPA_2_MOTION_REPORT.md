# BDF — Fase 4 — Etapa 2

## Simplificação e otimização do sistema de movimento

**Status:** concluída tecnicamente e aguardando revisão do PR

**Branch:** `agent/fase-4-etapa-2-simplificacao-movimento`

**Base da branch:** `20c203d5aadaea97cf83c95f703b7a73a9ccb630`

**Baseline visual auditado:** `7a192260c7945c6c75ab05bba78ebe97f94050e1`

**PR:** `#39`, rascunho, aberto e não mesclado

**Run técnico autoritativo:** `30935876457`

**Artefato técnico:** `8903245826`

---

## 1. Resumo executivo

O sistema anterior combinava duas barras superiores, fallback de navegação de oito segundos, blur em reveals textuais, luz baseada em variáveis globais, `background-attachment: fixed` em superfícies repetidas, três animações ambientais contínuas, tilt e magnetismo em componentes comuns, medições frequentes no scroll e a coreografia completa do Hero em todo retorno à Home.

A Etapa 2 reduziu esse empilhamento sem redesenhar o site. Foram preservados preto, carvão, Bone, Ember Rust, mapa, símbolo, Dock, timelines, Galeria, conteúdo, rotas e atmosfera cinematográfica.

Resultado final:

- transições comuns mais curtas;
- um único indicador superior;
- nenhum loading preso nos cenários testados;
- textos sem blur animado;
- zero animações ambientais infinitas;
- luz dinâmica limitada ao elemento estratégico interagido;
- zero `background-attachment: fixed` nas superfícies verificadas;
- timelines diretamente sincronizadas ao scroll;
- Dock sem loop em repouso e sem ampliação em touch;
- Hero completo somente na primeira entrada relevante da sessão;
- Galeria e modal sem pausas causadas por `mode="wait"`;
- zero `requestAnimationFrame` em 700 ms de repouso;
- nenhuma largura com regressão na média de CLS compartilhado.

---

## 2. Preparação e compatibilidade do baseline

Foram consultados o relatório manual autoritativo, `baseline.json`, `interactions.json`, `scroll-validation.json` e as capturas por seção do pacote `BDF_Fase4_Etapa1_COMPLETO_ATUALIZADO.zip`.

A comparação entre o commit visual auditado `7a192260...` e a `main` usada como base, `20c203d...`, mostrou somente a integração de documentos, evidências, scripts e workflows da Etapa 1. Nenhum arquivo da aplicação mudou nesse intervalo.

O baseline continuou compatível. A Etapa 1 não foi refeita e o planejamento não foi reiniciado.

---

## 3. Inventário de movimento

| Item | Antes | Depois |
|---|---:|---:|
| Sistemas superiores de progresso | 2 | 1 |
| Fallback de navegação | 8.000 ms | 1.600 ms |
| Animações ambientais contínuas | 3 | 0 |
| Blur em reveals textuais | Sim | Não |
| Padrões repetidos com fixed background | 3 | 0 nos seletores verificados |
| Suavização CSS adicional da timeline | 90 ms | 0 ms |
| Presença da Galeria | `popLayout` e `wait` | `sync` |
| Luz dinâmica | Variáveis globais | No máximo um elemento local |
| Geometria do Dock | Leitura por item durante frames ativos | Cache por montagem, resize e rota |
| Hero no retorno | Coreografia completa | Entrada compacta |
| RAF em repouso por 700 ms | Não medido com confiança | 0 |
| Animações em execução no repouso | Não medido com confiança | 0 |

A quantidade exata de elementos afetados pela antiga luz global não foi inventada. O alcance vinha de variáveis CSS, pseudo-elementos e herança. O estado final foi medido objetivamente: nenhuma variável dinâmica é escrita na raiz e nunca há mais de uma luz local ativa.

### Efeitos removidos

- segunda barra superior concorrente;
- blur em títulos, parágrafos, labels, metadata e registros;
- três animações ambientais infinitas;
- tilt dos cards comuns;
- magnetismo posicional dos botões comuns;
- fixed background em cards, botões, glifos, Dock e header;
- atraso CSS da linha das timelines;
- espera sequencial entre mídia e texto no modal;
- loop contínuo do cursor e da mola do Dock em repouso.

### Efeitos preservados

- entrada cinematográfica inicial do Hero;
- desenho inicial das rotas do mapa;
- entrada de símbolo, nós e detalhes secundários;
- feedback curto de botões e cards relevantes;
- ampliação elástica do Dock em ponteiro fino;
- ativação de nós de Roadmap e Lore;
- abertura e fechamento do modal;
- indicador superior único;
- suporte integral a `prefers-reduced-motion`.

### Efeitos limitados

- luz dinâmica somente em elemento com `data-fx-spotlight` ou `data-fx-magnetic` realmente interagido;
- Hero completo somente na primeira entrada da sessão cliente;
- Dock elástico somente com `hover: hover` e `pointer: fine`;
- progressão de timeline somente em Roadmap e Lore;
- movimento de Galeria somente na reorganização, entrada curta e troca de item.

### Animações infinitas restantes

Nenhuma foi encontrada nas 170 combinações ou nos testes direcionados.

---

## 4. Durações e easings finais

| Papel | Valor final |
|---|---:|
| Feedback instantâneo | 160 ms |
| Hover, foco e feedback comum | 200 ms |
| Saída de rota | 160 ms |
| Entrada comum de rota | 340 ms |
| Reveal editorial | 420 ms |
| Reorganização da Galeria | 380 ms |
| Hero inicial | 820 ms |
| Stagger por passo | 45 ms |
| Fallback defensivo | 1.600 ms |

Easings finais:

- entrada: `cubic-bezier(0.22, 1, 0.36, 1)`;
- padrão: `cubic-bezier(0.2, 0.8, 0.2, 1)`;
- saída: `cubic-bezier(0.4, 0, 1, 1)`.

---

## 5. Navegação

### Antes

- pathname era a principal chave observada;
- query string e cancelamentos podiam não limpar o estado no momento esperado;
- fallback visual de aproximadamente oito segundos;
- barra de rota concorria com barra de scroll;
- saída e entrada podiam somar alturas durante `AnimatePresence`.

### Depois

- chave formada por pathname e query string;
- clique cancelado respeitado;
- mudança somente de hash não inicia loading de rota;
- `popstate`, `pageshow`, `pagehide`, `hashchange`, `error` e `unhandledrejection` possuem limpeza defensiva;
- back e forward restauram `aria-busy`, cursor, dataset e timers;
- cliques repetidos não criam timers concorrentes;
- fallback reduzido para 1.600 ms;
- saída e entrada compartilham a mesma célula de grid;
- somente um indicador superior permanece;
- 404 deliberado não deixa loading ativo.

Resultados:

- query string: aprovada;
- hash: aprovado;
- back/forward: aprovados;
- link cancelado: aprovado;
- navegação rápida: aprovada;
- 404: aprovado;
- `aria-busy` final: `false`;
- dataset final: ausente.

---

## 6. Scroll e timelines

`ImpactEffects` passou a cuidar apenas de reveals, indicador superior e luz local. Roadmap e Lore utilizam controlador dedicado que:

- descobre a timeline quando o conteúdo da rota entra no shell;
- observa somente inserção e remoção estrutural;
- armazena referências e métricas;
- recalcula em montagem, rota, resize ou alteração estrutural;
- agrupa escrita em um único `requestAnimationFrame`;
- usa listener passivo;
- pausa com aba oculta;
- completa imediatamente em reduced motion;
- não adiciona suavização CSS à linha.

Medições após scroll rápido:

- Roadmap 1440: 9 leituras de `getBoundingClientRect`, progresso `1`, 16 nós ativos;
- Lore 1440: 16 leituras, progresso `1`, 6 nós ativos;
- Roadmap 768: 9 leituras, progresso `1`, 16 nós ativos;
- Lore 768: 16 leituras, progresso `1`, 6 nós ativos;
- máximo na matriz: 16 leituras.

As leituras formam o cache e não acontecem em todo frame de rolagem.

---

## 7. Dock

Foram preservados os nove destinos, indicador ativo, tooltips, navegação por teclado e ampliação elástica.

Ajustes do motor:

- centros medidos e armazenados;
- nova medição somente em resize, rota ou capacidade do ponteiro;
- mola para ao alcançar repouso;
- cancelamento na desmontagem e aba oculta;
- reset em `pointercancel`;
- nenhuma ampliação em coarse pointer ou touch;
- entrada removida no touch para nascer em tamanho estável;
- todos os nove controles medidos em 44 × 44 px;
- escala fina medida em aproximadamente `1,2945` no pico e `1` no repouso;
- exatamente um indicador ativo nas rotas pertencentes ao Dock.

---

## 8. Hero

A primeira entrada mantém a sequência:

1. conteúdo;
2. rota principal;
3. símbolo;
4. nós;
5. detalhes secundários.

O retorno à Home na mesma sessão usa entrada de 280 a 320 ms. O estado é cliente, sem backend, banco ou persistência permanente. O HTML inicial não é escondido e reduced motion mostra tudo imediatamente.

Validação:

- primeira entrada: `first`;
- retorno: `return`;
- reduced motion: `reduced`.

---

## 9. Galeria e modal

Foram preservados seis filtros, todos os itens, grid, anterior/próximo, Escape, focus trap, retorno de foco, textos e categorias.

Refinamentos:

- `mode="wait"` e `popLayout` substituídos por `sync`;
- reorganização usa somente posição por 380 ms;
- mídia e texto trocam em 200 ms sem pausa sequencial;
- deslocamento do modal reduzido;
- alvo de retorno de foco capturado antes da desmontagem;
- backdrop usa evento de ponteiro;
- cliques rápidos não duplicam nem fecham o modal.

Em 1440 e 390 touch:

- seis filtros presentes;
- somente um filtro ativo;
- modal único após cinco cliques rápidos;
- foco inicial em “Fechar preview”;
- Escape fecha;
- foco retorna ao item de origem.

---

## 10. Reduced motion e touch

### Reduced motion

Em Home, Roadmap, Lore e Galeria:

- zero reveals pendentes;
- zero reveals invisíveis;
- zero animações infinitas;
- zero luzes dinâmicas;
- Hero imediatamente visível;
- Roadmap completo com 16 nós ativos;
- Lore completa com 6 nós ativos;
- navegação e modal funcionais.

### Touch e coarse pointer

- `pointer: coarse` e `hover: none` confirmados;
- luz não acompanha o dedo;
- Dock permanece em escala `1`;
- nove controles de 44 × 44 px;
- filtros e modal funcionam por tap;
- rolagem preservada;
- nenhum hover fica preso.

---

## 11. Performance medida

Resultados reais:

- 170 combinações de rota e largura;
- zero erros da validação;
- zero novos erros de console;
- zero reveals pendentes;
- zero animações infinitas;
- zero superfícies verificadas com fixed background;
- zero RAF em 700 ms de repouso;
- zero animações em execução no repouso;
- máximo de 16 leituras geométricas no scroll rápido;
- navegação com CPU 4× em aproximadamente 704 ms até estado ocioso;
- fallback máximo de 1.600 ms.

Limitações:

- FPS e GPU não são afirmados porque Chromium headless não representa todos os aparelhos;
- throttling 4× é aproximação, não substitui hardware físico;
- não existe script unitário `test` no `package.json`;
- Dashboard e Admin permanecem limitados a estados públicos sem credenciais;
- `npm ci` informou avisos de segurança já existentes; nenhuma dependência mudou nesta etapa.

---

## 12. CLS

Foram investigados wrapper de transição, `AnimatePresence`, shell de loading, conteúdo inicialmente invisível, Hero, Header, Dock, hidratação e fontes.

A correção ligada ao movimento coloca saída e entrada na mesma célula do shell, impedindo soma temporária de alturas.

O CLS compartilhado foi comparado pela média de cada largura. A atribuição individual por rota varia conforme fontes e shells globais estabilizam; todos os valores individuais permanecem no JSON.

| Largura | Baseline | Etapa 2 | Diferença |
|---:|---:|---:|---:|
| 1920 | 0,0882 | 0,0417 | -0,0465 |
| 1440 | 0,0844 | 0,0372 | -0,0472 |
| 1280 | 0,1045 | 0,0505 | -0,0540 |
| 1024 | 0,0957 | 0,0734 | -0,0223 |
| 900 | 0,1172 | 0,0772 | -0,0399 |
| 768 | 0,1321 | 0,0833 | -0,0487 |
| 640 | 0,0872 | 0,0600 | -0,0272 |
| 430 | 0,0747 | 0,0578 | -0,0169 |
| 390 | 0,0773 | 0,0637 | -0,0135 |
| 360 | 0,0655 | 0,0388 | -0,0267 |

Nenhuma largura regrediu na média. O maior valor individual continuou em `0,1656456`, sem aumento sobre o pico do baseline.

A parcela ligada a fontes, Header, hidratação e layout global não foi eliminada integralmente porque exigiria mudanças fora do escopo. Valores individuais podem migrar entre rotas conforme cache de fonte e ordem de estabilização; o relatório não atribui causalidade falsa a uma página específica.

---

## 13. Testes

Comandos:

```bash
git diff --check FETCH_HEAD HEAD --
npm ci
npx tsc --noEmit --incremental false
npx eslint src scripts
npm run build
node scripts/validate-motion-etapa-2-final.mjs
node scripts/capture-motion-etapa-2-samples.mjs
```

Não houve `npm test` porque o projeto não declara esse script.

Matriz:

- rotas: 17;
- larguras: 1920, 1440, 1280, 1024, 900, 768, 640, 430, 390 e 360;
- total: 170 combinações.

Interações adicionais:

- links internos;
- back e forward;
- query string;
- hash;
- link cancelado;
- cliques rápidos;
- 404;
- seis filtros da Galeria;
- modal, troca, Escape e foco;
- Roadmap e Lore completas;
- scroll rápido;
- ponteiro fino;
- coarse pointer;
- touch;
- reduced motion;
- aba oculta e restaurada;
- resize;
- CPU 4×.

Resultado:

- whitespace aprovado;
- instalação limpa aprovada;
- TypeScript aprovado;
- ESLint aprovado;
- build aprovado, 29 páginas processadas;
- matriz 170/170;
- erros 0;
- warnings 0;
- novos erros de console 0.

---

## 14. Evidências

O artefato contém:

- Home e Hero inicial em 1440;
- Home e Hero de retorno em 1440;
- Roadmap completa em 1440 e 768;
- Lore completa em 1440;
- Galeria completa, filtrada e modal em 1440;
- Home em 768 e 390;
- modal touch em 390;
- Home e Lore em reduced motion;
- `motion-validation.json`;
- `evidence-index.json`;
- log do servidor.

Capturas full-page usam rolagem progressiva antes do screenshot para pintar conteúdo controlado por `content-visibility`.

---

## 15. Arquivos alterados

### Aplicação

- `src/lib/motion.ts`: tokens, durações, easings e variantes;
- `src/components/RouteTransition.tsx`: navegação e limpeza de estados;
- `src/components/ImpactEffects.tsx`: reveals, indicador e luz local;
- `src/components/ScrollTimeline.tsx`: controlador de Roadmap e Lore;
- `src/components/CursorAura.tsx`: atualização por frame e repouso;
- `src/components/BackgroundFog.tsx`: atmosfera estática;
- `src/components/HeroSection.tsx`: primeira entrada, retorno e reduced motion;
- `src/components/DockMenu.tsx`: cache, mola e resets;
- `src/components/GalleryModal.tsx`: presença, foco e troca rápida;
- `src/app/galeria/page.tsx`: reorganização dos itens;
- `src/app/layout.tsx`: montagem dos controladores;
- `src/app/motion-optimization.css`: simplificação global;
- `src/app/motion-touch-optimization.css`: touch e Dock estável.

### Validação e documentação

- `scripts/validate-motion-etapa-2-final.mjs`: suíte autoritativa;
- `scripts/validate-motion-etapa-2.mjs`: instrumento iterativo do refinamento;
- `scripts/capture-motion-etapa-2-samples.mjs`: evidências;
- `.github/workflows/fase-4-etapa-2-validation.yml`: CI completa;
- `docs/fase-4/etapa-2/ETAPA_2_MOTION_REPORT.md`: este relatório.

Nenhum arquivo de Supabase, SQL, banco, autenticação, API, regra de negócio, conteúdo, rota ou permissão foi modificado.

---

## 16. Git e estado final

- branch: `agent/fase-4-etapa-2-simplificacao-movimento`;
- base: `20c203d5aadaea97cf83c95f703b7a73a9ccb630`;
- HEAD de aplicação validado: `92d5a78ee210b837a94d30d3cbd1008d222e20d1`;
- HEAD de aplicação e evidências antes do relatório: `5187016e2b1369555b0697ce9bfb83bfe1badabe`;
- PR: `#39`, mantido como rascunho;
- merge: não realizado;
- deploy de produção: não realizado;
- previews da branch: não promovidos;
- Etapa 3: não iniciada.

O HEAD absoluto após o commit documental deve ser consultado no PR, pois o próprio relatório é posterior aos hashes de aplicação listados.

---

## 17. Conclusão

A Etapa 2 atende aos critérios de aprovação dentro do escopo autorizado. O site permanece reconhecivelmente o mesmo projeto, com menos efeitos concorrentes, navegação mais rápida, timelines responsivas, menor atividade em repouso, touch estável e Hero ainda cinematográfico.

Nenhum merge deve ocorrer sem autorização explícita. A Etapa 3 não foi iniciada.
