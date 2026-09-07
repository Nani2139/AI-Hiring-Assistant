export function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block font-sans text-xs text-[var(--muted)]">{children}</label>;
}
