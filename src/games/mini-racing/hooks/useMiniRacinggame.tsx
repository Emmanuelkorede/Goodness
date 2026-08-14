import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type { Obstacle, Rect } from "../types";
import { createObstacle, getSpawnInterval, getSpeed, rectsOverlap } from "../logic";

const PLAYER_WIDTH = 46;
const PLAYER_HEIGHT = 76;
const PLAYER_BOTTOM_MARGIN = 24;
const KEY_MOVE_SPEED = 420;
const DISPLAY_TICK_MS = 150;

export function useMiniRacingGame(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  pausedRef: RefObject<boolean>,
  onGameOver: (score: number) => void
) {
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);

  const sizeRef = useRef({ width: 0, height: 0 });
  const playerXRef = useRef(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const distanceRef = useRef(0);
  const speedRef = useRef(0);
  const spawnAccumulatorRef = useRef(0);
  const startRef = useRef(0);
  const lastFrameRef = useRef(0);
  const pauseBeganAtRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idRef = useRef(0);
  const endedRef = useRef(false);
  const keysRef = useRef({ left: false, right: false });

  const clampPlayerX = useCallback((x: number) => {
    const half = PLAYER_WIDTH / 2;
    return Math.min(sizeRef.current.width - half, Math.max(half, x));
  }, []);

  const setPointerX = useCallback(
    (clientX: number, rect: DOMRect) => {
      playerXRef.current = clampPlayerX(clientX - rect.left);
    },
    [clampPlayerX]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    endedRef.current = false;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const { clientWidth, clientHeight } = parent;
      canvas!.width = clientWidth;
      canvas!.height = clientHeight;
      sizeRef.current = { width: clientWidth, height: clientHeight };
      if (playerXRef.current === 0) {
        playerXRef.current = clientWidth / 2;
      }
    }
    resize();
    window.addEventListener("resize", resize);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keysRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = true;
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = false;
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    startRef.current = performance.now();
    lastFrameRef.current = startRef.current;

    function draw(context: CanvasRenderingContext2D) {
      const { width, height } = sizeRef.current;
      context.clearRect(0, 0, width, height);

      context.fillStyle = "#111118";
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(255,255,255,0.12)";
      context.lineWidth = 4;
      context.setLineDash([24, 20]);
      context.lineDashOffset = -(distanceRef.current % 44);
      context.beginPath();
      context.moveTo(width / 2, 0);
      context.lineTo(width / 2, height);
      context.stroke();
      context.setLineDash([]);

      context.fillStyle = "#fb7185";
      for (const obstacle of obstaclesRef.current) {
        context.beginPath();
        context.roundRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, 10);
        context.fill();
      }

      const playerY = height - PLAYER_HEIGHT - PLAYER_BOTTOM_MARGIN;
      context.fillStyle = "#8b5cf6";
      context.beginPath();
      context.roundRect(playerXRef.current - PLAYER_WIDTH / 2, playerY, PLAYER_WIDTH, PLAYER_HEIGHT, 12);
      context.fill();
    }

    function loop(timestamp: number) {
      if (endedRef.current) return;

      if (pausedRef.current) {
        if (pauseBeganAtRef.current === null) pauseBeganAtRef.current = timestamp;
        lastFrameRef.current = timestamp;
        draw(ctx!);
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

      if (keysRef.current.left) playerXRef.current = clampPlayerX(playerXRef.current - KEY_MOVE_SPEED * dt);
      if (keysRef.current.right) playerXRef.current = clampPlayerX(playerXRef.current + KEY_MOVE_SPEED * dt);

      const currentSpeed = getSpeed(elapsed);
      speedRef.current = currentSpeed;
      distanceRef.current += currentSpeed * dt;

      spawnAccumulatorRef.current += dt * 1000;
      const spawnInterval = getSpawnInterval(elapsed);
      if (spawnAccumulatorRef.current >= spawnInterval && sizeRef.current.width > 0) {
        spawnAccumulatorRef.current = 0;
        obstaclesRef.current = [
          ...obstaclesRef.current,
          createObstacle(String(idRef.current++), sizeRef.current.width),
        ];
      }

      const { height } = sizeRef.current;
      const playerY = height - PLAYER_HEIGHT - PLAYER_BOTTOM_MARGIN;
      const playerRect: Rect = {
        x: playerXRef.current - PLAYER_WIDTH / 2,
        y: playerY,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      };

      const next: Obstacle[] = [];
      let crashed = false;
      for (const obstacle of obstaclesRef.current) {
        const moved = { ...obstacle, y: obstacle.y + currentSpeed * dt };
        if (rectsOverlap(playerRect, moved)) {
          crashed = true;
          break;
        }
        if (moved.y < height + 40) next.push(moved);
      }
      if (!crashed) obstaclesRef.current = next;

      draw(ctx!);

      if (crashed) {
        endedRef.current = true;
        if (tickRef.current !== null) clearInterval(tickRef.current);
        onGameOver(Math.floor(distanceRef.current / 10));
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    tickRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setScore(Math.floor(distanceRef.current / 10));
      setSpeed(Math.round(speedRef.current));
    }, DISPLAY_TICK_MS);

    return () => {
      endedRef.current = true;
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (tickRef.current !== null) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { score, speed, setPointerX };
}