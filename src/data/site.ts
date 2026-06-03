import type { GameGlyphName } from "@/components/GameGlyph";

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/download", label: "Download" },
  { href: "/lore", label: "Lore" },
  { href: "/personagens", label: "Personagens" },
  { href: "/studio", label: "Studio" },
  { href: "/devlog", label: "Devlog" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/galeria", label: "Galeria" },
  { href: "/login", label: "Login" }
];

export const homePillars: { title: string; eyebrow: string; description: string; icon: GameGlyphName }[] = [
  { title: "Explorar", eyebrow: "Mapa", icon: "map", description: "Rotas conectadas, atalhos e retornos que fazem o Bosque parecer vivo." },
  { title: "Dominar", eyebrow: "Técnica", icon: "katana", description: "Combate de precisão com katana, leitura de distância e uso consciente do Dash." },
  { title: "Investigar", eyebrow: "Mistério", icon: "ruin", description: "Ruínas, símbolos e névoa contam a história sem explicar tudo de imediato." }
];

export const homeFeatures: { title: string; description: string; icon: GameGlyphName }[] = [
  { title: "Exploração interconectada", icon: "map", description: "Mapas com caminhos que se conectam, atalhos e segredos que recompensam observação." },
  { title: "Combate com katana", icon: "katana", description: "Confrontos de precisão com leitura de tempo, distância e postura dos inimigos." },
  { title: "Habilidades desbloqueáveis", icon: "dash", description: "Progressão baseada em habilidades que ampliam combate, mobilidade e acesso a novas rotas." },
  { title: "Chefes marcantes", icon: "boss", description: "Encontros focados em padrão, adaptação e execução técnica, começando por Lucarelli." },
  { title: "Mundo sombrio", icon: "fog", description: "Ambientes densos com atmosfera opressiva, névoa e identidade visual própria." },
  { title: "Lore misteriosa", icon: "ruin", description: "Narrativa indireta construída por ruínas, símbolos, personagens e perguntas sem resposta imediata." }
];

export const characters: { name: string; role: string; bio: string; icon: GameGlyphName }[] = [
  { name: "Rubens", role: "Protagonista", icon: "katana", bio: "Personagem jogável da fase beta, guiado por técnica, coragem e adaptação dentro do Bosque da Névoa Perdida." },
  { name: "Lucarelli", role: "Chefe do beta", icon: "boss", bio: "Presença hostil que bloqueia a progressão inicial e testa domínio de movimentação, ataque e leitura de arena." },
  { name: "Inimigos do Bosque", role: "Ameaça constante", icon: "enemy", bio: "Criaturas do ambiente usadas para ensinar ritmo, distância, cuidado e controle de posição." },
  { name: "Conteúdo planejado", role: "Personagens futuros", icon: "future", bio: "Novos rostos e conflitos serão revelados conforme o universo e as próximas áreas forem expandidos." }
];

export const devlogs: { title: string; date: string; excerpt: string; icon: GameGlyphName }[] = [
  { title: "Estado atual do combate", date: "Maio 2026", icon: "katana", excerpt: "Ajustes de ritmo, janela de resposta e feedback visual para tornar cada encontro mais legível." },
  { title: "Primeira versão do Bosque", date: "Abril 2026", icon: "fog", excerpt: "Definição de trilhas, pontos de risco, atalhos e caminhos de habilidade da área inicial." },
  { title: "Direção de arte da névoa", date: "Março 2026", icon: "ruin", excerpt: "Estudos de cor e contraste para equilibrar mistério, clareza e performance." }
];
