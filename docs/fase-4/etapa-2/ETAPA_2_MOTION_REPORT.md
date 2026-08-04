# BDF — Fase 4 — Etapa 2

## Simplificação e otimização do sistema de movimento

**Status:** concluída tecnicamente e aguardando revisão do PR  
**Branch:** `agent/fase-4-etapa-2-simplificacao-movimento`  
**Base da branch:** `20c203d5aadaea97cf83c95f703b7a73a9ccb630`  
**Baseline visual auditado:** `7a192260c7945c6c75ab05bba78ebe97f94050e1`  
**PR:** `#39` — rascunho, aberto e não mesclado  
**Run técnico autoritativo:** `30935876457`  
**Artefato técnico:** `8903245826`  

---

## 1. Resumo executivo

O sistema anterior acumulava efeitos globais e locais ao mesmo tempo: duas barras superiores, loading com fallback de oito segundos, blur em reveals textuais, luz baseada em variáveis globais, `background-attachment: fixed` em superfícies repetidas, animações ambientais contínuas, tilt e magnetismo em componentes comuns, medições frequentes no scroll e coreografia completa do Hero em cada retorno à Home.

A Etapa 2 reduziu esse empilhamento sem redesenhar o site. O resultado mantém o preto, carvão, Bone, Ember Rust, o mapa, o símbolo, o Dock, as timelines e a atmosfera cinematográfica, mas utiliza movimento somente quando existe função de orientação, feedback ou hierarquia.

Principais efeitos finais:

- transições comuns mais curtas;
- um único indicador superior;
- nenhum loading preso nos cenários testados;
- nenhum blur animado em texto;
- nenhuma animação ambiental infinita restante;
- luz dinâmica limitada ao elemento estratégico sob interação;
- nenhum `background-attachment: fixed` nas superfícies verificadas;
- timelines diretamente sincronizadas ao scroll;
- Dock sem loop ativo em repouso e sem ampliação em touch;
- Hero com coreografia inicial preservada e retorno curto na mesma sessão;
- Galeria e modal sem pausas causadas por `mode="wait"`;
- zero `requestAnimationFrame` registrado em 700 ms de repouso;
- nenhuma largura apresentou regressão na média de CLS compartilhado.

---

## 2. Preparação e compatibilidade do baseline

Foram lidos o relatório manual autoritativo, `baseline.json`, `interactions.json`, `scroll-validation.json` e as capturas por seção do pacote `BDF_Fase4_Etapa1_COMPLETO_ATUALIZADO.zip`.

A comparação entre o commit visual auditado `7a192260...` e a `main` usada para iniciar a Etapa 2, `20c203d...`, mostrou somente a integração dos documentos, scripts, workflows e evidências da Etapa 1. Nenhum arquivo da aplicação foi alterado nesse intervalo.

Conclusão: o baseline permaneceu compatível e não foi necessário refazer a Etapa 1 nem reiniciar o planejamento.

---

## 3. Inventário antes e depois

| Item | Antes | Depois |
|---|---:|---:|
| Sistemas superiores de progresso | 2 | 1 |
| Fallback máximo de navegação | 8.000 ms | 1.600 ms |
| Animações ambientais contínuas | 3 | 0 |
| Blur animado em reveals textuais | Sim | Não |
| Padrões repetidos com `background-attachment: fixed` | 3 | 0 nos seletores verificados |
| Suavização CSS adicional da linha de timeline | 90 ms | 0 ms |
| Modos de presença da Galeria | `popLayout` e `wait` | `sync` |
| Luz dinâmica | Variáveis globais herdadas por grande parte da página | No máximo um elemento estratégico local |
| Geometria do Dock | Leitura por item durante frames ativos | Cache atualizado em montagem, resize e rota |
| Hero ao retornar à Home | Coreografia completa em cada montagem | Entrada compacta na mesma sessão cliente |
| RAF em repouso por 700 ms | Não medido com confiança no baseline | 0 |
| Animações em execução no repouso medido | Não medido com confiança no baseline | 0 |

