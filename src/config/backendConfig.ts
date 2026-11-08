/**
 * Konfigurasi Backend Google Apps Script & Google Sheets
 * Portal Digital OSIS SMP Negeri 1 Ungaran
 */

export const STORAGE_KEYS = {
  GAS_URL: 'osis_spensa_gas_deployment_url',
  CENTRAL_DATA: 'osis_spensa_central_master_data_v2',
  LAST_SYNC: 'osis_spensa_last_synced_timestamp'
} as const;

export const SHEET_TABS = {
  PENGURUS: 'Pengurus',
  SEKBID: 'Sekbid',
  PROFIL: 'Profil',
  PROGRAM_KERJA: 'ProgramKerja',
  GALERI: 'Galeri'
} as const;

export interface BackendConfig {
  gasDeploymentUrl: string;
  isConfigured: boolean;
  timeoutMs: number;
  autoSyncOnLoad: boolean;
}

/**
 * Mengambil URL Google Apps Script yang aktif:
 * 1. Dari localStorage (jika admin telah memasukkan URL melalui UI)
 * 2. Dari environment variable VITE_GAS_WEBAPP_URL
 * 3. Kosong (string kosong jika belum dikonfigurasi)
 */
export function getActiveGasUrl(): string {
  try {
    const customUrl = localStorage.getItem(STORAGE_KEYS.GAS_URL);
    if (customUrl && customUrl.trim().startsWith('https://script.google.com/macros/s/')) {
      return customUrl.trim();
    }
  } catch {
    // localStorage disabled or error
  }

  const envUrl = (import.meta as any).env?.VITE_GAS_WEBAPP_URL;
  if (typeof envUrl === 'string' && envUrl.trim().startsWith('https://script.google.com/macros/s/')) {
    return envUrl.trim();
  }

  return '';
}

/**
 * Menyimpan URL Google Apps Script ke penyimpanan lokal
 */
export function setActiveGasUrl(url: string): void {
  try {
    if (!url || url.trim() === '') {
      localStorage.removeItem(STORAGE_KEYS.GAS_URL);
    } else {
      localStorage.setItem(STORAGE_KEYS.GAS_URL, url.trim());
    }
  } catch (e) {
    console.error('Gagal menyimpan URL Google Apps Script:', e);
  }
}

export const DEFAULT_BACKEND_CONFIG: BackendConfig = {
  gasDeploymentUrl: getActiveGasUrl(),
  isConfigured: Boolean(getActiveGasUrl()),
  timeoutMs: 12000,
  autoSyncOnLoad: true
};
