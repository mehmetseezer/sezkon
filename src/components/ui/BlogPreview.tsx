'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Rss } from 'lucide-react';

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

const BlogPreview = () => {
  const t = useTranslations('Home');
  const blogT = useTranslations('Blog');
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => setBlogs((data.blogs || []).slice(0, 3)))
      .catch(() => {});
  }, []);

  const featuredPost = blogs.find((b) => b.is_featured) || blogs[0];
  const secondaryPosts = blogs.filter((b) => b.id !== featuredPost?.id);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (blogs.length === 0) return null;

  return (
    <section className="w-full py-24 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-6 max-w-[1550px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
              <Rss size={14} />
              <span>{blogT('hero_tag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              {t('blog_title')}
            </h2>
            <p className="text-slate-500 font-normal text-base md:text-lg">
              {t('blog_subtitle')}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm"
          >
            <span>Tüm Makaleleri Gör</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured */}
          {featuredPost && (
            <motion.div
              key={featuredPost.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary to-accent overflow-hidden flex items-center justify-center p-8 text-white">
                {featuredPost.cover_image && (
                  <img
                    src={featuredPost.cover_image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="relative z-20 text-left w-full h-full flex flex-col justify-between">
                  <span className="self-start text-[10px] font-extrabold tracking-widest bg-accent text-white px-2.5 py-1 rounded uppercase">
                    {featuredPost.category}
                  </span>
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {featuredPost.read_time}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <h3 className="text-2xl font-extrabold text-primary hover:text-accent transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                </Link>
                <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {formatDate(featuredPost.created_at)}
                  </span>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary */}
          <div className="lg:col-span-5 space-y-6">
            {secondaryPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between gap-4 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-extrabold text-accent uppercase tracking-widest">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock size={10} /> {post.read_time}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-slate-500 font-light text-xs mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {formatDate(post.created_at)}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent hover:underline font-bold flex items-center gap-0.5"
                  >
                    <span>Oku</span>
                    <ArrowRight size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
