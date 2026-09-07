import { Text } from "@/components/atoms/Text";

function Box({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="min-w-[160px] flex-1 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3">
      <Text className="font-sans text-xs uppercase tracking-wide text-[var(--accent)]">{title}</Text>
      <ul className="mt-2 list-none p-0 font-sans text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden items-center font-sans text-[var(--muted)] md:flex" aria-hidden>
      →
    </div>
  );
}

export function AttendanceHld() {
  return (
    <div className="panel p-6">
      <Text as="h3" className="mb-3 text-xl">
        High-level design
      </Text>
      <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
        <Box title="Employees" items={["Feature phone", "Landline", "SMS IN 4821", "Missed call + PIN"]} />
        <Arrow />
        <Box title="Site" items={["IVR / short code", "Biometric / RFID kiosk", "Printed PIN roster"]} />
        <Arrow />
        <Box title="Voice AI" items={["Supervisor roll-call", "present / absent / late", "Dispute capture"]} />
        <Arrow />
        <Box title="HR desk" items={["Exception list", "LLM anomaly check", "Email or IVR digest"]} />
      </div>
      <Text className="mt-3 font-sans text-xs text-[var(--muted)]">
        1000 people · 100 locations · no smartphone apps
      </Text>
    </div>
  );
}
