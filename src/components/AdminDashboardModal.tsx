import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Users,
  FolderTree,
  School,
  CalendarCheck,
  Database,
  Lock,
  LogOut,
  Save,
  Check,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Search,
  Plus,
  Trash2,
  Edit2,
  Eye,
  KeyRound,
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Pengurus } from '../data/pengurusData';
import { SekbidItem, ProgramKerjaSekbid } from '../data/sekbidData';
import { ProgramKerja } from '../data/programKerjaData';
import { OsisProfil } from '../data/osisCentralData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRosterEditor: () => void;
  onOpenBackendConfig: () => void;
}

type DashboardTab = 'ikhtisar' | 'pengurus' | 'sekbid' | 'profil' | 'program' | 'sheets' | 'keamanan';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenRosterEditor,
  onOpenBackendConfig
}) => {
  const {
    data,
    validation,
    updatePengurus,
    updateSinglePengurus,
    updateSekbid,
    updateSingleSekbid,
    updateProfil,
    updateProgramKerja,
    resetToDefault,
    dataSource,
    gasUrl,
    syncFromGoogleSheets,
    syncStatus,
    syncMessage,
    lastSyncedAt
  } = useOsisData();

  const { logout, changePassword, isUsingDefaultPassword } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<DashboardTab>('ikhtisar');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // --- Sub-states for Editing Pengurus ---
  const [pengurusSearch, setPengurusSearch] = useState('');
  const [pengurusCategory, setPengurusCategory] = useState<'Semua' | 'BPH' | 'Sekbid 1-5' | 'Sekbid 6-10'>('Semua');
  const [editingPengurus, setEditingPengurus] = useState<Pengurus | null>(null);

  // --- Sub-states for Editing Sekbid ---
  const [selectedSekbidIndex, setSelectedSekbidIndex] = useState<number>(0);
  const [editingSekbid, setEditingSekbid] = useState<SekbidItem | null>(() =>
    data.sekbid[0] ? JSON.parse(JSON.stringify(data.sekbid[0])) : null
  );

  // --- Sub-states for Editing Profil ---
  const [profilForm, setProfilForm] = useState<OsisProfil>(() => ({ ...data.profil }));
  const [newMisiText, setNewMisiText] = useState('');

  // --- Sub-states for Program Kerja ---
  const [editingProkerList, setEditingProkerList] = useState<ProgramKerja[]>(() => [...data.programKerja]);
  const [prokerSearch, setProkerSearch] = useState('');

  // --- Sub-states for Password Change ---
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // 1. Save Edited Pengurus
  const handleSavePengurus = (p: Pengurus) => {
    const res = updateSinglePengurus(p);
    if (res.success) {
      showNotification(`Data ${p.jabatan} (${p.nama}) berhasil diperbarui!`);
      setEditingPengurus(null);
    } else {
      alert(`Gagal menyimpan: ${res.errors.join(', ')}`);
    }
  };

  // 2. Save Sekbid
  const handleSaveSekbid = () => {
    if (!editingSekbid) return;
    updateSingleSekbid(editingSekbid);
    showNotification(`Perubahan pada ${editingSekbid.nomor} berhasil disimpan!`);
  };

  // 3. Save Profil
  const handleSaveProfil = () => {
    updateProfil(profilForm);
    showNotification('Data Profil & Identitas OSIS berhasil diperbarui!');
  };

  // 4. Save Proker
  const handleSaveProkerList = () => {
    updateProgramKerja(editingProkerList);
    showNotification('Daftar Program Kerja berhasil disimpan!');
  };

  const handleAddProker = () => {
    const newId = `prog-${Date.now().toString().slice(-4)}`;
    const newProker: ProgramKerja = {
      id: newId,
      judul: 'Program Baru OSIS',
      sekbidId: 1,
      sekbidNama: 'Sekbid 01: Keimanan & Ketaqwaan',
      kategori: 'Program Unggulan',
      status: 'Rencana Kerja',
      periode: 'Semester Genap',
      sasaran: 'Seluruh Siswa',
      deskripsi: 'Deskripsi rencana kegiatan program baru.',
      indikatorKeberhasilan: 'Target ketercapaian kegiatan.'
    };
    setEditingProkerList([newProker, ...editingProkerList]);
  };

  const handleDeleteProker = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus program kerja ini?')) {
      const updated = editingProkerList.filter((p) => p.id !== id);
      setEditingProkerList(updated);
      updateProgramKerja(updated);
      showNotification('Program kerja berhasil dihapus.');
    }
  };

  // 5. Change Password
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ success: false, text: 'Konfirmasi kata sandi baru tidak cocok.' });
      return;
    }
    const res = changePassword(oldPassword, newPassword);
    setPasswordMsg({ success: res.success, text: res.message });
    if (res.success) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showNotification('Kata sandi administrator berhasil diubah!');
    }
  };

  // 6. Backup & Restore Data
  const handleDownloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute('download', `backup_osis_spensa_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('File cadangan JSON berhasil diunduh!');
  };

  const handleUploadRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.pengurus && parsed.sekbid && parsed.profil) {
          if (confirm('Konfirmasi: Timpa seluruh data portal dengan file cadangan ini?')) {
            updatePengurus(parsed.pengurus);
            updateSekbid(parsed.sekbid);
            updateProfil(parsed.profil);
            if (parsed.programKerja) updateProgramKerja(parsed.programKerja);
            showNotification('Seluruh data berhasil dipulihkan dari cadangan!');
          }
        } else {
          alert('Format file JSON tidak sesuai dengan skema data OSIS SPENSA.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON. Pastikan file tidak rusak.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered Pengurus for table
  const filteredPengurus = data.pengurus.filter((p) => {
    const matchCat = pengurusCategory === 'Semua' ? true : p.kategori === pengurusCategory;
    const q = pengurusSearch.toLowerCase().trim();
    const matchQ =
      !q ||
      p.nama.toLowerCase().includes(q) ||
      p.jabatan.toLowerCase().includes(q) ||
      p.kelas.toLowerCase().includes(q) ||
      p.fotoFileName.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-6xl h-[94vh] bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Toast Alert */}
        {successToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs sm:text-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Modal Top Bar */}
        <header className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Dashboard Administrator OSIS
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Panel Terkunci
                </span>
              </div>
              <p className="text-xs text-slate-400">
                SMP Negeri 1 Ungaran · Publik hanya memiliki akses lihat (read-only)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold"
              title="Keluar dari akun admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={onClose}
              className="btn-interactive p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Tutup dashboard admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Shell: Sidebar Nav & Main Workspace */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
            {[
              { id: 'ikhtisar', label: 'Ringkasan & Status', icon: LayoutDashboard },
              { id: 'pengurus', label: 'Kelola 28 Pengurus', icon: Users, badge: '28' },
              { id: 'sekbid', label: 'Kelola 10 Sekbid', icon: FolderTree, badge: '10' },
              { id: 'profil', label: 'Identitas & Profil', icon: School },
              { id: 'program', label: 'Program Kerja', icon: CalendarCheck, badge: `${data.programKerja.length}` },
              { id: 'sheets', label: 'Google Sheets & Backup', icon: Database },
              { id: 'keamanan', label: 'Keamanan & Akun', icon: Lock }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as DashboardTab)}
                  className={`btn-interactive flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="hidden md:block mt-auto pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 px-2 space-y-1">
              <div>Penyimpanan: <span className="text-amber-400 font-bold">{dataSource}</span></div>
              <div>Versi Data: v2.5.0</div>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 bg-slate-900/60 p-4 sm:p-6 overflow-y-auto min-w-0">
            {/* TAB 1: IKHTISAR & STATUS */}
            {activeTab === 'ikhtisar' && (
              <div className="space-y-6 max-w-5xl">
                <div>
                  <h3 className="text-lg font-bold text-white">Status & Kendali Portal OSIS Spensa</h3>
                  <p className="text-xs text-slate-400">
                    Semua perubahan yang Anda buat di dashboard ini langsung terbarui di portal publik secara aman.
                  </p>
                </div>

                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Total Pengurus</span>
                      <Users className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">28/28</div>
                    <div className="text-[11px] text-emerald-400 mt-1">Lengkap & Tervalidasi</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Seksi Bidang</span>
                      <FolderTree className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">10 Sekbid</div>
                    <div className="text-[11px] text-emerald-400 mt-1">Bidang 01 s/d 10 Aktif</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Program Kerja</span>
                      <CalendarCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{data.programKerja.length}+</div>
                    <div className="text-[11px] text-slate-400 mt-1">Agenda Kepengurusan</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Google Sheets</span>
                      <Database className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {gasUrl ? 'Terkoneksi' : 'Lokal (Siap)'}
                    </div>
                    <div className="text-[11px] text-amber-300 mt-1 truncate">
                      {lastSyncedAt ? `Sync: ${lastSyncedAt}` : 'Belum sync online'}
                    </div>
                  </div>
                </div>

                {/* Quick Action Cards */}
                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Aksi Cepat Administrator</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <button
                      onClick={onOpenRosterEditor}
                      className="btn-interactive p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-amber-400/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-amber-300 font-bold text-xs mb-1">
                        <span>Editor Roster Cepat</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Sunting nama & kelas 28 anggota dalam satu tabel ringkas.
                      </p>
                    </button>

                    <button
                      onClick={onOpenBackendConfig}
                      className="btn-interactive p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-amber-400/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-amber-300 font-bold text-xs mb-1">
                        <span>Kelola Google Sheets</span>
                        <Database className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Pengaturan Apps Script agar terhubung dengan spreadsheet sekolah.
                      </p>
                    </button>

                    <button
                      onClick={handleDownloadBackup}
                      className="btn-interactive p-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 hover:border-amber-400/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-emerald-300 font-bold text-xs mb-1">
                        <span>Cadangkan Data (JSON)</span>
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Unduh salinan data seluruh profil, pengurus, dan sekbid.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Validation Info */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300">
                      Integritas Data: <strong className="text-white">Valid</strong> (28 pengurus unik, 10 sekbid terdaftar).
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">Mode Publik: Read-Only Proteksi</span>
                </div>
              </div>
            )}

            {/* TAB 2: KELOLA 28 PENGURUS */}
            {activeTab === 'pengurus' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">Kelola 28 Pengurus OSIS</h3>
                    <p className="text-xs text-slate-400">
                      Sunting data nama, kelas, jabatan, tugas, motto, dan nama file gambar pengurus.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onOpenRosterEditor}
                      className="btn-interactive inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mode Editor Spreadsheet</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={pengurusSearch}
                      onChange={(e) => setPengurusSearch(e.target.value)}
                      placeholder="Cari nama, jabatan, kelas..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center gap-1 self-start sm:self-auto overflow-x-auto">
                    {(['Semua', 'BPH', 'Sekbid 1-5', 'Sekbid 6-10'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setPengurusCategory(cat)}
                        className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                          pengurusCategory === cat
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table of Members */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                        <th className="p-3 w-12 text-center">No</th>
                        <th className="p-3">Jabatan</th>
                        <th className="p-3">Nama Lengkap</th>
                        <th className="p-3 w-20">Kelas</th>
                        <th className="p-3">File Foto</th>
                        <th className="p-3 w-24 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {filteredPengurus.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3 text-center text-slate-500 font-mono font-bold">
                            #{p.nomorUrut < 10 ? `0${p.nomorUrut}` : p.nomorUrut}
                          </td>
                          <td className="p-3 font-semibold text-amber-300">{p.jabatan}</td>
                          <td className="p-3 font-medium text-white">{p.nama}</td>
                          <td className="p-3 text-slate-300 font-mono">{p.kelas}</td>
                          <td className="p-3 font-mono text-[11px] text-emerald-400">
                            /images/{p.fotoFileName}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setEditingPengurus({ ...p })}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Sunting</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Edit Single Pengurus Modal Dialog */}
                {editingPengurus && (
                  <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
                  >
                    <div className="relative max-w-lg w-full bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="font-bold text-white text-base">
                          Sunting Data Pengurus #{editingPengurus.nomorUrut}
                        </h4>
                        <button
                          onClick={() => setEditingPengurus(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-slate-400 font-semibold block mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            value={editingPengurus.nama}
                            onChange={(e) =>
                              setEditingPengurus({ ...editingPengurus, nama: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-semibold focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-400 font-semibold block mb-1">Jabatan</label>
                            <input
                              type="text"
                              value={editingPengurus.jabatan}
                              onChange={(e) =>
                                setEditingPengurus({ ...editingPengurus, jabatan: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-amber-300 font-semibold focus:outline-none focus:border-amber-400"
                            />
                          </div>
                          <div>
                            <label className="text-slate-400 font-semibold block mb-1">Kelas</label>
                            <input
                              type="text"
                              value={editingPengurus.kelas}
                              onChange={(e) =>
                                setEditingPengurus({ ...editingPengurus, kelas: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-slate-400 font-semibold block mb-1">
                            Nama File Foto di public/images/
                          </label>
                          <input
                            type="text"
                            value={editingPengurus.fotoFileName}
                            onChange={(e) =>
                              setEditingPengurus({ ...editingPengurus, fotoFileName: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-emerald-400 font-mono focus:outline-none focus:border-amber-400"
                          />
                        </div>

                        <div>
                          <label className="text-slate-400 font-semibold block mb-1">Tugas Pokok</label>
                          <textarea
                            rows={3}
                            value={editingPengurus.tugasPokok}
                            onChange={(e) =>
                              setEditingPengurus({ ...editingPengurus, tugasPokok: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-400 resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-slate-400 font-semibold block mb-1">Motto Kepemimpinan</label>
                          <input
                            type="text"
                            value={editingPengurus.motto || ''}
                            onChange={(e) =>
                              setEditingPengurus({ ...editingPengurus, motto: e.target.value })
                            }
                            placeholder="Motto..."
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-amber-300 italic focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => setEditingPengurus(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                        >
                          Batal
                        </button>
                        <button
                          onClick={() => handleSavePengurus(editingPengurus)}
                          className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                        >
                          Simpan Pengurus
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: KELOLA 10 SEKBID */}
            {activeTab === 'sekbid' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Kelola 10 Seksi Bidang</h3>
                    <p className="text-xs text-slate-400">
                      Pilih nomor Sekbid untuk menyunting nama, koordinator, anggota, dan program kerja.
                    </p>
                  </div>
                  {editingSekbid && (
                    <button
                      onClick={handleSaveSekbid}
                      className="btn-interactive inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Sekbid</span>
                    </button>
                  )}
                </div>

                {/* Sekbid Selector Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {data.sekbid.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedSekbidIndex(idx);
                        setEditingSekbid(JSON.parse(JSON.stringify(s)));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                        selectedSekbidIndex === idx
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {s.nomor}
                    </button>
                  ))}
                </div>

                {/* Editing Card for Selected Sekbid */}
                {editingSekbid && (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-400 font-semibold block mb-1">Nomor Sekbid</label>
                        <input
                          type="text"
                          value={editingSekbid.nomor}
                          onChange={(e) =>
                            setEditingSekbid({ ...editingSekbid, nomor: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-semibold block mb-1">Nama Bidang</label>
                        <input
                          type="text"
                          value={editingSekbid.nama}
                          onChange={(e) =>
                            setEditingSekbid({ ...editingSekbid, nama: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-400 font-semibold block mb-1">Koordinator Bidang</label>
                        <input
                          type="text"
                          value={editingSekbid.koordinator}
                          onChange={(e) =>
                            setEditingSekbid({ ...editingSekbid, koordinator: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 font-semibold block mb-1">
                          Anggota (Pisahkan tanda koma)
                        </label>
                        <input
                          type="text"
                          value={editingSekbid.anggota.join(', ')}
                          onChange={(e) =>
                            setEditingSekbid({
                              ...editingSekbid,
                              anggota: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">
                        Deskripsi Tugas & Tanggung Jawab
                      </label>
                      <textarea
                        rows={3}
                        value={editingSekbid.deskripsiTugas}
                        onChange={(e) =>
                          setEditingSekbid({ ...editingSekbid, deskripsiTugas: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 resize-none"
                      />
                    </div>

                    {/* Program Kerja Sekbid */}
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-amber-300">
                          Program Kerja {editingSekbid.nomor} ({editingSekbid.programKerja.length})
                        </span>
                        <button
                          onClick={() => {
                            const newP: ProgramKerjaSekbid = {
                              nama: 'Program Baru',
                              kategori: 'Unggulan',
                              frekuensi: 'Bulanan',
                              keterangan: 'Rincian aksi program kerja'
                            };
                            setEditingSekbid({
                              ...editingSekbid,
                              programKerja: [...editingSekbid.programKerja, newP]
                            });
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-lg"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Tambah Program</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {editingSekbid.programKerja.map((prog, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={prog.nama}
                                onChange={(e) => {
                                  const updated = [...editingSekbid.programKerja];
                                  updated[pIdx].nama = e.target.value;
                                  setEditingSekbid({ ...editingSekbid, programKerja: updated });
                                }}
                                className="flex-1 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-bold text-white"
                              />
                              <button
                                onClick={() => {
                                  const updated = editingSekbid.programKerja.filter((_, i) => i !== pIdx);
                                  setEditingSekbid({ ...editingSekbid, programKerja: updated });
                                }}
                                className="p-1 text-rose-400 hover:text-rose-300"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={prog.kategori}
                                onChange={(e) => {
                                  const updated = [...editingSekbid.programKerja];
                                  updated[pIdx].kategori = e.target.value as any;
                                  setEditingSekbid({ ...editingSekbid, programKerja: updated });
                                }}
                                placeholder="Kategori (Unggulan/Periodik/Rutin)"
                                className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-amber-300"
                              />
                              <input
                                type="text"
                                value={prog.frekuensi}
                                onChange={(e) => {
                                  const updated = [...editingSekbid.programKerja];
                                  updated[pIdx].frekuensi = e.target.value;
                                  setEditingSekbid({ ...editingSekbid, programKerja: updated });
                                }}
                                placeholder="Frekuensi"
                                className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-slate-300"
                              />
                            </div>
                            <input
                              type="text"
                              value={prog.keterangan}
                              onChange={(e) => {
                                const updated = [...editingSekbid.programKerja];
                                updated[pIdx].keterangan = e.target.value;
                                setEditingSekbid({ ...editingSekbid, programKerja: updated });
                              }}
                              placeholder="Keterangan singkat"
                              className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-slate-400"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: IDENTITAS & PROFIL OSIS */}
            {activeTab === 'profil' && (
              <div className="space-y-5 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Identitas & Profil Resmi OSIS</h3>
                    <p className="text-xs text-slate-400">
                      Perbarui nama sekolah, masa bakti kepengurusan, slogan, visi, dan misi.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveProfil}
                    className="btn-interactive inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Profil</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Nama Sekolah</label>
                      <input
                        type="text"
                        value={profilForm.namaSekolah}
                        onChange={(e) => setProfilForm({ ...profilForm, namaSekolah: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block mb-1">Masa Bakti</label>
                      <input
                        type="text"
                        value={profilForm.masaBakti}
                        onChange={(e) => setProfilForm({ ...profilForm, masaBakti: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-amber-300 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Slogan OSIS</label>
                    <input
                      type="text"
                      value={profilForm.slogan}
                      onChange={(e) => setProfilForm({ ...profilForm, slogan: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Visi OSIS</label>
                    <textarea
                      rows={3}
                      value={profilForm.visi}
                      onChange={(e) => setProfilForm({ ...profilForm, visi: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 resize-none"
                    />
                  </div>

                  {/* Misi OSIS */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1.5">
                      Butir Misi OSIS ({profilForm.misi.length})
                    </label>
                    <div className="space-y-2 mb-2">
                      {profilForm.misi.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-amber-400 font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={m}
                            onChange={(e) => {
                              const updated = [...profilForm.misi];
                              updated[idx] = e.target.value;
                              setProfilForm({ ...profilForm, misi: updated });
                            }}
                            className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
                          />
                          <button
                            onClick={() => {
                              const updated = profilForm.misi.filter((_, i) => i !== idx);
                              setProfilForm({ ...profilForm, misi: updated });
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        value={newMisiText}
                        onChange={(e) => setNewMisiText(e.target.value)}
                        placeholder="Tambah butir misi baru..."
                        className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newMisiText.trim()) {
                            e.preventDefault();
                            setProfilForm({
                              ...profilForm,
                              misi: [...profilForm.misi, newMisiText.trim()]
                            });
                            setNewMisiText('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (newMisiText.trim()) {
                            setProfilForm({
                              ...profilForm,
                              misi: [...profilForm.misi, newMisiText.trim()]
                            });
                            setNewMisiText('');
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: PROGRAM KERJA UMUM */}
            {activeTab === 'program' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">Program Kerja Utama ({editingProkerList.length})</h3>
                    <p className="text-xs text-slate-400">
                      Kelola program kerja sekolah, status pelaksanaan, periode, dan target sasaran.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleAddProker}
                      className="btn-interactive inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tambah Program</span>
                    </button>
                    <button
                      onClick={handleSaveProkerList}
                      className="btn-interactive inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {editingProkerList.map((prog, idx) => (
                    <div
                      key={prog.id}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={prog.judul}
                          onChange={(e) => {
                            const updated = [...editingProkerList];
                            updated[idx].judul = e.target.value;
                            setEditingProkerList(updated);
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm font-bold text-white"
                        />
                        <button
                          onClick={() => handleDeleteProker(prog.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                          title="Hapus program ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Status Keterlaksanaan</label>
                          <select
                            value={prog.status}
                            onChange={(e) => {
                              const updated = [...editingProkerList];
                              updated[idx].status = e.target.value as any;
                              setEditingProkerList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-amber-300 font-semibold"
                          >
                            <option value="Terlaksana">Terlaksana</option>
                            <option value="Sedang Berjalan">Sedang Berjalan</option>
                            <option value="Rencana Kerja">Rencana Kerja</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Periode / Tanggal</label>
                          <input
                            type="text"
                            value={prog.periode}
                            onChange={(e) => {
                              const updated = [...editingProkerList];
                              updated[idx].periode = e.target.value;
                              setEditingProkerList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 block mb-1">Kategori</label>
                          <select
                            value={prog.kategori}
                            onChange={(e) => {
                              const updated = [...editingProkerList];
                              updated[idx].kategori = e.target.value as any;
                              setEditingProkerList(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200"
                          >
                            <option value="Program Unggulan">Program Unggulan</option>
                            <option value="Program Bulanan">Program Bulanan</option>
                            <option value="Program Rutin">Program Rutin</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Deskripsi Singkat</label>
                        <textarea
                          rows={2}
                          value={prog.deskripsi}
                          onChange={(e) => {
                            const updated = [...editingProkerList];
                            updated[idx].deskripsi = e.target.value;
                            setEditingProkerList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: GOOGLE SHEETS & BACKUP */}
            {activeTab === 'sheets' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="text-lg font-bold text-white">Integrasi Backend & Cadangan Data</h3>
                  <p className="text-xs text-slate-400">
                    Sinkronkan portal dengan Google Sheets melalui Google Apps Script, atau cadangkan data dalam file JSON.
                  </p>
                </div>

                {/* Google Sheets Hub Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Database className="w-5 h-5 text-amber-400" />
                      <span className="font-bold text-white text-sm">Status Koneksi Google Sheets</span>
                    </div>
                    <button
                      onClick={onOpenBackendConfig}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700"
                    >
                      Buka Wizard Konfigurasi
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-slate-200">
                        {gasUrl ? 'URL Apps Script Terpasang' : 'Belum Ada URL Apps Script'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate max-w-md">
                        {gasUrl || 'Gunakan modal konfigurasi untuk memasang URL Web App'}
                      </div>
                    </div>
                    {gasUrl && (
                      <button
                        onClick={() => syncFromGoogleSheets()}
                        disabled={syncStatus === 'loading'}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'loading' ? 'animate-spin' : ''}`} />
                        <span>Sinkronkan Sekarang</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Backup & Restore Hub */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="font-bold text-white text-sm">Pusat Cadangan & Pemulihan (Backup / Restore)</h4>
                      <p className="text-xs text-slate-400">
                        Simpan seluruh konfigurasi portal ke komputer atau pulihkan dari file sebelumnya.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="font-bold text-white text-xs flex items-center gap-2">
                        <Download className="w-4 h-4 text-emerald-400" />
                        <span>Unduh Cadangan JSON</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Menghasilkan file arsip JSON lengkap berisi 28 pengurus, 10 sekbid, visi, misi, dan program kerja.
                      </p>
                      <button
                        onClick={handleDownloadBackup}
                        className="btn-interactive w-full py-2 px-3 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Backup Portal</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="font-bold text-white text-xs flex items-center gap-2">
                        <Upload className="w-4 h-4 text-amber-400" />
                        <span>Pulihkan dari File JSON</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Unggah file cadangan JSON yang pernah diunduh untuk mengembalikan seluruh konten portal.
                      </p>
                      <label className="btn-interactive w-full py-2 px-3 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pilih File JSON</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleUploadRestore}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset to Factory Default */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-rose-300 block">Kembalikan ke Nilai Default Bawaan</span>
                      <span className="text-slate-500 text-[11px]">
                        Menghapus data di localStorage dan memulihkan 28 pengurus & 10 sekbid orisinal.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data portal ke pengaturan default bawaan?')) {
                          resetToDefault();
                          showNotification('Data portal berhasil direset ke pengaturan default.');
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg"
                    >
                      Reset Default
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: KEAMANAN & AKUN ADMIN */}
            {activeTab === 'keamanan' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h3 className="text-lg font-bold text-white">Keamanan & Kata Sandi Administrator</h3>
                  <p className="text-xs text-slate-400">
                    Ganti kata sandi default (<code className="text-amber-400 font-mono">admin123</code>) dengan kata sandi baru untuk mencegah akses tidak sah.
                  </p>
                </div>

                <form
                  onSubmit={handleChangePasswordSubmit}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs"
                >
                  {passwordMsg && (
                    <div
                      className={`p-3 rounded-xl border flex items-center gap-2 ${
                        passwordMsg.success
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {passwordMsg.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span>{passwordMsg.text}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Kata Sandi Saat Ini</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Masukkan kata sandi lama..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Kata Sandi Baru</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 5 karakter..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold block">Konfirmasi Kata Sandi Baru</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi baru..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-interactive w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Perbarui Kata Sandi</span>
                    </button>
                  </div>
                </form>

                {/* Security Advisory */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Perlindungan Publik Aktif</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Setiap pengunjung umum yang membuka portal hanya dapat melihat data profil, bagan struktur, dan galeri kegiatan tanpa akses untuk memodifikasi atau menghapus konten resmi sekolah.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
