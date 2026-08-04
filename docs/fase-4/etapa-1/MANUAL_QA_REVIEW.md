# FASE 4 · ETAPA 1 — Baseline visual e revisão manual definitiva

**Projeto:** BDF / Protótipo  
**Branch de auditoria:** `agent/fase-4-etapa-1-baseline-visual`  
**Base auditada:** `main` no commit `7a192260c7945c6c75ab05bba78ebe97f94050e1`  
**Origem visual:** `https://bdf-navy.vercel.app` — alias público do deployment de produção indicado para a auditoria  
**Execução principal:** Chromium + Playwright no GitHub Actions  
**Data:** 3 de agosto de 2026

> Este documento é a interpretação manual autoritativa do baseline. O relatório automatizado bruto permanece disponível para rastreabilidade, mas soma ocorrências repetidas e inclui falsos positivos de elementos deliberadamente fora da viewport e de reveals ainda não visitados pela rolagem. A validação complementar percorreu as páginas de verdade antes da classificação e corrigiu esses casos.

## Resumo executivo

A base visual está funcional, coerente e responsiva. Nenhum problema crítico foi confirmado. O projeto preserva uma direção editorial cinematográfica própria, sem overflow horizontal nas 170 combinações de página e largura, sem imagens quebradas, sem loading preso e sem erros de execução da página.

Os dois pontos prioritários são: **mudança de layout acumulada em várias rotas e larguras** e **semântica ARIA inválida no seletor Entrar/Criar conta da página de Login**. Depois deles, o refinamento deve concentrar-se em legibilidade de microtipografia, áreas de toque, densidade das páginas funcionais e custo das animações ambientais contínuas.

### Classificação manual consolidada

| Severidade | Quantidade de problemas agrupados | Situação |
|---|---:|---|
| Crítico | 0 | Nenhum bloqueio visual ou funcional confirmado |
| Alto | 2 | CLS compartilhado e semântica ARIA do Login |
| Médio | 4 | Microtipografia, áreas de toque, animações contínuas e densidade visual |
| Baixo | 2 | Hero longo no mobile e vazio excessivo da 404 no desktop |
| Preferência estética | 3 | Ritmo repetitivo, Dock apenas por ícones e hierarquia de CTAs funcionais |

---

## 1. Matriz de páginas e resoluções testadas

Todas as células abaixo foram abertas em Chromium real. As rotas normais responderam HTTP 200; a rota inexistente respondeu HTTP 404, como esperado.

| Página | 1920 | 1440 | 1280 | 1024 | 900 | 768 | 640 | 430 | 390 | 360 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Home | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Download | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Lore | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Personagens | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Studio | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Devlog | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Roadmap | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Galeria | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Login | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Feedback | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dashboard — estado público | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin — estado público | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Página 404 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Devlog · Bosque da Névoa | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Devlog · Sistema de Dash | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Devlog · Chefe Lucarelli | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Devlog · Primeira demo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Cobertura principal:** 17 páginas × 10 larguras = **170 combinações**.  
**Cobertura complementar com rolagem real:** 17 páginas × 3 larguras representativas = **51 combinações**.  
**Evidências geradas nas duas execuções concluídas:** **274 screenshots** — 170 primeiras dobras, 51 páginas completas, 2 modais e 51 capturas após rolagem progressiva.

Arquivos de referência:

- [Relatório automatizado bruto](README.md)
- [Dados completos da matriz](baseline.json)
- [Índice de evidências](evidence-index.md)
- [Validação complementar de rolagem](SCROLL_VALIDATION.md)
- [Dados da validação complementar](scroll-validation.json)

---

## 2. Screenshots e evidências equivalentes

Foram registrados:

- primeira dobra de todas as 170 combinações;
- página completa em 1920, 768 e 390 pixels;
- modal da Galeria em 1440 e 390 pixels;
- nova passagem com rolagem progressiva em 1920, 768 e 390 pixels;
- estado reduzido de movimento;
- geometria do documento, cabeçalho, Dock e Hero;
- HTTP, URL final, erros de console e erros de página;
- foco por teclado, hover, tooltips, filtros e transições de rota;
- auditoria axe-core nas larguras representativas;
- CLS, animações, imagens, loader e `aria-busy`.

