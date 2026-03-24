const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'src/messages/tr.json');
const enPath = path.join(__dirname, 'src/messages/en.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Dictionaries update
// Web Design
tr.SrvWeb.f1_t = "SEO Odaklı"; tr.SrvWeb.f1_d = "Teknik SEO, Core Web Vitals ve hız optimizasyonu ile Google sıralamalarında öne çıkın.";
tr.SrvWeb.f2_t = "Responsive Tasarım"; tr.SrvWeb.f2_d = "Her cihaz ve ekran boyutunda kusursuz görüntü ve deneyim.";
tr.SrvWeb.f3_t = "Dönüşüm Optimizasyonu"; tr.SrvWeb.f3_d = "Ziyaretçileri müşteriye dönüştüren UX odaklı tasarım kararları.";
tr.SrvWeb.f4_t = "Modern Teknoloji"; tr.SrvWeb.f4_d = "Next.js, TypeScript ve Tailwind CSS ile hızlı, güvenilir ve sürdürülebilir kod.";
tr.SrvWeb.p1_t = "Keşif & Analiz"; tr.SrvWeb.p1_d = "Marka kimliğinizi, hedef kitlenizi ve rekabetçi konumlanmayı derinlemesine analiz ediyoruz.";
tr.SrvWeb.p2_t = "Tasarım & Prototip"; tr.SrvWeb.p2_d = "Figma'da wireframe ve interaktif prototip oluşturuyor, onayınızı alıyoruz.";
tr.SrvWeb.p3_t = "Geliştirme"; tr.SrvWeb.p3_d = "Onaylanan tasarımı modern teknoloji yığınıyla hayata geçiriyoruz.";
tr.SrvWeb.p4_t = "Test & Yayın"; tr.SrvWeb.p4_d = "Cross-browser testler, performans analizi ve sorunsuz yayına alma.";
tr.SrvWeb.pkg1_n = "Başlangıç"; tr.SrvWeb.pkg1_d = "Küçük işletmeler için"; tr.SrvWeb.pkg1_f = ["5 sayfa web sitesi", "Responsive tasarım", "Temel SEO", "1 yıl bakım"];
tr.SrvWeb.pkg2_n = "Kurumsal"; tr.SrvWeb.pkg2_d = "Büyüyen şirketler için"; tr.SrvWeb.pkg2_f = ["15 sayfa web sitesi", "CMS entegrasyonu", "Gelişmiş SEO", "Hız optimizasyonu", "2 yıl bakım"];
tr.SrvWeb.pkg3_n = "Enterprise"; tr.SrvWeb.pkg3_d = "Büyük kurumlar için"; tr.SrvWeb.pkg3_f = ["Sınırsız sayfa", "Özel backend", "API entegrasyonları", "A/B testi", "7/24 destek"];

en.SrvWeb.f1_t = "SEO Focused"; en.SrvWeb.f1_d = "Stand out in Google rankings with technical SEO, Core Web Vitals, and speed optimization.";
en.SrvWeb.f2_t = "Responsive Design"; en.SrvWeb.f2_d = "Flawless view and experience on every device and screen size.";
en.SrvWeb.f3_t = "Conversion Optimization"; en.SrvWeb.f3_d = "UX-driven design decisions that turn visitors into customers.";
en.SrvWeb.f4_t = "Modern Technology"; en.SrvWeb.f4_d = "Fast, reliable, and maintainable code with Next.js, TypeScript, and Tailwind CSS.";
en.SrvWeb.p1_t = "Discovery & Analysis"; en.SrvWeb.p1_d = "We deeply analyze your brand identity, target audience, and competitive positioning.";
en.SrvWeb.p2_t = "Design & Prototype"; en.SrvWeb.p2_d = "We create wireframes and interactive prototypes in Figma for your approval.";
en.SrvWeb.p3_t = "Development"; en.SrvWeb.p3_d = "We bring the approved design to life with a modern tech stack.";
en.SrvWeb.p4_t = "Testing & Launch"; en.SrvWeb.p4_d = "Cross-browser testing, performance analysis, and seamless deployment.";
en.SrvWeb.pkg1_n = "Starter"; en.SrvWeb.pkg1_d = "For small businesses"; en.SrvWeb.pkg1_f = ["5 page website", "Responsive design", "Basic SEO", "1 year maintenance"];
en.SrvWeb.pkg2_n = "Corporate"; en.SrvWeb.pkg2_d = "For growing companies"; en.SrvWeb.pkg2_f = ["15 page website", "CMS integration", "Advanced SEO", "Speed optimization", "2 years maintenance"];
en.SrvWeb.pkg3_n = "Enterprise"; en.SrvWeb.pkg3_d = "For large enterprises"; en.SrvWeb.pkg3_f = ["Unlimited pages", "Custom backend", "API integrations", "A/B testing", "24/7 support"];

// Ecommerce
tr.SrvEcom.f1_t = "Özelleştirilmiş Tasarım"; tr.SrvEcom.f1_d = "Markanızın gücünü yansıtan, tamamen size özel olarak tasarlanmış arayüzler.";
tr.SrvEcom.f2_t = "Güvenli Altyapı"; tr.SrvEcom.f2_d = "Kredi kartı verisi saklamama prensibi, SSL sertifikaları ve güncel güvenlik protokolleri.";
tr.SrvEcom.f3_t = "Tüm Cihazlarda Kusursuz"; tr.SrvEcom.f3_d = "Satışların %70'inin gerçekleştiği mobil cihazlar için optimize edilmiş deneyim.";
tr.SrvEcom.f4_t = "Kolay Yönetim Paneli"; tr.SrvEcom.f4_d = "Ürün, sipariş ve kargo süreçlerinizi tek ekrandan kolayca yönetin.";
tr.SrvEcom.inc1_t = "Ödeme Sistemleri Entegrasyonu"; tr.SrvEcom.inc1_d = "Iyzico, PayTR, Stripe ve tüm banka sanal POS altyapıları ile tam uyumlu ödeme sayfası.";
tr.SrvEcom.inc2_t = "Pazaryeri Entegrasyonları"; tr.SrvEcom.inc2_d = "Trendyol, Hepsiburada, Amazon gibi platformlarla tek merkezden stok ve fiyat yönetimi.";
tr.SrvEcom.inc3_t = "Kargo Otomasyonu"; tr.SrvEcom.inc3_d = "Yurtiçi, Aras, MNG vb kargo firmalarıyla barkodlu entegrasyon.";
tr.SrvEcom.inc4_t = "Gelişmiş Raporlama"; tr.SrvEcom.inc4_d = "Satış trendleri, ziyaretçi istatistikleri ve dönüşüm oranları için detaylı grafikler.";

en.SrvEcom.f1_t = "Custom Design"; en.SrvEcom.f1_d = "Fully customized interfaces that reflect the power of your brand.";
en.SrvEcom.f2_t = "Secure Infrastructure"; en.SrvEcom.f2_d = "No-data-storage principle for credit cards, SSL certificates, and up-to-date security protocols.";
en.SrvEcom.f3_t = "Flawless on All Devices"; en.SrvEcom.f3_d = "Optimized experience for mobile devices where 70% of sales occur.";
en.SrvEcom.f4_t = "Easy Admin Panel"; en.SrvEcom.f4_d = "Easily manage your products, orders, and shipping processes from a single screen.";
en.SrvEcom.inc1_t = "Payment Systems Integration"; en.SrvEcom.inc1_d = "Fully compatible checkout with Iyzico, PayTR, Stripe and all bank virtual POS infrastructures.";
en.SrvEcom.inc2_t = "Marketplace Integrations"; en.SrvEcom.inc2_d = "Single-center inventory and price management with platforms like Amazon, eBay.";
en.SrvEcom.inc3_t = "Shipping Automation"; en.SrvEcom.inc3_d = "Barcode integration with major shipping companies.";
en.SrvEcom.inc4_t = "Advanced Reporting"; en.SrvEcom.inc4_d = "Detailed graphics for sales trends, visitor statistics, and conversion rates.";

// Mobile App
tr.SrvApp.f1_t = "Çapraz Platform (React Native)"; tr.SrvApp.f1_d = "Tek kod tabanı ile hem iOS hem Android cihazlarda native hızında çalışan yüksek performanslı uygulamalar.";
tr.SrvApp.f2_t = "UI/UX Mükemmelliği"; tr.SrvApp.f2_d = "Kullanıcı alışkanlıklarına uygun, modern, akıcı ve animasyonlarla desteklenmiş arayüz tasarımları.";
tr.SrvApp.f3_t = "Güvenli & Ölçeklenebilir Backend"; tr.SrvApp.f3_d = "Binlerce eşzamanlı kullanıcıyı kaldırabilen, uçtan uca şifrelenmiş güçlü sunucu mimarisi.";
tr.SrvApp.f4_t = "Donanım Entegrasyonu"; tr.SrvApp.f4_d = "Kamera, GPS, Bluetooth ve push bildirimleri gibi yerel cihaz donanımlarına tam erişim.";
tr.SrvApp.s1_t = "E-Ticaret & Perakende"; tr.SrvApp.s1_d = "Sadakat programları ve hızlı ödeme kolaylığı sunan alışveriş uygulamaları.";
tr.SrvApp.s2_t = "Lojistik & Teslimat"; tr.SrvApp.s2_d = "Canlı kurye takibi ve rota optimizasyonu sağlayan saha operasyon uygulamaları.";
tr.SrvApp.s3_t = "Sağlık & Tele-Tıp"; tr.SrvApp.s3_d = "Görüntülü görüşme, randevu planlama ve hasta takip sistemleri.";

en.SrvApp.f1_t = "Cross-Platform (React Native)"; en.SrvApp.f1_d = "High-performance applications running at native speed on both iOS and Android with a single codebase.";
en.SrvApp.f2_t = "UI/UX Excellence"; en.SrvApp.f2_d = "Modern, fluid, and animated interface designs tailored to user habits.";
en.SrvApp.f3_t = "Secure & Scalable Backend"; en.SrvApp.f3_d = "Powerful server architecture capable of handling thousands of concurrent users, fully encrypted.";
en.SrvApp.f4_t = "Hardware Integration"; en.SrvApp.f4_d = "Full access to native device hardware like cameras, GPS, Bluetooth, and push notifications.";
en.SrvApp.s1_t = "E-Commerce & Retail"; en.SrvApp.s1_d = "Shopping apps offering loyalty programs and quick checkout.";
en.SrvApp.s2_t = "Logistics & Delivery"; en.SrvApp.s2_d = "Field operation apps providing live courier tracking and route optimization.";
en.SrvApp.s3_t = "Healthcare & Telemedicine"; en.SrvApp.s3_d = "Video calling, appointment scheduling, and patient tracking systems.";

// Software
tr.SrvSoft.f1_t = "Kurumsal Kaynak Planlama (ERP)"; tr.SrvSoft.f1_d = "Üretim, stok, muhasebe ve İK süreçlerinizi tek modülde birleştirin.";
tr.SrvSoft.f2_t = "Müşteri İlişkileri (CRM)"; tr.SrvSoft.f2_d = "Satış tüneli takibi, teklif yönetimi ve müşteri analizleriyle satış gücünüzü artırın.";
tr.SrvSoft.f3_t = "Üretim Takip (MES)"; tr.SrvSoft.f3_d = "Makinelerden anlık veri alarak OEE (Genel Ekipman Verimliliği) takibi yapın.";
tr.SrvSoft.f4_t = "B2B Bayi Portalları"; tr.SrvSoft.f4_d = "Bayilerinizin sipariş, bakiye ve cari takibini yapabileceği güvenli platformlar.";
tr.SrvSoft.st1_t = "Frontend"; tr.SrvSoft.st1_d = "Next.js, React, Tailwind CSS ile hızlı ve modern arayüzler.";
tr.SrvSoft.st2_t = "Backend"; tr.SrvSoft.st2_d = "Node.js, NestJS ve Python ile mikroservis mimarisi.";
tr.SrvSoft.st3_t = "Veritabanı"; tr.SrvSoft.st3_d = "PostgreSQL, MongoDB ve Redis ile yüksek veri işleme hızı.";
tr.SrvSoft.st4_t = "DevOps"; tr.SrvSoft.st4_d = "Docker, Kubernetes ve CI/CD süreçleriyle kesintisiz yayın.";
tr.SrvSoft.p1_t = "Analiz & Planlama"; tr.SrvSoft.p1_d = "İhtiyaç analizi ve yazılım mimarisinin oluşturulması.";
tr.SrvSoft.p2_t = "UI/UX Tasarım"; tr.SrvSoft.p2_d = "Kullanıcı deneyimi odaklı, modern prototiplerin hazırlanması.";
tr.SrvSoft.p3_t = "Sprint Geliştirme"; tr.SrvSoft.p3_d = "Agile metodoloji ile modüler geliştirme ve düzenli geri bildirim toplantıları.";
tr.SrvSoft.p4_t = "Test & Canlıya Alma"; tr.SrvSoft.p4_d = "Kapsamlı QA süreçleri ve kapalı beta testleri sonrası güvenli geçiş.";

en.SrvSoft.f1_t = "Enterprise Resource Planning (ERP)"; en.SrvSoft.f1_d = "Unify production, inventory, accounting and HR in a single module.";
en.SrvSoft.f2_t = "Customer Relationship (CRM)"; en.SrvSoft.f2_d = "Increase sales power with funnel tracking, quote management and customer analysis.";
en.SrvSoft.f3_t = "Manufacturing Execution (MES)"; en.SrvSoft.f3_d = "Track OEE by getting realtime data directly from machines.";
en.SrvSoft.f4_t = "B2B Dealer Portals"; en.SrvSoft.f4_d = "Secure platforms for dealers to track orders and balances.";
en.SrvSoft.st1_t = "Frontend"; en.SrvSoft.st1_d = "Fast and modern UI with Next.js, React, and Tailwind CSS.";
en.SrvSoft.st2_t = "Backend"; en.SrvSoft.st2_d = "Microservices architecture with Node.js, NestJS and Python.";
en.SrvSoft.st3_t = "Database"; en.SrvSoft.st3_d = "High data processing speed with PostgreSQL, MongoDB and Redis.";
en.SrvSoft.st4_t = "DevOps"; en.SrvSoft.st4_d = "Continuous deployment via Docker, Kubernetes and CI/CD.";
en.SrvSoft.p1_t = "Analysis & Planning"; en.SrvSoft.p1_d = "Requirements engineering and software architecture formulation.";
en.SrvSoft.p2_t = "UI/UX Design"; en.SrvSoft.p2_d = "Creating modern, user experience focused prototypes.";
en.SrvSoft.p3_t = "Agile Development"; en.SrvSoft.p3_d = "Modular development using Agile sprints and regular reviews.";
en.SrvSoft.p4_t = "Test & Release"; en.SrvSoft.p4_d = "Extensive QA processes and secure release after closed betas.";

// CNC
tr.SrvCnc.s1_l = "Hassasiyet"; tr.SrvCnc.s1_v = "±0.005mm";
tr.SrvCnc.s2_l = "Maksimum Boyut"; tr.SrvCnc.s2_v = "1200 x 800 x 600mm";
tr.SrvCnc.s3_l = "Eksen Sayısı"; tr.SrvCnc.s3_v = "3, 4 ve 5 Eksen";
tr.SrvCnc.s4_l = "Kontrol Ünitesi"; tr.SrvCnc.s4_v = "Fanuc & Siemens";
tr.SrvCnc.s5_l = "Kalite Kontrol"; tr.SrvCnc.s5_v = "CMM Ölçüm";
tr.SrvCnc.s6_l = "Kapasite"; tr.SrvCnc.s6_v = "7/24 Vardiyalı";
tr.SrvCnc.c1_t = "Simultane 5 Eksen"; tr.SrvCnc.c1_d = "Tek bağlamada çoklu yüzey işleyerek setup sürelerini sıfırlar ve parça doğruluk toleranslarını mükemmelleştiririz.";
tr.SrvCnc.c2_t = "CAD/CAM Mühendisliği"; tr.SrvCnc.c2_d = "SolidCAM ve MasterCAM kullanarak en ideal takım yollarını oluşturur, işleme süresini minimuma indiririz.";
tr.SrvCnc.c3_t = "Kalite Güvencesi"; tr.SrvCnc.c3_d = "Tüm kritik ölçüler CMM kontrollü sıcaklık ayarlı kalite odamızda doğrulanır ve raporlanarak teslim edilir.";
tr.SrvCnc.c4_t = "Yüzey İşlemleri"; tr.SrvCnc.c4_d = "Eloksal, krom kaplama, karartma, ısıl işlem ve taşlama gibi tüm ikincil işlemleri anahtar teslim sunuyoruz.";

en.SrvCnc.s1_l = "Precision"; en.SrvCnc.s1_v = "±0.005mm";
en.SrvCnc.s2_l = "Max Dimension"; en.SrvCnc.s2_v = "1200 x 800 x 600mm";
en.SrvCnc.s3_l = "Axis Count"; en.SrvCnc.s3_v = "3, 4 and 5 Axis";
en.SrvCnc.s4_l = "Control Unit"; en.SrvCnc.s4_v = "Fanuc & Siemens";
en.SrvCnc.s5_l = "Quality Control"; en.SrvCnc.s5_v = "CMM Measurement";
en.SrvCnc.s6_l = "Capacity"; en.SrvCnc.s6_v = "24/7 Shifts";
en.SrvCnc.c1_t = "Simultaneous 5 Axis"; en.SrvCnc.c1_d = "Zero setup time and flawless accuracy by machining multiple surfaces in one hold.";
en.SrvCnc.c2_t = "CAD/CAM Engineering"; en.SrvCnc.c2_d = "We create ideal tool paths utilizing SolidCAM and MasterCAM and minimize processing time.";
en.SrvCnc.c3_t = "Quality Assurance"; en.SrvCnc.c3_d = "All critical measurements are verified via CMM in our temperature-controlled QA room.";
en.SrvCnc.c4_t = "Surface Treatments"; en.SrvCnc.c4_d = "Turnkey solutions including anodizing, chrome plating, heat treatment, and grinding.";

// Alum
tr.SrvAlum.s1_l = "Kesim Hassasiyeti"; tr.SrvAlum.s1_v = "±0.05mm";
tr.SrvAlum.s2_l = "Maks. Plaka Boyutu"; tr.SrvAlum.s2_v = "3000 × 1500mm";
tr.SrvAlum.s3_l = "Maks. Kalınlık"; tr.SrvAlum.s3_v = "25mm";
tr.SrvAlum.s4_l = "Lazer Gücü"; tr.SrvAlum.s4_v = "6000W Fiber";
tr.SrvAlum.s5_l = "Min. Delik Çapı"; tr.SrvAlum.s5_v = "0.8mm";
tr.SrvAlum.s6_l = "Yüzey Kalitesi"; tr.SrvAlum.s6_v = "Ra 1.6 – 3.2";
tr.SrvAlum.c1_t = "Mikron Hassasiyet"; tr.SrvAlum.c1_d = "±0.05mm tolerans ile karmaşık geometriler ve ince detaylar dahil mükemmel kesim kalitesi.";
tr.SrvAlum.c2_t = "Yüksek Hız"; tr.SrvAlum.c2_d = "6000W fiber lazer ile geleneksel yöntemlerin 5 katı hızda kesim. Acil siparişler için öncelikli hat.";
tr.SrvAlum.c3_t = "Oksit Serbest Kesim"; tr.SrvAlum.c3_d = "Azot gaz kullanımı ile oksit oluşumu önlenir, boya ve kaplama için ideal yüzey kalitesi.";
tr.SrvAlum.c4_t = "Hızlı Teslimat"; tr.SrvAlum.c4_d = "Standart siparişler 3–5 iş günü, acil siparişler 24–48 saat içinde teslimata hazır.";

en.SrvAlum.s1_l = "Cutting Precision"; en.SrvAlum.s1_v = "±0.05mm";
en.SrvAlum.s2_l = "Max Plate Size"; en.SrvAlum.s2_v = "3000 × 1500mm";
en.SrvAlum.s3_l = "Max Thickness"; en.SrvAlum.s3_v = "25mm";
en.SrvAlum.s4_l = "Laser Power"; en.SrvAlum.s4_v = "6000W Fiber";
en.SrvAlum.s5_l = "Min Hole Dia."; en.SrvAlum.s5_v = "0.8mm";
en.SrvAlum.s6_l = "Surface Quality"; en.SrvAlum.s6_v = "Ra 1.6 – 3.2";
en.SrvAlum.c1_t = "Micron Precision"; en.SrvAlum.c1_d = "Excellent cut quality including complex geometries within ±0.05mm tolerance.";
en.SrvAlum.c2_t = "High Speed"; en.SrvAlum.c2_d = "5x faster cutting than standard methods utilizing 6000W fiber laser.";
en.SrvAlum.c3_t = "Oxide-Free Cut"; en.SrvAlum.c3_d = "Oxidation is prevented using nitrogen gas, leading to perfect surface quality for painting/coating.";
en.SrvAlum.c4_t = "Fast Delivery"; en.SrvAlum.c4_d = "Standard orders in 3-5 days, express orders ready in 24-48 hours.";

// Sheet
tr.SrvSheet.s1_l = "Kesim Hassasiyeti"; tr.SrvSheet.s1_v = "±0.03mm";
tr.SrvSheet.s2_l = "Maks. Plaka Boyutu"; tr.SrvSheet.s2_v = "4000 × 2000mm";
tr.SrvSheet.s3_l = "Lazer Gücü"; tr.SrvSheet.s3_v = "12000W Fiber";
tr.SrvSheet.s4_l = "Min. Dxf Boşluğu"; tr.SrvSheet.s4_v = "Sac Kalınlığı Kadar";
tr.SrvSheet.s5_l = "Kesim Gazları"; tr.SrvSheet.s5_v = "Oksijen / Azot / Hava";
tr.SrvSheet.s6_l = "Kapasite"; tr.SrvSheet.s6_v = "Günlük 15 Ton";
tr.SrvSheet.c1_t = "Kalın Sac Kesimi"; tr.SrvSheet.c1_d = "12kW lazer gücü sayesinde 30mm siyah sac ve 20mm paslanmaz çeliği pürüzsüz ve çapaksız kesiyoruz.";
tr.SrvSheet.c2_t = "Lazer Boru Kesim"; tr.SrvSheet.c2_d = "Sadece plaka bağlamıyor, entegre rotasyon ekseniyle dairesel ve kare profillerin de hassas kesimini yapıyoruz.";
tr.SrvSheet.c3_t = "Ekonomik Nesting"; tr.SrvSheet.c3_d = "Gelişmiş CAD/CAM yazılımlarıyla parçalarınızı plakaya en uygun şekilde dizerek fire oranını %15'in altına düşürüyoruz.";
tr.SrvSheet.c4_t = "Entegre Hizmet"; tr.SrvSheet.c4_d = "Kesilen parçalarınızı abkant pres, kaynak ve elektrostatik boya bölümlerimizde tamamlanmış ürün haline getiriyoruz.";

en.SrvSheet.s1_l = "Cutting Precision"; en.SrvSheet.s1_v = "±0.03mm";
en.SrvSheet.s2_l = "Max Plate Size"; en.SrvSheet.s2_v = "4000 × 2000mm";
en.SrvSheet.s3_l = "Laser Power"; en.SrvSheet.s3_v = "12000W Fiber";
en.SrvSheet.s4_l = "Min Dxf Gap"; en.SrvSheet.s4_v = "Same as material thickness";
en.SrvSheet.s5_l = "Cutting Gases"; en.SrvSheet.s5_v = "Oxygen / Nitrogen / Air";
en.SrvSheet.s6_l = "Capacity"; en.SrvSheet.s6_v = "15 Tons / Day";
en.SrvSheet.c1_t = "Thick Sheet Cutting"; en.SrvSheet.c1_d = "Smooth, burr-free cuts on 30mm carbon steel and 20mm stainless steel utilizing 12kW laser power.";
en.SrvSheet.c2_t = "Laser Tube Cutting"; en.SrvSheet.c2_d = "Not only for flat plates! We precisely cut round and square tubes utilizing an integrated rotary axis.";
en.SrvSheet.c3_t = "Economic Nesting"; en.SrvSheet.c3_d = "Optimum placement with advanced CAD/CAM reduces material waste under 15%.";
en.SrvSheet.c4_t = "Integrated Service"; en.SrvSheet.c4_d = "We provide end-to-end service alongside press brake, welding, and electrostatic painting units.";

// Bending
tr.SrvBend.s1_l = "Maksimum Tonaj"; tr.SrvBend.s1_v = "320 Ton";
tr.SrvBend.s2_l = "Maksimum Boy"; tr.SrvBend.s2_v = "4000mm";
tr.SrvBend.s3_l = "Büküm Hassasiyeti"; tr.SrvBend.s3_v = "±0.2 Derece";
tr.SrvBend.s4_l = "Kontrol Ünitesi"; tr.SrvBend.s4_v = "Delem DA-66T 3D";
tr.SrvBend.s5_l = "Bombeleme"; tr.SrvBend.s5_v = "CNC Destekli Motorlu";
tr.SrvBend.s6_l = "Eksen Sayısı"; tr.SrvBend.s6_v = "Y1, Y2, X, R, Z1, Z2";
tr.SrvBend.c1_t = "3D Simülasyon"; tr.SrvBend.c1_d = "Büküm işlemi öncesinde parçalar 3D ortamda simüle edilir, çarpışma testleri yapılarak fire riski ortadan kaldırılır.";
tr.SrvBend.c2_t = "U & Z Bükümler"; tr.SrvBend.c2_d = "Geniş alt kalıp yelpazesi ve özel tasarımlı üst parçalarla (Gooseneck) dar açılı U ve Z formlarını rahatça büküyoruz.";
tr.SrvBend.c3_t = "Geniş Boyut Kapasitesi"; tr.SrvBend.c3_d = "4 metre uzunluğa kadar olan kalın gövde saclarını, şasi parçalarını esneme yapmadan tek bir hatta üretiyoruz.";
tr.SrvBend.c4_t = "İz Bırakmayan Kesim"; tr.SrvBend.c4_d = "Paslanmaz çelik ve alüminyum gibi hassas boyalı/kaplamalı saclarda, özel poliüretan filmler ile çiziksiz büküm.";

en.SrvBend.s1_l = "Max Tonnage"; en.SrvBend.s1_v = "320 Ton";
en.SrvBend.s2_l = "Max Length"; en.SrvBend.s2_v = "4000mm";
en.SrvBend.s3_l = "Bending Precision"; en.SrvBend.s3_v = "±0.2 Degree";
en.SrvBend.s4_l = "Control Unit"; en.SrvBend.s4_v = "Delem DA-66T 3D";
en.SrvBend.s5_l = "Crowning"; en.SrvBend.s5_v = "CNC Motorized";
en.SrvBend.s6_l = "Axis Count"; en.SrvBend.s6_v = "Y1, Y2, X, R, Z1, Z2";
en.SrvBend.c1_t = "3D Simulation"; en.SrvBend.c1_d = "Collision tests are performed in 3D environment before the actual bending process to eliminate scrap rate.";
en.SrvBend.c2_t = "U & Z Bends"; en.SrvBend.c2_d = "Easily bend deep U and Z forms utilizing an extensive die range and gooseneck punches.";
en.SrvBend.c3_t = "Large Format Capacity"; en.SrvBend.c3_d = "We process thick chassis and body sheets up to 4 meters continuously in a single flow without buckling.";
en.SrvBend.c4_t = "Mark-Free Bending"; en.SrvBend.c4_d = "Scratch-free operation on painted, stainless or delicate aluminum sheets using special urethane films.";

// Industry 40
tr.SrvInd.s1_t = "IoT Cihaz Entegrasyonu"; tr.SrvInd.s1_d = "Tüm CNC, Sensör ve PLC cihazlarınızı tek bir haberleşme ağında bağlayarak üretim hattınızdan gerçek zamanlı veri topluyoruz.";
tr.SrvInd.s2_t = "Dijital İkiz (Digital Twin)"; tr.SrvInd.s2_d = "Fabrikanızın veya makinenizin sanal ortamdaki 3 boyutlu kopyasını oluşturarak, fiziki risk almadan simülasyon ve senaryo planlaması sunuyoruz.";
tr.SrvInd.s3_t = "Yapay Zeka & Görüntü İşleme"; tr.SrvInd.s3_d = "Kameralı yapay zeka destekli kalite kontrol sistemleri ile üretim hattındaki hatalı parçaları milisaniyeler içinde tespit ediyor ve ayırıyoruz.";
tr.SrvInd.s4_t = "Kestirimci Bakım"; tr.SrvInd.s4_d = "Makinelerin titreşim ve sıcaklık verilerini makine öğrenmesi algoritmaları ile analiz ederek, arıza oluşmadan önce bakım ekiplerini uyarıyoruz.";

en.SrvInd.s1_t = "IoT Device Integration"; en.SrvInd.s1_d = "We collect realtime data from your production line by networking all CNC, Sensors, and PLC devices.";
en.SrvInd.s2_t = "Digital Twin"; en.SrvInd.s2_d = "Providing simulations and scenario planning without physical risk by building an exact 3D replica of your plant.";
en.SrvInd.s3_t = "AI & Machine Vision"; en.SrvInd.s3_d = "Detecting and isolating defective parts within milliseconds through AI-driven computer vision quality control systems.";
en.SrvInd.s4_t = "Predictive Maintenance"; en.SrvInd.s4_d = "Analyzing machine vibrations and temperatures using ML models to alert maintenance teams strictly before failures occur.";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log('Dictionaries array translations populated.');
