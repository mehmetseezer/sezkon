'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Factory,
  ShoppingCart,
  Truck,
  HeartPulse,
  Building2,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
} from 'lucide-react';

export default function HomeClient() {
  const t = useTranslations('Home');

  const industries = [
    { key: 'production', labelKey: 'ind_production', icon: Factory },
    { key: 'ecommerce', labelKey: 'ind_ecommerce', icon: ShoppingCart },
    { key: 'logistics', labelKey: 'ind_logistics', icon: Truck },
    { key: 'healthcare', labelKey: 'ind_healthcare', icon: HeartPulse },
    { key: 'construction', labelKey: 'ind_construction', icon: Building2 },
    { key: 'services', labelKey: 'ind_services', icon: Briefcase },
  ];

  return (
    <>
      {/* Company Introduction & Trust Section */}
      <section className="w-full py-24 bg-white border-b border-slate-100 relative">
        <div className="container mx-auto px-6 max-w-[1550px] relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text intro & Trust statement */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                <Award size={14} />
                <span>{t('trust_title')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
                {t('trust_title')}
              </h2>
              <p className="text-slate-500 font-normal leading-relaxed">
                {t('trust_subtitle')}
              </p>
              <div className="space-y-3 pt-4">
                {[
                  'ISO 9001:2015 Bilgi Güvenliği & Kalite Standartları',
                  'Uçtan Uca Şifrelenmiş Cloud & On-Premise Kurulumlar',
                  '7/24 SLA Teknik Destek Hattı ve Anında Müdahale',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm md:text-base font-semibold text-slate-700"
                  >
                    <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              {[
                { label: 'stat_experience_l', val: 'stat_experience_v', color: 'border-blue-200 bg-blue-50/20' },
                { label: 'stat_clients_l', val: 'stat_clients_v', color: 'border-slate-200 bg-slate-50/50' },
                { label: 'stat_projects_l', val: 'stat_projects_v', color: 'border-indigo-200 bg-indigo-50/20' },
                { label: 'stat_sla_l', val: 'stat_sla_v', color: 'border-emerald-200 bg-emerald-50/20' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`border rounded-2xl p-6 flex flex-col justify-between ${stat.color}`}
                >
                  <span className="text-3xl lg:text-4xl font-black text-primary block">
                    {t(stat.val)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase mt-4 block">
                    {t(stat.label)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="w-full py-24 bg-slate-50 border-b border-slate-200 relative">
        <div className="container mx-auto px-6 max-w-[1550px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
              <TrendingUp size={14} />
              <span>{t('industries_title')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              {t('industries_title')}
            </h2>
            <p className="text-slate-500 font-normal text-base md:text-lg">
              {t('industries_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((ind, index) => {
              const IconComp = ind.icon;
              return (
                <motion.div
                  key={ind.key}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-accent-light group-hover:text-accent transition-colors">
                    <IconComp size={24} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors leading-tight">
                    {t(ind.labelKey)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
