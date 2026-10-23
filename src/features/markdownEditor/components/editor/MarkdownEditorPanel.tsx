import Audio from "@tiptap/extension-audio";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Collaboration from "@tiptap/extension-collaboration";
import Details from "@tiptap/extension-details";
import DragHandle from "@tiptap/extension-drag-handle";
import Emoji from "@tiptap/extension-emoji";
import FileHandler from "@tiptap/extension-file-handler";
import FindAndReplace from "@tiptap/extension-find-and-replace";
import Image from "@tiptap/extension-image";
import InvisibleCharacters from "@tiptap/extension-invisible-characters";
import { ListKit } from "@tiptap/extension-list";
import Mathematics from "@tiptap/extension-mathematics";
import Mention from "@tiptap/extension-mention";
import NodeRange from "@tiptap/extension-node-range";
import { TableKit } from "@tiptap/extension-table";
import TableOfContents from "@tiptap/extension-table-of-contents";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import UniqueId from "@tiptap/extension-unique-id";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const MarkdownEditorPanel = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Audio,
      CodeBlockLowlight,
      Collaboration,
      Details,
      DragHandle,
      Emoji,
      FileHandler,
      FindAndReplace,
      Image,
      InvisibleCharacters,
      ListKit,
      Mathematics,
      Mention,
      NodeRange,
      TableKit,
      TableOfContents,
      TextAlign,
      TextStyleKit,
      UniqueId,
    ],
    content: "<p>Start typing...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null; // Prevent hydration errors before editor mounts
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="grow overflow-y-auto p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
