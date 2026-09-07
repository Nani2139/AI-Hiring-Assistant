"use client";

import { ComponentType, useEffect, useState } from "react";
import { Text } from "@/components/atoms/Text";
import { getJob, getPeople } from "@/lib/api";
import { Job, Person } from "@/lib/types";

type JobProps = {
  job: Job;
  people: Person[];
  reload: () => void;
};

export function withJob(View: ComponentType<JobProps & { jobId: number }>) {
  return function JobLoaded({ jobId }: { jobId: number }) {
    const [job, setJob] = useState<Job | null>(null);
    const [people, setPeople] = useState<Person[]>([]);
    const [error, setError] = useState("");

    function reload() {
      Promise.all([getJob(jobId), getPeople(jobId)])
        .then(([nextJob, nextPeople]) => {
          setJob(nextJob);
          setPeople(nextPeople);
        })
        .catch((err) => setError(err instanceof Error ? err.message : "Load failed"));
    }

    useEffect(() => {
      reload();
    }, [jobId]);

    if (error) return <Text className="font-sans text-sm text-[var(--danger)]">{error}</Text>;
    if (!job) return <Text className="font-sans text-sm text-[var(--muted)]">Loading job...</Text>;
    return <View jobId={jobId} job={job} people={people} reload={reload} />;
  };
}
