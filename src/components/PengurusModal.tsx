import React from 'react';
import { Pengurus } from '../data/pengurusData';
import { PengurusAvatar } from './PengurusAvatar';
import { X, Mail, Shield, CheckCircle, Award, FolderCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface PengurusModalProps {
  pengurus: Pengurus | null;
  onClose: () => void;
  onEdit?: (pengurus: Pengurus) => void;
}

export const PengurusModal: React.FC<PengurusModalProps> = ({
  pengurus,
  onClose,
  onEdit
}) => {
  const { isAdmin } = useAdminAuth();
  if (!pengurus) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Tutup detail pengurus"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <PengurusAvatar
                pengurus={pengurus}
                size="xl"
                shape="rounded"
              />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 mb-1">
                {pengurus.kategori} · No. Urut #{pengurus.nomorUrut}
              </span>
              <h3 className="text-lg font-bold text-white truncate">
                {pengurus.nama}
              </h3>
              <p className="text-xs font-semibold text-amber-400">
                {pengurus.jabatan}
              </p>
              <p className="text-xs text-slate-400">
                {pengurus.kelas}
              </p>

              {/* Path info */}
              <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <FolderCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">public/images/{pengurus.fotoFileName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Divisi & Wilayah Amanah</span>
            </div>
            <p className="text-slate-200 font-semibold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              {pengurus.divisi}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tugas Pokok & Tanggung Jawab</span>
            </div>
            <p className="text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
              {pengurus.tugasPokok}
            </p>
          </div>

          {pengurus.motto && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Motto Kepemimpinan</span>
              </div>
              <p className="italic text-amber-300/95 bg-amber-400/5 p-3 rounded-lg border border-amber-400/20">
                "{pengurus.motto}"
              </p>
            </div>
          )}

          {pengurus.emailKontak && (
            <div className="pt-2 flex items-center gap-2 text-slate-400 text-xs">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Kontak Resmi:</span>
              <span className="text-slate-200 font-mono">{pengurus.emailKontak}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Masa Bakti OSIS 2025/2026
          </span>
          <div className="flex items-center gap-2">
            {isAdmin && onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(pengurus);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Ubah Data Ini
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
