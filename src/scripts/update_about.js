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
  About: {
    hero_tag: "Bizi Tanıyın",
    hero_t1: "İki Uzmanlık,",
    hero_t2: "Tek Standart",
    hero_desc: "2013 yılından bu yana yazılım teknolojileri ve CNC üretim alanlarında çift uzmanlık modeliyle hizmet veren Sezkon, endüstrinin en güvenilir teknoloji ortağı olmaya devam ediyor.",
    hero_btn: "Bizimle Çalışın",
    
    stats_y_v: "10+", stats_y_l: "Yıl Deneyim",
    stats_c_v: "50+", stats_c_l: "Kurumsal Müşteri",
    stats_p_v: "200+", stats_p_l: "Tamamlanan Proje",
    stats_e_v: "3", stats_e_l: "Kıtaya İhracat",

    mis_tag: "Misyonumuz",
    mis_t1: "Geleceği Bugünden",
    mis_t2: "Şekillendiriyoruz",
    mis_p1: "Sanayi ile dijital dünyanın kesişim noktasında konumlanan Sezkon, her iki alana olan derin vukufiyetiyle müşterilerinin iş süreçlerini dönüştürüyor.",
    mis_p2: "ISO 9001 belgeli kalite yönetim sistemimiz, 0.05mm hassasiyetli üretim parkurumuz ve yüzlerce kurumsal yazılım projesinden edindiğimiz birikim ile her proje özelinde en iyi çözümü sunuyoruz.",
    mis_c1: "ISO 9001 Kalite Yönetim Sistemi",
    mis_c2: "RoHS & REACH Uyumlu Üretim",
    mis_c3: "5 Eksen CNC İşleme Kapasitesi",
    mis_c4: "Agile Yazılım Geliştirme Metodolojisi",
    mis_c5: "7/24 Teknik Destek Hattı",

    val_tag: "Değerlerimiz",
    val_t1: "Bizi Farklı Kılan",
    val_t2: "İlkeler",
    val_1_t: "Mükemmellik", val_1_d: "Her projede sıfır hata hedefiyle çalışıyor, kalite standartlarını sürekli yükseltiyoruz.",
    val_2_t: "İnovasyon", val_2_d: "Teknolojinin sınırlarını zorlayan çözümler geliştiriyor, sektöre yön veriyoruz.",
    val_3_t: "Güvenilirlik", val_3_d: "10+ yıllık deneyimle müşterilerimize söz verdiğimizi zamanında teslim ediyoruz.",
    val_4_t: "İş Birliği", val_4_d: "Müşterilerimizle ortak akıl üreterek uzun vadeli ortaklıklar kuruyoruz.",

    time_tag: "Tarihçemiz",
    time_t1: "Büyüme",
    time_t2: "Yolculuğumuz",
    t1_y: "2013", t1_t: "Kuruluş", t1_d: "İstanbul Kartal'da küçük bir ekiple kuruldu. İlk CNC tezgahımız devreye alındı.",
    t2_y: "2016", t2_t: "Yazılım Birimi", t2_d: "ERP ve süreç otomasyon projelerine odaklanan yazılım birimimizi kurduk.",
    t3_y: "2019", t3_t: "Endüstri 4.0", t3_d: "Akıllı fabrika çözümleri ve IoT entegrasyon projelerine başladık.",
    t4_y: "2022", t4_t: "Büyüme", t4_d: "50+ kurumsal müşteri ve 3 kıtaya ihracat ile büyümemizi sürdürdük.",
    t5_y: "2025", t5_t: "Yeni Dönem", t5_d: "Yapay zeka destekli üretim çözümleriyle sektörde öncü konumunu pekiştirdik.",

    team_tag: "Ekibimiz",
    team_t1: "Arkamızdaki",
    team_t2: "Güç",
    team_1_n: "Mehmet Sezgin", team_1_r: "Kurucu & CEO", team_1_d: "Makine mühendisliği ve yazılım altyapısıyla şirketin vizyonunu yönetiyor.",
    team_2_n: "Ayşe Kaya", team_2_r: "Yazılım Direktörü", team_2_d: "15 yıllık yazılım geliştirme deneyimiyle dijital dönüşüm projelerini yönetiyor.",
    team_3_n: "Ali Demir", team_3_r: "Üretim Müdürü", team_3_d: "CNC ve lazer proseslerde 12 yıllık tecrübesiyle kalite güvencesini sağlıyor.",

    cta_t1: "Projenizi Birlikte",
    cta_t2: "Hayata",
    cta_t3: "Geçirelim.",
    cta_p: "Uzmanlarımız 24 saat içinde sizinle iletişime geçecektir.",
    cta_btn: "İletişime Geçin",

    meta_title: "Kurumsal | Sezkon – İki Uzmanlık, Tek Standart",
    meta_desc: "Sezkon hakkında bilgi edinin. Yazılım ve CNC üretim alanlarında 10+ yıllık deneyimimizle endüstrinin güvenilir teknoloji ortağı olmaya devam ediyoruz."
  }
};

