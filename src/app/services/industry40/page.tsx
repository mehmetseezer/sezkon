import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Cpu, Wifi, BarChart2, Bot, Shield, Zap, Factory } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Endüstri 4.0 Çözümleri | Sezkon – Akıllı Fabrika ve IoT Entegrasyonu',
  description: 'IoT sensör ağları, yapay zeka tabanlı kalite kontrol, OPC-UA protokolü ve dijital ikiz teknolojileriyle fabrikanızı geleceğe taşıyın.',
  keywords: ['Endüstri 4.0', 'akıllı fabrika', 'IoT entegrasyonu', 'dijital ikiz', 'yapay zeka üretim', 'MES sistemi'],
  openGraph: { title: 'Endüstri 4.0 | Sezkon', description: 'Akıllı fabrika ve IoT çözümleri.', type: 'website' },
};

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
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-indigo-950 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-indigo-300 hover:text-white transition-colors">Anasayfa</Link>
            <span className="text-indigo-600">/</span>
            <span className="text-sm text-indigo-200 font-medium">Endüstri 4.0</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-4 py-1 text-sm font-semibold text-white italic mb-6">
            YENİ · Endüstri 4.0 Çözümleri
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-8">
            Fabrikanızı{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Geleceğe Taşıyın
            </span>
          </h1>
          <p className="text-xl text-indigo-200/80 font-light leading-relaxed max-w-3xl mb-10">
            IoT sensörleri, yapay zeka tabanlı kalite kontrol, dijital ikiz ve prediktif bakım teknolojileriyle üretim verimliliğinizi %25'e kadar artırın.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
              Ücretsiz Değerlendirme <ArrowRight size={18} />
            </Link>
            <Link href="/references" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300">
              Referanslar
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full py-16 bg-indigo-950 border-b border-indigo-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {benefits.map((b, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-black text-indigo-400 tracking-tighter mb-1 group-hover:text-white transition-colors">{b.value}</div>
                <div className="text-sm font-medium text-indigo-300/70 uppercase tracking-wider">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Çözümlerimiz</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              Akıllı Fabrika{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Teknolojileri</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300"><sol.icon size={28} /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{sol.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm">{sol.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Dönüşüm Yol Haritası</div>
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">
              Adım Adım{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dijital Olgunluk</span>
            </h2>
          </div>
          <div className="space-y-6">
            {roadmap.map((step, i) => (
              <div key={i} className="group flex gap-6 bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-500">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex flex-col items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{step.phase}</span>
                    <Zap size={18} className="text-indigo-600 mt-0.5" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                    <span className="flex-shrink-0 text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-semibold">{step.dur}</span>
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
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Entegrasyon Ekosistemi</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Siemens S7', 'Allen-Bradley', 'Fanuc', 'OPC-UA', 'MQTT', 'InfluxDB', 'Grafana', 'TensorFlow', 'SCADA', 'AWS IoT'].map((tech, i) => (
              <span key={i} className="px-5 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
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
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Neden Sezkon?</div>
              <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-6">
                Hem Yazılım Hem{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Üretim Bilgisi</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Çoğu dijital dönüşüm firması yazılım biliyor ama üretimi bilmiyor; CNC firmaları üretimi biliyor ama yazılımı bilmiyor.
              </p>
              <p className="text-gray-600 font-light leading-relaxed">
                Sezkon her iki dünyada da uzman olan nadir firmalardandır. Fabrika zemini deneyimimiz, dijital çözümlerimizi gerçek ihtiyaçlara göre şekillendirir.
              </p>
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
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                  <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
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
          <div className="relative bg-indigo-950 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/10 z-0" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-[80px]" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white border border-white/20 mb-6">
                  ÜCRETSİZ DEĞERLENDİRME
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic mb-4">
                  Fabrikanızın Dijital Olgunluğunu{' '}
                  <span className="text-indigo-400">Ölçelim.</span>
                </h2>
                <p className="text-indigo-100/80 text-lg">
                  Ücretsiz dijital olgunluk değerlendirmesi ile nerede olduğunuzu ve nereye gidebileceğinizi birlikte keşfedelim.
                </p>
              </div>
              <div className="flex flex-col gap-4 items-start md:items-end">
                <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full transition-all duration-300 hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 gap-3">
                  Değerlendirme İste <ArrowRight size={24} />
                </Link>
                <p className="text-white/50 text-sm italic px-4">24 saat içinde yanıt · Ücretsiz · Taahhütsüz</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
