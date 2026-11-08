import React, { useState } from 'react';
import { Pengurus } from './data/pengurusData';
import { FotoGaleri } from './data/galeriData';
import { SekbidItem } from './data/sekbidData';
import { OsisDataProvider, useOsisData } from './context/OsisDataContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';

import { Navbar } from './components/Navbar';
import { AdminTopBar } from './components/AdminTopBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';

import { HeroSection } from './components/HeroSection';
import { StatistikSection } from './components/StatistikSection';
import { ProfilSection } from './components/ProfilSection';
import { StrukturOrganisasiSection } from './components/StrukturOrganisasiSection';
import { PengurusSection } from './components/PengurusSection';
import { SekbidSection } from './components/SekbidSection';
import { ProgramKerjaSection } from './components/ProgramKerjaSection';
import { GaleriSection } from './components/GaleriSection';
import { KontakSection } from './components/KontakSection';
import { Footer } from './components/Footer';

import { PengurusModal } from './components/PengurusModal';
import { SekbidModal } from './components/SekbidModal';
import { LightboxModal } from './components/LightboxModal';
import { RosterEditorModal } from './components/RosterEditorModal';
import { BackendConfigModal } from './components/BackendConfigModal';
import { FadeInSection } from './components/FadeInSection';
import { PageLoader } from './components/PageLoader';

function MainPortalContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAdminAuth();
  const {
    data,
    updatePengurus,
    updateSingleSekbid,
    resetToDefault
  } = useOsisData();

  const [selectedPengurus, setSelectedPengurus] = useState<Pengurus | null>(null);
  const [selectedSekbid, setSelectedSekbid] = useState<SekbidItem | null>(null);
  const [selectedFoto, setSelectedFoto] = useState<FotoGaleri | null>(null);
  const [isRosterEditorOpen, setIsRosterEditorOpen] = useState(false);
  const [isBackendConfigOpen, setIsBackendConfigOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | undefined>(undefined);

  const pengurusList = data.pengurus;
  const sekbidList = data.sekbid;

  const handleSaveRoster = (updated: Pengurus[]) => {
    return updatePengurus(updated);
  };

  const handleSaveSekbid = (updated: SekbidItem) => {
    updateSingleSekbid(updated);
    setSelectedSekbid(updated);
  };

  const handleResetDefault = () => {
    resetToDefault();
  };

  // Lightbox Next/Prev Navigation
  const handlePrevFoto = () => {
    if (!selectedFoto) return;
    const currentIndex = data.galeri.findIndex((f) => f.id === selectedFoto.id);
    const prevIndex = (currentIndex - 1 + data.galeri.length) % data.galeri.length;
    setSelectedFoto(data.galeri[prevIndex]);
  };

  const handleNextFoto = () => {
    if (!selectedFoto) return;
    const currentIndex = data.galeri.findIndex((f) => f.id === selectedFoto.id);
    const nextIndex = (currentIndex + 1) % data.galeri.length;
    setSelectedFoto(data.galeri[nextIndex]);
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950 transition-all ${
        isAdmin ? 'pt-9' : ''
      }`}
    >
      {/* 0. Top Admin Bar for Authenticated Admin */}
      <AdminTopBar
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenRosterEditor={() => {
          setEditingMemberId(undefined);
          setIsRosterEditorOpen(true);
        }}
        onOpenBackendConfig={() => setIsBackendConfigOpen(true)}
      />

      {/* Initial Page Loading Animation */}
      {isLoading && <PageLoader onFinished={() => setIsLoading(false)} />}

      {/* 1. Header & Navigation Bar */}
      <Navbar
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenRosterEditor={() => setIsRosterEditorOpen(true)}
        onOpenBackendConfig={() => setIsBackendConfigOpen(true)}
      />

      {/* Main Sections with Intersection Observer Fade-in Scroll Reveal */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Key Statistics Strip */}
        <FadeInSection delayMs={50}>
          <StatistikSection />
        </FadeInSection>

        {/* 4. Profil OSIS (Sejarah, Visi, Misi, Tujuan) */}
        <FadeInSection>
          <ProfilSection />
        </FadeInSection>

        {/* 5. Struktur Organisasi (Hierarchical Chart with 28 position slots) */}
        <FadeInSection>
          <StrukturOrganisasiSection
            pengurusList={pengurusList}
            onSelectPengurus={(pengurus) => setSelectedPengurus(pengurus)}
          />
        </FadeInSection>

        {/* 6. Daftar 28 Pengurus (Profile Cards, Search, Filter) */}
        <FadeInSection>
          <PengurusSection
            pengurusList={pengurusList}
            onSelectPengurus={(pengurus) => setSelectedPengurus(pengurus)}
            onOpenRosterEditor={() => {
              setEditingMemberId(undefined);
              setIsRosterEditorOpen(true);
            }}
          />
        </FadeInSection>

        {/* 7. 10 Seksi Bidang (Sekbid Cards & Detail View) */}
        <FadeInSection>
          <SekbidSection
            sekbidList={sekbidList}
            onSelectSekbid={(sekbid) => setSelectedSekbid(sekbid)}
          />
        </FadeInSection>

        {/* 8. Program Kerja Terpadu */}
        <FadeInSection>
          <ProgramKerjaSection />
        </FadeInSection>

        {/* 9. Galeri Foto Kegiatan Siswa */}
        <FadeInSection>
          <GaleriSection
            onOpenLightbox={(foto) => setSelectedFoto(foto)}
          />
        </FadeInSection>

        {/* 10. Kontak Resmi & Kotak Aspirasi */}
        <FadeInSection>
          <KontakSection />
        </FadeInSection>
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenRosterEditor={() => setIsRosterEditorOpen(true)}
        onOpenBackendConfig={() => setIsBackendConfigOpen(true)}
      />

      {/* Interactive Modals */}
      <PengurusModal
        pengurus={selectedPengurus}
        onClose={() => setSelectedPengurus(null)}
        onEdit={(pengurus) => {
          setEditingMemberId(pengurus.id);
          setIsRosterEditorOpen(true);
        }}
      />

      <SekbidModal
        sekbid={selectedSekbid}
        onClose={() => setSelectedSekbid(null)}
        onSave={handleSaveSekbid}
        onSelectPhoto={(url, caption) => {
          setSelectedFoto({
            id: 'sekbid-foto-zoom',
            judul: caption,
            kategori: 'Kreativitas & Digital',
            tanggal: 'Dokumentasi Sekbid',
            lokasi: 'SMP Negeri 1 Ungaran',
            gambarUrl: url,
            deskripsi: caption,
            fotografer: 'Dokumentasi Sekbid OSIS'
          });
        }}
      />

      <LightboxModal
        foto={selectedFoto}
        onClose={() => setSelectedFoto(null)}
        onPrev={handlePrevFoto}
        onNext={handleNextFoto}
      />

      {/* Full Dedicated Administrator Dashboard */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onOpenRosterEditor={() => {
          setIsAdminDashboardOpen(false);
          setEditingMemberId(undefined);
          setIsRosterEditorOpen(true);
        }}
        onOpenBackendConfig={() => {
          setIsAdminDashboardOpen(false);
          setIsBackendConfigOpen(true);
        }}
      />

      {/* Quick Roster Editor Modal (Protected for Admin) */}
      <RosterEditorModal
        isOpen={isRosterEditorOpen}
        onClose={() => {
          setIsRosterEditorOpen(false);
          setEditingMemberId(undefined);
        }}
        pengurusList={pengurusList}
        onSaveList={handleSaveRoster}
        onResetDefault={handleResetDefault}
        selectedId={editingMemberId}
      />

      {/* Google Apps Script & Google Sheets Backend Integration Modal */}
      <BackendConfigModal
        isOpen={isBackendConfigOpen}
        onClose={() => setIsBackendConfigOpen(false)}
      />

      {/* Admin Authentication Login Modal */}
      <AdminLoginModal />
    </div>
  );
}

export default function App() {
  return (
    <OsisDataProvider>
      <AdminAuthProvider>
        <MainPortalContent />
      </AdminAuthProvider>
    </OsisDataProvider>
  );
}
