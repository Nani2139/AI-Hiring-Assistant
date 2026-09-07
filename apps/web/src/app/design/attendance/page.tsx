import { AttendanceHld } from "@/components/organisms/AttendanceHld";
import { Text } from "@/components/atoms/Text";

export default function AttendancePage() {
  return (
    <article className="max-w-5xl">
      <Text className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
        Design note — not a live tracker
      </Text>
      <Text as="h2" className="mt-2 text-3xl">
        Attendance design
      </Text>
      <Text className="mt-4 max-w-3xl font-sans leading-7 text-[var(--muted)]">
        The brief asked: if smartphones and apps do not exist, but LLMs and everything else do, how would HR
        mark attendance for 1000 people across 100 locations every day? This page is that design. There is no
        tracker to click because the scenario forbids consumer apps.
      </Text>
      <div className="my-6 overflow-hidden rounded-xl border border-[var(--line)]">
        <img src="/attendance-hld.png" alt="Attendance high-level design" className="block w-full" />
      </div>
      <AttendanceHld />
      <Text as="h3" className="mt-6 text-2xl">
        What I would run
      </Text>
      <Text className="mt-3 max-w-3xl font-sans leading-7">
        Each site gets a landline or feature phone and a printed roster with 4-digit PINs. People mark attendance
        by calling a toll-free IVR from a registered number, sending SMS like IN 4821, or using a missed-call + PIN.
        Larger sites also get a biometric or RFID kiosk. That kiosk is hardware, not an app.
      </Text>
      <Text className="mt-3 max-w-3xl font-sans leading-7">
        At shift start, a voice agent calls the site supervisor, reads the absentee list,
        and stores structured answers: present count, absent IDs, late IDs, disputes. HR sees one daily exception
        list, not 1000 raw punches.
      </Text>
      <Text as="h3" className="mt-6 text-2xl">
        Why this scales
      </Text>
      <Text className="mt-3 max-w-3xl font-sans leading-7">
        Most volume is automatic. Humans only handle exceptions. Voice AI replaces 100 daily supervisor check-ins.
        The LLM flags buddy punching, impossible travel, and roster vs headcount gaps, then emails or IVR-briefs HR.
      </Text>
    </article>
  );
}
