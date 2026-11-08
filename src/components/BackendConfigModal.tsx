import React, { useState } from 'react';
import {
  X,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Code2,
  TableProperties,
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useOsisData } from '../context/OsisDataContext';
import {
  READY_TO_USE_APPS_SCRIPT_CODE,
  testGasConnection
} from '../services/googleAppsScriptService';
import { SHEET_TABS } from '../config/backendConfig';

interface BackendConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendConfigModal: React.FC<BackendConfigModalProps> = ({ isOpen, onClose }) => {
  const {
    gasUrl,
    setGasUrl,
    syncStatus,
    syncMessage,
    lastSyncedAt,
    dataSource,
    syncFromGoogleSheets
  } = useOsisData();

  const [inputUrl, setInputUrl] = useState<string>(gasUrl);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'koneksi' | 'panduan' | 'struktur'>('koneksi');

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!inputUrl.trim()) {
      setTestResult({
        success: false,
        message: 'Masukkan URL Google Apps Script terlebih dahulu.'
      });
      return;
    }

    setTesting(true);
    setTestResult(null);

    const res = await testGasConnection(inputUrl.trim());
    setTesting(false);
    setTestResult({
      success: res.success,
      message: res.message
    });
  };

  const handleSaveAndSync = async () => {
    setGasUrl(inputUrl.trim());
    setTestResult(null);
    if (inputUrl.trim()) {
      await syncFromGoogleSheets(inputUrl.trim());
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(READY_TO_USE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md animate-fade-in"
    >
      <div className="relative max-w-3xl w-full bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Integrasi Backend Google Apps Script & Sheets</span>
              </h3>
              <p className="text-xs text-slate-400">
                Hubungkan Portal OSIS SMP Negeri 1 Ungaran dengan Google Spreadsheet Anda.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('koneksi')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'koneksi'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Koneksi URL</span>
          </button>
          <button
            onClick={() => setActiveTab('panduan')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'panduan'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Kode Apps Script (Code.gs)</span>
          </button>
          <button
            onClick={() => setActiveTab('struktur')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'struktur'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TableProperties className="w-4 h-4" />
            <span>5 Tab Spreadsheet</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'koneksi' && (
            <div className="space-y-5">
              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      dataSource === 'google_sheets'
                        ? 'bg-emerald-400 animate-pulse'
                        : 'bg-amber-400'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Sumber Data:</span>
                      <span className={dataSource === 'google_sheets' ? 'text-emerald-400' : 'text-amber-300'}>
                        {dataSource === 'google_sheets' ? 'Google Sheets (Live Sync)' : 'Penyimpanan Lokal / Master Standar'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {lastSyncedAt
                        ? `Terakhir disinkronkan: ${lastSyncedAt}`
                        : 'Belum disinkronkan ke Google Sheets.'}
                    </div>
                  </div>
                </div>

                {gasUrl && (
                  <button
                    onClick={() => syncFromGoogleSheets()}
                    disabled={syncStatus === 'loading'}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'loading' ? 'animate-spin text-amber-400' : ''}`} />
                    <span>{syncStatus === 'loading' ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
                  </button>
                )}
              </div>

              {/* Status Message feedback */}
              {syncMessage && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    syncStatus === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : syncStatus === 'error'
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300'
                  }`}
                >
                  {syncStatus === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : syncStatus === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <RefreshCw className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-spin" />
                  )}
                  <span>{syncMessage}</span>
                </div>
              )}

              {/* Form Input URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-200 block">
                  URL Deployment Google Apps Script (Web App) <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Dapatkan URL ini setelah menerapkan (Deploy) skrip Web App di Google Sheets dengan opsi{' '}
                  <strong className="text-slate-300">"Execute as: Me"</strong> dan{' '}
                  <strong className="text-slate-300">"Who has access: Anyone"</strong>.
                </p>
              </div>

              {/* Test Connection Result */}
              {testResult && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    testResult.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Radio className={`w-3.5 h-3.5 text-amber-400 ${testing ? 'animate-ping' : ''}`} />
                  <span>{testing ? 'Menguji...' : 'Uji Koneksi (Ping)'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {inputUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setInputUrl('');
                        setGasUrl('');
                        setTestResult(null);
                      }}
                      className="px-3 py-2 text-xs text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Hapus URL
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveAndSync}
                    disabled={syncStatus === 'loading'}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Simpan & Sinkronkan</span>
                  </button>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300/90 space-y-1">
                <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privasi & Keamanan:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Data diproses langsung antara peramban pengunjung dan Google Sheets sekolah Anda tanpa perantara pihak ketiga. Jika URL belum dipasang, Portal OSIS tetap beroperasi lancar dengan data master bawaan.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'panduan' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
                <h4 className="font-bold text-amber-400 flex items-center gap-2">
                  <span>Langkah Cepat Setup Google Sheets (± 2 Menit):</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-xs leading-relaxed">
                  <li>Buat Spreadsheet baru di Google Drive (misal: <em>"Database Portal OSIS SMPN 1 Ungaran"</em>).</li>
                  <li>Buka menu <strong>Ekstensi (Extensions) &gt; Apps Script</strong>.</li>
                  <li>Hapus kode bawaan di editor, lalu klik tombol <strong>"Salin Seluruh Kode Apps Script"</strong> di bawah dan tempelkan.</li>
                  <li>Di bilah atas editor Apps Script, pilih fungsi <code>inisialisasiDatabase</code> lalu klik <strong>Jalankan (Run)</strong> untuk membuat 5 lembar tab otomatis.</li>
                  <li>Klik tombol biru <strong>Terapkan (Deploy) &gt; Penerapan Baru (New deployment)</strong>.</li>
                  <li>Pilih jenis <strong>Aplikasi Web (Web app)</strong>:</li>
                  <ul className="list-disc list-inside pl-5 text-[11px] text-amber-300/90 space-y-0.5">
                    <li>Jalankan sebagai: <em>Saya (email Anda)</em></li>
                    <li>Siapa yang memiliki akses: <em>Siapa saja (Anyone)</em></li>
                  </ul>
                  <li>Salin URL Web App yang dihasilkan lalu tempelkan di tab <strong>Koneksi URL</strong>.</li>
                </ol>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Script Lengkap Google Apps Script (Code.gs):
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-sm"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Tersalin!' : 'Salin Kode Script'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-64 overflow-y-auto leading-relaxed">
                <pre>{READY_TO_USE_APPS_SCRIPT_CODE}</pre>
              </div>
            </div>
          )}

          {activeTab === 'struktur' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Google Spreadsheet dikelola melalui 5 tab lembar kerja terpisah yang saling terhubung:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Tab 1: {SHEET_TABS.PENGURUS}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    28 Baris Pengurus: ID, Nomor Urut (01–28), Jabatan, Nama Siswa, Kelas, Foto File Name, Email, Tugas Pokok, Motto.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Tab 2: {SHEET_TABS.SEKBID}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    10 Baris Seksi Bidang: ID, Nomor, Nama Bidang, Nama Singkat, Koordinator, Anggota, Deskripsi, Proker, Dokumentasi.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Tab 3: {SHEET_TABS.PROFIL}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Identitas Organisasi: Nama Sekolah, Slogan, Visi, Misi (5 Pilar), Sejarah, Masa Bakti, Tujuan.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Tab 4: {SHEET_TABS.PROGRAM_KERJA}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Program Kerja Terpadu: Judul, Sekbid ID, Kategori, Deskripsi, Periode, Sasaran, Status, Indikator.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 sm:col-span-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <TableProperties className="w-3.5 h-3.5" />
                    <span>Tab 5: {SHEET_TABS.GALERI}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Galeri Foto Siswa: Judul Foto, Kategori, Tanggal, Lokasi, URL Gambar, Deskripsi, Fotografer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Backend API: Google Apps Script Web App (JSON)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
