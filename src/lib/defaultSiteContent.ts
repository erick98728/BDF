import type { SiteContent } from "./adminTypes";

export const defaultSiteContent: SiteContent = {
  home: {
    id: "home-hero",
    eyebrow: "Beta em desenvolvimento",
    title: "Tester",
    description: "Metroidvania 2D sombrio sobre exploração, katana, névoa e segredos em um mundo conectado."
  },
  lore: {
    id: "lore-intro",
    eyebrow: "Arquivo da névoa",
    title: "Uma história contada por sinais.",
    description: "Tester acontece em um cenário marcado por ruínas, disciplina de combate e uma força ambiental que altera caminhos, criaturas e memórias."
  },
  gallery: {
    intro: {
      id: "gallery-intro",
      eyebrow: "Vitrine visual",
      title: "Prévia do acervo em produção.",
      description: "Esta galeria usa molduras e previews abstratos para apresentar direção visual, conceitos e espaços reservados sem fingir que existem artes finais prontas."
    },
    items: [
      {
        id: "bosque-trilha-norte",
        name: "Bosque · Trilha Norte",
        category: "Screenshots",
        status: "Prévia visual",
        description: "Registro preliminar de iluminação e profundidade da névoa em rota de progressão inicial.",
        detail: "Foco visual em leitura de trilha, profundidade e atmosfera sem representar um print final da build.",
        icon: "fog",
        visualKind: "screenshot",
        altText: "Prévia visual abstrata da Trilha Norte do Bosque da Névoa."
      },
      {
        id: "concept-ruinas",
        name: "Ruínas da Névoa",
        category: "Conceitos",
        status: "Em desenvolvimento",
        description: "Estudo visual de ruínas e símbolos para reforçar leitura narrativa sem exposição total da lore.",
        detail: "Conceito abstrato para guiar tom, formas e sensação de vestígio antigo no Bosque.",
        icon: "ruin",
        visualKind: "concept",
        altText: "Conceito abstrato de ruínas envoltas pela névoa."
      },
      {
        id: "rubens-pose",
        name: "Rubens · Pose Base",
        category: "Personagens",
        status: "Em desenvolvimento",
        description: "Exploração de silhueta e postura de combate para o protagonista em cenas de promoção.",
        detail: "Representação simbólica com katana e energia, sem substituir arte final do personagem.",
        icon: "katana",
        visualKind: "character",
        altText: "Silhueta abstrata de Rubens em pose base com katana."
      },
      {
        id: "clareira-hostil",
        name: "Clareira Hostil",
        category: "Cenários",
        status: "Prévia visual",
        description: "Bloco visual de ambiente com foco em contraste, risco de combate e rotas ocultas.",
        detail: "Prévia de clima e composição, pensada para sugerir perigo sem virar mapa completo da região.",
        icon: "enemy",
        visualKind: "scene",
        altText: "Prévia visual abstrata de uma clareira hostil do Bosque."
      },
      {
        id: "teaser-devlog",
        name: "Teaser de Build",
        category: "Vídeos",
        status: "Em desenvolvimento",
        description: "Área reservada para futuros clipes de progresso técnico e demonstração de gameplay.",
        detail: "Espaço visual preparado para vídeos futuros, sem simular captura real inexistente.",
        icon: "platform",
        visualKind: "video",
        altText: "Moldura abstrata reservada para um teaser futuro da build."
      },
      {
        id: "screenshot-atalho",
        name: "Atalho Pós-Dash",
        category: "Screenshots",
        status: "Prévia visual",
        description: "Preview de rota alternativa desbloqueada após progresso de mobilidade no Bosque.",
        detail: "Composição abstrata de rota e movimento, indicando progressão sem prometer layout final.",
        icon: "dash",
        visualKind: "screenshot",
        altText: "Prévia abstrata de um atalho liberado após o dash."
      }
    ]
  },
  characters: {
    intro: {
      id: "characters-intro",
      eyebrow: "Arquivo de elenco",
      title: "Perfis visuais sem arte final.",
      description: "Os cards usam símbolos, silhuetas e marcas abstratas para apresentar função, estado do projeto e papel no beta sem fingir que as artes finais já existem."
    },
    current: [
      {
        id: "rubens",
        name: "Rubens",
        functionLabel: "Protagonista jogável",
        projectState: "Confirmado no beta",
        badge: "Jogável",
        icon: "katana",
        visualKind: "rubens",
        description: "Personagem controlado na experiência inicial, definido por combate de katana, leitura de arena e adaptação dentro do Bosque da Névoa Perdida.",
        betaRole: "Servir como base de movimentação, ataque, dash e evolução técnica durante os primeiros testes.",
        abilities: ["Katana", "Dash", "Exploração", "Progressão"],
        altText: "Representação visual de Rubens, protagonista jogável de Tester."
      },
      {
        id: "lucarelli",
        name: "Lucarelli",
        functionLabel: "Chefe do beta",
        projectState: "Confirmado no beta",
        badge: "Chefe",
        icon: "boss",
        visualKind: "lucarelli",
        description: "Presença hostil que bloqueia a progressão inicial e exige domínio de posicionamento, tempo de ataque e leitura de padrão.",
        betaRole: "Validar o ritmo de combate, clareza de feedback e sensação de desafio no primeiro grande encontro.",
        abilities: ["Arena", "Padrões", "Pressão", "Teste de domínio"],
        altText: "Representação visual de Lucarelli, chefe do beta de Tester."
      }
    ],
    enemies: [
      {
        id: "inimigos-bosque",
        name: "Inimigos do Bosque",
        functionLabel: "Ameaça constante",
        projectState: "Em teste",
        badge: "Inimigos",
        icon: "enemy",
        visualKind: "enemy",
        description: "Criaturas de ambiente que ensinam ritmo, distância, controle de posição e cuidado antes dos encontros maiores.",
        betaRole: "Criar pressão sem roubar foco da exploração, ajudando a medir dificuldade e legibilidade dos combates comuns.",
        abilities: ["Patrulha", "Pressão", "Leitura", "Risco"],
        altText: "Representação visual dos inimigos comuns do Bosque da Névoa."
      }
    ],
    future: [
      {
        id: "kin",
        name: "Kin",
        functionLabel: "Personagem futuro",
        projectState: "Planejado",
        badge: "Futuro",
        icon: "future",
        visualKind: "future",
        description: "Nome reservado para expansões narrativas futuras, mantendo mistério sobre função, relação com Rubens e impacto no mundo.",
        betaRole: "Representar o planejamento de universo, sem prometer participação ativa na build atual.",
        abilities: ["Reservado", "Futuro", "Lore", "Mistério"],
        altText: "Representação visual reservada de Kin, personagem futuro de Tester."
      },
      {
        id: "shico",
        name: "Shico",
        functionLabel: "Personagem futuro",
        projectState: "Planejado",
        badge: "Futuro",
        icon: "lore",
        visualKind: "future",
        description: "Figura mantida como pista para conteúdos posteriores, associada ao planejamento de universo e relações ainda não reveladas.",
        betaRole: "Representar o planejamento de universo, sem prometer participação ativa na build atual.",
        abilities: ["Bloqueado", "Futuro", "Névoa", "Segredo"],
        altText: "Representação visual reservada de Shico, personagem futuro de Tester."
      },
      {
        id: "conteudo-planejado",
        name: "Conteúdo planejado",
        functionLabel: "Arquivo reservado",
        projectState: "Em preparação",
        badge: "Planejado",
        icon: "lore",
        visualKind: "planned",
        description: "Espaço para novos personagens, ameaças e encontros que serão definidos conforme o mapa, a lore e o beta evoluírem.",
        betaRole: "Manter a página preparada para expansão sem inventar artes finais, funções definitivas ou promessas grandes demais.",
        abilities: ["Reservado", "Expansão", "Sem arte final", "A definir"],
        altText: "Representação visual abstrata de conteúdo planejado para personagens futuros."
      }
    ]
  }
};

export function mergeSiteContent(content?: Partial<SiteContent> | null): SiteContent {
  return {
    ...defaultSiteContent,
    ...content,
    home: { ...defaultSiteContent.home, ...content?.home },
    lore: { ...defaultSiteContent.lore, ...content?.lore },
    gallery: {
      ...defaultSiteContent.gallery,
      ...content?.gallery,
      intro: { ...defaultSiteContent.gallery.intro, ...content?.gallery?.intro },
      items: content?.gallery?.items?.length ? content.gallery.items : defaultSiteContent.gallery.items
    },
    characters: {
      ...defaultSiteContent.characters,
      ...content?.characters,
      intro: { ...defaultSiteContent.characters.intro, ...content?.characters?.intro },
      current: content?.characters?.current?.length ? content.characters.current : defaultSiteContent.characters.current,
      enemies: content?.characters?.enemies?.length ? content.characters.enemies : defaultSiteContent.characters.enemies,
      future: content?.characters?.future?.length ? content.characters.future : defaultSiteContent.characters.future
    }
  };
}
