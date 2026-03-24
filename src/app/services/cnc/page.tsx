import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Settings, Target, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CNC İşleme | Sezkon – 5 Eksen CNC Frezeleme ve Torna',
  description: '5 eksen CNC frezeleme, CNC torna ve kompleks parça üretimi. Savunma sanayi, havacılık ve otomotiv için yüksek hassasiyetli CNC işleme.',
  keywords: ['CNC işleme', '5 eksen CNC', 'CNC frezeleme', 'CNC torna', 'savunma sanayi CNC', 'hassas işleme'],
  openGraph: { title: 'CNC İşleme | Sezkon', description: '5 eksen yüksek hassasiyetli CNC işleme hizmetleri.', type: 'website' },
};

const specs = [
  { label: 'Eksen Sayısı', value: '5 Eksen' },
  { label: 'Hassasiyet', value: '±0.005mm' },
  { label: 'Maks. X/Y/Z', value: '1500×800×600' },
  { label: 'Min. Tolerans', value: 'IT5 Sınıfı' },
  { label: 'İş Mili Hızı', value: '25.000 rpm' },
  { label: 'Yüzey İşlemi', value: 'Ra 0.4' },
];

const capabilities = [
  { icon: Target, title: '±0.005mm Hassasiyet', desc: 'Hava gözeli ve termik kompanzasyonlu makine parkurumuzla IT5 sınıfı toleranslarda tutarlı üretim.' },
  { icon: Settings, title: '5 Eksen Simultane', desc: 'Karmaşık eğri yüzeyler, türbin kanatları ve havacılık parçaları için simultane 5 eksen işleme kapasitesi.' },
  { icon: Shield, title: 'Sertifikalı Üretim', desc: 'AS9100, ISO 9001 ve savunma sanayi kalite standartlarına uygun belgelenmiş üretim süreçleri.' },
  { icon: Zap, title: 'Geniş Malzeme Yelpazesi', desc: 'Alüminyum, titanyum, inconel, paslanmaz çelik, çelik alaşımları ve mühendislik plastikleri.' },
];

const materials = [
  'Alüminyum Alaşımları',
  'Titanyum (Ti-6Al-4V)',
  'Inconel 718',
  'Paslanmaz Çelik',
  'Takım Çelikleri',
  'Delrin / PEEK',
];

const sectors = [
  { name: 'Savunma Sanayi', items: ['Gövde parçaları', 'Kovan ve mermi bileşenleri', 'Optik tutucu'] },
  { name: 'Havacılık', items: ['Türbin kanatçıkları', 'Brakete ve fitting', 'Yapısal tutucular'] },
  { name: 'Otomotiv', items: ['Prototip parçalar', 'Kalıp ve fixture', 'Motor bileşenleri'] },
];

export default function CNCPage() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">Anasayfa</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-600 font-medium">CNC İşleme</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">CNC & Lazer Kesim</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            5 Eksen{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CNC Hassasiyet</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            ±0.005mm hassasiyetle 5 eksen simultane işleme kapasitemizle savunma sanayii, havacılık ve otomotiv sektörü için kompleks parçalar üretiyoruz.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200">
              Fiyat Teklifi Al <ArrowRight size={18} />
            </Link>
            <Link href="/references" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
              Referanslar
            </Link>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="w-full py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specs.map((spec, i) => (
              <div key={i} className="text-center group">
                <div className="text-lg font-black text-indigo-600 tracking-tighter mb-1 group-hover:scale-105 transition-transform">{spec.value}</div>
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
              CNC{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Üstünlüklerimiz</span>
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

      {/* Sectors + Materials */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Sectors */}
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Sektörler</div>
              <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-8">
                Hangi{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sektörlere</span>{' '}Hizmet Veriyoruz?
              </h2>
              <div className="space-y-6">
                {sectors.map((sector, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                    <h4 className="font-bold text-gray-900 mb-3">{sector.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {sector.items.map((item, ii) => (
                        <span key={ii} className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Materials */}
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Malzemeler</div>
              <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-8">
                İşlediğimiz{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Malzemeler</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {materials.map((mat, i) => (
                  <div key={i} className="flex items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                    <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{mat}</span>
                  </div>
                ))}
              </div>
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
                STEP Dosyanızı Gönderin,<br /><span className="text-indigo-400">24 Saatte Teklif Alın.</span>
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8 max-w-xl mx-auto">Mühendis ekibimiz teknik inceleme yaparak en uygun işleme stratejisi ve fiyatı sunar.</p>
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Teknik Teklif Al <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
