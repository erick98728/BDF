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
  { title: "Explorar", eyebrow: "Mapa", icon: "map", description: "Trilhas, clareiras e atalhos que ajudam a testar leitura de rota no trecho inicial." },
  { title: "Dominar", eyebrow: "Técnica", icon: "katana", description: "Katana, distância e Dash usados para validar resposta de controle e ritmo de arena." },
  { title: "Investigar", eyebrow: "Mistério", icon: "ruin", description: "Ruínas, bloqueios e marcas ambientais contam partes da história sem longas explicações." }
];

export const homeFeatures: { title: string; description: string; icon: GameGlyphName }[] = [
  { title: "Exploração interconectada", icon: "map", description: "Caminhos conectados, retornos curtos e bloqueios que recompensam observação." },
  { title: "Combate com katana", icon: "katana", description: "Confrontos de precisão com leitura de tempo, distância e postura dos inimigos." },
  { title: "Habilidades desbloqueáveis", icon: "dash", description: "Dash e habilidades em validação para abrir atalhos, travessias e novas leituras de arena." },
  { title: "Chefes marcantes", icon: "boss", description: "Encontros focados em padrão, adaptação e execução técnica, começando por Lucarelli." },
  { title: "Mundo sombrio", icon: "fog", description: "Clareiras, ruínas e corredores com contraste forte para testar atmosfera sem perder legibilidade." },
  { title: "Lore misteriosa", icon: "ruin", description: "Narrativa indireta construída por ruínas, símbolos, personagens e perguntas reservadas para evolução gradual." }
];

export const characters: { name: string; role: string; bio: string; icon: GameGlyphName }[] = [
  { name: "Rubens", role: "Protagonista", icon: "katana", bio: "Personagem jogável do protótipo inicial, guiado por técnica, coragem e adaptação nas trilhas do Bosque." },
  { name: "Lucarelli", role: "Chefe inicial", icon: "boss", bio: "Presença hostil que bloqueia a progressão inicial e testa domínio de movimentação, ataque e leitura de arena." },
  { name: "Inimigos do Bosque", role: "Ameaça constante", icon: "enemy", bio: "Criaturas do ambiente usadas para ensinar ritmo, distância, cuidado e controle de posição." },
  { name: "Conteúdo reservado", role: "Fora da Beta 0.1", icon: "future", bio: "Rostos guardados para depois da Beta 0.1, sem papel prometido na build atual." }
];

export const devlogs: { title: string; date: string; excerpt: string; icon: GameGlyphName }[] = [
  { title: "Estado atual do combate", date: "Maio 2026", icon: "katana", excerpt: "Ajustes de ritmo, janela de resposta e feedback visual para tornar cada encontro mais legível." },
  { title: "Primeira versão do Bosque", date: "Abril 2026", icon: "fog", excerpt: "Definição de trilhas, pontos de risco, atalhos e caminhos de habilidade da área inicial." },
  { title: "Direção de arte do Bosque", date: "Março 2026", icon: "ruin", excerpt: "Estudos de cor e contraste para equilibrar atmosfera, clareza de rota e performance." }
];