A quantidade exata de elementos visualmente afetados pela antiga luz global não pôde ser expressa como número confiável, pois a propagação acontecia por variáveis CSS, pseudo-elementos e herança de estilos. O estado final foi validado objetivamente: nenhuma variável dinâmica é escrita na raiz e nunca existe mais de uma luz local ativa.

---

## 4. Durações e easings finais

### Durações

| Papel | Valor final |
|---|---:|
| Feedback instantâneo | 160 ms |
| Hover, foco e feedback comum | 200 ms |
| Saída de rota | 160 ms |
| Entrada comum de rota | 340 ms |
| Reveal editorial comum | 420 ms |
| Reorganização da Galeria | 380 ms |
| Hero inicial | 820 ms |
| Stagger máximo por passo | 45 ms |
| Fallback defensivo de navegação | 1.600 ms |

### Easings

- entrada: `cubic-bezier(0.22, 1, 0.36, 1)`;
- padrão: `cubic-bezier(0.2, 0.8, 0.2, 1)`;
- saída: `cubic-bezier(0.4, 0, 1, 1)`.

---

## 5. Movimento removido, preservado e limitado

### Removido

- segunda barra superior concorrente;
- blur de títulos, parágrafos, labels, metadata e registros;
- três movimentos ambientais infinitos;
- tilt dos cards comuns;
- magnetismo posicional dos botões comuns;
- `background-attachment: fixed` em cards, botões, glifos, Dock e header;
- atraso CSS da linha das timelines;
- espera sequencial entre mídia e texto do modal;
- loop contínuo do cursor e da mola do Dock quando em repouso.

### Preservado

- entrada cinematográfica inicial do Hero;
- desenho inicial das rotas do mapa;
- entrada do símbolo, nós e detalhes secundários;
- feedback curto de botões e cards relevantes;
- ampliação elástica do Dock em ponteiro fino;
- ativação dos nós de Roadmap e Lore;
- transição de abertura e fechamento do modal;
- progressão superior única;
- suporte integral a `prefers-reduced-motion`.

### Limitado a contextos específicos

- luz dinâmica: somente elemento com `data-fx-spotlight` ou `data-fx-magnetic` realmente interagido;
- Hero completo: somente primeira entrada relevante da sessão cliente;
- Dock elástico: somente `hover: hover` e `pointer: fine`;
- progressão de timeline: somente Roadmap e Lore, com controlador dedicado;
- movimento de Galeria: somente reorganização, entrada/saída curta e troca de item.

### Animações infinitas restantes

Nenhuma animação infinita foi encontrada nas 170 combinações testadas nem nos cenários de interação direcionados.

---

## 6. Navegação

### Lógica anterior

- clique interno ativava estado global de navegação;
- pathname era a principal chave observada;
- query string e cancelamentos podiam não limpar o estado no momento esperado;
- fallback visual de aproximadamente oito segundos;
- barra de rota concorria com a barra de scroll;
- saída e entrada podiam empilhar alturas durante `AnimatePresence`.

### Lógica final

- chave de rota formada por pathname e query string;
- clique cancelado respeitado porque o listener atua após o comportamento do elemento;
- mesma página com hash não inicia loading de rota;
- `popstate`, `pageshow`, `pagehide`, `hashchange`, `error` e `unhandledrejection` possuem limpeza defensiva;
- voltar e avançar restauram `aria-busy`, cursor, dataset e timers;
- cliques repetidos não criam timers concorrentes;
- fallback reduzido para 1.600 ms;
- saída e entrada compartilham a mesma célula de grid, evitando soma temporária de alturas;
- existe somente um indicador superior;
- erro 404 deliberado não mantém loading ativo.

Resultados direcionados:

- query string: aprovado;
- hash: aprovado;
- back/forward: aprovado;
- link cancelado: aprovado;
- navegação rápida: aprovada;
- 404: aprovado;
- `aria-busy` final: `false`;
- dataset final: ausente.

