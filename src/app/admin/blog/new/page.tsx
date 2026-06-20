'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  Save,
  Send,
  Loader2,
  Star,
  Image as ImageIcon,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Settings,
  Globe,
  UploadCloud,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-slate-200 rounded-2xl p-12 flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-slate-400" size={24} />
    </div>
  ),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export const CATEGORIES = [
  'ERP & Yapay Zeka',
  'Güvenlik & CRM',
  'API & Entegrasyon',
  'Mobil Uygulama',
  'Web Tasarım',
  'E-Ticaret',
  'Endüstri 4.0',
  'CNC & Metal İşleme',
  'Yazılım Geliştirme'
];

// Helper: auto-calculate reading time from HTML content
function calcReadTime(html: string): string {
  const plainText = html.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} dk`;
}

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const getGeoPrompt = () => {
    const topic = form.title || 'Seçtiğiniz Konu Başlığı';
    return `GEO OPTIMIZED CONTENT PROMPT

You are an expert Generative Engine Optimization (GEO) content writer.
Your task is to create content that is highly likely to be cited by AI systems such as ChatGPT, Perplexity, Gemini, and Claude.

Follow these rules strictly:

Start with a clear, encyclopedic definition of the topic in the first paragraph.
Use structured headings (H2, H3) with semantic clarity.
Include entity-based references (companies, tools, technologies, frameworks) naturally in the text.
Prioritize factual, verifiable, and widely accepted information.
Use short, extractable sentences that AI systems can easily quote.
Include at least one comparison table if relevant.
Add a dedicated FAQ section with 5–10 questions.
Avoid marketing language, hype, or subjective claims.
Write in a neutral, Wikipedia-like tone.
Ensure each section can stand alone as a source snippet.

Additional GEO optimization rules:

Each paragraph should contain at least one “AI-extractable fact”.
Prefer structured data over narrative storytelling.
Use explicit definitions like “X is defined as…”
When possible, include numbers, steps, or lists.
Ensure content is semantically dense (high information per sentence).

Topic: ${topic}

Output format:

