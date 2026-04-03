"use server";
// Prisma Imports
import prisma from "@/lib/db";
// Auth Imports
import { checkAuth } from "@/features/auth/queries";
// Type Imports
import { SubjectSelector } from "./types";

export async function fetchSubjectSelectors() {
  const { userId } = await checkAuth();

  const subjects = await prisma.subject.findMany({
    where: { userId },
    orderBy: {
      shortcode: "asc",
      name: "asc",
    },
    select: {
      id: true,
      shortcode: true,
      name: true,
      description: true,
    },
  });

  const convertedSubjects = subjects.map((subjectResult) => {
    const convertedSubject: SubjectSelector = {
      ...subjectResult,
    };

    return convertedSubject;
  });

  return convertedSubjects;
}

export async function fetchSubjectProjectFolderFileSelectors() {
  const { userId, session } = await checkAuth();

  const subjects = await prisma.subject.findMany({
    where: { userId },
    orderBy: {
      shortcode: "asc",
      name: "asc",
    },
    select: {
      id: true,
      shortcode: true,
      name: true,
      description: true,

      projects: {
        orderBy: { readableId: "asc" },
        select: {
          id: true,
          readableId: true,
          description: true,
          files: {
            where: { folderId: null },
            orderBy: { readableId: "asc" },
            select: {
              name: true,
              id: true,
              readableId: true,
              createdDate: true,
              description: true,
              tags: true,
            },
          },

          folders: {
            orderBy: { name: "asc" },
            select: {
              id: true,
              name: true,
              createdAt: true,
              files: {
                orderBy: { readableId: "asc" },
                select: {
                  name: true,
                  id: true,
                  readableId: true,
                  createdDate: true,
                  description: true,
                  tags: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return subjects;
}
