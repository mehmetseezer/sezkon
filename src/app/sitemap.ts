import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sezkon.com';

  // Statik rotalar (ana sayfa dahil)
  const staticRoutes = [
    '',           // ana sayfa
    'about',
    'references',
    'contact',
    'privacy',
    'cookies',
    'terms',
  ];

  // Hizmet sayfaları (daha yüksek öncelik)
  const serviceRoutes = [
    'services/software-development',
    'services/cnc-machining',
    'services/sheet-metal-cutting',
    'services/web-design',
    'services/e-commerce',
    'services/mobile-app',
    'services/industry-4-0',
  ];

  const pages: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Statik sayfalar
    for (const route of staticRoutes) {
      const url = `${baseUrl}/${locale}${route ? `/${route}` : ''}`;
      pages.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1.0 : 0.7,
      });
    }

    // Hizmet sayfaları (daha sık güncellenebilir, daha yüksek öncelik)
    for (const service of serviceRoutes) {
      pages.push({
        url: `${baseUrl}/${locale}/${service}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return pages;
}