### Correções de interpretação importantes

1. **Reveals não estão presos.** Após percorrer toda a página, os 51 casos complementares terminaram com `pendingAfterScroll = 0` e `invisibleAfterScroll = 0`.
2. **O modal da Galeria funciona.** Em 1440 e 390 pixels, o foco entra no botão Fechar, Escape encerra o modal e o foco retorna ao item que o abriu.
3. **Não há overflow horizontal do documento.** O valor medido foi zero em todas as 170 combinações. Elementos ambientais que ultrapassam a viewport são decorativos e ficam recortados pelo layout.
4. **O erro 404 no console é esperado.** Ele ocorre apenas na rota criada deliberadamente para validar a página 404.

---

## 3. Lista de problemas por severidade

### Alto

#### H-01 — Mudança de layout compartilhada entre várias rotas

O CLS ultrapassou 0,10 em grande parte da matriz. O pico foi aproximadamente **0,166 em 768 pixels**, repetido em várias páginas. Também foram medidos valores próximos de 0,157 em 900, 0,150 em 1024, 0,141 em 1280 e 0,136 em desktop amplo.

**Impacto:** a interface muda de posição durante a estabilização, prejudicando a sensação de acabamento e podendo deslocar o alvo de interação. A repetição do mesmo valor em páginas distintas sugere uma origem compartilhada — cabeçalho, hidratação, fonte, shell de rota ou conteúdo comum — mas a causa exata ainda precisa ser isolada por instrumentação.

**Rotas mais afetadas:** Home, Download, Lore, Personagens, Studio, Galeria, Dashboard, Admin e páginas individuais do Devlog. Devlog, Login, Feedback e 404 tiveram estabilidade melhor.

#### H-02 — Estrutura ARIA inválida no seletor de modo do Login

A auditoria axe-core encontrou a regra `aria-required-children`, impacto `critical`, em 1440 e 390 pixels. O contêiner usa `role="tablist"`, mas os botões Entrar e Criar conta não têm `role="tab"`; eles usam apenas `aria-pressed`.

**Impacto:** leitores de tela recebem um padrão de tabs incompleto. Visualmente funciona, mas a semântica assistiva é inválida.

**Correção objetiva:** ou implementar o padrão completo de tabs — `tablist`, `tab`, `tabpanel`, seleção e navegação por setas — ou remover `role="tablist"` e tratar os controles como um grupo de botões alternáveis com nome acessível.

### Médio

#### M-01 — Microtipografia excessivamente pequena

Há concentração recorrente de textos entre **9,6 e 11,5 pixels**, especialmente em badges, coordenadas, índices, metadados, descrições dos filtros da Galeria, labels editoriais e títulos do rodapé.

**Impacto:** reduz legibilidade em telas pequenas e em monitores de baixa densidade, principalmente quando combinado com caixa alta, tracking amplo e contraste suavizado.

**Critério sugerido:** metadados essenciais não menores que 12 pixels; descrições e controles não menores que 14 pixels; exceções apenas para detalhes puramente decorativos.

#### M-02 — Áreas de toque menores que 44×44 pixels

O Dock mantém controles próximos de 44×44 e passa bem. Os casos reais abaixo do alvo são:

- marca do cabeçalho com cerca de 38 pixels de altura no mobile;
- links do rodapé com aproximadamente 36 pixels de altura;
- checkboxes nativos de Feedback/Dashboard com caixa visual de 16×16 pixels.

O link “Pular para conteúdo” medido como 1×1 é deliberadamente oculto antes do foco e não deve ser contado como falha.

#### M-03 — Três animações ambientais contínuas em todas as rotas

O shell mantém três efeitos infinitos: duas névoas/orbes de aproximadamente 28 segundos e uma camada de haze de aproximadamente 20 segundos.

**Impacto:** custo visual e de composição permanente, sobretudo em notebooks modestos e dispositivos móveis. O efeito é sutil e coerente, mas deve ser medido por GPU/compositor antes da conclusão da Fase 4.

**Ponto positivo:** `prefers-reduced-motion` remove corretamente animações longas e infinitas e mantém o conteúdo visível.

#### M-04 — Densidade e repetição em páginas longas ou funcionais

