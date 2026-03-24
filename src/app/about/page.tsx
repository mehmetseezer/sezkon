import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Zap, Award, Users, CheckCircle2, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kurumsal | Sezkon – İki Uzmanlık, Tek Standart',
  description:
    'Sezkon hakkında bilgi edinin. Yazılım ve CNC üretim alanlarında 10+ yıllık deneyimimizle endüstrinin güvenilir teknoloji ortağı olmaya devam ediyoruz.',
  keywords: ['Sezkon kurumsal', 'hakkımızda', 'yazılım şirketi', 'CNC üretim', 'Türkiye teknoloji'],
  openGraph: {
    title: 'Kurumsal | Sezkon',
    description: 'Sezkon hakkında bilgi edinin. Yazılım ve CNC üretim alanlarında güvenilir teknoloji ortağınız.',
    type: 'website',
  },
};

const timeline = [
  { year: '2013', title: 'Kuruluş', desc: 'İstanbul Kartal\'da küçük bir ekiple kuruldu. İlk CNC tezgahımız devreye alındı.' },
  { year: '2016', title: 'Yazılım Birimi', desc: 'ERP ve süreç otomasyon projelerine odaklanan yazılım birimimizi kurduk.' },
  { year: '2019', title: 'Endüstri 4.0', desc: 'Akıllı fabrika çözümleri ve IoT entegrasyon projelerine başladık.' },
  { year: '2022', title: 'Büyüme', desc: '50+ kurumsal müşteri ve 3 kıtaya ihracat ile büyümemizi sürdürdük.' },
  { year: '2025', title: 'Yeni Dönem', desc: 'Yapay zeka destekli üretim çözümleriyle sektörde öncü konumunu pekiştirdik.' },
];

const values = [
  { icon: Target, title: 'Mükemmellik', desc: 'Her projede sıfır hata hedefiyle çalışıyor, kalite standartlarını sürekli yükseltiyoruz.' },
  { icon: Zap, title: 'İnovasyon', desc: 'Teknolojinin sınırlarını zorlayan çözümler geliştiriyor, sektöre yön veriyoruz.' },
  { icon: Shield, title: 'Güvenilirlik', desc: '10+ yıllık deneyimle müşterilerimize söz verdiğimizi zamanında teslim ediyoruz.' },
  { icon: Users, title: 'İş Birliği', desc: 'Müşterilerimizle ortak akıl üreterek uzun vadeli ortaklıklar kuruyoruz.' },
];

const stats = [
  { value: '10+', label: 'Yıl Deneyim' },
  { value: '50+', label: 'Kurumsal Müşteri' },
  { value: '200+', label: 'Tamamlanan Proje' },
  { value: '3', label: 'Kıtaya İhracat' },
];

const team = [
  { name: 'Mehmet Sezgin', role: 'Kurucu & CEO', desc: 'Makine mühendisliği ve yazılım altyapısıyla şirketin vizyonunu yönetiyor.' },
  { name: 'Ayşe Kaya', role: 'Yazılım Direktörü', desc: '15 yıllık yazılım geliştirme deneyimiyle dijital dönüşüm projelerini yönetiyor.' },
  { name: 'Ali Demir', role: 'Üretim Müdürü', desc: 'CNC ve lazer proseslerde 12 yıllık tecrübesiyle kalite güvencesini sağlıyor.' },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            Bizi Tanıyın
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            İki Uzmanlık,{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tek Standart
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            2013 yılından bu yana yazılım teknolojileri ve CNC üretim alanlarında çift uzmanlık modeliyle hizmet veren Sezkon,
            endüstrinin en güvenilir teknoloji ortağı olmaya devam ediyor.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200"
          >
            Bizimle Çalışın <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-neutral-50 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
                Misyonumuz
              </div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 leading-[1.1] mb-6">
                Geleceği Bugünden{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Şekillendiriyoruz
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
                Sanayi ile dijital dünyanın kesişim noktasında konumlanan Sezkon, her iki alana olan derin vukufiyetiyle
                müşterilerinin iş süreçlerini dönüştürüyor.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                ISO 9001 belgeli kalite yönetim sistemimiz, 0.05mm hassasiyetli üretim parkurumuz ve yüzlerce kurumsal
                yazılım projesinden edindiğimiz birikim ile her proje özelinde en iyi çözümü sunuyoruz.
              </p>
            </div>
            <div className="space-y-4">
              {['ISO 9001 Kalite Yönetim Sistemi', 'RoHS & REACH Uyumlu Üretim', '5 Eksen CNC İşleme Kapasitesi', 'Agile Yazılım Geliştirme Metodolojisi', '7/24 Teknik Destek Hattı'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
                  <CheckCircle2 size={20} className="text-indigo-600 flex-shrink-0" />
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-24 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
              Değerlerimiz
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              Bizi Farklı Kılan{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                İlkeler
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((val, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200">
                <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300">
                  <val.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{val.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{val.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
              Tarihçemiz
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              Büyüme{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Yolculuğumuz
              </span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-[3.75rem] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-indigo-300 to-transparent hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="flex-shrink-0 w-28 text-right">
                    <span className="text-2xl font-black text-gray-200 group-hover:text-indigo-600 transition-colors duration-300">{item.year}</span>
                  </div>
                  <div className="relative flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
              Ekibimiz
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              Arkamızdaki{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Güç
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-black text-indigo-600">{member.name[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-indigo-600 mb-4">{member.role}</p>
                <p className="text-gray-600 font-light leading-relaxed text-sm">{member.desc}</p>
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
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight italic mb-6">
                Projenizi Birlikte{' '}
                <span className="text-indigo-400">Hayata</span> Geçirelim.
              </h2>
              <p className="text-lg text-indigo-100/80 mb-8">
                Uzmanlarımız 24 saat içinde sizinle iletişime geçecektir.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full transition-all duration-300 hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1"
              >
                İletişime Geçin <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
