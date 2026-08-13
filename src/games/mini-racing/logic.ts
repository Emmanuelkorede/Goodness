import type { Obstacle, Rect } from "./types";

const BASE_SPEED = 160;
const MAX_SPEED = 420;
const SPEED_RAMP_MS = 40_000;

const BASE_SPAWN_INTERVAL = 950;
const MIN_SPAWN_INTERVAL = 420;
const SPAWN_RAMP_MS = 30_000;

const OBSTACLE_WIDTH_MIN = 46;
const OBSTACLE_WIDTH_MAX = 64;
const OBSTACLE_HEIGHT = 70;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getSpeed(elapsedMs: number) {
  const p = Math.min(1, elapsedMs / SPEED_RAMP_MS);
  return BASE_SPEED + (MAX_SPEED - BASE_SPEED) * p;
}

export function getSpawnInterval(elapsedMs: number) {
  const p = Math.min(1, elapsedMs / SPAWN_RAMP_MS);
  return BASE_SPAWN_INTERVAL - (BASE_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL) * p;
}

export function createObstacle(id: string, canvasWidth: number): Obstacle {
  const width = randomBetween(OBSTACLE_WIDTH_MIN, OBSTACLE_WIDTH_MAX);
  const margin = 16;
  const maxX = Math.max(margin, canvasWidth - width - margin);
  return { id, x: randomBetween(margin, maxX), y: -OBSTACLE_HEIGHT, width, height: OBSTACLE_HEIGHT };
}

export function rectsOverlap(a: Rect, b: Rect) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}