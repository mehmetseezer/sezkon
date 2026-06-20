'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Layers, Database, Cpu, Smartphone, GitMerge, ArrowRight, ShieldCheck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesGrid = () => {
  const t = useTranslations('Home');
  const navT = useTranslations('Navigation');

  const services = [
    {
      key: 'erp',
      titleKey: 'erp_title',
      descKey: 'erp_desc',
      icon: Layers,
      href: '/services/software',
      gridClass: 'col-span-1 md:col-span-6 lg:col-span-4',
      features: ['erp_feat_1', 'erp_feat_2', 'erp_feat_3'],
      categoryKey: 'category_software'
    },
    {
      key: 'crm',
      titleKey: 'crm_title',
      descKey: 'crm_desc',
      icon: Database,
      href: '/services/software',
      gridClass: 'col-span-1 md:col-span-6 lg:col-span-4',
      features: ['crm_feat_1', 'crm_feat_2', 'crm_feat_3'],
      categoryKey: 'category_software'
    },
    {
      key: 'custom',
      titleKey: 'custom_title',
      descKey: 'custom_desc',
      icon: Cpu,
      href: '/services/software',
      gridClass: 'col-span-1 md:col-span-6 lg:col-span-4',
      features: ['custom_feat_1', 'custom_feat_2', 'custom_feat_3'],
      categoryKey: 'category_software'
    },
    {
      key: 'app',
      titleKey: 'app_title',
      descKey: 'app_desc',
      icon: Smartphone,
      href: '/services/mobile-app',
      gridClass: 'col-span-1 md:col-span-6 lg:col-span-4',
      features: ['app_feat_1', 'app_feat_2', 'app_feat_3'],
      categoryKey: 'category_software'
    },
    {
      key: 'integration',
      titleKey: 'integration_title',
      descKey: 'integration_desc',
      icon: GitMerge,
      href: '/services/industry40',
      gridClass: 'col-span-1 md:col-span-6 lg:col-span-4',
      features: ['integration_feat_1', 'integration_feat_2', 'integration_feat_3'],
      categoryKey: 'category_software'
    },
    {
      key: 'cnc',
      titleKey: 'cnc_title',
      descKey: 'cnc_desc',
      icon: Settings,
      href: '/services/cnc',
      gridClass: 'col-span-1 md:col-span-6 lg:col-span-4',
      features: ['cnc_feat_1', 'cnc_feat_2', 'cnc_feat_3'],
      categoryKey: 'category_manufacturing'
    }
  ];

  return (
    <section id="services" className="w-full py-24 bg-slate-50 relative border-b border-slate-200">
      <div className="container mx-auto px-6 max-w-[1550px] relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>{navT('services_nav')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            {t('services_title')}
          </h2>
          <p className="text-slate-500 font-normal text-base md:text-lg">
            {t('services_subtitle')}
          </p>
        </div>

        {/* Services Responsive Adaptive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${service.gridClass} bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-accent-light group-hover:text-accent transition-all duration-300">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                      {t(service.categoryKey)}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-light">
                    {t(service.descKey)}
                  </p>

                  {/* Bullet Points features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                        <span>{t(feat)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <Link
                  href={service.href}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 text-xs font-bold text-primary hover:text-accent transition-colors"
                >
                  <span>{navT('btn_details')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;
