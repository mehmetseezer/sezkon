import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  const title = t('meta_title');
  const description = t('meta_desc');

  const baseUrl = 'https://www.sezkon.com';
  const path = '/privacy'; // veya dil bazlı farklıysa locale'e göre değiştirin
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
    // ogImage: '/og-privacy.jpg', // opsiyonel
  });
}

export default function PrivacyPage() {
  const t = useTranslations('Privacy');
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose prose-neutral whitespace-pre-wrap">
        {t('content')}
      </div>
    </main>
  );
}