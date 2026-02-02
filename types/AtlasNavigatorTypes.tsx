import { Subject } from "@prisma/client";

export type AtlasProjectNavigatorItem = {
    id: string,
    name: string,
    link: string,
};

// <SubjectId, AtlasProjectNavigatorItem>
export type AtlasGroupedProjectsForNav = Record<string, {
    subjectName: string;
    subjectShortcode: string;
    projects: AtlasProjectNavigatorItem[];
}>;

export type AtlasFileNavigatorItem = {
    id: string,
    readableId: string,
    name: string,
    link: string
};

export enum AtlasNavigationTypes {
    File = "file",
    Project = "project",
    Subject = "subject",
};

export type AtlasNavigationItem = {
    id: string,
    name: string,
    type: AtlasNavigationTypes,
    link: string,
};