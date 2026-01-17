import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "accent" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
        {
          "bg-[var(--foreground)]/10 text-[var(--foreground)]":
            variant === "default",
          "bg-[var(--primary)] text-white": variant === "primary",
          "bg-[var(--secondary)] text-[var(--foreground)]":
            variant === "secondary",
          "bg-[var(--accent)] text-white": variant === "accent",
          "border border-[var(--foreground)]/20 text-[var(--foreground)]":
            variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
