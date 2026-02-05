import { AtlasNavigationTypes } from "@/types/AtlasNavigatorTypes";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import Link from "next/link";

import { deleteFile } from "@/actions/files";


type AtlasItemCellData = {
    id: string;
    name: string;
    type: AtlasNavigationTypes;
    link: string;
}

interface AtlasItemButtonProps {
    cellItem: AtlasItemCellData;
}

export default function AtlasItemButton({ cellItem }: AtlasItemButtonProps) {
    const deleteItem = (id: string, type: AtlasNavigationTypes) => {
        switch (type) {
            case (AtlasNavigationTypes.File):
                deleteFile(id);
                break;
            default:
                break;
        }
    }

    return (
        <div id='atlas-item-cell' className='flex flex-row'>
            <Link className='flex-1' href={cellItem.link}>{cellItem.name}</Link>
            <Button variant='destructive' size='xs' className='shrink' onClick={() => deleteItem(cellItem.id, AtlasNavigationTypes.File)}>X</Button>
        </div>
    )
}