import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Shield, Sparkles, Database, Lock, LayoutDashboard } from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';
import { useAdminAuth } from '../context/AdminAuthContext';

interface NavbarProps {
  onOpenDashboard?: () => void;
  onOpenRosterEditor?: () => void;
  onOpenBackendConfig?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDashboard,
  onOpenRosterEditor,
  onOpenBackendConfig
}) => {
  const { dataSource } = useOsisData();
  const { isAdmin, openLoginModal } = useAdminAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['beranda', 'profil', 'struktur', 'pengurus', 'sekbid', 'program', 'galeri', 'kontak'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#beranda', id: 'beranda' },
    { label: 'Profil', href: '#profil', id: 'profil' },
    { label: 'Struktur', href: '#struktur', id: 'struktur' },
    { label: 'Pengurus (28)', href: '#pengurus', id: 'pengurus' },
    { label: '10 Sekbid', href: '#sekbid', id: 'sekbid' },
    { label: 'Program Kerja', href: '#program', id: 'program' },
    { label: 'Galeri', href: '#galeri', id: 'galeri' },
    { label: 'Kontak', href: '#kontak', id: 'kontak' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-slate-950/92 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Clean Brand Wordmark */}
          <a
            href="#beranda"
            className="flex items-center gap-3 text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 group btn-interactive"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white leading-none">
                OSIS SPENSA
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-amber-400/90 mt-0.5">
                SMPN 1 Ungaran
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs xl:text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors duration-200 whitespace-nowrap shrink-0 relative py-1 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isAdmin ? (
              <>
                {onOpenDashboard && (
                  <button
                    onClick={onOpenDashboard}
                    className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm whitespace-nowrap shrink-0 transition-colors"
                    title="Buka Dashboard Pusat Pengelolaan Administrator"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Dashboard Admin</span>
                  </button>
                )}

                {onOpenBackendConfig && (
                  <button
                    onClick={onOpenBackendConfig}
                    className="btn-interactive hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
                    title="Integrasi Backend Google Apps Script & Google Sheets"
                  >
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sheets</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        dataSource === 'google_sheets' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                      }`}
                    />
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={openLoginModal}
                className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-amber-500/30 hover:border-amber-400/60 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
                title="Area Pengurus & Pembina OSIS (Halaman publik terproteksi read-only)"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Akses Admin</span>
              </button>
            )}

            <a
              href="#kontak"
              className="btn-interactive inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-500/20 whitespace-nowrap shrink-0"
            >
              <span>Hubungi OSIS</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </a>

            {/* 9. Animated Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-interactive p-2.5 text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl lg:hidden transition-colors relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
            >
              {/* Top line */}
              <span
                className={`w-5 h-0.5 bg-amber-400 rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              {/* Middle line */}
              <span
                className={`w-5 h-0.5 bg-amber-400 rounded-full transition-all duration-200 ease-out ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              {/* Bottom line */}
              <span
                className={`w-5 h-0.5 bg-amber-400 rounded-full transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Smooth Slide & Fade Down */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[60px] bg-slate-950/98 border-b border-amber-500/25 backdrop-blur-xl px-6 py-6 shadow-2xl transition-all duration-300 ease-out origin-top ${
          mobileMenuOpen
            ? 'opacity-100 scale-y-100 pointer-events-auto'
            : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3">
          <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest px-2 mb-1">
            Menu Navigasi Portal
          </div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`btn-interactive px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-amber-400/15 text-amber-300 font-semibold border-l-2 border-amber-400'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 mt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {isAdmin ? (
              <>
                {onOpenDashboard && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="btn-interactive w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Buka Dashboard Admin</span>
                  </button>
                )}

                {onOpenRosterEditor && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenRosterEditor();
                    }}
                    className="btn-interactive w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Sunting Roster Pengurus</span>
                  </button>
                )}

                {onOpenBackendConfig && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBackendConfig();
                    }}
                    className="btn-interactive w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg"
                  >
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>Integrasi Google Sheets</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal();
                }}
                className="btn-interactive w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Login Administrator / Pengurus</span>
              </button>
            )}

            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-interactive w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg text-center"
            >
              <span>Kirim Pesan & Saran</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
