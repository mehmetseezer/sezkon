import { Plus_Jakarta_Sans } from 'next/font/google';
import "../globals.css";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import MobileStickyCTA from '../../components/ui/MobileStickyCTA';
import BackToTop from '../../components/ui/BackToTop';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export async function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}

const brandFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-brand-family',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'tr' ? 'Sezkon – Kurumsal ERP & CRM Yazılım Çözümleri' : 'Sezkon – Enterprise ERP & CRM Software Solutions';
  const description = locale === 'tr'
    ? 'Kurumsal ERP, CRM, özel yazılım geliştirme ve sistem entegrasyonu çözümleri.'
    : 'Enterprise ERP, CRM, custom software development, and system integration solutions.';

  const keywords = locale === 'tr'
    ? ['Sezkon', 'yazılım', 'kurumsal yazılım', 'ERP sistemleri', 'CRM sistemleri', 'özel yazılım geliştirme', 'sistem entegrasyonu', 'mobil uygulama', 'web yazılım']
    : ['Sezkon', 'software', 'enterprise software', 'ERP systems', 'CRM systems', 'custom software development', 'system integration', 'mobile application', 'web development'];

  return {
    title: {
      default: title,
      template: '%s | Sezkon',
    },
    description,
    keywords,
    metadataBase: new URL('https://www.sezkon.com'),
    openGraph: {
      siteName: 'Sezkon',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  if (!['tr', 'en'].includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // JSON-LD Şemaları
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sezkon',
    legalName: 'Sezkon Makine ve Yazılım San. Tic. Ltd. Şti.',
    url: 'https://www.sezkon.com',
    logo: 'https://www.sezkon.com/logos/logo.png',
    foundingDate: '2013',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
    areaServed: ['TR', 'DE', 'GB'],
    sameAs: [
      'https://www.linkedin.com/company/sezkon',
      'https://www.instagram.com/sezkon',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pera Residence, Yeşilbağlar Mah. D100 Bulvarı No:20, A Blok Kat:6 Ofis:29',
      addressLocality: 'Pendik',
      addressRegion: 'İstanbul',
      postalCode: '34899',
      addressCountry: 'TR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+905522403705',
        contactType: 'customer service',
        email: 'info@sezkon.com',
        availableLanguage: ['Turkish', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+905343913934',
        contactType: 'sales',
        availableLanguage: ['Turkish'],
      },
    ],
    knowsAbout: [
      'ERP sistemleri',
      'CRM yazılımı',
      'Özel yazılım geliştirme',
      'CNC işleme',
      'Lazer kesim',
      'Endüstri 4.0',
      'MES sistemleri',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sezkon',
    url: 'https://www.sezkon.com',
    inLanguage: ['tr-TR', 'en-US'],
    publisher: {
      '@type': 'Organization',
      name: 'Sezkon',
    },
  };


  return (
    <html lang={locale} className={`${brandFont.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R570T40X56"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R570T40X56');
          `}
        </Script>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileStickyCTA />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}