export interface Pengurus {
  id: string;
  nomorUrut: number;
  nama: string;
  jabatan: string;
  kelas: string;
  kategori: 'BPH' | 'Sekbid 1-5' | 'Sekbid 6-10';
  sekbidNomor?: number;
  divisi: string;
  foto?: string | null;
  fotoFileName: string; // Nama file gambar asli di folder public/images (mis: pengurus_01.jpg)
  tugasPokok: string;
  motto?: string;
  emailKontak?: string;
}

/**
 * Data Resmi 28 Pengurus OSIS SMP Negeri 1 Ungaran
 * 
 * Sistem Pemetaan Foto:
 * - Setiap pengurus memiliki nama file resmi yang terhubung ke folder public/images/
 * - Format standar: pengurus_01.jpg s.d. pengurus_28.jpg
 * - Tidak menggunakan wajah buatan AI.
 * - Tidak menukar foto antaranggota.
 * - Jika file gambar fisik belum diletakkan di folder public/images,
 *   sistem akan menampilkan placeholder profesional dengan nomor urut & inisial jabatan.
 */
export const DAFTAR_28_PENGURUS: Pengurus[] = [
  // --- BADAN PENGURUS HARIAN (BPH) : 6 Pengurus ---
  {
    id: 'p-01',
    nomorUrut: 1,
    nama: '[Nama Ketua OSIS]',
    jabatan: 'Ketua Umum OSIS',
    kelas: 'Kelas VIII A / IX A',
    kategori: 'BPH',
    divisi: 'Badan Pengurus Harian',
    foto: null,
    fotoFileName: 'pengurus_01.jpg',
    tugasPokok: 'Memimpin organisasi secara menyeluruh, menetapkan kebijakan strategis, dan mengkoordinasikan seluruh seksi bidang OSIS.',
    motto: 'Memimpin dengan keteladanan, melayani dengan dedikasi.',
    emailKontak: 'osis.ketua@smpn1ungaran.sch.id'
  },
  {
    id: 'p-02',
    nomorUrut: 2,
    nama: '[Nama Wakil Ketua OSIS]',
    jabatan: 'Wakil Ketua OSIS',
    kelas: 'Kelas VIII B / IX B',
    kategori: 'BPH',
    divisi: 'Badan Pengurus Harian',
    foto: null,
    fotoFileName: 'pengurus_02.jpg',
    tugasPokok: 'Mendampingi Ketua OSIS, mengawasi kinerja seksi bidang, dan mewakili pimpinan saat berhalangan hadir.',
    motto: 'Sinergi, tangguh, dan berorientasi pada solusi bersama.',
    emailKontak: 'osis.wakil@smpn1ungaran.sch.id'
  },
  {
    id: 'p-03',
    nomorUrut: 3,
    nama: '[Nama Sekretaris 1]',
    jabatan: 'Sekretaris 1',
    kelas: 'Kelas VIII C',
    kategori: 'BPH',
    divisi: 'Badan Pengurus Harian',
    foto: null,
    fotoFileName: 'pengurus_03.jpg',
    tugasPokok: 'Bertanggung jawab atas administrasi umum, korespondensi resmi, notulensi rapat, dan arsip keorganisasian.',
    motto: 'Tertib administrasi wujud profesionalitas kepengurusan.',
    emailKontak: 'osis.sekretaris1@smpn1ungaran.sch.id'
  },
  {
    id: 'p-04',
    nomorUrut: 4,
    nama: '[Nama Sekretaris 2]',
    jabatan: 'Sekretaris 2',
    kelas: 'Kelas VII A / VIII D',
    kategori: 'BPH',
    divisi: 'Badan Pengurus Harian',
    foto: null,
    fotoFileName: 'pengurus_04.jpg',
    tugasPokok: 'Mendukung penyiapan dokumen kegiatan, absensi kepengurusan, dan inventarisasi perlengkapan kesekretariatan.',
    motto: 'Rapi, cermat, dan berintegritas tinggi.',
    emailKontak: 'osis.sekretaris2@smpn1ungaran.sch.id'
  },
  {
    id: 'p-05',
    nomorUrut: 5,
    nama: '[Nama Bendahara 1]',
    jabatan: 'Bendahara 1',
    kelas: 'Kelas VIII E',
    kategori: 'BPH',
    divisi: 'Badan Pengurus Harian',
    foto: null,
    fotoFileName: 'pengurus_05.jpg',
    tugasPokok: 'Mengelola anggaran kas OSIS, menyusun pembukuan keuangan, dan mengkoordinasikan laporan pertanggungjawaban (LPJ).',
    motto: 'Transparan, akuntabel, dan amanah dalam setiap amanat dana.',
    emailKontak: 'osis.bendahara1@smpn1ungaran.sch.id'
  },
  {
    id: 'p-06',
    nomorUrut: 6,
    nama: '[Nama Bendahara 2]',
    jabatan: 'Bendahara 2',
    kelas: 'Kelas VII B / VIII F',
    kategori: 'BPH',
    divisi: 'Badan Pengurus Harian',
    foto: null,
    fotoFileName: 'pengurus_06.jpg',
    tugasPokok: 'Mencatat arus kas harian, memverifikasi kuitansi kegiatan operasional, dan membantu penyusunan laporan keuangan.',
    motto: 'Disiplin finansial untuk kelancaran program kerja.',
    emailKontak: 'osis.bendahara2@smpn1ungaran.sch.id'
  },

  // --- SEKSI BIDANG 1 s.d. 5 (11 Pengurus: 5 Koordinator + 6 Anggota) ---
  {
    id: 'p-07',
    nomorUrut: 7,
    nama: '[Nama Koordinator Sekbid 1]',
    jabatan: 'Koordinator Sekbid 1',
    kelas: 'Kelas VIII G',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 1,
    divisi: 'Sekbid 1: Keimanan & Ketaqwaan',
    foto: null,
    fotoFileName: 'pengurus_07.jpg',
    tugasPokok: 'Mengkoordinir pembinaan ketaqwaan, peribadatan siswa, dan peringatan hari besar keagamaan di sekolah.',
    motto: 'Menjadikan keimanan sebagai landasan utama budi pekerti.',
    emailKontak: 'sekbid1@smpn1ungaran.sch.id'
  },
  {
    id: 'p-08',
    nomorUrut: 8,
    nama: '[Nama Anggota Sekbid 1]',
    jabatan: 'Anggota Sekbid 1',
    kelas: 'Kelas VII C',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 1,
    divisi: 'Sekbid 1: Keimanan & Ketaqwaan',
    foto: null,
    fotoFileName: 'pengurus_08.jpg',
    tugasPokok: 'Mendukung pelaksanaan kegiatan ibadah rutin dan kepedulian sosial antar sesama siswa.',
    motto: 'Toleransi dan ketulusan dalam beramal kebajikan.',
    emailKontak: 'anggota.sekbid1@smpn1ungaran.sch.id'
  },

  {
    id: 'p-09',
    nomorUrut: 9,
    nama: '[Nama Koordinator Sekbid 2]',
    jabatan: 'Koordinator Sekbid 2',
    kelas: 'Kelas VIII H',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 2,
    divisi: 'Sekbid 2: Budi Pekerti Luhur',
    foto: null,
    fotoFileName: 'pengurus_09.jpg',
    tugasPokok: 'Memimpin penegakan tata krama, budaya senyum sapa salam (5S), dan pencegahan perundungan di lingkungan sekolah.',
    motto: 'Beradab dalam pergaulan, santun dalam tutur kata.',
    emailKontak: 'sekbid2@smpn1ungaran.sch.id'
  },
  {
    id: 'p-10',
    nomorUrut: 10,
    nama: '[Nama Anggota Sekbid 2]',
    jabatan: 'Anggota Sekbid 2',
    kelas: 'Kelas VII D',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 2,
    divisi: 'Sekbid 2: Budi Pekerti Luhur',
    foto: null,
    fotoFileName: 'pengurus_10.jpg',
    tugasPokok: 'Melaksanakan program aksi empati siswa, razia simpatik ketertiban, dan penyuluhan anti-bullying.',
    motto: 'Menjunjung kehormatan sekolah melalui tindakan nyata.',
    emailKontak: 'anggota.sekbid2@smpn1ungaran.sch.id'
  },

  {
    id: 'p-11',
    nomorUrut: 11,
    nama: '[Nama Koordinator Sekbid 3]',
    jabatan: 'Koordinator Sekbid 3',
    kelas: 'Kelas VIII A',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 3,
    divisi: 'Sekbid 3: Wawasan Kebangsaan & Bela Negara',
    foto: null,
    fotoFileName: 'pengurus_11.jpg',
    tugasPokok: 'Mengorganisir upacara bendera hari Senin, pembinaan peleton inti/paskibra, dan peringatan hari pahlawan.',
    motto: 'Cinta tanah air dengan semangat belajar dan patriotisme.',
    emailKontak: 'sekbid3@smpn1ungaran.sch.id'
  },
  {
    id: 'p-12',
    nomorUrut: 12,
    nama: '[Nama Anggota Sekbid 3]',
    jabatan: 'Anggota Sekbid 3',
    kelas: 'Kelas VII E',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 3,
    divisi: 'Sekbid 3: Wawasan Kebangsaan & Bela Negara',
    foto: null,
    fotoFileName: 'pengurus_12.jpg',
    tugasPokok: 'Mempersiapkan sarana petugas upacara dan latihan baris-berbaris siswa.',
    motto: 'Disiplin adalah kunci utama kehormatan generasi muda.',
    emailKontak: 'anggota.sekbid3@smpn1ungaran.sch.id'
  },

  {
    id: 'p-13',
    nomorUrut: 13,
    nama: '[Nama Koordinator Sekbid 4]',
    jabatan: 'Koordinator Sekbid 4',
    kelas: 'Kelas VIII B',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 4,
    divisi: 'Sekbid 4: Prestasi Akademik, Seni & Olahraga',
    foto: null,
    fotoFileName: 'pengurus_13.jpg',
    tugasPokok: 'Memfasilitasi pembinaan kompetisi olimpiade sains (OSN), festival seni siswa (FLS2N), dan turnamen olahraga (O2SN).',
    motto: 'Raih prestasi emas untuk kebanggaan almamater tercinta.',
    emailKontak: 'sekbid4@smpn1ungaran.sch.id'
  },
  {
    id: 'p-14',
    nomorUrut: 14,
    nama: '[Nama Anggota 1 Sekbid 4]',
    jabatan: 'Anggota Sekbid 4 (Bid. Akademik)',
    kelas: 'Kelas VII F',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 4,
    divisi: 'Sekbid 4: Prestasi Akademik, Seni & Olahraga',
    foto: null,
    fotoFileName: 'pengurus_14.jpg',
    tugasPokok: 'Mendata dan mempublikasikan raihan prestasi akademik siswa SMPN 1 Ungaran.',
    motto: 'Belajar tak kenal henti, berinovasi tiada batas.',
    emailKontak: 'anggota1.sekbid4@smpn1ungaran.sch.id'
  },
  {
    id: 'p-15',
    nomorUrut: 15,
    nama: '[Nama Anggota 2 Sekbid 4]',
    jabatan: 'Anggota Sekbid 4 (Bid. Olahraga & Seni)',
    kelas: 'Kelas VII G',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 4,
    divisi: 'Sekbid 4: Prestasi Akademik, Seni & Olahraga',
    foto: null,
    fotoFileName: 'pengurus_15.jpg',
    tugasPokok: 'Mengkoordinir persiapan tim tanding antarkelas dan pameran seni siswa.',
    motto: 'Sportivitas di lapangan, keindahan dalam karya.',
    emailKontak: 'anggota2.sekbid4@smpn1ungaran.sch.id'
  },

  {
    id: 'p-16',
    nomorUrut: 16,
    nama: '[Nama Koordinator Sekbid 5]',
    jabatan: 'Koordinator Sekbid 5',
    kelas: 'Kelas VIII C',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 5,
    divisi: 'Sekbid 5: Demokrasi, HAM & Lingkungan Hidup',
    foto: null,
    fotoFileName: 'pengurus_16.jpg',
    tugasPokok: 'Menyelenggarakan Pemilihan Ketua OSIS (Pemilos) yang demokratis serta program sekolah adiwiyata ramah lingkungan.',
    motto: 'Suara demokrasi bermartabat, lestarikan bumi hijau kita.',
    emailKontak: 'sekbid5@smpn1ungaran.sch.id'
  },
  {
    id: 'p-17',
    nomorUrut: 17,
    nama: '[Nama Anggota Sekbid 5]',
    jabatan: 'Anggota Sekbid 5',
    kelas: 'Kelas VII H',
    kategori: 'Sekbid 1-5',
    sekbidNomor: 5,
    divisi: 'Sekbid 5: Demokrasi, HAM & Lingkungan Hidup',
    foto: null,
    fotoFileName: 'pengurus_17.jpg',
    tugasPokok: 'Menggerakkan pemilahan sampah, patroli kebersihan taman, dan kampanye hemat energi sekolah.',
    motto: 'Sekolah bersih, asri, dan nyaman untuk belajar generasi juara.',
    emailKontak: 'anggota.sekbid5@smpn1ungaran.sch.id'
  },

  // --- SEKSI BIDANG 6 s.d. 10 (11 Pengurus: 5 Koordinator + 6 Anggota) ---
  {
    id: 'p-18',
    nomorUrut: 18,
    nama: '[Nama Koordinator Sekbid 6]',
    jabatan: 'Koordinator Sekbid 6',
    kelas: 'Kelas VIII D',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 6,
    divisi: 'Sekbid 6: Kreativitas & Kewirausahaan',
    foto: null,
    fotoFileName: 'pengurus_18.jpg',
    tugasPokok: 'Menginisiasi bazar kewirausahaan siswa, pameran karya kreatif daur ulang, dan pelatihan wirausaha muda.',
    motto: 'Membangun kemandirian sejak dini melalui daya cipta.',
    emailKontak: 'sekbid6@smpn1ungaran.sch.id'
  },
  {
    id: 'p-19',
    nomorUrut: 19,
    nama: '[Nama Anggota Sekbid 6]',
    jabatan: 'Anggota Sekbid 6',
    kelas: 'Kelas VII A',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 6,
    divisi: 'Sekbid 6: Kreativitas & Kewirausahaan',
    foto: null,
    fotoFileName: 'pengurus_19.jpg',
    tugasPokok: 'Membantu pengelolaan stan bazar OSIS dan promosi merchandise kreatif siswa.',
    motto: 'Kreatif tanpa batas, produktif dengan karya.',
    emailKontak: 'anggota.sekbid6@smpn1ungaran.sch.id'
  },

  {
    id: 'p-20',
    nomorUrut: 20,
    nama: '[Nama Koordinator Sekbid 7]',
    jabatan: 'Koordinator Sekbid 7',
    kelas: 'Kelas VIII E',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 7,
    divisi: 'Sekbid 7: Kualitas Jasmani, Kesehatan & Gizi',
    foto: null,
    fotoFileName: 'pengurus_20.jpg',
    tugasPokok: 'Menyelenggarakan senam kesegaran jasmani berkala, kampanye sarapan bergizi seimbang, dan kerjasama UKS.',
    motto: 'Mens sana in corpore sano: jiwa yang kuat dalam raga yang sehat.',
    emailKontak: 'sekbid7@smpn1ungaran.sch.id'
  },
  {
    id: 'p-21',
    nomorUrut: 21,
    nama: '[Nama Anggota Sekbid 7]',
    jabatan: 'Anggota Sekbid 7',
    kelas: 'Kelas VII B',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 7,
    divisi: 'Sekbid 7: Kualitas Jasmani, Kesehatan & Gizi',
    foto: null,
    fotoFileName: 'pengurus_21.jpg',
    tugasPokok: 'Mendampingi pemeriksaan kesehatan berkala dan sosialisasi jajanan sehat kantin sekolah.',
    motto: 'Generasi sehat, generasi cerdas dan bersemangat.',
    emailKontak: 'anggota.sekbid7@smpn1ungaran.sch.id'
  },

  {
    id: 'p-22',
    nomorUrut: 22,
    nama: '[Nama Koordinator Sekbid 8]',
    jabatan: 'Koordinator Sekbid 8',
    kelas: 'Kelas VIII F',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 8,
    divisi: 'Sekbid 8: Sastra & Budaya',
    foto: null,
    fotoFileName: 'pengurus_22.jpg',
    tugasPokok: 'Mendorong apresiasi sastra Indonesia & Jawa, revitalisasi mading sekolah, serta pentas musik dan tari tradisional.',
    motto: 'Melestarikan keluhuran budaya bangsa melalui untaian kata dan seni.',
    emailKontak: 'sekbid8@smpn1ungaran.sch.id'
  },
  {
    id: 'p-23',
    nomorUrut: 23,
    nama: '[Nama Anggota Sekbid 8]',
    jabatan: 'Anggota Sekbid 8',
    kelas: 'Kelas VII C',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 8,
    divisi: 'Sekbid 8: Sastra & Budaya',
    foto: null,
    fotoFileName: 'pengurus_23.jpg',
    tugasPokok: 'Kurasi karya puisi, cerpen, dan artikel siswa untuk buletin berkala OSIS.',
    motto: 'Bahasa cermin bangsa, budaya penegak jati diri.',
    emailKontak: 'anggota.sekbid8@smpn1ungaran.sch.id'
  },

  {
    id: 'p-24',
    nomorUrut: 24,
    nama: '[Nama Koordinator Sekbid 9]',
    jabatan: 'Koordinator Sekbid 9',
    kelas: 'Kelas VIII G',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 9,
    divisi: 'Sekbid 9: Teknologi Informasi & Komunikasi (TIK)',
    foto: null,
    fotoFileName: 'pengurus_24.jpg',
    tugasPokok: 'Mengelola portal digital OSIS, konten media sosial resmi, dokumentasi multimedia kegiatan, dan desain visual.',
    motto: 'Teknologi beretika untuk kemajuan informasi sekolah kita.',
    emailKontak: 'sekbid9@smpn1ungaran.sch.id'
  },
  {
    id: 'p-25',
    nomorUrut: 25,
    nama: '[Nama Anggota 1 Sekbid 9]',
    jabatan: 'Anggota Sekbid 9 (Desain & Grafis)',
    kelas: 'Kelas VII D',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 9,
    divisi: 'Sekbid 9: Teknologi Informasi & Komunikasi (TIK)',
    foto: null,
    fotoFileName: 'pengurus_25.jpg',
    tugasPokok: 'Membuat materi poster digital, infografis agenda, dan publikasi feed Instagram OSIS.',
    motto: 'Visual yang memikat, pesan yang sampai tepat.',
    emailKontak: 'anggota1.sekbid9@smpn1ungaran.sch.id'
  },
  {
    id: 'p-26',
    nomorUrut: 26,
    nama: '[Nama Anggota 2 Sekbid 9]',
    jabatan: 'Anggota Sekbid 9 (Dokumentasi & Video)',
    kelas: 'Kelas VII E',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 9,
    divisi: 'Sekbid 9: Teknologi Informasi & Komunikasi (TIK)',
    foto: null,
    fotoFileName: 'pengurus_26.jpg',
    tugasPokok: 'Mengabadikan setiap momentum berharga sekolah dalam format foto dan video sinematik.',
    motto: 'Mengabadikan cerita inspiratif setiap langkah perjuangan.',
    emailKontak: 'anggota2.sekbid9@smpn1ungaran.sch.id'
  },

  {
    id: 'p-27',
    nomorUrut: 27,
    nama: '[Nama Koordinator Sekbid 10]',
    jabatan: 'Koordinator Sekbid 10',
    kelas: 'Kelas VIII H',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 10,
    divisi: 'Sekbid 10: Komunikasi Bahasa Asing',
    foto: null,
    fotoFileName: 'pengurus_27.jpg',
    tugasPokok: 'Menggerakkan English Day, kompetisi storytelling, pidato bahasa Inggris, dan pertukaran wawasan global.',
    motto: 'Bridging minds, speaking globally, upholding our identity.',
    emailKontak: 'sekbid10@smpn1ungaran.sch.id'
  },
  {
    id: 'p-28',
    nomorUrut: 28,
    nama: '[Nama Anggota Sekbid 10]',
    jabatan: 'Anggota Sekbid 10',
    kelas: 'Kelas VII F',
    kategori: 'Sekbid 6-10',
    sekbidNomor: 10,
    divisi: 'Sekbid 10: Komunikasi Bahasa Asing',
    foto: null,
    fotoFileName: 'pengurus_28.jpg',
    tugasPokok: 'Mendampingi forum speaking club mingguan dan kuis kosakata interaktif bagi siswa.',
    motto: 'Confident to communicate, ready to inspire.',
    emailKontak: 'anggota.sekbid10@smpn1ungaran.sch.id'
  }
];

export const TOTAL_PENGURUS_COUNT = DAFTAR_28_PENGURUS.length; // exactly 28

/**
 * Mendapatkan URL jalur gambar resmi untuk pengurus
 */
export function getPengurusImagePath(pengurus: Pengurus): string {
  if (pengurus.foto && pengurus.foto.trim() !== '') {
    return pengurus.foto;
  }
  const fileName = pengurus.fotoFileName || `pengurus_${String(pengurus.nomorUrut).padStart(2, '0')}.jpg`;
  // Jika sudah berawalan slash atau URL
  if (fileName.startsWith('/') || fileName.startsWith('http')) {
    return fileName;
  }
  return `/images/${fileName}`;
}
