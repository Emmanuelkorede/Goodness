import { motion } from "framer-motion";
import { GameCard } from "./GameCard";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import type { GameDefinition } from "../../types/game";

interface ArcadeGridProps {
  games: GameDefinition[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function ArcadeGrid({ games }: ArcadeGridProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      variants={reduceMotion ? undefined : container}
      initial={reduceMotion ? undefined : "hidden"}
      animate={reduceMotion ? undefined : "show"}
    >
      {games.map((game) => (
        <motion.div key={game.id} variants={reduceMotion ? undefined : item}>
          <GameCard game={game} />
        </motion.div>
      ))}
    </motion.div>
  );
}