"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Text } from "@/components/atoms/Text";
import { Textarea } from "@/components/atoms/Textarea";
import { createJob } from "@/lib/api";

export function JobForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [jd, setJd] = useState("");
  const [questions, setQuestions] = useState("interested, notice_period, current_ctc, expected_ctc, availability");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setBusy(true);
    setError("");
    try {
      const job = await createJob({ title, jd_text: jd, questions, agent_kind: "screener" });
      router.push(`/jobs/${job.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create job");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel p-7">
      <Text as="h2" className="mb-1 text-2xl">
        Open a role
      </Text>
      <Text className="mb-5 font-sans text-sm text-[var(--muted)]">Paste the JD. We will use it to screen people.</Text>
      <Label>Title</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Software Engineer" />
      <div className="mt-4">
        <Label>Job description</Label>
        <Textarea rows={7} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the JD here" />
      </div>
      <div className="mt-4">
        <Label>Screening questions</Label>
        <Input value={questions} onChange={(e) => setQuestions(e.target.value)} />
      </div>
      {error ? <Text className="mt-3 font-sans text-sm text-[var(--danger)]">{error}</Text> : null}
      <Button className="mt-5" disabled={busy || !title || !jd} onClick={save}>
        {busy ? "Saving..." : "Create job"}
      </Button>
    </div>
  );
}
