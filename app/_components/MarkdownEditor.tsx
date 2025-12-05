'use client' // <--- Crucial! This tells Next.js this runs in the browser.

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Start writing your notes...</p>',
    // This is where Tailwind shines. We inject classes into the
    // rendered HTML elements inside the editor.
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none h-screen p-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full border rounded-lg shadow-sm bg-white">
      {/* This acts as the container */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor