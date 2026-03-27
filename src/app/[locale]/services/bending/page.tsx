import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2, Layers, Target, Zap, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SrvBend' });
  const title = t('meta_title');
  const description = t('meta_desc');
  const keywords = t.raw('keywords') as string[]; // dil dosyasından al

  const baseUrl = 'https://www.sezkon.com';
  const path = '/services/bending';
  const canonical = `${baseUrl}/${locale}${path}`;
  const alternateLanguages = {
    tr: `${baseUrl}/tr${path}`,
    en: `${baseUrl}/en${path}`,
  };

  return generateSEO({
    title,
    description,
    canonical,
    locale,
    alternateLanguages,
    ogImage: '/og-bending.jpg',
    keywords, // yeni eklenen
  });
}

// İkonlar c1..c4 ile eşleşir
const iconMap = [Target, Layers, Settings, Zap];

export default function BendingPage() {
  const t = useTranslations('SrvBend');

  // Teknik özellikler (s1_l/s1_v ... s6_l/s6_v)
  const specs = [
    { label: t('s1_l'), value: t('s1_v') },
    { label: t('s2_l'), value: t('s2_v') },
    { label: t('s3_l'), value: t('s3_v') },
    { label: t('s4_l'), value: t('s4_v') },
    { label: t('s5_l'), value: t('s5_v') },
    { label: t('s6_l'), value: t('s6_v') },
  ];

  // Yetenekler (c1_t/c1_d ... c4_t/c4_d)
  const capabilities = [
    { title: t('c1_t'), desc: t('c1_d') },
    { title: t('c2_t'), desc: t('c2_d') },
    { title: t('c3_t'), desc: t('c3_d') },
    { title: t('c4_t'), desc: t('c4_d') },
  ];

  // Profil listesi (prof_list array)
  const profiles = t.raw('prof_list') as string[];

  // CTA fayda listesi (cta_list array)
  const ctaBenefits = t.raw('cta_list') as string[];

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">
              {t('bc_home')}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-600 font-medium">{t('bc_page')}</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            {t('hero_tag')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            {t('hero_t1')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('hero_t2')}
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            {t('hero_desc')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200"
          >
            {t('btn_quote')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Specs */}
      <section className="w-full py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specs.map((spec, i) => (
              <div key={i} className="text-center group">
                <div className="text-xl font-black text-indigo-600 tracking-tighter mb-1 group-hover:scale-105 transition-transform">
                  {spec.value}
                </div>
                <div className="text-xs font-medium text-gray-500 leading-tight">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('cap_t1')}{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t('cap_t2')}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {capabilities.map((cap, i) => {
              const Icon = iconMap[i];
              return (
                <div
                  key={i}
                  className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{cap.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{cap.desc}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profiles & CTA combined */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
                  {t('prof_tag')}
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-4">
                  {t('prof_t1')}{' '}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {t('prof_t2')}
                  </span>
                </h2>
                <p className="text-gray-500 font-light">{t('prof_desc')}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {profiles.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all">
                    <CheckCircle2 size={14} className="text-indigo-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-indigo-950 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-[40px]" />
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-6">
                  {t('cta_t1')}
                </h2>
                <p className="text-indigo-100/80 text-lg mb-8 max-w-xl">{t('cta_desc')}</p>
                <ul className="space-y-3 mb-8">
                  {ctaBenefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                      <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {t('cta_btn')} <ArrowRight size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}