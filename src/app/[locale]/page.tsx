import HeroCarousel from "@/components/ui/HeroCarousel";
import { Link } from "@/i18n/routing";
import { Scissors, Code, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generateSEO } from "@/lib/seo";

// SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const title = t('meta_title');
  const description = t('meta_desc');
  const keywords = t.raw('keywords') as string[]; // dil dosyasından dizi olarak al

  const alternateLanguages = {
    tr: '/tr',
    en: '/en',
  };

  return generateSEO({
    title,
    description,
    canonical: `/${locale}`,
    locale,
    alternateLanguages,
    keywords, // yeni eklenen alan
  });
}

export default function Home() {
  const t = useTranslations("Home");
  const contactButtonText = t("carousel_contact_btn");

  // Carousel slides – linkler düzeltildi (mevcut /services/* rotalarına yönlendiriliyor)
  const slides = [
    {
      image: "/images/mobile.png",
      tag: t("slide1_tag"),
      title: (
        <>
          {t("slide1_t1")}<br />
          <span className="text-indigo-600">{t("slide1_t2")}</span>
        </>
      ),
      desc: t("slide1_desc"),
      link: "/services/mobile-app",     // mobil uygulama sayfası
    },
    {
      image: "/images/desktop.png",
      tag: t("slide2_tag"),
      title: (
        <>
          {t("slide2_t1")}<br />
          <span className="text-indigo-600">{t("slide2_t2")}</span>
        </>
      ),
      desc: t("slide2_desc"),
      link: "/services/web-design",     // web tasarım sayfası
    },
    {
      image: "/images/laser-cutting.jpg",
      tag: t("slide3_tag"),
      title: (
        <>
          {t("slide3_t1")}<br />
          <span className="text-indigo-600">{t("slide3_t2")}</span>
        </>
      ),
      desc: t("slide3_desc"),
      link: "/services/aluminum-cutting", // lazer kesim sayfası
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("f1_t"),
      desc: t("f1_d"),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("f2_t"),
      desc: t("f2_d"),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: t("f3_t"),
      desc: t("f3_d"),
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t("f4_t"),
      desc: t("f4_d"),
    },
  ];

  const steps = [
    {
      num: "01",
      title: t("st1_t"),
      desc: t("st1_d"),
    },
    {
      num: "02",
      title: t("st2_t"),
      desc: t("st2_d"),
    },
    {
      num: "03",
      title: t("st3_t"),
      desc: t("st3_d"),
    },
  ];

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">
      {/* Carousel */}
      <HeroCarousel slides={slides} brandColor="#4f46e5" contactButtonText={contactButtonText} />

      {/* DUAL EXPERTISE */}
      <section className="w-full py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic">
              {t("dual_tag")}
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-gray-900 leading-[1.1]">
              {t("dual_t1")}{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t("dual_t2")}
              </span>{" "}
              {t("dual_t3")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("dual_desc")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* CNC Service Card */}
            <div className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200">
              <div className="flex flex-col h-full">
                <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300">
                  <Scissors size={32} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                  {t("cnc_t")}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-lg font-light">
                  {t("cnc_d")}
                </p>
                <ul className="space-y-3 mb-8">
                  {[t("cnc_1"), t("cnc_2"), t("cnc_3")].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/services/cnc"                 // düzeltildi
                    className="inline-flex items-center justify-center px-6 py-3 font-semibold text-indigo-600 transition-all duration-300 border border-indigo-200 rounded-full hover:bg-indigo-50 hover:shadow-md hover:-translate-y-0.5"
                  >
                    {t("cnc_btn")}
                  </Link>
                </div>
              </div>
              <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
                <Scissors size={160} />
              </div>
            </div>

            {/* Software Service Card */}
            <div className="group relative bg-indigo-950/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:bg-indigo-950 border border-indigo-800/50 hover:border-indigo-600">
              <div className="flex flex-col h-full">
                <div className="mb-6 p-3 bg-white/10 rounded-2xl text-white w-fit group-hover:scale-105 transition-transform duration-300">
                  <Code size={32} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                  {t("soft_t")}
                </h3>
                <p className="text-indigo-200/80 leading-relaxed mb-6 text-lg font-light">
                  {t("soft_d")}
                </p>
                <ul className="space-y-3 mb-8">
                  {[t("soft_1"), t("soft_2"), t("soft_3")].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-indigo-200">
                      <CheckCircle2 size={16} className="text-indigo-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link
                    href="/services/software"           // düzeltildi
                    className="inline-flex items-center justify-center px-6 py-3 font-semibold text-indigo-600 bg-white rounded-full transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {t("soft_btn")}
                  </Link>
                </div>
              </div>
              <div className="absolute top-10 right-10 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity text-white">
                <Code size={160} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-style features */}
      <section className="w-full py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-repeat bg-white [mask-image:linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))] mask-repeat-[no-repeat] mask-[linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))]" />
        <div className="container relative mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
              {t("why_t1")} <span className="text-indigo-600 relative inline-block font-bold italic">
                {t("why_t2")}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-200 rounded-full -mb-1" />
              </span>
            </h2>
            <p className="mt-6 text-xl text-gray-500 font-light leading-relaxed">
              {t("why_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex flex-col items-start">
                  <div className="mb-6 p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg font-light">
                    {feature.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPERATIONAL PROCESS */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-neutral-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic">
              {t("op_tag")}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900">
              {t("op_t1")}{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t("op_t2")}
              </span>{" "}
              {t("op_t3")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent z-0" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 space-y-6 group">
                <div className="w-24 h-24 rounded-full bg-white/70 backdrop-blur-sm border border-indigo-100 flex items-center justify-center mx-auto transition-all duration-500 group-hover:border-indigo-400 group-hover:shadow-xl group-hover:scale-110">
                  <span className="text-3xl font-black text-gray-300 group-hover:text-indigo-600 transition-colors italic">
                    {step.num}
                  </span>
                </div>
                <div className="text-center space-y-3">
                  <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative bg-indigo-950 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 z-0" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/50 to-transparent" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />

            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white border border-white/20">
                  {t("cta_tag")}
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-tight italic">
                  {t("cta_t1")} <br />{" "}
                  <span className="text-indigo-400">{t("cta_t2")}</span> {t("cta_t3")}
                </h2>
                <p className="text-lg text-indigo-100/80 max-w-xl">
                  {t("cta_d")}
                </p>
              </div>
              <div className="flex flex-col gap-4 items-start md:items-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-indigo-600 bg-white rounded-full transition-all duration-300 hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-1 gap-3"
                >
                  {t("cta_btn")}
                  <ArrowRight size={24} />
                </Link>
                <div className="flex items-center gap-4 text-white/60 text-sm italic font-medium px-4">
                  <Shield size={16} /> {t("cta_note")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final bottom section */}
      <section className="py-24 w-full flex justify-center relative overflow-hidden bg-gradient-to-b from-white to-neutral-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              {t("bot_title")}
            </span>
          </h2>
        </div>
      </section>
    </main>
  );
}