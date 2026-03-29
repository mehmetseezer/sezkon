import { generateSEO } from "@/lib/seo";
import { Link } from '@/i18n/routing';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

// Referans Listesi
const references = [
  { name: 'ANDESAN Savunma Sanayi LTD. ŞTİ.', logo: '/logos/andesan_metal.jpeg' },
  { name: 'Jeojem Mühendislik', logo: '/logos/jeojem.png' },
  { name: 'KESKA Zemin Yapı Laboratuvarı ve Mühendislik', logo: '/logos/keska.png' },
  { name: 'Neu Europa Group LTD. ŞTİ.', logo: '/logos/ne_group.png' },
  { name: 'NOKSİ METAL San. ve Dış. Tic. Ltd. Şti.', logo: '/logos/noksi_metal.png' },
  { name: 'RİVİA Mühendislik', logo: '/logos/rivia.png' },
  { name: 'TEKNODROM', logo: '/logos/teknodrom.png' },
  { name: 'YEŞİL SAĞLIK LTİ. ŞTİ.', logo: '/logos/yesil_saglik.png' },
  { name: 'YALÇIN TRANS LTD. ŞTİ.', logo: '/logos/yalcin_trans.png' },
  { name: 'MEGAYOL TRAFİK LTD. ŞTİ.', logo: '/logos/megayol.png' },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Ref' });
  const title = t('meta_title');
  const description = t('meta_desc');
  const keywords = t.raw('keywords') as string[]; // dil dosyasından al

  const basePath = '/references';
  const canonical = `/${locale}${basePath}`;
  const alternateLanguages = {
    tr: `/tr/references`,
    en: `/en/references`,
  };

  return generateSEO({
    title,
    description,
    canonical,
    locale,
    alternateLanguages,
    ogImage: '/og-references.jpg',
    keywords, // yeni eklenen
  });
}

export default function ReferencesPage() {
  const t = useTranslations('Ref');

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero - Orijinal Tasarım */}
      <section className="w-full pt-36 pb-24 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            {t('hero_tag')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            {t('hero_t1')}{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('hero_t2')}
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
            {t('hero_desc')}
          </p>
        </div>
      </section>

      {/* Logo Grid - Grayscale kaldırıldı */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {references.map((ref, i) => (
              <div
                key={i}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white border border-gray-100 hover:border-indigo-200 flex flex-col items-center justify-center text-center"
              >
                {/* Logo Alanı - grayscale ve opacity kaldırıldı */}
                <div className="relative w-full h-24 flex items-center justify-center transition-all duration-500">
                  <Image
                    src={ref.logo}
                    alt={`${ref.name} Logo`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>

                {/* Firma İsmi Span */}
                <span className="mt-6 text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-indigo-600 transition-colors duration-300">
                  {ref.name}
                </span>

                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Orijinal Tasarım */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative bg-indigo-950 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 z-0" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic mb-6">
                {t('cta_t1')}{' '}
                <span className="text-indigo-400">{t('cta_t2')}</span> {t('cta_t3')}
              </h2>
              <p className="text-indigo-100/80 text-lg mb-8">
                {t('cta_desc')}
              </p>
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