Download, Feedback, Dashboard, Admin, Home, Lore e Studio repetem com frequência o mesmo ritmo de eyebrow + título + linha divisória + bloco. A leitura é correta, mas a diferenciação entre capítulos perde força em páginas longas.

**Impacto:** escaneabilidade menor e sensação de que todas as seções têm importância equivalente.

### Baixo

#### L-01 — Hero muito longo entre tablet e mobile

O Hero mede aproximadamente:

- 720 pixels de altura entre 1024 e 1920;
- 976–997 pixels em 768–900;
- 910 pixels em 640;
- 1031–1037 pixels em 360–430.

Não há corte ou overflow. Título e ações continuam legíveis, mas o mapa e parte da narrativa ficam bem abaixo da primeira dobra em dispositivos menores.

#### L-02 — Página 404 excessivamente vazia em desktop amplo

A página é funcional, responsiva e coerente. Em 1440–1920, porém, a composição central ocupa pouco do campo visual e deixa uma área escura muito extensa. É um problema de presença visual, não de usabilidade.

### Preferência estética

#### P-01 — Ritmo de divisores muito uniforme

Home, Lore, Studio e Dashboard chegam a cinco divisores; Download chega a sete. Preservar a linguagem editorial, mas alternar capítulos por escala, espaço, fundo ou composição evitará monotonia.

#### P-02 — Dock apenas por ícones exige memorização

Todos os nove destinos permanecem visíveis, o estado ativo funciona e os tooltips ficam dentro da viewport no desktop. No mobile, porém, não há hover e a sequência de nove ícones tem carga de reconhecimento maior. Não é necessário remover rotas; a solução pode ser reforço de rótulo no foco/toque, acessibilidade ou agrupamento visual.

#### P-03 — CTAs e estados funcionais poderiam dominar mais a hierarquia

Nas páginas Download, Login, Feedback, Dashboard e Admin, o estado principal e a ação recomendada competem com muitos chips, descrições e cards auxiliares. O refinamento deve aumentar a distinção entre “informação” e “próxima ação”.

---

## 4. Pontos visualmente fortes que devem ser preservados

- direção cinematográfica escura com Bone e Ember, sem aparência genérica de dashboard;
- Home com Hero, mapa abstrato e leitura ambiental própria;
- Roadmap como a composição de timeline mais clara e forte do projeto;
- Lore com sensação de arquivo, mapa e fragmentos;
- Personagens apresentados como dossiês, sem retorno ao padrão de cards genéricos;
- Devlog com estrutura editorial consistente e páginas individuais legíveis;
- Galeria com filtros funcionais, item visual dominante e modal bem resolvido;
- Dock compacto, nove destinos preservados, um único indicador ativo e ampliação restrita a ponteiro fino;
- foco de teclado visível nos controles amostrados;
- ausência de overflow horizontal em toda a matriz;
- `prefers-reduced-motion` funcional;
- transições de rota rápidas, sem loader preso e com `aria-busy="false"` ao final;
- adaptação mobile que preserva hierarquia e conteúdo.

---

## 5. Elementos que precisam ser simplificados

1. quantidade de microtextos, coordenadas e labels concorrendo no mesmo bloco;
2. repetição de linhas divisórias idênticas em páginas longas;
3. quantidade de chips e mini-status nas páginas funcionais;
4. efeitos ambientais globais, caso o profiling confirme custo relevante;
5. textos auxiliares dos filtros da Galeria no mobile, hoje próximos de 9,6 pixels;
6. blocos introdutórios extensos antes da ação principal em Download, Feedback e Login.

A simplificação não deve remover conteúdo nem funcionalidades; deve reorganizar prioridade, escala e agrupamento.

---

## 6. Elementos que precisam de maior destaque

- estado atual da build e ação principal na página Download;
- item atual e próximo marco no Roadmap;
- ação “Enviar feedback” e confirmação de envio na página Feedback;
- estado de autenticação/configuração e CTA principal no Login;
- estado público versus autenticado em Dashboard e Admin;
- filtro ativo e quantidade de itens resultantes na Galeria;
- ponto de progressão principal no Hero mobile, sem depender de o mapa estar na primeira dobra.

---

