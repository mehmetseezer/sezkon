// src/constants/navigation.ts
import { Code, Scissors, Factory } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Kurumsal', href: '/about' },
  { name: 'Referanslar', href: '/references' },
  { name: 'Blog', href: '/blog' },
  { name: 'İletişim', href: '/contact' },
];

export const SERVICES_CONTENT = {
  software: {
    t_title: 'soft_title',
    t_desc: 'soft_desc',
    icon: Code,
    items: [
      { t_label: 'soft_web', href: '/services/web-design' },
      { t_label: 'soft_ecom', href: '/services/ecommerce' },
      { t_label: 'soft_mob', href: '/services/mobile-app' },
      { t_label: 'soft_custom', href: '/services/software' },
    ],
  },
  cnc: {
    t_title: 'cnc_title',
    t_desc: 'cnc_desc',
    icon: Scissors,
    items: [
      { t_label: 'cnc_alum', href: '/services/aluminum-cutting' },
      { t_label: 'cnc_sheet', href: '/services/sheet-cutting' },
      { t_label: 'cnc_bend', href: '/services/bending' },
      { t_label: 'cnc_mill', href: '/services/cnc' },
    ],
  },
  featured: {
    t_title: 'feat_title',
    t_desc: 'feat_desc',
    t_tag: 'feat_tag',
    href: '/services/industry40',
    icon: Factory,
  },
};