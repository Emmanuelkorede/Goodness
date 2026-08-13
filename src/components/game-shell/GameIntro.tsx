import { Button } from "../ui/Button";

interface RuleLine {
  icon: string;
  label: string;
}

interface GameIntroProps {
  icon: string;
  title: string;
  instructions: string;
  rules?: RuleLine[];
  bestScore: number;
  onPlay: () => void;
}

export function GameIntro({ icon, title, instructions, rules, bestScore, onPlay }: GameIntroProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center safe-x">
      <div className="text-6xl">{icon}</div>
      <h1 className="text-2xl font-extrabold uppercase tracking-wide text-text-h">{title}</h1>
      <p className="max-w-xs text-text-muted">{instructions}</p>

      {rules && rules.length > 0 && (
        <div className="flex flex-col gap-1 text-sm text-text-muted">
          {rules.map((rule) => (
            <div key={rule.label} className="flex items-center justify-center gap-2">
              <span>{rule.icon}</span>
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2">
        <p className="text-xs uppercase tracking-wide text-text-faint">Best Score</p>
        <p className="text-xl font-bold text-accent-soft">{bestScore}</p>
      </div>

      <Button size="lg" onClick={onPlay}>
        Play
      </Button>
    </div>
  );
}