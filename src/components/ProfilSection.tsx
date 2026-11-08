import React, { useState } from 'react';
import { Target, Compass, Award, History, HeartHandshake, CheckCircle } from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';
import { OsisProfil } from '../data/osisCentralData';

interface ProfilSectionProps {
  profil?: OsisProfil;
}

export const ProfilSection: React.FC<ProfilSectionProps> = ({ profil: propProfil }) => {
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'sejarah' | 'tujuan'>('visi-misi');
  const osisCtx = useOsisData();
  const profil = propProfil || osisCtx.data.profil;

  const misiItems = profil.misi || [];
  const tujuanItems = profil.tujuan || [];

  return (
    <section id="profil" className="relative py-20 lg:py-28 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Tentang Organisasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Profil & Arah Gerak OSIS Spensa
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Mengenal lebih dekat identitas, tonggak sejarah, visi luhur, dan komitmen pelayanan pengurus OSIS SMP Negeri 1 Ungaran.
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl mt-8">
            <button
              onClick={() => setActiveTab('visi-misi')}
              className={`btn-interactive px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'visi-misi'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visi & Misi
            </button>
            <button
              onClick={() => setActiveTab('sejarah')}
              className={`btn-interactive px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'sejarah'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sejarah Singkat
            </button>
            <button
              onClick={() => setActiveTab('tujuan')}
              className={`btn-interactive px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'tujuan'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tujuan Organisasi
            </button>
          </div>
        </div>

        {/* Tab 1: Visi & Misi */}
        {activeTab === 'visi-misi' && (
          <div className="animate-tab-fade grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visi Card */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-8 border border-amber-500/30 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Visi Kepengurusan
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 leading-snug">
                  "{profil.visi}"
                </h3>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-slate-300">Prinsip: Religius · Cerdas · Mandiri</span>
                <span className="text-amber-400 font-bold">{profil.masaBakti}</span>
              </div>
            </div>

            {/* Misi Card */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Misi Strategis Organisasi</h3>
                    <p className="text-xs text-slate-400">Pilar aksi nyata OSIS SMP Negeri 1 Ungaran</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {misiItems.map((misi, index) => (
                    <div key={index} className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-md bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {misi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Disepakati dalam Musyawarah Kerja OSIS Spensa</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sejarah Singkat */}
        {activeTab === 'sejarah' && (
          <div className="animate-tab-fade max-w-4xl mx-auto rounded-2xl bg-slate-900/80 p-8 sm:p-10 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Sejarah Kepemimpinan OSIS Spensa</h3>
                <p className="text-xs text-slate-400">Dedikasi berkesinambungan membina tunas bangsa di Kabupaten Semarang</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                {profil.sejarah}
              </p>
              <p>
                Memasuki era transformasi informasi, OSIS SMP Negeri 1 Ungaran meluncurkan <strong>Portal Digital OSIS</strong> sebagai media keterbukaan informasi, transparansi program kerja, arsip karya siswa, dan penghubung komunikasi interaktif bagi seluruh warga sekolah dan masyarakat luas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Tradisi Prestasi</div>
                <div className="text-xs text-slate-400 mt-1">Konsisten menyumbang prestasi akademik & non-akademik di Jateng.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Sekolah Adiwiyata</div>
                <div className="text-xs text-slate-400 mt-1">Komitmen pelestarian lingkungan dan budaya hijau ramah anak.</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-amber-400 font-bold text-sm">Pembaruan Digital</div>
                <div className="text-xs text-slate-400 mt-1">Transparansi kalender kerja dan partisipasi demokrasi siswa.</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tujuan Organisasi */}
        {activeTab === 'tujuan' && (
          <div className="animate-tab-fade grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {tujuanItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/80 p-6 border border-slate-800 hover:border-amber-400/30 transition-all duration-300 shadow-lg group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                    0{index + 1}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.judul}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-11">
                  {item.uraian}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
