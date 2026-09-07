"use client";

import { InboxTable } from "@/components/organisms/InboxTable";
import { Text } from "@/components/atoms/Text";
import { withError } from "@/components/hocs/withError";
import { withLoad } from "@/components/hocs/withLoad";
import { listInbox, sendFollowup } from "@/lib/api";
import { InboxRow } from "@/lib/types";

function InboxView({ data, reload }: { data: InboxRow[]; reload: () => void }) {
  async function onFollowup(id: number) {
    await sendFollowup(id);
    reload();
  }

  return (
    <div>
      <Text as="h2" className="mb-2 text-4xl">
        Inbox
      </Text>
      <Text className="mb-6 max-w-2xl font-sans text-sm text-[var(--muted)]">
        Voice screens land here. Refresh after a call ends. WhatsApp follow-up adds a sample reply for the walkthrough.
      </Text>
      <InboxTable rows={data} onFollowup={onFollowup} />
    </div>
  );
}

export const InboxPanel = withError(withLoad(listInbox, InboxView));
