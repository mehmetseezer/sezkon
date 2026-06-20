'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

const CTASection = () => {
  const t = useTranslations('Home');

  return (
    <section className="w-full py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-3xl p-10 lg:p-20 relative overflow-hidden shadow-2xl border border-primary/10"
        >
          {/* Subtle gradient overlays inside the card */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-100 text-xs font-semibold uppercase tracking-wider border border-white/10">
                <ShieldCheck size={14} className="text-accent" />
                <span>{t('cta_note')}</span>
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {t('cta_title')}
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl font-normal">
                {t('cta_desc')}
              </p>
            </div>

            {/* Right Action Button Group */}
            <div className="lg:col-span-4 flex flex-col gap-4 items-stretch lg:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl shadow-accent/20 text-center"
              >
                <span>{t('cta_btn')}</span>
                <ArrowRight size={18} />
              </Link>
              
              {/* Secondary links (WhatsApp & Mail) */}
              <div className="flex flex-col gap-2.5 w-full max-w-xs self-center lg:self-end">
                <a
                  href="https://wa.me/905522403705"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white transition-colors"
                >
                  <MessageSquare size={14} className="text-emerald-400" />
                  <span>WhatsApp Destek Hattı</span>
                </a>
                <a
                  href="mailto:info@sezkon.com"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  <span>info@sezkon.com</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
