/**
 * Service API untuk Komunikasi dengan Google Apps Script & Google Sheets
 * Portal Digital OSIS SMP Negeri 1 Ungaran
 */

import { OsisDataBundle, OsisProfil, INITIAL_OSIS_DATA, validateOsisData } from '../data/osisCentralData';
import { Pengurus } from '../data/pengurusData';
import { SekbidItem } from '../data/sekbidData';
import { ProgramKerja } from '../data/programKerjaData';
import { FotoGaleri } from '../data/galeriData';
import { getActiveGasUrl, SHEET_TABS } from '../config/backendConfig';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
  source?: 'google_sheets' | 'local_fallback';
  errors?: string[];
}

/**
 * Script Google Apps Script (Code.gs) yang siap disalin oleh pengelola/pembina OSIS
 * untuk ditempelkan di Extensions > Apps Script pada Google Sheets.
 */
export const READY_TO_USE_APPS_SCRIPT_CODE = `/**
 * =================================================================================
 * BACKEND PORTAL DIGITAL OSIS SMP NEGERI 1 UNGARAN
 * Google Apps Script Web App API
 * =================================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Sheets baru di Google Drive Anda.
 * 2. Beri nama spreadsheet: "Database Portal OSIS SMPN 1 Ungaran".
 * 3. Klik menu: Ekstensi (Extensions) > Apps Script.
 * 4. Hapus seluruh isi kode lama, lalu tempel (paste) seluruh kode ini.
 * 5. Jalankan fungsi "inisialisasiDatabase()" sekali (Klik Run/Jalankan) untuk membuat seluruh tabel dan header secara otomatis.
 * 6. Klik tombol "Terapkan" (Deploy) > "Penerapan baru" (New deployment).
 * 7. Pilih jenis: "Aplikasi Web" (Web App).
 * 8. Konfigurasi:
 *    - Jalankan sebagai (Execute as): Saya (Me / email Anda)
 *    - Siapa yang memiliki akses (Who has access): Siapa saja (Anyone)
 * 9. Salin URL Aplikasi Web yang diberikan (format: https://script.google.com/macros/s/.../exec).
 * 10. Masukkan URL tersebut pada Portal OSIS di menu "Integrasi Backend Google Sheets".
 * =================================================================================
 */

var TAB_PENGURUS = "Pengurus";
var TAB_SEKBID = "Sekbid";
var TAB_PROFIL = "Profil";
var TAB_PROGRAM_KERJA = "ProgramKerja";
var TAB_GALERI = "Galeri";

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "getAll";
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    if (action === "ping") {
      return jsonResponse({
        success: true,
        message: "Koneksi Google Apps Script & Google Sheets SMP Negeri 1 Ungaran Berhasil Aktif!",
        spreadsheetName: ss.getName(),
        sheets: ss.getSheets().map(function(s) { return s.getName(); }),
        timestamp: new Date().toISOString()
      });
    }

    // Default: Ambil seluruh data OSIS secara terpadu
    var bundle = {
      profil: getProfilData(ss),
      pengurus: getPengurusData(ss),
      sekbid: getSekbidData(ss),
      programKerja: getProgramKerjaData(ss),
      galeri: getGaleriData(ss)
    };

    return jsonResponse({
      success: true,
      message: "Data OSIS berhasil diambil dari Google Sheets",
      data: bundle,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: "Gagal mengambil data dari Google Sheets: " + err.toString(),
      error: err.toString()
    });
  }
}

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : "";
    var payload = JSON.parse(contents);
    var action = payload.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "updatePengurus") {
      var result = savePengurusData(ss, payload.pengurus);
      return jsonResponse(result);
    } else if (action === "updateSekbid") {
      var result = saveSekbidData(ss, payload.sekbid);
      return jsonResponse(result);
    } else if (action === "updateProfil") {
      var result = saveProfilData(ss, payload.profil);
      return jsonResponse(result);
    } else if (action === "syncAll") {
      if (payload.data.pengurus) savePengurusData(ss, payload.data.pengurus);
      if (payload.data.sekbid) saveSekbidData(ss, payload.data.sekbid);
      if (payload.data.profil) saveProfilData(ss, payload.data.profil);
      return jsonResponse({
        success: true,
        message: "Seluruh data berhasil disinkronkan ke Google Sheets."
      });
    }

    return jsonResponse({ success: false, message: "Aksi tidak dikenal: " + action });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: "Error pemrosesan POST: " + err.toString()
    });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// -------------------------------------------------------------
// HELPER PEMBACA DATA DARI SETIAP TAB SPREADSHEET
// -------------------------------------------------------------

function getPengurusData(ss) {
  var sheet = ss.getSheetByName(TAB_PENGURUS);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    list.push({
      id: String(row[0]),
      nomorUrut: Number(row[1]) || (i),
      jabatan: String(row[2]),
      nama: String(row[3]),
      kelas: String(row[4]),
      fotoFileName: String(row[5] || ("pengurus_" + (i < 10 ? "0" + i : i) + ".jpg")),
      emailKontak: String(row[6] || ""),
      tugasPokok: String(row[7] || ""),
      motto: String(row[8] || "")
    });
  }
  return list;
}

function getSekbidData(ss) {
  var sheet = ss.getSheetByName(TAB_SEKBID);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    var anggotaArr = [];
    if (row[5]) {
      anggotaArr = String(row[5]).split(";").map(function(s) { return s.trim(); }).filter(Boolean);
    }
    var prokerArr = [];
    if (row[7]) {
      prokerArr = String(row[7]).split(";").map(function(s) { return s.trim(); }).filter(Boolean);
    }

    list.push({
      id: Number(row[0]),
      nomor: String(row[1]),
      namaBidang: String(row[2]),
      namaSingkat: String(row[3]),
      koordinator: String(row[4]),
      anggota: anggotaArr,
      deskripsi: String(row[6]),
      programKerja: prokerArr,
      dokumentasi: String(row[8] || "")
    });
  }
  return list;
}

function getProfilData(ss) {
  var sheet = ss.getSheetByName(TAB_PROFIL);
  var defaultProfil = {
    namaSekolah: "SMP Negeri 1 Ungaran",
    namaOrganisasi: "OSIS SMP Negeri 1 Ungaran",
    slogan: "Mitreka Satata - Membentuk generasi berkarakter, berintegritas, dan berprestasi.",
    motto: "Memimpin dengan keteladanan, melayani dengan dedikasi.",
    masaBakti: "2025/2026",
    visi: "Menjadikan OSIS SMP Negeri 1 Ungaran sebagai motor penggerak siswa yang berakhlak mulia, cerdas, berkarakter luhur, dan kompetitif di era digital berlandaskan semangat kebersamaan.",
    misi: [
      "Meningkatkan keimanan, ketakwaan, dan toleransi beragama seluruh siswa melalui pembiasaan ibadah rutin.",
      "Menegakkan budaya disiplin, sopan santun (5S), dan integritas moral dalam pergaulan lingkungan sekolah.",
      "Menyelenggarakan program kerja yang inovatif, aspiratif, serta mengembangkan bakat akademik, seni, dan olahraga.",
      "Mendorong pemanfaatan teknologi informasi (TIK) yang cerdas, etis, dan produktif untuk kesiswaan.",
      "Mewujudkan kepedulian sosial, cinta lingkungan hidup (Adiwiyata), dan kebanggaan terhadap budaya Indonesia."
    ],
    sejarah: "SMP Negeri 1 Ungaran merupakan salah satu institusi pendidikan menengah pertama tertua dan paling berprestasi di Kabupaten Semarang, Jawa Tengah. Sejak berdirinya, OSIS SMP Negeri 1 Ungaran senantiasa hadir sebagai wadah tunggal kesiswaan yang membina kedewasaan berorganisasi, kreativitas, dan kepemimpinan para siswa.",
    tujuan: [
      { judul: "Kepemimpinan Berintegritas", uraian: "Mencetak kader pemimpin muda yang bertanggung jawab, bijaksana, dan mampu menjadi teladan bagi rekan sebaya." },
      { judul: "Penyalur Aspirasi Siswa", uraian: "Menjadi jembatan komunikasi yang harmonis dan efektif antara peserta didik, dewan guru, dan kepala sekolah." },
      { judul: "Pengembangan Minat & Bakat", uraian: "Menyediakan wadah positif bagi penyaluran kreasi seni, keolahragaan, sains, jurnalistik, dan kewirausahaan." },
      { judul: "Kultur Sekolah Unggul", uraian: "Mendukung terciptanya iklim sekolah yang aman, nyaman, bebas perundungan, dan berprestasi di tingkat Jawa Tengah." }
    ]
  };

  if (!sheet) return defaultProfil;
  var data = sheet.getDataRange().getValues();
  var map = {};
  for (var i = 1; i < data.length; i++) {
    var key = String(data[i][0]).trim();
    var val = data[i][1];
    if (key) map[key] = val;
  }

  if (map["visi"]) defaultProfil.visi = String(map["visi"]);
  if (map["slogan"]) defaultProfil.slogan = String(map["slogan"]);
  if (map["masaBakti"]) defaultProfil.masaBakti = String(map["masaBakti"]);
  if (map["sejarah"]) defaultProfil.sejarah = String(map["sejarah"]);
  if (map["misi"]) {
    defaultProfil.misi = String(map["misi"]).split("\\n").map(function(s) { return s.trim(); }).filter(Boolean);
  }

  return defaultProfil;
}

function getProgramKerjaData(ss) {
  var sheet = ss.getSheetByName(TAB_PROGRAM_KERJA);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    list.push({
      id: String(row[0]),
      judul: String(row[1]),
      sekbidId: Number(row[2]) || 1,
      sekbidNama: String(row[3]),
      kategori: String(row[4]),
      deskripsi: String(row[5]),
      periode: String(row[6]),
      sasaran: String(row[7]),
      status: String(row[8]),
      indikatorKeberhasilan: String(row[9] || "")
    });
  }
  return list;
}

function getGaleriData(ss) {
  var sheet = ss.getSheetByName(TAB_GALERI);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    list.push({
      id: String(row[0]),
      judul: String(row[1]),
      kategori: String(row[2]),
      tanggal: String(row[3]),
      lokasi: String(row[4]),
      gambarUrl: String(row[5]),
      deskripsi: String(row[6]),
      fotografer: String(row[7] || "Dokumentasi OSIS")
    });
  }
  return list;
}

// -------------------------------------------------------------
// PENGURUS SIMPAN KE SPREADSHEET
// -------------------------------------------------------------
function savePengurusData(ss, list) {
  var sheet = ss.getSheetByName(TAB_PENGURUS);
  if (!sheet) sheet = ss.insertSheet(TAB_PENGURUS);

  // Bersihkan baris data lama (kecuali header baris 1)
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }

  var rows = [];
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    rows.push([
      p.id,
      p.nomorUrut,
      p.jabatan,
      p.nama,
      p.kelas,
      p.fotoFileName,
      p.emailKontak || "",
      p.tugasPokok || "",
      p.motto || ""
    ]);
  }

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 9).setValues(rows);
  }

  return { success: true, message: "Data 28 Pengurus berhasil diperbarui di Google Sheets (" + rows.length + " data)." };
}

function saveSekbidData(ss, list) {
  var sheet = ss.getSheetByName(TAB_SEKBID);
  if (!sheet) sheet = ss.insertSheet(TAB_SEKBID);

  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }

  var rows = [];
  for (var i = 0; i < list.length; i++) {
    var s = list[i];
    rows.push([
      s.id,
      s.nomor,
      s.namaBidang,
      s.namaSingkat,
      s.koordinator,
      Array.isArray(s.anggota) ? s.anggota.join("; ") : s.anggota,
      s.deskripsi,
      Array.isArray(s.programKerja) ? s.programKerja.join("; ") : s.programKerja,
      s.dokumentasi || ""
    ]);
  }

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 9).setValues(rows);
  }

  return { success: true, message: "Data 10 Seksi Bidang berhasil diperbarui di Google Sheets." };
}

function saveProfilData(ss, profil) {
  var sheet = ss.getSheetByName(TAB_PROFIL);
  if (!sheet) sheet = ss.insertSheet(TAB_PROFIL);

  var rows = [
    ["namaSekolah", profil.namaSekolah],
    ["namaOrganisasi", profil.namaOrganisasi],
    ["slogan", profil.slogan],
    ["motto", profil.motto],
    ["masaBakti", profil.masaBakti],
    ["visi", profil.visi],
    ["misi", Array.isArray(profil.misi) ? profil.misi.join("\\n") : profil.misi],
    ["sejarah", profil.sejarah]
  ];

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  return { success: true, message: "Profil OSIS berhasil diperbarui di Google Sheets." };
}

// -------------------------------------------------------------
// FUNGSI INISIALISASI DATABASE OTOMATIS
// -------------------------------------------------------------
function inisialisasiDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Tab Pengurus
  var shPengurus = ss.getSheetByName(TAB_PENGURUS) || ss.insertSheet(TAB_PENGURUS);
  shPengurus.getRange(1, 1, 1, 9).setValues([[
    "ID", "Nomor Urut", "Jabatan", "Nama Siswa", "Kelas", "Foto File Name", "Email Kontak", "Tugas Pokok", "Motto"
  ]]);
  shPengurus.getRange(1, 1, 1, 9).setBackground("#0F172A").setFontColor("#FBBF24").setFontWeight("bold");

  // 2. Tab Sekbid
  var shSekbid = ss.getSheetByName(TAB_SEKBID) || ss.insertSheet(TAB_SEKBID);
  shSekbid.getRange(1, 1, 1, 9).setValues([[
    "ID", "Nomor", "Nama Bidang", "Nama Singkat", "Koordinator", "Daftar Anggota (pisahkan ;)", "Deskripsi Tugas", "Program Kerja (pisahkan ;)", "Dokumentasi"
  ]]);
  shSekbid.getRange(1, 1, 1, 9).setBackground("#0F172A").setFontColor("#FBBF24").setFontWeight("bold");

  // 3. Tab Profil
  var shProfil = ss.getSheetByName(TAB_PROFIL) || ss.insertSheet(TAB_PROFIL);
  shProfil.getRange(1, 1, 1, 2).setValues([["Kunci", "Nilai"]]);
  shProfil.getRange(1, 1, 1, 2).setBackground("#0F172A").setFontColor("#FBBF24").setFontWeight("bold");

  // 4. Tab Program Kerja
  var shProker = ss.getSheetByName(TAB_PROGRAM_KERJA) || ss.insertSheet(TAB_PROGRAM_KERJA);
  shProker.getRange(1, 1, 1, 10).setValues([[
    "ID", "Judul", "Sekbid ID", "Sekbid Nama", "Kategori", "Deskripsi", "Periode", "Sasaran", "Status", "Indikator"
  ]]);
  shProker.getRange(1, 1, 1, 10).setBackground("#0F172A").setFontColor("#FBBF24").setFontWeight("bold");

  // 5. Tab Galeri
  var shGaleri = ss.getSheetByName(TAB_GALERI) || ss.insertSheet(TAB_GALERI);
  shGaleri.getRange(1, 1, 1, 8).setValues([[
    "ID", "Judul Foto", "Kategori", "Tanggal", "Lokasi", "URL Gambar", "Deskripsi", "Fotografer"
  ]]);
  shGaleri.getRange(1, 1, 1, 8).setBackground("#0F172A").setFontColor("#FBBF24").setFontWeight("bold");

  SpreadsheetApp.getUi().alert("Inisialisasi Berhasil!", "Seluruh tab database OSIS (Pengurus, Sekbid, Profil, ProgramKerja, Galeri) telah dibuat siap pakai.", SpreadsheetApp.getUi().ButtonSet.OK);
}
`;