---

## 7. Scroll, timelines e medições de layout

`ImpactEffects` ficou responsável apenas por reveals, progresso superior e luz local. Roadmap e Lore receberam um controlador dedicado que:

- descobre as timelines quando o conteúdo da rota entra no shell;
- observa somente inserção e remoção estrutural no conteúdo;
- armazena referências e métricas;
- recalcula em montagem, troca de rota, resize ou alteração estrutural;
- agrupa escrita em um único `requestAnimationFrame`;
- utiliza listener passivo;
- para quando a aba fica oculta;
- completa imediatamente em reduced motion;
- não adiciona transição CSS à linha progressiva.

Medições após scroll rápido:

- Roadmap 1440: 9 leituras de `getBoundingClientRect`, progresso `1`, 16 nós ativos;
- Lore 1440: 16 leituras, progresso `1`, 6 nós ativos;
- Roadmap 768: 9 leituras, progresso `1`, 16 nós ativos;
- Lore 768: 16 leituras, progresso `1`, 6 nós ativos;
- máximo observado na matriz: 16 leituras durante scroll rápido.

Essas leituras são usadas para formar o cache, não em cada frame de rolagem.

---

## 8. Dock

A direção visual e os nove destinos foram preservados.

Alterações limitadas ao motor:

- centros dos itens medidos uma vez e armazenados;
- nova medição somente em resize, mudança de rota ou capacidade de ponteiro;
- mola interrompida ao alcançar o repouso;
- cancelamento em desmontagem e aba oculta;
- reset após `pointercancel`;
- nenhuma ampliação em coarse pointer ou touch;
- animação de entrada removida no touch para o controle nascer em tamanho estável;
- área medida de todos os nove controles em touch: exatamente 44 × 44 px;
- escala em ponteiro fino: aproximadamente `1,2945` no pico e `1` no repouso;
- exatamente um indicador ativo nas rotas que pertencem ao Dock.

---

## 9. Hero

A primeira entrada relevante mantém uma sequência curta e ordenada:

1. conteúdo;
2. rota principal;
3. símbolo;
4. nós;
5. detalhes secundários.

O retorno à Home durante a mesma sessão cliente utiliza entrada compacta de 280–320 ms. O estado é local ao cliente, sem backend, banco ou persistência permanente. O HTML inicial não é escondido e reduced motion resolve diretamente para conteúdo visível.

Validação:

- primeira entrada: `data-hero-entry="first"`;
- retorno: `data-hero-entry="return"`;
- reduced motion: `data-hero-entry="reduced"`.

---

## 10. Galeria e modal

Foram preservados:

- seis filtros;
- todos os itens;
- grid;
- navegação anterior/próximo;
- Escape;
- focus trap;
- retorno de foco;
- conteúdo e classificação dos registros.

Refinamentos:

- `mode="wait"` e `popLayout` substituídos por `sync`;
- reorganização limitada a `layout="position"` por 380 ms;
- troca de mídia e texto por 200 ms, sem pausa sequencial;
- deslocamento do modal reduzido;
- alvo de retorno de foco capturado antes da desmontagem;
- backdrop usa evento de ponteiro;
- cliques rápidos em próximo não duplicam nem fecham o modal.

Resultados em 1440 e 390 touch:

- seis filtros presentes;
- somente um filtro ativo;
- modal único após cinco cliques rápidos;
- foco inicial em “Fechar preview”;
- Escape fecha;
- foco retorna ao item de origem.

---

## 11. Reduced motion e touch

### Reduced motion

Em Home, Roadmap, Lore e Galeria:

- zero reveals pendentes;
- zero elementos de reveal invisíveis;
- zero animações infinitas;
- zero luzes dinâmicas;
- Hero imediatamente visível;
- Roadmap em progresso `1` com 16 nós ativos;
- Lore em progresso `1` com 6 nós ativos;
- navegação e modal funcionais.

