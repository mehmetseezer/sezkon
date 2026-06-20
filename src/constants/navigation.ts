// src/constants/navigation.ts
import { Layers, Database, ShieldAlert, Cpu, Laptop, Smartphone, GitMerge, Settings, Scissors, Wrench } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Kurumsal', href: '/about' },
  { name: 'Referanslar', href: '/references' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/contact' },
];

export const SERVICES_CONTENT = {
  enterprise: {
    t_title: 'nav_enterprise_systems', // ERP, CRM, Integrations
    t_desc: 'nav_enterprise_desc',
    items: [
      { t_label: 'nav_erp', href: '/services/software', icon: Layers },
      { t_label: 'nav_crm', href: '/services/software', icon: Database },
      { t_label: 'nav_integrations', href: '/services/industry40', icon: GitMerge },
    ],
  },
  custom: {
    t_title: 'nav_custom_dev', // Custom software, Web, Mobile
    t_desc: 'nav_custom_desc',
    items: [
      { t_label: 'nav_custom_soft', href: '/services/software', icon: Cpu },
      { t_label: 'nav_mobile_apps', href: '/services/mobile-app', icon: Smartphone },
      { t_label: 'nav_web_solutions', href: '/services/web-design', icon: Laptop },
    ],
  },
  manufacturing: {
    t_title: 'nav_manufacturing', // CNC, Laser, Bending
    t_desc: 'nav_manufacturing_desc',
    items: [
      { t_label: 'nav_cnc', href: '/services/cnc', icon: Settings },
      { t_label: 'nav_laser_cutting', href: '/services/sheet-cutting', icon: Scissors },
      { t_label: 'nav_bending', href: '/services/bending', icon: Wrench },
    ],
  },
  featured: {
    t_title: 'nav_feat_title',
    t_desc: 'nav_feat_desc',
    t_tag: 'nav_feat_tag',
    href: '/services/software',
  },
};