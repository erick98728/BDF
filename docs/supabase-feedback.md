# Supabase Feedback (Protótipo)

> Guia auxiliar rápido para a tabela `beta_feedback`.
>
> O guia principal de configuração do Supabase é `docs/SUPABASE_SETUP.md`. Se houver dúvida ou divergência, use `docs/SUPABASE_SETUP.md` como fonte oficial e mantenha este arquivo sincronizado com ele.

## Estrutura oficial da tabela `beta_feedback`

Use `uuid` como chave primária para manter compatibilidade com o padrão oficial do projeto.

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

## Segurança e RLS

Habilite Row Level Security na tabela:

```sql
alter table public.beta_feedback enable row level security;
```

Permita apenas envio de feedback por usuários autenticados:

```sql
create policy "Authenticated users can insert beta feedback"
on public.beta_feedback
for insert
to authenticated
with check (true);
```

Não crie policy de `select` pública para `beta_feedback`. Os feedbacks enviados por jogadores não devem ficar disponíveis para leitura anônima ou pública.
