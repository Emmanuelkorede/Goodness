import { motion } from "framer-motion";
import type { Butterfly } from "../types";

interface ButterflySpriteProps {
  butterfly: Butterfly;
  onCatch: (id: string) => void;
}

export function ButterflySprite({ butterfly, onCatch }: ButterflySpriteProps) {
  return (
    <motion.button
      className="absolute flex items-center justify-center"
      style={{
        left: `${butterfly.x}%`,
        top: `${butterfly.y}%`,
        width: butterfly.size,
        height: butterfly.size,
        fontSize: butterfly.size * 0.7,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      exit={{ opacity: 0, scale: 1.3 }}
      transition={{
        opacity: { duration: 0.18 },
        scale: { duration: 0.18 },
        y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
      }}
      whileTap={{ scale: 0.8 }}
      onClick={() => onCatch(butterfly.id)}
      aria-label="Butterfly"
    >
      🦋
    </motion.button>
  );
}