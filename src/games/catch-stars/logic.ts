import type { FallingObject, FallingObjectType } from "./types";

const BASE_SPAWN_INTERVAL = 950;
const MIN_SPAWN_INTERVAL = 380;
const BASE_FALL_SPEED = 16;
const MAX_FALL_SPEED = 38;

interface ObjectTypeConfig {
  type: FallingObjectType;
  weight: number;
  points: number;
  size: number;
  emoji: string;
}

const OBJECT_TYPES: ObjectTypeConfig[] = [
  { type: "star", weight: 70, points: 1, size: 40, emoji: "⭐" },
  { type: "rare", weight: 20, points: 5, size: 36, emoji: "✨" },
  { type: "bomb", weight: 10, points: -3, size: 38, emoji: "💣" },
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickObjectType(): ObjectTypeConfig {
  const totalWeight = OBJECT_TYPES.reduce((sum, t) => sum + t.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const type of OBJECT_TYPES) {
    if (roll < type.weight) return type;
    roll -= type.weight;
  }
  return OBJECT_TYPES[0];
}

function progress(elapsedMs: number, durationMs: number) {
  return Math.min(1, elapsedMs / durationMs);
}

export function createFallingObject(id: string, elapsedMs: number, durationMs: number): FallingObject {
  const config = pickObjectType();
  const p = progress(elapsedMs, durationMs);
  const vy = BASE_FALL_SPEED + (MAX_FALL_SPEED - BASE_FALL_SPEED) * p;
  return {
    id,
    x: randomBetween(8, 92),
    y: -8,
    vy,
    size: config.size,
    type: config.type,
    points: config.points,
    emoji: config.emoji,
  };
}

export function getSpawnInterval(elapsedMs: number, durationMs: number) {
  const p = progress(elapsedMs, durationMs);
  return BASE_SPAWN_INTERVAL - (BASE_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL) * p;
}