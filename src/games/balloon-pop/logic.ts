import type { Balloon } from "./types";

const BASE_SPAWN_INTERVAL = 1100;
const MIN_SPAWN_INTERVAL = 450;

const BALLOON_TYPES = [
  { weight: 65, points: 1, color: "var(--accent)" },
  { weight: 25, points: 3, color: "var(--accent-2)" },
  { weight: 10, points: 5, color: "var(--warning)" },
] as const;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickBalloonType() {
  const totalWeight = BALLOON_TYPES.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const type of BALLOON_TYPES) {
    if (roll < type.weight) return type;
    roll -= type.weight;
  }
  return BALLOON_TYPES[0];
}

export function createBalloon(id: string, spawnedAt: number): Balloon {
  const type = pickBalloonType();
  return {
    id,
    x: randomBetween(8, 92),
    y: randomBetween(15, 85),
    size: type.points >= 5 ? 46 : type.points >= 3 ? 52 : 58,
    color: type.color,
    points: type.points,
    isBonus: type.points > 1,
    spawnedAt,
  };
}

export function getSpawnInterval(elapsedMs: number, durationMs: number) {
  const progress = Math.min(1, elapsedMs / durationMs);
  return BASE_SPAWN_INTERVAL - (BASE_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL) * progress;
}