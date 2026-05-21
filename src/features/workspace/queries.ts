// MARK: Imports
import { successActionResponse } from "@/lib/actions/responses";
import { withAuth } from "@/lib/actions/wrapper";
import prisma from "@/lib/db";
import {
  fileContentSelect,
  fileSelectorSelect,
  folderSelectorSelect,
  projectSelectorSelect,
  SubjectSelector,
  subjectSelectorSelect,
} from "./types";

// MARK: Subjects
export const fetchSubjectSelectors = withAuth(async (userId) => {
  const result = (await prisma.subject.findMany({
    where: { userId },
    select: subjectSelectorSelect,
  })) as SubjectSelector[];

  return successActionResponse(
    result,
    "Subject selectors fetched successfully."
  );
});

export const fetchSubjectsWithProjectSelectors = withAuth(async (userId) => {
  const result = await prisma.subject.findMany({
    where: { userId },
    select: {
      ...subjectSelectorSelect,

      projects: {
        select: projectSelectorSelect,
        orderBy: { readableId: "asc" },
      },
    },

    orderBy: [{ shortcode: "asc" }, { name: "asc" }],
  });

  return successActionResponse(
    result,
    "Subjects and their projects fetched successfully."
  );
});

// MARK: Projects
export const fetchProjectSelectorsBySubject = withAuth(async (userId) => {
  const result = await prisma.project.findMany({
    where: { userId },
    select: {
      ...projectSelectorSelect,
      subject: {
        select: subjectSelectorSelect,
      },
    },
    orderBy: [
      { subject: { shortcode: "asc" } },
      { subject: { name: "asc" } },
      { readableId: "asc" },
    ],
  });

  return successActionResponse(
    result,
    "Project Selectors fetched successfully."
  );
});

// MARK: Folders
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

// MARK: Files
export const fetchFileSelectorsByFolder = withAuth(
  async (userId, folderId: string) => {
    const result = await prisma.file.findMany({
      where: {
        userId,
        folderId,
      },
      select: fileSelectorSelect,
      orderBy: { readableId: "asc" },
    });

    return successActionResponse(
      result,
      "File selectors fetched successfully."
    );
  }
);

export const fetchFileContent = withAuth(async (userId, fileId: string) => {
  const result = await prisma.file.findFirst({
    where: {
      userId,
      id: fileId,
    },
    select: fileContentSelect,
  });

  return successActionResponse(result, "File contents fetched successfully.");
});
