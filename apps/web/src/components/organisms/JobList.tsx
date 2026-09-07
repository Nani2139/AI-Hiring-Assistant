"use client";

import { JobCard } from "@/components/molecules/JobCard";
import { JobForm } from "@/components/organisms/JobForm";
import { Text } from "@/components/atoms/Text";
import { withError } from "@/components/hocs/withError";
import { withLoad } from "@/components/hocs/withLoad";
import { getJobs } from "@/lib/api";
import { Job } from "@/lib/types";

function JobListView({ data }: { data: Job[]; reload: () => void }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <JobForm />
      <div>
        <Text as="h2" className="mb-4 text-3xl">
          Open jobs
        </Text>
        <div className="grid gap-3">
          {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const JobList = withError(withLoad(getJobs, JobListView));
