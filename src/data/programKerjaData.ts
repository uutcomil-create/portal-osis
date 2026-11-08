export interface ProgramKerja {
  id: string;
  judul: string;
  sekbidId: number;
  sekbidNama: string;
  kategori: 'Program Unggulan' | 'Program Bulanan' | 'Program Rutin';
  status: 'Terlaksana' | 'Sedang Berjalan' | 'Rencana Kerja';
  periode: string;
  sasaran: string;
  deskripsi: string;
  indikatorKeberhasilan: string;
}

export const DAFTAR_PROGRAM_KERJA: ProgramKerja[] = [
  {
    id: 'prog-01',
    judul: 'Latihan Dasar Kepemimpinan Siswa (LDKS)',
    sekbidId: 3,
    sekbidNama: 'Sekbid 03: Wawasan Kebangsaan',
    kategori: 'Program Unggulan',
    status: 'Terlaksana',
    periode: 'September 2025',
    sasaran: 'Calon Pengurus OSIS & MPK Baru',
    deskripsi: 'Pembekalan intensif mengenai manajemen organisasi, dinamika kelompok, problem-solving, etika kepemimpinan, dan baris-berbaris bersama pelatih berkompeten.',
    indikatorKeberhasilan: '100% peserta lulus evaluasi kepemimpinan dan siap mengemban amanah keorganisasian.'
  },
  {
    id: 'prog-02',
    judul: 'Pemilihan Ketua & Wakil Ketua OSIS (PEMILOS) Digital',
    sekbidId: 5,
    sekbidNama: 'Sekbid 05: Demokrasi & Lingkungan',
    kategori: 'Program Unggulan',
    status: 'Terlaksana',
    periode: 'Oktober 2025',
    sasaran: 'Seluruh Siswa, Guru & Karyawan SMPN 1 Ungaran',
    deskripsi: 'Penerapan pesta demokrasi sekolah secara jujur, adil, rahasia, dan langsung menggunakan bilik suara digital berbasis portal web terenkripsi.',
    indikatorKeberhasilan: 'Partisipasi pemilih mencapai >96% dengan nol sengketa dan transparansi rekapitulasi real-time.'
  },
  {
    id: 'prog-03',
    judul: 'Peringatan Hari Bulan Bahasa & Seni Spensa',
    sekbidId: 8,
    sekbidNama: 'Sekbid 08: Sastra & Budaya',
    kategori: 'Program Unggulan',
    status: 'Terlaksana',
    periode: 'Oktober 2025',
    sasaran: 'Siswa Kelas VII, VIII, dan IX',
    deskripsi: 'Rangkaian lomba cipta dan baca geguritan bahasa Jawa, pidato bahasa Indonesia, komik strip literasi, dan panggung baca puisi akbar.',
    indikatorKeberhasilan: 'Terhimpun lebih dari 120 karya sastra siswa yang dibukukan menjadi antologi sekolah.'
  },
  {
    id: 'prog-04',
    judul: 'Class Meeting & Pekan Olahraga Antarkelas',
    sekbidId: 4,
    sekbidNama: 'Sekbid 04: Prestasi Akademik, Seni & Olahraga',
    kategori: 'Program Unggulan',
    status: 'Sedang Berjalan',
    periode: 'Desember 2025 - Januari 2026',
    sasaran: 'Perwakilan Kelas VII s.d. IX',
    deskripsi: 'Kompetisi keakraban pasca-penilaian akhir semester yang mempertemukan atlet kelas dalam cabang bola basket, futsal, catur cepat, dan tarik tambang.',
    indikatorKeberhasilan: 'Meningkatkan rasa solidaritas antarkelas tanpa ada gesekan antarsuporter dan sportivitas terjaga.'
  },
  {
    id: 'prog-05',
    judul: 'Spensa Entrepreneur & Market Day',
    sekbidId: 6,
    sekbidNama: 'Sekbid 06: Kreativitas & Kewirausahaan',
    kategori: 'Program Bulanan',
    status: 'Sedang Berjalan',
    periode: 'Setiap Akhir Bulan',
    sasaran: 'Kelompok Proyek Siswa & Koperasi Sekolah',
    deskripsi: 'Pemberian kesempatan bagi siswa untuk membuka stan bazaar makanan sehat tradisional, souvenir buatan tangan, dan produk daur ulang kreatif.',
    indikatorKeberhasilan: 'Siswa memahami perhitungan modal, penetapan harga jual, laba bersih, serta etika berdagang.'
  },
  {
    id: 'prog-06',
    judul: 'Gerakan Jumat Bersih & Sekolah Hijau Adiwiyata',
    sekbidId: 5,
    sekbidNama: 'Sekbid 05: Demokrasi & Lingkungan',
    kategori: 'Program Rutin',
    status: 'Sedang Berjalan',
    periode: 'Setiap Hari Jumat Pagi',
    sasaran: 'Seluruh Warga Sekolah',
    deskripsi: 'Operasi semut membersihkan drainase, penataan pot tanaman kelas, pemilahan sampah organik/anorganik, dan perawatan green house sekolah.',
    indikatorKeberhasilan: 'Lingkungan kelas dan selasar sekolah terpelihara asri, bersih, dan menunjang status Adiwiyata Mandiri.'
  },
  {
    id: 'prog-07',
    judul: 'Digitalisasi Informasi & Pengelolaan Media Sosial OSIS',
    sekbidId: 9,
    sekbidNama: 'Sekbid 09: TIK & Multimedia',
    kategori: 'Program Rutin',
    status: 'Sedang Berjalan',
    periode: 'Setiap Hari Kerja',
    sasaran: 'Masyarakat Sekolah, Orang Tua Siswa, & Publik',
    deskripsi: 'Pembaruan berkala konten pengumuman sekolah, liputan dokumentasi kegiatan, live report lomba, dan podcast mini inspirasi siswa.',
    indikatorKeberhasilan: 'Interaksi positif akun resmi OSIS melonjak dan menjadi rujukan informasi akurat sekolah.'
  },
  {
    id: 'prog-08',
    judul: 'Spensa English Speaking Day & Vocabulary Drill',
    sekbidId: 10,
    sekbidNama: 'Sekbid 10: Komunikasi Bahasa Asing',
    kategori: 'Program Rutin',
    status: 'Sedang Berjalan',
    periode: 'Setiap Hari Kamis',
    sasaran: 'Seluruh Siswa dan Pengurus OSIS',
    deskripsi: 'Penggunaan bahasa Inggris sederhana dalam komunikasi di area kantin dan perpustakaan serta kuis kosakata interaktif berhadiah pin penghargaan.',
    indikatorKeberhasilan: 'Meningkatkan keberanian siswa berbicara dalam bahasa asing tanpa takut keliru.'
  },
  {
    id: 'prog-09',
    judul: 'Dies Natalis & Pentas Apresiasi Seni SMPN 1 Ungaran',
    sekbidId: 4,
    sekbidNama: 'Sekbid 04: Prestasi Akademik, Seni & Olahraga',
    kategori: 'Program Unggulan',
    status: 'Rencana Kerja',
    periode: 'Maret 2026',
    sasaran: 'Seluruh Civitas Akademika, Alumni, & Tamu Undangan',
    deskripsi: 'Peringatan hari ulang tahun sekolah dengan panggung megah, karnaval budaya nusantara, bakti sosial akbar, dan pameran karya teknologi kesiswaan.',
    indikatorKeberhasilan: 'Menjalin silaturahmi erat antaralumni, meningkatkan kebanggaan almamater, dan merayakan keberagaman bakat.'
  },
  {
    id: 'prog-10',
    judul: 'Bakti Ramadhan & Santunan Tali Kasih',
    sekbidId: 1,
    sekbidNama: 'Sekbid 01: Keimanan & Ketaqwaan',
    kategori: 'Program Unggulan',
    status: 'Rencana Kerja',
    periode: 'Maret - April 2026',
    sasaran: 'Kaum Dhuafa di Lingkungan Sekitar Ungaran',
    deskripsi: 'Pengumpulan sembako berkah Ramadhan, pembagian takjil gratis di jalan protokol Ungaran, serta santunan anak yatim berprestasi.',
    indikatorKeberhasilan: 'Tersalurkannya 300 paket sembako berkah kepada keluarga yang membutuhkan.'
  },
  {
    id: 'prog-11',
    judul: 'Kampanye Kesehatan Remaja & Gerakan Sarapan Bergizi',
    sekbidId: 7,
    sekbidNama: 'Sekbid 07: Kesehatan & Jasmani',
    kategori: 'Program Bulanan',
    status: 'Rencana Kerja',
    periode: 'Februari 2026',
    sasaran: 'Siswa Putri & Kader Kesehatan Remaja',
    deskripsi: 'Penyuluhan gizi seimbang bersama Puskesmas Ungaran, pembagian bekal buah serentak, dan senam jantung sehat di lapangan.',
    indikatorKeberhasilan: 'Peningkatan kesadaran pola hidup bersih sehat dan menurunnya angka keluhan lemas pada jam pelajaran pertama.'
  },
  {
    id: 'prog-12',
    judul: 'Spensa Lawatan Sejarah & Literasi Kebangsaan',
    sekbidId: 3,
    sekbidNama: 'Sekbid 03: Wawasan Kebangsaan',
    kategori: 'Program Unggulan',
    status: 'Rencana Kerja',
    periode: 'Mei 2026',
    sasaran: 'Perwakilan Kelas & Pengurus OSIS',
    deskripsi: 'Kunjungan studi lapangan ke situs sejarah bersejarah di Jawa Tengah untuk mendalami perjuangan para perintis kemerdekaan.',
    indikatorKeberhasilan: 'Pembuatan video dokumenter riset sejarah oleh siswa yang dipublikasikan di media sekolah.'
  }
];
