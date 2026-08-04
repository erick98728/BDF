# FASE 4 · ETAPA 1 — Baseline visual reproduzível

> Auditoria executada em navegador Chromium real no GitHub Actions, sem depender do localhost do usuário, contra `https://bdf-navy.vercel.app`.

## Identificação da execução

- **Branch:** `agent/fase-4-etapa-1-baseline-visual`
- **Commit-base da main:** `7a192260c7945c6c75ab05bba78ebe97f94050e1`
- **Início:** 2026-08-03T16:45:14.008Z
- **Fim:** 2026-08-03T17:01:13.659Z
- **Browser:** Chromium via Playwright
- **Larguras:** 1920px, 1440px, 1280px, 1024px, 900px, 768px, 640px, 430px, 390px, 360px
- **Páginas:** 17
- **Combinações página × resolução:** 170

## Resumo executivo

| Classificação | Quantidade |
|---|---:|
| Crítico | 0 |
| Alto | 184 |
| Médio | 316 |
| Baixo | 249 |
| Preferência estética | 50 |

A legenda da matriz é: ✅ sem problema Alto/Médio detectado; ⚠️ com problema Alto ou Médio; ❌ com problema Crítico; — não executado.

## 1. Matriz de páginas e resoluções testadas

| Página | 1920px | 1440px | 1280px | 1024px | 900px | 768px | 640px | 430px | 390px | 360px |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Download | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Lore | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Personagens | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Studio | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Devlog | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Roadmap | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Galeria | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Login | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Feedback | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Dashboard | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Admin | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Página 404 | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Devlog individual · construindo-o-bosque-da-nevoa-perdida | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Devlog individual · criando-o-sistema-de-dash | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Devlog individual · primeiro-chefe-lucarelli | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Devlog individual · preparando-a-primeira-demo-jogavel | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |

## 2. Screenshots e evidências

Foram salvas capturas da primeira dobra em **todas** as combinações e capturas de página inteira em 1920px, 768px e 390px.

| Página | Desktop 1920 | Tablet 768 | Mobile 390 |
|---|---|---|---|
| Home | [1920px](evidence/fullpage/home-1920.jpg) | [768px](evidence/fullpage/home-768.jpg) | [390px](evidence/fullpage/home-390.jpg) |
| Download | [1920px](evidence/fullpage/download-1920.jpg) | [768px](evidence/fullpage/download-768.jpg) | [390px](evidence/fullpage/download-390.jpg) |
| Lore | [1920px](evidence/fullpage/lore-1920.jpg) | [768px](evidence/fullpage/lore-768.jpg) | [390px](evidence/fullpage/lore-390.jpg) |
| Personagens | [1920px](evidence/fullpage/personagens-1920.jpg) | [768px](evidence/fullpage/personagens-768.jpg) | [390px](evidence/fullpage/personagens-390.jpg) |
| Studio | [1920px](evidence/fullpage/studio-1920.jpg) | [768px](evidence/fullpage/studio-768.jpg) | [390px](evidence/fullpage/studio-390.jpg) |
| Devlog | [1920px](evidence/fullpage/devlog-1920.jpg) | [768px](evidence/fullpage/devlog-768.jpg) | [390px](evidence/fullpage/devlog-390.jpg) |
| Roadmap | [1920px](evidence/fullpage/roadmap-1920.jpg) | [768px](evidence/fullpage/roadmap-768.jpg) | [390px](evidence/fullpage/roadmap-390.jpg) |
| Galeria | [1920px](evidence/fullpage/galeria-1920.jpg) | [768px](evidence/fullpage/galeria-768.jpg) | [390px](evidence/fullpage/galeria-390.jpg) |
| Login | [1920px](evidence/fullpage/login-1920.jpg) | [768px](evidence/fullpage/login-768.jpg) | [390px](evidence/fullpage/login-390.jpg) |
| Feedback | [1920px](evidence/fullpage/feedback-1920.jpg) | [768px](evidence/fullpage/feedback-768.jpg) | [390px](evidence/fullpage/feedback-390.jpg) |
| Dashboard | [1920px](evidence/fullpage/dashboard-1920.jpg) | [768px](evidence/fullpage/dashboard-768.jpg) | [390px](evidence/fullpage/dashboard-390.jpg) |
| Admin | [1920px](evidence/fullpage/admin-1920.jpg) | [768px](evidence/fullpage/admin-768.jpg) | [390px](evidence/fullpage/admin-390.jpg) |
| Página 404 | [1920px](evidence/fullpage/404-1920.jpg) | [768px](evidence/fullpage/404-768.jpg) | [390px](evidence/fullpage/404-390.jpg) |
| Devlog individual · construindo-o-bosque-da-nevoa-perdida | [1920px](evidence/fullpage/devlog-devlog-construindo-o-bosque-da-nevoa-perdida-1920.jpg) | [768px](evidence/fullpage/devlog-devlog-construindo-o-bosque-da-nevoa-perdida-768.jpg) | [390px](evidence/fullpage/devlog-devlog-construindo-o-bosque-da-nevoa-perdida-390.jpg) |
| Devlog individual · criando-o-sistema-de-dash | [1920px](evidence/fullpage/devlog-devlog-criando-o-sistema-de-dash-1920.jpg) | [768px](evidence/fullpage/devlog-devlog-criando-o-sistema-de-dash-768.jpg) | [390px](evidence/fullpage/devlog-devlog-criando-o-sistema-de-dash-390.jpg) |
| Devlog individual · primeiro-chefe-lucarelli | [1920px](evidence/fullpage/devlog-devlog-primeiro-chefe-lucarelli-1920.jpg) | [768px](evidence/fullpage/devlog-devlog-primeiro-chefe-lucarelli-768.jpg) | [390px](evidence/fullpage/devlog-devlog-primeiro-chefe-lucarelli-390.jpg) |
| Devlog individual · preparando-a-primeira-demo-jogavel | [1920px](evidence/fullpage/devlog-devlog-preparando-a-primeira-demo-jogavel-1920.jpg) | [768px](evidence/fullpage/devlog-devlog-preparando-a-primeira-demo-jogavel-768.jpg) | [390px](evidence/fullpage/devlog-devlog-preparando-a-primeira-demo-jogavel-390.jpg) |

- [Dados completos da execução](baseline.json)
- [Índice técnico das evidências](evidence-index.md)
- [Resultados de interações](interactions.json)

## 3. Lista de problemas por severidade

