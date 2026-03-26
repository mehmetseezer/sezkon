'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Code,
  Scissors,
  Globe
} from 'lucide-react';

import { NAV_LINKS, SERVICES_CONTENT } from '@/constants/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const isActive = (path: string) => pathname === path;
  const isServicesActive = () => pathname.startsWith('/services');

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setActiveSubmenu('services');
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-white border-b border-neutral-200/60 shadow-sm py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-[26px] font-bold tracking-[-0.04em] text-neutral-900 flex items-baseline relative group"
        >
          SEZKON
          <span className="text-[#4f46e5] w-2 h-2 rounded-full bg-[#4f46e5] ml-0.5 shadow-[0_0_8px_rgba(79,70,229,0.4)]"></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const keyMap: Record<string, string> = {
              '/': 'home',
              '/about': 'about',
              '/references': 'references',
              '/blog': 'blog',
              '/contact': 'contact'
            };
            const translatedName = keyMap[link.href] ? t(keyMap[link.href]) : link.name;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium tracking-wide transition-all duration-300 relative group py-2 ${
                  isActive(link.href) ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {translatedName}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                    isActive(link.href) ? 'w-full bg-neutral-900' : 'w-0 bg-neutral-200 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}

          {/* Hizmetler Trigger */}
          <div
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              className={`flex items-center gap-1.5 text-[14px] font-medium tracking-wide py-2 relative group transition-all duration-300 ${
                isServicesActive() || activeSubmenu === 'services'
                  ? 'text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t('services_nav')}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  activeSubmenu === 'services' ? '-rotate-180 text-neutral-900' : ''
                }`}
              />
              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
                  isServicesActive() ? 'w-full bg-neutral-900' : 'w-0 bg-neutral-200 group-hover:w-full'
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-[900px] bg-white border border-neutral-200 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-3xl p-8 transition-all duration-400 ease-out origin-top ${
                activeSubmenu === 'services'
                  ? 'opacity-100 visible translate-y-0 scale-100'
                  : 'opacity-0 invisible -translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <div className="grid grid-cols-12 gap-8">
                {/* Yazılım Çözümleri */}
                <div className="col-span-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-800">
                      <Code size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-sm tracking-tight">
                        {t('soft_title')}
                      </h4>
                      <p className="text-[12px] text-neutral-500 mt-0.5">{t('soft_desc')}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {SERVICES_CONTENT.software.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-3 group/item"
                        >
                          <span className="w-1 h-1 rounded-full bg-neutral-300 group-hover/item:bg-[#4f46e5] transition-all" />
                          {t((item as any).t_label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CNC & Lazer Kesim */}
                <div className="col-span-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-800">
                      <Scissors size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-sm tracking-tight">
                        {t('cnc_title')}
                      </h4>
                      <p className="text-[12px] text-neutral-500 mt-0.5">{t('cnc_desc')}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {SERVICES_CONTENT.cnc.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-3 group/item"
                        >
                          <span className="w-1 h-1 rounded-full bg-neutral-300 group-hover/item:bg-[#4f46e5] transition-all" />
                          {t((item as any).t_label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Öne Çıkan */}
                <div className="col-span-4">
                  <div className="h-full bg-neutral-50 border border-neutral-200/60 rounded-2xl p-6 flex flex-col justify-between group/card transition-colors hover:bg-neutral-100/50">
                    <div>
                      <span className="text-[10px] font-bold tracking-widest bg-white border border-neutral-200 px-2.5 py-1 rounded-full uppercase mb-4 inline-block text-neutral-500">
                        {t('feat_tag')}
                      </span>
                      <h4 className="font-semibold text-lg mb-2 text-neutral-900">
                        {t('feat_title')}
                      </h4>
                      <p className="text-[13px] text-neutral-500 leading-relaxed font-light">
                        {t('feat_desc')}
                      </p>
                    </div>
                    <Link
                      href={SERVICES_CONTENT.featured.href}
                      onClick={closeMenu}
                      className="mt-6 flex items-center gap-2 text-[13px] font-semibold text-neutral-900 hover:gap-3 transition-all"
                    >
                      {t('btn_details')} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA & Mobile Button */}
        <div className="flex items-center gap-5">
          <Link
            href={pathname}
            locale={locale === 'tr' ? 'en' : 'tr'}
            className="hidden lg:flex items-center justify-center font-bold text-neutral-500 hover:text-neutral-900 transition-all text-[14px]"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </Link>
          <Link
            href="/contact"
            className="hidden lg:flex items-center justify-center bg-neutral-900 text-white px-6 py-2.5 rounded-full text-[13px] font-medium hover:bg-neutral-800 transition-all active:scale-95 shadow-lg shadow-neutral-200/50"
          >
            {t('btn_quote')}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-neutral-800 relative z-[1001]"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white transition-all duration-500 ease-in-out z-[999] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-12 overflow-y-auto">
          <div className="space-y-6">
            {NAV_LINKS.map((link) => {
              const keyMap: Record<string, string> = {
                '/': 'home',
                '/about': 'about',
                '/references': 'references',
                '/blog': 'blog',
                '/contact': 'contact'
              };
              const translatedName = keyMap[link.href] ? t(keyMap[link.href]) : link.name;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block text-3xl font-bold tracking-tight ${
                    isActive(link.href) ? 'text-neutral-900' : 'text-neutral-400'
                  }`}
                >
                  {translatedName}
                </Link>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => setActiveSubmenu(activeSubmenu === 'services' ? null : 'services')}
                className={`flex items-center justify-between w-full text-3xl font-bold tracking-tight transition-colors ${
                  isServicesActive() || activeSubmenu === 'services'
                    ? 'text-neutral-900'
                    : 'text-neutral-400'
                }`}
              >
                {t('services_nav')}
                <ChevronDown
                  size={28}
                  className={`transition-transform ${
                    activeSubmenu === 'services' ? '-rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeSubmenu === 'services'
                    ? 'max-h-[500px] mt-6 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-6 pl-4 border-l-2 border-neutral-100">
                  {/* Yazılım Çözümleri */}
                  <div>
                    <h4 className="text-base font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <Code size={18} className="text-neutral-500" />
                      {t('soft_title')}
                    </h4>
                    <div className="space-y-3">
                      {SERVICES_CONTENT.software.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="block text-lg font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          {t((item as any).t_label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* CNC & Lazer Kesim */}
                  <div>
                    <h4 className="text-base font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <Scissors size={18} className="text-neutral-500" />
                      {t('cnc_title')}
                    </h4>
                    <div className="space-y-3">
                      {SERVICES_CONTENT.cnc.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="block text-lg font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          {t((item as any).t_label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Öne Çıkan */}
                  <div>
                    <h4 className="text-base font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                      <ArrowRight size={18} className="text-neutral-500" />
                      {t('feat_title')}
                    </h4>
                    <Link
                      href={SERVICES_CONTENT.featured.href}
                      onClick={closeMenu}
                      className="block text-lg font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {t('feat_desc')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Language Switcher for Mobile */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <Link
              href={pathname}
              locale={locale === 'tr' ? 'en' : 'tr'}
              onClick={closeMenu}
              className="flex items-center justify-between w-full py-3 px-4 bg-neutral-50 rounded-xl text-neutral-800 font-medium hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-neutral-500" />
                <span>{locale === 'tr' ? 'English' : 'Türkçe'}</span>
              </div>
              <span className="text-sm text-neutral-400">
                {locale === 'tr' ? 'EN' : 'TR'}
              </span>
            </Link>
          </div>

          <div className="mt-auto pt-8">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block w-full text-center bg-neutral-900 text-white py-5 rounded-2xl font-semibold text-lg shadow-xl shadow-neutral-200"
            >
              {t('btn_quote')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;