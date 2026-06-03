# Configuração do Supabase para o site Tester

Este é o guia principal de configuração do Supabase para o site Tester. Ele explica como ativar login, dashboard autenticado e salvamento real do formulário de feedback. O arquivo `docs/supabase-feedback.md` é apenas um guia auxiliar rápido e deve permanecer sincronizado com esta estrutura oficial.

## 1. Criar o projeto no Supabase

1. Acesse o Supabase.
2. Crie uma conta ou faça login.
3. Clique em **New project**.
4. Escolha uma organização.
5. Defina um nome para o projeto, por exemplo `tester-beta`.
6. Escolha uma região próxima do público principal.
7. Aguarde a criação do projeto.

## 2. Pegar as variáveis públicas do projeto

No painel do Supabase:

1. Abra o projeto.
2. Vá em **Project Settings**.
3. Entre em **API**.
4. Copie a **Project URL**.
5. Copie a chave **anon public**.

Use esses valores assim:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Não use `service_role` no frontend. A chave `service_role` é privada e não deve ser colocada no repositório, no navegador ou em variáveis com prefixo `NEXT_PUBLIC_`. Para a rota segura de download, configure `SUPABASE_SERVICE_ROLE_KEY` apenas na Vercel como variável privada de servidor.

## 3. Colocar as variáveis na Vercel

1. Abra o projeto na Vercel.
2. Vá em **Settings**.
3. Entre em **Environment Variables**.
4. Adicione:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

5. Salve as variáveis.
6. Faça um novo deploy da branch `main`.

Se também existir um arquivo real da build beta, adicione depois:

```env
NEXT_PUBLIC_BETA_DOWNLOAD_URL
```

## 4. Configurar autenticação por email

No Supabase:

1. Vá em **Authentication**.
2. Entre em **Providers**.
3. Confirme que o provider de email está ativo.
4. Em **URL Configuration**, configure a URL do site publicado.

Para o deploy atual, use o domínio da Vercel do projeto. Se trocar de domínio no futuro, atualize essa configuração.

## Migração de autenticação: login/logout server-side

O fluxo antigo de autenticação fazia login diretamente no frontend com `supabase.auth.signInWithPassword` e copiava tokens para cookies usando `document.cookie`. Esse modelo foi mantido apenas como legado temporário em `src/lib/authCookie.ts`, mas não deve ser usado por novos fluxos.

O login comum agora deve passar pela rota server-side `POST /api/auth/login`:

1. o formulário envia `email` e `password` para a API interna;
2. a rota autentica com Supabase usando a anon key pública do projeto;
3. a rota define `tester-sb-access-token` e `tester-sb-refresh-token` via `Set-Cookie`;
4. os cookies são `HttpOnly`, `SameSite=Lax`, `Path=/` e `Secure` em produção;
5. a resposta JSON retorna apenas sucesso ou erro, nunca access token ou refresh token.

O logout comum agora deve passar pela rota server-side `POST /api/auth/logout`:

1. a rota tenta encerrar a sessão no Supabase quando recebe um access token válido;
2. a rota limpa os cookies `tester-sb-access-token` e `tester-sb-refresh-token` via `Set-Cookie`;
3. Navbar e Dashboard redirecionam o usuário para `/login` após a chamada.

Regras importantes:

- o frontend não deve receber tokens no JSON;
- os cookies principais de autenticação devem ser definidos pelo servidor;
- `SUPABASE_SERVICE_ROLE_KEY` não deve ser usada para login comum;
- login comum deve usar a anon key do Supabase;
- cadastro (`signUp`) ainda permanece no frontend temporariamente e será refinado em uma fase posterior;
- a validação client-side de sessão/perfil ainda existe como compatibilidade temporária até a Fase 3 migrar Dashboard/Admin para endpoints server-side dedicados.

### Fase 3: endpoints server-side de sessão e admin

A sessão do Dashboard, Navbar e Admin agora deve ser consultada por endpoints server-side, reduzindo a dependência de `supabase.auth.getUser()` no navegador.

Endpoints disponíveis:

