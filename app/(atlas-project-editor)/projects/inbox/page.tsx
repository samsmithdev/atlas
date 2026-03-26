"use server";

import { fetchInboxItemTransaction } from "@/actions/inbox";
import { fetchSubjectProjectFolderFileSelectors } from "@/actions/subjects";
import AtlasInboxProcessingPanel from "@/components/atlas/panels/AtlasInboxProcessingPanel";
import { AtlasInboxItem } from "@/types/AtlasListTypes";

export default async function InboxPage() {
    const inboxItems = (await fetchInboxItemTransaction());
    const fileNavigatorItems = await fetchSubjectProjectFolderFileSelectors();

    return (
        <div className="w-full h-full overflow-hidden p-4 flex">
            <AtlasInboxProcessingPanel inboxItems={inboxItems.data ?? []} />
        </div>
        
    )
}