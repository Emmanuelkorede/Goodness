import { Link } from "react-router";
import { Card } from "../ui/card";
import { useHighScore } from "../../hooks/useHighScore";
import type { GameDefinition } from "../../types/game";

interface GameCardProps {
  game: GameDefinition;
}

export function GameCard({ game }: GameCardProps) {
  const { highScore } = useHighScore(game.id);

  return (
    <Link to={game.route} className="block">
      <Card
        interactive
        padding="md"
        className="flex h-full flex-col gap-4 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(120% 100% at 0% 0%, ${game.accent}14, transparent 60%)`,
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
          style={{ background: `${game.accent}22`, boxShadow: `0 0 24px ${game.accent}33` }}
        >
          {game.icon}
        </div>

        <div>
          <h3 className="text-base font-bold text-text-h">{game.title}</h3>
          <p className="mt-0.5 text-sm text-text-muted">{game.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          {highScore > 0 ? (
            <span className="flex items-center gap-1 text-sm font-semibold" style={{ color: game.accent }}>
              ★ {highScore}
            </span>
          ) : (
            <span className="text-xs text-text-faint">Not played yet</span>
          )}
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-bg"
            style={{ background: game.accent }}
          >
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}