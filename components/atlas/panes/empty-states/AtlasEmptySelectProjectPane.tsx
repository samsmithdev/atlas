
import AtlasNewItemButton from '@/components/atlas/buttons/AtlasNewItemButton';

export default function AtlasEmptySelectProjectPane() {
    return (
        <div className='flex flex-col w-full h-full items-center bg-black text-blue-400' id='atlas-empty-select-project-pane'>
            <h2 className='text-2xl'>No Projects Found</h2>
            <p>ATLAS was unable to locate any projects. Please create one with the button below.</p>
            <AtlasNewItemButton />
        </div>
    )
}