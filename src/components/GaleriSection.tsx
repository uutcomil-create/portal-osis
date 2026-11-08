import React, { useState } from 'react';
import { DAFTAR_GALERI, FotoGaleri } from '../data/galeriData';
import { useOsisData } from '../context/OsisDataContext';
import { Image, ZoomIn, Calendar, MapPin, Tag, Camera } from 'lucide-react';

interface GaleriSectionProps {
  onOpenLightbox: (foto: FotoGaleri) => void;
}

export const GaleriSection: React.FC<GaleriSectionProps> = ({ onOpenLightbox }) => {
  const { data } = useOsisData();
  const galeriList = data.galeri || DAFTAR_GALERI;

  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');

  const kategoriList = [
    'Semua',
    'Upacara & Kepemimpinan',
    'Kreativitas & Digital',
    'Bakti Sosial & Lingkungan'
  ];

  const filteredGaleri = galeriList.filter((item) => {
    if (selectedKategori === 'Semua') return true;
    return item.kategori === selectedKategori;
  });

  return (
    <section id="galeri" className="relative py-20 lg:py-28 bg-slate-900/60 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Dokumentasi & Memori</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Galeri Kegiatan Siswa
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Jejak langkah kegiatan, latihan kepemimpinan, dan momentum kebersamaan siswa-siswi SMP Negeri 1 Ungaran. Klik gambar untuk memperbesar.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                onClick={() => setSelectedKategori(kat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedKategori === kat
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div key={selectedKategori} className="animate-tab-fade grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGaleri.map((foto) => (
            <div
              key={foto.id}
              onClick={() => onOpenLightbox(foto)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:shadow-amber-500/15 hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out flex flex-col justify-between"
            >
              {/* Photo Frame with Zoom Overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={foto.gambarUrl}
                  alt={foto.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category tag */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-950/85 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  {foto.kategori}
                </span>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                  <div className="p-3 rounded-full bg-amber-400 text-slate-950 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Photo Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 leading-snug">
                    {foto.judul}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {foto.deskripsi}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{foto.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[130px]">{foto.lokasi}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
