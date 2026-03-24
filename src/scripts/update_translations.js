const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, '../messages/tr.json');
const enPath = path.join(__dirname, '../messages/en.json');

function updateFile(file, data) {
  let content = {};
  if (fs.existsSync(file)) {
    content = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  for (const [key, val] of Object.entries(data)) {
    content[key] = { ...content[key], ...val };
  }
  fs.writeFileSync(file, JSON.stringify(content, null, 2));
}

const tr = {
  Footer: {
    desc: "Üretim ve yazılım dünyasında \"İki Uzmanlık, Tek Standart\" anlayışıyla geleceği şekillendiriyoruz.",
    nav: "Navigasyon",
    services: "Hizmetler",
    contact: "İletişim",
    address: "Kartal, İstanbul / Türkiye",
    copyright: "Copyright © {year} SEZKON LTD. Tüm hakları saklıdır.",
    privacy: "Gizlilik Politikası",
    cookies: "Çerez Kullanımı",
    terms: "Kullanım Şartları",
    country: "Türkiye"
  },
  Home: {
    slide1_tag: "Mobil Uygulama",
    slide1_t1: "Yönetim Cebinizde.",
    slide1_t2: "Anlık Veri, Tam Kontrol.",
    slide1_desc: "İşletmenizi her yerden takip edin. Mobil yazılımımız ile üretimden satışa tüm süreçleri anlık izleyin, anında müdahale edin.",
    
    slide2_tag: "Masaüstü Yazılım",
    slide2_t1: "Güçlü Altyapı.",
    slide2_t2: "Sınırsız Raporlama.",
    slide2_desc: "Kapsamlı analizler, otomatik raporlar ve entegrasyonlarla verimliliği maksimize edin. Büyük veriyi anlamlı aksiyona dönüştürün.",
    
    slide3_tag: "Lazer Kesim Teknolojisi",
    slide3_t1: "Hassas Kesim.",
    slide3_t2: "Mükemmel Sonuç.",
    slide3_desc: "Endüstriyel lazer kesim makinelerimizle projelerinizi en ince detayına kadar hayata geçirin. Hızlı, güvenilir ve yüksek kalite.",
    
    why_t1: "Neden",
    why_t2: "Sezkon?",
    why_sub: "Mükemmelliği standartlarımızın ötesine taşıyoruz.",
    
    f1_t: "7/24 Destek",
    f1_d: "Her an yanınızda, canlı destek ve uzman ekibimizle kesintisiz hizmet.",
    f2_t: "0.05mm Hassasiyet",
    f2_d: "Lazer kesim ve üretim süreçlerinde mikron seviyesinde doğruluk.",
    f3_t: "Sorunsuz Kalite",
    f3_d: "ISO belgeli süreçlerle sıfır hata hedefi, %100 müşteri memnuniyeti.",
    f4_t: "Hızlı Teslimat",
    f4_d: "Stoktan hızlı sevkiyat ve proje bazlı zamanında teslimat garantisi.",

    dual_tag: "İkili Uzmanlık",
    dual_t1: "Uzmanlığımızı",
    dual_t2: "İnovasyonla",
    dual_t3: "Birleştiriyoruz",
    dual_desc: "Sezkon, sanayinin fiziksel gücünü dijitalin zekasıyla harmanlayarak işletmenizi geleceğe hazırlar.",
    
    cnc_t: "CNC İşleme",
    cnc_d: "Yüksek hassasiyetli CNC işleme merkezlerimiz ile savunma sanayi, havacılık ve makine sektörüne özel parçalar üretiyoruz.",
    cnc_1: "5 Eksen İşleme Merkezi",
    cnc_2: "Yüksek Hızlı Frezeleme",
    cnc_3: "Savunma Sanayi Standartları",
    cnc_btn: "Daha Fazla Bilgi",

    soft_t: "Özel Yazılım Çözümleri",
    soft_d: "İş süreçlerinizi dijitalleştiren, verimliliği artıran ve karar alma mekanizmalarınızı güçlendiren özel yazılımlar geliştiriyoruz.",
    soft_1: "Özel ERP & CRM Çözümleri",
    soft_2: "Endüstri 4.0 Entegrasyon",
    soft_3: "Gerçek Zamanlı Veri Analitiği",
    soft_btn: "Detayları Keşfet",

    op_tag: "OPERASYONEL SÜREÇ",
    op_t1: "Analizden",
    op_t2: "Teslimata",
    op_t3: "Yolculuk",
    
    st1_t: "İhtiyaç Analizi",
    st1_d: "Mühendislerimiz projenizi teknik olarak inceler ve en verimli yöntemi belirler.",
    st2_t: "Stratejik Planlama",
    st2_d: "Yazılım mimarisi veya üretim simülasyonları ile riskler minimize edilir.",
    st3_t: "Kusursuz Uygulama",
    st3_d: "Son teknoloji parkurumuzda veya geliştirme ortamımızda projeniz hayat bulur.",

    cta_tag: "HAREKETE GEÇİN",
    cta_t1: "Geleceği Şekillendirmeye",
    cta_t2: "Bugünden",
    cta_t3: "Başlayın.",
    cta_d: "Mühendislik zorluklarınıza modern ve teknolojik çözümler getirmek için sadece bir tık uzağınızdayız.",
    cta_btn: "Projenizden Bahsedin",
    cta_note: "24 Saat İçinde Teknik Teklif",

    bot_title: "Geleceği Sezkon ile İnşa Edin"
  }
};

const en = {
  Footer: {
    desc: "Shaping the future in the world of production and software with the \"Two Expertise, One Standard\" approach.",
    nav: "Navigation",
    services: "Services",
    contact: "Contact",
    address: "Kartal, Istanbul / Turkey",
    copyright: "Copyright © {year} SEZKON LTD. All rights reserved.",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    terms: "Terms of Use",
    country: "Turkey"
  },
  Home: {
    slide1_tag: "Mobile Application",
    slide1_t1: "Management in Your Pocket.",
    slide1_t2: "Real-time Data, Full Control.",
    slide1_desc: "Track your business from anywhere. Monitor all processes from production to sales instantly with our mobile software.",
    
    slide2_tag: "Desktop Software",
    slide2_t1: "Powerful Infrastructure.",
    slide2_t2: "Limitless Reporting.",
    slide2_desc: "Maximize efficiency with comprehensive analytics, automated reports, and integrations. Turn big data into actionable insights.",
    
    slide3_tag: "Laser Cutting Technology",
    slide3_t1: "Precision Cutting.",
    slide3_t2: "Perfect Result.",
    slide3_desc: "Bring your projects to life down to the finest detail with our industrial laser cutting machines. Fast, reliable, and high quality.",
    
    why_t1: "Why",
    why_t2: "Sezkon?",
    why_sub: "We push excellence beyond our standards.",
    
    f1_t: "24/7 Support",
    f1_d: "We are always by your side with our live support and expert team for uninterrupted service.",
    f2_t: "0.05mm Precision",
    f2_d: "Micron-level accuracy in laser cutting and production processes.",
    f3_t: "Flawless Quality",
    f3_d: "Zero-defect target with ISO-certified processes, 100% customer satisfaction.",
    f4_t: "Fast Delivery",
    f4_d: "Guaranteed quick shipment from stock and on-time project-based delivery.",

    dual_tag: "Dual Expertise",
    dual_t1: "Combining Our Expertise with",
    dual_t2: "Innovation",
    dual_t3: "",
    dual_desc: "Sezkon prepares your business for the future by blending the physical power of industry with the intelligence of digital.",
    
    cnc_t: "CNC Machining",
    cnc_d: "We produce specialized parts for defense, aviation, and machinery sectors with our high-precision CNC machining centers.",
    cnc_1: "5-Axis Machining Center",
    cnc_2: "High-Speed Milling",
    cnc_3: "Defense Industry Standards",
    cnc_btn: "Learn More",

    soft_t: "Custom Software Solutions",
    soft_d: "We develop custom software to digitalize your business processes, increase efficiency, and strengthen your decision-making mechanisms.",
    soft_1: "Custom ERP & CRM Solutions",
    soft_2: "Industry 4.0 Integration",
    soft_3: "Real-Time Data Analytics",
    soft_btn: "Discover Details",

    op_tag: "OPERATIONAL PROCESS",
    op_t1: "The Journey from Analysis to",
    op_t2: "Delivery",
    op_t3: "",
    
    st1_t: "Needs Analysis",
    st1_d: "Our engineers review your project technically and determine the most efficient approach.",
    st2_t: "Strategic Planning",
    st2_d: "Risks are minimized through software architecture or production simulations.",
    st3_t: "Flawless Execution",
    st3_d: "Your project comes to life in our state-of-the-art facility or development environment.",

    cta_tag: "TAKE ACTION",
    cta_t1: "Start Shaping the Future",
    cta_t2: "Today.",
    cta_t3: "",
    cta_d: "We are just a click away from bringing modern and technological solutions to your engineering challenges.",
    cta_btn: "Tell Us About Your Project",
    cta_note: "Technical Proposal Within 24 Hours",

    bot_title: "Build the Future with Sezkon"
  }
};

updateFile(trPath, tr);
updateFile(enPath, en);
console.log('Translations updated.');
