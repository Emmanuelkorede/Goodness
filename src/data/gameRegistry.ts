import type { GameDefinition } from "../types/game";

export const gameRegistry: GameDefinition[] = [
  {
    id: "catch-stars",
    title: "Catch the Stars",
    description: "Catch. Score. Repeat.",
    icon: "⭐",
    route: "/games/catch-stars",
    category: "arcade",
    accent: "#fbbf24",
  },
  {
    id: "mini-racing",
    title: "Mini Racing",
    description: "Dodge, drift, survive.",
    icon: "🏎️",
    route: "/games/mini-racing",
    category: "arcade",
    accent: "#fb7185",
  },
  {
    id: "butterfly-collector",
    title: "Butterfly Collector",
    description: "Tap them before they flutter off.",
    icon: "🦋",
    route: "/games/butterfly-collector",
    category: "arcade",
    accent: "#a78bfa",
  },
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description: "Quick hands, bigger combos.",
    icon: "🎈",
    route: "/games/balloon-pop",
    category: "arcade",
    accent: "#22d3ee",
  },
  {
    id: "brain-quest",
    title: "Brain Quest",
    description: "Trivia that doesn't feel like school.",
    icon: "🧠",
    route: "/games/brain-quest",
    category: "educational",
    accent: "#34d399",
  },
];

export function getGameAccent(id: string): string {
  return gameRegistry.find((g) => g.id === id)?.accent ?? "#8b5cf6";
}