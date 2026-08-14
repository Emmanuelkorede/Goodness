import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { Balloon } from "../types";
import { createBalloon, getSpawnInterval } from "../logic";

const GAME_DURATION_MS = 45_000;
const BALLOON_LIFESPAN_MS = 2200;
const TICK_MS = 100;
const MAX_MULTIPLIER = 3;

export function useBalloonPopGame(pausedRef: RefObject<boolean>, onGameOver: (score: number) => void) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_MS);

  const startRef = useRef(0);
  const pauseBeganAtRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const balloonsRef = useRef<Balloon[]>([]);
  const spawnAccumulatorRef = useRef(0);
  const idRef = useRef(0);
  const endedRef = useRef(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pop = useCallback((id: string) => {
    const balloon = balloonsRef.current.find((b) => b.id === id);
    if (!balloon) return;

    comboRef.current += 1;
    setCombo(comboRef.current);
    const multiplier = Math.min(MAX_MULTIPLIER, 1 + Math.floor(comboRef.current / 3) * 0.5);
    scoreRef.current += Math.round(balloon.points * multiplier);
    setScore(scoreRef.current);

    balloonsRef.current = balloonsRef.current.filter((b) => b.id !== id);
    setBalloons(balloonsRef.current);
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

      let missed = false;
      balloonsRef.current = balloonsRef.current.filter((balloon) => {
        const expired = elapsed - balloon.spawnedAt >= BALLOON_LIFESPAN_MS;
        if (expired) missed = true;
        return !expired;
      });
      if (missed) {
        comboRef.current = 0;
        setCombo(0);
      }

      spawnAccumulatorRef.current += TICK_MS;
      const spawnInterval = getSpawnInterval(elapsed, GAME_DURATION_MS);
      if (spawnAccumulatorRef.current >= spawnInterval && remaining > 0) {
        spawnAccumulatorRef.current = 0;
        balloonsRef.current = [...balloonsRef.current, createBalloon(String(idRef.current++), elapsed)];
      }
      setBalloons(balloonsRef.current);

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

  return { balloons, score, combo, timeRemaining, totalTime: GAME_DURATION_MS, pop };
}