| # | Severidade | Categoria | Página | Resolução | Problema | Evidência |
|---:|---|---|---|---:|---|---|
| 1 | Alto | Estabilidade | Admin | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 2 | Alto | Estabilidade | Admin | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 3 | Alto | Estabilidade | Admin | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 4 | Alto | Estabilidade | Admin | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 5 | Alto | Estabilidade | Admin | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 6 | Alto | Estabilidade | Admin | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 7 | Alto | Estabilidade | Admin | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 8 | Alto | Estabilidade | Admin | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 9 | Alto | Estabilidade | Admin | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 10 | Alto | Estabilidade | Admin | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 11 | Alto | Estabilidade | Dashboard | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 12 | Alto | Estabilidade | Dashboard | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 13 | Alto | Estabilidade | Dashboard | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 14 | Alto | Estabilidade | Dashboard | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 15 | Alto | Estabilidade | Dashboard | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 16 | Alto | Estabilidade | Dashboard | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 17 | Alto | Estabilidade | Dashboard | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 18 | Alto | Estabilidade | Dashboard | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 19 | Alto | Estabilidade | Dashboard | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 20 | Alto | Estabilidade | Dashboard | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 21 | Alto | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 360px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 22 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 23 | Alto | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 390px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 24 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 25 | Alto | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 430px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 26 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 27 | Alto | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 640px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 28 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 29 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 30 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 31 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 32 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 33 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 34 | Alto | Estabilidade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 35 | Alto | Movimento | Devlog individual · criando-o-sistema-de-dash | 360px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 36 | Alto | Movimento | Devlog individual · criando-o-sistema-de-dash | 390px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 37 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 38 | Alto | Movimento | Devlog individual · criando-o-sistema-de-dash | 430px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 39 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 40 | Alto | Movimento | Devlog individual · criando-o-sistema-de-dash | 640px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 41 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 42 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 43 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 44 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 45 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 46 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 47 | Alto | Estabilidade | Devlog individual · criando-o-sistema-de-dash | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 48 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 360px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 49 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 50 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 390px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 51 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 52 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 430px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 53 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 54 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 640px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 55 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 56 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 57 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 58 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1024px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 59 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1280px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 60 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 61 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 62 | Alto | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1920px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 63 | Alto | Estabilidade | Devlog individual · preparando-a-primeira-demo-jogavel | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 64 | Alto | Movimento | Devlog individual · primeiro-chefe-lucarelli | 360px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 65 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 66 | Alto | Movimento | Devlog individual · primeiro-chefe-lucarelli | 390px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 67 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 68 | Alto | Movimento | Devlog individual · primeiro-chefe-lucarelli | 430px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 69 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 70 | Alto | Movimento | Devlog individual · primeiro-chefe-lucarelli | 640px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 71 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 72 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 73 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 74 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 75 | Alto | Estabilidade | Devlog individual · primeiro-chefe-lucarelli | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 76 | Alto | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1440px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 77 | Alto | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1920px | Elementos permanecem invisíveis após a janela de reveal | 5 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 78 | Alto | Movimento | Download | 360px | Elementos permanecem invisíveis após a janela de reveal | 19 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 79 | Alto | Estabilidade | Download | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 80 | Alto | Movimento | Download | 390px | Elementos permanecem invisíveis após a janela de reveal | 18 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 81 | Alto | Estabilidade | Download | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 82 | Alto | Movimento | Download | 430px | Elementos permanecem invisíveis após a janela de reveal | 18 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 83 | Alto | Estabilidade | Download | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 84 | Alto | Movimento | Download | 640px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 85 | Alto | Estabilidade | Download | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 86 | Alto | Movimento | Download | 768px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 87 | Alto | Estabilidade | Download | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 88 | Alto | Movimento | Download | 900px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 89 | Alto | Estabilidade | Download | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 90 | Alto | Movimento | Download | 1024px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 91 | Alto | Estabilidade | Download | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 92 | Alto | Movimento | Download | 1280px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 93 | Alto | Movimento | Download | 1440px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 94 | Alto | Movimento | Download | 1920px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 95 | Alto | Estabilidade | Download | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 96 | Alto | Estabilidade | Galeria | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 97 | Alto | Modal | Galeria | 390px | Modal não fecha com Escape | O diálogo permaneceu visível após a tecla Escape. |
| 98 | Alto | Estabilidade | Galeria | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 99 | Alto | Estabilidade | Galeria | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 100 | Alto | Estabilidade | Galeria | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 101 | Alto | Estabilidade | Galeria | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 102 | Alto | Estabilidade | Galeria | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 103 | Alto | Estabilidade | Galeria | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 104 | Alto | Estabilidade | Galeria | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 105 | Alto | Modal | Galeria | 1440px | Foco não entra no modal ao abrir | O elemento ativo permaneceu fora de [role=dialog]. |
| 106 | Alto | Modal | Galeria | 1440px | Modal não fecha com Escape | O diálogo permaneceu visível após a tecla Escape. |
| 107 | Alto | Estabilidade | Galeria | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.131. |
| 108 | Alto | Estabilidade | Home | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 109 | Alto | Estabilidade | Home | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 110 | Alto | Movimento | Home | 900px | Elementos permanecem invisíveis após a janela de reveal | 25 elemento(s), exemplo: div.editorial-overview. |
| 111 | Alto | Movimento | Home | 1024px | Elementos permanecem invisíveis após a janela de reveal | 23 elemento(s), exemplo: article.editorial-pillar. |
| 112 | Alto | Estabilidade | Home | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 113 | Alto | Estabilidade | Home | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 114 | Alto | Movimento | Home | 1920px | Elementos permanecem invisíveis após a janela de reveal | 23 elemento(s), exemplo: article.editorial-pillar. |
| 115 | Alto | Acessibilidade | Login | 390px | Violações WCAG sérias | aria-required-children (1) |
| 116 | Alto | Acessibilidade | Login | 1440px | Violações WCAG sérias | aria-required-children (1) |
| 117 | Alto | Movimento | Lore | 360px | Elementos permanecem invisíveis após a janela de reveal | 33 elemento(s), exemplo: article.lore-pillar. |
| 118 | Alto | Estabilidade | Lore | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 119 | Alto | Movimento | Lore | 390px | Elementos permanecem invisíveis após a janela de reveal | 32 elemento(s), exemplo: article.lore-pillar. |
| 120 | Alto | Movimento | Lore | 430px | Elementos permanecem invisíveis após a janela de reveal | 32 elemento(s), exemplo: article.lore-pillar. |
| 121 | Alto | Estabilidade | Lore | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 122 | Alto | Movimento | Lore | 640px | Elementos permanecem invisíveis após a janela de reveal | 31 elemento(s), exemplo: article.lore-pillar. |
| 123 | Alto | Estabilidade | Lore | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 124 | Alto | Estabilidade | Lore | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 125 | Alto | Movimento | Lore | 900px | Elementos permanecem invisíveis após a janela de reveal | 30 elemento(s), exemplo: aside.lore-note. |
| 126 | Alto | Estabilidade | Lore | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 127 | Alto | Movimento | Lore | 1024px | Elementos permanecem invisíveis após a janela de reveal | 30 elemento(s), exemplo: article.lore-pillar. |
| 128 | Alto | Movimento | Lore | 1280px | Elementos permanecem invisíveis após a janela de reveal | 30 elemento(s), exemplo: article.lore-pillar. |
| 129 | Alto | Estabilidade | Lore | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 130 | Alto | Movimento | Lore | 1440px | Elementos permanecem invisíveis após a janela de reveal | 30 elemento(s), exemplo: article.lore-pillar. |
| 131 | Alto | Estabilidade | Lore | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 132 | Alto | Movimento | Personagens | 360px | Elementos permanecem invisíveis após a janela de reveal | 9 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 133 | Alto | Estabilidade | Personagens | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 134 | Alto | Movimento | Personagens | 390px | Elementos permanecem invisíveis após a janela de reveal | 9 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 135 | Alto | Estabilidade | Personagens | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 136 | Alto | Movimento | Personagens | 430px | Elementos permanecem invisíveis após a janela de reveal | 9 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 137 | Alto | Estabilidade | Personagens | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 138 | Alto | Movimento | Personagens | 640px | Elementos permanecem invisíveis após a janela de reveal | 9 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 139 | Alto | Estabilidade | Personagens | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 140 | Alto | Movimento | Personagens | 768px | Elementos permanecem invisíveis após a janela de reveal | 6 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 141 | Alto | Estabilidade | Personagens | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 142 | Alto | Movimento | Personagens | 900px | Elementos permanecem invisíveis após a janela de reveal | 6 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 143 | Alto | Estabilidade | Personagens | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 144 | Alto | Movimento | Personagens | 1024px | Elementos permanecem invisíveis após a janela de reveal | 6 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 145 | Alto | Estabilidade | Personagens | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 146 | Alto | Movimento | Personagens | 1280px | Elementos permanecem invisíveis após a janela de reveal | 6 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 147 | Alto | Estabilidade | Personagens | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 148 | Alto | Movimento | Personagens | 1440px | Elementos permanecem invisíveis após a janela de reveal | 6 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 149 | Alto | Estabilidade | Personagens | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 150 | Alto | Movimento | Personagens | 1920px | Elementos permanecem invisíveis após a janela de reveal | 8 elemento(s), exemplo: article.character-dossier.character-dossier--featured. |
| 151 | Alto | Estabilidade | Personagens | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 152 | Alto | Movimento | Roadmap | 360px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.roadmap-heading. |
| 153 | Alto | Estabilidade | Roadmap | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 154 | Alto | Movimento | Roadmap | 390px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.roadmap-heading. |
| 155 | Alto | Estabilidade | Roadmap | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 156 | Alto | Movimento | Roadmap | 430px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.roadmap-heading. |
| 157 | Alto | Movimento | Roadmap | 640px | Elementos permanecem invisíveis após a janela de reveal | 17 elemento(s), exemplo: div.roadmap-heading. |
| 158 | Alto | Estabilidade | Roadmap | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 159 | Alto | Movimento | Roadmap | 768px | Elementos permanecem invisíveis após a janela de reveal | 15 elemento(s), exemplo: li.roadmap-record. |
| 160 | Alto | Estabilidade | Roadmap | 768px | Mudança de layout acima do recomendado | CLS observado: 0.145. |
| 161 | Alto | Movimento | Roadmap | 900px | Elementos permanecem invisíveis após a janela de reveal | 15 elemento(s), exemplo: li.roadmap-record. |
| 162 | Alto | Estabilidade | Roadmap | 900px | Mudança de layout acima do recomendado | CLS observado: 0.142. |
| 163 | Alto | Movimento | Roadmap | 1024px | Elementos permanecem invisíveis após a janela de reveal | 15 elemento(s), exemplo: li.roadmap-record. |
| 164 | Alto | Estabilidade | Roadmap | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.147. |
| 165 | Alto | Estabilidade | Roadmap | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.117. |
| 166 | Alto | Estabilidade | Roadmap | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.106. |
| 167 | Alto | Movimento | Roadmap | 1920px | Elementos permanecem invisíveis após a janela de reveal | 16 elemento(s), exemplo: div.roadmap-phase__content. |
| 168 | Alto | Estabilidade | Studio | 360px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 169 | Alto | Movimento | Studio | 390px | Elementos permanecem invisíveis após a janela de reveal | 21 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 170 | Alto | Estabilidade | Studio | 390px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 171 | Alto | Movimento | Studio | 430px | Elementos permanecem invisíveis após a janela de reveal | 21 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 172 | Alto | Estabilidade | Studio | 430px | Mudança de layout acima do recomendado | CLS observado: 0.105. |
| 173 | Alto | Movimento | Studio | 640px | Elementos permanecem invisíveis após a janela de reveal | 21 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 174 | Alto | Estabilidade | Studio | 640px | Mudança de layout acima do recomendado | CLS observado: 0.103. |
| 175 | Alto | Movimento | Studio | 768px | Elementos permanecem invisíveis após a janela de reveal | 19 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 176 | Alto | Estabilidade | Studio | 768px | Mudança de layout acima do recomendado | CLS observado: 0.166. |
| 177 | Alto | Movimento | Studio | 900px | Elementos permanecem invisíveis após a janela de reveal | 19 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 178 | Alto | Estabilidade | Studio | 900px | Mudança de layout acima do recomendado | CLS observado: 0.157. |
| 179 | Alto | Movimento | Studio | 1024px | Elementos permanecem invisíveis após a janela de reveal | 20 elemento(s), exemplo: article.studio-manifesto.studio-manifesto--secondary. |
| 180 | Alto | Estabilidade | Studio | 1024px | Mudança de layout acima do recomendado | CLS observado: 0.150. |
| 181 | Alto | Movimento | Studio | 1280px | Elementos permanecem invisíveis após a janela de reveal | 20 elemento(s), exemplo: article.studio-manifesto.studio-manifesto--secondary. |
| 182 | Alto | Estabilidade | Studio | 1280px | Mudança de layout acima do recomendado | CLS observado: 0.141. |
| 183 | Alto | Estabilidade | Studio | 1440px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 184 | Alto | Estabilidade | Studio | 1920px | Mudança de layout acima do recomendado | CLS observado: 0.136. |
| 185 | Médio | Tipografia | Admin | 360px | Concentração de textos pequenos | 29 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 186 | Médio | Touch | Admin | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 187 | Médio | Movimento | Admin | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 188 | Médio | Tipografia | Admin | 390px | Concentração de textos pequenos | 29 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 189 | Médio | Touch | Admin | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 190 | Médio | Movimento | Admin | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 191 | Médio | Tipografia | Admin | 430px | Concentração de textos pequenos | 29 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 192 | Médio | Touch | Admin | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 193 | Médio | Movimento | Admin | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 194 | Médio | Movimento | Admin | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 195 | Médio | Movimento | Admin | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 196 | Médio | Movimento | Admin | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 197 | Médio | Movimento | Admin | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 198 | Médio | Movimento | Admin | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 199 | Médio | Movimento | Admin | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 200 | Médio | Movimento | Admin | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 201 | Médio | Tipografia | Dashboard | 360px | Concentração de textos pequenos | 27 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 202 | Médio | Touch | Dashboard | 360px | Múltiplos alvos de toque abaixo de 44×44px | 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 203 | Médio | Movimento | Dashboard | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 204 | Médio | Tipografia | Dashboard | 390px | Concentração de textos pequenos | 27 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 205 | Médio | Touch | Dashboard | 390px | Múltiplos alvos de toque abaixo de 44×44px | 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 206 | Médio | Movimento | Dashboard | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 207 | Médio | Tipografia | Dashboard | 430px | Concentração de textos pequenos | 27 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 208 | Médio | Touch | Dashboard | 430px | Múltiplos alvos de toque abaixo de 44×44px | 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 209 | Médio | Movimento | Dashboard | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 210 | Médio | Movimento | Dashboard | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 211 | Médio | Movimento | Dashboard | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 212 | Médio | Movimento | Dashboard | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 213 | Médio | Movimento | Dashboard | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 214 | Médio | Movimento | Dashboard | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 215 | Médio | Movimento | Dashboard | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 216 | Médio | Movimento | Dashboard | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 217 | Médio | Movimento | Devlog | 360px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: li. |
| 218 | Médio | Tipografia | Devlog | 360px | Concentração de textos pequenos | 29 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 219 | Médio | Touch | Devlog | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 220 | Médio | Movimento | Devlog | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 221 | Médio | Movimento | Devlog | 390px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: li. |
| 222 | Médio | Tipografia | Devlog | 390px | Concentração de textos pequenos | 29 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 223 | Médio | Touch | Devlog | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 224 | Médio | Movimento | Devlog | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 225 | Médio | Movimento | Devlog | 430px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: li. |
| 226 | Médio | Tipografia | Devlog | 430px | Concentração de textos pequenos | 29 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 227 | Médio | Touch | Devlog | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 228 | Médio | Movimento | Devlog | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 229 | Médio | Movimento | Devlog | 640px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: li. |
| 230 | Médio | Movimento | Devlog | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 231 | Médio | Movimento | Devlog | 768px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: li. |
| 232 | Médio | Movimento | Devlog | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 233 | Médio | Movimento | Devlog | 900px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: li. |
| 234 | Médio | Movimento | Devlog | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 235 | Médio | Movimento | Devlog | 1024px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: li. |
| 236 | Médio | Movimento | Devlog | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 237 | Médio | Movimento | Devlog | 1280px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: li. |
| 238 | Médio | Movimento | Devlog | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 239 | Médio | Movimento | Devlog | 1440px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: li. |
| 240 | Médio | Movimento | Devlog | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 241 | Médio | Movimento | Devlog | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 242 | Médio | Tipografia | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 360px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 243 | Médio | Touch | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 244 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 245 | Médio | Tipografia | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 390px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 246 | Médio | Touch | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 247 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 248 | Médio | Tipografia | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 430px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 249 | Médio | Touch | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 250 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 251 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 252 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 768px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 253 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 254 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 900px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 255 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 256 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 257 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 258 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 259 | Médio | Movimento | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 260 | Médio | Tipografia | Devlog individual · criando-o-sistema-de-dash | 360px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 261 | Médio | Touch | Devlog individual · criando-o-sistema-de-dash | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 262 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 263 | Médio | Tipografia | Devlog individual · criando-o-sistema-de-dash | 390px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 264 | Médio | Touch | Devlog individual · criando-o-sistema-de-dash | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 265 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 266 | Médio | Tipografia | Devlog individual · criando-o-sistema-de-dash | 430px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 267 | Médio | Touch | Devlog individual · criando-o-sistema-de-dash | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 268 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 269 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 270 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 768px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 271 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 272 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 900px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 273 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 274 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 1024px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 275 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 276 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 277 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 278 | Médio | Movimento | Devlog individual · criando-o-sistema-de-dash | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 279 | Médio | Tipografia | Devlog individual · preparando-a-primeira-demo-jogavel | 360px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 280 | Médio | Touch | Devlog individual · preparando-a-primeira-demo-jogavel | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 281 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 282 | Médio | Tipografia | Devlog individual · preparando-a-primeira-demo-jogavel | 390px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 283 | Médio | Touch | Devlog individual · preparando-a-primeira-demo-jogavel | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 284 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 285 | Médio | Tipografia | Devlog individual · preparando-a-primeira-demo-jogavel | 430px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 286 | Médio | Touch | Devlog individual · preparando-a-primeira-demo-jogavel | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 287 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 288 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 289 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 768px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 290 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 291 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 900px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 292 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 293 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 294 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 295 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 296 | Médio | Movimento | Devlog individual · preparando-a-primeira-demo-jogavel | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 297 | Médio | Tipografia | Devlog individual · primeiro-chefe-lucarelli | 360px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 298 | Médio | Touch | Devlog individual · primeiro-chefe-lucarelli | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 299 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 300 | Médio | Tipografia | Devlog individual · primeiro-chefe-lucarelli | 390px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 301 | Médio | Touch | Devlog individual · primeiro-chefe-lucarelli | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 302 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 303 | Médio | Tipografia | Devlog individual · primeiro-chefe-lucarelli | 430px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 304 | Médio | Touch | Devlog individual · primeiro-chefe-lucarelli | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 305 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 306 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 307 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 768px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 308 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 309 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 900px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 310 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 311 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1024px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 312 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 313 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1280px | Elementos permanecem invisíveis após a janela de reveal | 4 elemento(s), exemplo: div.fx-card.tester-card.h-full. |
| 314 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 315 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 316 | Médio | Movimento | Devlog individual · primeiro-chefe-lucarelli | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 317 | Médio | Tipografia | Download | 360px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 318 | Médio | Touch | Download | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 319 | Médio | Movimento | Download | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 320 | Médio | Tipografia | Download | 390px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 321 | Médio | Touch | Download | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 322 | Médio | Movimento | Download | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 323 | Médio | Tipografia | Download | 430px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 324 | Médio | Touch | Download | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 325 | Médio | Movimento | Download | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 326 | Médio | Movimento | Download | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 327 | Médio | Movimento | Download | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 328 | Médio | Movimento | Download | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 329 | Médio | Movimento | Download | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 330 | Médio | Movimento | Download | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 331 | Médio | Movimento | Download | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 332 | Médio | Movimento | Download | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 333 | Médio | Movimento | Feedback | 360px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 334 | Médio | Tipografia | Feedback | 360px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 335 | Médio | Touch | Feedback | 360px | Múltiplos alvos de toque abaixo de 44×44px | 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 336 | Médio | Movimento | Feedback | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 337 | Médio | Movimento | Feedback | 390px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 338 | Médio | Tipografia | Feedback | 390px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 339 | Médio | Touch | Feedback | 390px | Múltiplos alvos de toque abaixo de 44×44px | 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 340 | Médio | Movimento | Feedback | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 341 | Médio | Tipografia | Feedback | 430px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 342 | Médio | Touch | Feedback | 430px | Múltiplos alvos de toque abaixo de 44×44px | 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 343 | Médio | Movimento | Feedback | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 344 | Médio | Movimento | Feedback | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 345 | Médio | Movimento | Feedback | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 346 | Médio | Movimento | Feedback | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 347 | Médio | Movimento | Feedback | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 348 | Médio | Movimento | Feedback | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 349 | Médio | Movimento | Feedback | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 350 | Médio | Movimento | Feedback | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 351 | Médio | Movimento | Galeria | 360px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 352 | Médio | Tipografia | Galeria | 360px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 353 | Médio | Touch | Galeria | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 354 | Médio | Movimento | Galeria | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 355 | Médio | Movimento | Galeria | 390px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 356 | Médio | Tipografia | Galeria | 390px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 357 | Médio | Touch | Galeria | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 358 | Médio | Movimento | Galeria | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 359 | Médio | Modal | Galeria | 390px | Foco não retorna ao item após fechar o modal | O foco não voltou ao acionador original. |
| 360 | Médio | Movimento | Galeria | 430px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 361 | Médio | Tipografia | Galeria | 430px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 362 | Médio | Touch | Galeria | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 363 | Médio | Movimento | Galeria | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 364 | Médio | Movimento | Galeria | 640px | Elementos permanecem invisíveis após a janela de reveal | 2 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 365 | Médio | Movimento | Galeria | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 366 | Médio | Movimento | Galeria | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 367 | Médio | Movimento | Galeria | 900px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 368 | Médio | Movimento | Galeria | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 369 | Médio | Movimento | Galeria | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 370 | Médio | Movimento | Galeria | 1280px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 371 | Médio | Movimento | Galeria | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 372 | Médio | Movimento | Galeria | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 373 | Médio | Modal | Galeria | 1440px | Foco não retorna ao item após fechar o modal | O foco não voltou ao acionador original. |
| 374 | Médio | Movimento | Galeria | 1920px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 375 | Médio | Movimento | Galeria | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 376 | Médio | Tipografia | Home | 360px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 377 | Médio | Touch | Home | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 378 | Médio | Movimento | Home | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 379 | Médio | Tipografia | Home | 390px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 380 | Médio | Touch | Home | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 381 | Médio | Movimento | Home | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 382 | Médio | Tipografia | Home | 430px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 383 | Médio | Touch | Home | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 384 | Médio | Movimento | Home | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 385 | Médio | Movimento | Home | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 386 | Médio | Movimento | Home | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 387 | Médio | Movimento | Home | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 388 | Médio | Movimento | Home | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 389 | Médio | Movimento | Home | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 390 | Médio | Movimento | Home | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 391 | Médio | Movimento | Home | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 392 | Médio | Movimento | Login | 360px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 393 | Médio | Tipografia | Login | 360px | Concentração de textos pequenos | 13 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 394 | Médio | Touch | Login | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 395 | Médio | Movimento | Login | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 396 | Médio | Movimento | Login | 390px | Elementos permanecem invisíveis após a janela de reveal | 1 elemento(s), exemplo: div.section-heading.fx-reveal-title. |
| 397 | Médio | Tipografia | Login | 390px | Concentração de textos pequenos | 13 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 398 | Médio | Touch | Login | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 399 | Médio | Movimento | Login | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 400 | Médio | Tipografia | Login | 430px | Concentração de textos pequenos | 13 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 401 | Médio | Touch | Login | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 402 | Médio | Movimento | Login | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 403 | Médio | Movimento | Login | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 404 | Médio | Movimento | Login | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 405 | Médio | Movimento | Login | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 406 | Médio | Movimento | Login | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 407 | Médio | Movimento | Login | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 408 | Médio | Movimento | Login | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 409 | Médio | Movimento | Login | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 410 | Médio | Tipografia | Lore | 360px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 411 | Médio | Touch | Lore | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 412 | Médio | Movimento | Lore | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 413 | Médio | Tipografia | Lore | 390px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 414 | Médio | Touch | Lore | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 415 | Médio | Movimento | Lore | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 416 | Médio | Tipografia | Lore | 430px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 417 | Médio | Touch | Lore | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 418 | Médio | Movimento | Lore | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 419 | Médio | Movimento | Lore | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 420 | Médio | Movimento | Lore | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 421 | Médio | Movimento | Lore | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 422 | Médio | Movimento | Lore | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 423 | Médio | Movimento | Lore | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 424 | Médio | Movimento | Lore | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 425 | Médio | Movimento | Lore | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 426 | Médio | Tipografia | Página 404 | 360px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 12px. |
| 427 | Médio | Touch | Página 404 | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 428 | Médio | Movimento | Página 404 | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 429 | Médio | Runtime | Página 404 | 360px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 430 | Médio | Tipografia | Página 404 | 390px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 12px. |
| 431 | Médio | Touch | Página 404 | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 432 | Médio | Movimento | Página 404 | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 433 | Médio | Runtime | Página 404 | 390px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 434 | Médio | Tipografia | Página 404 | 430px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 12px. |
| 435 | Médio | Touch | Página 404 | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 436 | Médio | Movimento | Página 404 | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 437 | Médio | Runtime | Página 404 | 430px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 438 | Médio | Movimento | Página 404 | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 439 | Médio | Runtime | Página 404 | 640px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 440 | Médio | Movimento | Página 404 | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 441 | Médio | Runtime | Página 404 | 768px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 442 | Médio | Movimento | Página 404 | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 443 | Médio | Runtime | Página 404 | 900px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 444 | Médio | Movimento | Página 404 | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 445 | Médio | Runtime | Página 404 | 1024px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 446 | Médio | Movimento | Página 404 | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 447 | Médio | Runtime | Página 404 | 1280px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 448 | Médio | Movimento | Página 404 | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 449 | Médio | Runtime | Página 404 | 1440px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 450 | Médio | Movimento | Página 404 | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 451 | Médio | Runtime | Página 404 | 1920px | Erros no console durante a renderização | Failed to load resource: the server responded with a status of 404 () |
| 452 | Médio | Tipografia | Personagens | 360px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 453 | Médio | Touch | Personagens | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 454 | Médio | Movimento | Personagens | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 455 | Médio | Tipografia | Personagens | 390px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 456 | Médio | Touch | Personagens | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 457 | Médio | Movimento | Personagens | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 458 | Médio | Tipografia | Personagens | 430px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 459 | Médio | Touch | Personagens | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 460 | Médio | Movimento | Personagens | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 461 | Médio | Movimento | Personagens | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 462 | Médio | Movimento | Personagens | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 463 | Médio | Movimento | Personagens | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 464 | Médio | Movimento | Personagens | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 465 | Médio | Movimento | Personagens | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 466 | Médio | Movimento | Personagens | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 467 | Médio | Movimento | Personagens | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 468 | Médio | Tipografia | Roadmap | 360px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 469 | Médio | Touch | Roadmap | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 470 | Médio | Movimento | Roadmap | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 471 | Médio | Tipografia | Roadmap | 390px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 472 | Médio | Touch | Roadmap | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 473 | Médio | Movimento | Roadmap | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 474 | Médio | Tipografia | Roadmap | 430px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 475 | Médio | Touch | Roadmap | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 476 | Médio | Movimento | Roadmap | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 477 | Médio | Movimento | Roadmap | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 478 | Médio | Movimento | Roadmap | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 479 | Médio | Movimento | Roadmap | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 480 | Médio | Movimento | Roadmap | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 481 | Médio | Movimento | Roadmap | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 482 | Médio | Movimento | Roadmap | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 483 | Médio | Estabilidade | Roadmap | 1920px | Mudança de layout perceptível | CLS observado: 0.082. |
| 484 | Médio | Movimento | Roadmap | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 485 | Médio | Tipografia | Studio | 360px | Concentração de textos pequenos | 27 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 486 | Médio | Touch | Studio | 360px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 487 | Médio | Movimento | Studio | 360px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 488 | Médio | Tipografia | Studio | 390px | Concentração de textos pequenos | 27 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 489 | Médio | Touch | Studio | 390px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 490 | Médio | Movimento | Studio | 390px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 491 | Médio | Tipografia | Studio | 430px | Concentração de textos pequenos | 27 elemento(s) abaixo do limiar; menor exemplo 11.5px. |
| 492 | Médio | Touch | Studio | 430px | Múltiplos alvos de toque abaixo de 44×44px | 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px). |
| 493 | Médio | Movimento | Studio | 430px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 494 | Médio | Movimento | Studio | 640px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 495 | Médio | Movimento | Studio | 768px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 496 | Médio | Movimento | Studio | 900px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 497 | Médio | Movimento | Studio | 1024px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 498 | Médio | Movimento | Studio | 1280px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 499 | Médio | Movimento | Studio | 1440px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 500 | Médio | Movimento | Studio | 1920px | Animações ou transições prolongadas | 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms). |
| 501 | Baixo | Responsividade | Admin | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 502 | Baixo | Responsividade | Admin | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 503 | Baixo | Responsividade | Admin | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 504 | Baixo | Responsividade | Admin | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 505 | Baixo | Tipografia | Admin | 640px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 506 | Baixo | Responsividade | Admin | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 507 | Baixo | Tipografia | Admin | 768px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 508 | Baixo | Responsividade | Admin | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 509 | Baixo | Tipografia | Admin | 900px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 510 | Baixo | Responsividade | Admin | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 511 | Baixo | Tipografia | Admin | 1024px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 512 | Baixo | Responsividade | Admin | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 513 | Baixo | Tipografia | Admin | 1280px | Concentração de textos pequenos | 11 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 514 | Baixo | Responsividade | Admin | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 515 | Baixo | Tipografia | Admin | 1440px | Concentração de textos pequenos | 12 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 516 | Baixo | Responsividade | Admin | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 517 | Baixo | Tipografia | Admin | 1920px | Concentração de textos pequenos | 12 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 518 | Baixo | Responsividade | Dashboard | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 519 | Baixo | Responsividade | Dashboard | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 520 | Baixo | Responsividade | Dashboard | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 521 | Baixo | Responsividade | Dashboard | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 522 | Baixo | Tipografia | Dashboard | 640px | Concentração de textos pequenos | 7 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 523 | Baixo | Responsividade | Dashboard | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 524 | Baixo | Tipografia | Dashboard | 768px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 525 | Baixo | Responsividade | Dashboard | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 526 | Baixo | Tipografia | Dashboard | 900px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 527 | Baixo | Responsividade | Dashboard | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 528 | Baixo | Tipografia | Dashboard | 1024px | Concentração de textos pequenos | 7 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 529 | Baixo | Responsividade | Dashboard | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 530 | Baixo | Tipografia | Dashboard | 1280px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 531 | Baixo | Responsividade | Dashboard | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 532 | Baixo | Tipografia | Dashboard | 1440px | Concentração de textos pequenos | 8 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 533 | Baixo | Responsividade | Dashboard | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 534 | Baixo | Tipografia | Dashboard | 1920px | Concentração de textos pequenos | 9 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 535 | Baixo | Responsividade | Devlog | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 536 | Baixo | Responsividade | Devlog | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 537 | Baixo | Responsividade | Devlog | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 538 | Baixo | Responsividade | Devlog | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 539 | Baixo | Tipografia | Devlog | 640px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 10.4px. |
| 540 | Baixo | Responsividade | Devlog | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 541 | Baixo | Tipografia | Devlog | 768px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 542 | Baixo | Responsividade | Devlog | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 543 | Baixo | Tipografia | Devlog | 900px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 544 | Baixo | Responsividade | Devlog | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 545 | Baixo | Tipografia | Devlog | 1024px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 546 | Baixo | Responsividade | Devlog | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 547 | Baixo | Tipografia | Devlog | 1280px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 10.4px. |
| 548 | Baixo | Responsividade | Devlog | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 549 | Baixo | Tipografia | Devlog | 1440px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 550 | Baixo | Responsividade | Devlog | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 551 | Baixo | Tipografia | Devlog | 1920px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 552 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 553 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 554 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 555 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 556 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 557 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 558 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 559 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 560 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 561 | Baixo | Responsividade | Devlog individual · construindo-o-bosque-da-nevoa-perdida | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 562 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 563 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 564 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 565 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 566 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 567 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 568 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 569 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 570 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 571 | Baixo | Responsividade | Devlog individual · criando-o-sistema-de-dash | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 572 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 573 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 574 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 575 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 576 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 577 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 578 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 579 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 580 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 581 | Baixo | Responsividade | Devlog individual · preparando-a-primeira-demo-jogavel | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 582 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 583 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 584 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 585 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 586 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 587 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 588 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 589 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 590 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 591 | Baixo | Responsividade | Devlog individual · primeiro-chefe-lucarelli | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 592 | Baixo | Responsividade | Download | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 593 | Baixo | Responsividade | Download | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 594 | Baixo | Responsividade | Download | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 595 | Baixo | Responsividade | Download | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 596 | Baixo | Tipografia | Download | 640px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 597 | Baixo | Responsividade | Download | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 598 | Baixo | Tipografia | Download | 768px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 599 | Baixo | Responsividade | Download | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 600 | Baixo | Tipografia | Download | 900px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 601 | Baixo | Responsividade | Download | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 602 | Baixo | Tipografia | Download | 1024px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 603 | Baixo | Responsividade | Download | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 604 | Baixo | Tipografia | Download | 1280px | Concentração de textos pequenos | 17 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 605 | Baixo | Responsividade | Download | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 606 | Baixo | Tipografia | Download | 1440px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 607 | Baixo | Responsividade | Download | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 608 | Baixo | Tipografia | Download | 1920px | Concentração de textos pequenos | 18 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 609 | Baixo | Responsividade | Feedback | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 610 | Baixo | Responsividade | Feedback | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 611 | Baixo | Responsividade | Feedback | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 612 | Baixo | Responsividade | Feedback | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 613 | Baixo | Tipografia | Feedback | 640px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 614 | Baixo | Responsividade | Feedback | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 615 | Baixo | Tipografia | Feedback | 768px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 616 | Baixo | Responsividade | Feedback | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 617 | Baixo | Tipografia | Feedback | 900px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 618 | Baixo | Responsividade | Feedback | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 619 | Baixo | Tipografia | Feedback | 1024px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 620 | Baixo | Responsividade | Feedback | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 621 | Baixo | Tipografia | Feedback | 1280px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 622 | Baixo | Responsividade | Feedback | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 623 | Baixo | Tipografia | Feedback | 1440px | Concentração de textos pequenos | 5 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 624 | Baixo | Responsividade | Feedback | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 625 | Baixo | Tipografia | Feedback | 1920px | Concentração de textos pequenos | 5 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 626 | Baixo | Responsividade | Galeria | 360px | Elementos parcialmente fora da viewport | 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 627 | Baixo | Responsividade | Galeria | 390px | Elementos parcialmente fora da viewport | 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 628 | Baixo | Responsividade | Galeria | 430px | Elementos parcialmente fora da viewport | 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 629 | Baixo | Responsividade | Galeria | 640px | Elementos parcialmente fora da viewport | 28 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 630 | Baixo | Tipografia | Galeria | 640px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 631 | Baixo | Responsividade | Galeria | 768px | Elementos parcialmente fora da viewport | 24 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 632 | Baixo | Tipografia | Galeria | 768px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 633 | Baixo | Responsividade | Galeria | 900px | Elementos parcialmente fora da viewport | 15 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 634 | Baixo | Tipografia | Galeria | 900px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 635 | Baixo | Responsividade | Galeria | 1024px | Elementos parcialmente fora da viewport | 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 636 | Baixo | Tipografia | Galeria | 1024px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 637 | Baixo | Responsividade | Galeria | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 638 | Baixo | Tipografia | Galeria | 1280px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 639 | Baixo | Responsividade | Galeria | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 640 | Baixo | Tipografia | Galeria | 1440px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 641 | Baixo | Responsividade | Galeria | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 642 | Baixo | Tipografia | Galeria | 1920px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 643 | Baixo | Responsividade | Home | 360px | Elementos parcialmente fora da viewport | 23 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 644 | Baixo | Responsividade | Home | 390px | Elementos parcialmente fora da viewport | 19 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 645 | Baixo | Responsividade | Home | 430px | Elementos parcialmente fora da viewport | 14 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 646 | Baixo | Responsividade | Home | 640px | Elementos parcialmente fora da viewport | 9 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 647 | Baixo | Tipografia | Home | 640px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 648 | Baixo | Responsividade | Home | 768px | Elementos parcialmente fora da viewport | 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 649 | Baixo | Tipografia | Home | 768px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 650 | Baixo | Responsividade | Home | 900px | Elementos parcialmente fora da viewport | 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 651 | Baixo | Tipografia | Home | 900px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 652 | Baixo | Responsividade | Home | 1024px | Elementos parcialmente fora da viewport | 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 653 | Baixo | Tipografia | Home | 1024px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 654 | Baixo | Responsividade | Home | 1280px | Elementos parcialmente fora da viewport | 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 655 | Baixo | Tipografia | Home | 1280px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 656 | Baixo | Responsividade | Home | 1440px | Elementos parcialmente fora da viewport | 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 657 | Baixo | Tipografia | Home | 1440px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 658 | Baixo | Responsividade | Home | 1920px | Elementos parcialmente fora da viewport | 6 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 659 | Baixo | Tipografia | Home | 1920px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 660 | Baixo | Responsividade | Login | 360px | Elementos parcialmente fora da viewport | 22 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 661 | Baixo | Responsividade | Login | 390px | Elementos parcialmente fora da viewport | 18 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 662 | Baixo | Responsividade | Login | 430px | Elementos parcialmente fora da viewport | 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 663 | Baixo | Responsividade | Login | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 664 | Baixo | Responsividade | Login | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 665 | Baixo | Responsividade | Login | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 666 | Baixo | Responsividade | Login | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 667 | Baixo | Responsividade | Login | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 668 | Baixo | Responsividade | Login | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 669 | Baixo | Tipografia | Login | 1440px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 670 | Baixo | Responsividade | Login | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 671 | Baixo | Tipografia | Login | 1920px | Concentração de textos pequenos | 4 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 672 | Baixo | Responsividade | Lore | 360px | Elementos parcialmente fora da viewport | 22 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 673 | Baixo | Responsividade | Lore | 390px | Elementos parcialmente fora da viewport | 18 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 674 | Baixo | Responsividade | Lore | 430px | Elementos parcialmente fora da viewport | 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 675 | Baixo | Responsividade | Lore | 640px | Elementos parcialmente fora da viewport | 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 676 | Baixo | Tipografia | Lore | 640px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 677 | Baixo | Responsividade | Lore | 768px | Elementos parcialmente fora da viewport | 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 678 | Baixo | Tipografia | Lore | 768px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 679 | Baixo | Responsividade | Lore | 900px | Elementos parcialmente fora da viewport | 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 680 | Baixo | Tipografia | Lore | 900px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 681 | Baixo | Responsividade | Lore | 1024px | Elementos parcialmente fora da viewport | 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 682 | Baixo | Tipografia | Lore | 1024px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 683 | Baixo | Responsividade | Lore | 1280px | Elementos parcialmente fora da viewport | 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 684 | Baixo | Tipografia | Lore | 1280px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 685 | Baixo | Responsividade | Lore | 1440px | Elementos parcialmente fora da viewport | 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 686 | Baixo | Tipografia | Lore | 1440px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 687 | Baixo | Responsividade | Lore | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 688 | Baixo | Tipografia | Lore | 1920px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 689 | Baixo | Responsividade | Página 404 | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 690 | Baixo | Responsividade | Página 404 | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 691 | Baixo | Responsividade | Página 404 | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 692 | Baixo | Responsividade | Página 404 | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 693 | Baixo | Responsividade | Página 404 | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 694 | Baixo | Responsividade | Página 404 | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 695 | Baixo | Responsividade | Página 404 | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 696 | Baixo | Responsividade | Página 404 | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 697 | Baixo | Responsividade | Página 404 | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 698 | Baixo | Responsividade | Página 404 | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 699 | Baixo | Responsividade | Personagens | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 700 | Baixo | Responsividade | Personagens | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 701 | Baixo | Responsividade | Personagens | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 702 | Baixo | Responsividade | Personagens | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 703 | Baixo | Tipografia | Personagens | 640px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 704 | Baixo | Responsividade | Personagens | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 705 | Baixo | Tipografia | Personagens | 768px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 706 | Baixo | Responsividade | Personagens | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 707 | Baixo | Tipografia | Personagens | 900px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 708 | Baixo | Responsividade | Personagens | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 709 | Baixo | Tipografia | Personagens | 1024px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 710 | Baixo | Responsividade | Personagens | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 711 | Baixo | Tipografia | Personagens | 1280px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 712 | Baixo | Responsividade | Personagens | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 713 | Baixo | Tipografia | Personagens | 1440px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 714 | Baixo | Responsividade | Personagens | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 715 | Baixo | Tipografia | Personagens | 1920px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 716 | Baixo | Responsividade | Roadmap | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 717 | Baixo | Responsividade | Roadmap | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 718 | Baixo | Responsividade | Roadmap | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 719 | Baixo | Responsividade | Roadmap | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 720 | Baixo | Tipografia | Roadmap | 640px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 721 | Baixo | Responsividade | Roadmap | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 722 | Baixo | Tipografia | Roadmap | 768px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 723 | Baixo | Responsividade | Roadmap | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 724 | Baixo | Tipografia | Roadmap | 900px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 725 | Baixo | Responsividade | Roadmap | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 726 | Baixo | Tipografia | Roadmap | 1024px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 727 | Baixo | Responsividade | Roadmap | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 728 | Baixo | Tipografia | Roadmap | 1280px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 11.2px. |
| 729 | Baixo | Responsividade | Roadmap | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 730 | Baixo | Tipografia | Roadmap | 1440px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 731 | Baixo | Responsividade | Roadmap | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 732 | Baixo | Tipografia | Roadmap | 1920px | Concentração de textos pequenos | 30 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 733 | Baixo | Responsividade | Studio | 360px | Elementos parcialmente fora da viewport | 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 734 | Baixo | Responsividade | Studio | 390px | Elementos parcialmente fora da viewport | 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 735 | Baixo | Responsividade | Studio | 430px | Elementos parcialmente fora da viewport | 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 736 | Baixo | Responsividade | Studio | 640px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 737 | Baixo | Tipografia | Studio | 640px | Concentração de textos pequenos | 9 elemento(s) abaixo do limiar; menor exemplo 10.4px. |
| 738 | Baixo | Responsividade | Studio | 768px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 739 | Baixo | Tipografia | Studio | 768px | Concentração de textos pequenos | 10 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 740 | Baixo | Responsividade | Studio | 900px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 741 | Baixo | Tipografia | Studio | 900px | Concentração de textos pequenos | 10 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 742 | Baixo | Responsividade | Studio | 1024px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 743 | Baixo | Tipografia | Studio | 1024px | Concentração de textos pequenos | 10 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 744 | Baixo | Responsividade | Studio | 1280px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 745 | Baixo | Tipografia | Studio | 1280px | Concentração de textos pequenos | 10 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 746 | Baixo | Responsividade | Studio | 1440px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 747 | Baixo | Tipografia | Studio | 1440px | Concentração de textos pequenos | 10 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 748 | Baixo | Responsividade | Studio | 1920px | Elementos parcialmente fora da viewport | 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow. |
| 749 | Baixo | Tipografia | Studio | 1920px | Concentração de textos pequenos | 10 elemento(s) abaixo do limiar; menor exemplo 10px. |
| 750 | Preferência estética | Composição | Dashboard | 360px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 751 | Preferência estética | Composição | Dashboard | 390px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 752 | Preferência estética | Composição | Dashboard | 430px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 753 | Preferência estética | Composição | Dashboard | 640px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 754 | Preferência estética | Composição | Dashboard | 768px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 755 | Preferência estética | Composição | Dashboard | 900px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 756 | Preferência estética | Composição | Dashboard | 1024px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 757 | Preferência estética | Composição | Dashboard | 1280px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 758 | Preferência estética | Composição | Dashboard | 1440px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 759 | Preferência estética | Composição | Dashboard | 1920px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 760 | Preferência estética | Composição | Download | 360px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 761 | Preferência estética | Composição | Download | 390px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 762 | Preferência estética | Composição | Download | 430px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 763 | Preferência estética | Composição | Download | 640px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 764 | Preferência estética | Composição | Download | 768px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 765 | Preferência estética | Composição | Download | 900px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 766 | Preferência estética | Composição | Download | 1024px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 767 | Preferência estética | Composição | Download | 1280px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 768 | Preferência estética | Composição | Download | 1440px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 769 | Preferência estética | Composição | Download | 1920px | Repetição frequente do mesmo divisor entre seções | 7 divisores em 9 seções. |
| 770 | Preferência estética | Composição | Home | 360px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 771 | Preferência estética | Composição | Home | 390px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 772 | Preferência estética | Composição | Home | 430px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 773 | Preferência estética | Composição | Home | 640px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 774 | Preferência estética | Composição | Home | 768px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 775 | Preferência estética | Composição | Home | 900px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 776 | Preferência estética | Composição | Home | 1024px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 777 | Preferência estética | Composição | Home | 1280px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 778 | Preferência estética | Composição | Home | 1440px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 779 | Preferência estética | Composição | Home | 1920px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 780 | Preferência estética | Composição | Lore | 360px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 781 | Preferência estética | Composição | Lore | 390px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 782 | Preferência estética | Composição | Lore | 430px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 783 | Preferência estética | Composição | Lore | 640px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 784 | Preferência estética | Composição | Lore | 768px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 785 | Preferência estética | Composição | Lore | 900px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 786 | Preferência estética | Composição | Lore | 1024px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 787 | Preferência estética | Composição | Lore | 1280px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 788 | Preferência estética | Composição | Lore | 1440px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 789 | Preferência estética | Composição | Lore | 1920px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 790 | Preferência estética | Composição | Studio | 360px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 791 | Preferência estética | Composição | Studio | 390px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 792 | Preferência estética | Composição | Studio | 430px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 793 | Preferência estética | Composição | Studio | 640px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 794 | Preferência estética | Composição | Studio | 768px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 795 | Preferência estética | Composição | Studio | 900px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 796 | Preferência estética | Composição | Studio | 1024px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 797 | Preferência estética | Composição | Studio | 1280px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 798 | Preferência estética | Composição | Studio | 1440px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |
| 799 | Preferência estética | Composição | Studio | 1920px | Repetição frequente do mesmo divisor entre seções | 5 divisores em 7 seções. |

