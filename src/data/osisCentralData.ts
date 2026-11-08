import { DAFTAR_28_PENGURUS, Pengurus, getPengurusImagePath } from './pengurusData';
import { DAFTAR_10_SEKBID, SekbidItem } from './sekbidData';
import { DAFTAR_PROGRAM_KERJA, ProgramKerja } from './programKerjaData';
import { DAFTAR_GALERI, FotoGaleri } from './galeriData';

export interface OsisProfil {
  namaSekolah: string;
  namaOrganisasi: string;
  slogan: string;
  motto: string;
  masaBakti: string;
  visi: string;
  misi: string[];
  sejarah: string;
  tujuan: {
    judul: string;
    uraian: string;
  }[];
}

export interface OsisDataBundle {
  profil: OsisProfil;
  pengurus: Pengurus[];
  sekbid: SekbidItem[];
  programKerja: ProgramKerja[];
  galeri: FotoGaleri[];
}

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
}

/**
 * Nilai Profil Bawaan Organisasi
 */
export const PROFIL_OSIS_DEFAULT: OsisProfil = {
  namaSekolah: 'SMP Negeri 1 Ungaran',
  namaOrganisasi: 'OSIS SMP Negeri 1 Ungaran',
  slogan: 'Mitreka Satata - Membentuk generasi berkarakter, berintegritas, dan berprestasi.',
  motto: 'Memimpin dengan keteladanan, melayani dengan dedikasi.',
  masaBakti: '2025/2026',
  visi: 'Menjadikan OSIS SMP Negeri 1 Ungaran sebagai motor penggerak siswa yang berakhlak mulia, cerdas, berkarakter luhur, dan kompetitif di era digital berlandaskan semangat kebersamaan.',
  misi: [
    'Meningkatkan keimanan, ketakwaan, dan toleransi beragama seluruh siswa melalui pembiasaan ibadah rutin.',
    'Menegakkan budaya disiplin, sopan santun (5S), dan integritas moral dalam pergaulan lingkungan sekolah.',
    'Menyelenggarakan program kerja yang inovatif, aspiratif, serta mengembangkan bakat akademik, seni, dan olahraga.',
    'Mendorong pemanfaatan teknologi informasi (TIK) yang cerdas, etis, dan produktif untuk kesiswaan.',
    'Mewujudkan kepedulian sosial, cinta lingkungan hidup (Adiwiyata), dan kebanggaan terhadap budaya Indonesia.'
  ],
  sejarah: 'SMP Negeri 1 Ungaran merupakan salah satu institusi pendidikan menengah pertama tertua dan paling berprestasi di Kabupaten Semarang, Jawa Tengah. Sejak berdirinya, OSIS SMP Negeri 1 Ungaran senantiasa hadir sebagai wadah tunggal kesiswaan yang membina kedewasaan berorganisasi, kreativitas, dan kepemimpinan para siswa dari generasi ke generasi.',
  tujuan: [
    {
      judul: 'Kepemimpinan Berintegritas',
      uraian: 'Mencetak kader pemimpin muda yang bertanggung jawab, bijaksana, dan mampu menjadi teladan bagi rekan sebaya.'
    },
    {
      judul: 'Penyalur Aspirasi Siswa',
      uraian: 'Menjadi jembatan komunikasi yang harmonis dan efektif antara peserta didik, dewan guru, dan kepala sekolah.'
    },
    {
      judul: 'Pengembangan Minat & Bakat',
      uraian: 'Menyediakan wadah positif bagi penyaluran kreasi seni, keolahragaan, sains, jurnalistik, dan kewirausahaan.'
    },
    {
      judul: 'Kultur Sekolah Unggul',
      uraian: 'Mendukung terciptanya iklim sekolah yang aman, nyaman, bebas perundungan, dan berprestasi di tingkat Jawa Tengah.'
    }
  ]
};

/**
 * Master Dataset Terpusat OSIS SMP Negeri 1 Ungaran
 */
export const INITIAL_OSIS_DATA: OsisDataBundle = {
  profil: PROFIL_OSIS_DEFAULT,
  pengurus: DAFTAR_28_PENGURUS,
  sekbid: DAFTAR_10_SEKBID,
  programKerja: DAFTAR_PROGRAM_KERJA,
  galeri: DAFTAR_GALERI
};

