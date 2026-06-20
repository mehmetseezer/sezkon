'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import TiptapLink from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Highlighter,
  Code,
  Quote,
  Undo,
  Redo,
  Minus,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadTab, setUploadTab] = useState<'upload' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-[#6191c4] underline cursor-pointer' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'rounded-xl max-w-full mx-auto my-4' },
      }),
      Placeholder.configure({
        placeholder: 'Blog içeriğinizi yazmaya başlayın...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-slate prose-xl max-w-none min-h-[400px] px-6 py-4 focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('URL girin:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Yükleme hatası');
      }

      setImageUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Dosya yüklenemedi');
    } finally {
      setUploading(false);
    }
  };

  const handleInsertImage = () => {
    if (!imageUrl) {
      setError('Lütfen bir görsel seçin veya URL girin.');
      return;
    }
    editor.chain().focus().setImage({ src: imageUrl, alt: altText }).run();
    setModalOpen(false);
    setImageUrl('');
    setAltText('');
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all ${
        isActive
          ? 'bg-[#6191c4] text-white shadow-sm'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
      }`}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-slate-200 mx-1" />;

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Geri Al">
          <Undo size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="İleri Al">
          <Redo size={16} />
        </ToolbarButton>

        <Divider />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Kalın"
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="İtalik"
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Altı Çizili"
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Üstü Çizili"
        >
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          title="Vurgula"
        >
          <Highlighter size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Kod"
        >
          <Code size={16} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Başlık 1"
        >
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Başlık 2"
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Başlık 3"
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Madde Listesi"
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numaralı Liste"
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Alıntı"
        >
          <Quote size={16} />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Sola Hizala"
        >
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Ortala"
        >
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Sağa Hizala"
        >
          <AlignRight size={16} />
        </ToolbarButton>

        <Divider />

        {/* Media */}
        <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Link Ekle">
          <Link2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            setModalOpen(true);
            setError('');
            setImageUrl('');
            setAltText('');
            setUploadTab('upload');
          }}
          title="Görsel Ekle (Dosya veya URL)"
        >
          <ImageIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Ayırıcı Çizgi"
        >
          <Minus size={16} />
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Upload Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-md overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">Görsel Ekle</h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Tab Buttons */}
            <div className="bg-slate-100 p-1 flex rounded-xl text-sm">
              <button
                type="button"
                onClick={() => {
                  setUploadTab('upload');
                  setError('');
                }}
                className={`flex-1 py-2 font-bold rounded-lg transition-all ${
                  uploadTab === 'upload'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Dosya Yükle
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadTab('url');
                  setError('');
                }}
                className={`flex-1 py-2 font-bold rounded-lg transition-all ${
                  uploadTab === 'url'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Görsel URL
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Tab content */}
            {uploadTab === 'upload' ? (
              <div className="space-y-3">
                <label className="block border-2 border-dashed border-slate-200 hover:border-[#6191c4] transition-colors rounded-2xl p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="animate-spin border-2 border-t-2 border-[#6191c4] border-t-transparent w-6 h-6 rounded-full" />
                      <span className="text-xs font-semibold text-slate-500">Yükleniyor...</span>
                    </div>
                  ) : imageUrl ? (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-green-600 block">✓ Görsel Yüklendi</span>
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className="max-h-24 mx-auto rounded-lg object-cover"
                      />
                      <span className="text-[10px] text-slate-400 block truncate">{imageUrl}</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <span className="block text-slate-700 font-bold text-sm">Görsel Seç</span>
                      <span className="block text-slate-400 text-xs">JPG, PNG, WebP (Maks. 5MB)</span>
                    </div>
                  )}
                </label>
              </div>
            ) : (
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-500">Görsel URL'si</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                />
              </div>
            )}

            {/* Alt Text (SEO) */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-500 flex items-center justify-between">
                <span>Alternatif Metin (Alt Text - SEO)</span>
                <span className="text-[10px] font-normal text-slate-400">SEO için çok önemli!</span>
              </label>
              <input
                type="text"
                placeholder="örn: ERP sistem paneli arayüzü"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                disabled={uploading || !imageUrl}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6191c4] to-[#8b5cf6] text-white font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles for the editor */}
      <style jsx global>{`
        .tiptap p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap {
          min-height: 400px;
        }
        .tiptap h1 {
          font-size: 2em;
          font-weight: 800;
          margin-top: 1em;
          margin-bottom: 0.5em;
          color: #1e293b;
        }
        .tiptap h2 {
          font-size: 1.5em;
          font-weight: 700;
          margin-top: 0.8em;
          margin-bottom: 0.4em;
          color: #1e293b;
        }
        .tiptap h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin-top: 0.6em;
          margin-bottom: 0.3em;
          color: #334155;
        }
        .tiptap p {
          font-size: 1.15rem;
          margin-bottom: 0.75em;
          line-height: 1.8;
          color: #475569;
        }
        .tiptap ul, .tiptap ol {
          padding-left: 1.5em;
          margin-bottom: 0.75em;
        }
        .tiptap li {
          margin-bottom: 0.25em;
        }
        .tiptap blockquote {
          border-left: 4px solid #6191c4;
          padding-left: 1em;
          margin-left: 0;
          color: #64748b;
          font-style: italic;
        }
        .tiptap code {
          background: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
          color: #6191c4;
        }
        .tiptap mark {
          background: #fef08a;
          padding: 0.1em 0.2em;
          border-radius: 2px;
        }
        .tiptap hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 1.5em 0;
        }
        .tiptap a {
          color: #6191c4;
          text-decoration: underline;
        }
        .tiptap img {
          border-radius: 12px;
          max-width: 100%;
          margin: 1em auto;
          display: block;
        }
      `}</style>
    </div>
  );
}
