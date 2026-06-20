'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Mail, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Giriş başarısız');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left Column: Real-world Office Background (Visible on lg screens) */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end p-20 select-none bg-cover bg-center border-r border-slate-200" 
        style={{ backgroundImage: "url('/images/login_workspace.png')" }}
      >
        {/* Semi-transparent dark overlay to guarantee text readability */}
        <div className="absolute inset-0 bg-slate-950/70 z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 z-15 pointer-events-none" />
        
        {/* Branding text content, positioned at the bottom left */}
        <div className="relative z-20 max-w-xl text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-wider backdrop-blur-md border border-white/15">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Sezkon Bulut Kontrolü</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Dijital Dönüşümünüzü Kolaylaştırın
          </h2>
          <p className="text-white text-base md:text-lg leading-relaxed font-medium opacity-90">
            Yapay zeka entegrasyonlu modüllerimiz, SEO analiz araçlarımız ve zengin editörümüzle kurumsal bloglarınızı ve içeriklerinizi tek bir noktadan kolayca yönetin.
          </p>
        </div>
      </div>

      {/* Right Column: Corporate Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 bg-white relative z-10">
        <div className="w-full max-w-lg space-y-8">
          
          {/* Top Secure Connection Badge */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6191c4] to-[#8b5cf6] flex items-center justify-center shadow-md">
                <Lock className="text-white" size={16} />
              </span>
              <span className="font-black text-slate-800 text-base tracking-tight">Sezkon Kurumsal</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
              <ShieldCheck size={16} />
              <span>Güvenli Bağlantı (SSL)</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-left space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Yönetim Paneli Girişi
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
              Lütfen kurumsal erişim bilgilerinizi giriniz.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-extrabold text-slate-600 uppercase tracking-wider block">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sezkon.com"
                  className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6191c4] focus:bg-white transition-all text-base font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-extrabold text-slate-600 uppercase tracking-wider block">
                Giriş Şifresi
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 md:py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6191c4] focus:bg-white transition-all text-base font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Toggles */}
            <div className="flex items-center justify-between text-sm md:text-base pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    rememberMe ? 'bg-[#6191c4] border-[#6191c4] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {rememberMe && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-slate-500 font-semibold">Beni Hatırla</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Lütfen yöneticinizle veya sistem yöneticisiyle iletişime geçin.')}
                className="text-[#6191c4] hover:underline font-extrabold cursor-pointer"
              >
                Şifremi Unuttum?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3.5 rounded-xl text-sm font-semibold text-center leading-relaxed">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#6191c4] to-[#8b5cf6] text-white font-extrabold rounded-xl hover:shadow-lg hover:shadow-[#6191c4]/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2.5 text-base md:text-lg cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <span>Sisteme Giriş Yap</span>
              )}
            </button>
          </form>

          {/* Footer Branding & Status Links */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>© 2026 Sezkon Bilgi Teknolojileri</span>
            <div className="flex gap-3">
              <a href="/tr" className="hover:text-slate-600 transition-colors font-semibold">Ana Sayfa ↗</a>
              <span>•</span>
              <button onClick={() => alert('Tüm sistemler aktif durumdadır.')} className="hover:text-slate-600 transition-colors font-semibold">Sistem Durumu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
