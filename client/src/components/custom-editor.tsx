'use client';

import {CKEditor} from '@ckeditor/ckeditor5-react';
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
  TodoList, EventInfo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

function CustomEditor({blogDatas, setBlogDatas}) {

  const handleUpdateBlogData = (datas: string) => {
    setBlogDatas(datas);
  };

  return (
      <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: {
              items: [
                'undo', 'redo',
                '|',
                'heading',
                '|',
                'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                '|',
                'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                '|',
                'link', 'blockQuote', 'codeBlock',
                '|',
                'bulletedList', 'numberedList', 'todoList'
              ],
            },
            plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, Code, Heading, FontFamily, FontSize, FontColor, FontBackgroundColor, BoldEditing, ItalicEditing, Strikethrough, Subscript, Superscript, Link, BlockQuote, CodeBlock, List, TodoList, ImageInsert],

          }}
          data={blogDatas}
          onBlur={(event: EventInfo, editor: ClassicEditor) => {
            const datas = editor.getData();
            handleUpdateBlogData(datas);
          }}
      />
  );
}

export default CustomEditor;
