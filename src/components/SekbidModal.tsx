import React, { useState, useEffect } from 'react';
import { SekbidItem, ProgramKerjaSekbid, DokumentasiFoto } from '../data/sekbidData';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  X,
  User,
  Users,
  Target,
  Calendar,
  Camera,
  Edit3,
  Save,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';

interface SekbidModalProps {
  sekbid: SekbidItem | null;
  onClose: () => void;
  onSave?: (updatedSekbid: SekbidItem) => void;
  onSelectPhoto?: (url: string, caption: string) => void;
}

export const SekbidModal: React.FC<SekbidModalProps> = ({
  sekbid,
  onClose,
  onSave,
  onSelectPhoto
}) => {
  const { isAdmin } = useAdminAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<SekbidItem | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (sekbid) {
      setFormData(JSON.parse(JSON.stringify(sekbid)));
      setIsEditing(false);
    }
  }, [sekbid]);

  if (!sekbid || !formData) return null;

  const handleSave = () => {
    if (onSave && formData) {
      onSave(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      setIsEditing(false);
    }
  };

  const handleAddProgram = () => {
    const newProg: ProgramKerjaSekbid = {
      nama: `[Program Baru ${formData.nomor}]`,
      kategori: 'Unggulan',
      frekuensi: 'Semesteran',
      keterangan: 'Deskripsi program kerja baru.'
    };
    setFormData({
      ...formData,
      programKerja: [...formData.programKerja, newProg]
    });
  };

  const handleRemoveProgram = (index: number) => {
    setFormData({
      ...formData,
      programKerja: formData.programKerja.filter((_, i) => i !== index)
    });
  };

  const handleProgramChange = (index: number, field: keyof ProgramKerjaSekbid, value: string) => {
    const updated = [...formData.programKerja];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, programKerja: updated });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                1. {formData.nomor}
              </span>
              <span className="text-[11px] text-amber-400/80 font-medium">
                {isEditing ? 'Mode Sunting Data' : 'Detail Resmi Seksi Bidang'}
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">
                  2. Nama Bidang (Dapat diedit bebas sesuai kebutuhan sekolah)
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Seksi Bidang 1 (Keimanan & Ketaqwaan)"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-400/60 text-white text-base font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            ) : (
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                2. {formData.nama}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && onSave && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isEditing
                    ? 'bg-slate-800 text-slate-300 hover:text-white'
                    : 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20'
                }`}
                title={isEditing ? 'Batal sunting' : 'Sunting informasi Sekbid ini'}
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">{isEditing ? 'Batal' : 'Sunting Data'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Tutup detail Sekbid"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Perubahan data Sekbid berhasil disimpan!</span>
            </div>
          )}

          {/* 3. Deskripsi Tugas */}
          <div className="rounded-xl p-4 bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Deskripsi Tugas & Tanggung Jawab</span>
            </div>

            {isEditing ? (
              <textarea
                rows={3}
                value={formData.deskripsiTugas}
                onChange={(e) => setFormData({ ...formData, deskripsiTugas: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              />
            ) : (
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {formData.deskripsiTugas}
              </p>
            )}
          </div>

          {/* 4. Koordinator & 5. Daftar Anggota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Koordinator */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 mb-1.5 text-[11px] font-bold uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>4. Koordinator Bidang</span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.koordinator}
                  onChange={(e) => setFormData({ ...formData, koordinator: e.target.value })}
                  placeholder="[Nama Koordinator]"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                />
              ) : (
                <>
                  <div className="text-sm font-bold text-white">
                    {formData.koordinator}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Penanggung jawab operasional program
                  </div>
                </>
              )}
            </div>

            {/* Anggota */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 text-blue-400 mb-1.5 text-[11px] font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>5. Daftar Anggota ({formData.anggota.length})</span>
              </div>
              {isEditing ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={formData.anggota.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anggota: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    placeholder="Pisahkan nama anggota dengan tanda koma (,)"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Gunakan tanda koma (,) untuk memisahkan nama anggota.
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  {formData.anggota.map((ang, aIdx) => (
                    <div key={aIdx} className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{ang}</span>
                    </div>
                  ))}
                  {formData.anggota.length === 0 && (
                    <span className="text-slate-500 text-xs italic">Belum ada anggota terdaftar</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 6. Program Kerja */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>6. Program Kerja ({formData.programKerja.length} Rencana Aksi)</span>
              </h4>
              {isEditing && (
                <button
                  onClick={handleAddProgram}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 text-xs font-semibold hover:bg-amber-400/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Program</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {formData.programKerja.map((prog, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-400/30 transition-colors relative"
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={prog.nama}
                          onChange={(e) => handleProgramChange(idx, 'nama', e.target.value)}
                          placeholder="Nama Program Kerja"
                          className="flex-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-white font-bold"
                        />
                        <button
                          onClick={() => handleRemoveProgram(idx)}
                          className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded"
                          title="Hapus program ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={prog.kategori}
                          onChange={(e) => handleProgramChange(idx, 'kategori', e.target.value as any)}
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-amber-300"
                        >
                          <option value="Unggulan">Unggulan</option>
                          <option value="Periodik">Periodik</option>
                          <option value="Rutin">Rutin</option>
                        </select>
                        <input
                          type="text"
                          value={prog.frekuensi}
                          onChange={(e) => handleProgramChange(idx, 'frekuensi', e.target.value)}
                          placeholder="Frekuensi / Waktu"
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={prog.keterangan}
                        onChange={(e) => handleProgramChange(idx, 'keterangan', e.target.value)}
                        placeholder="Deskripsi ringkas program kerja"
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300 resize-none"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-bold text-white">
                          {prog.nama}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20 whitespace-nowrap">
                          {prog.kategori}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-2">
                        {prog.keterangan}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Frekuensi: {prog.frekuensi}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 7. Dokumentasi Foto */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>7. Dokumentasi Foto ({formData.dokumentasiFoto.length} Arsip)</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                Dokumentasi Kegiatan Sekbid
              </span>
            </div>

            {formData.dokumentasiFoto.length === 0 ? (
              <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-slate-500 text-xs">
                Belum ada dokumentasi foto yang diunggah untuk {formData.nomor}.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.dokumentasiFoto.map((foto) => (
                  <div
                    key={foto.id}
                    onClick={() => onSelectPhoto && onSelectPhoto(foto.url, foto.caption)}
                    className="group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400/50 transition-all cursor-pointer shadow-md"
                  >
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <img
                        src={foto.url}
                        alt={foto.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                      {foto.tanggal && (
                        <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950/80 text-amber-300 border border-amber-400/30">
                          {foto.tanggal}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-semibold text-slate-200 line-clamp-2 group-hover:text-amber-300 transition-colors">
                        {foto.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {formData.nomor} · OSIS SMP Negeri 1 Ungaran
          </span>

          <div className="flex items-center gap-2">
            {isEditing && (
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {isEditing ? 'Tutup Tanpa Simpan' : 'Tutup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
