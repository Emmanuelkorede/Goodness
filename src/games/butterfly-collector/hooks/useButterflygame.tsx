import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { Butterfly } from "../types";
import { createButterfly, getSpawnInterval } from "../logic";

const GAME_DURATION_MS = 40_000;
const TICK_MS = 100;

export function useButterflyGame(pausedRef: RefObject<boolean>, onGameOver: (score: number) => void) {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_MS);

  const startRef = useRef(0);
  const pauseBeganAtRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const butterfliesRef = useRef<Butterfly[]>([]);
  const spawnAccumulatorRef = useRef(0);
  const idRef = useRef(0);
  const endedRef = useRef(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const catchButterfly = useCallback((id: string) => {
    const butterfly = butterfliesRef.current.find((b) => b.id === id);
    if (!butterfly) return;
    scoreRef.current += butterfly.points;
    setScore(scoreRef.current);
    butterfliesRef.current = butterfliesRef.current.filter((b) => b.id !== id);
    setButterflies(butterfliesRef.current);
  }, []);

  useEffect(() => {
    endedRef.current = false;
    startRef.current = performance.now();
    pauseBeganAtRef.current = null;

    tickRef.current = setInterval(() => {
      if (endedRef.current) return;
      const now = performance.now();

      if (pausedRef.current) {
        if (pauseBeganAtRef.current === null) pauseBeganAtRef.current = now;
        return;
      }
      if (pauseBeganAtRef.current !== null) {
        startRef.current += now - pauseBeganAtRef.current;
        pauseBeganAtRef.current = null;
      }

      const elapsed = now - startRef.current;
      const remaining = Math.max(0, GAME_DURATION_MS - elapsed);
      setTimeRemaining(remaining);

      butterfliesRef.current = butterfliesRef.current.filter((b) => elapsed - b.spawnedAt < b.lifespan);

      spawnAccumulatorRef.current += TICK_MS;
      const spawnInterval = getSpawnInterval(elapsed, GAME_DURATION_MS);
      if (spawnAccumulatorRef.current >= spawnInterval && remaining > 0) {
        spawnAccumulatorRef.current = 0;
        butterfliesRef.current = [
          ...butterfliesRef.current,
          createButterfly(String(idRef.current++), elapsed, GAME_DURATION_MS),
        ];
      }
      setButterflies(butterfliesRef.current);

      if (remaining <= 0 && !endedRef.current) {
        endedRef.current = true;
        if (tickRef.current !== null) clearInterval(tickRef.current);
        onGameOver(scoreRef.current);
      }
    }, TICK_MS);

    return () => {
      endedRef.current = true;
      if (tickRef.current !== null) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { butterflies, score, timeRemaining, totalTime: GAME_DURATION_MS, catchButterfly };
}