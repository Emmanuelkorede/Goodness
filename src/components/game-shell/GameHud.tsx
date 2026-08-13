import { ProgressBar } from "../ui/progressBar";

interface GameHudProps {
  score: number;
  timeRemaining?: number;
  totalTime?: number;
  extra?: React.ReactNode;
}

export function GameHud({ score, timeRemaining, totalTime, extra }: GameHudProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col gap-2 px-4 pt-4 safe-x safe-top">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-surface-glass px-4 py-1.5 text-lg font-bold text-text-h glass">
          {score}
        </div>
        {extra}
      </div>
      {timeRemaining !== undefined && totalTime !== undefined && (
        <ProgressBar value={timeRemaining} max={totalTime} tone="accent" />
      )}
    </div>
  );
}