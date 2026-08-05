# Referência do Design System — Fase 4 · Etapa 3

> Branch: `agent/fase-4-etapa-3-tipografia-design-system`  
> Base autoritativa: `b8faffae63a875a542d6f6f29e5401ea41f471ab`  
> Escopo: tipografia, hierarquia, tokens, superfícies, controles e estabilidade visual.  
> O sistema de movimento da Etapa 2 permanece autoritativo e não é redefinido aqui.

## 1. Fontes

As fontes são declaradas em `src/app/fonts.ts` com `next/font/google`, baixadas durante o build e servidas pelo próprio Next.js em `/_next/static/media/`. Não há chamada a Google Fonts em runtime.

| Papel | Família | Pesos | Variável CSS | Fallback |
|---|---|---:|---|---|
| Corpo e interface | Inter | 400, 500, 600 | `--font-body-loaded` | Arial, sans-serif |
| Display e títulos | Oswald | 500, 600, 700 | `--font-display-loaded` | Arial Narrow, Arial, sans-serif |
| Metadata e código | Roboto Mono | 400, 500 | `--font-mono-loaded` | Courier New, monospace |

Configuração comum: `display: "optional"`, `preload: true` e `adjustFontFallback: true`.

```css
--font-display: var(--font-display-loaded, "Arial Narrow"),
  "Arial Narrow", ui-sans-serif, system-ui, sans-serif;
--font-body: var(--font-body-loaded, Arial),
  Arial, ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-mono-loaded, "Courier New"),
  "Courier New", ui-monospace, monospace;
```

## 2. Escala tipográfica

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
| `--text-label` | `0.875rem` — mínimo funcional de aproximadamente 14px |
| `--text-meta` | `0.75rem` — metadata necessária de aproximadamente 12px |
| `--text-decorative` | `0.6875rem` — índices e coordenadas redundantes próximos de 11px |
| `--text-code` | `clamp(0.75rem, 0.73rem + 0.08vw, 0.8125rem)` |

### Papéis semânticos

- **Display:** Hero e mensagens de maior impacto.
- **Título de página:** cabeçalhos das rotas.
- **Título de capítulo:** aberturas editoriais.
- **Título de seção:** agrupamentos principais.
- **Título de componente:** modal, painel e composição funcional.
- **Título de registro:** itens de timeline, dossiê, ledger e fragmentos.
- **Label:** botões, filtros, tabs, campos e ações.
- **Metadata:** datas, estados, categorias e informações contextuais.
- **Decorativo:** índices redundantes, coordenadas ambientais e símbolos editoriais.

Classes utilitárias: `.type-display`, `.type-page-title`, `.type-chapter-title`, `.type-section-title`, `.type-component-title`, `.type-record-title`, `.type-body-lg`, `.type-body`, `.type-body-sm`, `.type-label`, `.type-meta` e `.type-code`.

## 3. Altura de linha, tracking e leitura

```css
--leading-display: 0.96;
--leading-heading: 1.08;
--leading-body: 1.65;
--leading-compact: 1.38;
--leading-code: 1.5;

--tracking-display: -0.025em;
--tracking-heading: -0.012em;
--tracking-label: 0.075em;
--tracking-meta: 0.04em;
--tracking-code: 0.025em;

--measure-compact: 55ch;
--measure-body: 68ch;
--measure-wide: 75ch;
```

Regras de uso:

- Corpo longo usa `--measure-body`.
- Introduções amplas podem usar `--measure-wide`.
- Labels e metadata não devem ultrapassar o tracking semântico.
- Títulos compactos usam tracking negativo moderado.
- Textos funcionais não usam microtipografia abaixo de 14px.

## 4. Cores de texto

| Token | Papel |
|---|---|
| `--text-primary` | conteúdo principal |
| `--text-secondary` | corpo e descrição secundária |
| `--text-muted` | metadata discreta |
| `--text-subtle` | informação de baixa ênfase |
| `--text-accent` | labels e marcadores editoriais |
| `--text-inverse` | texto sobre superfície clara |
| `--text-disabled` | controles indisponíveis |

