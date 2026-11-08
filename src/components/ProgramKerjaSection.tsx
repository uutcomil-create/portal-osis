import React, { useState, useMemo } from 'react';
import { DAFTAR_PROGRAM_KERJA, ProgramKerja } from '../data/programKerjaData';
import { useOsisData } from '../context/OsisDataContext';
import { Calendar, Search, Filter, CheckCircle2, Clock, CalendarDays, Award, ArrowUpRight } from 'lucide-react';

export const ProgramKerjaSection: React.FC = () => {
  const { data } = useOsisData();
  const programKerjaList = data.programKerja || DAFTAR_PROGRAM_KERJA;

  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrograms = useMemo(() => {
    return programKerjaList.filter((prog) => {
      const matchKategori =
        selectedKategori === 'Semua' ? true : prog.kategori === selectedKategori;
      const matchStatus =
        selectedStatus === 'Semua' ? true : prog.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        prog.judul.toLowerCase().includes(q) ||
        prog.deskripsi.toLowerCase().includes(q) ||
        prog.sekbidNama.toLowerCase().includes(q);

      return matchKategori && matchStatus && matchSearch;
    });
  }, [programKerjaList, selectedKategori, selectedStatus, searchQuery]);

  const getStatusBadge = (status: ProgramKerja['status']) => {
    switch (status) {
      case 'Terlaksana':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Terlaksana</span>
          </span>
        );
      case 'Sedang Berjalan':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Sedang Berjalan</span>
          </span>
        );
      case 'Rencana Kerja':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Rencana Kerja</span>
          </span>
        );
    }
  };

  return (
    <section id="program" className="relative py-20 lg:py-28 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Agenda & Rencana Aksi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Program Kerja OSIS Terpadu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Daftar kegiatan strategis yang dirancang secara terukur untuk mengabdi dan berkontribusi bagi kemajuan warga sekolah.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Terlaksana</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Berjalan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Rencana</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari program kerja (mis: LDKS, Pemilos, Adiwiyata, Seni)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            {['Semua', 'Program Unggulan', 'Program Bulanan', 'Program Rutin'].map((kat) => (
              <button
                key={kat}
                onClick={() => setSelectedKategori(kat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedKategori === kat
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {kat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {['Semua', 'Terlaksana', 'Sedang Berjalan', 'Rencana Kerja'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedStatus === st
                    ? 'bg-slate-800 text-amber-300 border border-amber-400/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Program Cards Grid */}
        <div key={selectedKategori + selectedStatus} className="animate-tab-fade grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 active:scale-[0.98] transition-all duration-300 ease-out flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider truncate">
                    {prog.sekbidNama}
                  </span>
                  {getStatusBadge(prog.status)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                  {prog.judul}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {prog.deskripsi}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs mb-4">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-[11px]">Waktu Pelaksanaan</span>
                    <span className="font-semibold text-slate-200">{prog.periode}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 pt-1.5 border-t border-slate-800/60">
                    <span className="text-[11px]">Sasaran Peserta</span>
                    <span className="font-medium text-amber-300/90 truncate max-w-[170px]">{prog.sasaran}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] text-slate-500">
                  Target: {prog.indikatorKeberhasilan.slice(0, 36)}...
                </span>
                <span className="text-amber-400 font-semibold inline-flex items-center gap-0.5 text-[11px]">
                  Rincian
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