### Touch e coarse pointer

- `pointer: coarse` e `hover: none` confirmados;
- luz não acompanha o dedo;
- Dock permanece com escala `1`;
- nove áreas de 44 × 44 px;
- filtros e modal funcionam por tap;
- rolagem permanece disponível;
- nenhum estado de hover fica preso.

---

## 12. Performance medida

### Resultados reais

- 170 combinações de rota e largura;
- zero erros da validação;
- zero novos erros de console;
- zero reveals pendentes;
- zero animações infinitas;
- zero superfícies verificadas com fixed background;
- zero RAF em 700 ms de repouso;
- zero animações em execução no repouso medido;
- máximo de 16 leituras geométricas durante scroll rápido;
- navegação com CPU 4×: aproximadamente 704 ms até estado ocioso;
- fallback máximo defensivo: 1.600 ms.

### Limitações

- FPS e GPU não são afirmados: Chromium headless não reproduz com fidelidade a composição de todos os aparelhos;
- o throttling 4× do Chromium é uma aproximação, não substitui profiling em hardware físico;
- não existe script de teste unitário declarado no `package.json`;
- Dashboard e Admin permanecem limitados aos estados públicos sem credenciais;
- o `npm ci` informou avisos de segurança já existentes nas dependências; nenhuma dependência foi modificada nesta etapa.

---

## 13. CLS

### Investigação

Foram examinados:

- wrapper de transição;
- `AnimatePresence`;
- sobreposição de saída e entrada;
- shell de loading;
- conteúdo inicialmente invisível;
- Hero;
- Header e Dock;
- hidratação;
- carregamento de fontes.

### Correção ligada ao movimento

As páginas de saída e entrada agora ocupam a mesma célula do shell de transição. Isso impede que duas árvores somem temporariamente suas alturas durante a troca de rota.

### Resultado por largura

O CLS compartilhado foi comparado pela média de cada largura. A atribuição individual por rota varia conforme o instante em que fontes e shells globais estabilizam; todos os valores individuais continuam preservados no JSON.

| Largura | Média baseline | Média Etapa 2 | Diferença |
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

Nenhuma largura regrediu na média compartilhada. O maior valor individual continuou em `0,1656456`, sem aumento sobre o pico do baseline.

### O que permanece

A parcela compartilhada associada a fontes, Header, hidratação e layout global não foi eliminada integralmente porque exigiria mudanças de tipografia ou composição fora do escopo. Ela permanece registrada para as próximas etapas. Valores individuais podem migrar entre rotas conforme o cache de fonte e a ordem de estabilização; por isso o relatório não atribui causalidade falsa a uma página específica.

---

## 14. Testes executados

### Comandos

```bash
git diff --check FETCH_HEAD HEAD --
npm ci
npx tsc --noEmit --incremental false
npx eslint src scripts
npm run build
node scripts/validate-motion-etapa-2-final.mjs
node scripts/capture-motion-etapa-2-samples.mjs
```

Não foi executado `npm test` porque não existe script `test` no projeto.

### Matriz

Rotas: 17.  
Larguras: 1920, 1440, 1280, 1024, 900, 768, 640, 430, 390 e 360.  
Total: 170 combinações.

Também foram testados:

- links internos;
- voltar e avançar;
- query string;
- hash;
- link cancelado;
- cliques rápidos;
- rota 404;
- seis filtros da Galeria;
- abertura, troca, Escape e foco do modal;
- Roadmap completo;
- Lore completa;
- scroll rápido;
- ponteiro fino;
- ponteiro coarse;
- touch;
- reduced motion;
- aba oculta e restaurada;
- resize;
- CPU 4×.

### Resultado

- whitespace: aprovado;
- instalação limpa: aprovada;
- TypeScript: aprovado;
- ESLint: aprovado;
- build: aprovado, 29 páginas processadas;
- matriz: 170/170;
- erros da validação: 0;
- warnings da validação: 0;
- erros de console novos: 0.

