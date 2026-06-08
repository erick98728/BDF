import type { GameGlyphName } from "@/components/GameGlyph";

export type RoadmapStatus = "done" | "testing" | "next" | "future";

export type RoadmapItem = {
  title: string;
  description: string;
  scope: string;
  status: RoadmapStatus;
  icon: GameGlyphName;
};

export type RoadmapGroup = {
  title: string;
  description: string;
  status: RoadmapStatus;
  items: RoadmapItem[];
};

export const roadmapGroups: RoadmapGroup[] = [
  {
    title: "Já implementado / funcional",
    description: "Base que já existe no projeto ou no site e sustenta os testes fechados.",
    status: "done",
    items: [
      {
        title: "Site público e identidade inicial",
        description: "Páginas públicas, navegação, galeria, personagens, lore, studio e devlog estão estruturados para apresentar o projeto sem depender do Admin.",
        scope: "Site oficial",
        status: "done",
        icon: "platform"
      },
      {
        title: "Fluxo de conta e dashboard",
        description: "Login server-side, cookies HttpOnly, dashboard privado e estado visual de download seguro já estão conectados ao site.",
        scope: "Portal do tester",
        status: "done",
        icon: "user"
      },
      {
        title: "Feedback privado do beta",
        description: "O formulário público envia feedback para rota server-side e o Admin possui triagem com status e notas administrativas.",
        scope: "Beta 0.1",
        status: "done",
        icon: "feedback"
      }
    ]
  },
  {
    title: "Em desenvolvimento / em teste",
    description: "Partes centrais da experiência jogável que ainda precisam de validação antes de qualquer divulgação maior.",
    status: "testing",
    items: [
      {
        title: "Bosque da Névoa Perdida",
        description: "Área inicial usada para validar leitura de rota, atmosfera, atalhos e retorno após habilidade.",
        scope: "Beta 0.1",
        status: "testing",
        icon: "fog"
      },
      {
        title: "Movimento, katana e Dash",
        description: "Conjunto base de controle, ataque e mobilidade que define o ritmo do primeiro trecho jogável.",
        scope: "Teste interno",
        status: "testing",
        icon: "dash"
      },
      {
        title: "Lucarelli como chefe inicial",
        description: "Encontro pensado para testar leitura de arena, padrões simples, dificuldade e resposta do combate.",
        scope: "Beta 0.1",
        status: "testing",
        icon: "boss"
      }
    ]
  },
  {
    title: "Melhorias em seguida",
    description: "Melhorias planejadas para tornar a Beta 0.1 mais clara, estável e fácil de avaliar.",
    status: "next",
    items: [
      {
        title: "Capturas reais na galeria",
        description: "Substituir previews abstratos por imagens reais quando as cenas estiverem estáveis o suficiente para divulgação.",
        scope: "Site público",
        status: "next",
        icon: "gallery"
      },
      {
        title: "Checklist final da build",
        description: "Validar checkpoints, respawn, HUD inicial, bugs bloqueantes e caminho mínimo antes de liberar para testers.",
        scope: "Antes da liberação",
        status: "next",
        icon: "checklist"
      },
      {
        title: "Métricas do feedback",
        description: "Usar os feedbacks recebidos para priorizar ajustes de mapa, dificuldade, combate e clareza visual.",
        scope: "Após primeiros testes",
        status: "next",
        icon: "status"
      }
    ]
  },
  {
    title: "Reservado para depois",
    description: "Ideias guardadas para depois da Beta 0.1. Não possuem data definida e podem mudar conforme o ciclo de feedback.",
    status: "future",
    items: [
      {
        title: "Novas áreas conectadas",
        description: "Expandir o mundo além do Bosque somente depois que o trecho inicial estiver validado.",
        scope: "Sem data definida",
        status: "future",
        icon: "map"
      },
      {
        title: "Mais personagens e conflitos",
        description: "Aprofundar Kin, Shico e novos encontros sem prometer participação na build atual.",
        scope: "Pós Beta 0.1",
        status: "future",
        icon: "future"
      },
      {
        title: "Trailer e página de mídia final",
        description: "Criar materiais de divulgação apenas quando houver cenas reais, ritmo mais estável e identidade visual consolidada.",
        scope: "Sem data definida",
        status: "future",
        icon: "content"
      }
    ]
  }
];
