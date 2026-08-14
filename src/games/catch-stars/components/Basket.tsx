interface BasketProps {
  x: number;
}

export function Basket({ x }: BasketProps) {
  return (
    <div
      className="absolute bottom-[10%] flex h-16 w-32 items-center justify-center rounded-2xl border border-border-soft bg-surface text-4xl shadow-card"
      style={{ left: `${x}%`, transform: "translate(-50%, 0)" }}
    >
      🧺
    </div>
  );
}