/**
 * Mengambil seluruh bundel data OSIS dari Google Sheets melalui Google Apps Script Web App
 */
export async function fetchOsisDataFromGAS(gasUrlParam?: string): Promise<ApiResponse<OsisDataBundle>> {
  const targetUrl = gasUrlParam || getActiveGasUrl();

  if (!targetUrl) {
    return {
      success: false,
      message: 'URL Google Apps Script belum dikonfigurasi. Menggunakan data master bawaan aplikasi.',
      data: INITIAL_OSIS_DATA,
      source: 'local_fallback'
    };
  }

  try {
    const fetchUrl = `${targetUrl}?action=getAll&_t=${Date.now()}`;
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (json && json.success && json.data) {
      const remoteData: OsisDataBundle = {
        profil: json.data.profil || INITIAL_OSIS_DATA.profil,
        pengurus: (json.data.pengurus && json.data.pengurus.length === 28)
          ? json.data.pengurus
          : INITIAL_OSIS_DATA.pengurus,
        sekbid: (json.data.sekbid && json.data.sekbid.length === 10)
          ? json.data.sekbid
          : INITIAL_OSIS_DATA.sekbid,
        programKerja: json.data.programKerja || INITIAL_OSIS_DATA.programKerja,
        galeri: json.data.galeri || INITIAL_OSIS_DATA.galeri
      };

      // Jalankan validasi anti-duplikasi
      const report = validateOsisData(remoteData);

      return {
        success: true,
        message: 'Data OSIS berhasil disinkronkan langsung dari Google Sheets.',
        data: remoteData,
        source: 'google_sheets',
        timestamp: json.timestamp || new Date().toISOString(),
        errors: report.isValid ? [] : report.errors
      };
    } else {
      throw new Error(json.message || 'Format data Google Apps Script tidak valid.');
    }
  } catch (error: any) {
    console.warn('Gagal menghubungi Google Apps Script, fallback ke data lokal/default:', error);
    return {
      success: false,
      message: `Koneksi Google Sheets gagal (${error.message || 'Gagal memuat'}). Menggunakan data lokal.`,
      data: INITIAL_OSIS_DATA,
      source: 'local_fallback'
    };
  }
}

