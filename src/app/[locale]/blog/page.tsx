import { query } from '@/lib/db';
import BlogPageClient from './BlogPageClient';

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
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10));
  const search = resolvedSearchParams.search || '';
  const category = resolvedSearchParams.category || '';
  const limit = 5;
  const offset = (page - 1) * limit;

  // Build conditions array for query
  const conditions: string[] = ['is_published = 1'];
  const params: any[] = [];

  if (search) {
    conditions.push('(title LIKE ? OR excerpt LIKE ? OR category LIKE ? OR author LIKE ?)');
    const wildcard = `%${search}%`;
    params.push(wildcard, wildcard, wildcard, wildcard);
  }

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  const whereClause = `WHERE ${conditions.join(' AND ')}`;

  let totalRecords = 0;
  let blogs: Blog[] = [];
  let categories: string[] = [];

  try {
    // 1. Count total matching elements
    const countResult = await query(`SELECT COUNT(*) as count FROM blogs ${whereClause}`, params);
    totalRecords = (countResult as any)[0]?.count || 0;

    // 2. Fetch paginated elements
    const fetchSql = `
      SELECT id, title, slug, excerpt, cover_image, category, author, read_time, is_featured, created_at 
      FROM blogs 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    const blogsResult = await query(fetchSql, params);
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

  return (
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
  );
}