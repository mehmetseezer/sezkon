import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft, ChevronRight, FileText } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author: string;
  read_time: string;
  is_featured: number;
  is_published: number;
  created_at: string;
  updated_at: string;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  seo_keywords: string | null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  try {
    const rows = await query(
      'SELECT title, excerpt, seo_title, seo_description, seo_keywords, author, created_at, updated_at FROM blogs WHERE slug = ? AND is_published = 1',
      [slug]
    );
    const blog = (rows as Blog[])[0];
    if (!blog) return { title: 'Blog | Sezkon' };

    const title = blog.seo_title || `${blog.title} | Sezkon`;
    const description = blog.seo_description || blog.excerpt || '';
    const canonical = `https://www.sezkon.com/${locale}/blog/${slug}`;

    return {
      metadataBase: new URL('https://www.sezkon.com'),
      title,
      description,
      keywords: blog.seo_keywords ? blog.seo_keywords.split(',').map((k) => k.trim()) : undefined,
      authors: [{ name: blog.author || 'Sezkon' }],
      alternates: {
        canonical,
        languages: {
          tr: `https://www.sezkon.com/tr/blog/${slug}`,
          en: `https://www.sezkon.com/en/blog/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'Sezkon',
        locale,
        type: 'article',
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at || blog.created_at,
        authors: [blog.author || 'Sezkon'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
      },
    };
  } catch {
    return { title: 'Blog | Sezkon' };
  }
}


export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  let blog: Blog | null = null;
  let relatedBlogs: Blog[] = [];

  try {
    const rows = await query('SELECT * FROM blogs WHERE slug = ? AND is_published = 1', [slug]);
    blog = (rows as Blog[])[0] || null;

    if (blog) {
      const related = await query(
        'SELECT id, title, slug, excerpt, cover_image, category, author, read_time, created_at FROM blogs WHERE is_published = 1 AND id != ? ORDER BY created_at DESC LIMIT 3',
        [blog.id]
      );
      relatedBlogs = related as Blog[];
    }
  } catch (error) {
    console.error('Blog fetch error:', error);
  }

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'description': blog.seo_description || blog.excerpt || '',
    'image': blog.cover_image ? (blog.cover_image.startsWith('http') ? blog.cover_image : `https://www.sezkon.com${blog.cover_image}`) : [],
    'datePublished': blog.created_at,
    'dateModified': blog.updated_at || blog.created_at,
    'keywords': blog.seo_keywords || blog.focus_keyword || '',
    'articleSection': blog.category || 'Teknoloji',
    'wordCount': blog.content ? blog.content.replace(/<[^>]+>/g, '').split(/\s+/).length : undefined,
    'inLanguage': locale,
    'url': `https://www.sezkon.com/${locale}/blog/${blog.slug}`,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.sezkon.com/${locale}/blog/${blog.slug}`,
    },
    'author': {
      '@type': 'Person',
      'name': blog.author || 'Mehmet Sezer',
      'url': 'https://www.sezkon.com/tr/about',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Sezkon',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.sezkon.com/logos/logo.png',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Ana Sayfa',
        'item': `https://www.sezkon.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': `https://www.sezkon.com/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': blog.title,
        'item': `https://www.sezkon.com/${locale}/blog/${blog.slug}`,
      },
    ],
  };


  return (
    <main className="w-full bg-white min-h-screen">
      {/* BlogPosting + BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1550px] py-16 lg:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={14} />
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-300 truncate max-w-[250px]">{blog.title}</span>
          </nav>

          {/* Category */}
          {blog.category && (
            <span className="inline-block text-[10px] font-extrabold tracking-widest bg-[#6191c4] text-white px-3 py-1 rounded uppercase mb-6">
              {blog.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-white max-w-5xl">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <User size={16} />
              {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {blog.read_time}
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="container mx-auto px-6 max-w-[1550px] -mt-8 relative z-20">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-64 md:h-96 lg:h-[480px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-6 max-w-[1550px] py-12 lg:py-16">
        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-10 pb-10 border-b border-slate-200 italic max-w-5xl">
            {blog.excerpt}
          </p>
        )}

        {/* Blog HTML Content */}
        <div
          className="blog-content max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-[#6191c4] font-bold hover:underline text-base"
          >
            <ArrowLeft size={16} />
            Tüm Blog Yazıları
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 py-20">
          <div className="container mx-auto px-6 max-w-[1550px]">
            <div className="mb-12 text-left space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sizin İçin Seçtiğimiz Öneriler</h2>
              <p className="text-slate-500 font-semibold text-sm md:text-base">İlginizi çekebilecek diğer sektörel analizlerimiz, rehberlerimiz ve kurumsal makalelerimiz.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6191c4]/20 to-[#8b5cf6]/20 flex items-center justify-center">
                        <FileText className="text-slate-400" size={32} />
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute top-4 left-4 text-[10px] font-extrabold tracking-widest bg-[#6191c4] text-white px-2.5 py-1 rounded uppercase z-10 shadow-sm">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#6191c4] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-light line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100 text-xs text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </span>
                      <span className="text-[#6191c4] group-hover:underline flex items-center gap-0.5 font-bold">
                        Oku <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog content styles */}
      <style>{`
        .blog-content h1 {
          font-size: 2.25em;
          font-weight: 900;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
          color: #0f172a;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .blog-content h2 {
          font-size: 1.75em;
          font-weight: 800;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
          color: #0f172a;
          line-height: 1.3;
          letter-spacing: -0.015em;
        }
        .blog-content h3 {
          font-size: 1.4em;
          font-weight: 700;
          margin-top: 1.4em;
          margin-bottom: 0.5em;
          color: #1e293b;
        }
        .blog-content p {
          margin-bottom: 1.5em;
          line-height: 2;
          color: #334155;
          font-size: 1.15em;
        }
        .blog-content ul, .blog-content ol {
          padding-left: 2em;
          margin-bottom: 1.5em;
        }
        .blog-content li {
          margin-bottom: 0.6em;
          line-height: 1.8;
          color: #334155;
          font-size: 1.1em;
        }
        .blog-content blockquote {
          border-left: 4px solid #6191c4;
          padding-left: 1.75em;
          margin: 2em 0;
          color: #475569;
          font-style: italic;
          font-size: 1.2em;
          line-height: 1.8;
        }
        .blog-content code {
          background: #f1f5f9;
          padding: 0.25em 0.5em;
          border-radius: 6px;
          font-size: 0.9em;
          color: #6191c4;
          font-weight: 600;
        }
        .blog-content pre {
          background: #0f172a;
          color: #f8fafc;
          padding: 2em;
          border-radius: 16px;
          overflow-x: auto;
          margin: 2em 0;
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .blog-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: 0.95em;
        }
        .blog-content a {
          color: #6191c4;
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 600;
          transition: color 0.2s;
        }
        .blog-content a:hover {
          color: #4b7aa8;
        }
        .blog-content img {
          border-radius: 16px;
          max-width: 100%;
          margin: 2.5em auto;
          display: block;
          shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .blog-content mark {
          background: #fef08a;
          padding: 0.1em 0.3em;
          border-radius: 4px;
        }
        .blog-content hr {
          border: none;
          border-top: 2px solid #f1f5f9;
          margin: 2.5em 0;
        }
        .blog-content strong {
          color: #0f172a;
          font-weight: 700;
        }
      `}</style>
    </main>
  );
}
