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
  Ref: {
    meta_title: "Referanslar | Sezkon – Müşteri Başarı Hikayeleri",
    meta_desc: "50+ kurumsal müşterimizin başarı hikayeleri.",
    hero_tag: "Başarı Hikayeleri",
    hero_t1: "Güvenilir",
    hero_t2: "Ortaklıklar",
    hero_desc: "50'yi aşkın kurumsal müşterimizin başarı hikayelerine göz atın. Savunma sanayiinden havacılığa, otomotivden teknolojiye farklı sektörlerde somut sonuçlar üretiyoruz.",
    test_tag: "Müşteri Görüşleri",
    test_t1: "Ne",
    test_t2: "Diyorlar?",
    cta_t1: "Siz de Bu Başarının",
    cta_t2: "Parçası",
    cta_t3: "Olun.",
    cta_desc: "Projenizi paylaşın, 24 saat içinde uzman ekibimiz size ulaşsın.",
    cta_btn: "Projenizden Bahsedin",
  },
  Blog: {
    meta_title: "Blog | Sezkon – Teknoloji, Üretim ve Yazılım İçerikleri",
    meta_desc: "CNC üretim teknolojileri, yazılım geliştirme, Endüstri 4.0 ve yapay zeka konularında uzman görüşleri.",
    hero_tag: "Sezkon Blog",
    hero_t1: "Teknoloji &",
    hero_t2: "Üretim",
    hero_t3: "Dünyasından",
    hero_desc: "Endüstri 4.0, yapay zeka, CNC teknolojileri ve yazılım geliştirme üzerine uzman görüşleri.",
    feat_tag: "Öne Çıkan",
    read_more: "Daha Fazla Makale",
    nl_tag: "Bülten",
    nl_t1: "Gelişmeleri",
    nl_t2: "Kaçırmayın",
    nl_desc: "Ayda bir, özenle seçilmiş teknoloji ve üretim içerikleri e-posta kutunuzda.",
    nl_ph: "E-posta adresiniz",
    nl_btn: "Abone Ol",
    read: "Oku"
  },
  Contact: {
    meta_title: "İletişim | Sezkon",
    meta_desc: "Bize ulaşın. Projeleriniz için teklif alın.",
    hero_tag: "İletişim",
    hero_t1: "Projenizi",
    hero_t2: "Konuşalım",
    hero_desc: "Her büyüklükteki projeyi ele alıyoruz. Formu doldurun, uzmanlarımız 24 saat içinde sizinle iletişime geçsin.",
    form_title: "Bize Yazın",
    form_desc: "Tüm alanları doldurun, en kısa sürede döneceğiz.",
    lbl_name: "Ad Soyad *",
    lbl_email: "E-posta *",
    lbl_company: "Şirket Adı",
    lbl_service: "Hizmet Türü",
    lbl_msg: "Mesajınız *",
    ph_name: "Adınız",
    ph_company: "Şirketiniz (opsiyonel)",
    ph_service: "Hizmet seçin",
    ph_msg: "Projenizi ve ihtiyaçlarınızı kısaca anlatın...",
    btn_send: "Gönder",
    succ_title: "Teşekkürler!",
    succ_desc: "Mesajınız alındı. Ekibimiz 24 saat içinde sizinle iletişime geçecektir.",
    succ_btn: "Yeni Mesaj Gönder",
    sb_tag: "Hızlı Teklif",
    sb_desc: "Acil projeleriniz için doğrudan telefonla veya e-posta ile ulaşın.",
    sb_call: "Hemen Ara",
    map_btn: "Haritada Gör",
    faq_title: "Sık Sorulan Sorular",
    faq_1_q: "Teklif almak ücretsiz mi?", faq_1_a: "Evet, teklifler tamamen ücretsizdir.",
    faq_2_q: "Ne kadar sürede yanıt alırım?", faq_2_a: "İş günleri içinde 24 saat içinde yanıt veriyoruz.",
    faq_3_q: "Küçük siparişler alıyor musunuz?", faq_3_a: "Evet, prototip ve küçük seri işleri de alıyoruz.",
  }
};

const en = {
  Ref: {
    meta_title: "References | Sezkon – Customer Success Stories",
    meta_desc: "Success stories of our 50+ corporate clients.",
    hero_tag: "Success Stories",
    hero_t1: "Reliable",
    hero_t2: "Partnerships",
    hero_desc: "Take a look at the success stories of our 50+ corporate clients. We produce concrete results in various sectors from defense industry to aviation, automotive to technology.",
    test_tag: "Testimonials",
    test_t1: "What Do They",
    test_t2: "Say?",
    cta_t1: "Be a Part of This",
    cta_t2: "Success",
    cta_t3: ".",
    cta_desc: "Share your project, our expert team will contact you within 24 hours.",
    cta_btn: "Tell Us About Your Project",
  },
  Blog: {
    meta_title: "Blog | Sezkon – Tech, Production & Software Content",
    meta_desc: "Expert insights on CNC production, software dev, Industry 4.0 and AI.",
    hero_tag: "Sezkon Blog",
    hero_t1: "From the World of",
    hero_t2: "Tech & Production",
    hero_t3: "",
    hero_desc: "Expert insights on Industry 4.0, Artificial Intelligence, CNC technologies, and software development.",
    feat_tag: "Featured",
    read_more: "Read More Articles",
    nl_tag: "Newsletter",
    nl_t1: "Don't Miss",
    nl_t2: "Updates",
    nl_desc: "Once a month, carefully curated tech and production content in your inbox.",
    nl_ph: "Your email address",
    nl_btn: "Subscribe",
    read: "Read"
  },
  Contact: {
    meta_title: "Contact | Sezkon",
    meta_desc: "Contact us. Get a quote for your projects.",
    hero_tag: "Contact",
    hero_t1: "Let's Discuss Your",
    hero_t2: "Project",
    hero_desc: "We handle projects of all sizes. Fill out the form, our experts will contact you within 24 hours.",
    form_title: "Write to Us",
    form_desc: "Fill in all fields, we will return as soon as possible.",
    lbl_name: "Full Name *",
    lbl_email: "Email *",
    lbl_company: "Company Name",
    lbl_service: "Service Type",
    lbl_msg: "Your Message *",
    ph_name: "Your Name",
    ph_company: "Your company (optional)",
    ph_service: "Select a service",
    ph_msg: "Briefly explain your project and needs...",
    btn_send: "Send",
    succ_title: "Thank You!",
    succ_desc: "Your message has been received. Our team will contact you within 24 hours.",
    succ_btn: "Send New Message",
    sb_tag: "Quick Quote",
    sb_desc: "Contact us directly via phone or email for urgent projects.",
    sb_call: "Call Now",
    map_btn: "View on Map",
    faq_title: "Frequently Asked Questions",
    faq_1_q: "Is getting a quote free?", faq_1_a: "Yes, quotes are completely free.",
    faq_2_q: "When will I get a response?", faq_2_a: "We respond within 24 hours on business days.",
    faq_3_q: "Do you take small orders?", faq_3_a: "Yes, we also accept prototype and small batch works.",
  }
};

updateFile(trPath, tr);
updateFile(enPath, en);
console.log('Inner pages translations updated.');
