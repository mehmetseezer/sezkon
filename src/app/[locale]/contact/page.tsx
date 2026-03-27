import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';
import ContactForm from './ContactForm'; // client component

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const alternateLanguages = {
    tr: '/tr/contact',
    en: '/en/contact',
  };
  const keywords = t.raw('keywords') as string[]; // dil dosyasından al
  return generateSEO({
    title: t('meta_title'),
    description: t('meta_desc'),
    canonical: `/${locale}/contact`,
    locale,
    alternateLanguages,
    keywords, // yeni eklenen
  });
}

export default function ContactPage() {
  const t = useTranslations('Contact');

  const contactInfo = [
    {
      icon: MapPin,
      label: t('address_label'),
      values: [t('address_value')],
      sub: t('address_full'),
      hrefs: [null],
    },
    {
      icon: Phone,
      label: t('phone_label'),
      values: [t('phone_value'), t('phone2_value')],
      sub: t('phone_sub'),
      hrefs: [
        `tel:${t('phone_value').replace(/[^0-9+]/g, '')}`,
        `tel:${t('phone2_value').replace(/[^0-9+]/g, '')}`,
      ],
    },
    {
      icon: Mail,
      label: t('email_label'),
      values: [t('email_value')],
      sub: t('email_sub'),
      hrefs: [`mailto:${t('email_value')}`],
    },
    {
      icon: Clock,
      label: t('hours_label'),
      values: [t('hours_value')],
      sub: '',
      hrefs: [null],
    },
  ];

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="w-full pt-36 pb-16 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
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

      {/* İletişim Kartları */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200">
                <div className="mb-4 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300">
                  <item.icon size={22} />
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{item.label}</p>

                <div className="space-y-2 mb-2">
                  {item.values.map((value, idx) => (
                    <div key={idx}>
                      {item.hrefs?.[idx] ? (
                        <a
                          href={item.hrefs[idx]}
                          className="font-bold text-gray-900 text-sm leading-snug block hover:text-indigo-600 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-bold text-gray-900 text-sm leading-snug">{value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {item.sub && <p className="text-xs text-gray-500 mt-1">{item.sub}</p>}

                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Harita */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form (client component) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hızlı İletişim */}
              <div className="bg-indigo-950 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-[40px]" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3">{t('sb_tag')}</h3>
                  <p className="text-indigo-200/80 font-light text-sm mb-6 leading-relaxed">
                    {t('sb_desc')}
                  </p>
                  <a
                    href="tel:+905522403705"
                    className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors"
                  >
                    <Phone size={16} /> {t('sb_call')}
                  </a>
                </div>
              </div>

              {/* Harita */}
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-indigo-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">{t('address_value')}</p>
                  <a
                    href="https://maps.app.goo.gl/xrCjNLPqb4vA2wtt5?g_st=ic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {t('map_btn')} <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* SSS */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">{t('faq_title')}</h4>
                {[
                  { q: t('faq_1_q'), a: t('faq_1_a') },
                  { q: t('faq_2_q'), a: t('faq_2_a') },
                  { q: t('faq_3_q'), a: t('faq_3_a') },
                ].map((faq, i) => (
                  <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{faq.q}</p>
                    <p className="text-xs text-gray-500 font-light">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}