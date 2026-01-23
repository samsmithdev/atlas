'use client' // <--- Crucial! This tells Next.js this runs in the browser.

import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import StarterKit from '@tiptap/starter-kit'
import { updateFile, fetchFile } from '../../../actions/files'

const AtlasMarkdownEditor = ({ fileId, initialContent }: { fileId: string, initialContent: any }) => {
  const [saveStatus, setSaveStatus] = useState('Saved');

  //const file = 

  const saveToDatabase = async (jsonContent: any) => {
    setSaveStatus('Saving...')
    try {
      await updateFile(fileId, jsonContent);
      setSaveStatus('Saved');
    } catch (error) {
      setSaveStatus('Error saving');
      console.error(error);
    }
  }

  const debouncedSaved = useDebouncedCallback((content) => {
    saveToDatabase(content)
  }, 1000)

  useEffect(() => {
    // When component dies (unmounts), force the save immediately
    return () => {
      debouncedSaved.flush();
    }
  }, [debouncedSaved]);

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent,
    // This is where Tailwind shines. We inject classes into the
    // rendered HTML elements inside the editor.
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-full p-4',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Immediate UI feedback
      setSaveStatus('Unsaved changes...');

      const json = editor.getJSON();

      debouncedSaved(json);
    }
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col gap-2" id="atlas-markdown-editor-container">
      <div className="text-sm text-gray-500 text-right" id="atlas-markdown-editor-status-container">
        Status: {saveStatus}
      </div>
      <div className="border border-gray-300 rounded-md p-4 min-h-[500px]" id="atlas-markdown-editor-editor-container">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default AtlasMarkdownEditor