import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2, Cpu, Wifi, BarChart2, Bot, Shield, Zap, Factory } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SrvInd' });
  const title = t('meta_title');
  const description = t('meta_desc');

  const baseUrl = 'https://www.sezkon.com';
  const path = '/services/industry40';
  const canonical = `${baseUrl}/${locale}${path}`;
  const alternateLanguages = {
    tr: `${baseUrl}/tr${path}`,
    en: `${baseUrl}/en${path}`,
  };

  const seo = generateSEO({
    title,
    description,
    canonical,
    locale,
    alternateLanguages,
    ogImage: '/og-industry40.jpg', // sayfaya özel görsel varsa kullanın
  });

  return {
    ...seo,
    keywords: ['Endüstri 4.0', 'Akıllı Fabrika', 'IoT entegrasyonu', 'Dijital ikiz', 'Kestirimci bakım', 'Üretim verimliliği'],
  };
}

const solutions = [
  {
    icon: Wifi,
    title: 'IoT Sensör Ağı',
    desc: 'Makine, enerji ve çevre parametrelerini anlık izleyen akıllı sensör altyapısı. OPC-UA ve MQTT protokolleriyle veri toplayın.',
  },
  {
    icon: BarChart2,
    title: 'Gerçek Zamanlı Dashboard',
    desc: 'Tüm üretim süreçlerini tek ekranda takip edin. OEE, downtime, kalite ve enerji verilerinizi canlı görün.',
  },
  {
    icon: Bot,
    title: 'Yapay Zeka Kalite Kontrol',
    desc: 'Makine öğrenmesi tabanlı görüntü işleme ile 0.1mm\'nin altında hataları insan gözüyle yakalanmadan tespit edin.',
  },
  {
    icon: Factory,
    title: 'Dijital İkiz',
    desc: 'Üretim hatlarınızın sanal kopyasını oluşturun. Parametrik simülasyonlarla yatırım kararlarınızı risk almadan test edin.',
  },
  {
    icon: Cpu,
    title: 'Prediktif Bakım',
    desc: 'Titreşim, sıcaklık ve akım analiziyle makinelerinizin arızalanmadan önce bakım ihtiyacını tespit edin.',
  },
  {
    icon: Shield,
    title: 'Siber Güvenlik',
    desc: 'OT/IT network segmentasyonu, IEC 62443 uyumlu endüstriyel siber güvenlik çözümleri.',
  },
];

const benefits = [
  { value: '%25', label: 'OEE Artışı' },
  { value: '%70', label: 'Bakım Arızası Azalması' },
  { value: '%30', label: 'Enerji Tasarrufu' },
  { value: '0', label: 'Plansız Duruş Hedefi' },
];

const roadmap = [
  { phase: 'Faz 1', title: 'Keşif & Değerlendirme', dur: '2–4 Hafta', desc: 'Mevcut sistem analizi, veri kaynakları haritalama ve dijital dönüşüm yol haritası oluşturma.' },
  { phase: 'Faz 2', title: 'Pilot Uygulama', dur: '4–8 Hafta', desc: 'Bir üretim hattında IoT sensör kurulumu, SCADA entegrasyonu ve dashboard yayına alma.' },
  { phase: 'Faz 3', title: 'Ölçekleme', dur: '8–16 Hafta', desc: 'Pilot başarısını tüm tesise yaymak, AI modüllerini devreye almak ve ekip eğitimi.' },
  { phase: 'Faz 4', title: 'Sürekli İyileştirme', dur: 'Süregelen', desc: 'Sistem optimizasyonu, yeni AI modeli geliştirme ve tesisin dijital olgunluğunu artırma.' },
];

export default function Industry40Page() {
  const t = useTranslations('SrvInd');
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-300/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-300/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">{t('bc_home')}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm text-gray-700 font-medium">{t('bc_page')}</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-600 border border-emerald-200 shadow-sm mb-6">{t('hero_tag')}</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8 relative z-10">
            {t('hero_t1')}{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('hero_t2')}</span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-emerald-200/50 -z-10 rounded-full blur-[2px]" />
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            {t('hero_desc')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">{t('btn_quote')}</span> <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/references" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-emerald-400 hover:text-emerald-600 transition-all duration-300">
              {t('btn_ref')}
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {benefits.map((b, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-black text-emerald-600 tracking-tighter mb-1 group-hover:text-gray-900 transition-colors">{b.value}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-600 italic mb-6">{t('sol_tag')}</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('sol_t1')} <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('sol_t2')}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-2xl transition-all duration-500">
                <div className="mb-6 p-3 bg-emerald-50 rounded-2xl text-emerald-600 w-fit group-hover:scale-105 transition-transform duration-300"><sol.icon size={28} /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{sol.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm">{sol.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="w-full py-24 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/0 bg-[url('/grid.svg')] bg-center bg-repeat [mask-image:linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))] mask-repeat-[no-repeat] mask-[linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
            <div className="inline-flex items-center rounded-full bg-emerald-50/50 px-4 py-1 text-sm font-semibold text-emerald-400 italic mb-6 backdrop-blur-sm border border-emerald-200/20">{t('road_tag')}</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              {t('road_t1')} <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('road_t2')}</span>
            </h2>
          </div>
          <div className="space-y-6">
            {roadmap.map((step, i) => (
              <div key={i} className="group flex gap-6 bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-500">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex flex-col items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{step.phase}</span>
                    <Zap size={18} className="text-emerald-600 mt-0.5" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                    <span className="flex-shrink-0 text-xs px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-semibold">{step.dur}</span>
                  </div>
                  <p className="text-gray-600 font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Tech Stack */}
      <section className="w-full py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">{t('tech_stack_title')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Siemens S7', 'Allen-Bradley', 'Fanuc', 'OPC-UA', 'MQTT', 'InfluxDB', 'Grafana', 'TensorFlow', 'SCADA', 'AWS IoT'].map((tech, i) => (
              <span key={i} className="px-5 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-600 italic mb-6">{t('why_tag')}</div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-6">
                {t('why_t1')}<br /><span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('why_t2')}</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-light">
                <p>{t('why_d1')}</p>
                <p className="font-medium text-gray-900 border-l-4 border-emerald-500 pl-4">{t('why_d2')}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                '10+ yıl üretim sektörü deneyimi',
                'Kendi fabrikamızda test edilmiş çözümler',
                'SAP, Oracle ve Siemens entegrasyon deneyimi',
                'ISO 9001 sertifikalı proje yönetimi',
                'Türkçe destek, yerli mühendis ekibi',
                'Prototipten enterprise ölçeğe esnek çözümler',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                  <span className="font-medium text-gray-800 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative bg-white rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl border border-gray-100">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-300/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-300/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 text-emerald-800 font-bold text-sm tracking-widest uppercase mb-6 bg-emerald-100/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
                </span>
                <span>{t('cta_tag')}</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter mb-6">
                {t('cta_t1')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{t('cta_t2')}</span>
              </h2>
              <p className="text-xl text-gray-600 font-light mb-10 max-w-2xl mx-auto">
                {t('cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-bold text-white bg-gray-900 rounded-full hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-600/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative">{t('cta_btn')}</span> <ArrowRight size={22} className="relative group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-500 font-medium">{t('cta_sub')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}