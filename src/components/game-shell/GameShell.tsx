import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import { GameIntro } from "./GameIntro";
import { GameCountdown } from "./Gamecountdown";
import { GameResult } from "./GameResult";
import { IconButton } from "../ui/iconButton";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useHighScore } from "../../hooks/useHighScore";
import type { GamePhase } from "../../types/game";

interface RuleLine {
  icon: string;
  label: string;
}

interface GameShellChildProps {
  onGameOver: (score: number) => void;
  pausedRef: RefObject<boolean>;
}

interface GameShellProps {
  gameId: string;
  icon: string;
  title: string;
  instructions: string;
  accent: string;
  rules?: RuleLine[];
  children: (props: GameShellChildProps) => ReactNode;
}

export function GameShell({ gameId, icon, title, instructions, accent, rules, children }: GameShellProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [lastScore, setLastScore] = useState(0);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const { highScore, recordScore } = useHighScore(gameId);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = showQuitConfirm;
  }, [showQuitConfirm]);

  const handleGameOver = (score: number) => {
    setLastScore(score);
    recordScore(score);
    setPhase("result");
  };

  const handleReplay = () => {
    setLastScore(0);
    setShowQuitConfirm(false);
    setPhase("countdown");
  };

  const canQuit = phase === "countdown" || phase === "playing";

  return (
    <div className="relative flex min-h-full flex-1 flex-col bg-bg">
      {canQuit && (
        <IconButton
          aria-label="Quit game"
          variant="surface"
          size="sm"
          className="absolute bottom-4 left-4 z-20 safe-bottom"
          onClick={() => setShowQuitConfirm(true)}
        >
          <X size={18} />
        </IconButton>
      )}

      {phase === "intro" && (
        <GameIntro
          icon={icon}
          title={title}
          instructions={instructions}
          rules={rules}
          bestScore={highScore}
          accent={accent}
          onPlay={() => setPhase("countdown")}
        />
      )}

      {phase === "countdown" && <GameCountdown onComplete={() => setPhase("playing")} />}

      {phase === "playing" && children({ onGameOver: handleGameOver, pausedRef })}

      {phase === "result" && (
        <GameResult
          score={lastScore}
          highScore={highScore}
          isNewHighScore={lastScore >= highScore && lastScore > 0}
          onReplay={handleReplay}
        />
      )}

      <Modal open={showQuitConfirm} onClose={() => setShowQuitConfirm(false)} closeOnBackdrop={false}>
        <h2 className="text-lg font-bold text-text-h">Quit game?</h2>
        <p className="mt-2 text-sm text-text-muted">
          Your progress in this run won't be saved. You'll head back to the arcade.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button variant="danger" fullWidth onClick={() => navigate("/arcade")}>
            Quit
          </Button>
          <Button variant="secondary" fullWidth onClick={() => setShowQuitConfirm(false)}>
            Keep Playing
          </Button>
        </div>
      </Modal>
    </div>
  );
}