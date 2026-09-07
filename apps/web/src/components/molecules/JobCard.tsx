import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Text";
import { Job } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="panel block p-5 transition hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-3">
        <Text as="h3" className="text-lg">
          {job.title}
        </Text>
        <Badge>{job.agent_kind}</Badge>
      </div>
      <Text className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">{job.jd_text.slice(0, 160)}</Text>
    </Link>
  );
}
