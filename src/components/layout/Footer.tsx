'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { SERVICES_CONTENT } from '@/constants/navigation';

const Footer = () => {
  const year = new Date().getFullYear();
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');

  // Collect all software service items
  const allServices = [
    ...SERVICES_CONTENT.enterprise.items,
    ...SERVICES_CONTENT.custom.items,
  ];

  return (
    <footer className="bg-slate-50 text-slate-800 font-sans border-t border-slate-200 pb-28 lg:pb-0">
      <div className="mx-auto max-w-[1550px] px-6 py-16">
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand & Concept */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-black tracking-[0.08em] text-primary flex items-center gap-1 group"
            >
              <span className="group-hover:text-accent transition-colors duration-300">SEZKON</span>
              <span className="w-2 h-2 rounded-full bg-accent inline-block group-hover:scale-125 transition-transform duration-300"></span>
            </Link>
            <p className="text-sm md:text-base leading-relaxed text-slate-500 font-normal">
              {t('desc')}
            </p>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">{t('nav')}</h4>
            <ul className="space-y-2">
              {[
                { name: t('nav_home'), href: '/' },
                { name: t('nav_corp'), href: '/about' },
                { name: t('nav_ref'), href: '/references' },
                { name: t('nav_blog'), href: '/blog' },
                { name: t('nav_contact'), href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 hover:text-accent font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Software Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">{t('services')}</h4>
            <ul className="space-y-2">
              {allServices.map((service) => (
                <li key={service.t_label}>
                  <Link
                    href={service.href}
                    className="text-sm text-slate-600 hover:text-accent font-medium transition-colors"
                  >
                    {navT(service.t_label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">{t('contact')}</h4>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {t('address')}
              </p>
              <div className="flex flex-col gap-1.5">
                <a
                  href="tel:+905522403705"
                  className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  +90 (552) 240 37 05
                </a>
                <a
                  href="tel:+905343913934"
                  className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  +90 (534) 391 39 34
                </a>
                <a
                  href="mailto:info@sezkon.com"
                  className="text-sm text-slate-600 hover:text-accent transition-colors"
                >
                  info@sezkon.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{t('copyright', { year })}</span>
            <div className="hidden md:block h-3 w-[1px] bg-slate-300" />
            <Link href="/privacy" className="hover:text-accent transition-colors">{t('privacy')}</Link>
            <div className="hidden md:block h-3 w-[1px] bg-slate-300" />
            <Link href="/cookies" className="hover:text-accent transition-colors">{t('cookies')}</Link>
            <div className="hidden md:block h-3 w-[1px] bg-slate-300" />
            <Link href="/terms" className="hover:text-accent transition-colors">{t('terms')}</Link>
          </div>

          <div className="font-semibold text-slate-600 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            {t('country')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;