export interface DokumentasiFoto {
  id: string;
  url: string;
  caption: string;
  tanggal?: string;
}

export interface ProgramKerjaSekbid {
  nama: string;
  kategori: 'Rutin' | 'Periodik' | 'Unggulan';
  frekuensi: string;
  keterangan: string;
}

export interface SekbidItem {
  id: number;
  nomor: string; // mis: "Sekbid 01"
  nama: string; // Nama sementara Sekbid 1 - 10 (tidak mengarang nama resmi)
  singkatan: string;
  deskripsiTugas: string; // Deskripsi tugas
  koordinator: string; // "[Nama Koordinator Sekbid X]"
  anggota: string[]; // Daftar anggota
  programKerja: ProgramKerjaSekbid[]; // Program kerja
  dokumentasiFoto: DokumentasiFoto[]; // Dokumentasi foto
  iconName: string;
}

/**
 * Data Terpisah 10 Seksi Bidang (Sekbid 1 s.d. 10) OSIS SMP Negeri 1 Ungaran
 * 
 * Catatan Sesuai Arahan:
 * - Menggunakan nama sementara Sekbid 1 sampai 10.
 * - Tidak mengarang nama resmi bidang.
 * - Tidak mengarang nama pengurus.
 * - Semua informasi dirancang modular dan mudah disunting.
 */
