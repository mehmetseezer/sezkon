'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';

const CaseStudies = () => {
  const t = useTranslations('Home');
  const navT = useTranslations('Navigation');

  const cases = [
    {
      id: 1,
      titleKey: 'case_1_title',
      metricKey: 'case_1_metric',
      descKey: 'case_1_desc',
      category: 'ERP & MES',
      bgGradient: 'from-blue-50 to-indigo-50/30'
    },
    {
      id: 2,
      titleKey: 'case_2_title',
      metricKey: 'case_2_metric',
      descKey: 'case_2_desc',
      category: 'LOGISTICS & CLOUD',
      bgGradient: 'from-slate-50 to-blue-50/20'
    },
    {
      id: 3,
      titleKey: 'case_3_title',
      metricKey: 'case_3_metric',
      descKey: 'case_3_desc',
      category: 'B2B E-COMMERCE',
      bgGradient: 'from-indigo-50 to-slate-50/30'
    }
  ];

  return (
    <section className="w-full py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6 max-w-[1550px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
            <TrendingUp size={14} />
            <span>{t('cases_title')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            {t('cases_title')}
          </h2>
          <p className="text-slate-500 font-normal text-base md:text-lg">
            {t('cases_subtitle')}
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between`}
            >
              {/* Card Header & Metric Display */}
              <div className={`p-8 bg-gradient-to-br ${project.bgGradient} border-b border-slate-100 flex flex-col justify-between`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest bg-white border border-accent/20 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <CheckCircle size={16} className="text-accent" />
                </div>
                
                {/* Big Metric Display */}
                <div className="my-6">
                  <span className="block text-4xl lg:text-5xl font-black text-primary group-hover:scale-105 transition-transform duration-300 origin-left">
                    {t(project.metricKey)}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase mt-1 inline-block">
                    Başarı Metriği
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary mb-3 leading-snug">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light mb-6">
                    {t(project.descKey)}
                  </p>
                </div>

                <Link
                  href="/references"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors mt-4 self-start"
                >
                  <span>Proje Detayı</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
