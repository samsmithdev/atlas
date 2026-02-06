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
    onDelete: (id: string) => void;
}

export default function AtlasItemButton({ cellItem, onDelete }: AtlasItemButtonProps) {
    return (
        <div id='atlas-item-cell' className='flex flex-row'>
            <Link className='flex-1' href={cellItem.link}>{cellItem.name}</Link>
            <Button variant='destructive' size='xs' className='shrink' onClick={() => onDelete(cellItem.id)}>X</Button>
        </div>
    )
}