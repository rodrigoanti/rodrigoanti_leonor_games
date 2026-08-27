export type Game = {
  id: string;
  title: string;
  emoji: string;
  href: string;
  available: boolean;
};

export const GAMES: Game[] = [
  {
    id: "pintar",
    title: "Pinta Leo",
    emoji: "🎨",
    href: "/pintar",
    available: true,
  },
  {
    id: "memoria",
    title: "Memoria",
    emoji: "🧠",
    href: "/memoria",
    available: true,
  },
  {
    id: "formas",
    title: "Formas",
    emoji: "🔷",
    href: "/formas",
    available: true,
  },
  {
    id: "numeros",
    title: "Números",
    emoji: "🔢",
    href: "/numeros",
    available: true,
  },
  {
    id: "telefono",
    title: "Teléfono",
    emoji: "📞",
    href: "/telefono",
    available: true,
  },
  {
    id: "estrellas",
    title: "Estrellas",
    emoji: "⭐",
    href: "/estrellas",
    available: true,
  },
  {
    id: "luces",
    title: "Luces",
    emoji: "💡",
    href: "/luces",
    available: true,
  },
  {
    id: "burbujas",
    title: "Burbujas",
    emoji: "🫧",
    href: "/burbujas",
    available: true,
  },
];