## 4. Pontos visualmente fortes que devem ser preservados

- A navegação principal mantém nove destinos estáveis e um único estado ativo por rota.
- O projeto apresenta linguagem visual consistente entre cabeçalho, Dock, Hero, seções editoriais e rodapé.
- Há estrutura semântica de navegação, link de salto para o conteúdo e estados ARIA no sistema de transição.
- A Home possui composição própria, mapa vetorial e hierarquia editorial reconhecível, evitando uma grade genérica de cards.
- Roadmap, Lore, Devlog e Galeria têm padrões de conteúdo distintos, preservando identidade funcional por página.
- O sistema contém tratamento explícito para prefers-reduced-motion; os resultados objetivos estão detalhados na seção de movimento.

## 5. Elementos que precisam ser simplificados

- **Preferência estética · Dashboard · 360px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 390px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 430px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 640px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 768px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 900px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 1024px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 1280px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 1440px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Dashboard · 1920px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Download · 360px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 390px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 430px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 640px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 768px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 900px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 1024px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 1280px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 1440px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Download · 1920px:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · Home · 360px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 390px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 430px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 640px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 768px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 900px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 1024px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 1280px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 1440px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Home · 1920px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 360px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 390px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 430px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 640px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 768px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 900px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 1024px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 1280px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 1440px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Lore · 1920px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 360px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 390px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 430px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 640px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 768px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 900px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 1024px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 1280px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 1440px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · Studio · 1920px:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.

