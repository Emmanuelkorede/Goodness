import type { FallingObject } from "../types";

interface FallingObjectSpriteProps {
  object: FallingObject;
}

export function FallingObjectSprite({ object }: FallingObjectSpriteProps) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: `${object.x}%`,
        top: `${object.y}%`,
        width: object.size,
        height: object.size,
        fontSize: object.size * 0.75,
        transform: "translate(-50%, -50%)",
      }}
    >
      {object.emoji}
    </div>
  );
}