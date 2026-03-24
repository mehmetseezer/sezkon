import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Monitor, Globe, ShoppingCart, Smartphone, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Tasarım Hizmetleri | Sezkon – Kurumsal Web Çözümleri',
  description: 'Kurumsal kimliğinizi yansıtan, SEO uyumlu ve yüksek performanslı web sitesi tasarımı. Next.js ve React ile modern web deneyimi.',
  keywords: ['web tasarım', 'kurumsal web sitesi', 'Next.js', 'React', 'SEO uyumlu web tasarım', 'İstanbul web ajansı'],
  openGraph: { title: 'Web Tasarım | Sezkon', description: 'SEO uyumlu kurumsal web sitesi tasarımı.', type: 'website' },
};

const features = [
  { icon: Globe, title: 'SEO Odaklı', desc: 'Teknik SEO, Core Web Vitals ve hız optimizasyonu ile Google sıralamalarında öne çıkın.' },
  { icon: Monitor, title: 'Responsive Tasarım', desc: 'Her cihaz ve ekran boyutunda kusursuz görüntü ve deneyim.' },
  { icon: ShoppingCart, title: 'Dönüşüm Optimizasyonu', desc: 'Ziyaretçileri müşteriye dönüştüren UX odaklı tasarım kararları.' },
  { icon: Code, title: 'Modern Teknoloji', desc: 'Next.js, TypeScript ve Tailwind CSS ile hızlı, güvenilir ve sürdürülebilir kod.' },
];

const process = [
  { num: '01', title: 'Keşif & Analiz', desc: 'Marka kimliğinizi, hedef kitlenizi ve rekabetçi konumlanmayı derinlemesine analiz ediyoruz.' },
  { num: '02', title: 'Tasarım & Prototip', desc: 'Figma\'da wireframe ve interaktif prototip oluşturuyor, onayınızı alıyoruz.' },
  { num: '03', title: 'Geliştirme', desc: 'Onaylanan tasarımı modern teknoloji yığınıyla hayata geçiriyoruz.' },
  { num: '04', title: 'Test & Yayın', desc: 'Cross-browser testler, performans analizi ve sorunsuz yayına alma.' },
];

export default function WebDesignPage() {
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
            <Link href="/services/web-design" className="text-sm text-gray-600 font-medium">Web Tasarım</Link>
          </div>
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Yazılım Çözümleri</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            Etkileyici{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Web Deneyimleri</span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mb-10">
            Markanızı dijital dünyada en iyi şekilde temsil eden, hızlı, SEO uyumlu ve dönüşüm odaklı web siteleri tasarlıyoruz.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-200">
              Teklif Al <ArrowRight size={18} />
            </Link>
            <Link href="/references" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300">
              Referanslar
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 mb-4">
              Neden <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Sezkon Web?</span>
            </h2>
            <p className="text-gray-500 font-light text-lg">Rakiplerinizin önüne geçmeniz için ihtiyacınız olan her şey tek çatı altında.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500">
                <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300"><f.icon size={28} /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{f.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full py-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Sürecimiz</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              Fikrden <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Yayına</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent z-0" />
            {process.map((step, i) => (
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

      {/* Packages */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">Paketler</div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              İhtiyacınıza <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Uygun Paket</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Başlangıç', price: '₺15,000', desc: 'Küçük işletmeler için', features: ['5 sayfa web sitesi', 'Responsive tasarım', 'Temel SEO', '1 yıl bakım'] },
              { name: 'Kurumsal', price: '₺35,000', desc: 'Büyüyen şirketler için', features: ['15 sayfa web sitesi', 'CMS entegrasyonu', 'Gelişmiş SEO', 'Hız optimizasyonu', '2 yıl bakım'], featured: true },
              { name: 'Enterprise', price: 'Özel Teklif', desc: 'Büyük kurumlar için', features: ['Sınırsız sayfa', 'Özel backend', 'API entegrasyonları', 'A/B testi', '7/24 destek'] },
            ].map((pkg, i) => (
              <div key={i} className={`group relative rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl ${pkg.featured ? 'bg-indigo-950 border border-indigo-800' : 'bg-white/70 backdrop-blur-sm border border-gray-100 hover:border-indigo-200'}`}>
                {pkg.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full">En Popüler</div>}
                <h3 className={`text-xl font-black tracking-tight mb-1 ${pkg.featured ? 'text-white' : 'text-gray-900'}`}>{pkg.name}</h3>
                <p className={`text-sm mb-4 ${pkg.featured ? 'text-indigo-300' : 'text-gray-500'}`}>{pkg.desc}</p>
                <div className={`text-3xl font-black tracking-tighter mb-6 ${pkg.featured ? 'text-white' : 'text-indigo-600'}`}>{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, fi) => (
                    <li key={fi} className={`flex items-center gap-2 text-sm font-medium ${pkg.featured ? 'text-indigo-200' : 'text-gray-700'}`}>
                      <CheckCircle2 size={16} className={pkg.featured ? 'text-indigo-400' : 'text-indigo-600'} /> {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-all duration-300 ${pkg.featured ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}>
                  Başlayalım <ArrowRight size={16} className="ml-2" />
                </Link>
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
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic mb-6">
                Projenizi Hayata <span className="text-indigo-400">Geçirelim.</span>
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8 max-w-xl mx-auto">Ücretsiz ön değerlendirme için formu doldurun, 24 saat içinde yanıt verelim.</p>
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Ücretsiz Teklif Al <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
