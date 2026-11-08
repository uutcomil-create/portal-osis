export interface FotoGaleri {
  id: string;
  judul: string;
  kategori: 'Upacara & Kepemimpinan' | 'Prestasi & Lomba' | 'Bakti Sosial & Lingkungan' | 'Kreativitas & Digital';
  tanggal: string;
  lokasi: string;
  gambarUrl: string;
  deskripsi: string;
  fotografer: string;
}

export const DAFTAR_GALERI: FotoGaleri[] = [
  {
    id: 'gal-01',
    judul: 'Upacara Pengukuhan & Pelantikan Pengurus OSIS',
    kategori: 'Upacara & Kepemimpinan',
    tanggal: '18 Oktober 2025',
    lokasi: 'Lapangan Utama SMP Negeri 1 Ungaran',
    gambarUrl: '/src/assets/images/gallery_ceremony_1794066881069.jpg',
    deskripsi: 'Suasana khidmat dan penuh disiplin saat serah terima panji kebesaran OSIS dan pengucapan janji setia kepengurusan di hadapan Kepala Sekolah dan seluruh civitas akademika.',
    fotografer: 'Divisi Multimedia & TIK OSIS'
  },
  {
    id: 'gal-02',
    judul: 'Workshop Transformasi Digital & Manajemen Organisasi',
    kategori: 'Kreativitas & Digital',
    tanggal: '05 November 2025',
    lokasi: 'Laboratorium Komputer & Multimedia Spensa',
    gambarUrl: '/src/assets/images/gallery_workshop_1794066880297.jpg',
    deskripsi: 'Diskusi kolaboratif pengurus OSIS dalam merancang portal digital kesiswaan, penyusunan kalender program kerja, dan pelatihan pembuatan konten edukatif berbasis teknologi.',
    fotografer: 'Sekbid 09 TIK'
  },
  {
    id: 'gal-03',
    judul: 'Kawasan Kampus Hijau & Gedung Utama SMP Negeri 1 Ungaran',
    kategori: 'Bakti Sosial & Lingkungan',
    tanggal: 'Oktober 2025',
    lokasi: 'Kompleks Kampus SMP Negeri 1 Ungaran',
    gambarUrl: '/src/assets/images/hero_osis_school_1794066878401.jpg',
    deskripsi: 'Pemandangan halaman tengah sekolah yang asri, rimbun, dan bersih, tempat siswa menimba ilmu, mengasah kepemimpinan, dan menyemai prestasi gemilang.',
    fotografer: 'Humas SMP Negeri 1 Ungaran'
  },
  {
    id: 'gal-04',
    judul: 'Insignia Kebanggaan & Simbol Integritas OSIS Indonesia',
    kategori: 'Upacara & Kepemimpinan',
    tanggal: 'Tahun Bakti 2025/2026',
    lokasi: 'Sekretariat OSIS Spensa',
    gambarUrl: '/src/assets/images/osis_emblem_gold_1794066879358.jpg',
    deskripsi: 'Lambang kehormatan OSIS berwarna emas melambangkan semangat kemurnian budi pekerti, obor ilmu pengetahuan yang tak kunjung padam, dan perisai kesetiaan pada almamater.',
    fotografer: 'Arsip Resmi Organisasi'
  },
  {
    id: 'gal-05',
    judul: 'Aksi Bersih Lingkungan & Pemilahan Sampah Adiwiyata',
    kategori: 'Bakti Sosial & Lingkungan',
    tanggal: '14 November 2025',
    lokasi: 'Taman Toga & Area Green House',
    gambarUrl: '/src/assets/images/hero_osis_school_1794066878401.jpg',
    deskripsi: 'Sinergi seluruh pengurus Sekbid 5 bersama kader lingkungan dalam program Jumat Bersih demi mewujudkan sekolah yang asri dan berkelanjutan.',
    fotografer: 'Kader Adiwiyata Spensa'
  },
  {
    id: 'gal-06',
    judul: 'Simulasi Dinamika Kelompok LDKS Calon Pemimpin Muda',
    kategori: 'Upacara & Kepemimpinan',
    tanggal: '22 September 2025',
    lokasi: 'Aula Pertemuan Graha Wiyata',
    gambarUrl: '/src/assets/images/gallery_workshop_1794066880297.jpg',
    deskripsi: 'Latihan pemecahan masalah bersama antarpengurus untuk melatih komunikasi efektif, toleransi pendapat, dan ketangguhan kepemimpinan di era modern.',
    fotografer: 'Tim Pembina Kesiswaan'
  }
];
