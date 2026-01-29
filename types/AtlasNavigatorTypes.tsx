import { Subject } from "@prisma/client";

export type AtlasProjectNavigatorItem = {
    id: string,
    name: string,
    link: string,
};

// <SubjectId, AtlasProjectNavigatorItem
export type AtlasGroupedProjectsForNav = Record<string, {
    subjectName: string;
    subjectShortcode: string;
    projects: AtlasProjectNavigatorItem[];
}>;