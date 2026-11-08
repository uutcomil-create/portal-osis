import React from 'react';
import { ShieldCheck, LayoutDashboard, Database, LogOut, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useOsisData } from '../context/OsisDataContext';

interface AdminTopBarProps {
  onOpenDashboard: () => void;
  onOpenRosterEditor: () => void;
  onOpenBackendConfig: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  onOpenDashboard,
  onOpenRosterEditor,
  onOpenBackendConfig
}) => {
  const { isAdmin, logout } = useAdminAuth();
  const { dataSource } = useOsisData();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Bilah Administrator OSIS"
      className="fixed top-0 inset-x-0 z-50 bg-gradient-to-r from-amber-950/95 via-slate-950/95 to-amber-950/95 border-b border-amber-500/40 backdrop-blur-md text-slate-100 text-xs px-3 sm:px-6 py-2 shadow-xl shadow-black/60 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Admin Status Indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">MODE ADMINISTRATOR AKTIF</span>
            <span className="sm:hidden">ADMIN</span>
          </div>

          <span className="hidden md:inline text-slate-400 text-[11px] truncate">
            Akses penuh sunting pengurus, sekbid, profil & Google Sheets
          </span>
        </div>

        {/* Right: Quick Admin Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDashboard}
            className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-xs shadow-sm transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Admin</span>
          </button>

          <button
            onClick={onOpenRosterEditor}
            className="btn-interactive hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            title="Buka panel sunting 28 nama & kelas pengurus"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Roster</span>
          </button>

          <button
            onClick={onOpenBackendConfig}
            className="btn-interactive hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
            title="Kelola URL Google Apps Script & Google Sheets"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Sheets</span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                dataSource === 'google_sheets' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
          </button>

          <button
            onClick={logout}
            className="btn-interactive inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 hover:border-rose-500/50 text-xs font-semibold transition-colors"
            title="Keluar dari sesi administrator dan kembali ke mode publik"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
