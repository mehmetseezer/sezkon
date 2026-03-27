import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, Sparkles, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const title = t('meta_title');
  const description = t('meta_desc');
  const keywords = t.raw('keywords') as string[]; // dil dosyasından al

  const alternateLanguages = {
    tr: '/tr/blog',
    en: '/en/blog',
  };

  return generateSEO({
    title,
    description,
    canonical: `/${locale}/blog`,
    locale,
    alternateLanguages,
    keywords,
  });
}

export default function BlogPage() {
  const t = useTranslations('Blog');

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero Section - Mevcut tasarım korundu */}
      <section className="w-full pt-36 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            {t('hero_tag')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            {t('hero_t1')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('hero_t2')}
            </span>{' '}
            {t('hero_t3')}
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
            {t('hero_desc')}
          </p>
        </div>
      </section>

      {/* Çok Yakında (Coming Soon) Placeholder Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative group bg-neutral-50 rounded-[3rem] p-12 md:p-20 overflow-hidden border border-gray-100 text-center">
            {/* Arka plan dekoratif icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <Sparkles size={400} />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 mb-8 animate-pulse">
                <Sparkles size={40} />
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6 italic">
                {t('soon_title')}
              </h2>

              <p className="text-lg text-gray-500 font-light max-w-lg mb-12 leading-relaxed">
                {t('soon_desc')}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all shadow-lg"
                >
                  <Home size={18} /> {t('back_home')}
                </Link>
                <a
                  href="#newsletter"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 border border-indigo-100 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-sm"
                >
                  {t('notify_me')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Form işlevini koruduk */}
      <section id="newsletter" className="w-full py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-repeat bg-white [mask-image:linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))]" />
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