'use client';

import { Button } from "@/components/ui/button";
import { AtlasFileNavigatorItem, AtlasNavigationTypes } from "@/types/AtlasNavigatorTypes";
import { useState } from "react";
import AtlasItemButton from "./AtlasItemButton";

type AtlasFolderItemCellData = {
    folderName: string;
    folderId: string;
    files: AtlasFileNavigatorItem[];
}

interface AtlasFolderItemButtonProps {
    cellItem: AtlasFolderItemCellData;
    onDelete: (id: string) => void;
}

export default function AtlasFolderItemButton({ cellItem, onDelete }: AtlasFolderItemButtonProps) {
    const [displayList, setDisplayList] = useState(false);

    return (
        <div>
            <Button variant='atlas_action' className='flex-1' onClick={() => setDisplayList(!displayList)}>{cellItem.folderName}</Button>
            {displayList && cellItem.files.length>0 &&
                cellItem.files.map((file) => (
                    <AtlasItemButton 
                        key={file.id}
                        cellItem={{...file, type: AtlasNavigationTypes.File}}
                        onDelete={() => onDelete(file.id)}
                    />
                ))
            }
        </div>
    )
}

// TODO: Setup a State variable and button that optionally renders a list of files below it? Will need to figure out styling from the parent to here to the children item buttons and the item button...