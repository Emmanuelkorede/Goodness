import type { GameDefinition } from "../types/game";

export const gameRegistry: GameDefinition[] = [
  {
    id: "catch-stars",
    title: "Catch the Stars",
    description: "Catch. Score. Repeat.",
    icon: "⭐",
    route: "/games/catch-stars",
    category: "arcade",
  },
  {
    id: "mini-racing",
    title: "Mini Racing",
    description: "Dodge, drift, survive.",
    icon: "🏎️",
    route: "/games/mini-racing",
    category: "arcade",
  },
  {
    id: "butterfly-collector",
    title: "Butterfly Collector",
    description: "Tap them before they flutter off.",
    icon: "🦋",
    route: "/games/butterfly-collector",
    category: "arcade",
  },
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description: "Quick hands, bigger combos.",
    icon: "🎈",
    route: "/games/balloon-pop",
    category: "arcade",
  },
  {
    id: "brain-quest",
    title: "Brain Quest",
    description: "Trivia that doesn't feel like school.",
    icon: "🧠",
    route: "/games/brain-quest",
    category: "educational",
  },
];