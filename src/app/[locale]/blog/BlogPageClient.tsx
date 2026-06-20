'use client';

import React, { useState, useEffect } from 'react';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  GitMerge,
  ChevronRight,
  TrendingUp,
  Bookmark,
} from 'lucide-react';

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
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BlogPageClientProps {
  initialBlogs: Blog[];
  pagination: Pagination;
  categories: string[];
  initialSearch: string;
  initialCategory: string;
}

export default function BlogPageClient({
  initialBlogs,
  pagination,
  categories,
  initialSearch,
  initialCategory,
}: BlogPageClientProps) {
  const t = useTranslations('Blog');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local search query input state
  const [searchInput, setSearchInput] = useState(initialSearch);

  // Sync input with search parameters update
  useEffect(() => {
    setSearchInput(initialSearch);
  }, [initialSearch]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1'); // reset page count to 1 on filter
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategorySelect = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    params.set('page', '1'); // reset page count to 1
    router.push(`${pathname}?${params.toString()}`);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const renderPagination = () => {
    const { page, totalPages } = pagination;
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8 pt-8 border-t border-slate-200/80">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-extrabold text-sm hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm select-none"
        >
          &larr; {t('prev')}
        </button>

        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 text-slate-400 font-black">
                ...
              </span>
            );
          }
          return (
            <button
              key={`page-${p}`}
              onClick={() => handlePageChange(p as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm transition-all cursor-pointer shadow-sm select-none ${
                page === p
                  ? 'bg-accent text-white shadow-accent/20'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-extrabold text-sm hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm select-none"
        >
          {t('next')} &rarr;
        </button>
      </div>
    );
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen py-16 lg:py-24 border-b border-slate-200">
      <div className="container mx-auto px-6 max-w-[1550px]">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
            <Bookmark size={14} />
            <span>SEZKON TEKNOLOJİ PORTALI</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight">
            {t('hero_t1')} <span className="text-accent">{t('hero_t2')}</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl">
            {t('hero_desc')}
          </p>
        </div>

        {/* Mobile Search */}
        <div className="block lg:hidden mb-8">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder={t('search_mobile_placeholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-accent text-slate-800 text-base shadow-sm"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Feed Frame containing Cards */}
          <div className="lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[500px]">
            {initialBlogs.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center flex-1">
                <p className="text-slate-500 text-xl font-bold">
                  {initialSearch || initialCategory ? t('no_results') : t('no_articles')}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {initialBlogs.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col md:flex-row bg-slate-50/30 hover:bg-white border border-slate-200/60 hover:border-slate-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Cover Image */}
                    <div className="relative w-full md:w-[280px] h-52 md:h-auto shrink-0 overflow-hidden bg-slate-100">
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-extrabold text-lg select-none">
                          SEZKON
                        </div>
                      )}
                      <span className="absolute top-4 left-4 text-[10px] font-black tracking-widest bg-accent text-white px-2.5 py-1 rounded uppercase z-10 shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1 text-left">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm font-semibold text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} /> {formatDate(post.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} /> {post.read_time}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500 font-bold">
                            <User size={13} /> {post.author}
                          </span>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl md:text-2xl font-black text-primary hover:text-accent transition-colors leading-tight">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-base text-slate-600 font-normal leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-slate-100 flex justify-end">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-accent font-black flex items-center gap-1 text-sm hover:gap-1.5 transition-all cursor-pointer"
                        >
                          <span>{t('read_article')}</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {renderPagination()}
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-4 space-y-8 text-left">
            {/* Desktop Search */}
            <div className="hidden lg:block bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">
                {t('search_articles')}
              </h4>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-accent text-slate-800 text-sm shadow-sm"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </form>
            </div>

            {/* Dynamic Categories */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">
                {t('categories')}
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCategorySelect('')}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs font-black cursor-pointer ${
                    !initialCategory
                      ? 'border-accent bg-accent/5 text-accent shadow-sm'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{t('all_posts')}</span>
                  <ChevronRight size={14} />
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs font-black cursor-pointer ${
                      initialCategory === cat
                        ? 'border-accent bg-accent/5 text-accent shadow-sm'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" />
                <span>{t('explore_systems')}</span>
              </h4>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed font-light">
                {t('explore_systems_desc')}
              </p>
              <div className="space-y-3">
                {[
                  { name: t('erp_solutions'), href: '/services/software', icon: Layers },
                  { name: t('crm_solutions'), href: '/services/software', icon: Database },
                  { name: t('system_integrations'), href: '/services/industry40', icon: GitMerge },
                ].map((sys, idx) => {
                  const Icon = sys.icon;
                  return (
                    <Link
                      key={`promo-${idx}`}
                      href={sys.href}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="p-1.5 bg-slate-50 group-hover:bg-accent-light group-hover:text-accent rounded text-slate-500">
                          <Icon size={14} />
                        </span>
                        <span className="text-xs font-bold text-slate-700">{sys.name}</span>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-slate-400 group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <TrendingUp size={14} className="text-accent" />
                <span>{t('latest_posts')}</span>
              </h4>
              <div className="space-y-4">
                {initialBlogs.slice(0, 3).map((art, idx) => (
                  <div key={art.id} className="flex gap-3 group">
                    <span className="text-xl font-extrabold text-slate-300 group-hover:text-accent transition-colors font-mono select-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="text-xs font-bold text-slate-700 group-hover:text-accent transition-colors leading-snug"
                    >
                      {art.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