## 6. Elementos que precisam de maior destaque

- O CTA primário da primeira dobra e o estado atual da build precisam permanecer como pontos de decisão imediata.
- O indicador ativo do Dock deve continuar sendo a referência principal de localização.
- Em páginas funcionais, mensagens de autenticação, permissão, envio e erro devem ter prioridade visual superior aos efeitos ambientais.
- Na Galeria, filtros ativos, item selecionado e controles do modal devem ter contraste e área de toque inequívocos.
- No Roadmap, etapa atual, progresso e próximos marcos precisam superar visualmente ornamentos e linhas secundárias.

## 7. Problemas específicos por página

### Admin

- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 12 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 12 elemento(s) abaixo do limiar; menor exemplo 10px.

### Dashboard

- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 7 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 7 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 9 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Preferência estética · 360px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 390px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 430px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 640px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 768px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 900px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1024px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1280px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1440px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1920px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.

### Devlog individual · construindo-o-bosque-da-nevoa-perdida

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.

### Devlog individual · criando-o-sistema-de-dash

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.

### Devlog individual · preparando-a-primeira-demo-jogavel

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.

### Devlog individual · primeiro-chefe-lucarelli

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.

### Download

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 19 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 18 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 18 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1440px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Preferência estética · 360px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 390px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 430px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 640px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 768px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 900px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 1024px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 1280px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 1440px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.
- **Preferência estética · 1920px · Composição:** Repetição frequente do mesmo divisor entre seções. 7 divisores em 9 seções.

