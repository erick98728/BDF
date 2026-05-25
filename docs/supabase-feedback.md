# Supabase Feedback (Tester)

Tabela sugerida: `beta_feedback`

```sql
create table if not exists public.beta_feedback (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
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

Habilite RLS e crie policy de INSERT apenas para usuários autenticados.
