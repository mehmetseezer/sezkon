import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2, ShoppingCart, CreditCard, TrendingUp, Shield, Package, Smartphone } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SrvEcom' });
  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: ['e-ticaret sistemi', 'online mağaza', 'B2B e-ticaret', 'ödeme entegrasyonu', 'e-ticaret yazılımı'],
    openGraph: { title: t('meta_title'), description: t('meta_desc'), type: 'website' },
  };
}

const getFeatures = (t: any) => [
  { icon: ShoppingCart, title: t('f1_t'), desc: t('f1_d') },
  { icon: CreditCard, title: t('f2_t'), desc: t('f2_d') },
  { icon: TrendingUp, title: t('f3_t'), desc: t('f3_d') },
  { icon: Package, title: t('f4_t'), desc: t('f4_d') },
  { icon: Shield, title: t('f5_t'), desc: t('f5_d') },
  { icon: Smartphone, title: t('f6_t'), desc: t('f6_d') },
];

export default function EcommercePage() {
  const t = useTranslations('SrvEcom');
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{t('bc_home')}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-600 font-medium">{t('bc_page')}</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">{t('hero_tag')}</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            {t('hero_t1')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('hero_t2')}</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            {t('hero_desc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200">
              {t('btn_quote')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[[t('stat1_v'), t('stat1_l')], [t('stat2_v'), t('stat2_l')], [t('stat3_v'), t('stat3_l')], [t('stat4_v'), t('stat4_l')]].map(([v, l], i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-1 group-hover:text-indigo-600 transition-colors duration-300">{v}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('feat_t1')}{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('feat_t2')}</span>{' '}{t('feat_t3')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFeatures(t).map((f, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300"><f.icon size={28} /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm">{f.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">{t('inc_tag')}</div>
              <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-6">
                {t('inc_t1')} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('inc_t2')}</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">{t('inc_desc')}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {(t.raw('chk_list') as string[]).map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-all">
                  <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative bg-indigo-950 rounded-[3rem] p-12 lg:p-20 overflow-hidden shadow-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 z-0" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic mb-6">
                {t('cta_t1')} <span className="text-indigo-400">{t('cta_t2')}</span>
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8 max-w-xl mx-auto">{t('cta_desc')}</p>
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {t('cta_btn')} <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