## 7. Problemas específicos por página

| Página | Diagnóstico visual e funcional | Severidade principal |
|---|---|---|
| Home | Hero e mapa são fortes; first fold fica longo no mobile; labels e índices pequenos; ritmo de capítulos repetitivo; CLS elevado em várias larguras. | Alto / Médio / Baixo |
| Download | Página mais densa, com nove seções e sete divisores; estado da build e CTA devem dominar mais; microtextos recorrentes; CLS. | Alto / Médio |
| Lore | Composição de arquivo e mapa deve ser preservada; excesso de metadados pequenos e divisores; CLS em várias larguras. | Alto / Médio |
| Personagens | Dossiês legíveis e responsivos; metadados e labels pequenos; CLS compartilhado. | Alto / Médio |
| Studio | Texto e manifesto têm identidade, mas precisam de mais variação de ritmo e pontos de escaneamento; CLS. | Alto / Médio |
| Devlog | Lista editorial estável, com CLS baixo; datas e labels podem crescer; preservar a estrutura. | Médio |
| Roadmap | Timeline é um dos pontos mais fortes; destacar ainda mais o estado atual; microtipografia recorrente; CLS em parte da matriz. | Alto / Médio |
| Galeria | Filtros alteram corretamente 6→2→1 itens; modal, Escape e retorno de foco passam; descrições de filtro chegam a 9,6 pixels; CLS. | Alto / Médio |
| Login | Única falha semântica séria confirmada: `tablist` sem filhos `tab`; visual e formulário funcionam; estado de configuração é compreensível. | Alto |
| Feedback | Formulário funcional; densidade vertical no mobile; checkbox pequeno; CTA e resultado precisam de hierarquia mais direta. | Médio |
| Dashboard | Apenas estado público testado; layout responsivo; muitos chips/labels pequenos; CLS compartilhado. | Alto / Médio |
| Admin | Apenas estado público testado; composição funcional densa; muitos metadados; CLS compartilhado. | Alto / Médio |
| Página 404 | Responde 404 corretamente, não quebra layout e tem CTAs claros; desktop amplo fica visualmente vazio. | Baixo / Estética |
| Devlog · Bosque | Artigo responsivo e legível; título quebra naturalmente no mobile; metadados pequenos; CLS compartilhado. | Alto / Médio |
| Devlog · Dash | Mesma base editorial consistente; metadados pequenos; CLS compartilhado. | Alto / Médio |
| Devlog · Lucarelli | Estrutura preservada e responsiva; metadados pequenos; CLS compartilhado. | Alto / Médio |
| Devlog · Demo | Estrutura preservada e responsiva; metadados pequenos; CLS compartilhado. | Alto / Médio |

---

## 8. Problemas específicos do Dock

### Passou

- nove destinos públicos visíveis em todas as larguras;
- nenhum destino removido;
- indicador ativo único;
- controles aproximadamente 44×44;
- tooltips dentro da viewport no teste desktop;
- ampliação condicionada a ponteiro fino e desativada para touch;
- foco visível;
- sem overflow horizontal do documento.

### Refinamentos

- no mobile, o cabeçalho passa de 80 para 116 pixels e o Dock ocupa uma segunda linha;
- nove ícones sem rótulo persistente exigem memorização em touch;
- a marca do cabeçalho tem aproximadamente 38 pixels de altura clicável no mobile;
- revisar a pequena diferença interna entre `scrollWidth` e `clientWidth` em desktop, embora ela não gere overflow de página nem corte visível.

**Classificação:** preferência estética / médio apenas para área de toque da marca.

---

## 9. Problemas específicos do Hero

- não há elementos cortados nem overflow de documento;
- o Hero mantém 720 pixels no desktop e cresce para cerca de 1.000 pixels em tablet/mobile;
- o mapa passa a funcionar como conteúdo de segunda dobra em telas menores;
- o título, subtítulo e CTAs permanecem visíveis e legíveis;
- o refinamento deve reduzir altura ou densidade abaixo de 900 pixels sem eliminar o mapa ou a identidade ambiental.

**Classificação:** baixo.

---

## 10. Problemas específicos do sistema de movimento

### Passou