/**
 * Mesin Validasi Integritas Data OSIS:
 * - Memastikan jumlah pengurus tepat 28 orang.
 * - Memastikan tidak ada duplikasi ID, nomor urut, atau jabatan.
 * - Memastikan tidak ada nama anggota asli yang terduplikasi di beberapa posisi berbeda.
 * - Memastikan 10 Seksi Bidang lengkap tanpa duplikasi ID.
 */
export function validateOsisData(bundle: OsisDataBundle): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  const { pengurus, sekbid } = bundle;

  // 1. Validasi Jumlah Pengurus (Tepat 28)
  if (!pengurus || pengurus.length !== 28) {
    errors.push(`Jumlah pengurus harus tepat 28 posisi (saat ini: ${pengurus?.length || 0}).`);
  } else {
    info.push('Struktur 28 pengurus lengkap.');
  }

  // 2. Validasi Duplikasi ID dan Nomor Urut Pengurus
  const seenIds = new Set<string>();
  const seenNumbers = new Set<number>();
  const seenJabatan = new Set<string>();
  const seenNames = new Map<string, string>(); // name -> jabatan

  pengurus.forEach((p) => {
    // ID Check
    if (seenIds.has(p.id)) {
      errors.push(`Duplikasi ID pengurus terdeteksi: "${p.id}".`);
    }
    seenIds.add(p.id);

    // Nomor Urut Check
    if (seenNumbers.has(p.nomorUrut)) {
      errors.push(`Duplikasi Nomor Urut #${p.nomorUrut} terdeteksi pada jabatan "${p.jabatan}".`);
    }
    seenNumbers.add(p.nomorUrut);

    // Jabatan Uniqueness Check
    const normalizedJabatan = p.jabatan.trim().toLowerCase();
    if (seenJabatan.has(normalizedJabatan)) {
      errors.push(`Duplikasi jabatan terdeteksi: "${p.jabatan}".`);
    }
    seenJabatan.add(normalizedJabatan);

    // Nama Duplikasi Check (Hanya jika nama asli diisi, bukan format placeholder "[...]")
    const trimmedName = p.nama.trim();
    const isPlaceholder = trimmedName.startsWith('[') && trimmedName.endsWith(']');
    if (trimmedName && !isPlaceholder) {
      const lowerName = trimmedName.toLowerCase();
      if (seenNames.has(lowerName)) {
        errors.push(
          `Duplikasi anggota terdeteksi: Siswa "${trimmedName}" terdaftar di dua jabatan berbeda ("${seenNames.get(
            lowerName
          )}" dan "${p.jabatan}"). Setiap siswa hanya boleh menduduki 1 posisi pengurus.`
        );
      } else {
        seenNames.set(lowerName, p.jabatan);
      }
    } else {
      warnings.push(`Posisi #${p.nomorUrut} (${p.jabatan}) masih menggunakan label placeholder.`);
    }
  });

  // 3. Validasi 10 Seksi Bidang
  if (!sekbid || sekbid.length !== 10) {
    errors.push(`Jumlah Seksi Bidang harus tepat 10 (saat ini: ${sekbid?.length || 0}).`);
  } else {
    const seenSekbidIds = new Set<number>();
    const seenSekbidNumbers = new Set<string>();

    sekbid.forEach((s) => {
      if (seenSekbidIds.has(s.id)) {
        errors.push(`Duplikasi ID Sekbid terdeteksi: ID ${s.id}.`);
      }
      seenSekbidIds.add(s.id);

      if (seenSekbidNumbers.has(s.nomor)) {
        errors.push(`Duplikasi Nomor Sekbid terdeteksi: "${s.nomor}".`);
      }
      seenSekbidNumbers.add(s.nomor);
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    info
  };
}

/**
 * Helper untuk memberikan placeholder yang aman jika suatu informasi belum dimasukkan
 */
export function getSafePlaceholder(val: string | null | undefined, fallback: string): string {
  if (!val || val.trim() === '' || val === 'null' || val === 'undefined') {
    return fallback;
  }
  return val.trim();
}
