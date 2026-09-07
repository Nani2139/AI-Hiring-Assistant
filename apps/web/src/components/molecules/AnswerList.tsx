import { Text } from "@/components/atoms/Text";

export function AnswerList({ resultJson }: { resultJson: string }) {
  let data: Record<string, string> = {};
  try {
    data = JSON.parse(resultJson || "{}");
  } catch {
    data = {};
  }
  const keys = Object.keys(data);
  if (!keys.length) return <Text className="font-sans text-sm text-[var(--muted)]">No answers yet</Text>;
  return (
    <dl className="grid gap-1">
      {keys.map((key) => (
        <div key={key} className="grid grid-cols-[140px_1fr] gap-2 font-sans text-sm">
          <dt className="text-[var(--muted)]">{key}</dt>
          <dd className="m-0">{String(data[key])}</dd>
        </div>
      ))}
    </dl>
  );
}
