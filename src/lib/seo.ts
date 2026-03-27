import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  locale?: string;
  alternateLanguages?: Record<string, string>;
  keywords?: string | string[]; // yeni eklenen opsiyonel alan
}

export function generateSEO({
  title,
  description,
  canonical,
  ogImage = '/og-default.jpg',
  noIndex = false,
  locale = 'tr',
  alternateLanguages = {},
  keywords,
}: SEOProps): Metadata {
  return {
    title,
    description,
    ...(keywords && { keywords }), // sadece varsa eklenir
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Sezkon',
      locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}