- `GET /api/auth/me`: lê o cookie `tester-sb-access-token`, valida o usuário no servidor e retorna apenas `{ authenticated, user }`. Não retorna access token, refresh token ou perfil administrativo.
- `GET /api/admin/me`: lê o cookie `tester-sb-access-token`, valida o usuário no servidor, busca `profiles` e retorna somente dados mínimos do perfil, `allowed` e capacidades (`canAccessAdmin`, `canManageContent`, `canManageUsers`).

Regras da Fase 3:

- o frontend deve usar `/api/auth/me` para estado comum de sessão;
- o frontend deve usar `/api/admin/me` para estado de menu/admin;
- tokens nunca devem ser retornados no JSON;
- `SUPABASE_SERVICE_ROLE_KEY` continua proibida para autenticação comum;
- operações administrativas de escrita ainda serão migradas em fase posterior; por enquanto `adminApi.ts` permanece no projeto para evitar quebra ampla.

## 5. Criar a tabela `beta_feedback`

No Supabase, vá em **SQL Editor** e rode a estrutura oficial abaixo. A chave primária deve usar `uuid` e não deve ser substituída por outro padrão:

```sql
create table if not exists public.beta_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nickname text not null,
  email text not null,
  playtime text not null,
  progress_point text not null,
  movement_rating int not null check (movement_rating between 1 and 5),
  combat_rating int not null check (combat_rating between 1 and 5),
  map_rating int not null check (map_rating between 1 and 5),
  difficulty_rating int not null check (difficulty_rating between 1 and 5),
  found_bug boolean not null default false,
  bug_description text,
  suggestions text
);
```

## 6. Habilitar RLS

Ainda no SQL Editor, rode:

```sql
alter table public.beta_feedback enable row level security;
```

## 7. Criar policy para permitir envio autenticado

Para permitir que usuários autenticados enviem feedback:

```sql
create policy "Authenticated users can insert beta feedback"
on public.beta_feedback
for insert
to authenticated
with check (true);
```

Essa policy permite apenas inserir feedback para usuários autenticados. Ela não libera leitura pública dos registros; não crie policy de `select` pública para `beta_feedback`.

## 8. Testar login

1. Faça deploy com as variáveis configuradas.
2. Abra `/login`.
3. Crie uma conta com email e senha.
4. Confirme o email, se o Supabase solicitar.
5. Faça login.
6. Verifique se o site redireciona para `/dashboard`.

## 9. Testar feedback

1. Faça login.
2. Abra `/feedback`.
3. Preencha todos os campos obrigatórios.
4. Envie o formulário.
5. No Supabase, abra **Table Editor**.
6. Entre em `beta_feedback` e confirme se o registro apareceu.

## 10. Comportamento sem Supabase

O site foi preparado para não quebrar quando Supabase ainda não estiver configurado.

Sem as variáveis:

- `/login` mostra aviso de preparação.
- `/dashboard` abre em modo de prévia.
- `/feedback` valida o formulário localmente, mas não salva no banco.
- O build da Vercel continua funcionando.

## 11. Checklist rápido

Antes de considerar o Supabase pronto, confirme:

- `NEXT_PUBLIC_SUPABASE_URL` está na Vercel.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` está na Vercel.
- O provider de email está ativo.
- A tabela `beta_feedback` existe.
- RLS está ativo.
- A policy de insert foi criada.
- Login funciona.
- Feedback autenticado salva no banco.

## Administração, usuários e conteúdo público

O painel em `/admin` usa Supabase Auth, a tabela `profiles` para cargos/permissões e a tabela `site_content` para salvar textos, galeria e personagens em JSON. Execute este SQL no Supabase SQL Editor antes de liberar o painel em produção.

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin', 'super_admin')),
  permissions text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.site_content enable row level security;

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = uid
      and active = true
      and (
        role in ('admin', 'super_admin')
        or 'view_admin' = any(permissions)
        or 'manage_content' = any(permissions)
      )
  );
$$;

create or replace function public.can_manage_content(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = uid
      and active = true
      and (role in ('admin', 'super_admin') or 'manage_content' = any(permissions))
  );
$$;

create or replace function public.can_manage_users(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = uid
      and active = true
      and (role = 'super_admin' or 'manage_users' = any(permissions))
  );
$$;

create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.can_manage_users(auth.uid()));

create policy "profiles_update_super_admin"
on public.profiles for update
to authenticated
using (public.can_manage_users(auth.uid()))
with check (public.can_manage_users(auth.uid()));

create policy "site_content_public_read"
on public.site_content for select
to anon, authenticated
using (true);

create policy "site_content_admin_write"
on public.site_content for insert
to authenticated
with check (public.can_manage_content(auth.uid()));

create policy "site_content_admin_update"
on public.site_content for update
to authenticated
using (public.can_manage_content(auth.uid()))
with check (public.can_manage_content(auth.uid()));

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_user_profile();
```

