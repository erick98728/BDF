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
- `NEXT_PUBLIC_BETA_DOWNLOAD_URL`: link público/controlado da build beta para Windows. É opcional enquanto a build estiver em preparação.

O arquivo `.env.example` lista todas as chaves esperadas pelo projeto.

## Publicando na Vercel

1. Importe o repositório `erick98728/BDF` na Vercel.
2. Confirme que o framework detectado é Next.js.
3. Em Project Settings > Environment Variables, cadastre as variáveis acima.
4. Faça o deploy da branch `main`.
5. Depois do deploy, teste `/`, `/download`, `/feedback`, `/login` e `/dashboard`.

Se o Supabase ainda não estiver configurado, o deploy continua funcionando. O site mostra os fluxos em modo de preparação.

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
- Fluxo de download para jogadores autenticados quando `NEXT_PUBLIC_BETA_DOWNLOAD_URL` estiver configurada.

## Fluxo atual de login, dashboard e download

1. Sem Supabase configurado:
   O site continua navegável. `/login` mostra um aviso amigável de preparação, `/dashboard` abre como prévia do painel e o card de download explica que o acesso real ainda depende da autenticação.

2. Com Supabase configurado, mas sem `NEXT_PUBLIC_BETA_DOWNLOAD_URL`:
   O usuário pode entrar no `/login`, acessar `/dashboard` e ver o status "Download em preparação".

3. Com Supabase e `NEXT_PUBLIC_BETA_DOWNLOAD_URL` configurados:
   O usuário autenticado vê o botão "Baixar beta" no dashboard. O arquivo do jogo não fica no repositório; o site apenas lê o link público/controlado do ambiente.

## Supabase

- Auth: login/cadastro no `/login`.
- Feedback: tabela `beta_feedback`.
- SQL base: `docs/supabase-feedback.md`.
- Plano de segurança para download: `docs/DOWNLOAD_SECURITY_PLAN.md`.

## Próximos passos técnicos

- Gerar URL assinada de download via Supabase Storage privado.
- Criar whitelist de beta testers.
- Criar página de histórico de feedback para o desenvolvedor.
