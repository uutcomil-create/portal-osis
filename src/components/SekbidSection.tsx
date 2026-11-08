import React, { useState } from 'react';
import { DAFTAR_10_SEKBID, SekbidItem } from '../data/sekbidData';
import {
  LayoutGrid,
  ChevronRight,
  User,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Shield,
  Trophy,
  Scale,
  Activity,
  Cpu,
  Globe,
  HeartHandshake,
  MoonStar,
  Camera,
  Info
} from 'lucide-react';

interface SekbidSectionProps {
  sekbidList?: SekbidItem[];
  onSelectSekbid: (sekbid: SekbidItem) => void;
}

export const SekbidSection: React.FC<SekbidSectionProps> = ({
  sekbidList = DAFTAR_10_SEKBID,
  onSelectSekbid
}) => {
  const [activeFilter, setActiveFilter] = useState<'semua' | '1-5' | '6-10'>('semua');

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MoonStar':
        return <MoonStar className="w-5 h-5 text-emerald-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-teal-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-rose-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Scale':
        return <Scale className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-violet-400" />;
      default:
        return <LayoutGrid className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredSekbid = sekbidList.filter((item) => {
    if (activeFilter === '1-5') return item.id <= 5;
    if (activeFilter === '6-10') return item.id >= 6;
    return true;
  });

  return (
    <section id="sekbid" className="relative py-20 lg:py-28 bg-slate-900/60 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
              <span>Pilar Pembinaan Kesiswaan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              10 Seksi Bidang (Sekbid) OSIS
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Menggunakan nama sementara Sekbid 1 s.d. 10 yang terhubung dengan koordinator, anggota, program kerja, dan dokumentasi foto. Klik kartu untuk melihat detail atau menyunting data.
            </p>
          </div>

          {/* Quick Segment Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => setActiveFilter('semua')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeFilter === 'semua'
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua (10)
            </button>
            <button
              onClick={() => setActiveFilter('1-5')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeFilter === '1-5'
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sekbid 01 - 05
            </button>
            <button
              onClick={() => setActiveFilter('6-10')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeFilter === '6-10'
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sekbid 06 - 10
            </button>
          </div>
        </div>

        {/* 10 Cards Grid */}
        <div key={activeFilter} className="animate-tab-fade grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSekbid.map((sekbid) => (
            <div
              key={sekbid.id}
              onClick={() => onSelectSekbid(sekbid)}
              className="group cursor-pointer rounded-2xl p-6 bg-slate-950/80 border border-slate-800 hover:border-amber-400/70 hover:shadow-2xl hover:shadow-amber-500/15 hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ease-out flex flex-col justify-between"
            >
              <div>
                {/* 1. Header: Nomor Sekbid & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                      {getIcon(sekbid.iconName)}
                    </div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {sekbid.nomor}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium group-hover:text-amber-300 transition-colors flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-amber-400/70" />
                    <span>{sekbid.dokumentasiFoto.length} Foto</span>
                  </span>
                </div>

                {/* 2. Nama Bidang (Nama Sementara) */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2.5">
                  {sekbid.nama}
                </h3>

                {/* 3. Deskripsi Tugas */}
                <p className="text-xs text-slate-300 leading-relaxed mb-5 line-clamp-3">
                  {sekbid.deskripsiTugas}
                </p>

                {/* 4. Koordinator & 5. Daftar Anggota */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2 mb-5">
                  <div className="flex items-start gap-2 text-xs">
                    <User className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Koordinator
                      </span>
                      <span className="font-semibold text-slate-200 truncate block">
                        {sekbid.koordinator}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs pt-2 border-t border-slate-800/60">
                    <Users className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                        Anggota ({sekbid.anggota.length})
                      </span>
                      <span className="font-normal text-slate-300 truncate block">
                        {sekbid.anggota.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6. Program Kerja Preview */}
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Program Kerja ({sekbid.programKerja.length})</span>
                    <span className="text-[10px] text-amber-400/90 font-medium">Lihat Semua</span>
                  </div>
                  <ul className="space-y-1.5">
                    {sekbid.programKerja.slice(0, 2).map((prog, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="truncate">{prog.nama}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 7. Dokumentasi Foto Thumbnail Preview & Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                {sekbid.dokumentasiFoto.length > 0 && (
                  <div className="mb-3 flex items-center gap-2">
                    <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      <img
                        src={sekbid.dokumentasiFoto[0].url}
                        alt="Dokumentasi"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 truncate">
                      {sekbid.dokumentasiFoto[0].caption}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {sekbid.singkatan}
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold text-xs">
                    <span>Buka Rincian & Dokumentasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
