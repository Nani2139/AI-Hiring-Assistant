import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { Person } from "@/lib/types";

type Props = {
  person: Person;
  phone: string;
  onPhone?: (value: string) => void;
  onCall?: () => void;
  onPick?: () => void;
};

export function PersonRow({ person, phone, onPhone, onCall, onPick }: Props) {
  return (
    <div className="grid gap-3 border-b border-[var(--line)] py-3 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
      <div>
        <Text className="font-medium">{person.name}</Text>
        <Text className="font-sans text-xs text-[var(--muted)]">
          {[person.title, person.company, person.location].filter(Boolean).join(" · ") || "Added from this job"}
        </Text>
      </div>
      {onPhone ? (
        <Input placeholder="Phone +91..." value={phone} onChange={(e) => onPhone(e.target.value)} />
      ) : (
        <Text className="font-sans text-sm">{phone || "No phone"}</Text>
      )}
      <Text className="font-sans text-xs text-[var(--muted)]">{person.source}</Text>
      {onCall ? <Button onClick={onCall}>Start call</Button> : null}
      {!onCall && onPick ? (
        <Button tone="ghost" onClick={onPick}>
          Shortlist
        </Button>
      ) : null}
    </div>
  );
}
