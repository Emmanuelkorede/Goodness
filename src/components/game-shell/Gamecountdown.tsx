import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface GameCountdownProps {
  onComplete: () => void;
  from?: number;
}

export function GameCountdown({ onComplete, from = 3 }: GameCountdownProps) {
  const [count, setCount] = useState(from);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 700);
    return () => clearTimeout(id);
  }, [count, onComplete]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          className="text-7xl font-extrabold text-accent-soft"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          {count > 0 ? count : "GO"}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}