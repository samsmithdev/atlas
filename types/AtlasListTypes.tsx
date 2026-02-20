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