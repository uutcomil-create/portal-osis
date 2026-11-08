import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, KeyRound, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, isUsingDefaultPassword } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Silakan masukkan kata sandi administrator.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Minor delay for polished feedback feel
    setTimeout(() => {
      const res = login(password);
      setIsSubmitting(false);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setPassword('');
      }
    }, 250);
  };

  const handleUseDefault = () => {
    setPassword('admin123');
    setErrorMessage(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
      onClick={closeLoginModal}
    >
      <div
        className="relative max-w-md w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Gradient Accent */}
        <div className="relative p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 text-center">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Tutup modal login"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-amber-400" />
            </div>
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 uppercase tracking-widest mb-1.5">
            Area Khusus Pengurus & Pembina
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Login Administrator OSIS
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Halaman publik dilindungi agar data resmi portal tidak dapat disunting sembarang pihak.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Kata Sandi / PIN Admin:</span>
              {isUsingDefaultPassword && (
                <button
                  type="button"
                  onClick={handleUseDefault}
                  className="text-[11px] text-amber-400 hover:underline"
                >
                  Isi sandi bawaan (admin123)
                </button>
              )}
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                autoFocus
                className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Notice Info */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Informasi Kredensial Pertama Kali</span>
            </div>
            <p className="leading-relaxed">
              Kata sandi awal adalah <code className="text-amber-400 font-mono font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">admin123</code>. Setelah berhasil masuk ke Dashboard Admin, Anda dapat mengganti kata sandi kapan saja di menu Keamanan.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={closeLoginModal}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Masuk Admin</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