- `prefers-reduced-motion` remove animações longas/infinita e exibe todos os reveals;
- depois de rolagem real, nenhum reveal ficou pendente ou invisível nos 51 casos complementares;
- modal da Galeria respeita reduced motion por meio de `useReducedMotion`;
- transições de rota verificadas entre aproximadamente 137 e 445 ms;
- nenhum loading visual ficou preso;
- `aria-busy` terminou como `false`;
- nenhum erro de página foi registrado.

### Refinamentos

- três animações ambientais infinitas continuam ativas em toda rota no modo normal;
- o número de elementos com propriedades animadas é alto em páginas densas; isso não prova jank, mas justifica profiling de composição e energia;
- o CLS deve ser isolado antes de adicionar novas animações, para não mascarar movimentação estrutural com movimento intencional.

**Classificação:** médio para custo contínuo; alto para CLS estrutural.

---

## 11. Problemas específicos de responsividade

### Passou

- zero overflow horizontal do documento nas 170 combinações;
- imagens sem quebra;
- títulos principais não são cortados;
- cards, dossiês, timeline, filtros e formulários reorganizam-se para coluna;
- Dock mantém os nove destinos;
- modal funciona em 390 pixels;
- páginas individuais do Devlog continuam legíveis.

### Refinamentos

- cabeçalho mobile de 116 pixels consome uma parcela relevante da primeira dobra;
- Hero chega a cerca de 1.037 pixels;
- microtipografia continua abaixo de 12 pixels em mobile;
- links de rodapé e marca não atingem 44 pixels de altura;
- páginas funcionais ficam longas e densas quando todos os cards se empilham;
- CLS atinge o pico justamente em 768 pixels, largura de transição importante.

---

## 12. Comparação desktop, tablet e mobile

| Faixa | Pontos fortes | Problemas predominantes |
|---|---|---|
| Desktop — 1024 a 1920 | Melhor composição editorial; Hero equilibrado; mapas, timeline e dossiês têm espaço; tooltips funcionam. | CLS compartilhado; microtipografia; excesso de vazio na 404; repetição de divisores. |
| Tablet — 768 a 900 | Conteúdo preservado e sem overflow; reorganização correta para coluna. | Maior CLS da matriz; Hero próximo de 1.000px; transição de ritmo entre layout amplo e empilhado. |
| Mobile — 360 a 640 | Nenhum corte horizontal; ações e formulários continuam utilizáveis; modal e filtros funcionam. | Cabeçalho 116px; Hero muito longo; textos de 9,6–11,5px; marca/rodapé abaixo de 44px; páginas funcionais extensas. |

---

## 13. Critérios objetivos para considerar a Fase 4 concluída

1. CLS abaixo de **0,10 em todas as rotas e larguras**, com meta preferencial abaixo de 0,05 nas páginas estáticas.
2. Zero violações axe-core de impacto `critical` ou `serious` nas rotas públicas e autenticadas.
3. Padrão Entrar/Criar conta com semântica ARIA válida e navegação por teclado coerente.
4. Nenhum texto informativo essencial abaixo de 12 pixels; controles e descrições principais com piso de 14 pixels.
5. Áreas interativas com 44×44 pixels ou área equivalente oferecida pelo label/contêiner clicável.
6. Zero overflow horizontal nas dez larguras.
7. Todos os nove destinos do Dock presentes, focáveis, identificáveis e utilizáveis por mouse, teclado e touch.
8. Tooltips dentro da viewport e nenhuma informação exclusiva de hover.
9. Hero sem corte; título e ação principal compreensíveis na primeira dobra; mapa preservado como elemento secundário no mobile.
10. Nenhum reveal pendente depois de o conteúdo entrar na viewport.
11. `prefers-reduced-motion` sem movimento contínuo, sem transições obrigatórias e sem conteúdo invisível.
12. Transições de rota abaixo de 1,2 segundo, sem loader preso e com `aria-busy=false` ao final.
13. Galeria com filtros funcionais, modal fechando por Escape, foco preso dentro do diálogo e retorno ao gatilho.
14. Dashboard e Admin testados com credenciais controladas nos estados autenticado, sem permissão, admin e falha de sessão.
15. Evidências regeneradas e comparadas com este baseline antes do encerramento da Fase 4.
16. Nenhuma alteração em Supabase, SQL, autenticação, banco ou regra de negócio como efeito colateral do refinamento visual.

