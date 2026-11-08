import React, { useState } from 'react';
import { Shield, Heart, ArrowUp, Edit3, Check, Database, Lock, LayoutDashboard } from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';
import { useAdminAuth } from '../context/AdminAuthContext';

interface FooterProps {
  onOpenDashboard?: () => void;
  onOpenRosterEditor?: () => void;
  onOpenBackendConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDashboard,
  onOpenRosterEditor,
  onOpenBackendConfig
}) => {
  const { data, updateProfil } = useOsisData();
  const { isAdmin, openLoginModal } = useAdminAuth();
  const tahunKepengurusan = data.profil?.masaBakti || '2025/2026';
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [tempYear, setTempYear] = useState(tahunKepengurusan);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveYear = () => {
    if (tempYear.trim()) {
      updateProfil({ masaBakti: tempYear.trim() });
    }
    setIsEditingYear(false);
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-white block">
                  PORTAL DIGITAL OSIS
                </span>
                <span className="text-xs text-amber-400 font-semibold tracking-wide">
                  SMP NEGERI 1 UNGARAN
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Organisasi Siswa Intra Sekolah sebagai garda terdepan pembinaan budi pekerti luhur, kepemimpinan demokratis, kreativitas, dan prestasi akademik serta non-akademik di Kabupaten Semarang.
            </p>

            {/* School Year Badge */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-slate-400 font-medium">Masa Bakti:</span>
              {isAdmin ? (
                isEditingYear ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempYear}
                      onChange={(e) => setTempYear(e.target.value)}
                      placeholder="2025/2026"
                      className="px-2 py-1 rounded bg-slate-900 border border-amber-400 text-amber-300 text-xs w-24 font-bold focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveYear}
                      className="p-1 rounded bg-amber-400 text-slate-950 hover:bg-amber-300"
                      title="Simpan tahun kepengurusan"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
                    <span>{tahunKepengurusan}</span>
                    <button
                      onClick={() => {
                        setTempYear(tahunKepengurusan);
                        setIsEditingYear(true);
                      }}
                      className="text-slate-400 hover:text-amber-300 ml-1"
                      title="Edit tahun kepengurusan"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                )
              ) : (
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
                  <span>{tahunKepengurusan}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#beranda" className="hover:text-amber-400 transition-colors">
                  Beranda Portal
                </a>
              </li>
              <li>
                <a href="#profil" className="hover:text-amber-400 transition-colors">
                  Profil & Visi Misi
                </a>
              </li>
              <li>
                <a href="#struktur" className="hover:text-amber-400 transition-colors">
                  Bagan Struktur Organisasi
                </a>
              </li>
              <li>
                <a href="#pengurus" className="hover:text-amber-400 transition-colors">
                  Daftar 28 Pengurus
                </a>
              </li>
              <li>
                <a href="#sekbid" className="hover:text-amber-400 transition-colors">
                  10 Seksi Bidang (Sekbid)
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-amber-400 transition-colors">
                  Program Kerja & Agenda
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-amber-400 transition-colors">
                  Galeri Foto Kegiatan
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Contact & Legal */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Informasi Resmi
            </h4>
            <div className="space-y-1.5 text-slate-400">
              <p>SMP Negeri 1 Ungaran</p>
              <p>NPSN: 20320475 · Akreditasi A</p>
              <p>Jl. Diponegoro No. 147, Ungaran, Kab. Semarang</p>
              <p>Jawa Tengah, Indonesia 50511</p>
            </div>

            <div className="pt-2 flex flex-col items-start gap-2">
              {isAdmin ? (
                <>
                  {onOpenDashboard && (
                    <button
                      onClick={onOpenDashboard}
                      className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Buka Dashboard Admin</span>
                    </button>
                  )}

                  {onOpenRosterEditor && (
                    <button
                      onClick={onOpenRosterEditor}
                      className="text-slate-300 hover:text-white font-medium inline-flex items-center gap-1.5 transition-colors text-xs"
                    >
                      <span>Editor Roster Pengurus</span>
                    </button>
                  )}

                  {onOpenBackendConfig && (
                    <button
                      onClick={onOpenBackendConfig}
                      className="text-slate-400 hover:text-amber-400 font-medium inline-flex items-center gap-1.5 transition-colors text-xs"
                    >
                      <Database className="w-3.5 h-3.5 text-amber-400" />
                      <span>Integrasi Backend Google Sheets</span>
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="btn-interactive text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1.5 transition-colors text-xs py-1"
                  title="Masuk sebagai Administrator OSIS"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Akses Administrator (Login Pengurus)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left text-slate-500">
            <p>
              © {new Date().getFullYear()} OSIS SMP Negeri 1 Ungaran. Hak Cipta Dilindungi.
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Dikembangkan oleh Tim IT Sekbid 09 (Teknologi Informasi & Komunikasi) OSIS Spensa.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            aria-label="Kembali ke atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
