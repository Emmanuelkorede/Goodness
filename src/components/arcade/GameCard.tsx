import { Link } from "react-router";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { useHighScore } from "../../hooks/useHighScore";
import type { GameDefinition } from "../../types/game";

interface GameCardProps {
  game: GameDefinition;
}

export function GameCard({ game }: GameCardProps) {
  const { highScore } = useHighScore(game.id);

  return (
    <Link to={game.route} className="block">
      <Card interactive padding="md" className="flex h-full flex-col gap-3">
        <div className="text-4xl">{game.icon}</div>
        <div>
          <h3 className="text-base font-bold text-text-h">{game.title}</h3>
          <p className="text-sm text-text-muted">{game.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          {highScore > 0 ? (
            <Badge tone="accent">BEST {highScore}</Badge>
          ) : (
            <span className="text-xs text-text-faint">Not played yet</span>
          )}
          <span className="text-sm font-semibold text-accent-soft">PLAY →</span>
        </div>
      </Card>
    </Link>
  );
}