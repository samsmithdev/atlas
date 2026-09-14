import type { MarkDownEditorSelector } from "@/features/markdownEditor/components/MarkdownEditor/MarkdownEditor";
import type { EditorStateSnapshot } from "@tiptap/react";

export function textDecorationSubMenuStateSelector(
  ctx: EditorStateSnapshot<MarkDownEditorSelector>
) {
  return {
    isBold: ctx.editor.isActive("bold") ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive("italic") ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
    isStrike: ctx.editor.isActive("strike") ?? false,
    canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
    isCode: ctx.editor.isActive("code") ?? false,
    canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
  };
}
