import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

import Hero from '@/components/ui/Hero';
import ServicesGrid from '@/components/ui/ServicesGrid';
import CaseStudies from '@/components/ui/CaseStudies';
import BlogPreview from '@/components/ui/BlogPreview';
import CTASection from '@/components/ui/CTASection';
import HomeClient from './HomeClient';

export async function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  const keywords = t.raw('keywords') as string[];
  const alternateLanguages = { tr: '/tr', en: '/en' };

  return generateSEO({
    title: t('meta_title'),
    description: t('meta_desc'),
    canonical: `/${locale}`,
    locale,
    alternateLanguages,
    keywords,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // LocalBusiness + Organization JSON-LD (GEO için kritik)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sezkon',
    description:
      locale === 'tr'
        ? 'ERP, CRM, özel yazılım geliştirme ve CNC üretim çözümleri sunan kurumsal teknoloji şirketi.'
        : 'Enterprise technology company providing ERP, CRM, custom software and CNC manufacturing solutions.',
    url: 'https://www.sezkon.com',
    logo: 'https://www.sezkon.com/logos/logo.png',
    image: 'https://www.sezkon.com/og-default.jpg',
    telephone: '+905522403705',
    email: 'info@sezkon.com',
    foundingDate: '2013',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pera Residence, Yeşilbağlar Mah. D100 Bulvarı No:20, A Blok Kat:6 Ofis:29',
      addressLocality: 'Pendik',
      addressRegion: 'İstanbul',
      postalCode: '34899',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.877,
      longitude: 29.289,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.linkedin.com/company/sezkon',
      'https://www.instagram.com/sezkon',
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'TR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'tr' ? 'Yazılım ve Üretim Hizmetleri' : 'Software and Manufacturing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP Sistemleri' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Yazılımı' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Özel Yazılım Geliştirme' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CNC İşleme' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lazer Kesim' } },
      ],
    },
  };

  return (
    <main className="flex flex-col w-full bg-white overflow-x-hidden">
      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Services Grid */}
      <ServicesGrid />

      {/* 3. Trust + Industries (client: motion animasyonları) */}
      <HomeClient />

      {/* 4. Case Studies */}
      <CaseStudies />

      {/* 5. Blog Preview Feed */}
      <BlogPreview />

      {/* 6. Call To Action Banner */}
      <CTASection />
    </main>
  );
}