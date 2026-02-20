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
        <Card>
            <CardAction>
                <Button size='xs' variant='destructive' onClick={() => onDelete(itemId)}>x</Button>
            </CardAction>
            <CardContent className='flex flex-col'>
                <AtlasLinkButton href={href} displayText={displayText} className='flex flex-1' variant='atlas_list_item' />
            </CardContent>
        </Card>
    )
}