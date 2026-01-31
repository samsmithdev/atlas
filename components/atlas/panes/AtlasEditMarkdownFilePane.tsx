'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import StarterKit from '@tiptap/starter-kit'
import { updateFile } from '@/actions/files'

interface AtlasEditMarkdownFilePaneProps {
    fileId: string;
    initialContent: any; // ANY WARNING: Best for tip tap content?
}

export default function AtlasEditMarkdownFilePane({ fileId, initialContent }: AtlasEditMarkdownFilePaneProps) {
    const [saveStatus, setSaveStatus] = useState('Saved');

    const saveToDatabase = async (jsonContent: any) => {
        setSaveStatus('Saving...');
        try {
            await updateFile(fileId, jsonContent);
            setSaveStatus('Saved');
        } catch (error) {
            setSaveStatus('Error saving');
            console.error(error);
        }
    }

    const debouncedSaved = useDebouncedCallback((content) => {
        saveToDatabase(content);
    }, 1000);

    useEffect(() => {
        return () => {
            debouncedSaved.flush();
        }
    }, [debouncedSaved]);

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full p-4',
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            setSaveStatus('Unsaved changes...');

            const json = editor.getJSON();

            debouncedSaved(json);
        }
    })

    return (
        <div className="flex flex-col gap-2 h-full w-full">
            <div className='text-sm text-gray-500 text-right'>
                Status: {saveStatus}
            </div>
            <div className='border border-gray-300 rounded-md p-4 min-h-[500px] flex-1 mb-8'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}