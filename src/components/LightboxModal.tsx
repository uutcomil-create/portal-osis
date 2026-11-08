import React, { useEffect } from 'react';
import { FotoGaleri } from '../data/galeriData';
import { X, Calendar, MapPin, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  foto: FotoGaleri | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  foto,
  onClose,
  onPrev,
  onNext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!foto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              {foto.kategori}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Arsip Dokumentasi Spensa
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Tutup foto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Image Display */}
        <div className="relative max-h-[62vh] sm:max-h-[68vh] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={foto.gambarUrl}
            alt={foto.judul}
            className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain mx-auto"
            referrerPolicy="no-referrer"
          />

          {/* Nav buttons */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700 transition-colors"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white border border-slate-700 transition-colors"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Caption & Metadata */}
        <div className="p-6 bg-slate-950">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {foto.judul}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {foto.deskripsi}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              {foto.tanggal}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              {foto.lokasi}
            </span>
            <span className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-400" />
              {foto.fotografer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
