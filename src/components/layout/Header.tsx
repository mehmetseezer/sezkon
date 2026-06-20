'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Globe,
  Layers,
  Database,
  GitMerge,
  Cpu,
  Smartphone,
  Laptop,
  Settings,
  Scissors,
  Wrench
} from 'lucide-react';
import { SERVICES_CONTENT } from '@/constants/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileCorporateOpen, setMobileCorporateOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const homeT = useTranslations('Home');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (type: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Mouse geçişlerindeki boşluklarda anında kapanmaması için 200ms bekleme süresi
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle scroll trigger for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileCorporateOpen(false);
  };

  const isActive = (path: string) => pathname === path;
  const isServicesActive = () => pathname.startsWith('/services');
  const isCorporateActive = () => {
    return pathname === '/about' || pathname === '/references' || pathname === '/contact';
  };

  // Icon mapping for navigation list
  const getIconComponent = (Icon: any) => {
    if (!Icon) return null;
    return <Icon size={16} />;
  };

  return (
    <header className="w-full z-[1000] flex flex-col relative">
      {/* Top Announcement Bar */}
      <div className="w-full bg-primary text-white text-xs font-semibold py-2 px-6 text-center select-none tracking-wide transition-all border-b border-primary/20">
        <div className="container mx-auto px-4 max-w-[1550px] flex items-center justify-center gap-2">
          <span className="inline-block bg-accent px-2 py-0.5 rounded text-[10px] uppercase font-bold animate-pulse">
            {t('nav_feat_tag')}
          </span>
          <span className="truncate">{homeT('top_announcement')}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80 z-[1000]'
            : 'bg-white py-5 border-b border-slate-100'
        }`}
      >
        <div className="container mx-auto px-6 max-w-[1550px] flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="text-2xl font-black tracking-[0.08em] text-primary flex items-center gap-1 group font-sans"
            aria-label="SEZKON Ana Sayfa"
          >
            <span className="group-hover:text-accent transition-colors duration-300">SEZKON</span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block shadow-[0_0_8px_rgba(43,108,176,0.5)] group-hover:scale-125 transition-transform duration-300"></span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Anasayfa */}
            <Link
              href="/"
              className={`text-[16px] md:text-[17px] font-bold tracking-wide transition-colors relative py-2 ${
                isActive('/')
                  ? 'text-accent'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              {t('home')}
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
              )}
            </Link>

            {/* Kurumsal Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('corporate')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'corporate' ? null : 'corporate')}
                className={`flex items-center gap-1 text-[16px] md:text-[17px] font-bold tracking-wide py-2 transition-colors cursor-pointer ${
                  isCorporateActive() || activeDropdown === 'corporate'
                    ? 'text-accent'
                    : 'text-slate-600 hover:text-primary'
                }`}
                aria-expanded={activeDropdown === 'corporate'}
              >
                <span>{t('corporate')}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === 'corporate' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Kurumsal Dropdown Menu */}
              <div
                className={`absolute top-[calc(100%-0.25rem)] left-0 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 transition-all duration-300 origin-top z-[1001] ${
                  activeDropdown === 'corporate'
                    ? 'opacity-100 visible translate-y-2 scale-100'
                    : 'opacity-0 invisible translate-y-0 scale-98 pointer-events-none'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className={`px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all ${
                      isActive('/about')
                        ? 'bg-slate-50 text-accent'
                        : 'text-slate-700 hover:bg-slate-50/80 hover:text-accent'
                    }`}
                  >
                    {t('about')}
                  </Link>
                  <Link
                    href="/references"
                    onClick={closeMenu}
                    className={`px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all ${
                      isActive('/references')
                        ? 'bg-slate-50 text-accent'
                        : 'text-slate-700 hover:bg-slate-50/80 hover:text-accent'
                    }`}
                  >
                    {t('references')}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className={`px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all ${
                      isActive('/contact')
                        ? 'bg-slate-50 text-accent'
                        : 'text-slate-700 hover:bg-slate-50/80 hover:text-accent'
                    }`}
                  >
                    {t('contact')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Dropdown Menu Trigger for Solutions */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                className={`flex items-center gap-1 text-[16px] md:text-[17px] font-bold tracking-wide py-2 transition-colors cursor-pointer ${
                  isServicesActive() || activeDropdown === 'solutions'
                    ? 'text-accent'
                    : 'text-slate-600 hover:text-primary'
                }`}
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>{t('services_nav')}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-[calc(100%-0.25rem)] left-1/2 -translate-x-1/2 w-[1040px] bg-white border border-slate-200 shadow-xl rounded-2xl p-6 transition-all duration-300 origin-top z-[1001] ${
                  activeDropdown === 'solutions'
                    ? 'opacity-100 visible translate-y-2 scale-100'
                    : 'opacity-0 invisible translate-y-0 scale-98 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-12 gap-6 text-left">
                  {/* Category 1: Enterprise Systems */}
                  <div className="col-span-3 flex flex-col border-r border-slate-100 pr-4">
                    <h4 className="font-extrabold text-primary text-xs uppercase tracking-wider mb-4">
                      {t(SERVICES_CONTENT.enterprise.t_title)}
                    </h4>
                    <p className="text-[12px] text-slate-500 mb-5 leading-relaxed font-light">
                      {t(SERVICES_CONTENT.enterprise.t_desc)}
                    </p>
                    <ul className="space-y-4">
                      {SERVICES_CONTENT.enterprise.items.map((item) => (
                        <li key={item.t_label}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-start gap-3 text-[15px] font-bold text-slate-600 hover:text-accent transition-colors group/item"
                          >
                            <span className="p-1.5 rounded-lg bg-slate-50 text-slate-500 group-hover/item:bg-accent-light group-hover/item:text-accent transition-colors">
                              {getIconComponent(item.icon)}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 group-hover/item:text-accent">
                                {t(item.t_label)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category 2: Custom Development */}
                  <div className="col-span-3 flex flex-col border-r border-slate-100 pr-4">
                    <h4 className="font-extrabold text-primary text-xs uppercase tracking-wider mb-4">
                      {t(SERVICES_CONTENT.custom.t_title)}
                    </h4>
                    <p className="text-[12px] text-slate-500 mb-5 leading-relaxed font-light">
                      {t(SERVICES_CONTENT.custom.t_desc)}
                    </p>
                    <ul className="space-y-4">
                      {SERVICES_CONTENT.custom.items.map((item) => (
                        <li key={item.t_label}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-start gap-3 text-[15px] font-bold text-slate-600 hover:text-accent transition-colors group/item"
                          >
                            <span className="p-1.5 rounded-lg bg-slate-50 text-slate-500 group-hover/item:bg-accent-light group-hover/item:text-accent transition-colors">
                              {getIconComponent(item.icon)}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 group-hover/item:text-accent">
                                {t(item.t_label)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Category 3: Industrial Manufacturing */}
                  <div className="col-span-3 flex flex-col border-r border-slate-100 pr-4">
                    <h4 className="font-extrabold text-primary text-xs uppercase tracking-wider mb-4">
                      {t(SERVICES_CONTENT.manufacturing.t_title)}
                    </h4>
                    <p className="text-[12px] text-slate-500 mb-5 leading-relaxed font-light">
                      {t(SERVICES_CONTENT.manufacturing.t_desc)}
                    </p>
                    <ul className="space-y-4">
                      {SERVICES_CONTENT.manufacturing.items.map((item) => (
                        <li key={item.t_label}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="flex items-start gap-3 text-[15px] font-bold text-slate-600 hover:text-accent transition-colors group/item"
                          >
                            <span className="p-1.5 rounded-lg bg-slate-50 text-slate-500 group-hover/item:bg-accent-light group-hover/item:text-accent transition-colors">
                              {getIconComponent(item.icon)}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 group-hover/item:text-accent">
                                {t(item.t_label)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sidebar Widget Featured */}
                  <div className="col-span-3">
                    <div className="h-full bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-accent text-white uppercase mb-3">
                          {t(SERVICES_CONTENT.featured.t_tag)}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm md:text-base mb-2">
                          {t(SERVICES_CONTENT.featured.t_title)}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-light">
                          {t(SERVICES_CONTENT.featured.t_desc)}
                        </p>
                      </div>
                      <Link
                        href={SERVICES_CONTENT.featured.href}
                        onClick={closeMenu}
                        className="mt-6 flex items-center gap-1 text-xs font-semibold text-accent hover:gap-2 transition-all"
                      >
                        <span>{t('btn_details')}</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className={`text-[16px] md:text-[17px] font-bold tracking-wide transition-colors relative py-2 ${
                isActive('/blog')
                  ? 'text-accent'
                  : 'text-slate-600 hover:text-primary'
              }`}
            >
              {t('blog')}
              {isActive('/blog') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          </div>

          {/* Right Action Menu: Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href={pathname}
              locale={locale === 'tr' ? 'en' : 'tr'}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-primary transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"
            >
              <Globe size={14} />
              <span>{locale === 'tr' ? 'ENGLISH' : 'TÜRKÇE'}</span>
            </Link>
            <Link
              href="/contact"
              className="bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg shadow-primary/10"
            >
              {t('btn_quote')}
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            className="lg:hidden p-2 text-primary hover:bg-slate-100 rounded-xl transition-colors relative z-[1001]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Spacer to prevent layout shift when Main Navigation Bar is fixed */}
      {scrolled && (
        <div className="h-[73px] lg:h-[89px] pointer-events-none" />
      )}

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-[999] transition-all duration-300 flex flex-col ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-6 overflow-y-auto bg-white">
          <div className="space-y-6 flex-1">
            {/* Anasayfa */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`block text-2xl font-bold ${
                isActive('/') ? 'text-accent' : 'text-slate-800'
              }`}
            >
              {t('home')}
            </Link>

            {/* Kurumsal Accordion (Collapsible) */}
            <div className="space-y-3">
              <button
                onClick={() => setMobileCorporateOpen(!mobileCorporateOpen)}
                className="flex items-center justify-between w-full text-2xl font-bold text-slate-800 cursor-pointer text-left"
              >
                <span>{t('corporate')}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${
                    mobileCorporateOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`pl-4 space-y-4 pt-1 border-l-2 border-slate-100 transition-all duration-300 overflow-hidden ${
                  mobileCorporateOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className={`block text-lg font-bold ${
                    isActive('/about') ? 'text-accent' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {t('about')}
                </Link>
                <Link
                  href="/references"
                  onClick={closeMenu}
                  className={`block text-lg font-bold ${
                    isActive('/references') ? 'text-accent' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {t('references')}
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`block text-lg font-bold ${
                    isActive('/contact') ? 'text-accent' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {t('contact')}
                </Link>
              </div>
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              onClick={closeMenu}
              className={`block text-2xl font-bold ${
                isActive('/blog') ? 'text-accent' : 'text-slate-800'
              }`}
            >
              {t('blog')}
            </Link>

            {/* Mobile Dropdown Category - Enterprise Solutions */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                {t(SERVICES_CONTENT.enterprise.t_title)}
              </h4>
              <div className="grid grid-cols-1 gap-4 pl-1">
                {SERVICES_CONTENT.enterprise.items.map((item) => (
                  <Link
                    key={item.t_label}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 text-base font-semibold text-slate-700 hover:text-accent transition-colors"
                  >
                    <span className="p-1 rounded bg-slate-50 text-slate-500">
                      {getIconComponent(item.icon)}
                    </span>
                    <span>{t(item.t_label)}</span>
                  </Link>
                ))}
              </div>
            </div>

             {/* Mobile Dropdown Category - Custom Development */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                {t(SERVICES_CONTENT.custom.t_title)}
              </h4>
              <div className="grid grid-cols-1 gap-4 pl-1">
                {SERVICES_CONTENT.custom.items.map((item) => (
                  <Link
                    key={item.t_label}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 text-base font-semibold text-slate-700 hover:text-accent transition-colors"
                  >
                    <span className="p-1 rounded bg-slate-50 text-slate-500">
                      {getIconComponent(item.icon)}
                    </span>
                    <span>{t(item.t_label)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Dropdown Category - Industrial Manufacturing */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                {t(SERVICES_CONTENT.manufacturing.t_title)}
              </h4>
              <div className="grid grid-cols-1 gap-4 pl-1">
                {SERVICES_CONTENT.manufacturing.items.map((item) => (
                  <Link
                    key={item.t_label}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 text-base font-semibold text-slate-700 hover:text-accent transition-colors"
                  >
                    <span className="p-1 rounded bg-slate-50 text-slate-500">
                      {getIconComponent(item.icon)}
                    </span>
                    <span>{t(item.t_label)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Footer (Language & Close) */}
          <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
            <Link
              href={pathname}
              locale={locale === 'tr' ? 'en' : 'tr'}
              onClick={closeMenu}
              className="flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe size={18} />
                <span>{locale === 'tr' ? 'English (EN)' : 'Türkçe (TR)'}</span>
              </div>
              <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded uppercase">
                {locale === 'tr' ? 'en' : 'tr'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
