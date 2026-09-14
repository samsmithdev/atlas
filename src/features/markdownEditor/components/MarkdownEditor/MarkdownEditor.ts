import { Editor } from "@tiptap/core";
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
import StarterKit from "@tiptap/starter-kit";

export const MarkDownEditor = new Editor({
  element: document.querySelector(".element"),
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
});

export type MarkDownEditorSelector = typeof MarkDownEditor;
