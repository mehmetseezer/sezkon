import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Smartphone, Bell, BarChart2, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mobil Uygulama Geliştirme | Sezkon – iOS & Android Çözümleri',
  description: 'React Native ile iOS ve Android için native performanslı mobil uygulama geliştirme. ERP, CRM ve kurumsal iş uygulamaları.',
  keywords: ['mobil uygulama', 'iOS geliştirme', 'Android uygulama', 'React Native', 'kurumsal mobil uygulama'],
  openGraph: { title: 'Mobil Uygulama | Sezkon', description: 'iOS & Android için native mobil uygulama.', type: 'website' },
};

const features = [
  { icon: Smartphone, title: 'iOS & Android', desc: 'React Native ile tek kod tabanından iOS ve Android için native performanslı uygulamalar.' },
  { icon: Bell, title: 'Push Bildirimler', desc: 'Firebase Cloud Messaging ile anlık bildirimler, segmentasyon ve otomasyon.' },
  { icon: BarChart2, title: 'Analitik & Raporlama', desc: 'Uygulama içi analizler, kullanıcı davranışı takibi ve iş zekası raporları.' },
  { icon: Lock, title: 'Güvenli Kimlik Doğrulama', desc: 'Biyometrik giriş, 2FA ve OAuth entegrasyonları ile kurumsal güvenlik seviyesi.' },
  { icon: Zap, title: 'Offline Çalışma', desc: 'İnternet bağlantısı olmadan da devamlı çalışan offline-first mimari.' },
  { icon: BarChart2, title: 'ERP Entegrasyonu', desc: 'Mevcut ERP ve CRM sistemlerinizle sorunsuz entegrasyon ve senkronizasyon.' },
];

export default function MobileAppPage() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-indigo-600 transition-colors">Anasayfa</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-600 font-medium">Mobil Uygulama</span>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Yazılım Çözümleri</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            Yönetim{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Cebinizde</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            İşletmenizin tüm süreçlerini cebinizden yönetin. React Native ile iOS ve Android için native performanslı kurumsal uygulamalar geliştiriyoruz.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200">
            Teklif Al <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              Kurumsal Mobil <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Güç</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
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

      {/* Use Cases */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Kullanım Alanları</div>
            <h2 className="text-4xl font-black tracking-tighter text-gray-900">
              Hangi <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sektörler</span> İçin?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Üretim & Fabrika Yönetimi', 'Sahada Satış Ekipleri', 'Lojistik & Kargo Takibi', 'Sağlık & Klinik', 'İnşaat & Proje Yönetimi', 'Perakende & Depo'].map((uc, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                <span className="font-medium text-gray-800 text-sm">{uc}</span>
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
                Uygulamanız <span className="text-indigo-400">60 Günde</span> Yayında.
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8 max-w-xl mx-auto">Hızlı prototipleme ile fikrinizi kısa sürede somut ürüne dönüştürüyoruz.</p>
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Ücretsiz Danışma <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
