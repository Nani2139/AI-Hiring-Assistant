import Link from "next/link";
import { Text } from "@/components/atoms/Text";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen text-[var(--ink)]">
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(10,8,6,0.72)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-baseline gap-2">
            <Text as="h1" className="text-2xl tracking-tight text-[var(--ink)]">
              guk.ai
            </Text>
            <span className="font-sans text-sm text-[var(--muted)]">Hire</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1">
            <Link className="nav-link" href="/jobs">
              Jobs
            </Link>
            <Link className="nav-link" href="/search">
              Search
            </Link>
            <Link className="nav-link" href="/inbox">
              Inbox
            </Link>
            <Link className="nav-link" href="/design/attendance">
              Attendance design
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
