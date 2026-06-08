export type DevlogSection = {
  heading: string;
  paragraphs: string[];
};

export type DevlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: DevlogSection[];
  progress: string[];
  nextSteps: string[];
};

export const devlogPosts: DevlogPost[] = [
  {
    slug: "construindo-o-bosque-da-nevoa-perdida",
    title: "Construindo o Bosque da Névoa Perdida",
    date: "Registro inicial",
    category: "Mundo",
    summary: "Primeiros blocos da região inicial: rotas conectadas, leitura de ambiente e atmosfera de névoa constante.",
    content: [
      {
        heading: "Objetivo da primeira área",
        paragraphs: [
          "O Bosque da Névoa Perdida é tratado como a área de validação inicial de Tester. Ele não precisa representar o mapa final inteiro, mas precisa provar que exploração, retorno por atalhos e leitura visual funcionam juntos.",
          "A prioridade do bloco atual é criar um caminho que o jogador consiga entender sem depender de explicações longas: uma trilha principal, desvios curtos, pontos de risco e sinais visuais que indiquem que há algo além da tela imediata."
        ]
      },
      {
        heading: "Como a névoa entra no gameplay",
        paragraphs: [
          "A névoa não é apenas tema visual. Ela serve para controlar contraste, esconder parcialmente rotas e reforçar a sensação de que o bosque precisa ser lido com calma. O cuidado aqui é não deixar a atmosfera atrapalhar a clareza do caminho.",
          "Por isso, a construção da área está sendo pensada em camadas: primeiro a navegação básica, depois riscos de combate, depois elementos de lore e, por último, acabamento visual."
        ]
      }
    ],
    progress: [
      "Definição do Bosque como área inicial de teste.",
      "Separação entre trilha principal, atalhos e pontos de retorno.",
      "Direção visual baseada em contraste entre névoa, ruínas e leitura de rota."
    ],
    nextSteps: [
      "Validar se o jogador entende para onde ir sem texto explicativo em excesso.",
      "Marcar quais bloqueios dependem de habilidade e quais dependem apenas de exploração.",
      "Substituir previews abstratos por capturas reais quando a área estiver estável."
    ]
  },
  {
    slug: "criando-o-sistema-de-dash",
    title: "Criando o sistema de Dash",
    date: "Registro de sistema",
    category: "Gameplay",
    summary: "Estrutura inicial de mobilidade para combate e exploração, com foco em resposta e clareza de controle.",
    content: [
      {
        heading: "Por que o Dash é importante",
        paragraphs: [
          "O Dash é uma das primeiras habilidades usadas para medir o ritmo de Tester. Ele precisa funcionar tanto como ferramenta de travessia quanto como recurso de sobrevivência em combate.",
          "A implementação está sendo pensada com uma regra simples: o jogador deve sentir resposta imediata, mas ainda precisa escolher bem quando usar. Se o Dash resolver tudo sozinho, o combate perde leitura; se for rígido demais, a exploração fica travada."
        ]
      },
      {
        heading: "Impacto no mapa",
        paragraphs: [
          "No mapa inicial, o Dash ajuda a criar rotas pós-habilidade sem prometer uma grande expansão antes da hora. A ideia é ter poucos bloqueios claros e úteis, capazes de mostrar o potencial de retorno típico de um metroidvania.",
          "Ainda é uma mecânica em ajuste. Distância, tempo de recuperação, colisão e feedback visual precisam ser testados junto com inimigos e plataformas reais."
        ]
      }
    ],
    progress: [
      "Definição do Dash como habilidade central da Beta 0.1.",
      "Planejamento de rotas que só fazem sentido depois de desbloquear mobilidade.",
      "Critérios de teste para resposta, distância e leitura durante combate."
    ],
    nextSteps: [
      "Testar o Dash em arenas pequenas antes de ampliar uso no mapa.",
      "Ajustar feedback visual e sonoro para deixar o uso mais legível.",
      "Medir se a habilidade melhora exploração sem quebrar desafio."
    ]
  },
  {
    slug: "primeiro-chefe-lucarelli",
    title: "Primeiro chefe: Lucarelli",
    date: "Registro de combate",
    category: "Combate",
    summary: "Definição dos padrões de confronto de Lucarelli e do papel dele na progressão da primeira área.",
    content: [
      {
        heading: "Função do encontro",
        paragraphs: [
          "Lucarelli é pensado como o primeiro grande teste de domínio do jogador. O objetivo não é criar um chefe enorme, e sim um confronto que confirme se movimentação, ataque, Dash e leitura de arena estão claros.",
          "O encontro deve cobrar aprendizado sem parecer injusto. Antes dele, os inimigos comuns precisam ensinar distância e tempo. Durante ele, a arena precisa deixar claro quando atacar, quando recuar e quando usar mobilidade."
        ]
      },
      {
        heading: "Escopo realista para a Beta 0.1",
        paragraphs: [
          "Para a Beta 0.1, Lucarelli deve funcionar como marco de progressão inicial, não como promessa de campanha completa. O foco é validar padrões, feedback de dano, ritmo de tentativa e clareza de derrota/vitória.",
          "A parte narrativa do chefe ainda pode crescer depois. Nesta fase, o mais importante é o combate ser compreensível e útil para coletar feedback."
        ]
      }
    ],
    progress: [
      "Definição de Lucarelli como chefe do beta inicial.",
      "Papel do chefe conectado ao aprendizado de movimento e posicionamento.",
      "Critérios de teste para arena, padrões e feedback de combate."
    ],
    nextSteps: [
      "Separar ataques em padrões simples antes de adicionar variações.",
      "Testar se o jogador entende a janela de punição após cada ação do chefe.",
      "Registrar feedback específico sobre dificuldade e clareza da arena."
    ]
  },
  {
    slug: "preparando-a-primeira-demo-jogavel",
    title: "Preparando a primeira demo jogável",
    date: "Registro de produção",
    category: "Produção",
    summary: "Organização da build inicial para testes fechados, com foco em estabilidade e coleta de feedback.",
    content: [
      {
        heading: "O que a primeira demo precisa provar",
        paragraphs: [
          "A primeira demo jogável de Tester não precisa vender uma versão final. Ela precisa responder perguntas práticas: o controle está claro? O mapa orienta o jogador? O combate tem leitura? A dificuldade parece ajustável?",
          "Por isso, o escopo da Beta 0.1 é limitado de propósito. É melhor testar um trecho pequeno com feedback útil do que prometer uma área grande sem estabilidade."
        ]
      },
      {
        heading: "Integração com o site",
        paragraphs: [
          "O site já foi preparado para apoiar esse ciclo: login, dashboard, download seguro, formulário de feedback e painel administrativo. Essa estrutura existe para organizar testes fechados sem expor build, links privados ou dados dos jogadores.",
          "A próxima etapa de conteúdo é transformar os retornos recebidos em decisões visíveis: ajustes de mapa, combate, requisitos e próximos registros de devlog."
        ]
      }
    ],
    progress: [
      "Definição do objetivo da Beta 0.1 como teste fechado e controlado.",
      "Preparação do site para login, feedback, whitelist e download privado.",
      "Separação entre escopo testável agora e ideias guardadas para depois."
    ],
    nextSteps: [
      "Validar o fluxo completo em Supabase real com usuário autorizado.",
      "Fechar checklist mínimo da build antes de liberar para testers.",
      "Publicar novos registros de devlog com decisões tomadas a partir do feedback."
    ]
  }
];
