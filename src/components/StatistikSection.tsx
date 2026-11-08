import React from 'react';
import { Users, LayoutGrid, CalendarCheck, Flag, CheckCircle2 } from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';

export const StatistikSection: React.FC = () => {
  const { data } = useOsisData();
  const jumlahPengurus = data.pengurus?.length || 28;
  const jumlahSekbid = data.sekbid?.length || 10;
  const jumlahProker = data.programKerja?.length || 24;
  const masaBakti = data.profil?.masaBakti || '2025/2026';

  const stats = [
    {
      angka: `${jumlahPengurus}`,
      satuan: 'Siswa',
      label: 'Pengurus OSIS Terpilih',
      deskripsi: 'Terdiri dari Pimpinan Inti BPH dan 10 Seksi Bidang melalui seleksi LDKS yang ketat.',
      icon: Users,
      highlight: true
    },
    {
      angka: `${jumlahSekbid}`,
      satuan: 'Bidang',
      label: 'Seksi Bidang Terpadu',
      deskripsi: 'Mencakup pembinaan spiritual, karakter, wawasan kebangsaan, olahraga, hingga TIK.',
      icon: LayoutGrid,
      highlight: false
    },
    {
      angka: `${jumlahProker}+`,
      satuan: 'Program',
      label: 'Program Kerja Terencana',
      deskripsi: 'Tersusun rapi dalam agenda tahunan, bulanan, dan kegiatan rutin mingguan siswa.',
      icon: CalendarCheck,
      highlight: false
    },
    {
      angka: '35+',
      satuan: 'Agenda',
      label: 'Kegiatan & Kolaborasi',
      deskripsi: 'Event internal sekolah serta partisipasi aktif tingkat Kabupaten Semarang.',
      icon: Flag,
      highlight: true
    }
  ];

  return (
    <section className="relative py-14 bg-slate-900/60 border-y border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-xl p-6 bg-slate-950/70 border border-slate-800/80 hover:border-amber-400/40 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-amber-400/10 text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-amber-400/80 transition-colors">
                    {item.satuan}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
                    {item.angka}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-200 mb-2">
                  {item.label}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.deskripsi}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Masa Bakti {masaBakti}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
