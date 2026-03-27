import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/tr/admin/', '/en/admin/'],
    },
    sitemap: 'https://www.sezkon.com/sitemap.xml', // veya sitemap index adresi
  };
}