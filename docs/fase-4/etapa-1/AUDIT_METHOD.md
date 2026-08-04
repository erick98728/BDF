# FASE 4 · ETAPA 1 — Método do baseline visual

Esta branch existe somente para documentar o estado visual atual da `main` antes de mudanças de refinamento.

## Documento autoritativo

A interpretação manual definitiva está em [`MANUAL_QA_REVIEW.md`](MANUAL_QA_REVIEW.md). O relatório automatizado bruto é mantido para rastreabilidade, mas não deve ser usado sozinho para contar problemas: elementos fora da viewport e reveals ainda não visitados pela rolagem podem aparecer como ocorrências repetidas.

A validação complementar em [`SCROLL_VALIDATION.md`](SCROLL_VALIDATION.md) percorreu as páginas antes da classificação e confirmou que nenhum reveal permaneceu pendente, que o modal fecha com Escape e que o foco retorna ao gatilho.

## Escopo

- Nenhuma alteração em Supabase, SQL, autenticação, banco de dados ou regras de negócio.
- Nenhuma remoção de rota, conteúdo, filtro ou funcionalidade.
- Nenhum merge automático e nenhuma publicação em produção.
- Auditoria executada em Chromium real no GitHub Actions contra o alias público do deployment de produção.
- A branch parte do commit `7a192260c7945c6c75ab05bba78ebe97f94050e1` da `main`.

## Reprodutibilidade

O workflow `.github/workflows/fase-4-etapa-1-baseline.yml` instala Playwright e axe-core, descompacta `scripts/visual-baseline-audit.mjs.gz.b64`, executa o auditor em `scripts/.visual-baseline-audit.runtime.mjs`, captura evidências, gera o relatório e versiona os resultados em `docs/fase-4/etapa-1/`.

O workflow `.github/workflows/fase-4-scroll-validation.yml` faz uma segunda passagem com rolagem progressiva para validar reveals, conteúdo intermediário e foco do modal sem os falsos positivos de uma captura full-page estática.

A execução principal cobre as larguras 1920, 1440, 1280, 1024, 900, 768, 640, 430, 390 e 360 pixels. Também verifica foco, hover, tooltips, touch targets, modal da Galeria, filtros, transições de rota, CLS, overflow, console, respostas HTTP e `prefers-reduced-motion`.

## Artefatos gerados

- `docs/fase-4/etapa-1/MANUAL_QA_REVIEW.md`
- `docs/fase-4/etapa-1/README.md`
- `docs/fase-4/etapa-1/baseline.json`
- `docs/fase-4/etapa-1/interactions.json`
- `docs/fase-4/etapa-1/evidence-index.md`
- `docs/fase-4/etapa-1/SCROLL_VALIDATION.md`
- `docs/fase-4/etapa-1/scroll-validation.json`
- `docs/fase-4/etapa-1/evidence/`

Os workflows também publicam artefatos compactados com retenção de 30 dias.