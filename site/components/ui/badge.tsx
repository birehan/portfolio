import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "outline" | "accent" | "subtle";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)]",
  outline:
    "border border-[var(--border)] text-[var(--muted)] bg-transparent",
  accent:
    "bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)] border border-[color-mix(in_srgb,var(--accent)_25%,transparent)]",
  subtle:
    "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--border)]",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium font-mono tracking-tight",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
