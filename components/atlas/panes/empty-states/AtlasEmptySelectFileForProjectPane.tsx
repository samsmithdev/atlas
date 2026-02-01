import AtlasNewItemButton from '@/components/atlas/buttons/AtlasNewItemButton';

export default function AtlasEmptySelectFileForProjectPane() {
    return (
                <div className='flex flex-col w-full h-full items-center bg-black text-blue-400' id='atlas-empty-select-file-for-project-pane'>
                    <h2 className='text-2xl'>No Files Found</h2>
                    <p>ATLAS was unable to locate any files for this project. Please create one with the button below.</p>
                    <AtlasNewItemButton />
                </div>
    )
}