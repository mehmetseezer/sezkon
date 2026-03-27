import { Inter } from 'next/font/google';
import "../globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export async function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = locale === 'tr' ? 'Sezkon – Yazılım & CNC Üretim' : 'Sezkon – Software & CNC Manufacturing';
  const description = locale === 'tr'
    ? 'Endüstri 4.0, yazılım geliştirme ve CNC işleme çözümleri.'
    : 'Industry 4.0, software development and CNC machining solutions.';

  const keywords = locale === 'tr'
    ? ['Sezkon', 'yazılım', 'CNC', 'lazer kesim', 'abkant büküm', 'Endüstri 4.0', 'akıllı fabrika', 'özel yazılım', 'ERP', 'CRM', 'hassas işleme']
    : ['Sezkon', 'software', 'CNC', 'laser cutting', 'press brake', 'Industry 4.0', 'smart factory', 'custom software', 'ERP', 'CRM', 'precision machining'];

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
    url: 'https://www.sezkon.com',
    logo: 'https://www.sezkon.com/logo.png',
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90 (552) 240 37 05',
      contactType: 'customer service',
      email: 'info@sezkon.com',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sezkon',
    url: 'https://www.sezkon.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.sezkon.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={locale}>
      <head>
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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}