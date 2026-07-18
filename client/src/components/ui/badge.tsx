import { cn } from "@/lib/utils/cn";
import type { Difficulty } from "@/types/home.types";

const difficultyStyles: Record<Difficulty, string> = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-red-100 text-red-700",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Difficulty | "default" | "category";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantClass =
    variant === "default"
      ? "bg-primary/10 text-primary"
      : variant === "category"
        ? "bg-gray-100 text-gray-600"
        : difficultyStyles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        variantClass,
        className
      )}
    >
      {children}
    </span>
  );
}
