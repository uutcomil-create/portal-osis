import React, { useState } from 'react';
import { Pengurus } from '../data/pengurusData';
import { PengurusAvatar } from './PengurusAvatar';
import { X, Save, RotateCcw, Copy, Check, Sparkles, AlertCircle, Upload, FolderCheck, Image as ImageIcon, Database } from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';

interface RosterEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pengurusList: Pengurus[];
  onSaveList: (updatedList: Pengurus[]) => void;
  onResetDefault: () => void;
  selectedId?: string;
}

export const RosterEditorModal: React.FC<RosterEditorModalProps> = ({
  isOpen,
  onClose,
  pengurusList,
  onSaveList,
  onResetDefault,
  selectedId
}) => {
  const { gasUrl } = useOsisData();
  const [activeId, setActiveId] = useState<string>(selectedId || pengurusList[0]?.id || 'p-01');
  const [localList, setLocalList] = useState<Pengurus[]>(pengurusList);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentMember = localList.find((p) => p.id === activeId) || localList[0];

  const handleFieldChange = (field: keyof Pengurus, value: any) => {
    setValidationErrors([]);
    setLocalList((prev) =>
      prev.map((item) => (item.id === activeId ? { ...item, [field]: value } : item))
    );
  };

  const handleImageFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        handleFieldChange('foto', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validasi anggota tidak boleh terduplikasi di beberapa posisi
  const checkDuplicateMembers = (list: Pengurus[]) => {
    const errors: string[] = [];
    const seenNames = new Map<string, string>(); // name -> jabatan

    list.forEach((p) => {
      const trimmed = p.nama.trim();
      const isPlaceholder = trimmed.startsWith('[') && trimmed.endsWith(']');
      if (trimmed && !isPlaceholder) {
        const lower = trimmed.toLowerCase();
        if (seenNames.has(lower)) {
          errors.push(
            `Nama siswa "${trimmed}" terduplikasi pada jabatan "${seenNames.get(lower)}" dan "${p.jabatan}". Setiap siswa hanya boleh menduduki satu posisi pengurus.`
          );
        } else {
          seenNames.set(lower, p.jabatan);
        }
      }
    });

    return errors;
  };

  const handleSaveAll = () => {
    const dupErrors = checkDuplicateMembers(localList);
    if (dupErrors.length > 0) {
      setValidationErrors(dupErrors);
      return;
    }

    setValidationErrors([]);
    try {
      const res = onSaveList(localList) as unknown as { success?: boolean; errors?: string[] } | undefined;
      if (res && res.success === false && res.errors && res.errors.length > 0) {
        setValidationErrors(res.errors);
        return;
      }
    } catch (err: any) {
      setValidationErrors([err.message || 'Terjadi kesalahan saat menyimpan data.']);
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCopyCode = () => {
    const code = JSON.stringify(localList, null, 2);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md"
    >
      <div className="relative max-w-4xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Kelola Data 28 Pengurus OSIS & Foto Profil
                </h3>
                <span
                  className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                    gasUrl
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                  title={gasUrl ? 'Terkoneksi ke Google Sheets' : 'Penyimpanan lokal browser'}
                >
                  <Database className="w-2.5 h-2.5" />
                  <span>{gasUrl ? 'Google Sheets' : 'Lokal'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hubungkan foto dari <code className="text-amber-300 font-mono">public/images/</code> atau unggah pratinjau langsung.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Tutup panel editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split view (List of 28 positions on left, Form on right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column: 28 Pos Selection List */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto max-h-[35vh] md:max-h-none p-3 space-y-1.5 bg-slate-950/60">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              Pilih Jabatan (28 Posisi)
            </div>
            {localList.map((p) => {
              const isSelected = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2 text-xs ${
                    isSelected
                      ? 'bg-amber-400/15 border border-amber-400/40 text-amber-300 font-semibold shadow-sm'
                      : 'hover:bg-slate-900 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 font-mono mr-1.5">
                      #{p.nomorUrut < 10 ? `0${p.nomorUrut}` : p.nomorUrut}
                    </span>
                    <span className="font-semibold">{p.jabatan}</span>
                    <span className="block text-[11px] text-slate-400 truncate">
                      {p.nama}
                    </span>
                    <span className="block text-[10px] font-mono text-amber-400/80 truncate">
                      {p.fotoFileName}
                    </span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                    {p.kelas}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Edit Current Form */}
          <div className="md:col-span-7 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-900/90">
            {/* Validation Errors Alert Banner */}
            {validationErrors.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs space-y-1.5 shadow-lg animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Validasi Data Pengurus Ditolak:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-300">
                  {validationErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
                <p className="text-[10px] text-rose-400/80 italic pt-1">
                  *Perubahan tidak dapat disimpan ke pusat data selama terdapat duplikasi nama atau posisi.
                </p>
              </div>
            )}

            {/* Live Avatar Preview Lockup */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <PengurusAvatar pengurus={currentMember} size="md" shape="rounded" />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  Pratinjau Foto Profil
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {currentMember.jabatan} - #{currentMember.nomorUrut}
                </p>
                <p className="text-[11px] font-mono text-emerald-400 mt-0.5">
                  Path: public/images/{currentMember.fotoFileName}
                </p>
              </div>

              {/* Upload Pratinjau Langsung */}
              <div>
                <label
                  htmlFor="local-photo-upload"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold transition-colors border border-amber-400/30"
                  title="Pilih file foto dari laptop Anda untuk langsung diuji pratinjaunya di browser"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Uji Foto</span>
                </label>
                <input
                  id="local-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageFilePick}
                  className="hidden"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                Foto asli dihubungkan berdasarkan nama file di <code className="font-mono font-bold">public/images/</code>. Tidak ada manipulasi atau wajah AI.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Nama File Gambar di public/images/
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={currentMember.fotoFileName}
                    onChange={(e) => handleFieldChange('fotoFileName', e.target.value)}
                    placeholder="pengurus_01.jpg"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Jabatan Resmi (Tetap)
                </label>
                <input
                  type="text"
                  value={currentMember.jabatan}
                  disabled
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Nama Lengkap Siswa Pengurus <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={currentMember.nama}
                onChange={(e) => handleFieldChange('nama', e.target.value)}
                placeholder="Contoh: Muhammad Bintang Pratama"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-200 block mb-1">
                  Kelas / Rombel <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={currentMember.kelas}
                  onChange={(e) => handleFieldChange('kelas', e.target.value)}
                  placeholder="Contoh: Kelas VIII A"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-200 block mb-1">
                  Email Siswa / Akun Sekolah
                </label>
                <input
                  type="text"
                  value={currentMember.emailKontak || ''}
                  onChange={(e) => handleFieldChange('emailKontak', e.target.value)}
                  placeholder="osis.nama@smpn1ungaran.sch.id"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Tugas Pokok & Tanggung Jawab
              </label>
              <textarea
                rows={2}
                value={currentMember.tugasPokok}
                onChange={(e) => handleFieldChange('tugasPokok', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Motto Kepemimpinan
              </label>
              <input
                type="text"
                value={currentMember.motto || ''}
                onChange={(e) => handleFieldChange('motto', e.target.value)}
                placeholder="Contoh: Belajar dengan tekun, memimpin dengan santun."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              title="Salin seluruh data 28 pengurus dalam format JSON"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Kembalikan seluruh 28 data pengurus ke template standar?')) {
                  onResetDefault();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-500/10 border border-rose-500/20 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 rounded-lg"
            >
              Tutup
            </button>

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{saveSuccess ? 'Berhasil Disimpan!' : 'Terapkan Perubahan'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
