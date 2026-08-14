import { AnimatePresence } from "framer-motion";
import { GameHud } from "../../../components/game-shell/GameHud";
import { Badge } from "../../../components/ui/Badge";
import { BalloonSprite } from "./BallonSprite";
import { useBalloonPopGame } from "../hooks/useballonpopgame";
import type { RefObject } from "react";

interface BalloonPopGameProps {
  onGameOver: (score: number) => void;
  pausedRef: RefObject<boolean>;
}

export function BalloonPopGame({ onGameOver, pausedRef }: BalloonPopGameProps) {
  const { balloons, score, combo, timeRemaining, totalTime, pop } = useBalloonPopGame(pausedRef, onGameOver);
  const multiplier = 1 + Math.floor(combo / 3) * 0.5;

  return (
    <div className="relative flex-1 overflow-hidden">
      <GameHud
        score={score}
        timeRemaining={timeRemaining}
        totalTime={totalTime}
        extra={combo >= 3 ? <Badge tone="accent">x{multiplier.toFixed(1)}</Badge> : undefined}
      />
      <div className="absolute inset-0">
        <AnimatePresence>
          {balloons.map((balloon) => (
            <BalloonSprite key={balloon.id} balloon={balloon} onPop={pop} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}