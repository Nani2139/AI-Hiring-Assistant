import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "primary" | "ghost";
};

export function Button({ className, tone = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 font-sans text-sm tracking-wide disabled:opacity-50",
        tone === "primary" && "bg-[var(--accent)] text-[#10231c] hover:brightness-110",
        tone === "ghost" && "border border-[var(--line)] bg-transparent text-[var(--ink)] hover:bg-[rgba(246,239,228,0.08)]",
        className
      )}
      {...props}
    />
  );
}
