# DOWNLOAD SECURITY PLAN — Protótipo Beta

## Objetivo

Permitir a distribuição controlada do Protótipo Beta sem colocar executáveis no GitHub, sem expor chaves privadas e sem transformar o frontend em fonte de segredos.

## Status da Etapa 2

A base recomendada para download privado passa a ser:

1. Supabase Auth para identificar o usuário.
2. Supabase Storage privado com bucket `tester-beta-builds`.
3. Tabela `beta_builds` para registrar versões e caminhos dos arquivos.
4. Tabela `beta_access` para lista de testadores beta.
5. Tabela `beta_download_logs` para auditoria de downloads.
6. Rota segura `POST /api/beta/download` do Next.js para gerar URL assinada de curta duração.

`NEXT_PUBLIC_BETA_DOWNLOAD_URL` ainda existe no projeto como fallback temporário e não deve ser removida nesta etapa, mas não é o modelo recomendado para uma distribuição privada real.

## Regra principal sobre arquivos da build

Nenhum arquivo do jogo deve ser enviado para o GitHub ou versionado no repositório.

A build deve ser enviada apenas para o bucket privado `tester-beta-builds` no Supabase Storage. Exemplos de caminhos internos no bucket:

- `windows/tester-beta-0.1.0.zip`
- `windows/tester-beta-0.1.1.zip`

O bucket deve permanecer privado. Não crie policy pública de leitura para os objetos da build.

## Bucket privado no Supabase Storage

Crie um bucket privado chamado `tester-beta-builds`.

Pelo SQL Editor, você pode garantir que ele exista e permaneça privado com:

```sql
insert into storage.buckets (id, name, public)
values ('tester-beta-builds', 'tester-beta-builds', false)
on conflict (id) do update set public = false;
```

Também é possível criar pelo painel do Supabase em **Storage > New bucket**, usando exatamente o nome `tester-beta-builds` e mantendo a opção pública desativada.

## Tabelas necessárias

### `beta_builds`

Armazena as builds disponíveis, versão, plataforma e caminho do arquivo no Storage.

```sql
create table if not exists public.beta_builds (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  storage_path text not null,
  platform text not null default 'Windows',
  active boolean not null default false,
  created_at timestamptz not null default now()
);
```

### `beta_access`

Controla quais usuários autenticados podem baixar o beta.

```sql
create table if not exists public.beta_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  allowed boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `beta_download_logs`

Registra downloads emitidos pela rota segura de download.

```sql
create table if not exists public.beta_download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  build_id uuid references public.beta_builds(id) on delete set null,
  created_at timestamptz not null default now()
);
```

## Row Level Security

Habilite RLS nas três tabelas:

```sql
alter table public.beta_builds enable row level security;
alter table public.beta_access enable row level security;
alter table public.beta_download_logs enable row level security;
```

## Policies recomendadas

As policies abaixo dependem das funções administrativas já documentadas em `docs/SUPABASE_SETUP.md`:

- `public.can_manage_content(auth.uid())`
- `public.can_manage_users(auth.uid())`

```sql
create policy "Admins can read beta builds"
on public.beta_builds for select
to authenticated
using (public.can_manage_content(auth.uid()));

create policy "Admins can insert beta builds"
on public.beta_builds for insert
to authenticated
with check (public.can_manage_content(auth.uid()));

create policy "Admins can update beta builds"
on public.beta_builds for update
to authenticated
using (public.can_manage_content(auth.uid()))
with check (public.can_manage_content(auth.uid()));

create policy "Admins can delete beta builds"
on public.beta_builds for delete
to authenticated
using (public.can_manage_content(auth.uid()));

create policy "Users can read own beta access"
on public.beta_access for select
to authenticated
using (user_id = auth.uid() or public.can_manage_users(auth.uid()));

create policy "Admins can insert beta access"
on public.beta_access for insert
to authenticated
with check (public.can_manage_users(auth.uid()));

create policy "Admins can update beta access"
on public.beta_access for update
to authenticated
using (public.can_manage_users(auth.uid()))
with check (public.can_manage_users(auth.uid()));

create policy "Admins can delete beta access"
on public.beta_access for delete
to authenticated
using (public.can_manage_users(auth.uid()));

create policy "Users can read own beta download logs"
on public.beta_download_logs for select
to authenticated
using (user_id = auth.uid() or public.can_manage_users(auth.uid()));

create policy "Admins can insert beta download logs"
on public.beta_download_logs for insert
to authenticated
with check (public.can_manage_users(auth.uid()) or public.can_manage_content(auth.uid()));

create policy "Admins can delete beta download logs"
on public.beta_download_logs for delete
to authenticated
using (public.can_manage_users(auth.uid()));
```

Essas regras reduzem exposição porque:

- usuários autenticados consultam apenas o próprio registro em `beta_access`;
- usuários comuns não alteram `beta_access`;
- usuários comuns não inserem builds;
- usuários comuns não listam logs de outros usuários;
- admins/super admins gerenciam builds, acessos e logs usando as permissões já existentes do projeto.

## Fluxo seguro implementado

A geração da URL assinada é feita pela rota segura `POST /api/beta/download` do Next.js, não diretamente pelo frontend. A rota usa `SUPABASE_SERVICE_ROLE_KEY` no servidor para validar dados e gerar a URL assinada.

A rota:

1. validar a sessão do usuário;
2. verificar em `beta_access` se `allowed = true` para `auth.uid()`;
3. buscar a build ativa em `beta_builds`;
4. gerar uma URL assinada de curta duração para `storage_path` no bucket `tester-beta-builds`;
5. registrar o evento em `beta_download_logs`;
6. retornar apenas a URL assinada temporária e dados básicos da build (`downloadUrl`, `version`, `platform`, `expiresIn`).


## Variável privada obrigatória no servidor

Configure esta variável apenas no ambiente de servidor da Vercel:

```env
SUPABASE_SERVICE_ROLE_KEY=
```

Regras obrigatórias:

- nunca coloque `SUPABASE_SERVICE_ROLE_KEY` no frontend;
- nunca use prefixo `NEXT_PUBLIC_` nessa variável;
- nunca versionar valor real no GitHub;
- use a chave apenas em API routes, server actions ou outros contextos server-side;
- mantenha `NEXT_PUBLIC_BETA_DOWNLOAD_URL` apenas como fallback legado, sem uso pela rota segura.

## Modelo temporário legado: `NEXT_PUBLIC_BETA_DOWNLOAD_URL`

O projeto mantém `NEXT_PUBLIC_BETA_DOWNLOAD_URL` apenas como fallback legado documentado, mas o card principal do Dashboard agora usa `POST /api/beta/download` para gerar o download seguro.

Não use `NEXT_PUBLIC_BETA_DOWNLOAD_URL` para o fluxo privado. Como variáveis públicas podem ser vistas no frontend, qualquer link ali configurado pode ser inspecionado, compartilhado e usado sem auditoria individual.

## Regras de segurança adotadas

- Não versionar build do jogo no Git.
- Não colocar executável no repositório.
- Não expor `service_role`, `SUPABASE_SERVICE_ROLE_KEY` ou qualquer segredo no frontend.
- Não fixar link privado no código-fonte.
- Manter `NEXT_PUBLIC_BETA_DOWNLOAD_URL` apenas como fallback temporário.
- Usar Supabase Storage privado para fases maiores do beta.
- Gerar URL assinada somente por rota segura server-side (`POST /api/beta/download`).
- Registrar downloads em `beta_download_logs`.
