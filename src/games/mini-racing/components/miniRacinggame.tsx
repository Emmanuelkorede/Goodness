import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { GameHud } from "../../../components/game-shell/GameHud";
import { useMiniRacingGame } from "../hooks/useMiniRacinggame";

interface MiniRacingGameProps {
  onGameOver: (score: number) => void;
  pausedRef: RefObject<boolean>;
}

export function MiniRacingGame({ onGameOver, pausedRef }: MiniRacingGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { score, speed, setPointerX } = useMiniRacingGame(canvasRef, pausedRef, onGameOver);

  const onPointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    setPointerX(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  return (
    <div className="relative flex-1 touch-none overflow-hidden">
      <GameHud
        score={score}
        extra={
          <span className="glass rounded-full bg-surface-glass px-3 py-1 text-xs font-semibold text-text-muted">
            {speed} km/h
          </span>
        }
      />
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        onPointerDown={onPointerMove}
        onPointerMove={onPointerMove}
      />
    </div>
  );
}