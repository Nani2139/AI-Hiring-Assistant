"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Text } from "@/components/atoms/Text";
import { addPerson, startCall } from "@/lib/api";
import { Person } from "@/lib/types";

export function CallPanel({ jobId, onDone }: { jobId: number; onDone: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+918303059533");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function addAndCall() {
    setBusy(true);
    setError("");
    try {
      const person: Person = {
        name,
        title: "",
        company: "",
        location: "",
        email: "",
        phone,
        linkedin: "",
        source: "manual",
      };
      const saved = await addPerson(jobId, person);
      await startCall(jobId, saved.id as number, phone);
      setName("");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Call failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel p-7">
      <Text as="h2" className="mb-1 text-2xl">
        Start a voice screen
      </Text>
      <Text className="mb-5 font-sans text-sm text-[var(--muted)]">
        Click once. Keep the candidate phone free. The agent will call and collect answers.
      </Text>
      <Label>Name</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Candidate name" />
      <div className="mt-4">
        <Label>Phone</Label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      {error ? <Text className="mt-3 font-sans text-sm text-[var(--danger)]">{error}</Text> : null}
      <Button className="mt-5" disabled={busy || !name} onClick={addAndCall}>
        {busy ? "Calling..." : "Start call"}
      </Button>
    </div>
  );
}
