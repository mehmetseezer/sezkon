'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  ShoppingCart,
  Settings,
  Users,
  BarChart3,
  Boxes,
  Cpu,
  GitMerge,
  Zap,
  Activity,
  Package,
  AlertTriangle,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Slide {
  key: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  icon: React.ComponentType<{ size: number }>;
  href: string;
  badgeKey: string;
}

const Hero = () => {
  const t = useTranslations('Home');
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: Slide[] = [
    {
      key: 'ecommerce',
      titleKey: 'hero_ecommerce_title',
      descKey: 'hero_ecommerce_desc',
      tagKey: 'hero_ecommerce_tag',
      icon: ShoppingCart,
      href: '/services/ecommerce',
      badgeKey: 'hero_ecommerce_badge'
    },
    {
      key: 'cnc',
      titleKey: 'hero_cnc_title',
      descKey: 'hero_cnc_desc',
      tagKey: 'hero_cnc_tag',
      icon: Settings,
      href: '/services/cnc',
      badgeKey: 'hero_cnc_badge'
    },
    {
      key: 'crm',
      titleKey: 'hero_crm_title',
      descKey: 'hero_crm_desc',
      tagKey: 'hero_crm_tag',
      icon: Users,
      href: '/services/software',
      badgeKey: 'hero_crm_badge'
    },
    {
      key: 'erp',
      titleKey: 'hero_erp_title',
      descKey: 'hero_erp_desc',
      tagKey: 'hero_erp_tag',
      icon: BarChart3,
      href: '/services/software',
      badgeKey: 'hero_erp_badge'
    },
    {
      key: 'stock',
      titleKey: 'hero_stock_title',
      descKey: 'hero_stock_desc',
      tagKey: 'hero_stock_tag',
      icon: Boxes,
      href: '/services/software',
      badgeKey: 'hero_stock_badge'
    },
    {
      key: 'industry',
      titleKey: 'hero_industry_title',
      descKey: 'hero_industry_desc',
      tagKey: 'hero_industry_tag',
      icon: Cpu,
      href: '/services/industry40',
      badgeKey: 'hero_industry_badge'
    }
  ];

  const slideDuration = 6000; // 6 seconds per slide
  const step = 100; // interval in ms
  const percentPerStep = (step / slideDuration) * 100;

  // Handle Autoplay Timer
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((current) => (current + 1) % slides.length);
          return 0;
        }
        return prev + percentPerStep;
      });
    }, step);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, current, percentPerStep]);

  const handleTabClick = (idx: number) => {
    setCurrent(idx);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  // Render Visual Mockups depending on Active Slide
  const renderDashboardMockup = (index: number) => {
    switch (index) {
      case 0: // E-Commerce
        return (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-emerald-100 rounded-lg text-emerald-600">
                <ShoppingCart size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_ecommerce_orders_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_ecommerce_orders_val')}</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg text-blue-600">
                <Activity size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_ecommerce_conv_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_ecommerce_conv_val')}</span>
              </div>
            </div>
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-700">{t('dash_ecommerce_chart_title')}</span>
                <span className="text-[9px] sm:text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded">{t('dash_ecommerce_chart_stat')}</span>
              </div>
              <div className="h-20 sm:h-24 flex items-end gap-1 sm:gap-1.5 pt-2">
                {[60, 40, 75, 55, 90, 80, 100, 85, 110, 95, 120, 130].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${(h / 130) * 100}%` }}
                      className={`w-full rounded-t-sm transition-all duration-500 ${
                        i === 11 ? 'bg-emerald-500' : 'bg-emerald-500/30'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-slate-200 rounded-xl p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                <span>{t('dash_ecommerce_log_title')}</span>
                <span className="text-[8px] sm:text-[9px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Live Payments</span>
              </div>
              <div className="text-emerald-400">{t('dash_ecommerce_log_1')}</div>
              <div className="text-emerald-400">{t('dash_ecommerce_log_2')}</div>
              <div className="text-blue-400">{t('dash_ecommerce_log_3')}</div>
            </div>
          </div>
        );
      case 1: // CNC Cutting
        return (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-orange-100 rounded-lg text-orange-600 animate-spin" style={{ animationDuration: '6s' }}>
                <Settings size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_cnc_power_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_cnc_power_display')}</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-yellow-100 rounded-lg text-yellow-600">
                <Zap size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_cnc_speed_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_cnc_speed_val')}</span>
              </div>
            </div>
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 block">{t('dash_cnc_chart_title')}</span>
                <p className="text-[10px] sm:text-[11px] text-slate-500 max-w-[220px] leading-relaxed">
                  {t('dash_cnc_chart_desc')}
                </p>
              </div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-200 flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-accent animate-spin" style={{ animationDuration: '4s' }} />
                <span className="absolute w-2 h-2 rounded-full bg-accent animate-ping" />
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-slate-200 rounded-xl p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                <span>{t('dash_cnc_log_title')}</span>
                <span className="text-[8px] sm:text-[9px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">CNC Control</span>
              </div>
              <div className="text-green-400">{t('dash_cnc_log_1')}</div>
              <div className="text-green-400">{t('dash_cnc_log_2')}</div>
              <div className="text-yellow-400">{t('dash_cnc_log_3')}</div>
            </div>
          </div>
        );
      case 2: // CRM
        return (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg text-blue-600">
                <Users size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_crm_opp_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_crm_opp_val')}</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-indigo-100 rounded-lg text-indigo-600">
                <Award size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_crm_win_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">%87.4</span>
              </div>
            </div>
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 space-y-3">
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 block">{t('dash_crm_chart_title')}</span>
              <div className="space-y-1.5 pt-1">
                <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600">
                  <span>{t('dash_crm_funnel_1')}</span>
                  <span className="font-bold">{t('dash_crm_funnel_1_val')}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '100%' }} />
                </div>
                <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600 mt-1">
                  <span>{t('dash_crm_funnel_2')}</span>
                  <span className="font-bold">{t('dash_crm_funnel_2_val')}</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-slate-200 rounded-xl p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                <span>{t('dash_crm_log_title')}</span>
                <span className="text-[8px] sm:text-[9px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Sync Active</span>
              </div>
              <div className="text-green-400">{t('dash_crm_log_1')}</div>
              <div className="text-green-400">{t('dash_crm_log_2')}</div>
              <div className="text-blue-400">{t('dash_crm_log_3')}</div>
            </div>
          </div>
        );
      case 3: // ERP
        return (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg text-blue-600">
                <BarChart3 size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_erp_sales_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_erp_sales_val')}</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-indigo-100 rounded-lg text-indigo-600">
                <Users size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_erp_leads_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">+1,402</span>
              </div>
            </div>
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-700">{t('dash_erp_chart_title')}</span>
                <span className="text-[9px] sm:text-[10px] text-slate-400">{t('dash_erp_chart_subtitle')}</span>
              </div>
              <div className="h-20 sm:h-24 flex items-end gap-1.5 pt-2">
                {[35, 60, 45, 80, 55, 90, 70, 85, 95, 75, 100, 110].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        i % 2 === 0 ? 'bg-accent' : 'bg-primary'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-slate-200 rounded-xl p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] space-y-1">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-2">
                <span>{t('dash_erp_log_title')}</span>
                <span className="text-[8px] sm:text-[9px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Console</span>
              </div>
              <div className="text-green-400">{t('dash_erp_log_1')}</div>
              <div className="text-green-400">{t('dash_erp_log_2')}</div>
              <div className="text-blue-400">{t('dash_erp_log_3')}</div>
            </div>
          </div>
        );
      case 4: // Stock Tracking
        return (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-yellow-100 rounded-lg text-yellow-600">
                <Boxes size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_stock_items_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_stock_items_val')}</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-red-100 rounded-lg text-red-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_stock_alerts_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-red-600">{t('dash_stock_alerts_val')}</span>
              </div>
            </div>
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-slate-700">{t('dash_stock_chart_title')}</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-indigo-600">{t('dash_stock_chart_stat')}</span>
              </div>
              <div className="w-full bg-slate-200 h-3.5 sm:h-4 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: '78.2%' }} />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="bg-slate-100 p-1 sm:p-1.5 rounded text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-slate-600">{t('dash_stock_shelf_a')}</div>
                <div className="bg-slate-100 p-1 sm:p-1.5 rounded text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-slate-600">{t('dash_stock_shelf_b')}</div>
                <div className="bg-slate-100 p-1 sm:p-1.5 rounded text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-slate-600">{t('dash_stock_shelf_c')}</div>
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-slate-200 rounded-xl p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                <span>{t('dash_stock_log_title')}</span>
                <span className="text-[8px] sm:text-[9px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">RFID Live</span>
              </div>
              <div className="text-red-400">{t('dash_stock_log_1')}</div>
              <div className="text-green-400">{t('dash_stock_log_2')}</div>
              <div className="text-blue-400">{t('dash_stock_log_3')}</div>
            </div>
          </div>
        );
      case 5: // Industry 4.0
        return (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-purple-100 rounded-lg text-purple-600 animate-pulse">
                <Cpu size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_iot_oee_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">%94.85</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-blue-100 rounded-lg text-blue-600">
                <GitMerge size={20} />
              </div>
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t('dash_iot_nodes_lbl')}</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-800">{t('dash_iot_nodes_val')}</span>
              </div>
            </div>
            <div className="col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 space-y-2">
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 block">{t('dash_iot_chart_title')}</span>
              <div className="h-16 flex items-center gap-[2px] pt-1">
                {[40, 60, 20, 80, 50, 90, 30, 70, 40, 100, 60, 80, 20, 50, 70, 90, 30, 60, 40, 80].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-center h-full">
                    <div
                      className="w-full bg-purple-600 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1.2s'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-2 bg-slate-900 text-slate-200 rounded-xl p-3 sm:p-4 font-mono text-[9px] sm:text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-1.5">
                <span>{t('dash_iot_log_title')}</span>
                <span className="text-[8px] sm:text-[9px] uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">MES Sync</span>
              </div>
              <div className="text-green-400">{t('dash_iot_log_1')}</div>
              <div className="text-green-400">{t('dash_iot_log_2')}</div>
              <div className="text-blue-400">{t('dash_iot_log_3')}</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const activeSlide = slides[current];

  return (
    <section 
      className="relative w-full bg-white overflow-hidden py-16 lg:py-24 border-b border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1550px] relative z-10">
        
        {/* Carousel Tabs - Top Slider Bar */}
        <div className="hidden lg:flex w-full border-b border-slate-200 mb-16 overflow-x-auto select-none">
          <div className="flex justify-between w-full min-w-[900px]">
            {slides.map((slide, idx) => {
              const TabIcon = slide.icon;
              const isActive = idx === current;
              return (
                <button
                  key={slide.key}
                  onClick={() => handleTabClick(idx)}
                  className={`flex-1 flex flex-col items-center py-4 border-b-2 transition-all relative outline-none ${
                    isActive 
                      ? 'border-accent text-accent font-bold bg-slate-50/50' 
                      : 'border-transparent text-slate-400 hover:text-slate-700 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm md:text-base tracking-wide">
                    <TabIcon size={16} />
                    <span>{t(slide.tagKey)}</span>
                  </div>
                  {/* Progress Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabProgress"
                      className="absolute bottom-[-2px] left-0 h-[2px] bg-accent"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: 'linear' }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle and CTAs with AnimatePresence */}
          <div className="lg:col-span-6 space-y-8 text-left min-h-[320px] lg:min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  <span>{t(activeSlide.badgeKey)}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.1] tracking-tight font-sans">
                  {t(activeSlide.titleKey)}
                </h1>

                <p className="text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  {t(activeSlide.descKey)}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={activeSlide.href}
                  className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-hover px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl shadow-primary/10"
                >
                  <span>{t('hero_cta_primary')}</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold transition-all border border-slate-200"
                >
                  <span>{t('carousel_contact_btn')}</span>
                </Link>
              </div>

              {/* Slider Mobile Navigation Controls */}
              <div className="flex items-center justify-between lg:justify-start gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-600"
                    aria-label="Önceki Slayt"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-slate-600"
                    aria-label="Sonraki Slayt"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
                {/* Mobile indicators */}
                <div className="lg:hidden flex gap-1.5 ml-auto">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === current ? 'w-5 bg-accent' : 'w-1.5 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Enterprise Dashboard Simulator */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 sm:p-6 select-none"
              >
                {/* Top header decoration of the simulated application */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className="text-[10px] text-slate-400 font-bold ml-2 font-mono uppercase tracking-wider">
                      sezkon-cloud-core::{activeSlide.key}
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 tracking-wider">
                    ONLINE
                  </span>
                </div>

                {/* Render the appropriate layout mockup depending on active tab */}
                {renderDashboardMockup(current)}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
