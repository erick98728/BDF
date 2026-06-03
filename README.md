# Tester - Site Oficial

Site oficial do projeto Tester, feito com Next.js, TypeScript e Tailwind. O projeto já inclui páginas públicas, área de beta, dashboard, login com Supabase e formulário de feedback.

## Rodando localmente

1. Instale as dependências:

```bash
npm install
```

2. Copie as variáveis de exemplo:

```bash
cp .env.example .env.local
```

No Windows PowerShell, use:

```powershell
Copy-Item .env.example .env.local
```

3. Preencha as variáveis necessárias em `.env.local`.

4. Rode o servidor local:

```bash
npm run dev
```

5. Acesse `http://localhost:3000`.

Para validar uma build de produção:

```bash
npm run build
npm run start
```

## Variáveis de ambiente

Configure estas variáveis localmente e também na Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: chave pública anon do Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: chave privada de servidor usada pela rota segura `POST /api/beta/download`. Nunca use prefixo `NEXT_PUBLIC_`, nunca exponha no frontend e configure apenas como variável privada na Vercel.
- `NEXT_PUBLIC_BETA_DOWNLOAD_URL`: link público/controlado legado da build beta para Windows. É opcional e deve ser usado apenas como fallback temporário; a rota segura de download não usa essa variável.

O arquivo `.env.example` lista todas as chaves esperadas pelo projeto.

## Publicando na Vercel

1. Importe o repositório `erick98728/BDF` na Vercel.
2. Confirme que o framework detectado é Next.js.
3. Em Project Settings > Environment Variables, cadastre as variáveis acima.
4. Faça o deploy da branch `main`.
5. Depois do deploy, teste `/`, `/download`, `/feedback`, `/login`, `/dashboard` e uma rota inexistente para validar a página 404.

Se o Supabase ainda não estiver configurado, o deploy continua funcionando. O site mostra os fluxos em modo de preparação.

## SEO e identidade pública

- O layout global define `metadataBase` para o domínio de produção da Vercel.
- As páginas principais usam metadata e Open Graph básicos para melhorar título, descrição e compartilhamento.
- O favicon fica em `public/favicon.svg` e usa a paleta do projeto.
- O manifest fica em `public/manifest.webmanifest` e descreve o app/site com tema escuro.
- O sitemap é gerado por `src/app/sitemap.ts` e inclui as páginas públicas e posts do devlog.
- O robots é gerado por `src/app/robots.ts`, libera indexação pública e bloqueia `/dashboard`, `/admin` e `/api/`.
- A página 404 personalizada fica em `src/app/not-found.tsx` com o texto “Você se perdeu na névoa.”.
- Ao trocar o domínio oficial, atualize `metadataBase` em `src/app/layout.tsx`, `siteUrl` em `src/app/sitemap.ts` e `siteUrl` em `src/app/robots.ts`.

## O que funciona sem Supabase

- Páginas públicas: início, lore, personagens, studio, devlog, galeria e download.
- Página `/download` com status do beta e orientação de acesso.
- Página `/feedback` com validação de formulário no frontend.
- Página `/login` com campos de e-mail e senha, explicando que a conta será usada para acessar o beta.
- Dashboard em modo de preparação, com prévia do painel, checklist do jogador, botão de feedback e aviso de que o download real depende da configuração.
- Card de download em estado de prévia, sem expor arquivo, segredo ou link privado.

## O que funciona com Supabase

- Login e cadastro em `/login`.
- Sessão autenticada e acesso privado ao `/dashboard`.
- Preenchimento automático do email no feedback quando o usuário estiver logado.
- Salvamento real dos feedbacks na tabela `beta_feedback`.
- Fluxo legado de download para jogadores autenticados quando `NEXT_PUBLIC_BETA_DOWNLOAD_URL` estiver configurada. Para download privado real, siga `docs/DOWNLOAD_SECURITY_PLAN.md` e use Supabase Storage privado com whitelist e logs.

## Fluxo atual de login, dashboard e download

1. Sem Supabase configurado:
   O site continua navegável. `/login` mostra um aviso amigável de preparação, `/dashboard` abre como prévia do painel e o card de download explica que o acesso real ainda depende da autenticação.

2. Com Supabase configurado, mas sem whitelist ou build ativa:
   O usuário pode entrar no `/login`, acessar `/dashboard` e solicitar o download seguro. A API retorna "Acesso ao beta não liberado" quando a conta não está em `beta_access` ou "Build em preparação" quando não há build ativa.

3. Com Supabase, whitelist e build ativa configurados:
   O usuário autenticado vê o botão "Gerar download seguro" no dashboard. O site chama `POST /api/beta/download`, recebe uma URL assinada temporária do bucket privado e abre o link sem expor o caminho do Storage.

## Supabase

- Auth: login/cadastro no `/login`.
- Feedback: tabela `beta_feedback`.
- Guia principal e fonte oficial de configuração: `docs/SUPABASE_SETUP.md`.
- Guia auxiliar rápido da tabela `beta_feedback`: `docs/supabase-feedback.md` (deve espelhar a estrutura oficial do guia principal).
- Plano de segurança para download privado: `docs/DOWNLOAD_SECURITY_PLAN.md` (bucket `tester-beta-builds`, tabelas `beta_builds`, `beta_access`, `beta_download_logs` e rota server-side `POST /api/beta/download` para URL assinada).

Para ativar login real e feedback salvo no banco, siga primeiro `docs/SUPABASE_SETUP.md`. A tabela `beta_feedback` deve usar `id uuid primary key default gen_random_uuid()` e RLS com apenas `insert` para usuários autenticados, sem leitura pública dos feedbacks.

## Imagens públicas administráveis

O Admin permite preencher `imageUrl` e `altText` em itens da Galeria e nos Personagens. Essas imagens reais são opcionais: quando a URL está vazia ou falha ao carregar, o site mantém os previews/silhuetas abstratos para evitar cards quebrados.

Recomendações:

- use URLs públicas, estáveis e confiáveis para imagens do site;
- preencha `altText` com uma descrição curta e útil para acessibilidade;
- diferencie imagens públicas do site dos arquivos privados do beta: builds do jogo continuam no bucket privado `tester-beta-builds` e nunca devem ser publicadas como imagem ou link público;
- nesta etapa, Galeria e Personagens usam `<img>` com carregamento preguiçoso para aceitar URLs administráveis sem configurar domínios externos no `next.config.ts`.

## Feedbacks no Admin

Contas com `manage_feedback` ou `super_admin` podem acessar `/admin` e ver a seção **Feedbacks do beta**. A lista usa somente endpoints server-side (`GET /api/admin/feedback` e `PATCH /api/admin/feedback/[id]`), sem consultar Supabase diretamente no navegador.

Status disponíveis:

- `new`: feedback recém-enviado e ainda não triado.
- `reviewing`: feedback em análise pelo responsável do beta.
- `resolved`: retorno já tratado ou incorporado ao planejamento.
- `ignored`: retorno arquivado por duplicidade, falta de ação ou irrelevância para a build atual.

Para testar o fluxo: envie um feedback em `/feedback`, entre com uma conta autorizada em `/admin`, filtre por status/bug/versão/busca, atualize o status ou as notas administrativas e confira a alteração em `beta_feedback` no Supabase.

## Próximos passos técnicos

- Criar interface administrativa para gerenciar `beta_builds` e `beta_access`.
- Validar o fluxo completo de download seguro em um projeto Supabase real com bucket privado, whitelist e build ativa.
- Evoluir a área de feedbacks do Admin com paginação, responsáveis e métricas por versão.
