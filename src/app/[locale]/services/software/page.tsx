import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2, Code, Database, GitBranch, BarChart2, Shield, Cpu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SrvSoft' });
  const title = t('meta_title');
  const description = t('meta_desc');
  const keywords = t.raw('keywords') as string[]; // dil dosyasından al

  const baseUrl = 'https://www.sezkon.com';
  const path = '/services/software';
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
    ogImage: '/og-software.jpg',
    keywords, // yeni eklenen
  });
}

// İkonlar artık sabit, çünkü görsel unsurlar dile bağlı değil
const iconMap = {
  Database, BarChart2, GitBranch, Cpu, Shield, Code
};

export default function SoftwarePage() {
  const t = useTranslations('SrvSoft');

  // Özellikler dil dosyasından alınıyor
  const features = [
    { iconKey: 'Database', title: t('feat_1_title'), desc: t('feat_1_desc') },
    { iconKey: 'BarChart2', title: t('feat_2_title'), desc: t('feat_2_desc') },
    { iconKey: 'GitBranch', title: t('feat_3_title'), desc: t('feat_3_desc') },
    { iconKey: 'Cpu', title: t('feat_4_title'), desc: t('feat_4_desc') },
    { iconKey: 'Shield', title: t('feat_5_title'), desc: t('feat_5_desc') },
    { iconKey: 'Code', title: t('feat_6_title'), desc: t('feat_6_desc') },
  ];

  // Teknoloji yığını dil dosyasından alınıyor
  const techStack = [
    { cat: t('stack_cat_frontend'), items: t('stack_items_frontend').split(',') },
    { cat: t('stack_cat_backend'), items: t('stack_items_backend').split(',') },
    { cat: t('stack_cat_mobile'), items: t('stack_items_mobile').split(',') },
    { cat: t('stack_cat_devops'), items: t('stack_items_devops').split(',') },
  ];

  // Süreç adımları dil dosyasından alınıyor
  const processSteps = [
    { num: '01', title: t('proc_step_1_title'), desc: t('proc_step_1_desc') },
    { num: '02', title: t('proc_step_2_title'), desc: t('proc_step_2_desc') },
    { num: '03', title: t('proc_step_3_title'), desc: t('proc_step_3_desc') },
  ];

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
            <Link href="/references" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
              {t('btn_ref')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('feat_t1')} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('feat_t2')}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const IconComponent = iconMap[f.iconKey as keyof typeof iconMap];
              return (
                <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                  <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light text-sm">{f.desc}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">{t('stack_tag')}</div>
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">
              {t('stack_t1')} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('stack_t2')}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">{stack.cat}</h4>
                <div className="space-y-2">
                  {stack.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">{t('proc_tag')}</div>
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">
              {t('proc_t1')} <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{t('proc_t2')}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent z-0" />
            {processSteps.map((step, i) => (
              <div key={i} className="relative z-10 space-y-4 group text-center">
                <div className="w-24 h-24 rounded-full bg-white/70 backdrop-blur-sm border border-indigo-100 flex items-center justify-center mx-auto transition-all duration-500 group-hover:border-indigo-400 group-hover:shadow-xl group-hover:scale-110">
                  <span className="text-3xl font-black text-gray-300 group-hover:text-indigo-600 transition-colors italic">{step.num}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{step.title}</h4>
                <p className="text-gray-600 font-light text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
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