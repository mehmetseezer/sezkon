import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { query } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Fetch blogs from DB for dynamic sitemap
  let blogs: { slug: string; updated_at: Date }[] = [];
  try {
    console.log('[Sitemap] DB bağlantısı deneniyor...');
    console.log('[Sitemap] HOST:', process.env.DATABASE_HOST || 'localhost');
    console.log('[Sitemap] PORT:', process.env.DATABASE_PORT || '3306');
    console.log('[Sitemap] USER:', process.env.DATABASE_USER || 'root');
    console.log('[Sitemap] NAME:', process.env.DATABASE_NAME || 'sezkon');
    const rows = await query('SELECT slug, updated_at FROM blogs WHERE is_published = 1');
    blogs = rows as { slug: string; updated_at: Date }[];
    console.log(`[Sitemap] ✅ ${blogs.length} blog yüklendi.`);
  } catch (error: any) {
    console.error('[Sitemap] ❌ DB bağlantı hatası!');
    console.error('[Sitemap] Hata kodu:', error?.code);
    console.error('[Sitemap] Hata mesajı:', error?.message);
    console.error('[Sitemap] SQL State:', error?.sqlState);
  }

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

    // Dinamik blog sayfaları
    for (const blog of blogs) {
      pages.push({
        url: `${baseUrl}/${locale}/blog/${blog.slug}`,
        lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return pages;
}