import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Referanslar | Sezkon – Müşteri Başarı Hikayeleri',
  description:
    '50+ kurumsal müşterimizin başarı hikayeleri ve Sezkon ile elde ettikleri sonuçlar. Savunma sanayii, otomotiv, gıda ve teknoloji sektörlerinde referanslarımız.',
  keywords: ['Sezkon referanslar', 'müşteri hikayeleri', 'başarı hikayeleri', 'kurumsal referans', 'CNC üretim referans'],
  openGraph: {
    title: 'Referanslar | Sezkon',
    description: '50+ kurumsal müşterimizin başarı hikayeleri.',
    type: 'website',
  },
};

const sectors = [
  { label: 'Tümü', value: 'all' },
  { label: 'Savunma Sanayi', value: 'defense' },
  { label: 'Otomotiv', value: 'automotive' },
  { label: 'Havacılık', value: 'aviation' },
  { label: 'Gıda & Ambalaj', value: 'food' },
  { label: 'Teknoloji', value: 'tech' },
];

const caseStudies = [
  {
    sector: 'Savunma Sanayi',
    company: 'Roketsan A.Ş.',
    logo: 'R',
    color: 'from-red-500 to-orange-500',
    title: 'Hassas Parça Üretiminde %40 Verimlilik Artışı',
    desc: 'Savunma sanayi projeleri için milimetrik hassasiyette üretim süreçlerini optimize ettik. 5 eksen CNC işleme merkezlerimizle kritik parçaların teslimat süresini %40 kısalttık.',
    results: ['0.02mm hassasiyet', '%40 hız artışı', '0 hurda'],
    tag: 'CNC İşleme',
  },
  {
    sector: 'Teknoloji',
    company: 'TechVision Ltd.',
    logo: 'T',
    color: 'from-indigo-500 to-purple-500',
    title: 'Özel ERP ile Süreç Otomasyonu',
    desc: 'Üretim, stok ve sipariş yönetimini tek platformda birleştiren özel ERP çözümü geliştirdik. Gerçek zamanlı raporlama ve mobil entegrasyon ile karar alma süreci hızlandı.',
    results: ['%60 zaman tasarrufu', 'Gerçek zamanlı raporlama', 'iOS & Android uygulama'],
    tag: 'Yazılım',
  },
  {
    sector: 'Otomotiv',
    company: 'OtoParça A.Ş.',
    logo: 'O',
    color: 'from-blue-500 to-cyan-500',
    title: 'Lazer Kesim ile Sıfır Hata Üretim',
    desc: 'Otomotiv yedek parça üretiminde alüminyum ve sac lazer kesim hizmetimizle hata oranını sıfıra indirdik. Aylık 50.000 parça kapasitesine ulaşıldı.',
    results: ['50,000 parça/ay', '%100 kalite geçişi', 'ISO 16949 uyumu'],
    tag: 'Lazer Kesim',
  },
  {
    sector: 'Havacılık',
    company: 'AeroTech TR',
    logo: 'A',
    color: 'from-sky-500 to-blue-500',
    title: 'Havacılık Standartlarında Titanyum İşleme',
    desc: 'Havacılık sektörüne özel titanyum ve inconel alaşımların yüksek hassasiyetli işlenmesinde devreye girdik. Uçuş güvenliği sertifikalı parçalar ürettik.',
    results: ['AS9100 sertifikası', 'Titanyum işleme', '48sa teslimat'],
    tag: 'CNC İşleme',
  },
  {
    sector: 'Gıda & Ambalaj',
    company: 'FreshPack Ltd.',
    logo: 'F',
    color: 'from-green-500 to-emerald-500',
    title: 'Endüstri 4.0 ile Akıllı Fabrika',
    desc: 'Gıda ambalaj üretim hatlarına IoT sensörleri ve yapay zeka tabanlı kalite kontrol sistemi entegre ettik. Bant durma süreleri %70 azaldı.',
    results: ['%70 daha az duruş', 'Yapay zeka kalite kontrol', 'IOT sensör ağı'],
    tag: 'Endüstri 4.0',
  },
  {
    sector: 'Teknoloji',
    company: 'DigiMed A.Ş.',
    logo: 'D',
    color: 'from-purple-500 to-pink-500',
    title: 'Sağlık Teknolojisi Platformu',
    desc: 'Hastane yönetim sistemi ve hasta takip uygulaması geliştirdik. HIPAA uyumlu, bulut tabanlı altyapı ile 20+ klinik kullanıma alındı.',
    results: ['20+ klinik', 'HIPAA uyumlu', 'Mobil uygulama'],
    tag: 'Yazılım',
  },
];

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    role: 'Üretim Direktörü, Roketsan',
    text: 'Sezkon ekibi kalite standartlarımızı hiç taviz vermeden karşıladı. Savunma sanayii kalite gereksinimlerinde bugüne kadar çalıştığımız en güvenilir ortağımız.',
  },
  {
    name: 'Elif Şahin',
    role: 'CTO, TechVision',
    text: 'ERP projemizi zamanında ve bütçe dahilinde teslim ettiler. Yazılım ekibinin teknik derinliği ve iletişim kalitesi beklentilerimizin çok üzerindeydi.',
  },
  {
    name: 'Murat Kaya',
    role: 'Genel Müdür, OtoParça',
    text: '3 yıldır çalışıyoruz, hiç sorun yaşamadık. Lazer kesim kalitesi ve teslimat sürelerine güveninin geliştirdiği fabrikamız artık farklı bir yerde.',
  },
];

export default function ReferencesPage() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            Başarı Hikayeleri
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            Güvenilir{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ortaklıklar
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
            50'yi aşkın kurumsal müşterimizin başarı hikayelerine göz atın. Savunma sanayiinden havacılığa,
            otomotivden teknolojiye farklı sektörlerde somut sonuçlar üretiyoruz.
          </p>
        </div>
      </section>

      {/* Sector filter (visual only) */}
      <section className="w-full py-8 bg-white border-b border-gray-100 sticky top-16 z-10 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sectors.map((s, i) => (
              <span
                key={i}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
                  i === 0
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cs.color} flex items-center justify-center text-white font-black text-xl group-hover:scale-105 transition-transform duration-300`}>
                    {cs.logo}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    {cs.tag}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{cs.company}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight leading-snug">{cs.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm mb-6 flex-1">{cs.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {cs.results.map((r, ri) => (
                    <span key={ri} className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">
                      {r}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
              Müşteri Görüşleri
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              Ne{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Diyorlar?
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                <Quote size={32} className="text-indigo-200 mb-4 group-hover:text-indigo-400 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-light leading-relaxed mb-6 italic">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative bg-indigo-950 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 z-0" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic mb-6">
                Siz de Bu Başarının{' '}
                <span className="text-indigo-400">Parçası</span> Olun.
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8">
                Projenizi paylaşın, 24 saat içinde uzman ekibimiz size ulaşsın.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Projenizden Bahsedin <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
