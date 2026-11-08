import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  OsisDataBundle,
  OsisProfil,
  ValidationReport,
  INITIAL_OSIS_DATA,
  validateOsisData
} from '../data/osisCentralData';
import { Pengurus } from '../data/pengurusData';
import { SekbidItem } from '../data/sekbidData';
import { ProgramKerja } from '../data/programKerjaData';
import { FotoGaleri } from '../data/galeriData';
import {
  STORAGE_KEYS,
  getActiveGasUrl,
  setActiveGasUrl
} from '../config/backendConfig';
import {
  fetchOsisDataFromGAS,
  savePengurusToGAS,
  saveSekbidToGAS,
  saveProfilToGAS
} from '../services/googleAppsScriptService';

export type SyncStatus = 'idle' | 'loading' | 'success' | 'error';
export type DataSource = 'google_sheets' | 'local_storage' | 'initial_default';

interface OsisContextValue {
  data: OsisDataBundle;
  validation: ValidationReport;
  gasUrl: string;
  syncStatus: SyncStatus;
  syncMessage: string;
  lastSyncedAt: string | null;
  dataSource: DataSource;
  setGasUrl: (url: string) => void;
  syncFromGoogleSheets: (overrideUrl?: string) => Promise<{ success: boolean; message: string }>;
  updatePengurus: (updatedList: Pengurus[]) => { success: boolean; errors: string[] };
  updateSinglePengurus: (pengurus: Pengurus) => { success: boolean; errors: string[] };
  updateSekbid: (updatedSekbidList: SekbidItem[]) => void;
  updateSingleSekbid: (sekbid: SekbidItem) => void;
  updateProfil: (partialProfil: Partial<OsisProfil>) => void;
  updateProgramKerja: (programs: ProgramKerja[]) => void;
  updateGaleri: (photos: FotoGaleri[]) => void;
  resetToDefault: () => void;
}

const OsisDataContext = createContext<OsisContextValue | undefined>(undefined);

