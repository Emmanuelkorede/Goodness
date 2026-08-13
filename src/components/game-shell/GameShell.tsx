import { useState } from "react";
import { GameIntro } from "./GameIntro";
import { GameCountdown } from "./Gamecountdown";
import { GameResult } from "./GameResult";
import { useHighScore } from "../../hooks/useHighScore";
import type { GamePhase } from "../../types/game";

interface RuleLine {
  icon: string;
  label: string;
}

interface GameShellProps {
  gameId: string;
  icon: string;
  title: string;
  instructions: string;
  rules?: RuleLine[];
  children: (props: { onGameOver: (score: number) => void }) => React.ReactNode;
}

export function GameShell({ gameId, icon, title, instructions, rules, children }: GameShellProps) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [lastScore, setLastScore] = useState(0);
  const { highScore, recordScore } = useHighScore(gameId);

  const handleGameOver = (score: number) => {
    setLastScore(score);
    recordScore(score);
    setPhase("result");
  };

  const handleReplay = () => {
    setLastScore(0);
    setPhase("countdown");
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-bg">
      {phase === "intro" && (
        <GameIntro
          icon={icon}
          title={title}
          instructions={instructions}
          rules={rules}
          bestScore={highScore}
          onPlay={() => setPhase("countdown")}
        />
      )}

      {phase === "countdown" && <GameCountdown onComplete={() => setPhase("playing")} />}

      {phase === "playing" && children({ onGameOver: handleGameOver })}

      {phase === "result" && (
        <GameResult
          score={lastScore}
          highScore={highScore}
          isNewHighScore={lastScore >= highScore && lastScore > 0}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
}