import type { SiteContent } from "./adminTypes";

export const defaultSiteContent: SiteContent = {
  home: {
    id: "home-hero",
    eyebrow: "Protótipo jogável",
    title: "Protótipo",
    description: "Metroidvania 2D sombrio sobre trilhas conectadas, katana, Dash e leitura de rota em um mundo em construção."
  },
  lore: {
    id: "lore-intro",
    eyebrow: "Arquivo do Bosque",
    title: "Uma história contada por sinais.",
    description: "Protótipo acontece em um cenário marcado por ruínas, disciplina de combate, bloqueios de rota e memórias fragmentadas."
  },
  gallery: {
    intro: {
      id: "gallery-intro",
      eyebrow: "Vitrine visual",
      title: "Acervo visual em validação.",
      description: "A galeria separa imagens reais cadastradas no Admin, conceitos visuais e molduras abstratas usadas enquanto capturas finais ainda não estão prontas."
    },
    items: [
      {
        id: "bosque-trilha-norte",
        name: "Bosque · Trilha Norte",
        category: "Screenshots",
        status: "Prévia visual",
        description: "Estudo de iluminação e profundidade para uma trilha de progressão inicial.",
        detail: "Preview abstrato para leitura de trilha e profundidade; será substituído por captura real quando a cena estiver estável.",
        icon: "fog",
        visualKind: "screenshot",
        altText: "Preview abstrato da Trilha Norte do Bosque."
      },
      {
        id: "concept-ruinas",
        name: "Ruínas do Bosque",
        category: "Conceitos",
        status: "Em desenvolvimento",
        description: "Conceito visual de ruínas e símbolos para apoiar narrativa ambiental sem revelar respostas centrais.",
        detail: "Conceito abstrato para guiar tom, formas e sensação de vestígio antigo no Bosque.",
        icon: "ruin",
        visualKind: "concept",
        altText: "Conceito abstrato de ruínas do Bosque."
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
        description: "Área reservada para clipes curtos quando houver captura real de gameplay.",
        detail: "Espaço planejado para vídeo futuro, sem simular material que ainda não foi capturado.",
        icon: "platform",
        visualKind: "video",
        altText: "Moldura abstrata reservada para clipe futuro da build."
      },
      {
        id: "screenshot-atalho",
        name: "Atalho Pós-Dash",
        category: "Screenshots",
        status: "Prévia visual",
        description: "Preview de atalho liberado após progresso de mobilidade no Bosque.",
        detail: "Composição abstrata de rota e movimento, indicando progressão sem prometer layout final.",
        icon: "dash",
        visualKind: "screenshot",
        altText: "Preview abstrato de um atalho liberado após o Dash."
      }
    ]
  },
  characters: {
    intro: {
      id: "characters-intro",
      eyebrow: "Arquivo de elenco",
      title: "Elenco da Beta 0.1 e reservas futuras.",
      description: "Rubens e Lucarelli representam o foco jogável atual; Kin, Shico e outros nomes ficam marcados como reservas fora da Beta 0.1."
    },
    current: [
      {
        id: "rubens",
        name: "Rubens",
        functionLabel: "Protagonista jogável",
        projectState: "Confirmado na Beta 0.1",
        badge: "Jogável",
        icon: "katana",
        visualKind: "rubens",
        description: "Personagem controlado na experiência inicial, definido por combate de katana, leitura de arena e adaptação dentro do Bosque da Névoa Perdida.",
        betaRole: "Servir como base de movimentação, ataque, dash e evolução técnica durante os primeiros testes.",
        abilities: ["Katana", "Dash", "Exploração", "Progressão"],
        altText: "Representação visual de Rubens, protagonista jogável de Protótipo."
      },
      {
        id: "lucarelli",
        name: "Lucarelli",
        functionLabel: "Chefe inicial",
        projectState: "Confirmado na Beta 0.1",
        badge: "Chefe",
        icon: "boss",
        visualKind: "lucarelli",
        description: "Presença hostil que bloqueia a progressão inicial e exige domínio de posicionamento, tempo de ataque e leitura de padrão.",
        betaRole: "Validar o ritmo de combate, clareza de feedback e sensação de desafio no primeiro grande encontro.",
        abilities: ["Arena", "Padrões", "Pressão", "Teste de domínio"],
        altText: "Representação visual de Lucarelli, chefe inicial de Protótipo."
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
        functionLabel: "Reservado para futuro",
        projectState: "Fora da Beta 0.1",
        badge: "Reserva",
        icon: "future",
        visualKind: "future",
        description: "Nome reservado para expansões narrativas futuras, mantendo mistério sobre função, relação com Rubens e impacto no mundo.",
        betaRole: "Sinalizar expansão de universo sem participação prometida na build atual.",
        abilities: ["Reservado", "Reserva", "Lore", "Mistério"],
        altText: "Representação visual reservada de Kin, personagem futuro de Protótipo."
      },
      {
        id: "shico",
        name: "Shico",
        functionLabel: "Reservado para futuro",
        projectState: "Fora da Beta 0.1",
        badge: "Reserva",
        icon: "lore",
        visualKind: "future",
        description: "Figura mantida como pista para conteúdos posteriores, associada ao planejamento de universo e relações ainda não reveladas.",
        betaRole: "Sinalizar expansão de universo sem participação prometida na build atual.",
        abilities: ["Bloqueado", "Reserva", "Universo", "Segredo"],
        altText: "Representação visual reservada de Shico, personagem futuro de Protótipo."
      },
      {
        id: "conteudo-planejado",
        name: "Conteúdo reservado",
        functionLabel: "Arquivo reservado",
        projectState: "Fora da Beta 0.1",
        badge: "Reserva",
        icon: "lore",
        visualKind: "planned",
        description: "Espaço para nomes, ameaças e encontros que só serão definidos depois que o trecho inicial estiver validado.",
        betaRole: "Manter a página preparada para expansão sem prometer artes finais, funções definitivas ou presença na Beta 0.1.",
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