export const OsisDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gasUrl, setGasUrlState] = useState<string>(() => getActiveGasUrl());
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    } catch {
      return null;
    }
  });

  const [dataSource, setDataSource] = useState<DataSource>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CENTRAL_DATA);
      return stored ? 'local_storage' : 'initial_default';
    } catch {
      return 'initial_default';
    }
  });

  const [data, setData] = useState<OsisDataBundle>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CENTRAL_DATA);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed &&
          parsed.pengurus?.length === 28 &&
          parsed.sekbid?.length === 10 &&
          parsed.profil
        ) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Gagal membaca data dari localStorage, menggunakan data inisial.', e);
    }
    return INITIAL_OSIS_DATA;
  });

  // Validasi real-time setiap kali state berubah
  const validation = useMemo(() => {
    return validateOsisData(data);
  }, [data]);

  // Simpan ke localStorage otomatis saat data valid berubah
  const persistData = (newBundle: OsisDataBundle) => {
    setData(newBundle);
    try {
      localStorage.setItem(STORAGE_KEYS.CENTRAL_DATA, JSON.stringify(newBundle));
    } catch (e) {
      console.error('Gagal menyimpan data terpusat ke localStorage:', e);
    }
  };

  /**
   * Set Google Apps Script URL
   */
  const setGasUrl = useCallback((newUrl: string) => {
    const trimmed = newUrl.trim();
    setActiveGasUrl(trimmed);
    setGasUrlState(trimmed);
  }, []);

  /**
   * Sinkronisasi data dari Google Sheets melalui Google Apps Script Web App
   */
  const syncFromGoogleSheets = useCallback(
    async (overrideUrl?: string): Promise<{ success: boolean; message: string }> => {
      const targetUrl = overrideUrl || gasUrl;
      if (!targetUrl) {
        setSyncStatus('idle');
        setSyncMessage('URL Google Apps Script belum ditentukan.');
        return { success: false, message: 'URL Google Apps Script belum ditentukan.' };
      }

      setSyncStatus('loading');
      setSyncMessage('Menghubungi Google Apps Script & Google Sheets...');

      try {
        const response = await fetchOsisDataFromGAS(targetUrl);
        if (response.success && response.data) {
          persistData(response.data);
          const nowStr = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          const timeStamp = `${new Date().toLocaleDateString('id-ID')} ${nowStr}`;

          setLastSyncedAt(timeStamp);
          setDataSource('google_sheets');
          setSyncStatus('success');
          setSyncMessage('Data berhasil disinkronkan dari Google Sheets!');

          try {
            localStorage.setItem(STORAGE_KEYS.LAST_SYNC, timeStamp);
          } catch {
            // ignore
          }

          return { success: true, message: response.message };
        } else {
          setSyncStatus('error');
          setSyncMessage(response.message);
          return { success: false, message: response.message };
        }
      } catch (err: any) {
        setSyncStatus('error');
        const errMsg = err.message || 'Gagal tersambung ke Google Apps Script.';
        setSyncMessage(errMsg);
        return { success: false, message: errMsg };
      }
    },
    [gasUrl]
  );

  // Auto-sync di latar belakang saat aplikasi pertama kali dimuat jika URL GAS telah dikonfigurasi
  useEffect(() => {
    if (gasUrl) {
      syncFromGoogleSheets(gasUrl).catch((e) => {
        console.warn('Auto-sync background check:', e);
      });
    }
  }, []);

  const updatePengurus = (updatedList: Pengurus[]) => {
    const candidateBundle: OsisDataBundle = { ...data, pengurus: updatedList };
    const report = validateOsisData(candidateBundle);

    if (!report.isValid) {
      return { success: false, errors: report.errors };
    }

    persistData(candidateBundle);

    // Sync ke Google Sheets secara asinkron jika GAS URL aktif
    if (gasUrl) {
      savePengurusToGAS(updatedList, gasUrl).catch((err) => {
        console.warn('Gagal auto-sync pengurus ke Google Sheets:', err);
      });
    }

    return { success: true, errors: [] };
  };

  const updateSinglePengurus = (single: Pengurus) => {
    const updatedList = data.pengurus.map((p) => (p.id === single.id ? single : p));
    return updatePengurus(updatedList);
  };

  const updateSekbid = (updatedSekbidList: SekbidItem[]) => {
    persistData({ ...data, sekbid: updatedSekbidList });
    if (gasUrl) {
      saveSekbidToGAS(updatedSekbidList, gasUrl).catch((err) => {
        console.warn('Gagal auto-sync sekbid ke Google Sheets:', err);
      });
    }
  };

  const updateSingleSekbid = (single: SekbidItem) => {
    const updatedList = data.sekbid.map((s) => (s.id === single.id ? single : s));
    updateSekbid(updatedList);
  };

  const updateProfil = (partialProfil: Partial<OsisProfil>) => {
    const updatedProfil = { ...data.profil, ...partialProfil };
    persistData({
      ...data,
      profil: updatedProfil
    });
    if (gasUrl) {
      saveProfilToGAS(updatedProfil, gasUrl).catch((err) => {
        console.warn('Gagal auto-sync profil ke Google Sheets:', err);
      });
    }
  };

  const updateProgramKerja = (programs: ProgramKerja[]) => {
    persistData({ ...data, programKerja: programs });
  };

  const updateGaleri = (photos: FotoGaleri[]) => {
    persistData({ ...data, galeri: photos });
  };

  const resetToDefault = () => {
    persistData(INITIAL_OSIS_DATA);
    setDataSource('initial_default');
    try {
      localStorage.removeItem(STORAGE_KEYS.CENTRAL_DATA);
      localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
      setLastSyncedAt(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <OsisDataContext.Provider
      value={{
        data,
        validation,
        gasUrl,
        syncStatus,
        syncMessage,
        lastSyncedAt,
        dataSource,
        setGasUrl,
        syncFromGoogleSheets,
        updatePengurus,
        updateSinglePengurus,
        updateSekbid,
        updateSingleSekbid,
        updateProfil,
        updateProgramKerja,
        updateGaleri,
        resetToDefault
      }}
    >
      {children}
    </OsisDataContext.Provider>
  );
};

export const useOsisData = (): OsisContextValue => {
  const context = useContext(OsisDataContext);
  if (!context) {
    throw new Error('useOsisData must be used within an OsisDataProvider');
  }
  return context;
};
