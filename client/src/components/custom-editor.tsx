'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Code,
  Heading,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  BoldEditing,
  ItalicEditing,
  Strikethrough,
  Subscript,
  Superscript,
  Link,
  BlockQuote,
  CodeBlock,
  List,
  ImageInsert,
  TodoList,
  EventInfo,
  Indent,
  IndentBlock,
  Image,
  SimpleUploadAdapter,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import { Dispatch, SetStateAction } from 'react';

function CustomEditor({
  postDatas,
  setPostDatas,
}: {
  postDatas: string;
  setPostDatas: Dispatch<SetStateAction<string | undefined>>;
}) {
  const handleUpdatePostDatas = (datas: string) => {
    setPostDatas(datas);
  };

  const reinitPostDatas = (editor: ClassicEditor) => {
    editor.setData('');
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'fontfamily',
            'fontsize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            '|',
            'link',
            'blockQuote',
            'codeBlock',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            '|',
            'outdent',
            'indent',
            '|',
            'insertImage',
          ],
        },
        indentBlock: {
          classes: [
            'custom-block-indent-a',
            'custom-block-indent-b',
            'custom-block-indent-c',
          ],
        },
        codeBlock: {
          languages: [
            {
              language: 'plaintext',
              label: 'Plain text',
              class: 'default-code',
            },
            { language: 'php', label: 'PHP', class: 'php-code' },
            {
              language: 'javascript',
              label: 'JavaScript',
              class: 'javascript-code',
            },
            {
              language: 'typescript',
              label: 'typescript',
              class: 'typescript-code',
            },
          ],
        },
        simpleUpload: {
          uploadUrl: process.env.NEXT_PUBLIC_API_URL + '/posts/image',
          withCredentials: true,
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
          ],
        },
        plugins: [
          Bold,
          Essentials,
          Italic,
          Mention,
          Paragraph,
          Undo,
          Code,
          Heading,
          FontFamily,
          FontSize,
          FontColor,
          FontBackgroundColor,
          BoldEditing,
          ItalicEditing,
          Strikethrough,
          Subscript,
          Superscript,
          Link,
          BlockQuote,
          CodeBlock,
          List,
          TodoList,
          ImageInsert,
          Indent,
          IndentBlock,
          Image,
          ImageInsert,
          SimpleUploadAdapter,
        ],
      }}
      data={postDatas}
      onBlur={(event: EventInfo, editor: ClassicEditor) => {
        const datas = editor.getData();
        handleUpdatePostDatas(datas);
      }}
    />
  );
}

export default CustomEditor;
