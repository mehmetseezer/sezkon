import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  locale?: string;
  alternateLanguages?: Record<string, string>;
  keywords?: string | string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
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
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: SEOProps): Metadata {
  return {
    metadataBase: new URL('https://www.sezkon.com'),
    title,
    description,
    ...(keywords && { keywords }),
    ...(authors && { authors: authors.map((name) => ({ name })) }),
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
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
      }),
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
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}