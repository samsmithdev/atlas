import { AppRoutes } from "@/lib/routes";
import Link from "next/link";

interface AtlasWorkspaceHeaderProps {
  activeProjectName: string;
  activeProjectId: string;
  activeSubjectId: string;
}
// Header layout
//| ProjectSelectorButton - | - Create Dropdown - | - Search - | - - - | - New Inbox Item - | - |- Avatar drop down - |

export default async function AtlasWorkspaceHeader({
  activeProjectName,
  activeProjectId,
  activeSubjectId,
}: AtlasWorkspaceHeaderProps) {
  return (
    <div id="atlas-workspace-header" className="flex-row">
      <Link href={AppRoutes.selectProjectModal(activeProjectId)}>
        {activeProjectName}
      </Link>
    </div>
  );
}
