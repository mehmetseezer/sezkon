'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Phone, MessageSquare, Send } from 'lucide-react';

const MobileStickyCTA = () => {
  const t = useTranslations('Navigation');

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[990] px-4 pb-4 pt-2 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] flex items-center gap-3">
      {/* Telefon Arama Butonu */}
      <a
        href="tel:+905522403705"
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
        aria-label="Telefon Et"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp Hızlı İletişim */}
      <a
        href="https://wa.me/905522403705"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors border border-emerald-200"
        aria-label="WhatsApp ile Mesaj Gönder"
      >
        <MessageSquare size={20} />
      </a>

      {/* Teklif Al CTA Butonu */}
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-accent text-white font-semibold text-sm md:text-base hover:bg-accent-hover active:scale-[0.98] transition-all shadow-md shadow-accent/20"
      >
        <Send size={16} />
        {t('btn_quote')}
      </Link>
    </div>
  );
};

export default MobileStickyCTA;