---

## 15. Evidências

O artefato contém:

- `home-hero-first-1440.png`;
- `home-hero-return-1440.png`;
- `roadmap-complete-1440.png`;
- `lore-complete-1440.png`;
- `gallery-grid-1440.png`;
- `gallery-filtered-1440.png`;
- `gallery-modal-1440.png`;
- `home-tablet-768.png`;
- `roadmap-tablet-768.png`;
- `home-mobile-390.png`;
- `gallery-modal-mobile-390.png`;
- `home-reduced-motion-390.png`;
- `lore-reduced-motion-390.png`;
- `motion-validation.json`;
- `evidence-index.json`;
- log do servidor local.

As capturas full-page usam rolagem progressiva antes do screenshot para pintar corretamente conteúdo controlado por `content-visibility`.

---

## 16. Arquivos alterados

### Aplicação

- `src/lib/motion.ts` — tokens, durações, easings e variantes compartilhadas;
- `src/components/RouteTransition.tsx` — navegação, query, hash, cancelamento, back/forward e limpeza;
- `src/components/ImpactEffects.tsx` — reveals, indicador único e luz local;
- `src/components/ScrollTimeline.tsx` — controlador dedicado de Roadmap e Lore;
- `src/components/CursorAura.tsx` — atualização limitada a um frame e parada no repouso;
- `src/components/BackgroundFog.tsx` — atmosfera preservada em estado estático;
- `src/components/HeroSection.tsx` — primeira entrada, retorno e reduced motion;
- `src/components/DockMenu.tsx` — cache geométrico, parada da mola e resets;
- `src/components/GalleryModal.tsx` — presença síncrona, foco e troca rápida;
- `src/app/galeria/page.tsx` — reorganização e presença dos itens;
- `src/app/layout.tsx` — montagem dos controladores e folhas de otimização;
- `src/app/motion-optimization.css` — simplificação global do movimento;
- `src/app/motion-touch-optimization.css` — coarse pointer, touch e estabilidade do Dock.

### Validação e documentação

- `scripts/validate-motion-etapa-2-final.mjs` — suíte autoritativa de 170 casos e interações;
- `scripts/validate-motion-etapa-2.mjs` — instrumento iterativo usado durante o refinamento;
- `scripts/capture-motion-etapa-2-samples.mjs` — evidências comparativas;
- `.github/workflows/fase-4-etapa-2-validation.yml` — instalação limpa, código, build, navegador e artefato;
- `docs/fase-4/etapa-2/ETAPA_2_MOTION_REPORT.md` — este relatório.

Nenhum arquivo de Supabase, SQL, banco, autenticação, API, regra de negócio, conteúdo editorial, rota ou permissão foi modificado.

---

## 17. Git e estado final

- branch: `agent/fase-4-etapa-2-simplificacao-movimento`;
- base: `20c203d5aadaea97cf83c95f703b7a73a9ccb630`;
- HEAD de aplicação validado: `92d5a78ee210b837a94d30d3cbd1008d222e20d1`;
- HEAD de aplicação e evidências antes do relatório: `5187016e2b1369555b0697ce9bfb83bfe1badabe`;
- PR: `#39`, mantido como rascunho;
- merge: não realizado;
- deploy de produção: não realizado;
- previews automáticos da branch: não promovidos;
- Etapa 3: não iniciada.

O HEAD absoluto da branch após este documento deve ser consultado no PR, pois o próprio commit documental é posterior aos hashes de aplicação listados acima.

---

## 18. Conclusão

A Etapa 2 atende aos critérios de aprovação dentro do escopo autorizado. O site permanece reconhecivelmente o mesmo projeto, com menos efeitos concorrentes, navegação mais rápida, timelines responsivas, menor atividade em repouso, touch estável e Hero ainda cinematográfico.

Nenhum merge deve ocorrer sem autorização explícita. A próxima etapa não foi iniciada.
