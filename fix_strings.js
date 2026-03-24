const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'src/messages/tr.json');
const enPath = path.join(__dirname, 'src/messages/en.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 1. Navbar translations
tr.Navigation = {
  ...tr.Navigation,
  "services_nav": "Hizmetler",
  "soft_title": "Yazılım Çözümleri",
  "soft_desc": "Dijital dünyada yerinizi alın.",
  "soft_web": "Web Tasarım",
  "soft_ecom": "E-Ticaret Sistemleri",
  "soft_mob": "Mobil Uygulama",
  "soft_custom": "Özel Yazılım",
  "cnc_title": "CNC & Lazer Kesim",
  "cnc_desc": "Endüstriyel imalat çözümleri.",
  "cnc_alum": "Alüminyum Lazer Kesim",
  "cnc_sheet": "Sac Lazer Kesim",
  "cnc_bend": "Abkant Büküm",
  "cnc_mill": "CNC İşleme",
  "feat_title": "Endüstri 4.0 Çözümleri",
  "feat_desc": "Yapay zeka ve otomasyon teknolojileriyle işletmenizin dönüşümünü başlatın.",
  "feat_tag": "YENİ",
  "btn_details": "Detaylı Bilgi",
  "btn_quote": "Teklif Al"
};

en.Navigation = {
  ...en.Navigation,
  "services_nav": "Services",
  "soft_title": "Software Solutions",
  "soft_desc": "Take your place in the digital world.",
  "soft_web": "Web Design",
  "soft_ecom": "E-Commerce Systems",
  "soft_mob": "Mobile App",
  "soft_custom": "Custom Software",
  "cnc_title": "CNC & Laser Cutting",
  "cnc_desc": "Industrial manufacturing solutions.",
  "cnc_alum": "Aluminum Laser Cutting",
  "cnc_sheet": "Sheet Laser Cutting",
  "cnc_bend": "Press Brake Bending",
  "cnc_mill": "CNC Machining",
  "feat_title": "Industry 4.0 Solutions",
  "feat_desc": "Start your business transformation with AI and automation.",
  "feat_tag": "NEW",
  "btn_details": "View Details",
  "btn_quote": "Get Quote"
};

// 2. Footer translations
tr.Footer = {
  ...tr.Footer,
  "nav_home": "Anasayfa",
  "nav_corp": "Kurumsal",
  "nav_ref": "Referanslar",
  "nav_blog": "Blog",
  "nav_contact": "İletişim",
  "srv_soft": "Yazılım Çözümleri",
  "srv_cnc": "CNC Torna & İşleme",
  "srv_ind": "Endüstri 4.0",
  "srv_erp": "ERP Sistemleri"
};

en.Footer = {
  ...en.Footer,
  "nav_home": "Home",
  "nav_corp": "Corporate",
  "nav_ref": "References",
  "nav_blog": "Blog",
  "nav_contact": "Contact",
  "srv_soft": "Software Solutions",
  "srv_cnc": "CNC Turning & Machining",
  "srv_ind": "Industry 4.0",
  "srv_erp": "ERP Systems"
};

// 3. Breadcrumb translations for all Service namespaces
const serviceNamespaces = ["SrvCnc", "SrvSoft", "SrvSheet", "SrvWeb", "SrvApp", "SrvEcom", "SrvInd", "SrvBend", "SrvAlum"];
serviceNamespaces.forEach(ns => {
  if (tr[ns]) tr[ns].bc_home = "Anasayfa";
  if (en[ns]) en[ns].bc_home = "Home";
});

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log('Dictionaries updated!');
