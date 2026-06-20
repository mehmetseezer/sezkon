import { query } from '@/lib/db';
import BlogPageClient from './BlogPageClient';
import { generateSEO } from '@/lib/seo';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const keywords = t.raw('keywords') as string[];
  return generateSEO({
    title: t('meta_title'),
    description: t('meta_desc'),
    canonical: `/${locale}/blog`,
    locale,
    alternateLanguages: { tr: '/tr/blog', en: '/en/blog' },
    keywords,
  });
}


interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  category: string;
  author: string;
  read_time: string;
  is_featured: number;
  is_published: number;
  created_at: string;
}

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10));
  const search = resolvedSearchParams.search || '';
  const category = resolvedSearchParams.category || '';
  const limit = 5;
  const offset = (page - 1) * limit;

  // Build conditions array for query
  const conditions: string[] = ['is_published = 1'];
  const queryParams: any[] = [];

  if (search) {
    conditions.push('(title LIKE ? OR excerpt LIKE ? OR category LIKE ? OR author LIKE ?)');
    const wildcard = `%${search}%`;
    queryParams.push(wildcard, wildcard, wildcard, wildcard);
  }

  if (category) {
    conditions.push('category = ?');
    queryParams.push(category);
  }

  const whereClause = `WHERE ${conditions.join(' AND ')}`;

  let totalRecords = 0;
  let blogs: Blog[] = [];
  let categories: string[] = [];

  try {
    // 1. Count total matching elements
    const countResult = await query(`SELECT COUNT(*) as count FROM blogs ${whereClause}`, queryParams);
    totalRecords = (countResult as any)[0]?.count || 0;

    // 2. Fetch paginated elements
    const fetchSql = `
      SELECT id, title, slug, excerpt, cover_image, category, author, read_time, is_featured, created_at 
      FROM blogs 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    const blogsResult = await query(fetchSql, queryParams);
    blogs = blogsResult as Blog[];

    // 3. Fetch unique categories for dynamic filter
    const categoriesResult = await query(
      'SELECT DISTINCT category FROM blogs WHERE is_published = 1 AND category IS NOT NULL AND category != ""'
    );
    categories = (categoriesResult as any[]).map((row) => row.category);
  } catch (error) {
    console.error('Blog fetch error:', error);
  }

  const totalPages = Math.ceil(totalRecords / limit);

  const baseUrl = 'https://www.sezkon.com';
  const pageUrl = `${baseUrl}/${locale}/blog`;

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'tr' ? 'Sezkon Blog - Teknoloji ve Üretim Yazıları' : 'Sezkon Blog - Technology & Manufacturing Articles',
    description: locale === 'tr' ? 'Endüstri 4.0, özel yazılım, CNC işleme ve e-ticaret teknolojileri hakkında güncel içerikler.' : 'Latest insights on Industry 4.0, custom software, CNC machining, and e-commerce technologies.',
    url: pageUrl,
    about: {
      '@type': 'Organization',
      name: 'Sezkon',
      url: baseUrl,
    },
    hasPart: blogs.map((blog) => ({
      '@type': 'BlogPosting',
      '@id': `${baseUrl}/${locale}/blog/${blog.slug}`,
      name: blog.title,
      headline: blog.title,
      description: blog.excerpt,
      url: `${baseUrl}/${locale}/blog/${blog.slug}`,
      image: blog.cover_image ? (blog.cover_image.startsWith('http') ? blog.cover_image : `${baseUrl}${blog.cover_image}`) : `${baseUrl}/og-default.jpg`,
      author: {
        '@type': 'Person',
        name: blog.author || 'Sezkon Editor',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Sezkon',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logos/logo.png`,
        },
      },
      datePublished: new Date(blog.created_at).toISOString(),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BlogPageClient
        initialBlogs={blogs}
        pagination={{
          page,
          limit,
          total: totalRecords,
          totalPages,
        }}
        categories={categories}
        initialSearch={search}
        initialCategory={category}
      />
    </>
  );
}