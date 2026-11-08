import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Instagram, Globe, Clock } from 'lucide-react';

export const KontakSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kategori: 'Aspirasi Siswa',
    pesan: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.pesan) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        nama: '',
        email: '',
        kategori: 'Aspirasi Siswa',
        pesan: ''
      });
    }, 600);
  };

  return (
    <section id="kontak" className="relative py-20 lg:py-28 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Kanal Suara & Komunikasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hubungi OSIS & Kotak Aspirasi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Punya ide, saran perbaikan program sekolah, atau pertanyaan seputar OSIS SMP Negeri 1 Ungaran? Kami siap mendengar suaramu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact Card & School Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/90 border border-amber-500/25 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                Sekretariat OSIS SMPN 1 Ungaran
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Pusat administrasi, koordinasi kegiatan kesiswaan, dan ruang temu pengurus bersama pembina.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Alamat Kampus</span>
                    <span className="text-slate-400 leading-relaxed block mt-0.5">
                      Jl. Diponegoro No. 147, Genuk, Kec. Ungaran Barat, Kabupaten Semarang, Jawa Tengah 50511
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Surat Elektronik</span>
                    <a
                      href="mailto:osis@smpn1ungaran.sch.id"
                      className="text-amber-400 hover:underline block mt-0.5"
                    >
                      osis@smpn1ungaran.sch.id
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Telepon Sekolah</span>
                    <span className="text-slate-400 block mt-0.5">(024) 6921127</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-indigo-400/10 text-indigo-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">Jam Operasional Sekretariat</span>
                    <span className="text-slate-400 block mt-0.5">Senin - Jumat: 07.00 - 15.30 WIB</span>
                  </div>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400/40 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@osissmpn1ungaran</span>
                </a>
                <a
                  href="https://smpn1ungaran.sch.id"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400/40 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Website Utama Sekolah</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message / Aspirations Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                Kirim Aspirasi & Masukan Siswa
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Setiap pesan akan diteruskan kepada Pimpinan BPH OSIS dan Seksi Bidang terkait.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    Terima Kasih! Aspirasi Telah Terkirim
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Masukan dan saranmu sangat berharga bagi peningkatan mutu kegiatan kesiswaan di SMP Negeri 1 Ungaran. Pengurus OSIS akan menindaklanjutinya dalam rapat pleno.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded-lg transition-colors"
                  >
                    Kirim Aspirasi Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Nama Lengkap / Inisial <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        placeholder="Contoh: Siswa Kelas VIII B"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Email / Nomor WhatsApp (Opsional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@contoh.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Kategori Pesan <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                    >
                      <option value="Aspirasi Siswa">Aspirasi & Usulan Siswa</option>
                      <option value="Saran Program Kerja">Saran Program Kerja OSIS</option>
                      <option value="Laporan Kebersihan / Fasilitas">Laporan Lingkungan & Fasilitas</option>
                      <option value="Pertanyaan Seputar Ekskul">Pertanyaan Seputar Ekstrakurikuler</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Uraian Pesan / Aspirasi <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.pesan}
                      onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                      placeholder="Tuliskan aspirasi, ide, atau saranmu dengan santun dan konstruktif..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-interactive w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 disabled:opacity-50 text-xs sm:text-sm"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{loading ? 'Mengirim...' : 'Kirim Aspirasi Sekarang'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
