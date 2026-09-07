"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";
import { Text } from "@/components/atoms/Text";
import { Textarea } from "@/components/atoms/Textarea";
import { PeopleTable } from "@/components/organisms/PeopleTable";
import { createJob, saveShortlist, searchPeople } from "@/lib/api";
import { Person } from "@/lib/types";

export function SearchPanel() {
  const [jd, setJd] = useState("Field Sales Associate\nLocation: Bangalore\nSkills: sales, python, recruiting");
  const [people, setPeople] = useState<Person[]>([]);
  const [picked, setPicked] = useState<Person[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function runSearch() {
    setBusy(true);
    setNote("");
    try {
      const res = await searchPeople(jd);
      setPeople(res.people);
      const extra = res.source === "pdl" ? "Live people results" : "No people found";
      const skills = res.parsed.skills.join(", ") || "none";
      const place = res.parsed.country || res.parsed.location || "any";
      setNote(`Using title "${res.parsed.title}", place ${place}, skills ${skills}. ${extra}`);
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Search failed");
    } finally {
      setBusy(false);
    }
  }

  async function keepAndCallPrep(person: Person) {
    const next = [...picked, person];
    setPicked(next);
  }

  async function savePicked() {
    setBusy(true);
    try {
      const firstLine = jd.split("\n")[0] || "Sourced role";
      const job = await createJob({
        title: firstLine,
        jd_text: jd,
        questions: "interested, open_to_role, best_callback_time, objections, summary",
        agent_kind: "sourcer",
      });
      await saveShortlist(job.id, picked);
      window.location.href = `/jobs/${job.id}`;
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-5">
      <div className="panel p-7">
        <Text as="h2" className="mb-1 text-3xl">
          Find people
        </Text>
        <Text className="mb-5 font-sans text-sm text-[var(--muted)]">Paste a JD. We search live profiles and let you shortlist.</Text>
        <Label>Job description</Label>
        <Textarea rows={7} value={jd} onChange={(e) => setJd(e.target.value)} />
        <Button className="mt-3" disabled={busy} onClick={runSearch}>
          {busy ? "Searching..." : "Search people"}
        </Button>
        {note ? <Text className="mt-3 font-sans text-sm text-[var(--muted)]">{note}</Text> : null}
      </div>
      <div className="panel p-7">
        <Text as="h3" className="mb-3 text-xl">
          Results
        </Text>
        <PeopleTable people={people} onPick={keepAndCallPrep} />
      </div>
      <div className="panel p-7">
        <Text as="h3" className="mb-3 text-xl">
          Shortlist ({picked.length})
        </Text>
        <PeopleTable people={picked} />
        <Button className="mt-3" disabled={!picked.length || busy} onClick={savePicked}>
          Save shortlist to a job
        </Button>
      </div>
    </div>
  );
}
