import { useLocalStorage } from "./useLocalStorage";
import type { GameScore } from "../types/game";

export function useHighScore(gameId: string) {
  const [score, setScore] = useLocalStorage<GameScore>(`score:${gameId}`, {
    gameId,
    highScore: 0,
    gamesPlayed: 0,
    lastPlayed: "",
  });

  const recordScore = (finalScore: number) => {
    setScore((prev) => ({
      gameId,
      highScore: Math.max(prev.highScore, finalScore),
      gamesPlayed: prev.gamesPlayed + 1,
      lastPlayed: new Date().toISOString(),
    }));
  };

  return { ...score, recordScore };
}