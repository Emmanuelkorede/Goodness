import { motion } from "framer-motion";
import type { Balloon } from "../types";

interface BalloonSpriteProps {
  balloon: Balloon;
  onPop: (id: string) => void;
}

export function BalloonSprite({ balloon, onPop }: BalloonSpriteProps) {
  return (
    <motion.button
      className="absolute flex items-center justify-center rounded-full"
      style={{
        left: `${balloon.x}%`,
        top: `${balloon.y}%`,
        width: balloon.size,
        height: balloon.size,
        fontSize: balloon.size * 0.6,
        backgroundColor: `${balloon.color}22`,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.4 }}
      transition={{ duration: 0.18 }}
      whileTap={{ scale: 0.85 }}
      onClick={() => onPop(balloon.id)}
      aria-label="Balloon"
    >
      🎈
    </motion.button>
  );
}