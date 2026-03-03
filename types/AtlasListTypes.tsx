/*
    List item type to bundle data for AtlasListItemCard.
*/
export type AtlasListItem = {
    displayText: string;
    itemId: string;
    link: string;
}

export type AtlasListGroup = {
    header: string;
    description?: string;
    id: string;
    listItems: AtlasListItem[];
}

export type AtlasProjectNavigatorItems = Record<string, AtlasListGroup>;

export enum AtlasItemType {
    File = 'file',
    Folder = 'folder',
    Project = 'project',
    Subject = 'subject'
}

// File Navigator List Types
export enum AtlasFileListType {
    File = 'file',
    Folder = 'folder',
}

export type AtlasFileListItem = {
    name: string;
    id: string;
    description?: string;
    link?: string;
    type: AtlasFileListType;
    subitems?: AtlasFileListItem[];
}

export type AtlasFileListItemRecord = Record<string, AtlasFileListItem>;