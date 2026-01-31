
import AtlasNewItemButton from '@/components/atlas/buttons/AtlasNewItemButton';

export default function AtlasEmptyEditMarkdownFilePane() {
    return (
        <div className='flex flex-col w-full h-full items-center bg-black text-blue-400' id='atlas-empty-select-project-pane'>
            <h2 className='text-2xl'>No Files Open</h2>
            <p>Please select a file from the navigator on the left, or create one with the button below.</p>
            <AtlasNewItemButton />
        </div>
    )
}