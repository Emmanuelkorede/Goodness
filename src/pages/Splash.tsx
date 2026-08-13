import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SPLASH_MS = 1800;
const SPLASH_MS_REDUCED = 500;

export function Splash() {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const id = setTimeout(
      () => navigate("/arcade", { replace: true }),
      reduceMotion ? SPLASH_MS_REDUCED : SPLASH_MS
    );
    return () => clearTimeout(id);
  }, [navigate, reduceMotion]);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-bg safe-top safe-bottom">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
      >
        <span className="text-7xl font-extrabold leading-none text-text-h">G</span>
        <motion.span
          className="mt-3 text-lg font-medium tracking-wide text-text-muted"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.4 }}
        >
          Goodness
        </motion.span>
      </motion.div>
    </div>
  );
}