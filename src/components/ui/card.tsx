import type { HTMLAttributes } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({ interactive, padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg bg-surface border border-border-soft shadow-card",
        interactive && "cursor-pointer transition-all duration-150 hover:bg-surface-hover active:scale-[0.98]",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}