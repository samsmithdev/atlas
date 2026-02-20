/*
    List item type to bundle data for AtlasListItemCard.
*/
export type AtlasListItem = {
    displayText: string;
    itemId: string;
    link: string;
    onDelete: (id: string) => void;
}