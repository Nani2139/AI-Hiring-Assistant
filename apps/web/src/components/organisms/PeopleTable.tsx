"use client";

import { useState } from "react";
import { PersonRow } from "@/components/molecules/PersonRow";
import { Text } from "@/components/atoms/Text";
import { Person } from "@/lib/types";

type Props = {
  people: Person[];
  onCall?: (person: Person, phone: string) => void;
  onPick?: (person: Person) => void;
};

export function PeopleTable({ people, onCall, onPick }: Props) {
  const [phones, setPhones] = useState<Record<string, string>>({});

  if (!people.length) {
    return <Text className="font-sans text-sm text-[var(--muted)]">No people yet</Text>;
  }

  return (
    <div>
      {people.map((person, index) => {
        const key = String(person.id ?? `${person.name}-${index}`);
        const phone = phones[key] ?? person.phone ?? "";
        return (
          <PersonRow
            key={key}
            person={person}
            phone={phone}
            onPhone={onCall || onPick ? (value) => setPhones((prev) => ({ ...prev, [key]: value })) : undefined}
            onCall={onCall && person.id ? () => onCall(person, phone) : undefined}
            onPick={onPick ? () => onPick(person) : undefined}
          />
        );
      })}
    </div>
  );
}
