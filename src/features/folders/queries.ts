import { withAuth } from "@/lib/action-wrapper";
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

    const safeFolders = JSON.parse(JSON.stringify(result));

    return {
      success: true,
      message: "Folder selectors fetched successfully.",
      data: safeFolders,
    };
  }
);
