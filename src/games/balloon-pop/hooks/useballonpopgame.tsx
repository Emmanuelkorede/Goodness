import { useCallback, useEffect, useRef, useState } from "react";
import type { Balloon } from "../types";
import { createBalloon, getSpawnInterval } from "../logic";

const GAME_DURATION_MS = 45_000;
const BALLOON_LIFESPAN_MS = 2200;
const TICK_MS = 100;
const MAX_MULTIPLIER = 3;

export function useBalloonPopGame(onGameOver: (score: number) => void) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_MS);

  // FIX: Initialize with 0 to keep render pure. 
  // We will set the real time in useEffect.
  const startRef = useRef(0);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  
  // FIX: Provide 'null' as the initial argument
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

  const removeBalloon = useCallback((id: string, missed: boolean) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    clearExpiry(id);
    if (missed) {
      comboRef.current = 0;
      setCombo(0);
    }
  }, []);

  const pop = useCallback((id: string) => {
    setBalloons((prev) => {
      const balloon = prev.find((b) => b.id === id);
      if (!balloon) return prev;

      comboRef.current += 1;
      setCombo(comboRef.current);
      const multiplier = Math.min(MAX_MULTIPLIER, 1 + Math.floor(comboRef.current / 3) * 0.5);
      scoreRef.current += Math.round(balloon.points * multiplier);
      setScore(scoreRef.current);

      return prev.filter((b) => b.id !== id);
    });
    clearExpiry(id);
  }, []);

  // FIX: Use a named function expression "loop" inside useCallback
  // This completely avoids the temporal dead zone/use-before-declare error.
  const spawnLoop = useCallback(function loop() {
    if (endedRef.current) return;
    const elapsed = Date.now() - startRef.current;
    if (elapsed >= GAME_DURATION_MS) return;

    const balloon = createBalloon(String(idRef.current++));
    setBalloons((prev) => [...prev, balloon]);

    const expiry = setTimeout(() => removeBalloon(balloon.id, true), BALLOON_LIFESPAN_MS);
    expiryTimeoutsRef.current.set(balloon.id, expiry);

    const interval = getSpawnInterval(elapsed, GAME_DURATION_MS);
    spawnTimeoutRef.current = setTimeout(loop, interval); // Call 'loop' instead of 'spawnLoop'
  }, [removeBalloon]);

  useEffect(() => {
    // FIX: Set the actual start time the moment the game effect runs
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

  return { balloons, score, combo, timeRemaining, totalTime: GAME_DURATION_MS, pop };
}