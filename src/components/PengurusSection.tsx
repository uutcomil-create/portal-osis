import React, { useState, useMemo } from 'react';
import { Pengurus } from '../data/pengurusData';
import { PengurusAvatar } from './PengurusAvatar';
import { Search, Sparkles, User, ChevronRight, FolderCheck, FileText, Check, Copy } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface PengurusSectionProps {
  pengurusList: Pengurus[];
  onSelectPengurus: (pengurus: Pengurus) => void;
  onOpenRosterEditor: () => void;
}

export const PengurusSection: React.FC<PengurusSectionProps> = ({
  pengurusList,
  onSelectPengurus,
  onOpenRosterEditor
}) => {
  const { isAdmin } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'Semua' | 'BPH' | 'Sekbid 1-5' | 'Sekbid 6-10'>('Semua');
  const [showFileCheatSheet, setShowFileCheatSheet] = useState(false);
  const [copiedCheatSheet, setCopiedCheatSheet] = useState(false);

  // Filtered list
  const filteredList = useMemo(() => {
    return pengurusList.filter((item) => {
      const matchFilter =
        selectedFilter === 'Semua' ? true : item.kategori === selectedFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.jabatan.toLowerCase().includes(q) ||
        item.kelas.toLowerCase().includes(q) ||
        item.divisi.toLowerCase().includes(q) ||
        item.fotoFileName.toLowerCase().includes(q);

      return matchFilter && matchSearch;
    });
  }, [pengurusList, selectedFilter, searchQuery]);

  const handleCopyCheatSheet = () => {
    const list = pengurusList
      .map(
        (p) =>
          `#${String(p.nomorUrut).padStart(2, '0')} | ${p.fotoFileName} -> ${p.jabatan} (${p.nama})`
      )
      .join('\n');
    navigator.clipboard.writeText(list);
    setCopiedCheatSheet(true);
    setTimeout(() => setCopiedCheatSheet(false), 2000);
  };

  return (
    <section id="pengurus" className="relative py-20 lg:py-28 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Daftar Pengurus Lengkap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              28 Pengurus OSIS Spensa
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Jajaran siswa terpilih yang berdedikasi mengabdi memajukan iklim kesiswaan SMP Negeri 1 Ungaran. Foto terhubung otomatis berdasarkan nama file di <code className="text-amber-300 font-mono">public/images/</code>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowFileCheatSheet(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/60 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
              title="Lihat daftar 28 nama file foto yang harus dimasukkan ke folder public/images"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Panduan 28 File Foto</span>
            </button>

            {isAdmin && (
              <button
                onClick={onOpenRosterEditor}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold transition-all hover:border-amber-400"
                title="Perbarui atau sunting nama dan kelas pengurus"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Kelola & Sunting Nama</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berdasarkan nama, jabatan, kelas, atau nama file (mis: pengurus_01.jpg)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Reset
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {(['Semua', 'BPH', 'Sekbid 1-5', 'Sekbid 6-10'] as const).map((tab) => {
              const count =
                tab === 'Semua'
                  ? pengurusList.length
                  : pengurusList.filter((p) => p.kategori === tab).length;

              const isActive = selectedFilter === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic counter & storage badge */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mb-6 px-1 gap-2">
          <span>
            Menampilkan <strong className="text-white tabular-nums">{filteredList.length}</strong> dari{' '}
            <strong className="text-amber-400 tabular-nums">{pengurusList.length}</strong> total pengurus
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <FolderCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Folder Gambar: public/images/</span>
          </span>
        </div>

        {/* 28 Member Cards Grid */}
        {filteredList.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <User className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">Tidak ada pengurus yang cocok</h3>
            <p className="text-xs text-slate-400 mt-1">
              Coba gunakan kata kunci pencarian lain atau pilih filter "Semua".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('Semua');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-amber-400 text-slate-950 rounded-lg"
            >
              Tampilkan Semua 28 Pengurus
            </button>
          </div>
        ) : (
          <div key={selectedFilter} className="animate-tab-fade grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredList.map((item) => {
              const isBPH = item.kategori === 'BPH';
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectPengurus(item)}
                  className={`group cursor-pointer rounded-2xl p-5 bg-slate-900/80 border transition-all duration-300 ease-out relative flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/15 active:scale-[0.98] ${
                    isBPH
                      ? 'border-amber-500/40 hover:border-amber-400 ring-1 ring-transparent hover:ring-amber-400/30'
                      : 'border-slate-800 hover:border-amber-400/80'
                  }`}
                >
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tabular-nums text-slate-500 group-hover:text-amber-400 font-bold transition-colors">
                      #{item.nomorUrut < 10 ? `0${item.nomorUrut}` : item.nomorUrut}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isBPH
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.kelas}
                    </span>
                  </div>

                  {/* Profile Avatar Frame with Automatic Image Resolution */}
                  <div className="relative mx-auto mb-4 text-center flex justify-center">
                    <PengurusAvatar
                      pengurus={item}
                      size="lg"
                      shape="rounded"
                    />
                  </div>

                  {/* Member Details */}
                  <div className="text-center mb-3 flex-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {item.jabatan}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.nama}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {item.divisi}
                    </p>
                  </div>

                  {/* File name indicator */}
                  <div className="mb-3 px-2 py-1 rounded bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-slate-500">File:</span>
                    <span className="text-amber-300/90 truncate">{item.fotoFileName}</span>
                  </div>

                  {/* Bottom Footer & Action */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] text-slate-500 truncate max-w-[130px]">
                      {item.tugasPokok.slice(0, 30)}...
                    </span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 text-[11px] font-semibold shrink-0">
                      Rincian
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Panduan Nama File 28 Foto */}
      {showFileCheatSheet && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          onClick={() => setShowFileCheatSheet(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Panduan 28 File Foto di Folder public/images/
                  </h3>
                  <p className="text-xs text-slate-400">
                    Simpan file foto asli pengurus dengan nama file di bawah ini.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFileCheatSheet(false)}
                className="text-slate-400 hover:text-white px-2 py-1 text-xs"
              >
                Tutup
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                💡 <strong>Petunjuk:</strong> Cukup salin 28 foto Anda ke dalam folder <code className="text-amber-400 font-mono">public/images/</code> sesuai daftar nama file berikut. Foto akan langsung tampil di bagan struktur dan daftar kartu tanpa perlu reload server.
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-amber-400 uppercase font-semibold">
                      <th className="p-2.5 w-12 text-center">No</th>
                      <th className="p-2.5">Jabatan Pengurus</th>
                      <th className="p-2.5">Nama File Gambar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                    {pengurusList.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="p-2.5 text-center text-slate-500 font-bold">
                          {p.nomorUrut < 10 ? `0${p.nomorUrut}` : p.nomorUrut}
                        </td>
                        <td className="p-2.5 font-sans font-medium text-slate-200">
                          {p.jabatan}
                        </td>
                        <td className="p-2.5 text-amber-300">
                          /images/{p.fotoFileName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handleCopyCheatSheet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                {copiedCheatSheet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCheatSheet ? 'Tersalin!' : 'Salin Semua Nama File'}</span>
              </button>
              <button
                onClick={() => setShowFileCheatSheet(false)}
                className="px-4 py-1.5 text-xs font-bold bg-amber-400 text-slate-950 rounded-lg hover:bg-amber-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