### Galeria

- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Modal:** Modal não fecha com Escape. O diálogo permaneceu visível após a tecla Escape.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1440px · Modal:** Foco não entra no modal ao abrir. O elemento ativo permaneceu fora de [role=dialog].
- **Alto · 1440px · Modal:** Modal não fecha com Escape. O diálogo permaneceu visível após a tecla Escape.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.131.
- **Médio · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Modal:** Foco não retorna ao item após fechar o modal. O foco não voltou ao acionador original.
- **Médio · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Modal:** Foco não retorna ao item após fechar o modal. O foco não voltou ao acionador original.
- **Médio · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 28 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 24 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 15 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.

### Home

- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 25 elemento(s), exemplo: div.editorial-overview.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 23 elemento(s), exemplo: article.editorial-pillar.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 23 elemento(s), exemplo: article.editorial-pillar.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 23 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 19 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 14 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 9 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 6 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Preferência estética · 360px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 390px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 430px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 640px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 768px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 900px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1024px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1280px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1440px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1920px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.

### Login

- **Alto · 390px · Acessibilidade:** Violações WCAG sérias. aria-required-children (1)
- **Alto · 1440px · Acessibilidade:** Violações WCAG sérias. aria-required-children (1)
- **Médio · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 13 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 13 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 13 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 22 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 18 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 10px.

