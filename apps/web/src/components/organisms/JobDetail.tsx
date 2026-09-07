"use client";

import { CallPanel } from "@/components/organisms/CallPanel";
import { PeopleTable } from "@/components/organisms/PeopleTable";
import { Text } from "@/components/atoms/Text";
import { withError } from "@/components/hocs/withError";
import { withJob } from "@/components/hocs/withJob";
import { Job, Person } from "@/lib/types";

function JobDetailView({
  job,
  people,
  reload,
}: {
  jobId: number;
  job: Job;
  people: Person[];
  reload: () => void;
}) {
  return (
    <div className="grid gap-6">
      <div className="panel p-7">
        <Text as="h2" className="text-4xl">
          {job.title}
        </Text>
        <Text className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-[var(--muted)]">{job.jd_text}</Text>
        <Text className="mt-4 font-sans text-sm">Questions: {job.questions}</Text>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CallPanel jobId={job.id} onDone={reload} />
        <div className="panel p-7">
          <Text as="h3" className="mb-2 text-2xl">
            Candidates on this job
          </Text>
          <Text className="mb-4 font-sans text-sm text-[var(--muted)]">
            People already added. To call, use the form with the same name and number.
          </Text>
          <PeopleTable people={people} />
        </div>
      </div>
    </div>
  );
}

export const JobDetail = withError(withJob(JobDetailView));
