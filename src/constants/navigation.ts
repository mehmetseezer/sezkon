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
    title: 'Yazılım Çözümleri',
    description: 'Dijital dünyada yerinizi alın.',
    icon: Code,
    items: [
      { label: 'Web Tasarım', href: '/services/web-design' },
      { label: 'E-Ticaret Sistemleri', href: '/services/ecommerce' },
      { label: 'Mobil Uygulama', href: '/services/mobile-app' },
      { label: 'Özel Yazılım', href: '/services/software' },
    ],
  },
  cnc: {
    title: 'CNC & Lazer Kesim',
    description: 'Endüstriyel imalat çözümleri.',
    icon: Scissors,
    items: [
      { label: 'Alüminyum Lazer Kesim', href: '/services/aluminum-cutting' },
      { label: 'Sac Lazer Kesim', href: '/services/sheet-cutting' },
      { label: 'Abkant Büküm', href: '/services/bending' },
      { label: 'CNC İşleme', href: '/services/cnc' },
    ],
  },
  featured: {
    title: 'Endüstri 4.0 Çözümleri',
    description: 'Yapay zeka ve otomasyon teknolojileriyle işletmenizin dönüşümünü başlatın.',
    href: '/services/industry40',
    tag: 'YENİ',
    icon: Factory,
  },
};