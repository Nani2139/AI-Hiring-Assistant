import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("rounded-full bg-[var(--accent-soft)] px-2 py-1 font-sans text-xs text-[var(--accent)]", className)}>
      {children}
    </span>
  );
}
