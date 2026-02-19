import { Button } from '@/components/ui/button';
import { Card, CardAction} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AtlasListItemCardProps extends React.ComponentPropsWithoutRef<typeof Link> {
    displayText: string;
    itemId: string;
    onDelete: (id: string) => void;
}

export default function AtlasListItemCard({displayText, itemId, onDelete, href, ...props }: AtlasListItemCardProps) {
    return (
        <Card className='flex flex-row'>
            <Link 
            href={href}
            className={cn(
                // Sizing
                'w-full text-lg',

                // Color
                'bg-background text-foreground'
            )}
            >
                {displayText}
            </Link>
            <Button variant='destructive' size='xs' className='shrink' onClick={() => onDelete(itemId)}/>
        </Card>
    )
}