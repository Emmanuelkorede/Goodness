import { AnimatePresence } from "framer-motion";
import { GameHud } from "../../../components/game-shell/GameHud";
import { ButterflySprite } from "./ButterflySprite";
import { useButterflyGame } from "../hooks/useButterflygame";

interface ButterflyCollectorGameProps {
  onGameOver: (score: number) => void;
}

export function ButterflyCollectorGame({ onGameOver }: ButterflyCollectorGameProps) {
  const { butterflies, score, timeRemaining, totalTime, catchButterfly } = useButterflyGame(onGameOver);

  return (
    <div className="relative flex-1 overflow-hidden">
      <GameHud score={score} timeRemaining={timeRemaining} totalTime={totalTime} />
      <div className="absolute inset-0">
        <AnimatePresence>
          {butterflies.map((butterfly) => (
            <ButterflySprite key={butterfly.id} butterfly={butterfly} onCatch={catchButterfly} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}