const en = {
  About: {
    hero_tag: "Get to Know Us",
    hero_t1: "Two Expertise,",
    hero_t2: "One Standard",
    hero_desc: "Serving with a dual expertise model in software technologies and CNC production since 2013, Sezkon continues to be the industry's most reliable technology partner.",
    hero_btn: "Work With Us",

    stats_y_v: "10+", stats_y_l: "Years Ex.",
    stats_c_v: "50+", stats_c_l: "Corporate Clients",
    stats_p_v: "200+", stats_p_l: "Completed Proj.",
    stats_e_v: "3", stats_e_l: "Continents Exp.",

    mis_tag: "Our Mission",
    mis_t1: "Shaping the Future",
    mis_t2: "Today",
    mis_p1: "Positioned at the intersection of industry and the digital world, Sezkon transforms its clients' business processes with deep expertise in both fields.",
    mis_p2: "With our ISO 9001 certified quality management system, 0.05mm precision production line, and experience from hundreds of corporate software projects, we provide the best solution for each specific project.",
    mis_c1: "ISO 9001 Quality Management System",
    mis_c2: "RoHS & REACH Compliant Production",
    mis_c3: "5-Axis CNC Machining Capacity",
    mis_c4: "Agile Software Dev. Methodology",
    mis_c5: "24/7 Technical Support Line",

    val_tag: "Our Values",
    val_t1: "Principles That Make Us",
    val_t2: "Different",
    val_1_t: "Excellence", val_1_d: "We work with a zero-defect target in every project, continuously raising quality standards.",
    val_2_t: "Innovation", val_2_d: "We develop solutions that push the boundaries of technology, steering the industry.",
    val_3_t: "Reliability", val_3_d: "With 10+ years of experience, we deliver on our promises to clients on time.",
    val_4_t: "Collaboration", val_4_d: "We build long-term partnerships with our clients by fostering collective intelligence.",

    time_tag: "Our History",
    time_t1: "Our Growth",
    time_t2: "Journey",
    t1_y: "2013", t1_t: "Foundation", t1_d: "Founded with a small team in Kartal, Istanbul. Our first CNC machine was commissioned.",
    t2_y: "2016", t2_t: "Software Unit", t2_d: "We established our software unit focusing on ERP and process automation projects.",
    t3_y: "2019", t3_t: "Industry 4.0", t3_d: "We started smart factory solutions and IoT integration projects.",
    t4_y: "2022", t4_t: "Growth", t4_d: "We continued our growth with 50+ corporate clients and exports to 3 continents.",
    t5_y: "2025", t5_t: "New Era", t5_d: "We cemented our pioneering position in the sector with AI-supported production solutions.",

    team_tag: "Our Team",
    team_t1: "The Power",
    team_t2: "Behind Us",
    team_1_n: "Mehmet Sezgin", team_1_r: "Founder & CEO", team_1_d: "Guides the company's vision with mechanical engineering and software infrastructure.",
    team_2_n: "Ayşe Kaya", team_2_r: "Software Director", team_2_d: "Manages digital transformation projects with 15 years of software development experience.",
    team_3_n: "Ali Demir", team_3_r: "Production Manager", team_3_d: "Ensures quality assurance with 12 years of experience in CNC and laser processes.",

    cta_t1: "Let's Bring Your Project to",
    cta_t2: "Life",
    cta_t3: "Together.",
    cta_p: "Our experts will contact you within 24 hours.",
    cta_btn: "Get in Touch",

    meta_title: "Corporate | Sezkon – Two Expertise, One Standard",
    meta_desc: "Learn about Sezkon. Serving with 10+ years of experience in software and CNC production as the industry's reliable tech partner."
  }
};

updateFile(trPath, tr);
updateFile(enPath, en);
console.log('About translations updated.');
