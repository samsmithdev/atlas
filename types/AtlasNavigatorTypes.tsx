import { Subject } from "@/app/generated/prisma";

export type AtlasProjectNavigatorItem = {
    id: string,
    name: string,
    subject?: Subject,
    subjectId?: string,
    link: string,
}

export type AtlasGroupedProjectsForNav<> = Record<string, {
    subjectName: string;
    subjectShortcode: string;
    projects: AtlasProjectNavigatorItem[];
}>;