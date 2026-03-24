'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

// SEO is handled via metadata export – but this is a client component,
// so we export metadata separately via a layout or a server wrapper.
// For simplicity we keep this page server-safe by using default export only.

const contactInfo = [
  { icon: MapPin, label: 'Adres', value: 'Kartal, İstanbul / Türkiye', sub: 'Fabrika & Yazılım Merkezi' },
  { icon: Phone, label: 'Telefon', value: '+90 (552) 240 37 05', sub: 'Hafta içi 09:00 – 18:00', href: 'tel:+905522403705' },
  { icon: Mail, label: 'E-posta', value: 'official@sezkon.com', sub: '24 saat içinde yanıt', href: 'mailto:official@sezkon.com' },
  { icon: Clock, label: 'Çalışma Saatleri', value: 'Pzt – Cum: 09:00 – 18:00', sub: 'Cumartesi randevuyla' },
];

const services = [
  'Web Tasarım & E-Ticaret',
  'Özel Yazılım Geliştirme',
  'CNC İşleme & Lazer Kesim',
  'Endüstri 4.0 Entegrasyon',
  'Mobil Uygulama',
  'Diğer',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex flex-col items-center overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="w-full pt-36 pb-16 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px]" />
        <div className="container relative mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 italic mb-6">
            İletişim
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[1.05] mb-8">
            Projenizi{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Konuşalım
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto">
            Her büyüklükteki projeyi ele alıyoruz. Formu doldurun, uzmanlarımız 24 saat içinde sizinle iletişime geçsin.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <div key={i} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 border border-gray-100 hover:border-indigo-200">
                <div className="mb-4 p-3 bg-indigo-50 rounded-2xl text-indigo-600 w-fit group-hover:scale-105 transition-transform duration-300">
                  <item.icon size={22} />
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="font-bold text-gray-900 text-sm leading-snug block hover:text-indigo-600 transition-colors">{item.value}</a>
                ) : (
                  <p className="font-bold text-gray-900 text-sm leading-snug">{item.value}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-indigo-600" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Teşekkürler!</h3>
                    <p className="text-gray-600 font-light max-w-sm">
                      Mesajınız alındı. Ekibimiz 24 saat içinde sizinle iletişime geçecektir.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      Yeni Mesaj Gönder
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Bize Yazın</h2>
                    <p className="text-gray-500 font-light mb-8">Tüm alanları doldurun, en kısa sürede döneceğiz.</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Soyad *</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Adınız"
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta *</label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="ornek@sirket.com"
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Şirket Adı</label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={e => setForm({ ...form, company: e.target.value })}
                          placeholder="Şirketiniz (opsiyonel)"
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Hizmet Türü</label>
                        <select
                          value={form.service}
                          onChange={e => setForm({ ...form, service: e.target.value })}
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all bg-white"
                        >
                          <option value="">Hizmet seçin</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mesajınız *</label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          placeholder="Projenizi ve ihtiyaçlarınızı kısaca anlatın..."
                          className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300 text-lg"
                      >
                        Gönder <ArrowRight size={20} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick CTA */}
              <div className="bg-indigo-950 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-[40px]" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3">Hızlı Teklif</h3>
                  <p className="text-indigo-200/80 font-light text-sm mb-6 leading-relaxed">
                    Acil projeleriniz için doğrudan telefonla veya e-posta ile ulaşın.
                  </p>
                  <a
                    href="tel:+905522403705"
                    className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors"
                  >
                    <Phone size={16} /> Hemen Ara
                  </a>
                </div>
              </div>

              {/* Map Embed Placeholder */}
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-indigo-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">Kartal, İstanbul</p>
                  <a
                    href="https://maps.google.com/?q=Kartal,İstanbul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Haritada Gör <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Sık Sorulan Sorular</h4>
                {[
                  { q: 'Teklif almak ücretsiz mi?', a: 'Evet, teklifler tamamen ücretsizdir.' },
                  { q: 'Ne kadar sürede yanıt alırım?', a: 'İş günleri içinde 24 saat içinde yanıt veriyoruz.' },
                  { q: 'Küçük siparişler alıyor musunuz?', a: 'Evet, prototip ve küçük seri işleri de alıyoruz.' },
                ].map((faq, i) => (
                  <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{faq.q}</p>
                    <p className="text-xs text-gray-500 font-light">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
