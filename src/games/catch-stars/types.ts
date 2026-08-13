export type FallingObjectType = "star" | "rare" | "bomb";

export interface FallingObject {
  id: string;
  x: number;
  y: number;
  vy: number;
  size: number;
  type: FallingObjectType;
  points: number;
  emoji: string;
}