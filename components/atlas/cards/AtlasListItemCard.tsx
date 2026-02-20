import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AtlasLinkButton } from '../buttons/AtlasLinkButton';

interface AtlasListItemCardProps extends React.ComponentPropsWithoutRef<typeof Link> {
    displayText: string;
    itemId: string;
    onDelete: (id: string) => void;
}
// Set text-lg at calling site?
export default function AtlasListItemCard({displayText, itemId, onDelete, href, className, ...props }: AtlasListItemCardProps) {
    return (
        <Card className='flex flex-row w-full'>
            
            <CardContent className='flex flex-col w-full h-full'>
                <AtlasLinkButton href={href} displayText={displayText} className='flex flex-1' variant='atlas_list_item' />
            </CardContent>
            <div className='flex shrink'>
                <CardAction className='flex shrink'>
                <Button size='xs' variant='destructive' onClick={() => onDelete(itemId)}>x</Button>
            </CardAction>
            <div className='flex-1'></div>
            </div>
        </Card>
    )
}