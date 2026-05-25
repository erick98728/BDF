# Tester — Site Oficial

## Rodando localmente
```bash
npm install
npm run dev
```

## Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_BETA_DOWNLOAD_URL` (opcional)

## Supabase
- Auth: login/cadastro no `/login`.
- Dashboard privado em `/dashboard`.
- Feedback pronto para tabela `beta_feedback`.
- SQL base: `docs/supabase-feedback.md`.

## Deploy (Vercel)
1. Conectar repositório na Vercel.
2. Definir variáveis de ambiente no projeto.
3. Deploy.

## Próximos passos
- URL assinada de download via Supabase Storage privado.
- Whitelist de beta testers.
- Página de histórico de feedback para o desenvolvedor.
