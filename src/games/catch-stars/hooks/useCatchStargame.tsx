import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { FallingObject } from "../types";
import { createFallingObject, getSpawnInterval } from "../logic";

const GAME_DURATION_MS = 45_000;
const CATCH_ZONE_Y = 86;
const CATCH_ZONE_TOLERANCE = 6;
const BASKET_CATCH_HALF_WIDTH = 13;
const MAX_MULTIPLIER = 3;
const TICK_MS = 100;

interface UseCatchStarsGameArgs {
  basketXRef: RefObject<number>;
  pausedRef: RefObject<boolean>;
  onGameOver: (score: number) => void;
}

export function useCatchStarsGame({ basketXRef, pausedRef, onGameOver }: UseCatchStarsGameArgs) {
  const [objects, setObjects] = useState<FallingObject[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION_MS);

  const startRef = useRef(0);
  const lastFrameRef = useRef(0);
  const pauseBeganAtRef = useRef<number | null>(null);
  const spawnAccumulatorRef = useRef(0);
  const objectsRef = useRef<FallingObject[]>([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const idRef = useRef(0);
  const endedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    endedRef.current = false;
    startRef.current = performance.now();
    lastFrameRef.current = startRef.current;
    pauseBeganAtRef.current = null;

    function registerCatch(points: number, isHazard: boolean) {
      if (isHazard) {
        comboRef.current = 0;
        setCombo(0);
        scoreRef.current = Math.max(0, scoreRef.current + points);
      } else {
        comboRef.current += 1;
        setCombo(comboRef.current);
        const multiplier = Math.min(MAX_MULTIPLIER, 1 + Math.floor(comboRef.current / 5) * 0.5);
        scoreRef.current += Math.round(points * multiplier);
      }
      setScore(scoreRef.current);
    }

    function loop(timestamp: number) {
      if (endedRef.current) return;

      if (pausedRef.current) {
        if (pauseBeganAtRef.current === null) pauseBeganAtRef.current = timestamp;
        lastFrameRef.current = timestamp;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (pauseBeganAtRef.current !== null) {
        startRef.current += timestamp - pauseBeganAtRef.current;
        pauseBeganAtRef.current = null;
      }

      const dt = (timestamp - lastFrameRef.current) / 1000;
      lastFrameRef.current = timestamp;
      const elapsed = timestamp - startRef.current;

      spawnAccumulatorRef.current += dt * 1000;
      const spawnInterval = getSpawnInterval(elapsed, GAME_DURATION_MS);
      if (spawnAccumulatorRef.current >= spawnInterval) {
        spawnAccumulatorRef.current = 0;
        objectsRef.current = [
          ...objectsRef.current,
          createFallingObject(String(idRef.current++), elapsed, GAME_DURATION_MS),
        ];
      }

      const basketX = basketXRef.current;
      const next: FallingObject[] = [];
      for (const obj of objectsRef.current) {
        const newY = obj.y + obj.vy * dt;
        const inCatchZone = newY >= CATCH_ZONE_Y - CATCH_ZONE_TOLERANCE && newY <= CATCH_ZONE_Y + CATCH_ZONE_TOLERANCE;
        const inBasketRange = Math.abs(obj.x - basketX) <= BASKET_CATCH_HALF_WIDTH;

        if (inCatchZone && inBasketRange) {
          registerCatch(obj.points, obj.type === "bomb");
          continue;
        }

        if (newY > 105) {
          if (obj.type !== "bomb") {
            comboRef.current = 0;
            setCombo(0);
          }
          continue;
        }

        next.push({ ...obj, y: newY });
      }
      objectsRef.current = next;
      setObjects(next);

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    tickRef.current = setInterval(() => {
      if (pausedRef.current) return;
      const elapsed = performance.now() - startRef.current;
      const remaining = Math.max(0, GAME_DURATION_MS - elapsed);
      setTimeRemaining(remaining);
      if (remaining <= 0 && !endedRef.current) {
        endedRef.current = true;
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        if (tickRef.current !== null) clearInterval(tickRef.current);
        onGameOver(scoreRef.current);
      }
    }, TICK_MS);

    return () => {
      endedRef.current = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (tickRef.current !== null) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { objects, score, combo, timeRemaining, totalTime: GAME_DURATION_MS };
}