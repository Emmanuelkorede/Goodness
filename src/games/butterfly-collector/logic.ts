import type { Butterfly } from "./types";

const BASE_SPAWN_INTERVAL = 1300;
const MIN_SPAWN_INTERVAL = 500;
const BASE_LIFESPAN = 2600;
const MIN_LIFESPAN = 1400;

const BUTTERFLY_TYPES = [
  { weight: 70, points: 1, color: "var(--accent-2)" },
  { weight: 22, points: 5, color: "var(--accent)" },
  { weight: 8, points: 10, color: "var(--warning)" },
] as const;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickButterflyType() {
  const totalWeight = BUTTERFLY_TYPES.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const type of BUTTERFLY_TYPES) {
    if (roll < type.weight) return type;
    roll -= type.weight;
  }
  return BUTTERFLY_TYPES[0];
}

export function createButterfly(id: string): Butterfly {
  const type = pickButterflyType();
  return {
    id,
    x: randomBetween(8, 92),
    y: randomBetween(12, 80),
    size: type.points >= 10 ? 44 : type.points >= 5 ? 50 : 56,
    color: type.color,
    points: type.points,
  };
}

function progress(elapsedMs: number, durationMs: number) {
  return Math.min(1, elapsedMs / durationMs);
}

export function getSpawnInterval(elapsedMs: number, durationMs: number) {
  const p = progress(elapsedMs, durationMs);
  return BASE_SPAWN_INTERVAL - (BASE_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL) * p;
}

export function getLifespan(elapsedMs: number, durationMs: number) {
  const p = progress(elapsedMs, durationMs);
  return BASE_LIFESPAN - (BASE_LIFESPAN - MIN_LIFESPAN) * p;
}