export type DevlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
};

export const devlogPosts: DevlogPost[] = [
  {
    slug: "construindo-o-bosque-da-nevoa-perdida",
    title: "Construindo o Bosque da Névoa Perdida",
    date: "Data a definir",
    category: "Mundo",
    summary: "Primeiros blocos da região inicial: rotas conectadas, leitura de ambiente e atmosfera de névoa constante."
  },
  {
    slug: "criando-o-sistema-de-dash",
    title: "Criando o sistema de Dash",
    date: "Data a definir",
    category: "Gameplay",
    summary: "Estrutura inicial de mobilidade para combate e exploração, com foco em resposta e clareza de controle."
  },
  {
    slug: "primeiro-chefe-lucarelli",
    title: "Primeiro chefe: Lucarelli",
    date: "Data a definir",
    category: "Combate",
    summary: "Definição dos padrões de confronto de Lucarelli e do papel dele na progressão da primeira área."
  },
  {
    slug: "preparando-a-primeira-demo-jogavel",
    title: "Preparando a primeira demo jogável",
    date: "Data a definir",
    category: "Produção",
    summary: "Organização da build inicial para testes fechados, com foco em estabilidade e coleta de feedback."
  }
];
