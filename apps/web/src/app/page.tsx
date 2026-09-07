import Link from "next/link";
import { Text } from "@/components/atoms/Text";

export default function HomePage() {
  return (
    <div className="grid min-h-[78vh] content-center gap-10">
      <div className="max-w-2xl">
        <Text className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Hiring portal</Text>
        <Text as="h2" className="mt-3 text-5xl leading-tight md:text-6xl">
          Source and screen talent for guk.ai
        </Text>
        <Text className="mt-5 max-w-xl font-sans text-lg leading-7 text-[var(--muted)]">
          Post a role, find people, run a voice screen, and read structured answers in one place.
        </Text>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link className="panel p-7 transition hover:-translate-y-0.5" href="/jobs">
          <Text className="font-sans text-xs uppercase tracking-wide text-[var(--muted)]">01</Text>
          <Text as="h3" className="mt-3 text-2xl">
            Screen a hire
          </Text>
          <Text className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
            Create a job, add a candidate, start a voice screen.
          </Text>
        </Link>
        <Link className="panel p-7 transition hover:-translate-y-0.5" href="/search">
          <Text className="font-sans text-xs uppercase tracking-wide text-[var(--muted)]">02</Text>
          <Text as="h3" className="mt-3 text-2xl">
            Find people
          </Text>
          <Text className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
            Paste a JD and shortlist profiles that match the role.
          </Text>
        </Link>
        <Link className="panel p-7 transition hover:-translate-y-0.5" href="/inbox">
          <Text className="font-sans text-xs uppercase tracking-wide text-[var(--muted)]">03</Text>
          <Text as="h3" className="mt-3 text-2xl">
            Review answers
          </Text>
          <Text className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
            See interest, skills, notice period, and salary from each screen.
          </Text>
        </Link>
      </div>
    </div>
  );
}
