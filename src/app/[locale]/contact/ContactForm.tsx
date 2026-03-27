'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

// JSON dosyanızdaki "services" anahtarlarıyla birebir eşleşmeli
const serviceKeys = ['web', 'software', 'cnc', 'industry4', 'mobile', 'other'] as const;

export default function ContactForm() {
  const t = useTranslations('Contact');
  
  // State Yönetimi
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    service: '', 
    message: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to send');

      // Başarılı gönderim
      setSubmitted(true);
      setForm({ name: '', email: '', company: '', service: '', message: '' });
    } catch (err) {
      // Hata durumunda kullanıcıya gösterilecek mesaj
      setError(t('error_msg') || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- BAŞARI EKRANI ---
  if (submitted) {
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 border border-gray-100 shadow-xl text-center animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center py-12 gap-6">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center shadow-inner">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">
            {t('succ_title')}
          </h3>
          <p className="text-gray-500 font-light max-w-sm leading-relaxed">
            {t('succ_desc')}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95"
          >
            {t('succ_btn')}
          </button>
        </div>
      </div>
    );
  }

  // --- FORM EKRANI ---
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
      {/* Arkaplan Süslemesi */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />
      
      <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
        {t('form_title')}
      </h2>
      <p className="text-gray-500 font-light mb-8 italic">
        {t('form_desc')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* İsim & Email Satırı */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">{t('lbl_name')}</label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('ph_name')}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">{t('lbl_email')}</label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@company.com"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Şirket & Hizmet Satırı */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">{t('lbl_company')}</label>
            <input
              type="text"
              disabled={isSubmitting}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder={t('ph_company')}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all placeholder:text-gray-300 disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">{t('lbl_service')}</label>
            <select
              required
              disabled={isSubmitting}
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all bg-white appearance-none cursor-pointer disabled:opacity-50"
            >
              <option value="" disabled>{t('ph_service')}</option>
              {serviceKeys.map((key) => (
                <option key={key} value={t(`services.${key}`)}>
                  {t(`services.${key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mesaj Alanı */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">{t('lbl_msg')}</label>
          <textarea
            required
            rows={4}
            disabled={isSubmitting}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t('ph_msg')}
            className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 outline-none transition-all resize-none placeholder:text-gray-300 disabled:opacity-50"
          />
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300 text-lg disabled:bg-gray-400 disabled:translate-y-0 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              {t('btn_sending') || 'Sending...'}
            </>
          ) : (
            <>
              {t('btn_send')} <ArrowRight size={22} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}