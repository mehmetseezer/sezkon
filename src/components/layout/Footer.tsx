'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#fafafc] text-[#1d1d1f] font-sans border-t border-neutral-100">
      <div className="mx-auto max-w-[1024px] px-6 py-12 lg:py-16">
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          
          {/* Brand & Concept */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
              SEZKON<span className="text-indigo-500">.</span>
            </Link>
            <p className="text-[13px] leading-relaxed text-[#6e6e73] font-medium">
              Üretim ve yazılım dünyasında "İki Uzmanlık, Tek Standart" anlayışıyla geleceği şekillendiriyoruz.
            </p>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wide">Navigasyon</h4>
            <ul className="space-y-3">
              {['Anasayfa', 'Kurumsal', 'Referanslar', 'Blog', 'İletişim'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-[13px] text-[#6e6e73] hover:text-indigo-500 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wide">Hizmetler</h4>
            <ul className="space-y-3">
              {['Yazılım Çözümleri', 'CNC Torna & İşleme', 'Endüstri 4.0', 'ERP Sistemleri'].map((service) => (
                <li key={service}>
                  <Link 
                    href="#" 
                    className="text-[13px] text-[#6e6e73] hover:text-indigo-500 transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold text-[#1d1d1f] uppercase tracking-wide">İletişim</h4>
            <div className="space-y-3">
              <p className="text-[13px] text-[#6e6e73] leading-snug">
                Kartal, İstanbul / Türkiye
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:+905522403705" 
                  className="text-[13px] font-medium text-indigo-500 hover:opacity-80 transition-opacity"
                >
                  +90 (552) 240 37 05
                </a>
                <a 
                  href="mailto:official@sezkon.com" 
                  className="text-[13px] text-[#6e6e73] hover:text-indigo-500 transition-colors"
                >
                  official@sezkon.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Apple-Style Bottom Bar */}
        <div className="border-t border-neutral-200 pt-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#6e6e73]">
              <span>Copyright © {year} SEZKON LTD. Tüm hakları saklıdır.</span>
              <div className="hidden md:block h-3 w-[1px] bg-neutral-300" />
              <Link href="#" className="hover:text-indigo-500 transition-colors">Gizlilik Politikası</Link>
              <div className="hidden md:block h-3 w-[1px] bg-neutral-300" />
              <Link href="#" className="hover:text-indigo-500 transition-colors">Çerez Kullanımı</Link>
              <div className="hidden md:block h-3 w-[1px] bg-neutral-300" />
              <Link href="#" className="hover:text-indigo-500 transition-colors">Kullanım Şartları</Link>
            </div>
            
            <div className="text-[12px] font-medium text-[#6e6e73] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Türkiye
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;