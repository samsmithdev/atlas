"use server";

import { fetchInboxItemTransaction } from "@/actions/inbox";
import AtlasInboxProcessingPanel from "@/components/atlas/panels/AtlasInboxProcessingPanel";

export default async function InboxPage() {
    const inboxItems = await fetchInboxItemTransaction();

    return (
        <div className="w-full h-full overflow-hidden p-4 flex">
            <AtlasInboxProcessingPanel inboxItems={inboxItems ?? []} />
        </div>
        
    )
}