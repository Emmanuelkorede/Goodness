import clsx from "clsx";

type Tone = "accent" | "success" | "danger" | "warning";

interface ProgressBarProps {
  value: number;
  max?: number;
  tone?: Tone;
  className?: string;
  label?: string;
}

const toneClasses: Record<Tone, string> = {
  accent: "bg-accent",
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
};

export function ProgressBar({ value, max = 100, tone = "accent", className, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx("w-full", className)}>
      {label && <div className="mb-1 text-xs text-text-muted">{label}</div>}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated"
      >
        <div
          className={clsx("h-full rounded-full transition-[width] duration-300 ease-out", toneClasses[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}