import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

async function initDatabase() {
  console.log('🔗 MySQL bağlantısı kuruluyor...');
  
  // First connect without database to create it
  const tempConn = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    charset: 'utf8mb4',
  });

  const dbName = process.env.DATABASE_NAME || 'sezkon';

  // Create database if not exists
  await tempConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  console.log(`` + `✅ Veritabanı "${dbName}" oluşturuldu/mevcut.`);
  await tempConn.end();

  // Reconnect with database specified
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '1234',
    database: dbName,
    charset: 'utf8mb4',
    multipleStatements: true,
  });

  // Create blogs table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(500) NOT NULL UNIQUE,
      excerpt TEXT,
      content LONGTEXT,
      cover_image VARCHAR(1000) DEFAULT NULL,
      category VARCHAR(200) DEFAULT NULL,
      author VARCHAR(200) DEFAULT 'Sezkon',
      read_time VARCHAR(50) DEFAULT '5 dk',
      is_featured TINYINT(1) DEFAULT 0,
      is_published TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_slug (slug),
      INDEX idx_published (is_published),
      INDEX idx_featured (is_featured),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('✅ "blogs" tablosu oluşturuldu/mevcut.');

  // Create admins table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) DEFAULT 'Admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('✅ "admins" tablosu oluşturuldu/mevcut.');

  // Check columns and add SEO fields to blogs if they do not exist
  const [columns] = await connection.query(
    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'blogs'",
    [dbName]
  );
  const columnNames = (columns as any[]).map((c) => c.COLUMN_NAME);

  if (!columnNames.includes('seo_title')) {
    await connection.query('ALTER TABLE blogs ADD COLUMN seo_title VARCHAR(500) DEFAULT NULL');
    console.log('✅ "seo_title" kolonu eklendi.');
  }
  if (!columnNames.includes('seo_description')) {
    await connection.query('ALTER TABLE blogs ADD COLUMN seo_description TEXT DEFAULT NULL');
    console.log('✅ "seo_description" kolonu eklendi.');
  }
  if (!columnNames.includes('focus_keyword')) {
    await connection.query('ALTER TABLE blogs ADD COLUMN focus_keyword VARCHAR(200) DEFAULT NULL');
    console.log('✅ "focus_keyword" kolonu eklendi.');
  }
  if (!columnNames.includes('seo_keywords')) {
    await connection.query('ALTER TABLE blogs ADD COLUMN seo_keywords VARCHAR(500) DEFAULT NULL');
    console.log('✅ "seo_keywords" kolonu eklendi.');
  }

  // Insert default administrator if admins is empty
  const [adminRows] = await connection.query('SELECT COUNT(*) as count FROM admins');
  const adminCount = (adminRows as any)[0].count;
  if (adminCount === 0) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sezkon.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    await connection.query(
      'INSERT INTO admins (email, password, name) VALUES (?, ?, ?)',
      [adminEmail, hashedPassword, 'Mehmet Sezer']
    );
    console.log(`✅ Varsayılan yönetici hesabı oluşturuldu (${adminEmail} / ${adminPassword}).`);
  }

  // Insert sample blog posts if table is empty
  const [rows] = await connection.query('SELECT COUNT(*) as count FROM blogs');
  const count = (rows as any)[0].count;

  if (count === 0) {
    console.log('📝 Örnek blog yazıları ekleniyor...');
    
    await connection.query(`
      INSERT INTO blogs (title, slug, excerpt, content, category, author, read_time, is_featured, is_published, seo_title, seo_description, focus_keyword, seo_keywords) VALUES
      (
        'Bulut Tabanlı ERP Sistemlerinde Yapay Zeka Devrimi',
        'bulut-tabanli-erp-yapay-zeka',
        'Kurumsal kaynak planlama sistemlerinde makine öğrenimi algoritmaları ile talep tahminlemesi ve akıllı envanter kontrolü süreçlerini inceliyoruz.',
        '<h2>ERP ve Yapay Zeka: Geleceğin İş Modeli</h2><p>Günümüzde kurumsal kaynak planlama (ERP) sistemleri, yapay zeka ve makine öğrenimi teknolojileri ile entegre edilerek işletmelere benzersiz avantajlar sunmaktadır.</p><h3>Talep Tahminlemesi</h3><p>Makine öğrenimi algoritmaları, geçmiş satış verilerini analiz ederek gelecekteki talebi yüksek doğrulukla tahmin edebilir. Bu sayede stok maliyetleri düşürülürken müşteri memnuniyeti artırılır.</p><h3>Akıllı Envanter Yönetimi</h3><p>AI destekli envanter yönetimi, minimum stok seviyelerini otomatik olarak belirler ve tedarik zinciri optimizasyonunu sağlar.</p><p>Sezkon olarak, müşterilerimize bu teknolojileri entegre eden özel ERP çözümleri sunuyoruz.</p>',
        'ERP & Yapay Zeka',
        'Mehmet Sezer',
        '6 dk',
        1,
        1,
        'ERP ve Yapay Zeka Devrimi | Sezkon',
        'Bulut tabanlı ERP sistemlerinde yapay zeka entegrasyonu ve makine öğrenimi ile kurumsal süreçlerin optimizasyonunu inceleyin.',
        'ERP yapay zeka',
        'erp, yapay zeka, bulut erp, makine ogrenimi'
      ),
      (
        'CRM Sistemlerinde KVKK ve Müşteri Verisi Güvenliği',
        'crm-kvkk-veri-guvenligi',
        'Müşteri ilişkileri yönetiminde veri tabanı şifreleme yöntemleri, RBAC yetkilendirmesi ve KVKK uyumluluğunda kritik adımlar.',
        '<h2>KVKK Uyumlu CRM Sistemleri</h2><p>Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında CRM sistemlerinin veri güvenliği kritik önem taşımaktadır.</p><h3>Veri Şifreleme</h3><p>AES-256 şifreleme standardı ile müşteri verilerinin hem aktarım sırasında hem de depolama aşamasında korunması sağlanmalıdır.</p><h3>Rol Tabanlı Erişim Kontrolü (RBAC)</h3><p>Her kullanıcının yalnızca yetkili olduğu verilere erişebilmesi, veri güvenliğinin temel taşlarından biridir.</p>',
        'Güvenlik & CRM',
        'Mehmet Sezer',
        '4 dk',
        0,
        1,
        'CRM Sistemlerinde KVKK ve Veri Güvenliği | Sezkon',
        'CRM sistemlerinde KVKK uyumluluğu, veri şifreleme yöntemleri ve yetkilendirme süreçleri hakkında kapsamlı rehber.',
        'CRM KVKK veri güvenliği',
        'crm, kvkk, veri guvenligi, aes-256'
      ),
      (
        'Kurumsal Entegrasyonda REST mi Yoksa GraphQL mi?',
        'rest-vs-graphql-kurumsal-entegrasyon',
        'Büyük ölçekli veri alışverişlerinde REST ve GraphQL API mimarilerinin performans ve gecikme karşılaştırması.',
        '<h2>API Mimarisi Seçimi</h2><p>Kurumsal uygulamalarda doğru API mimarisinin seçilmesi, sistem performansını ve geliştirme hızını doğrudan etkiler.</p><h3>REST API</h3><p>Olgunluğu, geniş ekosistemi ve basitliği ile REST, hâlâ en yaygın kullanılan API standardıdır.</p><h3>GraphQL</h3><p>Facebook tarafından geliştirilen GraphQL, istemcinin tam olarak ihtiyaç duyduğu veriyi sorgulamasına olanak tanır ve over-fetching sorununu ortadan kaldırır.</p><h3>Hangisini Seçmelisiniz?</h3><p>Basit CRUD işlemleri için REST, karmaşık ve ilişkisel veri yapıları için GraphQL daha uygun olabilir.</p>',
        'API & Entegrasyon',
        'Sezkon Dev Team',
        '5 dk',
        0,
        1,
        'Kurumsal Entegrasyonda REST ve GraphQL Karşılaştırması | Sezkon',
        'Kurumsal entegrasyon süreçlerinde REST ve GraphQL API mimarilerinin performans ve verimlilik karşılaştırması.',
        'REST GraphQL karşılaştırma',
        'rest, graphql, api, entegrasyon'
      )
    `);
    console.log('✅ 3 örnek blog yazısı eklendi.');
  }

  await connection.end();
  console.log('🎉 Veritabanı başlatma tamamlandı!');
}

initDatabase().catch((err) => {
  console.error('❌ Veritabanı hatası:', err);
  process.exit(1);
});

