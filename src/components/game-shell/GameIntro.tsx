import { Button } from "../ui/button";

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
  accent: string;
  onPlay: () => void;
}

export function GameIntro({ icon, title, instructions, rules, bestScore, accent, onPlay }: GameIntroProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center safe-x">
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${accent}26` }}
      />

      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-3xl text-5xl"
        style={{ background: `${accent}1f`, boxShadow: `0 0 40px ${accent}33` }}
      >
        {icon}
      </div>

      <h1 className="relative text-2xl font-extrabold uppercase tracking-wide text-text-h">{title}</h1>
      <p className="relative max-w-xs text-text-muted">{instructions}</p>

      {rules && rules.length > 0 && (
        <div className="relative flex w-full max-w-xs flex-col gap-2">
          {rules.map((rule) => (
            <div
              key={rule.label}
              className="flex items-center gap-3 rounded-lg border border-border-soft bg-surface px-4 py-2.5 text-left text-sm text-text-muted"
            >
              <span className="text-lg">{rule.icon}</span>
              <span>{rule.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="relative flex items-center gap-2 rounded-full border border-border-soft bg-surface px-5 py-2">
        <span className="text-xs uppercase tracking-wide text-text-faint">Best</span>
        <span className="text-base font-bold" style={{ color: accent }}>
          {bestScore}
        </span>
      </div>

      <Button size="lg" onClick={onPlay} className="relative">
        Play
      </Button>
    </div>
  );
}