import { Link } from "react-router";
import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface GameResultProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  onReplay: () => void;
}

export function GameResult({ score, highScore, isNewHighScore, onReplay }: GameResultProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center safe-x"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
    >
      {isNewHighScore && <Badge tone="success">NEW BEST</Badge>}

      <p className="text-sm uppercase tracking-wide text-text-faint">Game Over</p>
      <p className="text-5xl font-extrabold text-text-h">{score}</p>
      <p className="text-sm text-text-muted">Best score: {highScore}</p>

      <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
        <Button size="lg" fullWidth onClick={onReplay}>
          Replay
        </Button>
        <Link to="/arcade">
          <Button size="lg" variant="secondary" fullWidth>
            Back to Arcade
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}