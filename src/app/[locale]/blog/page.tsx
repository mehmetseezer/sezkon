import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Clock, Tag } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: ['Sezkon blog', 'CNC teknoloji', 'yazılım geliştirme', 'Endüstri 4.0'],
    openGraph: {
      title: t('meta_title'),
      description: t('meta_desc'),
      type: 'website',
    },
  };
}

const categories = ['Tümü', 'Endüstri 4.0', 'Yazılım', 'CNC & Lazer', 'Yapay Zeka', 'Girişim'];

const posts = [
  {
    category: 'Endüstri 4.0',
    title: 'Türk İmalat Sanayiinde Dijital Dönüşümün Yol Haritası',
    desc: 'IoT sensörlerinden yapay zeka tabanlı kalite kontrolüne, akıllı fabrikaların gerçek maliyeti ve faydaları üzerine kapsamlı bir analiz.',
    author: 'Mehmet Sezgin', date: '18 Mart 2026', readTime: '8 dk', featured: true,
  },
  {
    category: 'CNC & Lazer',
    title: '5 Eksen CNC: Ne Zaman Gerçekten Gerekli?',
    desc: '5 eksen işleme merkezleri yatırım maliyetini ne zaman geri kazandırır? Hangi geometriler için gerçek avantaj sağlar?',
    author: 'Ali Demir', date: '12 Mart 2026', readTime: '5 dk', featured: false,
  },
  {
    category: 'Yazılım',
    title: 'ERP mi, Özel Yazılım mı? 2026 Rehberi',
    desc: 'SAP gibi hazır ERP çözümleri mi, yoksa işletmenize özel geliştirilen yazılımlar mı daha avantajlı?',
    author: 'Ayşe Kaya', date: '5 Mart 2026', readTime: '6 dk', featured: false,
  },
  {
    category: 'Yapay Zeka',
    title: 'Görüntü İşleme ile Sıfır Hatalı Kalite Kontrol',
    desc: 'Makine öğrenmesi tabanlı görsel denetim sistemleri üretim hatlarında nasıl %0.001 hata oranı yakaladı?',
    author: 'Mehmet Sezgin', date: '28 Şubat 2026', readTime: '7 dk', featured: false,
  },
  {
    category: 'CNC & Lazer',
    title: 'Alüminyum Lazer Kesimde Parametre Optimizasyonu',
    desc: 'Lazer gücü, hız ve odak noktasını doğru ayarlamanın kalite ve maliyet üzerindeki doğrudan etkisi.',
    author: 'Ali Demir', date: '20 Şubat 2026', readTime: '4 dk', featured: false,
  },
  {
    category: 'Girişim',
    title: "Seri Üretimden Kişiselleştirmeye: Sezkon'un Yolculuğu",
    desc: "2013'ten bugüne Sezkon nasıl büyüdü? Kuruluş hikayemiz, yaptığımız hatalar ve öğrendiklerimiz.",
    author: 'Mehmet Sezgin', date: '7 Şubat 2026', readTime: '9 dk', featured: false,
  },
];

const categoryColors: Record<string, string> = {
  'Endüstri 4.0': 'bg-indigo-50 text-indigo-600',
  'Yazılım': 'bg-purple-50 text-purple-600',
  'CNC & Lazer': 'bg-blue-50 text-blue-600',
  'Yapay Zeka': 'bg-pink-50 text-pink-600',
  'Girişim': 'bg-amber-50 text-amber-600',
};

export default function BlogPage() {
  const t = useTranslations('Blog');
  const [featured, ...rest] = posts;
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="w-full pt-36 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">{t('hero_tag')}</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            {t('hero_t1')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('hero_t2')}</span>{' '}{t('hero_t3')}
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
            {t('hero_desc')}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full py-6 bg-white border-b border-gray-100 sticky top-16 z-10 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat, i) => (
              <span key={i} className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="group relative bg-indigo-950/90 rounded-3xl p-10 lg:p-16 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/10" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white px-3 py-1 rounded-full border border-white/20">{t('feat_tag')}</span>
                <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>{featured.category}</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6 max-w-3xl">{featured.title}</h2>
              <p className="text-indigo-200/80 text-lg font-light leading-relaxed max-w-2xl mb-8">{featured.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-indigo-300 text-sm">
                  <span className="font-semibold text-white">{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{featured.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                  {t('read')} <ArrowRight size={18} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="w-full py-8 pb-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <article key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200 flex flex-col cursor-pointer">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    <Tag size={10} /> {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight leading-snug group-hover:text-indigo-700 transition-colors">{post.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm mb-6 flex-1">{post.desc}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-semibold text-gray-600">{post.author}</span>
                  <div className="flex items-center gap-3">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </article>
            ))}
          </div>
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
              {t('read_more')} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-repeat bg-white [mask-image:linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))] mask-repeat-[no-repeat] mask-[linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6 max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            {t('nl_tag')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-6">
            {t('nl_t1')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('nl_t2')}
            </span>
          </h2>
          <p className="text-gray-500 font-light mb-10 text-lg">{t('nl_desc')}</p>

          {/* Responsive form: mobilde dikey, tablet/bilgisayarda yatay */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('nl_ph')}
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-indigo-400 text-gray-800 font-medium"
            />
            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors whitespace-nowrap sm:w-auto w-full">
              {t('nl_btn')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
