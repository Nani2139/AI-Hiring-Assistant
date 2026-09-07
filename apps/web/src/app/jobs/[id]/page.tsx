"use client";

import { useParams } from "next/navigation";
import { JobDetail } from "@/components/organisms/JobDetail";

export default function JobPage() {
  const params = useParams<{ id: string }>();
  return <JobDetail jobId={Number(params.id)} />;
}
