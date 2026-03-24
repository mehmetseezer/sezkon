const fs = require('fs');
const path = require('path');

// 1. Update navigation.ts
const navPath = path.join(__dirname, 'src/constants/navigation.ts');
let navContent = fs.readFileSync(navPath, 'utf8');

const navReplacement = `export const SERVICES_CONTENT = {
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
};`;

navContent = navContent.replace(/export const SERVICES_CONTENT = {[\s\S]*?};\n?$/, navReplacement);
fs.writeFileSync(navPath, navContent);


// 2. Update Navbar.tsx
const navbarPath = path.join(__dirname, 'src/components/layout/Navbar.tsx');
let navbar = fs.readFileSync(navbarPath, 'utf8');

navbar = navbar.replace(/Hizmetler\s+<ChevronDown/g, "{t('services_nav')}\n              <ChevronDown");
navbar = navbar.replace(/Hizmetler\n\s*<ChevronDown/g, "{t('services_nav')}\n                <ChevronDown");
navbar = navbar.replace(/\{SERVICES_CONTENT\.software\.title\}/g, "{t('soft_title')}");
navbar = navbar.replace(/\{SERVICES_CONTENT\.software\.description\}/g, "{t('soft_desc')}");
navbar = navbar.replace(/\{SERVICES_CONTENT\.cnc\.title\}/g, "{t('cnc_title')}");
navbar = navbar.replace(/\{SERVICES_CONTENT\.cnc\.description\}/g, "{t('cnc_desc')}");
navbar = navbar.replace(/\{SERVICES_CONTENT\.featured\.tag\}/g, "{t('feat_tag')}");
navbar = navbar.replace(/\{SERVICES_CONTENT\.featured\.title\}/g, "{t('feat_title')}");
navbar = navbar.replace(/\{SERVICES_CONTENT\.featured\.description\}/g, "{t('feat_desc')}");
navbar = navbar.replace(/\{item\.label\}/g, "{t((item as any).t_label)}");
navbar = navbar.replace(/Teklif Al/g, "{t('btn_quote')}");
navbar = navbar.replace(/Detaylı Bilgi\s*<ArrowRight/g, "{t('btn_details')} <ArrowRight");
fs.writeFileSync(navbarPath, navbar);

// 3. Update Service Pages Breadcrumbs
const servicesDir = path.join(__dirname, 'src/app/[locale]/services');
const serviceDirs = fs.readdirSync(servicesDir);

serviceDirs.forEach(dir => {
  const pagePath = path.join(servicesDir, dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    content = content.replace(/<Link href="\/([^"]*)" className="([^"]+)">Anasayfa<\/Link>/g, 
        `<Link href="/$1" className="$2">{t('bc_home')}</Link>`);
    fs.writeFileSync(pagePath, content);
  }
});

console.log('Code modified successfully!');