---

## Branch, arquivos alterados, testes e limitações

### Branch criada

`agent/fase-4-etapa-1-baseline-visual`

Criada diretamente do commit `7a192260c7945c6c75ab05bba78ebe97f94050e1` da `main`.

### Arquivos alterados — somente auditoria e documentação

- `.github/workflows/fase-4-etapa-1-baseline.yml`
- `.github/workflows/fase-4-scroll-validation.yml`
- `.github/workflows/fase-4-section-capture.yml`
- `scripts/visual-baseline-audit.mjs.gz.b64`
- `scripts/visual-scroll-validation.mjs`
- `scripts/visual-section-capture.mjs`
- `docs/fase-4/etapa-1/AUDIT_METHOD.md`
- `docs/fase-4/etapa-1/README.md`
- `docs/fase-4/etapa-1/baseline.json`
- `docs/fase-4/etapa-1/interactions.json`
- `docs/fase-4/etapa-1/evidence-index.md`
- `docs/fase-4/etapa-1/SCROLL_VALIDATION.md`
- `docs/fase-4/etapa-1/scroll-validation.json`
- `docs/fase-4/etapa-1/evidence/**`
- `docs/fase-4/etapa-1/MANUAL_QA_REVIEW.md`

Nenhum arquivo de aplicação, Supabase, SQL, autenticação, banco ou regra de negócio foi modificado.

### Testes executados

- 170 navegações página × largura;
- 51 navegações complementares com rolagem progressiva;
- screenshots de primeira dobra, full-page e após rolagem;
- geometria e overflow;
- cabeçalho, Dock, Hero, seções e rodapé;
- hover e tooltip do Dock;
- foco de teclado;
- axe-core;
- filtros e modal da Galeria;
- Escape, focus trap e retorno de foco;
- reduced motion;
- route transitions;
- HTTP, URL final, console, page errors e respostas inválidas;
- imagens quebradas, loader, `aria-busy` e CLS.

### Limitações encontradas

1. O URL técnico fornecido estava protegido pela Vercel; o alias público equivalente `bdf-navy.vercel.app`, apontando para o mesmo deployment/commit, foi usado nas execuções.
2. Dashboard e Admin foram testados apenas no estado público/sem sessão. Não foram fornecidas credenciais de usuário e administrador; portanto, painéis autenticados, permissões e estados internos não foram declarados como testados.
3. Captura full-page sem rolagem não ativa todos os `IntersectionObserver`. A limitação foi corrigida por uma segunda execução com rolagem progressiva; esta segunda execução é a fonte de verdade para reveals.
4. CLS foi medido e reproduzido, mas a causa raiz compartilhada ainda não foi isolada.
5. A automação confirma propriedades geométricas e interações, mas decisões de ritmo editorial e destaque permanecem avaliações visuais humanas.

### Ordem recomendada das correções

1. **Isolar e corrigir a origem global do CLS**, começando por 768, 900, 1024 e 1440 pixels.
2. **Corrigir a semântica ARIA do Login** e executar nova auditoria axe-core.
3. **Elevar microtipografia e áreas de toque**, priorizando Galeria, rodapé, marca e checkboxes.
4. **Reorganizar hierarquia das páginas funcionais**, destacando estado e próxima ação sem remover conteúdo.
5. **Variar o ritmo de páginas longas**, reduzindo repetição de divisores e blocos equivalentes.
6. **Medir custo de GPU/composição das animações ambientais** e simplificar apenas onde houver benefício real.
7. **Refinar Hero tablet/mobile e 404 desktop**, mantendo a direção visual atual.
8. **Reexecutar toda a matriz e testar Dashboard/Admin autenticados** antes de considerar a Fase 4 concluída.

---

## Estado final desta etapa

- branch criada: **sim**;
- merge realizado: **não**;
- produção publicada ou alterada: **não**;
- mudanças amplas de UI implementadas: **não**;
- correções na aplicação: **nenhuma**;
- baseline reproduzível: **sim**;
- auditoria principal concluída: **sim**;
- validação complementar concluída: **sim**.
