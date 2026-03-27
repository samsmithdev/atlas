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
    link: string,
    folderId?: string,
    folderName?: string,
};

export type AtlasGroupedFilesForNav = Record<string, {
    folderName?: string,
    folderId: string,
    files: AtlasFileNavigatorItem[],
}>;

export enum AtlasNavigationTypes {
    File = "file",
    Folder = "folder",
    Project = "project",
    Subject = "subject",
};

export type AtlasNavigationItem = {
    id: string,
    name: string,
    type: AtlasNavigationTypes,
    link: string,
};