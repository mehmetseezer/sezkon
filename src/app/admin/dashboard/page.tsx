'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeSEO } from '@/lib/seo-analyzer';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  FileText,
  Star,
  Clock,
  Search,
  LayoutDashboard,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Database,
  BarChart3,
  ShieldCheck,
  Check,
  FolderOpen,
  Settings,
  LineChart,
} from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  read_time: string;
  cover_image: string | null;
  is_featured: number;
  is_published: number;
  created_at: string;
  updated_at: string;
  content: string;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  seo_keywords: string | null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort states
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('DESC');

  // Checkbox Selection states for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  // Overall system statistics
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    featured: 0,
    avgSeo: 0,
  });

  const [activityLogs, setActivityLogs] = useState<any[]>([]);

  const categories = [
    'Yazılım Entegrasyonu',
    'Bulut Teknolojileri',
    'Yapay Zeka',
    'Veritabanı Çözümleri',
    'Siber Güvenlik',
    'ERP Çözümleri',
    'Dijital Dönüşüm',
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch blogs on page, limit, search, status, category, or sorting change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBlogs();
    }, 355);

    return () => clearTimeout(delayDebounce);
  }, [page, limit, searchQuery, statusFilter, categoryFilter, sort, order]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/blog?all=true&page=${page}&limit=${limit}&search=${encodeURIComponent(
          searchQuery
        )}&status=${statusFilter}&category=${encodeURIComponent(
          categoryFilter
        )}&sort=${sort}&order=${order}`
      );
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalBlogs(data.pagination?.total || 0);
        setActivityLogs(data.activityLogs || []);
        if (data.stats) {
          setStats(data.stats);
        }
      } else {
        showToast('Blog listesi yüklenemedi', 'error');
      }
    } catch {
      showToast('Blog listesi yüklenemedi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Blog başarıyla silindi', 'success');
        setSelectedIds((ids) => ids.filter((x) => x !== id));
        fetchBlogs();
      }
    } catch {
      showToast('Silme işlemi başarısız', 'error');
    }
    setDeleteId(null);
  };

  // Toggle dynamic single Boolean fields via the PATCH API
  const handleToggleField = async (id: number, field: 'is_published' | 'is_featured', currentValue: number) => {
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !currentValue }),
      });
      if (res.ok) {
        showToast('Blog başarıyla güncellendi', 'success');
        fetchBlogs();
      } else {
        showToast('Güncelleme işlemi başarısız', 'error');
      }
    } catch {
      showToast('Bağlantı hatası oluştu', 'error');
    }
  };

  // Bulk operation processing
  const handleBulkAction = async () => {
    if (!bulkAction) return;
    if (selectedIds.length === 0) return;

    setLoading(true);
    try {
      if (bulkAction === 'delete') {
        const confirmBulk = confirm(`Seçili ${selectedIds.length} blog yazısını tamamen silmek istediğinize emin misiniz?`);
        if (!confirmBulk) {
          setLoading(false);
          return;
        }
        await Promise.all(
          selectedIds.map((id) => fetch(`/api/blog/${id}`, { method: 'DELETE' }))
        );
        showToast('Seçili yazılar silindi', 'success');
      } else if (bulkAction === 'publish' || bulkAction === 'draft') {
        await Promise.all(
          selectedIds.map((id) =>
            fetch(`/api/blog/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ is_published: bulkAction === 'publish' ? 1 : 0 }),
            })
          )
        );
        showToast('Seçili yazılar güncellendi', 'success');
      }
      setSelectedIds([]);
      setBulkAction('');
      fetchBlogs();
    } catch {
      showToast('Toplu işlem sırasında hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Table sorting triggers
  const handleSort = (column: string) => {
    if (sort === column) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSort(column);
      setOrder('DESC');
    }
    setPage(1);
  };

  // Header checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = blogs.map((b) => b.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    }
  };

  // Calculate SEO score based on content (uses shared analyzeSEO helper)
  const getSeoScore = (blog: Blog) => {
    return analyzeSEO({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      seo_title: blog.seo_title,
      seo_description: blog.seo_description,
      focus_keyword: blog.focus_keyword,
    }).score;
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-700 antialiased">
      {/* Top Navbar: Matches Main Site Styling (Clean White/Gold Theme) */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all py-3">
        <div className="w-full max-w-[98%] mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          {/* Main Logo Match */}
          <div className="flex items-center gap-1 group">
            <span className="text-xl md:text-2xl font-black tracking-[0.08em] text-slate-900 group-hover:text-accent transition-colors duration-300">
              SEZKON
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block shadow-[0_0_8px_rgba(43,108,176,0.5)] group-hover:scale-125 transition-transform duration-300" />
            <span className="hidden sm:inline-block text-xs font-black text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded ml-3 tracking-wide">
              Yönetim Paneli
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-extrabold bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-650">
              <Database size={15} className="text-[#6191c4]" />
              <span>Veritabanı: MySQL (Aktif)</span>
            </div>
            <a
              href="/tr/blog"
              target="_blank"
              className="text-sm md:text-base text-slate-500 hover:text-slate-900 font-black transition-colors flex items-center gap-1"
            >
              <span className="hidden sm:inline">Siteyi Görüntüle ↗</span>
              <span className="inline sm:hidden">Site ↗</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm md:text-base text-red-500 hover:text-red-700 font-black transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Çıkış Yap</span>
              <span className="inline sm:hidden">Çıkış</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main CRM Grid Split Layout */}
      <div className="w-full max-w-[98%] mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Main Control Panel (Left Column Span 9) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* CRM Tabs & Navigation Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm space-y-6">
            {/* Action Header */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Tab Navigation - Responsive Horizontal Scroll */}
              <div className="flex items-center p-1 bg-slate-100 rounded-2xl max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                {[
                  { id: 'all', label: 'Tüm Bloglar', count: stats.total },
                  { id: 'published', label: 'Yayındakiler', count: stats.published },
                  { id: 'draft', label: 'Taslaklar', count: stats.drafts },
                  { id: 'featured', label: 'Öne Çıkanlar', count: stats.featured },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setStatusFilter(tab.id);
                      setPage(1);
                    }}
                    className={`px-4 py-2.5 md:px-6 md:py-3 rounded-xl text-xs md:text-base font-black transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      statusFilter === tab.id
                        ? 'bg-white text-[#6191c4] shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}{' '}
                    <span className={`ml-1 px-1.5 md:ml-1.5 md:px-2.5 py-0.5 rounded-lg text-[10px] md:text-xs font-black ${
                      statusFilter === tab.id ? 'bg-[#6191c4]/15 text-[#6191c4]' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Add New Trigger */}
              <button
                onClick={() => router.push('/admin/blog/new')}
                className="flex items-center justify-center gap-2.5 px-7 py-4 bg-[#6191c4] hover:bg-[#4b77a5] text-white font-black rounded-2xl hover:shadow-lg hover:shadow-[#6191c4]/20 transition-all text-base cursor-pointer"
              >
                <Plus size={20} />
                Yeni Makale Ekle
              </button>
            </div>

            {/* Desktop Filter and Search Bar */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Live Search */}
              <div className="relative sm:col-span-6">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Başlık, özet veya yazar adı ile filtrele..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4] focus:border-transparent font-semibold shadow-inner transition-all text-slate-800"
                />
              </div>

              {/* Category Dropdown */}
              <div className="sm:col-span-4">
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl border border-slate-200 bg-slate-50 text-base focus:outline-none focus:ring-2 focus:ring-[#6191c4] focus:bg-white font-extrabold text-slate-700 cursor-pointer"
                >
                  <option value="">Tüm Kategoriler</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filter button */}
              <div className="sm:col-span-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('');
                    setStatusFilter('all');
                    setPage(1);
                  }}
                  className="w-full py-3.5 px-2 text-center text-xs md:text-sm font-black text-slate-500 border border-slate-250 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>

            {/* Mobile Filter and Search Toolbar */}
            <div className="flex sm:hidden items-center gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6191c4] font-semibold transition-all text-slate-800"
                />
              </div>
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-black text-slate-655 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Settings size={16} className="text-[#6191c4]" />
                <span>Filtrele</span>
              </button>
            </div>
          </div>

          {/* Bulk Actions Panel Overlay */}
          {selectedIds.length > 0 && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom duration-300">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-[#6191c4] flex items-center justify-center">
                  <Check size={14} className="text-white font-black" />
                </div>
                <span className="text-base md:text-lg font-black">
                  Seçili <span className="text-[#6191c4] font-black">{selectedIds.length}</span> blog yazısı üzerinde toplu işlem:
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white text-sm font-bold rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#6191c4]"
                >
                  <option value="">İşlem Seçin...</option>
                  <option value="publish">Yayına Al (Aktif Et)</option>
                  <option value="draft">Taslağa Çek (Pasif Et)</option>
                  <option value="delete">Kalıcı Olarak Sil</option>
                </select>
                <button
                  onClick={handleBulkAction}
                  disabled={!bulkAction}
                  className="bg-[#6191c4] hover:bg-[#4d7dae] text-white text-sm font-black px-5 py-2.5 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
                >
                  Uygula
                </button>
              </div>
            </div>
          )}

          {/* High-density CRM Widescreen Table */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-24 flex justify-center shadow-sm">
              <Loader2 className="animate-spin text-[#6191c4]" size={48} />
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-20 text-center shadow-sm">
              <FileText size={64} className="text-slate-355 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-800">Eşleşen Yazı Bulunamadı</h3>
              <p className="text-base text-slate-400 font-semibold mt-1">Lütfen arama kelimenizi veya filtrelerinizi gözden geçirin.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Professional Grid Table with Horizontal Scroll */}
              <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
                <table className="w-full border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/75 select-none">
                      <th className="px-6 py-5 text-left w-12">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === blogs.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-5 h-5 rounded border-slate-300 text-[#6191c4] focus:ring-[#6191c4] cursor-pointer"
                        />
                      </th>
                      <th className="px-4 py-5 text-left text-sm font-black text-slate-500 uppercase tracking-wider">Kapak</th>
                      
                      {/* Interactive sorting headers */}
                      {[
                        { id: 'title', label: 'Başlık' },
                        { id: 'category', label: 'Kategori' },
                        { id: 'created_at', label: 'Tarih' },
                        { id: 'is_published', label: 'Durum' },
                        { id: 'is_featured', label: 'Öne Çıkan' },
                      ].map((header) => (
                        <th
                          key={header.id}
                          onClick={() => handleSort(header.id)}
                          className="px-4 py-5 text-sm font-black text-slate-550 uppercase tracking-wider cursor-pointer hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{header.label}</span>
                            {sort === header.id && (
                              order === 'ASC' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-5 text-right text-sm font-black text-slate-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {blogs.map((blog) => {
                      const seo = getSeoScore(blog);
                      const isSelected = selectedIds.includes(blog.id);

                      return (
                        <tr key={blog.id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-[#6191c4]/5' : ''}`}>
                          {/* Selection Checkbox */}
                          <td className="px-6 py-4 md:py-6">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleSelectOne(blog.id, e.target.checked)}
                              className="w-4 h-4 md:w-5 md:h-5 rounded border-slate-300 text-[#6191c4] focus:ring-[#6191c4] cursor-pointer"
                            />
                          </td>
                          
                          {/* Kapak Thumbnail */}
                          <td className="px-4 py-4 md:py-6">
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shadow-sm">
                              {blog.cover_image ? (
                                <img
                                  src={blog.cover_image}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FileText size={18} className="text-slate-355" />
                              )}
                            </div>
                          </td>

                          {/* Title with Word Count and SEO Score Info */}
                          <td className="px-4 py-4 md:py-6 max-w-sm">
                            <div className="space-y-1">
                              <p className="font-black text-slate-900 text-xs sm:text-sm md:text-base lg:text-lg leading-snug">{blog.title}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                <span className={`text-[9px] md:text-[11px] font-black px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-lg w-fit ${
                                  seo >= 80 ? 'text-green-700 bg-green-50 border border-green-200' : 
                                  seo >= 50 ? 'text-amber-700 bg-amber-50 border border-amber-200' : 'text-red-700 bg-red-50 border border-red-200'
                                }`}>
                                  SEO: {seo}/100
                                </span>
                                <span className="text-[10px] md:text-sm text-slate-500 font-extrabold">Yazar: {blog.author}</span>
                              </div>
                            </div>
                          </td>

                          {/* Category Badge */}
                          <td className="px-4 py-4 md:py-6">
                            <span className="text-[10px] md:text-xs lg:text-sm font-extrabold text-[#6191c4] bg-[#6191c4]/10 px-2.5 py-1 md:px-4 md:py-2 rounded-xl">
                              {blog.category || '-'}
                            </span>
                          </td>

                          {/* Created At */}
                          <td className="px-4 py-4 md:py-6">
                            <span className="text-xs md:text-sm lg:text-base font-extrabold text-slate-600">
                              {new Date(blog.created_at).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </td>

                          {/* Durum - Quick Action Switch Toggle */}
                          <td className="px-4 py-4 md:py-6">
                            <button
                              onClick={() => handleToggleField(blog.id, 'is_published', blog.is_published)}
                              className="focus:outline-none cursor-pointer"
                              title="Yayın Durumunu Değiştir"
                            >
                              {blog.is_published ? (
                                <span className="inline-flex items-center gap-1 text-[10px] md:text-xs lg:text-sm font-black text-green-700 bg-green-50 px-2 py-1 md:px-3.5 md:py-2 rounded-xl border border-green-200 hover:bg-green-100/50 transition-colors">
                                  <Eye size={12} /> Yayında
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] md:text-xs lg:text-sm font-black text-slate-655 bg-slate-100 px-2 py-1 md:px-3.5 md:py-2 rounded-xl border border-slate-200 hover:bg-slate-200/50 transition-colors">
                                  <EyeOff size={12} /> Taslak
                                </span>
                              )}
                            </button>
                          </td>

                          {/* Öne Çıkan Star Quick Action Toggle */}
                          <td className="px-4 py-4 md:py-6 text-center">
                            <button
                              onClick={() => handleToggleField(blog.id, 'is_featured', blog.is_featured)}
                              className="focus:outline-none cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition-colors"
                              title="Öne Çıkarma Durumunu Değiştir"
                            >
                              {blog.is_featured ? (
                                <Star size={16} className="text-amber-400 fill-amber-400 mx-auto" />
                              ) : (
                                <Star size={16} className="text-slate-200 mx-auto hover:text-slate-400 animate-pulse" />
                              )}
                            </button>
                          </td>

                          {/* Standard Row actions */}
                          <td className="px-6 py-4 md:py-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => router.push(`/admin/blog/edit/${blog.id}`)}
                                className="p-2 md:p-3 rounded-xl border border-slate-250 hover:bg-[#6191c4]/15 text-slate-500 hover:text-[#6191c4] transition-colors cursor-pointer shadow-sm"
                                title="Düzenle"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => setDeleteId(blog.id)}
                                className="p-2 md:p-3 rounded-xl border border-slate-250 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-colors cursor-pointer shadow-sm"
                                title="Sil"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                <div className="text-base font-extrabold text-slate-500">
                  {totalBlogs > 0 ? (
                    <>
                      Toplam <span className="text-slate-900 font-black">{totalBlogs}</span> kayıttan{' '}
                      <span className="text-slate-900 font-black">{(page - 1) * limit + 1}</span> -{' '}
                      <span className="text-slate-900 font-black">{Math.min(page * limit, totalBlogs)}</span> arası gösteriliyor
                    </>
                  ) : (
                    'Kayıt bulunamadı'
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-6">
                  {/* Limit Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-slate-500">Sayfa Başına:</span>
                    <select
                      value={limit}
                      onChange={(e) => {
                        setLimit(parseInt(e.target.value, 10));
                        setPage(1);
                      }}
                      className="bg-white border border-slate-250 rounded-xl px-4 py-2 text-base font-black text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6191c4] cursor-pointer"
                    >
                      {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Page Navigation */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2.5 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors text-slate-650 cursor-pointer shadow-sm"
                      title="Önceki Sayfa"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    {getPageNumbers().map((num) => (
                      <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`w-10 h-10 rounded-xl text-base font-black flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                          page === num
                            ? 'bg-[#6191c4] hover:bg-[#4b77a5] text-white shadow-md'
                            : 'border border-slate-250 bg-white hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2.5 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors text-slate-650 cursor-pointer shadow-sm"
                      title="Sonraki Sayfa"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CRM Activity & Database Metrics (Right Column Span 3) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Card 1: CRM Details Dashboard */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <BarChart3 className="text-[#6191c4]" size={22} />
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">CRM Metrikleri</h3>
            </div>
            
            {/* mini stats */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-black text-slate-400 block uppercase tracking-wide">SEO Sağlık Durumu</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#6191c4] h-full rounded-full transition-all duration-500" style={{ width: `${stats.avgSeo || 0}%` }} />
                  </div>
                  <span className="text-sm font-black text-[#6191c4] font-mono">%{stats.avgSeo || 0} Ortalama</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Ort. Okuma</span>
                  <span className="text-lg font-black text-slate-800 block mt-1">5.4 dk</span>
                </div>
                <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Kategoriler</span>
                  <span className="text-lg font-black text-slate-800 block mt-1">{categories.length} Adet</span>
                </div>
              </div>

              <div className="pt-2 space-y-3 text-sm font-bold text-slate-500 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Entegrasyon</span>
                  <span className="text-slate-850 font-black">Next.js App</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunucu Motoru</span>
                  <span className="text-slate-855 font-black">MySQL v8.0</span>
                </div>
                <div className="flex justify-between">
                  <span>SSL Güvenlik</span>
                  <span className="text-green-600 font-black flex items-center gap-0.5">
                    <ShieldCheck size={14} /> Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: CRM Log Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <LineChart className="text-[#8b5cf6]" size={22} />
              <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Sistem Günlüğü</h3>
            </div>
            
            <div className="space-y-4">
              {activityLogs.map((log, idx) => (
                <div key={idx} className="flex gap-3.5 text-xs md:text-sm leading-relaxed">
                  <span className="text-slate-400 font-extrabold shrink-0 mt-0.5">{log.time}</span>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 block leading-snug">
                      [{log.type}] {log.desc}
                    </span>
                    <span className="text-[11px] text-green-600 font-extrabold block flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Başarılı
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mx-auto">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Silmek istediğinize emin misiniz?</h3>
              <p className="text-base font-bold text-slate-400">Bu işlem geri alınamaz ve blog yazısı tamamen silinir.</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-655 font-black text-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-black text-lg hover:bg-red-600 transition-colors cursor-pointer"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Side Panel (Drawer) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          />
          
          {/* Drawer Panel */}
          <div className="relative w-80 max-w-[85%] bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-slate-900 uppercase">Filtrele</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-655 hover:bg-slate-100 transition-colors text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Status Filter inside drawer */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Yayın Durumu</label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'all', label: 'Tüm Bloglar' },
                    { id: 'published', label: 'Yayındakiler' },
                    { id: 'draft', label: 'Taslaklar' },
                    { id: 'featured', label: 'Öne Çıkanlar' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setStatusFilter(tab.id);
                        setPage(1);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-black transition-all cursor-pointer ${
                        statusFilter === tab.id
                          ? 'bg-[#6191c4]/10 text-[#6191c4]'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-wider block">Kategori</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6191c4] font-extrabold text-slate-700 cursor-pointer"
                >
                  <option value="">Tüm Kategoriler</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('');
                  setStatusFilter('all');
                  setPage(1);
                  setMobileFilterOpen(false);
                }}
                className="w-full py-3 text-center text-sm font-black text-slate-500 border border-slate-250 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              >
                Filtreleri Sıfırla
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#6191c4] hover:bg-[#4b77a5] text-white font-black rounded-xl text-center text-sm transition-all cursor-pointer shadow-md shadow-[#6191c4]/15"
              >
                Sonuçları Göster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-xl transition-all ${
            toast.type === 'success'
              ? 'bg-green-500 text-white shadow-green-500/20'
              : 'bg-red-500 text-white shadow-red-500/20'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
