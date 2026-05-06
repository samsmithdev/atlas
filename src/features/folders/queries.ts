import { successActionResponse } from "@/lib/actions/responses";
import { withAuth } from "@/lib/actions/wrapper";
import prisma from "@/lib/db";
import { folderSelectorSelect } from "./types";

export const fetchFolderSelectorsBySubject = withAuth(
  async (userId, projectId: string) => {
    const result = await prisma.folder.findMany({
      where: {
        userId,
        projectId,
      },
      select: folderSelectorSelect,
      orderBy: { name: "asc" },
    });

    return successActionResponse(
      result,
      "Folder selectors fetched successfully."
    );
  }
);