export const DAFTAR_10_SEKBID: SekbidItem[] = [
  {
    id: 1,
    nomor: 'Sekbid 01',
    nama: 'Seksi Bidang 1 (Nama Sementara)',
    singkatan: 'Sekbid 1',
    deskripsiTugas: 'Melaksanakan perencanaan, pembinaan, dan koordinasi program kerja bidang 1 serta bertanggung jawab langsung kepada pimpinan OSIS.',
    koordinator: '[Nama Koordinator Sekbid 1]',
    anggota: ['[Nama Anggota Sekbid 1]'],
    programKerja: [
      {
        nama: '[Program Kerja Utama 1 - Sekbid 1]',
        kategori: 'Unggulan',
        frekuensi: 'Insidental / Semesteran',
        keterangan: 'Rencana kegiatan terstruktur bidang 1 yang melibatkan perwakilan siswa antarkelas.'
      },
      {
        nama: '[Program Rutin Mingguan - Sekbid 1]',
        kategori: 'Rutin',
        frekuensi: 'Setiap Pekan',
        keterangan: 'Agenda pembinaan berkala untuk mendukung kedisiplinan dan suasana kondusif sekolah.'
      },
      {
        nama: '[Kegiatan Partisipatif - Sekbid 1]',
        kategori: 'Periodik',
        frekuensi: 'Bulanan',
        keterangan: 'Kolaborasi antarseksi bidang untuk menyukseskan program kerja terpadu sekolah.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-1-doc-1',
        url: '/src/assets/images/gallery_ceremony_1794066881069.jpg',
        caption: 'Dokumentasi pelaksanaan agenda kegiatan Sekbid 1',
        tanggal: 'Semester Ganjil 2025/2026'
      },
      {
        id: 'sekbid-1-doc-2',
        url: '/src/assets/images/hero_osis_school_1794066878401.jpg',
        caption: 'Koordinasi lapangan pengurus Sekbid 1 di lingkungan sekolah',
        tanggal: 'Tahun Ajaran 2025/2026'
      }
    ],
    iconName: 'MoonStar'
  },
  {
    id: 2,
    nomor: 'Sekbid 02',
    nama: 'Seksi Bidang 2 (Nama Sementara)',
    singkatan: 'Sekbid 2',
    deskripsiTugas: 'Melaksanakan perencanaan, pembinaan, dan koordinasi program kerja bidang 2 serta memonitor pelaksanaan tata tertib kesiswaan.',
    koordinator: '[Nama Koordinator Sekbid 2]',
    anggota: ['[Nama Anggota Sekbid 2]'],
    programKerja: [
      {
        nama: '[Program Kerja Utama 1 - Sekbid 2]',
        kategori: 'Unggulan',
        frekuensi: 'Per Semester',
        keterangan: 'Kegiatan edukatif dan sosialisasi nilai-nilai positif bagi seluruh peserta didik.'
      },
      {
        nama: '[Aksi Disiplin Simpatik - Sekbid 2]',
        kategori: 'Rutin',
        frekuensi: 'Harian / Mingguan',
        keterangan: 'Pemantauan ketertiban berseragam dan perilaku ramah anak di lingkungan sekolah.'
      },
      {
        nama: '[Kegiatan Sosial - Sekbid 2]',
        kategori: 'Periodik',
        frekuensi: 'Triwulanan',
        keterangan: 'Aksi peduli lingkungan dan penguatan solidaritas antarsiswa.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-2-doc-1',
        url: '/src/assets/images/gallery_ceremony_1794066881069.jpg',
        caption: 'Aksi pendampingan ketertiban oleh petugas Sekbid 2',
        tanggal: 'Semester Ganjil 2025/2026'
      }
    ],
    iconName: 'HeartHandshake'
  },
  {
    id: 3,
    nomor: 'Sekbid 03',
    nama: 'Seksi Bidang 3 (Nama Sementara)',
    singkatan: 'Sekbid 3',
    deskripsiTugas: 'Menyiapkan sarana dan aparatur upacara bendera, memfasilitasi latihan kepemimpinan, dan membangun kedisiplinan organisasi.',
    koordinator: '[Nama Koordinator Sekbid 3]',
    anggota: ['[Nama Anggota Sekbid 3]'],
    programKerja: [
      {
        nama: '[Program Kerja Upacara & Disiplin - Sekbid 3]',
        kategori: 'Rutin',
        frekuensi: 'Setiap Hari Senin',
        keterangan: 'Pemberdayaan tim pengibar bendera merah putih dan petugas upacara.'
      },
      {
        nama: '[Latihan Ketangkasan & Baris-Berbaris - Sekbid 3]',
        kategori: 'Periodik',
        frekuensi: '2 Kali Sebulan',
        keterangan: 'Pembinaan kedisiplinan fisik dan wawasan bela negara.'
      },
      {
        nama: '[Peringatan Hari Besar Nasional - Sekbid 3]',
        kategori: 'Unggulan',
        frekuensi: 'Tahunan',
        keterangan: 'Event peringatan hari bersejarah nasional bersama civitas akademika.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-3-doc-1',
        url: '/src/assets/images/gallery_ceremony_1794066881069.jpg',
        caption: 'Dokumentasi barisan upacara bendera khidmat',
        tanggal: 'Oktober 2025'
      }
    ],
    iconName: 'Shield'
  },
  {
    id: 4,
    nomor: 'Sekbid 04',
    nama: 'Seksi Bidang 4 (Nama Sementara)',
    singkatan: 'Sekbid 4',
    deskripsiTugas: 'Memfasilitasi pembinaan bakat, perlombaan antarkelas, serta apresiasi kreativitas dan prestasi siswa.',
    koordinator: '[Nama Koordinator Sekbid 4]',
    anggota: [
      '[Nama Anggota 1 Sekbid 4]',
      '[Nama Anggota 2 Sekbid 4]'
    ],
    programKerja: [
      {
        nama: '[Pekan Kompetisi & Lomba Antarkelas - Sekbid 4]',
        kategori: 'Unggulan',
        frekuensi: 'Akhir Semester',
        keterangan: 'Turnamen olahraga sportif dan kompetisi kreasi seni antarseluruh rombel kelas.'
      },
      {
        nama: '[Pendampingan Delegasi Prestasi - Sekbid 4]',
        kategori: 'Periodik',
        frekuensi: 'Fleksibel',
        keterangan: 'Fasilitasi siswa yang mewakili almamater dalam kejuaraan eksternal.'
      },
      {
        nama: '[Panggung Kreasi Siswa - Sekbid 4]',
        kategori: 'Unggulan',
        frekuensi: 'Tahunan',
        keterangan: 'Pentas unjuk bakat siswa di aula pertemuan sekolah.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-4-doc-1',
        url: '/src/assets/images/gallery_workshop_1794066880297.jpg',
        caption: 'Persiapan dan technical meeting kepanitiaan Sekbid 4',
        tanggal: 'Semester Ganjil 2025/2026'
      }
    ],
    iconName: 'Trophy'
  },
  {
    id: 5,
    nomor: 'Sekbid 05',
    nama: 'Seksi Bidang 5 (Nama Sementara)',
    singkatan: 'Sekbid 5',
    deskripsiTugas: 'Mengawal edukasi musyawarah siswa, pemilihan kepengurusan yang terbuka, serta pemeliharaan kebersihan lingkungan sekolah.',
    koordinator: '[Nama Koordinator Sekbid 5]',
    anggota: ['[Nama Anggota Sekbid 5]'],
    programKerja: [
      {
        nama: '[Pesta Demokrasi Siswa / Pemilihan OSIS - Sekbid 5]',
        kategori: 'Unggulan',
        frekuensi: 'Tahunan',
        keterangan: 'Rangkaian pemungutan suara transparan, adil, dan edukatif.'
      },
      {
        nama: '[Aksi Peduli Lingkungan & Penghijauan - Sekbid 5]',
        kategori: 'Rutin',
        frekuensi: 'Dwi-mingguan',
        keterangan: 'Perawatan taman sekolah, bank sampah, dan kawasan hijau.'
      },
      {
        nama: '[Forum Dengar Pendapat Siswa - Sekbid 5]',
        kategori: 'Periodik',
        frekuensi: 'Tengah Semester',
        keterangan: 'Penampungan usulan perwakilan kelas untuk kemajuan sekolah.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-5-doc-1',
        url: '/src/assets/images/hero_osis_school_1794066878401.jpg',
        caption: 'Kawasan lingkungan asri yang dirawat bersama kader Sekbid 5',
        tanggal: 'Tahun 2025'
      }
    ],
    iconName: 'Scale'
  },
  {
    id: 6,
    nomor: 'Sekbid 06',
    nama: 'Seksi Bidang 6 (Nama Sementara)',
    singkatan: 'Sekbid 6',
    deskripsiTugas: 'Mengembangkan keterampilan wirausaha muda, pameran karya cipta mandiri, dan kreasi barang berdaya guna.',
    koordinator: '[Nama Koordinator Sekbid 6]',
    anggota: ['[Nama Anggota Sekbid 6]'],
    programKerja: [
      {
        nama: '[Bazar Kewirausahaan & Produk Siswa - Sekbid 6]',
        kategori: 'Unggulan',
        frekuensi: 'Semesteran',
        keterangan: 'Stan karya kreasi mandiri siswa saat agenda pertemuan wali murid.'
      },
      {
        nama: '[Pelatihan Kriya & Desain Terapan - Sekbid 6]',
        kategori: 'Periodik',
        frekuensi: 'Triwulanan',
        keterangan: 'Workshop pembuatan souvenir dan kerajinan tangan bernilai guna.'
      },
      {
        nama: '[Pengelolaan Kas Kreatif - Sekbid 6]',
        kategori: 'Rutin',
        frekuensi: 'Bulanan',
        keterangan: 'Pemberdayaan atribut merchandise mandiri OSIS.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-6-doc-1',
        url: '/src/assets/images/gallery_workshop_1794066880297.jpg',
        caption: 'Sesi perencanaan stan kewirausahaan siswa Sekbid 6',
        tanggal: 'November 2025'
      }
    ],
    iconName: 'Sparkles'
  },
  {
    id: 7,
    nomor: 'Sekbid 07',
    nama: 'Seksi Bidang 7 (Nama Sementara)',
    singkatan: 'Sekbid 7',
    deskripsiTugas: 'Menjaga kebugaran jasmani seluruh siswa, mengkampanyekan pola makan sehat bergizi, dan berkoordinasi dengan unit kesehatan sekolah.',
    koordinator: '[Nama Koordinator Sekbid 7]',
    anggota: ['[Nama Anggota Sekbid 7]'],
    programKerja: [
      {
        nama: '[Senam Kesegaran & Kebugaran Bersama - Sekbid 7]',
        kategori: 'Rutin',
        frekuensi: 'Jumat Pagi',
        keterangan: 'Olahraga ritmik bersama bapak/ibu guru dan seluruh peserta didik.'
      },
      {
        nama: '[Sosialisasi Pola Hidup Sehat & Bersih - Sekbid 7]',
        kategori: 'Periodik',
        frekuensi: 'Bulanan',
        keterangan: 'Edukasi pentingnya gizi seimbang, hidrasi cukup, dan istirahat teratur.'
      },
      {
        nama: '[Pengecekan Kebersihan Kantin - Sekbid 7]',
        kategori: 'Rutin',
        frekuensi: 'Dwi-mingguan',
        keterangan: 'Inspeksi higienitas makanan bersama petugas UKS.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-7-doc-1',
        url: '/src/assets/images/gallery_ceremony_1794066881069.jpg',
        caption: 'Aktivitas kebugaran pagi di lapangan olahraga',
        tanggal: 'Semester Ganjil 2025/2026'
      }
    ],
    iconName: 'Activity'
  },
  {
    id: 8,
    nomor: 'Sekbid 08',
    nama: 'Seksi Bidang 8 (Nama Sementara)',
    singkatan: 'Sekbid 8',
    deskripsiTugas: 'Menumbuhkan minat literasi, publikasi karya mading sastra, serta pelestarian budaya lokal dan nasional.',
    koordinator: '[Nama Koordinator Sekbid 8]',
    anggota: ['[Nama Anggota Sekbid 8]'],
    programKerja: [
      {
        nama: '[Revitalisasi Mading & Buletin Literasi - Sekbid 8]',
        kategori: 'Rutin',
        frekuensi: 'Dua Minggu Sekali',
        keterangan: 'Publikasi karya puisi, cerpen, dan artikel pilihan karya siswa.'
      },
      {
        nama: '[Apresiasi Sastra & Bulan Bahasa - Sekbid 8]',
        kategori: 'Unggulan',
        frekuensi: 'Tahunan (Oktober)',
        keterangan: 'Kompetisi cipta baca karya sastra dan unjuk seni bahasa.'
      },
      {
        nama: '[Pojok Baca & Gemar Membaca - Sekbid 8]',
        kategori: 'Rutin',
        frekuensi: 'Setiap Hari Efektif',
        keterangan: 'Pengelolaan bahan bacaan edukatif di setiap kelas.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-8-doc-1',
        url: '/src/assets/images/gallery_workshop_1794066880297.jpg',
        caption: 'Sesi kurasi artikel dan puisi siswa untuk buletin sekolah',
        tanggal: 'Oktober 2025'
      }
    ],
    iconName: 'BookOpen'
  },
  {
    id: 9,
    nomor: 'Sekbid 09',
    nama: 'Seksi Bidang 9 (Nama Sementara)',
    singkatan: 'Sekbid 9',
    deskripsiTugas: 'Mengelola portal digital resmi OSIS, dokumentasi multimedia kegiatan, desain visual publikasi, dan edukasi literasi digital sehat.',
    koordinator: '[Nama Koordinator Sekbid 9]',
    anggota: [
      '[Nama Anggota 1 Sekbid 9]',
      '[Nama Anggota 2 Sekbid 9]'
    ],
    programKerja: [
      {
        nama: '[Pengelolaan & Pembaruan Portal Digital OSIS - Sekbid 9]',
        kategori: 'Rutin',
        frekuensi: 'Berkala / Real-time',
        keterangan: 'Pembaruan data pengurus, agenda kegiatan, pengumuman, dan fitur transparansi.'
      },
      {
        nama: '[Dokumentasi Foto & Video Kegiatan Sekolah - Sekbid 9]',
        kategori: 'Rutin',
        frekuensi: 'Setiap Event Sekolah',
        keterangan: 'Pengambilan dokumentasi sinematik dan arsip foto resmi.'
      },
      {
        nama: '[Pelatihan Desain & Multimedia Siswa - Sekbid 9]',
        kategori: 'Unggulan',
        frekuensi: 'Per Semester',
        keterangan: 'Workshop teknik dasar pembuatan konten grafis edukatif dan bijak bermedia sosial.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-9-doc-1',
        url: '/src/assets/images/gallery_workshop_1794066880297.jpg',
        caption: 'Penyusunan dan pengkodean portal digital di laboratorium komputer',
        tanggal: 'November 2025'
      },
      {
        id: 'sekbid-9-doc-2',
        url: '/src/assets/images/osis_emblem_gold_1794066879358.jpg',
        caption: 'Aset grafis dan identitas visual resmi kesiswaan Spensa',
        tanggal: 'Tahun 2025/2026'
      }
    ],
    iconName: 'Cpu'
  },
  {
    id: 10,
    nomor: 'Sekbid 10',
    nama: 'Seksi Bidang 10 (Nama Sementara)',
    singkatan: 'Sekbid 10',
    deskripsiTugas: 'Menyelenggarakan kegiatan latihan komunikasi bahasa asing, kuis interaktif kebahasaan, dan pengenalan wawasan pergaulan global.',
    koordinator: '[Nama Koordinator Sekbid 10]',
    anggota: ['[Nama Anggota Sekbid 10]'],
    programKerja: [
      {
        nama: '[Hari Komunikasi Bahasa Asing / English Day - Sekbid 10]',
        kategori: 'Rutin',
        frekuensi: 'Setiap Hari Kamis',
        keterangan: 'Pembiasaan percakapan ramah dan percaya diri dalam bahasa Inggris.'
      },
      {
        nama: '[Kompetisi Berbahasa Asing Siswa - Sekbid 10]',
        kategori: 'Unggulan',
        frekuensi: 'Tahunan',
        keterangan: 'Lomba storytelling, pidato singkat, dan spelling bee.'
      },
      {
        nama: '[Kuis Kosakata Interaktif - Sekbid 10]',
        kategori: 'Periodik',
        frekuensi: 'Mingguan',
        keterangan: 'Tantangan kosakata bahasa asing melalui media pengumuman sekolah.'
      }
    ],
    dokumentasiFoto: [
      {
        id: 'sekbid-10-doc-1',
        url: '/src/assets/images/gallery_workshop_1794066880297.jpg',
        caption: 'Latihan percakapan dan presentasi kelompok bahasa asing',
        tanggal: 'November 2025'
      }
    ],
    iconName: 'Globe'
  }
];
