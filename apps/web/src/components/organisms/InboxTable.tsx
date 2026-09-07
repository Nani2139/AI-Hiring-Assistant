"use client";

import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { AnswerList } from "@/components/molecules/AnswerList";
import { StatusChip } from "@/components/molecules/StatusChip";
import { InboxRow } from "@/lib/types";

type Props = {
  rows: InboxRow[];
  onFollowup: (id: number) => void;
};

export function InboxTable({ rows, onFollowup }: Props) {
  if (!rows.length) {
    return <Text className="font-sans text-sm text-[var(--muted)]">No conversations yet</Text>;
  }

  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <article key={row.id} className="panel p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Text as="h3" className="text-2xl">
              {row.person_name} · {row.job_title}
            </Text>
            <StatusChip status={`${row.channel} · ${row.status}`} />
          </div>
          <Text className="mt-2 font-sans text-sm text-[var(--muted)]">{row.summary || "Waiting for result"}</Text>
          <div className="mt-4">
            <AnswerList resultJson={row.result_json} />
          </div>
          <Button className="mt-5" tone="ghost" onClick={() => onFollowup(row.id)}>
            WhatsApp follow-up
          </Button>
        </article>
      ))}
    </div>
  );
}