### Criar o primeiro super administrador

Depois de criar sua conta pelo `/login`, execute uma única vez trocando o e-mail pelo seu:

```sql
update public.profiles
set role = 'super_admin', permissions = array['view_admin', 'manage_content', 'manage_users'], active = true
where email = 'seu-email@exemplo.com';
```

Permissões disponíveis:

- `view_admin`: visualiza o painel.
- `manage_content`: edita textos, galeria e personagens.
- `manage_users`: altera cargos, permissões e bloqueios de usuários.

Usuários com `role = 'user'` e sem permissões não veem o link de administração e são redirecionados caso tentem abrir `/admin` diretamente.

## Download privado do beta com Supabase Storage

`NEXT_PUBLIC_BETA_DOWNLOAD_URL` continua existindo apenas como fallback temporário legado. O Dashboard usa Supabase Storage privado, whitelist em banco e geração de URL assinada pela rota segura `POST /api/beta/download`. O frontend não deve gerar URL assinada diretamente nem conhecer chaves privadas. A rota usa `SUPABASE_SERVICE_ROLE_KEY`, que nunca pode ter prefixo `NEXT_PUBLIC_` e deve existir somente como variável privada de servidor na Vercel.

### 1. Criar bucket privado

Crie um bucket privado no Supabase Storage chamado `tester-beta-builds`. Pelo SQL Editor, você pode garantir o bucket com:

```sql
insert into storage.buckets (id, name, public)
values ('tester-beta-builds', 'tester-beta-builds', false)
on conflict (id) do update set public = false;
```

O arquivo do jogo não deve ficar no GitHub. Envie builds somente para esse bucket privado, por exemplo em caminhos como `windows/tester-beta-0.1.0.zip`.

Não crie policy pública de leitura em `storage.objects` para esse bucket. O acesso ao arquivo deve acontecer por URL assinada de curta duração gerada no servidor.

### 2. Criar tabelas de builds, whitelist e logs

```sql
create table if not exists public.beta_builds (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  storage_path text not null,
  platform text not null default 'Windows',
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.beta_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  allowed boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.beta_download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  build_id uuid references public.beta_builds(id) on delete set null,
  created_at timestamptz not null default now()
);
```

### 3. Habilitar RLS

```sql
alter table public.beta_builds enable row level security;
alter table public.beta_access enable row level security;
alter table public.beta_download_logs enable row level security;
```

### 4. Criar policies seguras

Estas policies usam as funções administrativas já documentadas neste guia: `public.can_manage_content(auth.uid())` e `public.can_manage_users(auth.uid())`.

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

Com esse desenho:

- usuários autenticados consultam apenas o próprio registro em `beta_access`;
- usuários comuns não alteram whitelist, não inserem builds e não listam logs de outros usuários;
- administradores/super administradores gerenciam builds, acessos e logs conforme permissões do projeto;
- a rota segura `POST /api/beta/download` valida sessão, whitelist e build ativa, gera uma URL assinada do Storage e registra o download em `beta_download_logs` usando credenciais server-side.

### 5. Fluxo da rota segura de download

A rota segura do Next.js `POST /api/beta/download` foi criada para:

1. validar a sessão Supabase do usuário;
2. consultar `beta_access` e exigir `allowed = true` para o usuário atual;
3. escolher a build ativa em `beta_builds`;
4. gerar URL assinada curta para o arquivo em `tester-beta-builds`;
5. inserir um registro em `beta_download_logs`;
6. devolver a URL assinada para o usuário autenticado no formato `{ downloadUrl, version, platform, expiresIn }`.

Não implemente geração de URL assinada diretamente no frontend e não use `NEXT_PUBLIC_BETA_DOWNLOAD_URL` nessa rota.

