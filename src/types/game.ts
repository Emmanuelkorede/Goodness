export type GameCategory = "arcade" | "educational";

export type GamePhase = "intro" | "countdown" | "playing" | "result";

export interface GameDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  category: GameCategory;
  accent: string;
}

export interface GameScore {
  gameId: string;
  highScore: number;
  gamesPlayed: number;
  lastPlayed: string;
}