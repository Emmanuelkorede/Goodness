import { useCallback, useEffect, useRef, useState } from "react";
import type { Butterfly } from "../types";
import { createButterfly, getSpawnInterval, getLifespan } from "../logic";

const GAME_DURATION_MS = 40_000;
const TICK_MS = 100;

export function useButterflyGame(onGameOver: (score: number) => void) {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_MS);

  // FIX 1: Initialize with 0 to keep render pure. Set actual time in useEffect.
  const startRef = useRef(0);
  const scoreRef = useRef(0);
  
  // FIX 2: Provide 'null' as the initial argument
  const spawnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiryTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const idRef = useRef(0);
  const endedRef = useRef(false);

  const clearExpiry = (id: string) => {
    const timeout = expiryTimeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      expiryTimeoutsRef.current.delete(id);
    }
  };

  const removeButterfly = useCallback((id: string) => {
    setButterflies((prev) => prev.filter((b) => b.id !== id));
    clearExpiry(id);
  }, []);

  const catchButterfly = useCallback((id: string) => {
    setButterflies((prev) => {
      const butterfly = prev.find((b) => b.id === id);
      if (!butterfly) return prev;
      scoreRef.current += butterfly.points;
      setScore(scoreRef.current);
      return prev.filter((b) => b.id !== id);
    });
    clearExpiry(id);
  }, []);

  // FIX 3: Use a named function expression "loop" inside useCallback
  const spawnLoop = useCallback(function loop() {
    if (endedRef.current) return;
    const elapsed = Date.now() - startRef.current;
    if (elapsed >= GAME_DURATION_MS) return;

    const butterfly = createButterfly(String(idRef.current++));
    setButterflies((prev) => [...prev, butterfly]);

    const lifespan = getLifespan(elapsed, GAME_DURATION_MS);
    const expiry = setTimeout(() => removeButterfly(butterfly.id), lifespan);
    expiryTimeoutsRef.current.set(butterfly.id, expiry);

    const interval = getSpawnInterval(elapsed, GAME_DURATION_MS);
    spawnTimeoutRef.current = setTimeout(loop, interval); // Call 'loop' instead of 'spawnLoop'
  }, [removeButterfly]);

  useEffect(() => {
    // FIX 1 (continued): Set the actual start time the moment the game effect runs
    startRef.current = Date.now();
    
    spawnLoop();
    
    const tick = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, GAME_DURATION_MS - elapsed);
      setTimeRemaining(remaining);
      
      if (remaining <= 0 && !endedRef.current) {
        endedRef.current = true;
        clearInterval(tick);
        if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
        expiryTimeoutsRef.current.forEach(clearTimeout);
        onGameOver(scoreRef.current);
      }
    }, TICK_MS);

    return () => {
      clearInterval(tick);
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      expiryTimeoutsRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { butterflies, score, timeRemaining, totalTime: GAME_DURATION_MS, catchButterfly };
}