# DOWNLOAD SECURITY PLAN — Tester Beta

## Objetivo

Permitir a distribuição controlada do Tester Beta sem colocar executáveis no GitHub, sem expor chaves privadas e sem transformar o frontend em fonte de segredos.

## Estado atual do projeto

O site está preparado para a Beta 0.1 com um fluxo simples:

1. O usuário entra ou cria conta no site.
2. O Dashboard verifica a autenticação quando Supabase está configurado.
3. O componente `ProtectedDownloadCard` lê `NEXT_PUBLIC_BETA_DOWNLOAD_URL`.
4. Se o usuário estiver autenticado e a variável existir, o botão **Baixar Tester Beta 0.1** aparece.
5. Se a variável não existir, o estado exibido é **Download em preparação**.
6. Sem Supabase, o Dashboard continua acessível apenas como prévia segura, sem liberar arquivo real.

Nenhum arquivo do jogo deve ser enviado para o repositório.

## Opção atual: NEXT_PUBLIC_BETA_DOWNLOAD_URL

Esta é a opção de curto prazo.

### Como funciona

- A build do jogo é hospedada fora do GitHub.
- A URL é cadastrada na Vercel como `NEXT_PUBLIC_BETA_DOWNLOAD_URL`.
- O Dashboard mostra o botão de download apenas quando o usuário está autenticado e a variável está configurada.

### Vantagens

- Simples de configurar.
- Não exige backend novo.
- Funciona bem para testes pequenos com amigos ou poucos participantes.
- Permite ativar e remover o botão de download sem mudar o código.

### Limites e riscos

- Como a variável é pública no frontend, o link pode ser visto por quem inspecionar o site.
- Um tester pode compartilhar o link com outra pessoa.
- Não há expiração automática do link.
- Não há rastreio individual de quem baixou.

### Quando usar

Use esta opção apenas para beta fechado pequeno, com pessoas confiáveis, enquanto o projeto ainda está em validação inicial.

## Opção futura recomendada: Supabase Storage privado

Esta é a opção mais indicada para um beta fechado mais sério.

### Como funcionaria

1. A build fica em um bucket privado no Supabase Storage.
2. O usuário faz login.
3. O site solicita uma URL assinada de curta duração.
4. O usuário baixa o arquivo antes da URL expirar.
5. O link deixa de funcionar automaticamente depois do prazo.

### Vantagens

- O arquivo não fica público.
- O link pode expirar.
- O acesso pode ser ligado ao usuário autenticado.
- Permite controle melhor para beta fechado.

### Limites

- Exige uma função ou rota segura para gerar a URL assinada.
- Exige mais configuração no Supabase.
- Ainda não impede que alguém compartilhe o arquivo depois de baixar.

## Whitelist futura

Para controlar quem pode baixar, pode ser criada uma tabela como:

```sql
create table public.beta_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  allowed boolean not null default false,
  created_at timestamptz not null default now()
);
```

Com isso, apenas contas aprovadas poderiam receber link de download.

## Regras de segurança adotadas

- Não versionar build do jogo no Git.
- Não colocar executável no repositório.
- Não expor `service_role` ou qualquer segredo no frontend.
- Não fixar link privado no código-fonte.
- Usar `NEXT_PUBLIC_BETA_DOWNLOAD_URL` apenas como solução temporária.
- Preferir Supabase Storage privado para fases maiores do beta.

## Implementação atual no projeto

- `ProtectedDownloadCard` lê apenas `NEXT_PUBLIC_BETA_DOWNLOAD_URL`.
- Usuário não autenticado: mostra mensagem de acesso reservado e direciona para `/login`.
- Usuário autenticado sem `NEXT_PUBLIC_BETA_DOWNLOAD_URL`: mostra **Download em preparação**.
- Usuário autenticado com `NEXT_PUBLIC_BETA_DOWNLOAD_URL`: mostra **Baixar Tester Beta 0.1**.
- Sem Supabase configurado: o Dashboard mostra uma prévia segura do fluxo, sem liberar arquivo real.
- Nenhum arquivo do jogo é versionado no repositório.

## Recomendação para beta fechado

Para poucos amigos testarem agora, `NEXT_PUBLIC_BETA_DOWNLOAD_URL` é suficiente, desde que o link seja hospedado fora do GitHub e possa ser trocado caso seja compartilhado.

Para uma fase maior, a recomendação é migrar para:

1. Supabase Auth.
2. Tabela de whitelist `beta_access`.
3. Supabase Storage privado.
4. URL assinada com expiração curta.
5. Registro de feedback obrigatório em `beta_feedback`.
