import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2, Zap, Target, Shield, Clock } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SrvAlum' });
  return {
    title: t('meta_title'),
    description: t('meta_desc'),
    keywords: ['alüminyum lazer kesim', 'alüminyum işleme', 'fiber lazer alüminyum', 'hassas alüminyum kesim'],
    openGraph: { title: t('meta_title'), description: t('meta_desc'), type: 'website' },
  };
}

const capabilities = [
  { icon: Target, title: 'Mikron Hassasiyet', desc: '±0.3mm tolerans ile karmaşık geometriler ve ince detaylar dahil mükemmel kesim kalitesi.' },
  { icon: Zap, title: 'Yüksek Hız', desc: 'fiber lazer ile geleneksel yöntemlerin 5 katı hızda kesim. Acil siparişler için öncelikli hat.' },
  { icon: Shield, title: 'Oksit Serbest Kesim', desc: 'Azot gaz kullanımı ile oksit oluşumu önlenir, boya ve kaplama için ideal yüzey kalitesi.' },
  { icon: Clock, title: 'Hızlı Teslimat', desc: 'Standart siparişler 3–5 iş günü, acil siparişler 24–48 saat içinde teslimata hazır.' },
];

const materials = ['1000 Serisi (Saf Alüminyum)', '2000 Serisi (Havacılık)', '5000 Serisi (Marine)', '6000 Serisi (Yapısal)', '7000 Serisi (Yüksek Mukavemet)', 'Alüminyum Kompozit Panel'];

export default function AluminumCuttingPage() {
  const t = useTranslations('SrvAlum');
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">{t('bc_home')}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-600 font-medium">{t('bc_page')}</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">CNC & Lazer Kesim</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            Metalde{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mikron Hassasiyet</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            Fiber lazer kesim teknolojimizle metal parçalarınızı ±0.3mm hassasiyetle, pürüzsüz yüzey kalitesiyle işliyoruz.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200">
              Fiyat Teklifi Al <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>


      {/* Capabilities */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('cap_t1')} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('cap_t2')}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {capabilities.map((cap, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300"><cap.icon size={28} /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{cap.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{cap.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">{t('mat_tag')}</div>
              <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-6">
                {t('mat_t1')}{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('mat_t2')}</span>{' '}
                {t('mat_t3')}
              </h2>
              <p className="text-gray-500 font-light text-lg mb-8 leading-relaxed">
                {t('mat_desc')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {materials.map((mat, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                  <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{mat}</span>
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
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter italic mb-6">
                {t('cta_t1')}<br /><span className="text-indigo-400">{t('cta_t2')}</span>
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