### Lore

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 33 elemento(s), exemplo: article.lore-pillar.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 32 elemento(s), exemplo: article.lore-pillar.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 32 elemento(s), exemplo: article.lore-pillar.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 31 elemento(s), exemplo: article.lore-pillar.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: aside.lore-note.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: article.lore-pillar.
- **Alto · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: article.lore-pillar.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: article.lore-pillar.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 22 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 18 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Preferência estética · 360px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 390px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 430px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 640px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 768px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 900px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1024px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1280px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1440px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1920px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.

### Personagens

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 8 elemento(s), exemplo: article.character-dossier.character-dossier--featured.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.

### Roadmap

- **Alto · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 15 elemento(s), exemplo: li.roadmap-record.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.145.
- **Alto · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 15 elemento(s), exemplo: li.roadmap-record.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.142.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 15 elemento(s), exemplo: li.roadmap-record.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.147.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.117.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.106.
- **Alto · 1920px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 16 elemento(s), exemplo: div.roadmap-phase__content.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Estabilidade:** Mudança de layout perceptível. CLS observado: 0.082.
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.

### Studio

- **Alto · 360px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 21 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 390px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 21 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 430px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 21 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 640px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 19 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 768px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 19 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · 900px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 20 elemento(s), exemplo: article.studio-manifesto.studio-manifesto--secondary.
- **Alto · 1024px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 20 elemento(s), exemplo: article.studio-manifesto.studio-manifesto--secondary.
- **Alto · 1280px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · 1440px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · 1920px · Estabilidade:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 9 elemento(s) abaixo do limiar; menor exemplo 10.4px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Preferência estética · 360px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 390px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 430px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 640px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 768px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 900px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1024px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1280px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1440px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.
- **Preferência estética · 1920px · Composição:** Repetição frequente do mesmo divisor entre seções. 5 divisores em 7 seções.

