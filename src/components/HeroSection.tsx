import React from 'react';
import { ChevronDown, Users, Compass, Award, Sparkles, Building, ArrowRight } from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';

export const HeroSection: React.FC = () => {
  const { data } = useOsisData();
  const profil = data.profil;
  const jumlahPengurus = data.pengurus?.length || 28;
  const jumlahSekbid = data.sekbid?.length || 10;
  const jumlahProker = data.programKerja?.length || 24;
  // Pre-configured lightweight ambient particles for golden dust effect
  const particles = [
    { top: '25%', left: '15%', size: 'w-1.5 h-1.5', delay: '0s', duration: '8s' },
    { top: '65%', left: '22%', size: 'w-1 h-1', delay: '2s', duration: '10s' },
    { top: '35%', left: '78%', size: 'w-2 h-2', delay: '1s', duration: '9s' },
    { top: '75%', left: '85%', size: 'w-1.5 h-1.5', delay: '3.5s', duration: '11s' },
    { top: '15%', left: '55%', size: 'w-1 h-1', delay: '4s', duration: '7.5s' },
    { top: '80%', left: '45%', size: 'w-2 h-2', delay: '1.8s', duration: '12s' },
    { top: '45%', left: '38%', size: 'w-1.5 h-1.5', delay: '5s', duration: '8.5s' },
    { top: '55%', left: '68%', size: 'w-1 h-1', delay: '2.5s', duration: '9.5s' }
  ];

  return (
    <section
      id="beranda"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-gradient-drift"
    >
      {/* 1. Background Layer: Ambient animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl animate-ambient" />
        <div
          className="absolute top-1/3 -right-24 w-[32rem] h-[32rem] rounded-full bg-amber-500/15 blur-3xl animate-ambient"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute -bottom-24 left-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-900/25 blur-3xl animate-ambient"
          style={{ animationDelay: '8s' }}
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />

        {/* 2. Delicate Golden Particle Dust Effect */}
        {particles.map((p, idx) => (
          <div
            key={idx}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
            className={`absolute ${p.size} rounded-full bg-amber-400/60 blur-[0.5px] animate-particle pointer-events-none shadow-sm shadow-amber-300`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Entrance of Headline, Brand, Slogan, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* 3. Staggered Step 1: Trust Kicker */}
            <div
              style={{ animationDelay: '100ms' }}
              className="animate-text-reveal opacity-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Portal Resmi Masa Bakti {profil.masaBakti}</span>
              <span className="text-amber-400/50">·</span>
              <span className="hidden sm:inline">Kabupaten Semarang</span>
            </div>

            {/* 3. Staggered Step 2: Main Title Lockup */}
            <h1
              style={{ animationDelay: '250ms' }}
              className="animate-text-reveal opacity-0 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4 text-balance"
            >
              PORTAL DIGITAL{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                OSIS
              </span>
            </h1>

            {/* 3. Staggered Step 3: School Name */}
            <div
              style={{ animationDelay: '400ms' }}
              className="animate-text-reveal opacity-0 text-xl sm:text-2xl font-bold text-slate-200 tracking-wide uppercase mb-4 flex items-center gap-3"
            >
              <span>{profil.namaSekolah}</span>
            </div>

            {/* 3. Staggered Step 4: Slogan */}
            <p
              style={{ animationDelay: '550ms' }}
              className="animate-text-reveal opacity-0 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-light"
            >
              <span className="font-semibold text-amber-300 italic">"Mitreka Satata"</span> — {profil.slogan}
            </p>

            {/* 3. Staggered Step 5: Action Buttons with Interactive Touch/Click Scaling */}
            <div
              style={{ animationDelay: '700ms' }}
              className="animate-text-reveal opacity-0 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#profil"
                className="btn-interactive inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 group whitespace-nowrap"
              >
                <Compass className="w-4 h-4 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
                <span>Jelajahi Portal</span>
              </a>

              <a
                href="#pengurus"
                className="btn-interactive inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Lihat {jumlahPengurus} Pengurus</span>
              </a>

              <a
                href="#sekbid"
                className="btn-interactive inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-medium text-slate-400 hover:text-amber-300 transition-colors whitespace-nowrap"
              >
                <span>{jumlahSekbid} Seksi Bidang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 3. Staggered Step 6: Proof Metric Strip */}
            <div
              style={{ animationDelay: '850ms' }}
              className="animate-text-reveal opacity-0 mt-10 pt-6 border-t border-slate-800/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div>
                <div className="text-2xl font-bold text-white tabular-nums tracking-tight">{jumlahPengurus}</div>
                <div className="text-xs text-slate-400 font-medium">Pengurus Inti</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 tabular-nums tracking-tight">{jumlahSekbid}</div>
                <div className="text-xs text-slate-400 font-medium">Seksi Bidang</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tabular-nums tracking-tight">{jumlahProker}+</div>
                <div className="text-xs text-slate-400 font-medium">Program Kerja</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 tabular-nums tracking-tight">35+</div>
                <div className="text-xs text-slate-400 font-medium">Agenda Kegiatan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with School Emblem & Campus Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-500/40 via-blue-600/30 to-amber-300/40 rounded-3xl blur-md opacity-60 animate-ambient" />

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/25 shadow-2xl">
                {/* Campus Image with Scrim */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-800">
                  <img
                    src="/src/assets/images/hero_osis_school_1794066878401.jpg"
                    alt="Gedung Kampus SMP Negeri 1 Ungaran"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-xs text-slate-200">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kampus Unggulan Kabupaten Semarang</span>
                  </div>
                </div>

                {/* Floating Crest Card Overlay */}
                <div className="p-6 relative">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-950 p-1 border border-amber-400/40 shadow-xl shrink-0 -mt-12 relative z-10 overflow-hidden group">
                      <img
                        src="/src/assets/images/osis_emblem_gold_1794066879358.jpg"
                        alt="Lambang Emas OSIS SMP Negeri 1 Ungaran"
                        className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white leading-snug">
                        Organisasi Siswa Intra Sekolah
                      </h2>
                      <p className="text-xs text-amber-400 font-medium">
                        SMP Negeri 1 Ungaran · Terakreditasi A
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                    Wadah kepemimpinan siswa yang independen, demokratis, dan solutif dalam mendukung pendidikan karakter serta prestasi berkesinambungan.
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Sekolah Berwawasan Adiwiyata & Prestasi
                    </span>
                    <a
                      href="#struktur"
                      className="btn-interactive text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                    >
                      Bagan Organisasi
                      <ChevronDown className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
