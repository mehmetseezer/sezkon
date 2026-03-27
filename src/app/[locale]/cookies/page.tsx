import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Cookies' });
  const title = t('meta_title');
  const description = t('meta_desc');

  const baseUrl = 'https://www.sezkon.com';
  const path = '/cookies';
  const canonical = `${baseUrl}/${locale}${path}`;
  const alternateLanguages = {
    tr: `${baseUrl}/tr${path}`,
    en: `${baseUrl}/en${path}`,
  };

  return generateSEO({
    title,
    description,
    canonical,
    locale,
    alternateLanguages,
    // ogImage: '/og-cookies.jpg', // opsiyonel
  });
}

export default function CookiesPage() {
  const t = useTranslations('Cookies');
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose prose-neutral whitespace-pre-wrap">
        <p>{t('content')}</p>
      </div>
    </main>
  );
}