### Devlog

- **Médio · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: li.
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: li.
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: li.
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 10.4px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 10.4px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.

### Feedback

- **Médio · 360px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Movimento:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Tipografia:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Tipografia:** Concentração de textos pequenos. 5 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Tipografia:** Concentração de textos pequenos. 5 elemento(s) abaixo do limiar; menor exemplo 10px.

### Página 404

- **Médio · 360px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 12px.
- **Médio · 360px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 360px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 360px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 390px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 12px.
- **Médio · 390px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 390px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 390px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 430px · Tipografia:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 12px.
- **Médio · 430px · Touch:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · 430px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 430px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 640px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 640px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 768px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 768px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 900px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 900px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 1024px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1024px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 1280px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1280px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 1440px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1440px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Médio · 1920px · Movimento:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · 1920px · Runtime:** Erros no console durante a renderização. Failed to load resource: the server responded with a status of 404 ()
- **Baixo · 360px · Responsividade:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 390px · Responsividade:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 430px · Responsividade:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 640px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 768px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 900px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1024px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1280px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1440px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · 1920px · Responsividade:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.

## 8. Problemas específicos do Dock

- Nenhum problema objetivo do Dock foi detectado nas condições públicas testadas.

## 9. Problemas específicos do Hero

- Nenhum problema objetivo do Hero foi detectado nas condições testadas.

## 10. Problemas específicos do sistema de movimento

- **Alto · Admin · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Admin · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Admin · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Admin · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Admin · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Admin · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Admin · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Admin · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Admin · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Admin · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Dashboard · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Dashboard · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Dashboard · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Dashboard · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Dashboard · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Dashboard · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Dashboard · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Dashboard · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Dashboard · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Dashboard · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 360px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 390px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 430px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 640px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 360px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 390px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 430px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 640px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · criando-o-sistema-de-dash · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 360px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 390px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 430px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 640px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · preparando-a-primeira-demo-jogavel · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 360px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 390px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 430px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 640px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 1440px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Devlog individual · primeiro-chefe-lucarelli · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 5 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Download · 360px:** Elementos permanecem invisíveis após a janela de reveal. 19 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Download · 390px:** Elementos permanecem invisíveis após a janela de reveal. 18 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Download · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Download · 430px:** Elementos permanecem invisíveis após a janela de reveal. 18 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Alto · Download · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Download · 640px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Download · 768px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Download · 900px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Download · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Download · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 1440px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Download · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Galeria · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Galeria · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Galeria · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Galeria · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Galeria · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Galeria · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Galeria · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Galeria · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Galeria · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.131.
- **Alto · Home · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Home · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Home · 900px:** Elementos permanecem invisíveis após a janela de reveal. 25 elemento(s), exemplo: div.editorial-overview.
- **Alto · Home · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 23 elemento(s), exemplo: article.editorial-pillar.
- **Alto · Home · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Home · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Home · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 23 elemento(s), exemplo: article.editorial-pillar.
- **Alto · Lore · 360px:** Elementos permanecem invisíveis após a janela de reveal. 33 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Lore · 390px:** Elementos permanecem invisíveis após a janela de reveal. 32 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 430px:** Elementos permanecem invisíveis após a janela de reveal. 32 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Lore · 640px:** Elementos permanecem invisíveis após a janela de reveal. 31 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Lore · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Lore · 900px:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: aside.lore-note.
- **Alto · Lore · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Lore · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Lore · 1440px:** Elementos permanecem invisíveis após a janela de reveal. 30 elemento(s), exemplo: article.lore-pillar.
- **Alto · Lore · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Personagens · 360px:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Personagens · 390px:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Personagens · 430px:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Personagens · 640px:** Elementos permanecem invisíveis após a janela de reveal. 9 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Personagens · 768px:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Personagens · 900px:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Personagens · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Personagens · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Personagens · 1440px:** Elementos permanecem invisíveis após a janela de reveal. 6 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Personagens · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Personagens · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 8 elemento(s), exemplo: article.character-dossier.character-dossier--featured.
- **Alto · Personagens · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Roadmap · 360px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · Roadmap · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Roadmap · 390px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · Roadmap · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Roadmap · 430px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · Roadmap · 640px:** Elementos permanecem invisíveis após a janela de reveal. 17 elemento(s), exemplo: div.roadmap-heading.
- **Alto · Roadmap · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Roadmap · 768px:** Elementos permanecem invisíveis após a janela de reveal. 15 elemento(s), exemplo: li.roadmap-record.
- **Alto · Roadmap · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.145.
- **Alto · Roadmap · 900px:** Elementos permanecem invisíveis após a janela de reveal. 15 elemento(s), exemplo: li.roadmap-record.
- **Alto · Roadmap · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.142.
- **Alto · Roadmap · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 15 elemento(s), exemplo: li.roadmap-record.
- **Alto · Roadmap · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.147.
- **Alto · Roadmap · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.117.
- **Alto · Roadmap · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.106.
- **Alto · Roadmap · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 16 elemento(s), exemplo: div.roadmap-phase__content.
- **Alto · Studio · 360px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Studio · 390px:** Elementos permanecem invisíveis após a janela de reveal. 21 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Studio · 390px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Studio · 430px:** Elementos permanecem invisíveis após a janela de reveal. 21 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Studio · 430px:** Mudança de layout acima do recomendado. CLS observado: 0.105.
- **Alto · Studio · 640px:** Elementos permanecem invisíveis após a janela de reveal. 21 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Studio · 640px:** Mudança de layout acima do recomendado. CLS observado: 0.103.
- **Alto · Studio · 768px:** Elementos permanecem invisíveis após a janela de reveal. 19 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Studio · 768px:** Mudança de layout acima do recomendado. CLS observado: 0.166.
- **Alto · Studio · 900px:** Elementos permanecem invisíveis após a janela de reveal. 19 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Alto · Studio · 900px:** Mudança de layout acima do recomendado. CLS observado: 0.157.
- **Alto · Studio · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 20 elemento(s), exemplo: article.studio-manifesto.studio-manifesto--secondary.
- **Alto · Studio · 1024px:** Mudança de layout acima do recomendado. CLS observado: 0.150.
- **Alto · Studio · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 20 elemento(s), exemplo: article.studio-manifesto.studio-manifesto--secondary.
- **Alto · Studio · 1280px:** Mudança de layout acima do recomendado. CLS observado: 0.141.
- **Alto · Studio · 1440px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Alto · Studio · 1920px:** Mudança de layout acima do recomendado. CLS observado: 0.136.
- **Médio · Admin · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Admin · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Dashboard · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 360px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · Devlog · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 390px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · Devlog · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 430px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · Devlog · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 640px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · Devlog · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 768px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: li.
- **Médio · Devlog · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 900px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: li.
- **Médio · Devlog · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: li.
- **Médio · Devlog · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · Devlog · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 1440px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: li.
- **Médio · Devlog · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 768px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 900px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 768px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · criando-o-sistema-de-dash · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 900px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · criando-o-sistema-de-dash · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · criando-o-sistema-de-dash · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 768px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 900px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 768px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 900px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 1024px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 4 elemento(s), exemplo: div.fx-card.tester-card.h-full.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Download · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 360px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Feedback · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 390px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Feedback · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Feedback · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 360px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 390px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 430px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 640px:** Elementos permanecem invisíveis após a janela de reveal. 2 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 900px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 1280px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Galeria · 1920px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Galeria · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Home · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 360px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Login · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 390px:** Elementos permanecem invisíveis após a janela de reveal. 1 elemento(s), exemplo: div.section-heading.fx-reveal-title.
- **Médio · Login · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Login · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Lore · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Página 404 · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Personagens · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Roadmap · 1920px:** Mudança de layout perceptível. CLS observado: 0.082.
- **Médio · Roadmap · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 360px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 390px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 430px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 640px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 768px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 900px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 1024px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 1280px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 1440px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).
- **Médio · Studio · 1920px:** Animações ou transições prolongadas. 3 candidato(s); exemplo div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow (28000ms).

### Tempos medidos de transição de rota

| Largura | Destino | Duração | aria-busy final | Loader final |
|---:|---|---:|---|---|
| 1440 | /download | 189ms | false | false |
| 1440 | /lore | 445ms | false | false |
| 1440 | /roadmap | 231ms | false | false |
| 390 | /download | 137ms | false | false |
| 390 | /lore | 193ms | false | false |
| 390 | /roadmap | 160ms | false | false |

## 11. Problemas específicos de responsividade

