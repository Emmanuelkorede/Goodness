import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Variant = "surface" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  "aria-label": string;
}

const variantClasses: Record<Variant, string> = {
  surface: "bg-surface text-text border border-border hover:bg-surface-hover",
  ghost: "bg-transparent text-text-muted hover:text-text hover:bg-surface",
  accent: "bg-accent text-white hover:bg-accent-soft",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "surface", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "tap-target inline-flex items-center justify-center rounded-full transition-all duration-150 active:scale-[0.92] disabled:opacity-40 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";