/**
 * Menguji koneksi ke Google Apps Script (Ping test)
 */
export async function testGasConnection(gasUrl: string): Promise<ApiResponse> {
  if (!gasUrl || !gasUrl.trim().startsWith('https://script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Format URL tidak valid. URL harus dimulai dengan https://script.google.com/macros/s/.../exec'
    };
  }

  try {
    const pingUrl = `${gasUrl.trim()}?action=ping&_t=${Date.now()}`;
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Google Apps Script merespons dengan status error: ${response.status} ${response.statusText}`
      };
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Koneksi ke Google Apps Script dan Google Sheets berhasil terhubung!',
      data: result
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Koneksi gagal: ${err.message || 'Cek deployment Apps Script pastikan "Who has access: Anyone" dan "Execute as: Me"'}`
    };
  }
}

/**
 * Menyimpan data 28 Pengurus ke Google Sheets melalui Google Apps Script Web App
 */
export async function savePengurusToGAS(
  pengurusList: Pengurus[],
  gasUrlParam?: string
): Promise<ApiResponse> {
  const targetUrl = gasUrlParam || getActiveGasUrl();
  if (!targetUrl) {
    return {
      success: false,
      message: 'URL Google Apps Script belum dikonfigurasi. Data hanya tersimpan di cache lokal peramban.'
    };
  }

  // Validasi lokal sebelum kirim
  const tempBundle: OsisDataBundle = { ...INITIAL_OSIS_DATA, pengurus: pengurusList };
  const report = validateOsisData(tempBundle);
  if (!report.isValid) {
    return {
      success: false,
      message: 'Validasi gagal: Terdapat data yang tidak valid atau terduplikasi.',
      errors: report.errors
    };
  }

  try {
    const payload = {
      action: 'updatePengurus',
      pengurus: pengurusList
    };

    // Gunakan POST dengan mode CORS text/plain untuk kompatibilitas Web App GAS tanpa preflight blockage
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const resJson = await response.json();
    return {
      success: resJson.success,
      message: resJson.message || 'Data pengurus berhasil diperbarui di Google Sheets!'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Gagal memperbarui ke Google Sheets: ${err.message}. Data tetap tersimpan di lokal browser.`
    };
  }
}

/**
 * Menyimpan data 10 Seksi Bidang ke Google Sheets
 */
export async function saveSekbidToGAS(
  sekbidList: SekbidItem[],
  gasUrlParam?: string
): Promise<ApiResponse> {
  const targetUrl = gasUrlParam || getActiveGasUrl();
  if (!targetUrl) {
    return {
      success: false,
      message: 'URL Google Apps Script belum dikonfigurasi.'
    };
  }

  try {
    const payload = {
      action: 'updateSekbid',
      sekbid: sekbidList
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const resJson = await response.json();
    return {
      success: resJson.success,
      message: resJson.message || 'Data Sekbid berhasil diperbarui di Google Sheets.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Gagal menyimpan ke Google Sheets: ${err.message}`
    };
  }
}

/**
 * Menyimpan data Profil OSIS ke Google Sheets
 */
export async function saveProfilToGAS(
  profil: OsisProfil,
  gasUrlParam?: string
): Promise<ApiResponse> {
  const targetUrl = gasUrlParam || getActiveGasUrl();
  if (!targetUrl) {
    return {
      success: false,
      message: 'URL Google Apps Script belum dikonfigurasi.'
    };
  }

  try {
    const payload = {
      action: 'updateProfil',
      profil: profil
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const resJson = await response.json();
    return {
      success: resJson.success,
      message: resJson.message || 'Data Profil berhasil diperbarui di Google Sheets.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Gagal menyimpan ke Google Sheets: ${err.message}`
    };
  }
}