Title
Definition (first paragraph, must be direct)
H2 Sections (at least 4)
Comparison Table (if applicable)
FAQ Section (5–10 questions)
Summary (2–3 sentences)`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getGeoPrompt());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: '',
    author: 'Mehmet Sezer',
    read_time: '1 dk',
    is_featured: false,
    is_published: false,
    seo_title: '',
    seo_description: '',
    focus_keyword: '',
    seo_keywords: '',
  });

  // Check auth
  useEffect(() => {
    fetch('/api/auth/me').then((res) => {
      if (!res.ok) router.push('/admin/login');
    });
  }, [router]);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugify(title),
    }));
  };

  // Handle content change with auto reading time
  const handleContentChange = (html: string) => {
    const readTime = calcReadTime(html);
    setForm((prev) => ({ ...prev, content: html, read_time: readTime }));
  };

  // Cover image local file upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
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
        throw new Error(data.error || 'Kapak resmi yüklenemedi');
      }

      setForm((prev) => ({ ...prev, cover_image: data.url }));
    } catch (err: any) {
      setError(err.message || 'Görsel yüklenemedi');
    } finally {
      setUploadingCover(false);
    }
  };

  const validateForPublish = (): string[] => {
    const errors: string[] = [];
    if (!form.title.trim()) errors.push('Başlık zorunludur.');
    if (!form.excerpt.trim()) errors.push('Özet / Kısa Giriş girilmemiş.');
    if (!form.content.trim() || form.content === '<p></p>') errors.push('Blog içeriği boş olamaz.');
    if (!form.category) errors.push('Kategori seçilmemiş.');
    if (!form.cover_image.trim()) errors.push('Kapak görseli eklenmemiş.');
    if (!form.seo_title.trim()) errors.push('SEO Başlığı (Meta Title) eksik.');
    if (!form.seo_description.trim()) errors.push('Meta Açıklaması (Meta Description) eksik.');
    if (!form.focus_keyword.trim()) errors.push('Odak Anahtar Kelime girilmemiş.');
    return errors;
  };

  const handleSubmit = async (publish: boolean) => {
    setError('');
    setValidationErrors([]);

    if (publish) {
      const errs = validateForPublish();
      if (errs.length > 0) {
        setValidationErrors(errs);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, is_published: publish }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Bir hata oluştu');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  // SEO Analysis Logic
  const analyzeSEO = () => {
    const { title, content, excerpt, seo_title, seo_description, focus_keyword } = form;
    const finalSeoTitle = seo_title || title;
    const finalSeoDesc = seo_description || excerpt;
    const plainText = content ? content.replace(/<[^>]*>/g, '') : '';
    const wordCount = plainText.trim() === '' ? 0 : plainText.trim().split(/\s+/).length;

    const checklist: Array<{
      id: string;
      label: string;
      status: 'success' | 'warning' | 'error';
      feedback: string;
    }> = [];

    if (!focus_keyword) {
      return {
        score: 0,
        checklist: [
          {
            id: 'keyword-missing',
            label: 'Odak anahtar kelime eksik',
            status: 'warning' as const,
            feedback: 'SEO analizi yapabilmek için lütfen odak anahtar kelime girin.',
          },
        ],
      };
    }

    const kw = focus_keyword.toLowerCase();

    // 1. Focus Keyword in Title
    const titleMatch = title.toLowerCase().includes(kw);
    checklist.push({
      id: 'kw-title',
      label: 'Başlıkta Anahtar Kelime',
      status: titleMatch ? 'success' : 'error',
      feedback: titleMatch
        ? 'Anahtar kelime ana başlıkta bulunuyor.'
        : 'Odak anahtar kelimeniz ana başlıkta geçmiyor.',
    });

    // 2. Focus Keyword in SEO Description
    const descMatch = finalSeoDesc.toLowerCase().includes(kw);
    checklist.push({
      id: 'kw-desc',
      label: 'Meta Açıklamasında Anahtar Kelime',
      status: descMatch ? 'success' : 'error',
      feedback: descMatch
        ? 'Anahtar kelime meta açıklamasında bulunuyor.'
        : 'Odak anahtar kelimeniz meta açıklamasında geçmiyor.',
    });

    // 3. Focus Keyword in first paragraph
    const firstParagraph = content.match(/<p>(.*?)<\/p>/)?.[1] || '';
    const firstParagraphMatch = firstParagraph.toLowerCase().includes(kw);
    checklist.push({
      id: 'kw-first-para',
      label: 'İlk Paragrafta Anahtar Kelime',
      status: firstParagraphMatch ? 'success' : 'warning',
      feedback: firstParagraphMatch
        ? 'Anahtar kelime makalenin ilk paragrafında yer alıyor.'
        : 'Anahtar kelime ilk paragrafta geçmiyor, giriş paragrafında kullanılması tavsiye edilir.',
    });

    // 4. Keyword density
    const kwCount = plainText.toLowerCase().split(kw).length - 1;
    const kwDensity = wordCount > 0 ? (kwCount / wordCount) * 100 : 0;
    let densityStatus: 'success' | 'warning' | 'error' = 'success';
    let densityFeedback = `Anahtar kelime yoğunluğu %${kwDensity.toFixed(2)} (${kwCount} kez). Bu oran ideal.`;

    if (kwDensity === 0) {
      densityStatus = 'error';
      densityFeedback = 'Odak anahtar kelime makale gövdesinde hiç bulunamadı.';
    } else if (kwDensity < 0.5) {
      densityStatus = 'warning';
      densityFeedback = `Anahtar kelime yoğunluğu %${kwDensity.toFixed(2)} çok düşük. Daha fazla kullanın.`;
    } else if (kwDensity > 2.5) {
      densityStatus = 'warning';
      densityFeedback = `Anahtar kelime yoğunluğu %${kwDensity.toFixed(2)} çok yüksek (%2.5'ten az olması önerilir).`;
    }
    checklist.push({
      id: 'kw-density',
      label: 'Anahtar Kelime Yoğunluğu',
      status: densityStatus,
      feedback: densityFeedback,
    });

    // 5. Title Length (40-60 optimal)
    const titleLen = finalSeoTitle.length;
    let titleStatus: 'success' | 'warning' | 'error' = 'success';
    let titleFeedback = `SEO başlık uzunluğu (${titleLen} karakter) ideal aralıkta.`;
    if (titleLen === 0) {
      titleStatus = 'error';
      titleFeedback = 'SEO Başlığı girilmemiş veya boş.';
    } else if (titleLen < 40) {
      titleStatus = 'warning';
      titleFeedback = `SEO başlığı çok kısa (${titleLen} karakter). En az 40 karakter önerilir.`;
    } else if (titleLen > 65) {
      titleStatus = 'warning';
      titleFeedback = `SEO başlığı çok uzun (${titleLen} karakter). 65 karakterden az olması önerilir.`;
    }
    checklist.push({
      id: 'title-len',
      label: 'SEO Başlık Uzunluğu',
      status: titleStatus,
      feedback: titleFeedback,
    });

    // 6. Meta Description Length (110-160 optimal)
    const descLen = finalSeoDesc.length;
    let descStatus: 'success' | 'warning' | 'error' = 'success';
    let descFeedback = `Meta açıklama uzunluğu (${descLen} karakter) ideal aralıkta.`;
    if (descLen === 0) {
      descStatus = 'error';
      descFeedback = 'Meta açıklaması girilmemiş veya boş.';
    } else if (descLen < 110) {
      descStatus = 'warning';
      descFeedback = `Meta açıklaması çok kısa (${descLen} karakter). En az 110 karakter önerilir.`;
    } else if (descLen > 165) {
      descStatus = 'warning';
      descFeedback = `Meta açıklaması çok uzun (${descLen} karakter). 165 karakterden az olması önerilir.`;
    }
    checklist.push({
      id: 'desc-len',
      label: 'Meta Açıklama Uzunluğu',
      status: descStatus,
      feedback: descFeedback,
    });

    // 7. Word count
    let wordStatus: 'success' | 'warning' | 'error' = 'success';
    let wordFeedback = `Kelime sayısı: ${wordCount}. Yazınız uzunluk olarak zengin.`;
    if (wordCount === 0) {
      wordStatus = 'error';
      wordFeedback = 'Lütfen blog içeriği yazmaya başlayın.';
    } else if (wordCount < 300) {
      wordStatus = 'warning';
      wordFeedback = `Kelime sayısı (${wordCount}) yetersiz. Arama motorları için en az 300 kelime yazmanız önerilir.`;
    }
    checklist.push({
      id: 'word-count',
      label: 'Kelime Sayısı',
      status: wordStatus,
      feedback: wordFeedback,
    });

    // 8. Headings check
    const hasHeadings = content.includes('<h2') || content.includes('<h3');
    checklist.push({
      id: 'has-headings',
      label: 'Alt Başlık Kullanımı (H2/H3)',
      status: hasHeadings ? 'success' : 'warning',
      feedback: hasHeadings
        ? 'İçerikte alt başlıklar (H2, H3) kullanılmış.'
        : 'İçerikte H2 veya H3 bulunmuyor. Okunabilirliği ve SEOyu artırmak için alt başlıklar kullanın.',
    });

    // 9. Images with Alt text check
    const imageTags = content.match(/<img[^>]+>/g) || [];
    const hasImages = imageTags.length > 0;
    const missingAlt = imageTags.some((img) => !img.includes('alt=') || img.includes('alt=""') || img.includes('alt=\'\''));
    let imgStatus: 'success' | 'warning' | 'error' = 'success';
    let imgFeedback = 'İçerikte görseller bulunuyor ve hepsinde SEO alt açıklamaları tanımlanmış.';

    if (!hasImages) {
      imgStatus = 'warning';
      imgFeedback = 'İçerikte görsel bulunmuyor. Arama motorları ve kullanıcılar için en az 1 görsel ekleyin.';
    } else if (missingAlt) {
      imgStatus = 'error';
      imgFeedback = 'Eklediğiniz bazı görsellerde alternatif metin (alt text) eksik. Bu SEO için kritik bir eksiktir.';
    }
    checklist.push({
      id: 'img-alt',
      label: 'Görsel Alt Etiketleri (Alt Text)',
      status: imgStatus,
      feedback: imgFeedback,
    });

    // Compute overall score
    const successCount = checklist.filter((item) => item.status === 'success').length;
    const totalCount = checklist.length;
    const score = Math.round((successCount / totalCount) * 100);

    return { score, checklist };
  };

  const seoAnalysis = analyzeSEO();

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Top Bar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="flex items-center gap-2 text-base text-slate-500 hover:text-slate-700 transition-colors font-bold whitespace-nowrap"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Yönetici Paneli</span>
              <span className="inline sm:hidden">Geri</span>
            </button>
            <span className="h-5 w-px bg-slate-200 hidden sm:block" />
            <h1 className="text-base font-extrabold text-slate-800 hidden sm:block">Yeni Blog Paylaş</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading || !form.title}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2.5 border border-slate-200 text-slate-600 font-extrabold rounded-xl hover:bg-slate-50 transition-all text-sm disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              <Save size={15} />
              <span className="hidden sm:inline">Taslak Olarak Kaydet</span>
              <span className="inline sm:hidden">Taslak</span>
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading || !form.title}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2.5 bg-[#6191c4] hover:bg-[#4b77a5] text-white font-extrabold rounded-xl hover:shadow-lg hover:shadow-[#6191c4]/30 transition-all text-sm disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {loading ? <Loader2 className="animate-spin" size={15} /> : <Send size={15} />}
              <span className="hidden sm:inline">Yayına Al</span>
              <span className="inline sm:hidden">Yayınla</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Editor Content Body */}
      <div className="max-w-[98%] mx-auto px-6 py-8">
        {validationErrors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
            <p className="text-sm font-extrabold text-red-700 mb-2 flex items-center gap-2">
              <XCircle size={16} /> Yayına almak için lütfen aşağıdaki eksiklikleri giderin:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              {validationErrors.map((e, i) => (
                <li key={i} className="text-sm text-red-600 font-medium">{e}</li>
              ))}
            </ul>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Post Fields & Rich Editor */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Editor vs SEO tab controls */}
            <div className="bg-slate-200/60 p-1 flex rounded-xl w-72">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'content'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Settings size={14} />
                Blog İçeriği
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'seo'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Globe size={14} />
                SEO ve Meta Ayarları
                {seoAnalysis.score > 0 && (
                  <span className={`w-2 h-2 rounded-full ${
                    seoAnalysis.score >= 80
                      ? 'bg-green-500'
                      : seoAnalysis.score >= 50
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`} />
                )}
              </button>
            </div>

            {activeTab === 'content' ? (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <input
                    type="text"
                    placeholder="Blog başlığını yazın..."
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 placeholder:text-slate-300 bg-transparent border-none outline-none focus:ring-0 focus:border-none py-2"
                  />
                  <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                    Slug Link: <span className="font-mono text-slate-500 font-semibold">{form.slug || '...'}</span>
                  </p>
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <label className="text-base font-extrabold text-slate-700 mb-3 block uppercase tracking-wider">
                    Özet / Kısa Giriş
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Sosyal mecralarda ve ana sayfada görüntülenecek kısa bir özet yazın..."
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#6191c4] resize-none text-base leading-relaxed"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="text-base font-extrabold text-slate-700 mb-3 block uppercase tracking-wider">
                    Makale İçeriği
                  </label>
                  <RichTextEditor
                    content={form.content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Google Search Snippet Preview */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Arama Motoru Önizlemesi</h3>
                  <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 text-left font-serif select-none space-y-1">
                    <span className="text-[11px] text-slate-500 font-sans block truncate">https://www.sezkon.com/tr/blog/{form.slug || 'örnek-yazi-linki'}</span>
                    <span className="text-lg text-blue-800 font-sans hover:underline cursor-pointer block truncate font-medium">
                      {form.seo_title || form.title || 'Lütfen Bir SEO Başlığı Girin...'}
                    </span>
                    <span className="text-xs text-slate-650 block leading-relaxed font-sans line-clamp-2">
                      {form.seo_description || form.excerpt || 'Lütfen arama motorları için açıklayıcı bir meta açıklama girin. Girilmezse özet metni varsayılan olarak kullanılır.'}
                    </span>
                  </div>
                </div>

                {/* SEO Input Fields */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                  <h3 className="text-base font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3">
                    SEO Meta Verileri
                  </h3>

                  {/* Odak Kelime */}
                  <div>
                    <label className="text-sm font-bold text-slate-600 mb-2 flex items-center justify-between">
                      <span>Odak Anahtar Kelime (Focus Keyword)</span>
                      <span className="text-xs text-slate-400 font-normal">SEO skorunu hesaplar</span>
                    </label>
                    <input
                      type="text"
                      placeholder="örn: erp yapay zeka"
                      value={form.focus_keyword}
                      onChange={(e) => setForm({ ...form, focus_keyword: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                    />
                  </div>

                  {/* SEO Title */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-600">SEO Başlığı (Meta Title)</label>
                      <span className={`text-xs font-bold ${
                        form.seo_title.length >= 40 && form.seo_title.length <= 60
                          ? 'text-green-600'
                          : 'text-amber-500'
                      }`}>
                        {form.seo_title.length} / 60 karakter
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={form.title || "Arama motoru başlığı..."}
                      value={form.seo_title}
                      onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                    />
                    <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          form.seo_title.length >= 40 && form.seo_title.length <= 60
                            ? 'bg-green-500'
                            : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min((form.seo_title.length / 60) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* SEO Description */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-600">Meta Açıklaması (Meta Description)</label>
                      <span className={`text-xs font-bold ${
                        form.seo_description.length >= 110 && form.seo_description.length <= 160
                          ? 'text-green-600'
                          : 'text-amber-500'
                      }`}>
                        {form.seo_description.length} / 160 karakter
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      placeholder={form.excerpt || "Arama motoru açıklaması..."}
                      value={form.seo_description}
                      onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4] resize-none"
                    />
                    <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          form.seo_description.length >= 110 && form.seo_description.length <= 160
                            ? 'bg-green-500'
                            : 'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min((form.seo_description.length / 160) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <label className="text-sm font-bold text-slate-600 mb-2 block">Anahtar Kelimeler (Etiketler - Virgülle Ayırın)</label>
                    <input
                      type="text"
                      placeholder="erp, bulut, entegrasyon, yapay zeka"
                      value={form.seo_keywords}
                      onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                    />
                  </div>
                </div>

                {/* Live SEO Score and detailed report */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-extrabold text-slate-750 uppercase tracking-wider">Yoast SEO Analiz Raporu</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">SEO Puanı:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-white shadow-sm flex items-center gap-1 ${
                        seoAnalysis.score >= 80
                          ? 'bg-green-500'
                          : seoAnalysis.score >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}>
                        {seoAnalysis.score} / 100
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {seoAnalysis.checklist.map((item, index) => {
                      const Icon =
                        item.status === 'success'
                          ? CheckCircle
                          : item.status === 'warning'
                          ? AlertTriangle
                          : XCircle;
                      const colorClass =
                        item.status === 'success'
                          ? 'text-green-500'
                          : item.status === 'warning'
                          ? 'text-amber-500'
                          : 'text-red-500';
                      const bgClass =
                        item.status === 'success'
                          ? 'bg-green-50/50'
                          : item.status === 'warning'
                          ? 'bg-amber-50/50'
                          : 'bg-red-50/50';

                      return (
                        <div key={item.id || index} className={`flex gap-3.5 p-4 rounded-xl border border-slate-100/80 ${bgClass}`}>
                          <Icon className={`${colorClass} shrink-0 mt-0.5`} size={18} />
                          <div className="space-y-1">
                            <h4 className="text-xs font-extrabold text-slate-800">{item.label}</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.feedback}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Settings Panel (Category, Cover image, details) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* General settings card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
                <Settings size={18} className="text-slate-400" />
                Makale Ayarları
              </h3>

              {/* Category */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block">Kategori</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4] cursor-pointer font-medium"
                >
                  <option value="">Kategori Seçin</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block">Yazar</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                />
              </div>

              {/* Read Time - auto-calculated, still editable */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 flex items-center justify-between">
                  <span>Okuma Süresi</span>
                  <span className="text-xs text-[#6191c4] font-semibold">Otomatik hesaplanıyor</span>
                </label>
                <input
                  type="text"
                  placeholder="1 dk"
                  value={form.read_time}
                  onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                />
              </div>

              {/* Slug (editable) */}
              <div>
                <label className="text-sm font-bold text-slate-500 mb-2 block">URL Link (Slug)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                />
              </div>
            </div>

            {/* Cover Image Upload Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                <ImageIcon size={16} className="text-slate-400" />
                Kapak Görseli
              </h3>
              
              <div className="space-y-3">
                {/* File Dropzone Upload */}
                <label className="block border-2 border-dashed border-slate-200 hover:border-[#6191c4] transition-colors rounded-2xl p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                    disabled={uploadingCover}
                  />
                  {uploadingCover ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="animate-spin text-[#6191c4]" size={24} />
                      <span className="text-xs font-semibold text-slate-500">Yükleniyor...</span>
                    </div>
                  ) : form.cover_image ? (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-green-600 block">✓ Kapak Resmi Seçildi</span>
                      <img
                        src={form.cover_image}
                        alt="Cover Preview"
                        className="max-h-24 mx-auto rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setForm(prev => ({ ...prev, cover_image: '' }));
                        }}
                        className="text-[10px] text-red-500 font-bold hover:underline"
                      >
                        Görseli Kaldır
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <UploadCloud size={28} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">Bilgisayardan Yükle</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG, WebP (Maks. 5MB)</span>
                    </div>
                  )}
                </label>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase select-none">VEYA</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* URL Input */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Görsel Adresi (URL)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#6191c4]"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Features */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-amber-400" />
                  <span className="text-sm font-bold text-slate-700">Öne Çıkan Konu</span>
                </div>
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-[#6191c4] focus:ring-[#6191c4] cursor-pointer"
                />
              </label>
            </div>

            {/* AI GEO Prompt Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-[#6191c4]" />
                Yapay Zeka (GEO) Sihirbazı
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                ChatGPT, Perplexity ve Gemini gibi motorlar için tam optimize edilmiş ve alıntı puanını artıran makale taslağı üreten prompt.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 font-mono text-[10px] text-slate-600 max-h-32 overflow-y-auto whitespace-pre-wrap select-all leading-normal">
                {getGeoPrompt()}
              </div>

              <button
                type="button"
                onClick={handleCopyPrompt}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                {copiedPrompt ? (
                  <>
                    <Check size={14} className="text-green-400" />
                    Kopyalandı!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Promptu Kopyala
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
