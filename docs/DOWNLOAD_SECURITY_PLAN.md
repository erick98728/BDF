# DOWNLOAD SECURITY PLAN — Tester Beta

## Objetivo
Permitir distribuição controlada do beta sem expor arquivo real, tokens secretos ou links privados fixos no frontend público.

## Opções de arquitetura

### 1) Link manual temporário (curto prazo)
- Definir `NEXT_PUBLIC_BETA_DOWNLOAD_URL` no ambiente de deploy.
- Exibir botão somente no Dashboard autenticado.
- Rotacionar URL periodicamente.
- Vantagem: simples e rápida.
- Limite: URL ainda pode ser compartilhada entre usuários.

### 2) Supabase Storage com bucket privado (recomendado)
- Armazenar build no bucket privado.
- Usuário autenticado solicita URL assinada de curta duração.
- Download expira automaticamente.
- Vantagem: melhor controle e rastreabilidade.
- Limite: exige função/backend leve para assinar URL.

### 3) Página protegida por login
- Dashboard exige sessão autenticada.
- Download só aparece em área privada.
- Vantagem: camada mínima de proteção sem complexidade alta.
- Limite: não impede repasse manual do arquivo após download.

### 4) Whitelist futura
- Criar tabela de autorização (`beta_access`) vinculada ao usuário.
- Só usuários aprovados visualizam/recebem link.
- Vantagem: controle fino de convites beta.
- Limite: exige fluxo de gestão de acesso.

## Regras de segurança adotadas
- Não versionar build do jogo no Git.
- Não colocar executável no repositório.
- Não expor `service_role` ou qualquer segredo no frontend.
- Não fixar link privado em código-fonte público.

## Implementação atual no projeto
- `ProtectedDownloadCard` lê apenas `NEXT_PUBLIC_BETA_DOWNLOAD_URL`.
- Sem variável: mostra “Download em breve”.
- Com variável: mostra botão para download no Dashboard autenticado.
- Botão não é exibido em páginas públicas.
