import { Badge } from "@/components/atoms/Badge";

export function StatusChip({ status }: { status: string }) {
  return <Badge>{status}</Badge>;
}