- **Médio · Admin · 360px:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Admin · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Admin · 390px:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Admin · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Admin · 430px:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Admin · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Dashboard · 360px:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Dashboard · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Dashboard · 390px:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Dashboard · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Dashboard · 430px:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Dashboard · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 18 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog · 360px:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog · 390px:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog · 430px:** Concentração de textos pequenos. 29 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 360px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 390px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 430px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 360px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · criando-o-sistema-de-dash · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 390px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · criando-o-sistema-de-dash · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · criando-o-sistema-de-dash · 430px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · criando-o-sistema-de-dash · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 360px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 390px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 430px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · preparando-a-primeira-demo-jogavel · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 360px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 390px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 430px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Devlog individual · primeiro-chefe-lucarelli · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Download · 360px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Download · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Download · 390px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Download · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Download · 430px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Download · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Feedback · 360px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Feedback · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Feedback · 390px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Feedback · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Feedback · 430px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Feedback · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 13 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Galeria · 360px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Galeria · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Galeria · 390px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Galeria · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Galeria · 430px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Galeria · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Home · 360px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Home · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Home · 390px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Home · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Home · 430px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Home · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Login · 360px:** Concentração de textos pequenos. 13 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Login · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Login · 390px:** Concentração de textos pequenos. 13 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Login · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Login · 430px:** Concentração de textos pequenos. 13 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Login · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Lore · 360px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Lore · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Lore · 390px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Lore · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Lore · 430px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Lore · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Página 404 · 360px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 12px.
- **Médio · Página 404 · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Página 404 · 390px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 12px.
- **Médio · Página 404 · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Página 404 · 430px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 12px.
- **Médio · Página 404 · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Personagens · 360px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Personagens · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Personagens · 390px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Personagens · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Personagens · 430px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Personagens · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Roadmap · 360px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Roadmap · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Roadmap · 390px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Roadmap · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Roadmap · 430px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Roadmap · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Studio · 360px:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Studio · 360px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Studio · 390px:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Studio · 390px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Médio · Studio · 430px:** Concentração de textos pequenos. 27 elemento(s) abaixo do limiar; menor exemplo 11.5px.
- **Médio · Studio · 430px:** Múltiplos alvos de toque abaixo de 44×44px. 12 candidato(s); exemplo a.sr-only.focus:not-sr-only.focus:absolute (1×1px).
- **Baixo · Admin · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 640px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Admin · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 768px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Admin · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 900px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Admin · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 1024px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Admin · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 1280px:** Concentração de textos pequenos. 11 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Admin · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 1440px:** Concentração de textos pequenos. 12 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Admin · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Admin · 1920px:** Concentração de textos pequenos. 12 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Dashboard · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 640px:** Concentração de textos pequenos. 7 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Dashboard · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 768px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Dashboard · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 900px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Dashboard · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 1024px:** Concentração de textos pequenos. 7 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Dashboard · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 1280px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Dashboard · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 1440px:** Concentração de textos pequenos. 8 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Dashboard · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Dashboard · 1920px:** Concentração de textos pequenos. 9 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Devlog · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 640px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 10.4px.
- **Baixo · Devlog · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 768px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Devlog · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 900px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Devlog · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 1024px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Devlog · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 1280px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 10.4px.
- **Baixo · Devlog · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 1440px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Devlog · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog · 1920px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · construindo-o-bosque-da-nevoa-perdida · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · criando-o-sistema-de-dash · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · preparando-a-primeira-demo-jogavel · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Devlog individual · primeiro-chefe-lucarelli · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 640px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Download · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 768px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Download · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 900px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Download · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 1024px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Download · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 1280px:** Concentração de textos pequenos. 17 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Download · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 1440px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Download · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Download · 1920px:** Concentração de textos pequenos. 18 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Feedback · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 640px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Feedback · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 768px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Feedback · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 900px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Feedback · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 1024px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Feedback · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 1280px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Feedback · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 1440px:** Concentração de textos pequenos. 5 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Feedback · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Feedback · 1920px:** Concentração de textos pequenos. 5 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Galeria · 360px:** Elementos parcialmente fora da viewport. 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 390px:** Elementos parcialmente fora da viewport. 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 430px:** Elementos parcialmente fora da viewport. 30 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 640px:** Elementos parcialmente fora da viewport. 28 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 640px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Galeria · 768px:** Elementos parcialmente fora da viewport. 24 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 768px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Galeria · 900px:** Elementos parcialmente fora da viewport. 15 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 900px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Galeria · 1024px:** Elementos parcialmente fora da viewport. 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 1024px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Galeria · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 1280px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Galeria · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 1440px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Galeria · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Galeria · 1920px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Home · 360px:** Elementos parcialmente fora da viewport. 23 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 390px:** Elementos parcialmente fora da viewport. 19 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 430px:** Elementos parcialmente fora da viewport. 14 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 640px:** Elementos parcialmente fora da viewport. 9 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 640px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Home · 768px:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 768px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Home · 900px:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 900px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Home · 1024px:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 1024px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Home · 1280px:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 1280px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Home · 1440px:** Elementos parcialmente fora da viewport. 8 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 1440px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Home · 1920px:** Elementos parcialmente fora da viewport. 6 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Home · 1920px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Login · 360px:** Elementos parcialmente fora da viewport. 22 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 390px:** Elementos parcialmente fora da viewport. 18 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 430px:** Elementos parcialmente fora da viewport. 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 1440px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Login · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Login · 1920px:** Concentração de textos pequenos. 4 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Lore · 360px:** Elementos parcialmente fora da viewport. 22 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 390px:** Elementos parcialmente fora da viewport. 18 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 430px:** Elementos parcialmente fora da viewport. 13 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 640px:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 640px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Lore · 768px:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 768px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Lore · 900px:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 900px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Lore · 1024px:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 1024px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Lore · 1280px:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 1280px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Lore · 1440px:** Elementos parcialmente fora da viewport. 5 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 1440px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Lore · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Lore · 1920px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Página 404 · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Página 404 · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 640px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Personagens · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 768px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Personagens · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 900px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Personagens · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 1024px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Personagens · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 1280px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Personagens · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 1440px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Personagens · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Personagens · 1920px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Roadmap · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 640px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Roadmap · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 768px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Roadmap · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 900px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Roadmap · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 1024px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Roadmap · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 1280px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 11.2px.
- **Baixo · Roadmap · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 1440px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Roadmap · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Roadmap · 1920px:** Concentração de textos pequenos. 30 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Studio · 360px:** Elementos parcialmente fora da viewport. 21 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 390px:** Elementos parcialmente fora da viewport. 17 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 430px:** Elementos parcialmente fora da viewport. 12 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 640px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 640px:** Concentração de textos pequenos. 9 elemento(s) abaixo do limiar; menor exemplo 10.4px.
- **Baixo · Studio · 768px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 768px:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Studio · 900px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 900px:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Studio · 1024px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 1024px:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Studio · 1280px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 1280px:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Studio · 1440px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 1440px:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.
- **Baixo · Studio · 1920px:** Elementos parcialmente fora da viewport. 4 candidato(s), exemplo: div.ambient-scene__orb.ambient-scene__orb--left.fog-drift-slow.
- **Baixo · Studio · 1920px:** Concentração de textos pequenos. 10 elemento(s) abaixo do limiar; menor exemplo 10px.

## 12. Comparação desktop, tablet e mobile

| Faixa | Testes | Casos com overflow | Textos pequenos detectados | Reveals invisíveis após estabilizar | Navegação média |
|---|---:|---:|---:|---:|---:|
| Desktop | 51 | 0 | 696 | 220 | 3613ms |
| Tablet | 68 | 0 | 900 | 448 | 3552ms |
| Mobile | 51 | 0 | 1125 | 348 | 3516ms |

## 13. Critérios objetivos para considerar a Fase 4 concluída

- [ ] Nenhuma rota pública obrigatória retorna erro 5xx, página vazia ou loading visual preso.
- [ ] Não existe overflow horizontal não intencional em nenhuma das dez larguras testadas.
- [ ] Dock com os nove destinos acessíveis, indicador ativo único, tooltips dentro da viewport e alvos touch adequados.
- [ ] Hero sem corte de título, CTA ou mapa, com primeira dobra compreensível em desktop, tablet e mobile.
- [ ] Todos os elementos com reveal tornam-se visíveis mesmo com falha de IntersectionObserver ou navegação rápida.
- [ ] prefers-reduced-motion elimina movimento contínuo e reduz transições a um nível não bloqueante.
- [ ] Transições de rota liberam o conteúdo em até 1,2s e nunca mantêm aria-busy ou loader após a navegação.
- [ ] Contraste WCAG AA para texto e controles essenciais, com foco visível em navegação por teclado.
- [ ] Galeria mantém filtros, modal, Escape, foco preso e retorno de foco em desktop e mobile.
- [ ] Dashboard, Admin, Login e Feedback exibem estados funcionais claros, incluindo autenticação e permissão.
- [ ] CLS por página abaixo de 0,1, sem saltos relevantes causados por animação ou carregamento.
- [ ] Screenshots de referência atualizados e comparação visual executada antes de cada merge da Fase 4.

## Testes executados

- Navegação direta em todas as páginas e larguras solicitadas.
- Captura de primeira dobra e página inteira representativa.
- Detecção de overflow, elementos fora da viewport, imagens quebradas, textos pequenos e títulos com quebra excessiva.
- Verificação de Dock, tooltips, indicador ativo e disponibilidade dos nove destinos.
- Navegação por teclado e inspeção de foco visível.
- Auditoria axe WCAG A/AA em desktop e mobile.
- Verificação de prefers-reduced-motion.
- Medição de CLS, loaders, reveals invisíveis, animações longas e transições de rota.
- Teste de filtros e fluxo do modal da Galeria, incluindo Escape e retorno de foco.
- Registro de console, page errors e respostas HTTP 4xx/5xx.

## Arquivos alterados nesta etapa

- `.github/workflows/fase-4-etapa-1-baseline.yml`
- `scripts/visual-baseline-audit.mjs.gz.b64` — fonte compactada da automação.
- `docs/fase-4/etapa-1/**` — relatório, dados e evidências geradas automaticamente.

## Limitações encontradas

- A auditoria automatizada mede geometria, estados, contraste, foco, movimento e evidências visuais; decisões puramente artísticas ainda exigem leitura humana dos screenshots antes das correções.
- O deployment técnico informado estava protegido; o alias público bdf-navy.vercel.app foi usado por apontar para o mesmo deployment/commit de produção.

## Ordem recomendada das correções

1. Críticos: páginas vazias, falhas de carregamento, loading preso e conteúdo invisível.
2. Altos: overflow relevante, navegação inacessível, modal/foco quebrado, contraste sério e erros de runtime.
3. Médios: tipografia, touch targets, tooltips, transições demoradas, reduced motion e CLS perceptível.
4. Baixos: ajustes finos de primeira dobra, foco secundário e pequenas quebras.
5. Preferências estéticas: simplificação de efeitos, divisores e repetição visual, somente depois de estabilidade e acessibilidade.
