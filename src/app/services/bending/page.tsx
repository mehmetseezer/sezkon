import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Layers, Target, Zap, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Abkant Büküm | Sezkon – CNC Press Brake Hizmetleri',
  description: 'CNC abkant pres ile hassas sac büküm hizmetleri. 320 ton kapasiteli preslerde ±0.2° açı toleransı ile tek ve çok operasyonlu büküm.',
  keywords: ['abkant büküm', 'press brake', 'sac büküm', 'CNC büküm', 'metal büküm İstanbul'],
  openGraph: { title: 'Abkant Büküm | Sezkon', description: 'Hassas CNC abkant büküm hizmetleri.', type: 'website' },
};

const specs = [
  { label: 'Pres Kapasitesi', value: '320 Ton' },
  { label: 'Maks. Uzunluk', value: '4000mm' },
  { label: 'Açı Toleransı', value: '±0.2°' },
  { label: 'Min. Kanal', value: '1mm' },
  { label: 'Maks. Kalınlık', value: '20mm' },
  { label: 'Tekrar Doğruluğu', value: '±0.01mm' },
];

const capabilities = [
  { icon: Target, title: 'Yüksek Açı Doğruluğu', desc: '±0.2° toleransla otomatik açı ölçüm ve gerçek zamanlı düzeltme sistemi sayesinde tekrarlanabilir hassas büküm.' },
  { icon: Layers, title: 'Karmaşık Profiller', desc: 'U, Z, C, L ve özel form profilleri dahil çok operasyonlu karmaşık bükümler tek seferde.' },
  { icon: Settings, title: 'Geniş Malzeme Yelpazesi', desc: 'Siyah sac, paslanmaz, alüminyum ve galvaniz malzemeleri 20mm kalınlığa kadar büküyoruz.' },
  { icon: Zap, title: 'Hızlı Setup', desc: 'CNC kontrol ve otomatik kalıp değişimi ile hızlı setup. Küçük serilerden seri üretime esnek geçiş.' },
];

const profiles = ['L Profil', 'U Profil', 'Z Profil', 'C Profil', 'Hat Bölümü', 'Kutu Profil', 'Özel Form', 'Kapaklık'];

export default function BendingPage() {
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
            <span className="text-sm text-gray-600 font-medium">Abkant Büküm</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">CNC & Lazer Kesim</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            320 Tonluk{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Büküm Gücü</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            320 ton kapasiteli CNC abkant preslerde ±0.2° açı toleransıyla karmaşık profilleri tek seferde üretiyor, lazer kesim ile entegre hizmet sunuyoruz.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200">
            Fiyat Teklifi Al <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Specs */}
      <section className="w-full py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specs.map((spec, i) => (
              <div key={i} className="text-center group">
                <div className="text-xl font-black text-indigo-600 tracking-tighter mb-1 group-hover:scale-105 transition-transform">{spec.value}</div>
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
              Abkant{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Yeteneklerimiz</span>
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

      {/* Profiles & CTA combined */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Profil Çeşitleri</div>
              <h2 className="text-4xl font-black tracking-tighter text-gray-900 mb-6">
                Ürettiğimiz{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Profiller</span>
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-8">Standart profillerin yanı sıra teknik çiziminize uygun özel form profilleri de üretiyoruz.</p>
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
                <h3 className="text-2xl font-black text-white tracking-tight mb-4">Lazer + Büküm Kombine</h3>
                <p className="text-indigo-200/80 font-light text-sm mb-6 leading-relaxed">
                  Lazer kesim ve abkant büküm işlemlerinizi tek bir firmada birleştirin. Ekstra taşıma maliyeti, geçiş süresi ve koordinasyon yükü olmadan.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Tek tedarikçi avantajı', 'Koordinasyon kolaylığı', '%15 maliyet tasarrufu', 'Daha hızlı teslimat'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                      <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors">
                  Teklif Al <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
