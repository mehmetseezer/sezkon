import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2, Layers, Zap, Target, Clock } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SrvSheet' });
  const title = t('meta_title');
  const description = t('meta_desc');
  const keywords = t.raw('keywords') as string[]; // dil dosyasından al

  const baseUrl = 'https://www.sezkon.com';
  const path = '/services/sheet-metal-cutting';
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
    ogImage: '/og-sheet-cutting.jpg',
    keywords, // yeni eklenen
  });
}

// İkonlar c1..c4 ile eşleşir
const iconMap = [Layers, Target, Zap, Clock];

export default function SheetCuttingPage() {
  const t = useTranslations('SrvSheet');
  const locale = useLocale();

  // Teknik özellikler (specs) – s1_l/s1_v'den s6_l/s6_v'ye kadar
  const specs = [
    { label: t('s1_l'), value: t('s1_v') },
    { label: t('s2_l'), value: t('s2_v') },
    { label: t('s3_l'), value: t('s3_v') },
    { label: t('s4_l'), value: t('s4_v') },
    { label: t('s5_l'), value: t('s5_v') },
    { label: t('s6_l'), value: t('s6_v') },
  ];

  // Yetenekler (capabilities) – c1_t/c1_d ile c4_t/c4_d arası
  const capabilities = [
    { title: t('c1_t'), desc: t('c1_d') },
    { title: t('c2_t'), desc: t('c2_d') },
    { title: t('c3_t'), desc: t('c3_d') },
    { title: t('c4_t'), desc: t('c4_d') },
  ];

  // Malzemeler (mat_list array)
  const materials = [
    { name: t('mat1_n'), thickness: t('mat1_t') },
    { name: t('mat2_n'), thickness: t('mat2_t') },
    { name: t('mat3_n'), thickness: t('mat3_t') },
    { name: t('mat4_n'), thickness: t('mat4_t') },
    { name: t('mat5_n'), thickness: t('mat5_t') },
    { name: t('mat6_n'), thickness: t('mat6_t') },
  ];

  const baseUrl = 'https://www.sezkon.com';
  const pageUrl = `${baseUrl}/${locale}/services/sheet-cutting`;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('hero_t1') + ' ' + t('hero_t2'),
    description: t('hero_desc'),
    url: pageUrl,
    provider: { '@type': 'Organization', name: 'Sezkon', url: baseUrl },
    serviceType: 'Laser Cutting',
    areaServed: { '@type': 'Country', name: 'TR' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'tr' ? 'Sac lazer kesim hassasiyeti nedir?' : 'What is sheet metal laser cutting precision?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'tr'
            ? '±0.03mm hassasiyetle kesim yapıyoruz. 12000W fiber lazer gücümüzle 30mm\'ye kadar siyah sac ve 20mm paslanmaz çelik kesim gerçekleştiriyoruz.'
            : 'We cut with ±0.03mm precision. With our 12000W fiber laser power, we cut black sheet metal up to 30mm and stainless steel up to 20mm.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'tr' ? 'Hangi malzemeleri kesebiliyorsunuz?' : 'Which materials can you cut?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'tr'
            ? 'Siyah sac (S235/S355), paslanmaz çelik (304/316), galvanizli sac, Hardox, elektro galvaniz ve Aluzinc kaplı malzemeleri kesiyoruz.'
            : 'We cut carbon steel (S235/S355), stainless steel (304/316), galvanized sheet, Hardox, electro-galvanized and Aluzinc coated materials.',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'tr' ? 'DXF dosyasıyla teklif alabilir miyim?' : 'Can I get a quote with a DXF file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'tr'
            ? 'Evet, DXF veya DWG dosyanızla iletişime geçin. Mühendislerimiz en verimli kesim planını hazırlayarak size anında teklif sunar.'
            : 'Yes, contact us with your DXF or DWG file. Our engineers prepare the most efficient cutting plan and offer you an instant quote.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'tr' ? 'Ana Sayfa' : 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: locale === 'tr' ? 'Hizmetler' : 'Services', item: `${baseUrl}/${locale}/services` },
      { '@type': 'ListItem', position: 3, name: t('bc_page'), item: pageUrl },
    ],
  };

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {/* Hero */}

      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-[1550px]">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm md:text-base text-gray-400 hover:text-indigo-600 transition-colors">
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
            <span className="bg-gradient-to-r from-[#6191c4] to-[#8b5cf6] bg-clip-text text-transparent">
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
        <div className="container mx-auto px-6 max-w-[1550px]">
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
        <div className="container mx-auto px-6 max-w-[1550px]">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('cap_t1')}{' '}
              <span className="bg-gradient-to-r from-[#6191c4] to-[#8b5cf6] bg-clip-text text-transparent">
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

      {/* Material Table */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">
              {t('mat_t1')}{' '}
              <span className="bg-gradient-to-r from-[#6191c4] to-[#8b5cf6] bg-clip-text text-transparent">
                {t('mat_t2')}
              </span>
            </h2>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 bg-indigo-50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-indigo-600">
              <span>{t('col_mat')}</span>
              <span>{t('col_thk')}</span>
            </div>
            {materials.map((mat, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-indigo-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-indigo-400" />
                  <span className="text-sm font-medium text-gray-800">{mat.name}</span>
                </div>
                <span className="text-sm font-bold text-indigo-600">{mat.thickness}</span>
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
                {t('cta_t1')}
                <br />
                <span className="text-indigo-400">{t('cta_t2')}</span>
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8 max-w-xl mx-auto">{t('cta_desc')}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {t('cta_btn')} <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}