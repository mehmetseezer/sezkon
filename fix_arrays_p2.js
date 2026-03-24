const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'src/messages/tr.json');
const enPath = path.join(__dirname, 'src/messages/en.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// E-commerce Remaining
tr.SrvEcom.f5_t = "SSL & PCI DSS"; tr.SrvEcom.f5_d = "En yüksek güvenlik standartlarıyla müşteri ve ödeme verilerinin tam koruması.";
tr.SrvEcom.f6_t = "Mobil Uyumlu"; tr.SrvEcom.f6_d = "Mobil-first tasarım anlayışıyla %70+ mobil ziyaretçilere kusursuz alışveriş deneyimi.";
tr.SrvEcom.stat1_v = "%340"; tr.SrvEcom.stat1_l = "Ortalama ROI";
tr.SrvEcom.stat2_v = "48sa"; tr.SrvEcom.stat2_l = "Ortalama Kurulum";
tr.SrvEcom.stat3_v = "99.9%"; tr.SrvEcom.stat3_l = "Uptime Garantisi";
tr.SrvEcom.stat4_v = "7/24"; tr.SrvEcom.stat4_l = "Teknik Destek";
tr.SrvEcom.chk_list = ["Sınırsız ürün", "Çoklu dil desteği", "Çoklu para birimi", "İndirim & kupon", "Ürün yorumları", "Gelişmiş filtreleme", "SEO araçları", "Google Analytics", "E-fatura entegrasyonu", "Stok bildirimi"];

en.SrvEcom.f5_t = "SSL & PCI DSS"; en.SrvEcom.f5_d = "Full protection of customer and payment data with the highest security standards.";
en.SrvEcom.f6_t = "Mobile Friendly"; en.SrvEcom.f6_d = "Flawless shopping experience for 70%+ mobile visitors with mobile-first design approach.";
en.SrvEcom.stat1_v = "340%"; en.SrvEcom.stat1_l = "Average ROI";
en.SrvEcom.stat2_v = "48h"; en.SrvEcom.stat2_l = "Avg Setup Time";
en.SrvEcom.stat3_v = "99.9%"; en.SrvEcom.stat3_l = "Uptime Guarantee";
en.SrvEcom.stat4_v = "24/7"; en.SrvEcom.stat4_l = "Tech Support";
en.SrvEcom.chk_list = ["Unlimited products", "Multi-language support", "Multi-currency", "Discounts & coupons", "Product reviews", "Advanced filtering", "SEO tools", "Google Analytics", "E-invoice integration", "Stock alerts"];

// Mobile App Remaining
tr.SrvApp.f5_t = "Offline Çalışma"; tr.SrvApp.f5_d = "İnternet bağlantısı olmadan da devamlı çalışan offline-first mimari.";
tr.SrvApp.f6_t = "ERP Entegrasyonu"; tr.SrvApp.f6_d = "Mevcut ERP ve CRM sistemlerinizle sorunsuz entegrasyon ve senkronizasyon.";
tr.SrvApp.cases = ["Üretim & Fabrika Yönetimi", "Sahada Satış Ekipleri", "Lojistik & Kargo Takibi", "Sağlık & Klinik", "İnşaat & Proje Yönetimi", "Perakende & Depo"];

en.SrvApp.f5_t = "Offline Support"; en.SrvApp.f5_d = "Offline-first architecture that keeps working even without internet connection.";
en.SrvApp.f6_t = "ERP Integration"; en.SrvApp.f6_d = "Seamless integration and sync with your existing ERP and CRM systems.";
en.SrvApp.cases = ["Production & Plant Mgmt", "Field Sales Teams", "Logistics & Tracking", "Healthcare & Clinics", "Construction & Projects", "Retail & Warehouse"];

// Sheet Cutting Remaining
tr.SrvSheet.mat1_n = "Siyah Sac (S235/S355)"; tr.SrvSheet.mat1_t = "0.5 – 30mm";
tr.SrvSheet.mat2_n = "Paslanmaz Çelik (304/316)"; tr.SrvSheet.mat2_t = "0.5 – 20mm";
tr.SrvSheet.mat3_n = "Galvanizli Sac"; tr.SrvSheet.mat3_t = "0.5 – 12mm";
tr.SrvSheet.mat4_n = "Hardox / Wear Plate"; tr.SrvSheet.mat4_t = "3 – 25mm";
tr.SrvSheet.mat5_n = "Elektro Galvaniz"; tr.SrvSheet.mat5_t = "0.5 – 8mm";
tr.SrvSheet.mat6_n = "Aluzinc Kaplı"; tr.SrvSheet.mat6_t = "0.5 – 6mm";

en.SrvSheet.mat1_n = "Carbon Steel (S235/S355)"; en.SrvSheet.mat1_t = "0.5 – 30mm";
en.SrvSheet.mat2_n = "Stainless Steel (304/316)"; en.SrvSheet.mat2_t = "0.5 – 20mm";
en.SrvSheet.mat3_n = "Galvanized Steel"; en.SrvSheet.mat3_t = "0.5 – 12mm";
en.SrvSheet.mat4_n = "Hardox / Wear Plate"; en.SrvSheet.mat4_t = "3 – 25mm";
en.SrvSheet.mat5_n = "Electro Galvanized"; en.SrvSheet.mat5_t = "0.5 – 8mm";
en.SrvSheet.mat6_n = "Aluzinc Coated"; en.SrvSheet.mat6_t = "0.5 – 6mm";

// Industry 40 Remaining
tr.SrvInd.ben1_v = "%25"; tr.SrvInd.ben1_l = "OEE Artışı";
tr.SrvInd.ben2_v = "%70"; tr.SrvInd.ben2_l = "Bakım Arızası Azalması";
tr.SrvInd.ben3_v = "%30"; tr.SrvInd.ben3_l = "Enerji Tasarrufu";
tr.SrvInd.ben4_v = "0"; tr.SrvInd.ben4_l = "Plansız Duruş Hedefi";
tr.SrvInd.r1_p = "Faz 1"; tr.SrvInd.r1_t = "Keşif & Değerlendirme"; tr.SrvInd.r1_u = "2–4 Hafta"; tr.SrvInd.r1_d = "Mevcut sistem analizi, veri kaynakları haritalama ve dijital dönüşüm yol haritası oluşturma.";
tr.SrvInd.r2_p = "Faz 2"; tr.SrvInd.r2_t = "Pilot Uygulama"; tr.SrvInd.r2_u = "4–8 Hafta"; tr.SrvInd.r2_d = "Bir üretim hattında IoT sensör kurulumu, SCADA entegrasyonu ve dashboard yayına alma.";
tr.SrvInd.r3_p = "Faz 3"; tr.SrvInd.r3_t = "Ölçekleme"; tr.SrvInd.r3_u = "8–16 Hafta"; tr.SrvInd.r3_d = "Pilot başarısını tüm tesise yaymak, AI modüllerini devreye almak ve ekip eğitimi.";
tr.SrvInd.r4_p = "Faz 4"; tr.SrvInd.r4_t = "Sürekli İyileştirme"; tr.SrvInd.r4_u = "Süregelen"; tr.SrvInd.r4_d = "Sistem optimizasyonu, yeni AI modeli geliştirme ve tesisin dijital olgunluğunu artırma.";
tr.SrvInd.tech_stack_title = "Teknolojİ & Partner Ekosİstemİ";
tr.SrvInd.why_list = ["10+ yıl üretim sektörü deneyimi", "Kendi fabrikamızda test edilmiş çözümler", "SAP, Oracle ve Siemens entegrasyon deneyimi", "ISO 9001 sertifikalı proje yönetimi", "Türkçe destek, yerli mühendis ekibi", "Prototipten enterprise ölçeğe esnek çözümler"];

en.SrvInd.ben1_v = "25%"; en.SrvInd.ben1_l = "OEE Increase";
en.SrvInd.ben2_v = "70%"; en.SrvInd.ben2_l = "Maintenance Failure Drop";
en.SrvInd.ben3_v = "30%"; en.SrvInd.ben3_l = "Energy Savings";
en.SrvInd.ben4_v = "0"; en.SrvInd.ben4_l = "Unplanned Downtime Goal";
en.SrvInd.r1_p = "Phase 1"; en.SrvInd.r1_t = "Discovery & Assessment"; en.SrvInd.r1_u = "2–4 Weeks"; en.SrvInd.r1_d = "Current system analysis, data source mapping and digital transformation roadmap creation.";
en.SrvInd.r2_p = "Phase 2"; en.SrvInd.r2_t = "Pilot Implementation"; en.SrvInd.r2_u = "4–8 Weeks"; en.SrvInd.r2_d = "IoT sensor installation on a single line, SCADA integration and dashboard go-live.";
en.SrvInd.r3_p = "Phase 3"; en.SrvInd.r3_t = "Scaling"; en.SrvInd.r3_u = "8–16 Weeks"; en.SrvInd.r3_d = "Expanding pilot success plant-wide, deploying AI modules and team training.";
en.SrvInd.r4_p = "Phase 4"; en.SrvInd.r4_t = "Continuous Improvement"; en.SrvInd.r4_u = "Ongoing"; en.SrvInd.r4_d = "System optimization, new AI model development and increasing plant digital maturity.";
en.SrvInd.tech_stack_title = "Technology & Partner Ecosystem";
en.SrvInd.why_list = ["10+ years manufacturing experience", "Solutions tested in our own factory", "SAP, Oracle and Siemens integration exp.", "ISO 9001 certified project management", "English support, dedicated engineering team", "Flexible solutions from prototype to enterprise"];

// CNC Remaining
tr.SrvCnc.mat_list = ["Alüminyum Alaşımları", "Titanyum (Ti-6Al-4V)", "Inconel 718", "Paslanmaz Çelik", "Takım Çelikleri", "Delrin / PEEK"];
tr.SrvCnc.sec1_n = "Savunma Sanayi"; tr.SrvCnc.sec1_i = ["Gövde parçaları", "Kovan ve mermi bileşenleri", "Optik tutucu"];
tr.SrvCnc.sec2_n = "Havacılık"; tr.SrvCnc.sec2_i = ["Türbin kanatçıkları", "Brakete ve fitting", "Yapısal tutucular"];
tr.SrvCnc.sec3_n = "Otomotiv"; tr.SrvCnc.sec3_i = ["Prototip parçalar", "Kalıp ve fixture", "Motor bileşenleri"];

en.SrvCnc.mat_list = ["Aluminum Alloys", "Titanium (Ti-6Al-4V)", "Inconel 718", "Stainless Steel", "Tool Steels", "Delrin / PEEK"];
en.SrvCnc.sec1_n = "Defense Industry"; en.SrvCnc.sec1_i = ["Body parts", "Casing and bullet components", "Optic mounts"];
en.SrvCnc.sec2_n = "Aerospace"; en.SrvCnc.sec2_i = ["Turbine blades", "Brackets & fittings", "Structural mounts"];
en.SrvCnc.sec3_n = "Automotive"; en.SrvCnc.sec3_i = ["Prototype parts", "Molds and fixtures", "Engine components"];

// Bending Remaining
tr.SrvBend.prof_list = ["L Profil", "U Profil", "Z Profil", "C Profil", "Hat Bölümü", "Kutu Profil", "Özel Form", "Kapaklık"];
tr.SrvBend.cta_list = ["Tek tedarikçi avantajı", "Koordinasyon kolaylığı", "%15 maliyet tasarrufu", "Daha hızlı teslimat"];

en.SrvBend.prof_list = ["L Profile", "U Profile", "Z Profile", "C Profile", "Hat Section", "Box Profile", "Custom Form", "Caps"];
en.SrvBend.cta_list = ["Single supplier advantage", "Ease of coordination", "15% cost savings", "Faster delivery times"];

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log('Dictionaries array translations populated phase 2.');
