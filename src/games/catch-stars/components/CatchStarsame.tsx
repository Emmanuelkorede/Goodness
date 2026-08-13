import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { GameHud } from "../../../components/game-shell/GameHud";
import { Badge } from "../../../components/ui/Badge";
import { FallingObjectSprite } from "./FallingObjectSprite";
import { Basket } from "./Basket";
import { useBasketControl } from "../hooks/useBaskteControl";
import { useCatchStarsGame } from "../hooks/useCatchStargame";

interface CatchStarsGameProps {
  onGameOver: (score: number) => void;
}

export function CatchStarsGame({ onGameOver }: CatchStarsGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { basketX, basketXRef, handlePointerMove } = useBasketControl();
  const { objects, score, combo, timeRemaining, totalTime } = useCatchStarsGame({ basketXRef, onGameOver });

  const multiplier = 1 + Math.floor(combo / 5) * 0.5;

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    handlePointerMove(e.clientX, containerRef.current.getBoundingClientRect());
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 touch-none overflow-hidden"
      onPointerDown={onPointerMove}
      onPointerMove={onPointerMove}
    >
      <GameHud
        score={score}
        timeRemaining={timeRemaining}
        totalTime={totalTime}
        extra={combo >= 5 ? <Badge tone="accent">x{multiplier.toFixed(1)}</Badge> : undefined}
      />
      {objects.map((object) => (
        <FallingObjectSprite key={object.id} object={object} />
      ))}
      <Basket x={basketX} />
    </div>
  );
}