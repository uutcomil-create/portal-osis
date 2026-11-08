import React, { useState } from 'react';
import { DAFTAR_28_PENGURUS, Pengurus } from '../data/pengurusData';
import { PengurusAvatar } from './PengurusAvatar';
import { Network, UserCheck, Shield, ChevronRight, Info, FolderCheck } from 'lucide-react';

interface StrukturProps {
  pengurusList?: Pengurus[];
  onSelectPengurus: (pengurus: Pengurus) => void;
}

export const StrukturOrganisasiSection: React.FC<StrukturProps> = ({
  pengurusList = DAFTAR_28_PENGURUS,
  onSelectPengurus
}) => {
  // Segregate positions
  const ketua = pengurusList.find((p) => p.jabatan.includes('Ketua Umum'));
  const wakil = pengurusList.find((p) => p.jabatan.includes('Wakil Ketua'));
  const sekretaris1 = pengurusList.find((p) => p.jabatan === 'Sekretaris 1');
  const sekretaris2 = pengurusList.find((p) => p.jabatan === 'Sekretaris 2');
  const bendahara1 = pengurusList.find((p) => p.jabatan === 'Bendahara 1');
  const bendahara2 = pengurusList.find((p) => p.jabatan === 'Bendahara 2');

  const sekbidPengurus = pengurusList.filter((p) => p.kategori !== 'BPH');

  // Render a single interactive organizational node
  const renderNode = (
    pengurus?: Pengurus,
    badgeColor: string = 'amber',
    isMarquee: boolean = false
  ) => {
    if (!pengurus) return null;

    return (
      <div
        onClick={() => onSelectPengurus(pengurus)}
        className={`group cursor-pointer rounded-xl p-3 sm:p-4 text-center transition-all duration-300 relative bg-slate-900/90 border hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 ${
          isMarquee
            ? 'border-amber-400/50 ring-1 ring-amber-400/30'
            : 'border-slate-800'
        }`}
      >
        {/* Photo / Avatar with automatic public/images resolution and professional fallback */}
        <div className="relative mx-auto mb-3 flex justify-center">
          <PengurusAvatar
            pengurus={pengurus}
            size="md"
            shape="circle"
            showBadge={true}
          />
        </div>

        {/* Name & Title */}
        <div className="mt-2">
          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
            {pengurus.jabatan}
          </p>
          <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {pengurus.nama}
          </h4>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1 text-[10px] text-slate-400 group-hover:text-slate-200">
          <span>Lihat Profil</span>
          <ChevronRight className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    );
  };

  return (
    <section id="struktur" className="relative py-20 bg-slate-950 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <span>Hierarki Kepengurusan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Struktur Organisasi OSIS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Bagan tata kelola organisasi resmi SMP Negeri 1 Ungaran dengan 28 pos amanah pengurus yang terkoordinasi secara profesional.
          </p>

          {/* Real image mapping hint */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <FolderCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Foto terhubung otomatis dari folder <code className="text-amber-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded">public/images/</code> (pengurus_01.jpg s.d. pengurus_28.jpg).
            </span>
          </div>
        </div>

        {/* ORGANIZATIONAL CHART CANVAS */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/40 border border-amber-500/20 shadow-2xl backdrop-blur-sm overflow-x-auto">
          {/* TOP TIER: PEMBINA & KEPALA SEKOLAH (PENGARAH) */}
          <div className="flex flex-col items-center mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
              <div className="rounded-xl p-4 bg-slate-900/90 border border-slate-700/80 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 mb-2">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Pelindung Organisasi
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Kepala SMP Negeri 1 Ungaran
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Penanggung Jawab Kebijakan Kesiswaan
                </div>
              </div>

              <div className="rounded-xl p-4 bg-slate-900/90 border border-slate-700/80 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-blue-400/10 flex items-center justify-center text-blue-400 mb-2">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Pembina OSIS
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Wakasek Kesiswaan & Tim Pembina
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Pembimbing Teknis & Pendamping Program
                </div>
              </div>
            </div>

            {/* Connecting Vertical Line */}
            <div className="w-0.5 h-8 bg-amber-500/40 mt-4" />
          </div>

          {/* LEVEL 1: KETUA UMUM OSIS */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-full max-w-xs">
              {renderNode(ketua, 'amber', true)}
            </div>
            <div className="w-0.5 h-8 bg-amber-500/40" />
          </div>

          {/* LEVEL 2: WAKIL KETUA OSIS */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-full max-w-xs">
              {renderNode(wakil, 'blue', true)}
            </div>
            <div className="w-0.5 h-8 bg-amber-500/40" />
          </div>

          {/* LEVEL 3: BADAN PENGURUS HARIAN (SEKRETARIS & BENDAHARA) */}
          <div className="mb-12">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-amber-400/90 uppercase tracking-widest px-3 py-1 rounded bg-slate-950 border border-amber-400/20">
                Kesekretariatan & Kebendaharaan
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {renderNode(sekretaris1)}
              {renderNode(sekretaris2)}
              {renderNode(bendahara1)}
              {renderNode(bendahara2)}
            </div>

            {/* Connecting Line to Sekbid */}
            <div className="flex justify-center mt-6">
              <div className="w-0.5 h-8 bg-amber-500/40" />
            </div>
          </div>

          {/* LEVEL 4: 10 SEKSI BIDANG (22 PENGURUS: 10 KOORDINATOR + 12 ANGGOTA) */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>10 Seksi Bidang (Sekbid 01 - 10)</span>
                  <span className="text-xs font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10">
                    22 Pengurus
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ujung tombak eksekusi program kerja tematik di seluruh aspek kesiswaan.
                </p>
              </div>

              <a
                href="#sekbid"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
              >
                <span>Lihat Kartu 10 Sekbid Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Grid of 22 Sekbid Members */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              {sekbidPengurus.map((pengurus) => (
                <div key={pengurus.id} className="w-full">
                  {renderNode(pengurus)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