Utilitários: `.text-role-primary`, `.text-role-secondary`, `.text-role-muted`, `.text-role-subtle` e `.text-role-accent`.

## 5. Superfícies

| Token/papel | Uso |
|---|---|
| `--surface-page` | canvas global |
| `--surface-raised` | componentes elevados |
| `--surface-subtle` | cards discretos |
| `--surface-interactive` | estados e destaques interativos |
| `--surface-overlay` | modal, tooltip e sobreposição |
| `--surface-functional` | formulários e áreas operacionais |
| `--surface-document` | registros narrativos |
| `--surface-media` | Galeria e mídia |

Papéis de componente:

- `default` / `quiet`: conteúdo geral de baixa elevação;
- `functional`: login, feedback e painéis operacionais;
- `narrative`: Lore, Devlog e registros editoriais;
- `status`: estado ou aviso;
- `character`: dossiês;
- `gallery`: mídia;
- `panel`: composição elevada;
- `highlight`: chamada prioritária;
- `flat`: estrutura sem card visual.

Utilitários: `.surface-role-standard`, `.surface-role-functional`, `.surface-role-editorial` e `.surface-role-media`.

## 6. Bordas, raios e espaçamento

```css
--border-subtle: rgba(245, 242, 237, 0.1);
--border-default: rgba(245, 242, 237, 0.16);
--border-strong: rgba(245, 242, 237, 0.26);
--border-accent: rgba(204, 100, 55, 0.5);
--border-focus: rgba(245, 242, 237, 0.92);

--radius-sm: 0.5rem;
--radius-md: 0.75rem;
--radius-lg: 1.125rem;
--radius-pill: 999px;
```

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
--space-inline: clamp(1rem, 3.2vw, 3rem);
--space-component: clamp(1rem, 1.6vw, 1.5rem);
--space-editorial: clamp(1.5rem, 2.6vw, 2.5rem);
--space-section: clamp(3.75rem, 7vw, 6.75rem);
```

## 7. Controles e foco

Controles compartilhados usam altura mínima de `2.75rem`, corpo Inter, tamanho de label e raio médio.

```css
.ds-control {
  min-height: 2.75rem;
  font-family: var(--font-body);
  font-size: var(--text-label);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.015em;
  border-radius: var(--radius-md);
}
```

A camada `design-system-stability.css` é carregada por último e restaura um outline tokenizado que vence a regra legada baseada apenas em box-shadow. Em forced colors, o foco usa `Highlight`.

## 8. Exemplos reais

### Cabeçalho de página

```tsx
<PageHeader
  index="04"
  eyebrow="Arquivo"
  title="Personagens"
  description="Dossiês dos viajantes, guardiões e forças do mundo."
/>
```

### Título de capítulo

```tsx
<SectionTitle
  variant="chapter"
  eyebrow="Fragmento I"
  title="O bosque antes da névoa"
  subtitle="Uma abertura editorial com medida ampla e hierarquia própria."
/>
```

### Card funcional

```tsx
<GlowCard surfaceRole="functional">
  <h3 className="type-component-title">Acesso do testador</h3>
  <p className="type-body-sm text-role-secondary">
    Entre com as credenciais do beta fechado.
  </p>
</GlowCard>
```

### Metadata e ação

```tsx
<time className="type-meta text-role-muted" dateTime="2026-08-05">
  05 AGO 2026
</time>
<GameButton variant="secondary">Ler registro</GameButton>
```

## 9. Arquivos-fonte

- `src/app/fonts.ts`
- `src/app/design-system.css`
- `src/app/design-system-utilities.css`
- `src/app/design-system-stability.css`
- `src/components/PageHeader.tsx`
- `src/components/SectionTitle.tsx`
- `src/components/GameButton.tsx`
- `src/components/GlowCard.tsx`
- `src/components/GalleryModal.tsx`
- `src/app/login/page.tsx`

## 10. Limites de escopo

Esta referência não redefine animações, timelines, transições, Dock, Header, Hero estrutural ou composição das páginas. Esses temas permanecem sujeitos às etapas específicas da Fase 4.
