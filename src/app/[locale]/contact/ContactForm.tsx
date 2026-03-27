'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const serviceKeys = ['web', 'software', 'cnc', 'industry4', 'mobile', 'other'];

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada gerçek form gönderme işlemi yapılabilir (fetch vs.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-indigo-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">{t('succ_title')}</h3>
          <p className="text-gray-600 font-light max-w-sm">{t('succ_desc')}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
          >
            {t('succ_btn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">{t('form_title')}</h2>
      <p className="text-gray-500 font-light mb-8">{t('form_desc')}</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl_name')}</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('ph_name')}
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl_email')}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ornek@sirket.com"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl_company')}</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder={t('ph_company')}
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl_service')}</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all bg-white"
          >
            <option value="">{t('ph_service')}</option>
            {serviceKeys.map((key) => (
              <option key={key} value={t(`services.${key}`)}>
                {t(`services.${key}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">{t('lbl_msg')}</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t('ph_msg')}
            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-gray-800 font-medium transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300 text-lg"
        >
          {t('btn_send')} <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}