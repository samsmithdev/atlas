import { EditorContent, useEditor } from "@tiptap/react";
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

interface AtlasFileReadOnlyPreviewProps {
    content: string;
}

export function AtlasFileReadOnlyPreview({ content }: AtlasFileReadOnlyPreviewProps) {
    const editor = useEditor({
        extensions: [Document, Paragraph, Text],
        content: content,
        editable: false,
    })


}