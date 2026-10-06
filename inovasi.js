// ══════════════════════════════════════════
//  DATA INOVASI DAERAH KOTA METRO 2027
// ══════════════════════════════════════════

// Data untuk JURI JUDUL (106 inovasi - data lengkap dari dokumen resmi)
const daftarInovasiJudulLengkap = [
  {
    judul: "Digitalisasi Laporan Ikhtisar Pengawasan (e-ILHP)",
    perangkatDaerah: "Inspektorat Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Digitalisasi Laporan Ikhtisar Pengawasan APIP merupakan langkah transformasi pengelolaan dan konsolidasi data hasil pengawasan internal pemerintah daerah dari sistem manual menjadi sistem terintegrasi secara elektronik."
  },
  {
    judul: "Klinik Konsultasi Pengawasan APIP",
    perangkatDaerah: "Inspektorat Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Klinik Konsultasi dan Pengawasan APIP merupakan transformasi layanan pengawasan dari model konvensional yang berfokus pada penindakan (watchdog) menjadi pendekatan reaktif-preventif dan kemitraan (consultative partner)."
  },
  {
    judul: "Klinik Inovasi Daerah Kota Metro (Kovi Darat)",
    perangkatDaerah: "Badan Perencanaan Pembangunan Daerah, Riset dan Inovasi Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Klinik Inovasi Daerah Kota Metro (Kovi Darat) merupakan inovasi yang diinisiasi oleh Bapperida Kota Metro sebagai wadah konsultasi, pendampingan, dan fasilitasi bagi OPD serta masyarakat dalam pengembangan inovasi daerah secara terpadu dan berkesinambungan."
  },
  {
    judul: "Tanah Harapan 2.0",
    perangkatDaerah: "Badan Perencanaan Pembangunan Daerah, Riset dan Inovasi Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi perencanaan pembangunan berbasis partisipasi masyarakat dan data terpadu untuk pembangunan daerah yang lebih berkelanjutan."
  },
  {
    judul: "SITEGGRASI SP2D (Sistem Terintegrasi Penerbitan SP2D Elektronik)",
    perangkatDaerah: "Badan Keuangan dan Aset Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Pembaharuan tata kelola keuangan Pemerintah Kota Metro yang mengintegrasikan Sistem Informasi Pemerintahan Daerah (SIPD) secara elektronik berbasis host-to-host dengan sistem cash management PT Bank Lampung."
  },
  {
    judul: "JEJAK DANA (Jaringan Evaluasi dan Jejak Aliran Dana Non-Kas Daerah)",
    perangkatDaerah: "Badan Keuangan dan Aset Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi penatausahaan dan penyusunan laporan keuangan yang berfokus pada mekanisme identifikasi, rekonsiliasi, serta pencatatan terintegrasi atas penerimaan dan pengeluaran dana transfer pusat atau hibah/bantuan langsung."
  },
  {
    judul: "CERMAT RKUD (Cash Early Reminder, Monitoring dan Analisis Terpadu RKUD)",
    perangkatDaerah: "Badan Keuangan dan Aset Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem peringatan dini berbasis pemantauan saldo kas secara real-time yang otomatis memberikan notifikasi kepada Kuasa BUD dan pengelola keuangan saat posisi kas menyentuh ambang batas minimum aman."
  },
  {
    judul: "METAS (Metro Asset Service)",
    perangkatDaerah: "Badan Pendapatan Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Penerapan pemesanan gedung/asset daerah dengan menggunakan aplikasi berbasis web."
  },
  {
    judul: "Sistem Informasi Dashboard Data ASN",
    perangkatDaerah: "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "SI-DATA ASN adalah sistem informasi berbasis web yang dirancang untuk mengelola dan menyajikan data kepegawaian Aparatur Sipil Negara (ASN) secara cepat dan real time dalam bentuk dashboard interaktif."
  },
  {
    judul: "SI GEMBIRA (Sistem Gerakan Metro Bersih Dari Narkotika)",
    perangkatDaerah: "Badan Kesatuan Bangsa dan Politik",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi daerah berbasis digital yang bertujuan meningkatkan efektivitas pelaksanaan pencegahan dan pemberantasan penyalahgunaan dan peredaran gelap narkotika melalui satu platform yang mudah diakses masyarakat."
  },
  {
    judul: "SYNDTAKER (Pemanfaatan Synology Drive Guna Mewujudkan Efektivitas dan Efisiensi Tata Kelola Perencanaan di Bagian Keuangan Sekretariat DPRD)",
    perangkatDaerah: "Sekretariat DPRD",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Mewujudkan tata kelola bahan-bahan perencanaan yang lebih efektif, efisien, terintegrasi, serta akuntabel di sub-substansi Perencanaan Bagian keuangan Sekretariat DPRD."
  },
  {
    judul: "TAPE UDANG (Penggunaan Taplink Dalam Penyelenggaraan Rapat-Rapat Bagian Perundangan dan Persidangan di Sekretariat DPRD Kota Metro)",
    perangkatDaerah: "Sekretariat DPRD",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Mengintegrasikan berbagai tautan, dokumen dan layanan hanya dalam satu halaman untuk lebih mudah dan menarik dengan control akses dan monitoring yang terstruktur."
  },
  {
    judul: "BIDIKSIPA (Bantuan Pendidikan Guru PAUD yang sedang menempuh S1)",
    perangkatDaerah: "Dinas Pendidikan dan Kebudayaan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Bantuan Pendidikan S.1 Guru PAUD untuk meningkatkan kompetensi dan kualifikasi pendidik PAUD."
  },
  {
    judul: "PPKSP (Pendampingan Permasalahan Kekerasan di Satuan Pendidikan)",
    perangkatDaerah: "Dinas Pendidikan dan Kebudayaan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2025",
    ringkasan: "Aplikasi Pelayanan untuk Peserta Didik untuk Mutasi, Kesalahan Ijazah, Pengganti Ijazah dan pendampingan permasalahan kekerasan di satuan pendidikan."
  },
  {
    judul: "Ayo Sekolah",
    perangkatDaerah: "Dinas Pendidikan dan Kebudayaan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2025",
    ringkasan: "Program jemput bola bagi warga Kota Metro untuk menuntaskan buta huruf dan meningkatkan partisipasi pendidikan."
  },
  {
    judul: "GEMAR SEHATI (Gerakan menuju Remaja Sehat dan Aktif)",
    perangkatDaerah: "Dinas Kesehatan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Meningkatkan derajat kesehatan remaja di lingkungan sekolah melalui pembentukan kader kesehatan remaja, penguatan jejaring komunikasi antar sekolah, pembinaan UKS/M, serta pelaksanaan dan evaluasi Cek Kesehatan Gratis di sekolah."
  },
  {
    judul: "SATRIA (Sasaran terjadwal Rutin Air Limbah)",
    perangkatDaerah: "Dinas Pekerjaan Umum dan Tata Ruang",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Mengubah pola penanganan limbah dari reaktif menjadi preventif terjadwal untuk menjaga kelestarian lingkungan dan kesehatan masyarakat."
  },
  {
    judul: "SIGAP TPU (Sistem Informasi Geospasial Tempat Pemakaman Umum)",
    perangkatDaerah: "Dinas Perumahan dan Kawasan Permukiman",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Sistem informasi berbasis digital dan geospasial yang digunakan untuk pendataan, pemetaan, pengelolaan, dan pemantauan Tempat Pemakaman Umum secara terintegrasi."
  },
  {
    judul: "SIGAP PSU (Sistem Informasi Geospasial Prasarana, dan Utilitas Umum)",
    perangkatDaerah: "Dinas Perumahan dan Kawasan Permukiman",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi berbasis teknologi informasi untuk meningkatkan efektivitas dan ketertiban dalam pendataan, inventarisasi, verifikasi, serah terima, serta pengelolaan PSU Perumahan."
  },
  {
    judul: "RESPONTIBKUMDA (Responsif Penertiban hukum Daerah Kota Metro)",
    perangkatDaerah: "Satuan Polisi Pamong Praja",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi yang diciptakan guna mewujudkan Penegakan Perda yang humanis dan akuntabel sesuai SOP dengan meningkatkan kecepatan respon penanganan pelanggaran."
  },
  {
    judul: "SRIKANDI BAHAGIA (Strategi responsive dan Inovatif Praja Wanita)",
    perangkatDaerah: "Satuan Polisi Pamong Praja",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pendekatan komunikasi yang lebih persuasif, empatik, dan sensitif melalui Praja Wanita untuk menciptakan pelayanan yang lebih humanis, responsif, dan berkeadilan."
  },
  {
    judul: "RESEP TAWA (Reaksi Cepat Tanggap Satwa)",
    perangkatDaerah: "Dinas Pemadam Kebakaran",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Meningkatkan respon cepat, kemampuan dan keterampilan petugas pemadam kebakaran untuk mengevakuasi satwa liar/berbahaya yang masuk ke lingkungan warga."
  },
  {
    judul: "HANJAK SAGITA (Harapan, Akses, Jaringan, dan Kemandirian – Sistem Aksi gerak Inklusif dan tanggap)",
    perangkatDaerah: "Dinas Sosial dan Pemberdayaan Masyarakat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Memberdayakan penyandang disabilitas dan keluarganya melalui pendekatan holistik dengan membangun kemandirian melalui akses jaringan, pendampingan, dan solusi nyata."
  },
  {
    judul: "LENTERA KENCANA (Layanan Terintegrasi dan Responsif – Kanal Empatik, Cepat dan Aman)",
    perangkatDaerah: "Dinas Sosial dan Pemberdayaan Masyarakat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan pengaduan sosial yang menghadirkan layanan terpadu, responsif, empatik, cepat, nyaman, aman, dan mudah diakses masyarakat."
  },
  {
    judul: "SEKOLAH KELUARGA SAI BANGGA (Saling Asah, Asuh, dan Asih Menuju Keluarga Tangguh, Berdaya, dan Membanggakan)",
    perangkatDaerah: "Dinas Pemberdayaan Perempuan, Perlindungan Anak, Pengendalian Penduduk dan Keluarga Berencana",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pembelajaran bagi keluarga untuk meningkatkan pengetahuan, keterampilan, dan sikap dalam mewujudkan keluarga berkualitas, mencegah stunting, dan melindungi perempuan serta anak."
  },
  {
    judul: "QUARSA (Gerakan Qurban Aman dan Sehat)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Integrasi pengawasan qurban berbasis kolaborasi pemerintah dan Baznas dengan sistem pengawasan berbasis titik lokasi masjid/mushola."
  },
  {
    judul: "SIEMBEK SEHAT (Sistem Integrasi Keamanan Penerbitan Pemotongan Kambing Sehingga One Health Aman Terawasi)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Sistem terpadu pengendalian pemotongan kambing yang mengintegrasikan penertiban pemotongan di luar RPH, penguatan layanan RPH, dan pemeriksaan kesehatan hewan."
  },
  {
    judul: "TELAM (Teras Pangan Lokal Kota Metro)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Upaya peningkatan pengetahuan masyarakat mengenai pengolahan pangan lokal yang sehat, bergizi, beragam, aman, dan bernilai ekonomi."
  },
  {
    judul: "PosTer Pangan (Pos pengawasan Terpadu Keamanan Pangan)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pengawasan dan pengujian keamanan pangan di pasar tani untuk memastikan produk pertanian yang beredar aman dikonsumsi."
  },
  {
    judul: "Gerakan Metro Peduli Pangan",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Kegiatan aksi penyelamatan pangan untuk pencegahan dan pengurangan sisa pangan dengan kolaborasi lintas pemangku kepentingan."
  },
  {
    judul: "BESOLEK (Besuk Online Efektif)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Besuk pasien rawat inap UPTD RSH melalui video call untuk memudahkan pemilik hewan melihat dan berkonsultasi tentang kondisi hewan kesayangan mereka."
  },
  {
    judul: "PERMATA (Peternakan Mandiri Ayam Perkotaan)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Gerakan untuk mengajak masyarakat perkotaan melakukan budidaya ayam skala rumah tangga secara mandiri dengan konsep urban farming."
  },
  {
    judul: "SIKEPAY (Sistem Informasi Kepatuhan dan Pembayaran Retribusi Sampah)",
    perangkatDaerah: "Dinas Lingkungan Hidup",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Aplikasi pembayaran retribusi sampah berbasis digital (nontunai/non-budgeter) yang memudahkan masyarakat membayar retribusi persampahan."
  },
  {
    judul: "SABAR (Sakai Sambayan Bersih dan Retribusi)",
    perangkatDaerah: "Dinas Lingkungan Hidup",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi edukasi dan pemberdayaan masyarakat berbasis kearifan lokal dalam pemilahan sampah dan peningkatan kepatuhan membayar retribusi persampahan."
  },
  {
    judul: "MEKHANAI ADMINDUK (Manajemen Keamanan Informasi Administrasi kependudukan)",
    perangkatDaerah: "Dinas Kependudukan dan Pencatatan Sipil",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi yang bertujuan memperkuat keamanan informasi kependudukan di era transformasi digital melalui perlindungan data penduduk dari risiko kebocoran dan penyalahgunaan."
  },
  {
    judul: "Jemput Bola SI APDI (Sistem Administrasi Pemanfaatan IKD untuk Digitalisasi Bantuan Sosial)",
    perangkatDaerah: "Dinas Kependudukan dan Pencatatan Sipil",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Mempercepat aktivasi Identitas Kependudukan Digital (IKD) untuk penyaluran bantuan sosial yang tepat sasaran, cepat, dan transparan."
  },
  {
    judul: "SI AKSI (Sistem Integrasi Akta, KK, dan KIA Siap Melayani)",
    perangkatDaerah: "Dinas Kependudukan dan Pencatatan Sipil",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi yang mengintegrasikan penerbitan Kartu Keluarga, Akta Kelahiran, dan Kartu Identitas Anak dalam satu kali proses pelayanan."
  },
  {
    judul: "TERANGIN",
    perangkatDaerah: "Dinas Perhubungan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Aplikasi layanan pengaduan penerangan jalan umum berbasis Artificial Intelligence dan Geolokasi untuk memberikan kemudahan penyampaian laporan PJU secara efektif dan efisien."
  },
  {
    judul: "SINADI (Sistem Informasi Layanan Digital)",
    perangkatDaerah: "Dinas Komunikasi, Informatika dan Statistik",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan publik berbasis web yang mengintegrasikan seluruh layanan Diskominfotik dalam satu portal layanan terpadu."
  },
  {
    judul: "Jumat Djajan Metro Bahagia",
    perangkatDaerah: "Dinas Koperasi, Usaha kecil dan Menengah, dan Ketenagakerjaan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Bazar UMKM yang dilaksanakan dua kali sebulan di hari Jumat sebagai sarana promosi, pemasaran, dan pengembangan usaha UMKM binaan."
  },
  {
    judul: "KLIK-MPP (Konsultasi Layanan Interaktif dan Komprehensif Mal Pelayanan Publik)",
    perangkatDaerah: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Konsultasi Virtual Live Chatbox yang disematkan langsung pada situs web MPP untuk memudahkan masyarakat mendapatkan informasi perizinan dan non perizinan."
  },
  {
    judul: "LARIS (Layanan Asistensi Registrasi Perizinan Berusaha Pedagang Pasar)",
    perangkatDaerah: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Layanan bergerak jemput bola dimana petugas perizinan turun langsung ke pasar tradisional untuk memberikan pendampingan teknis pembuatan NIB."
  },
  {
    judul: "GEMALA HUB (Pusat Integrasi Gerakan metro Kreatif Lindungi Karya)",
    perangkatDaerah: "Dinas pemuda dan Olahraga, Pariwisata dan Ekonomi Kreatif",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program transformasi digital pelayanan publik untuk fasilitasi pendaftaran HKI, pendataan pelaku ekraf, konsultasi dan pendampingan, serta peta interaktif ekonomi kreatif."
  },
  {
    judul: "Titik Baca Koleksi Digital/E-book",
    perangkatDaerah: "Dinas Perpustakaan dan Kearsipan Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pengadaan Titik Baca Koleksi Digital berbasis QR Code untuk memperluas jangkauan layanan perpustakaan hingga ke ruang-ruang publik."
  },
  {
    judul: "Gebyar IKM Kota Metro",
    perangkatDaerah: "Dinas Perindustrian dan Perdagangan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Kegiatan eksibisi untuk mempromosikan produk industri kecil dan menengah, sebagai wadah temu bisnis, dan meningkatkan penggunaan produk lokal."
  },
  {
    judul: "GEBRAK SIAGA (Gerakan Bersama Latihan Kesiapsiagaan Bencana)",
    perangkatDaerah: "Badan Penanggulangan Bencana Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan pencegahan dan kesiapan aparat serta masyarakat dalam penanggulangan bencana Daerah Kota Metro."
  },
  {
    judul: "PEKA SEKELIK PBJ (Peningkatan Kapasitas Seputar kegiatan dan Klinik Pengadaan Barang/Jasa)",
    perangkatDaerah: "Bagian Pengadaan Barang dan Jasa",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi digital untuk mengoptimalkan monitoring dan pengelolaan Pengadaan Barang/Jasa dengan fitur pemantauan SKP penyedia dan konsultasi pengadaan."
  },
  {
    judul: "RAKOR CERDAS (Rapat Koordinasi Digital, Cepat, Efektif, Responsif, Transparan dan Terukur)",
    perangkatDaerah: "Bagian Pemerintahan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem rapat koordinasi digital yang cepat, efektif, responsif, transparan dan terukur untuk meningkatkan efisiensi koordinasi pemerintahan."
  },
  {
    judul: "PETRA (Pengajuan dan Tracking Produk Hukum)",
    perangkatDaerah: "Bagian Hukum",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem digital untuk pengajuan dan pelacakan status produk hukum daerah secara transparan dan real-time."
  },
  {
    judul: "IBU SITE (Informasi Bagian Umum Berbasis Website)",
    perangkatDaerah: "Bagian Umum",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem informasi berbasis website untuk mengelola, memantau, dan menyajikan informasi seluruh kegiatan Bagian Umum Setda secara digital, terintegrasi, dan real time."
  },
  {
    judul: "AMAD (Alih Media Arsip Digital)",
    perangkatDaerah: "Bagian Umum",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program pengelolaan kearsipan digital untuk mentransformasi sistem kearsipan konvensional menjadi berbasis digital terpadu."
  },
  {
    judul: "SI CANTIK (Sahabat Ibu Cakap Literasi Keuangan Syariah)",
    perangkatDaerah: "Bagian Perekonomian",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program peningkatan literasi keuangan syariah untuk pemberdayaan ekonomi ibu-ibu dan keluarga."
  },
  {
    judul: "PELITA METRO UTARA (Pelayanan Terintegrasi, Cepat, Mudah, Transparan dan ramah)",
    perangkatDaerah: "Kecamatan Metro Utara",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan yang mengintegrasikan pelayanan langsung dengan pemanfaatan teknologi informasi, penyediaan informasi, pendampingan, pelayanan prioritas, dan pengelolaan pengaduan."
  },
  {
    judul: "KEPANG (Kerja Lapangan)",
    perangkatDaerah: "Kecamatan Metro Selatan",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Tim monitoring Kecamatan melakukan penjaringan aspirasi masyarakat terkait pelayanan dengan memberikan informasi, himbauan, sosialisasi serta menampung aspirasi."
  },
  {
    judul: "KLIB PBB (Kemudahan Layanan Input Berbayar Pajak Bumi Bangunan)",
    perangkatDaerah: "Kecamatan Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Membantu wajib pajak dalam membayar PBB melalui online aplikasi dan mobile banking untuk kemudahan dan kecepatan proses pembayaran."
  },
  {
    judul: "GERCEP PDN (Gerakan Cepat Pelayanan Dispensasi Nikah)",
    perangkatDaerah: "Kecamatan Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pelayanan pembuatan Dispensasi Nikah yang dapat diselesaikan dalam waktu singkat (kurang lebih 30 Menit) dengan syarat berkas lengkap."
  },
  {
    judul: "JEMPOL SIMOTI (Jemput Pelayanan Kolaborasi Silaturahmi Metro Timur)",
    perangkatDaerah: "Kecamatan Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan langsung dengan konsep kolaborasi antar OPD dan Lembaga kemasyarakatan untuk meningkatkan layanan publik administrasi kependudukan, kesehatan, perizinan, dan layanan sosial lainnya."
  },
  {
    judul: "SIMDAPLH (Sistem Informasi Data Perencanaan Pembangunan dan Pelestarian Lingkungan Hidup)",
    perangkatDaerah: "Kecamatan Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi dalam menyediakan data untuk membantu perencanaan pembangunan yang sesuai dengan kondisi fisik lapangan menggunakan partisipasi aparatur dan lembaga kemasyarakatan."
  },
  {
    judul: "DULUR PENTING (Dua Telur untuk Penurunan Stunting)",
    perangkatDaerah: "Kecamatan Metro Barat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Gerakan gotong royong dan kolaborasi lintas stakeholder untuk pemenuhan asupan protein bagi keluarga yang memiliki anak berisiko stunting dan ibu hamil."
  },
  {
    judul: "SIANCIL (Sistem Informasi dan Layanan Cepat Pembayaran PBB)",
    perangkatDaerah: "Kecamatan Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Wadah untuk memberikan pelayanan yang lebih mudah, cepat, praktis dan mendekatkan layanan pembayaran PBB kepada masyarakat tanpa harus datang ke kantor pelayanan."
  },
  {
    judul: "EDUMY (Edukasi Mingguan RSUD Jenderal Ahmad Yani)",
    perangkatDaerah: "UPTD. RSUD Ahmad Yani",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program edukasi kesehatan dalam format bincang santai bersama dokter spesialis melalui kanal YouTube untuk meningkatkan literasi kesehatan masyarakat."
  },
  {
    judul: "AMBULAN SIAGA (Jemput Sakit Pulang Sehat)",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan transportasi kesehatan yang memberikan layanan cepat untuk penjemputan pasien darurat maupun pengantaran pasien setelah selesai perawatan."
  },
  {
    judul: "Bincang Sehat Sumber Sari Bantul",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi promosi kesehatan melalui diskusi interaktif, penyuluhan, dan wawancara mengenai berbagai topik kesehatan yang dipublikasikan melalui media sosial."
  },
  {
    judul: "Pelayanan Kesehatan terpadu Bahagia",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi kolaboratif antara RSUD Sumbersari Bantul dengan Puskesmas Margorejo untuk mengintegrasikan pelayanan kesehatan antara FKTP dan FKRTL."
  },
  {
    judul: "Ambulance Sehat (Dokter Spesialis Keliling)",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan luar gedung yang menghadirkan dokter spesialis secara langsung ke wilayah kecamatan melalui sistem jemput bola."
  },
  {
    judul: "STIMIKOL (Stiker Minum Obat dan Kontrol)",
    perangkatDaerah: "UPTD. Puskesmas Yosomulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan kepatuhan ODGJ dalam minum obat dan kontrol rutin melalui stiker pengingat yang dipasang di rumah pasien."
  },
  {
    judul: "PENGANTIN (Pengantar obat Rutin)",
    perangkatDaerah: "UPTD. Puskesmas Yosomulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Layanan pengantaran obat rutin bagi ODGJ yang kesulitan mengakses fasilitas kesehatan dengan kunjungan rumah dan pemantauan kepatuhan."
  },
  {
    judul: "GAS CEK (Gerakan Aksi Skrining dan Cek Kesehatan)",
    perangkatDaerah: "UPTD. Puskesmas Purwosari",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan kesehatan jemput bola yang mengintegrasikan Cek Kesehatan Gratis, skrining PTM, dan penyakit prioritas langsung di tengah masyarakat."
  },
  {
    judul: "GAS JENTIK (Gerakan Aksi Santri Pantau Jentik)",
    perangkatDaerah: "UPTD. Puskesmas Purwosari",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pemberdayaan santri sebagai kader Jumantik di pondok pesantren untuk mencegah DBD dan penyakit tular vektor."
  },
  {
    judul: "MARI PERGI KE PELANGI (Mari Perbaikan Gizi ke Pelayanan Lengkap Gizi)",
    perangkatDaerah: "UPTD. Puskesmas Margorejo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program gerakan masyarakat dan pelayanan kesehatan terpadu untuk mempercepat penurunan angka masalah gizi pada balita."
  },
  {
    judul: "KEMUDI (Kader Edukasi Melalui Teknologi Digital)",
    perangkatDaerah: "UPTD. Puskesmas Tejoagung",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan kapasitas kader kesehatan dalam menyampaikan edukasi melalui pemanfaatan teknologi digital dan AI."
  },
  {
    judul: "CERDAS PTM (Cek Rutin, Deteksi Dini, Atasi dan Sehatkan Penyakit Tidak Menular)",
    perangkatDaerah: "UPTD. Puskesmas Iringmulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk mendekatkan pelayanan promotif dan preventif melalui pemeriksaan rutin, deteksi dini, edukasi, dan pemantauan faktor risiko PTM."
  },
  {
    judul: "GEMA DUET TB Serius Terpadu (Gerakan Bersama Dukung Eliminasi TB Satu Hari Satu Suspek Terpadu)",
    perangkatDaerah: "UPTD. Puskesmas Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan cakupan penemuan Suspek TB dengan kerjasama kader, lintas program dan lintas sektoral untuk percepatan eliminasi TBC 2030."
  },
  {
    judul: "MACAN SETIA (Remaja Cantik Sehat Tanpa Anemia)",
    perangkatDaerah: "UPTD. Puskesmas Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk menumbuhkan kesadaran remaja putri akan pentingnya mencegah anemia dan mewujudkan remaja yang sehat, cerdas, bebas anemia."
  },
  {
    judul: "PETASAN BANTING (Pemantauan dan Pengentasan Balita Stunting)",
    perangkatDaerah: "UPTD. Puskesmas Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Upaya promotif dan preventif melalui kunjungan lapangan untuk pemantauan pertumbuhan balita dan pencegahan stunting."
  },
  {
    judul: "BUNDA MANIS (Bersama Untuk Peduli, Lakukan Pemeriksaan IVA dan SADANIS)",
    perangkatDaerah: "UPTD. Puskesmas Banjarsari",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan kesadaran dan cakupan deteksi dini kanker leher rahim dan kanker payudara pada perempuan usia 30-50 tahun."
  },
  {
    judul: "PENDEKAR MIKAT (Pendidikan Karakter Melalui Minat dan Bakat)",
    perangkatDaerah: "SD Aisyah Metro",
    bentuk: "Inovasi Daerah Lainnya",
    waktu: "2026",
    ringkasan: "Inovasi pendidikan karakter melalui pengembangan minat dan bakat siswa yang dilakukan SD Aisyah Metro."
  },
  {
    judul: "BINAR KENTARA (Bina keterampilan dan Kecakapan Anak untuk Kemandirian dan karya Nyata)",
    perangkatDaerah: "SD Muhammadiyah Buya Hamka",
    bentuk: "Inovasi Daerah Lainnya",
    waktu: "2026",
    ringkasan: "Inovasi untuk memastikan life skill benar-benar menjadi kompetensi anak melalui pembinaan keterampilan dan kecakapan."
  },
  {
    judul: "SI TAQWA",
    perangkatDaerah: "SDIT Annawawi Metro",
    bentuk: "Inovasi Daerah Lainnya",
    waktu: "2026",
    ringkasan: "Digitalisasi setoran hafalan real-time dan transparansi laporan harian ke orang tua via WA otomatis/melalui website SDIT Annawawi."
  },
  {
    judul: "Pramuka Bergerak, Sekolah Berdampak",
    perangkatDaerah: "UPTD SD Negeri 1 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Pramuka sebagai motor penggerak kegiatan di sekolah untuk meningkatkan karakter dan prestasi siswa."
  },
  {
    judul: "SI PANDU HATI (Sistem Pendampingan dan Asesmen Terpadu Inklusi Berbasis Humanis, Aktif, Tepat dan Inovatif)",
    perangkatDaerah: "UPTD SD Negeri 2 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem layanan pendampingan psikososial yang mengintegrasikan guru BK, Guru pembimbing Khusus dan komunitas orang tua."
  },
  {
    judul: "SMART BERKARAKTER (Sekolah maju dengan Aktifitas dan Transformatif Berbasis Karakter)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Upaya meningkatkan kualitas pembelajaran siswa tidak hanya dalam bidang akademik tapi juga non akademik terutama dalam pembentukan karakter."
  },
  {
    judul: "SEBALUNG (Sehari Berbahasa Lampung)",
    perangkatDaerah: "UPTD SD Negeri 4 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Program pembiasaan berbahasa Lampung di sekolah untuk melestarikan bahasa daerah."
  },
  {
    judul: "PROLASIA (Program Layanan Literasi dan Numerasi serta Agama)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program layanan literasi dan numerasi serta agama sebagai investasi jangka panjang untuk masa depan."
  },
  {
    judul: "PKN (Perpustakaan Kami Nyaman)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Perpustakaan yang berfokus pada menciptakan pengalaman positif bagi pengunjung dengan suasana nyaman."
  },
  {
    judul: "KREASI (Kreatif, Ramah Lingkungan, Edukatif, Asri, Sehat, dan Inspiratif)",
    perangkatDaerah: "UPTD SD Negeri 7 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Gerakan inovasi sekolah yang mengajak seluruh warga untuk mengolah sampah menjadi sesuatu yang bermanfaat."
  },
  {
    judul: "JUR-LINK (Jurnal Online Via Link)",
    perangkatDaerah: "UPTD SD Negeri 9 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Transformasi pengisian catatan mengajar harian guru berbasis tautan web terintegrasi."
  },
  {
    judul: "TISAKU (Tiket Sampahku)",
    perangkatDaerah: "UPTD SD Negeri 11 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi yang bertujuan untuk mengurangi volume sampah anorganik di lingkungan sekolah."
  },
  {
    judul: "DEBAR BERSINAR (Digital, Edukatif, Berbudaya, religious, Bersih, Inovatif, ramah Anak)",
    perangkatDaerah: "UPTD SD Negeri 8 Metro Barat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Pembelajaran digital yang kreatif, inovatif, berbudaya sebagai sumber belajar yang menyenangkan."
  },
  {
    judul: "SARI BELANG (Sai Hari Berbudaya Lampung)",
    perangkatDaerah: "UPTD SD Negeri 4 Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi pembiasaan mengenal dan memahami budaya Lampung di lingkungan sekolah yang dilakukan di hari Senin."
  },
  {
    judul: "BERHIAS (Bersih, Hijau, Sehat)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program perencanaan pelaksanaan evaluasi pemanfaatan lahan kosong di lingkungan sekolah."
  },
  {
    judul: "GELAS ANTIK (Gerakan Literasi Sekolah Antusias Intelektual dan Kreatif)",
    perangkatDaerah: "UPTD SD Negeri 8 Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Gerakan literasi sekolah untuk meningkatkan antusiasme intelektual dan kreativitas siswa."
  },
  {
    judul: "SATU PERSONAL (Sabtu Permainan Tradisional)",
    perangkatDaerah: "UPTD SD Negeri 9 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Program kegiatan permainan dan olahraga berbasis budaya kearifan lokal."
  },
  {
    judul: "SMART-MU (Sistem Manajemen Akurat, Responsif dan Terpadu)",
    perangkatDaerah: "UPTD SD Negeri 2 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Digitalisasi pengelolaan sekolah berbasis aplikasi meliputi layanan surat, pengaduan, pengumuman, penilaian, dan absensi."
  },
  {
    judul: "SELASIH (Selasa Berliterasi Hebat)",
    perangkatDaerah: "UPTD SD Negeri 3 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program literasi yang dilaksanakan setiap hari Selasa untuk meningkatkan budaya membaca siswa."
  },
  {
    judul: "SEMAR (Sistem Edukasi Model Aktivitas dan Pembiasaan Rutin)",
    perangkatDaerah: "UPTD SD Negeri 4 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem edukasi model aktivitas dan pembiasaan rutin untuk pembentukan karakter siswa."
  },
  {
    judul: "MANTAB (Manasik Haji dan edukasi Tentang Amal Berkurban)",
    perangkatDaerah: "UPTD SD Negeri 5 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Inovasi pembelajaran keagamaan yang dilaksanakan setiap bulan Dzulhijah."
  },
  {
    judul: "SIBUNI (Literasi Budaya dan Seni)",
    perangkatDaerah: "UPTD SD Negeri 7 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Gerakan untuk mengedukasi peserta didik agar dapat mengenal, memahami dan melestarikan budaya dan seni daerah."
  },
  {
    judul: "BINTANG BBQ (Bina Karakter dan tanggung Jawab melalui Bina Baca Al-Quran)",
    perangkatDaerah: "UPTD SMP Negeri 1 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Kegiatan BBQ untuk meningkatkan kemampuan literasi Al-Qur'an sekaligus membangun karakter religius melalui pembiasaan membaca dan mengamalkan nilai-nilai Al-Qur'an."
  },
  {
    judul: "E-SAPA SPANDA (Elektronik Saran, Aspirasi, dan Pengaduan SMPN 2/Spanda)",
    perangkatDaerah: "UPTD SMP Negeri 2 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem yang mengintegrasikan berbagai layanan sekolah secara efektif, transparan, responsif, dan mudah diakses."
  },
  {
    judul: "PANTER MASEHI (Pemanfaatan Aplikasi NutrieduTerhadap Pola Makan Sehat Dan Bergizi)",
    perangkatDaerah: "UPTD SMP Negeri 2 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Pemanfaatan aplikasi Nutriedu untuk meningkatkan pemahaman siswa tentang pola makan sehat dan bergizi."
  },
  {
    judul: "GEMA SUCI (Generasi Muda Menghapal dan Mengamalkan Kitab Suci)",
    perangkatDaerah: "UPTD SMP Negeri 4 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program untuk membentuk generasi muda yang menghafal dan mengamalkan Kitab Suci."
  },
  {
    judul: "PELITA QURANI (Pembiasaan Literasi Al-Quran untuk Generasi Berkarakter)",
    perangkatDaerah: "UPTD SMP Negeri 6 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Kegiatan pembiasaan literasi Al-Qur'an yang dilaksanakan setiap hari Rabu untuk membentuk generasi berkarakter."
  },
  {
    judul: "SIGARAN ATI (Aplikasi Kebugaran Sehat Anak Indonesia)",
    perangkatDaerah: "UPTD SMP Negeri 7 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi yang dirancang untuk menjawab masalah rendahnya kebugaran jasmani siswa melalui pendekatan edutech-gamification yang terukur."
  },
  {
    judul: "KELINTANG MAS (Kelas Literasi Narasi Tari dan Drama Bahasa Lampung Media Apresiasi Siswa)",
    perangkatDaerah: "UPTD SMP Negeri 7 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program pembelajaran kreatif yang menggabungkan literasi, narasi, tari dan drama berbahasa Lampung sebagai media apresiasi seni."
  }
];

// Data untuk JURI SID (56 inovasi - data dari dokumen baru)
const daftarInovasiSID = [
  // ═══════════════ KATEGORI OPD (32 Inovasi) ═══════════════
  {
    judul: "POSYANDUWANLING (Pos pelayanan Terpadu Hewan Keliling)",
    perangkatDaerah: "DKP3",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Pos pelayanan kesehatan hewan keliling yang memberikan layanan pemeriksaan dan pengobatan hewan ternak secara mobile di berbagai lokasi."
  },
  {
    judul: "Peksos Go To School 2.0 - Generasi Peduli",
    perangkatDaerah: "Dinas Sosial",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pemberdayaan pekerja sosial yang menyasar sekolah untuk membangun generasi muda yang peduli terhadap isu-isu sosial."
  },
  {
    judul: "IMPROVEMENT SEKELIK PBJ (Pengembangan Seputar Kegiatan dan Klinik Pengadaan Barang dan Jasa)",
    perangkatDaerah: "Bagian PBJ",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Peningkatan kapasitas dan layanan konsultasi pengadaan barang dan jasa secara digital dan terstruktur."
  },
  {
    judul: "KUMIS IKAN (Kunjungan Humanis Teknis Perikanan)",
    perangkatDaerah: "DKP3",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program kunjungan teknis ke pelaku usaha perikanan dengan pendekatan humanis untuk pembinaan dan pendampingan."
  },
  {
    judul: "METRO MAS BERSAING",
    perangkatDaerah: "DPPPKBPP",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pemberdayaan masyarakat untuk meningkatkan daya saing ekonomi lokal."
  },
  {
    judul: "Tanah Harapan",
    perangkatDaerah: "Bapperida",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Inovasi perencanaan pembangunan berbasis partisipasi masyarakat dan data terpadu."
  },
  {
    judul: "GEMOY SEJIWA (Gerakan Minum Obat Yuk Sehatkan Jiwa)",
    perangkatDaerah: "Dinkes",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Gerakan untuk meningkatkan kepatuhan minum obat pada pasien gangguan jiwa."
  },
  {
    judul: "UFO GERTAPAGA (Urban Farming Optimalisasi Gerakan Tanaman Pangan Keluarga)",
    perangkatDaerah: "DKP3",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program urban farming untuk mengoptimalkan penanaman tanaman pangan di lingkungan keluarga."
  },
  {
    judul: "Laga Pak Amar (Liga Sepak Bola Antar Kecamatan dan Kelurahan)",
    perangkatDaerah: "Kec. Metro Selatan",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Kompetisi sepak bola untuk meningkatkan kebersamaan dan kesehatan masyarakat tingkat kecamatan dan kelurahan."
  },
  {
    judul: "MPP Beraksi (Mal Pelayanan Publik Bergerak Melayani Masyarakat dengan Kolaborasi)",
    perangkatDaerah: "DPMPTSP",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Layanan publik bergerak yang mendekatkan berbagai layanan administrasi kepada masyarakat."
  },
  {
    judul: "KOMPAK (Kolaborasi Organisasi Masyarakat Antisipasi Kebakaran)",
    perangkatDaerah: "Dinas Damkar",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program kolaborasi dengan organisasi masyarakat untuk pencegahan dan penanggulangan kebakaran."
  },
  {
    judul: "MASDI (Memasuki Masa Purnabakti Dokumen Kependudukan Langsung Jadi)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Layanan cepat pengurusan dokumen kependudukan untuk yang akan memasuki masa pensiun."
  },
  {
    judul: "AJIAN (Antar Jemput Perizinan)",
    perangkatDaerah: "DPMPTSP",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Layanan antar jemput dokumen perizinan untuk kemudahan masyarakat dalam mengurus izin."
  },
  {
    judul: "GELLUK MENGAN PAI (Gerakan Layanan Dokumen Kependudukan Untuk Penduduk Pendapatan Menengah Kebawah (Miskin) Sampai Selesai)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program layanan dokumen kependudukan gratis bagi masyarakat kurang mampu hingga selesai."
  },
  {
    judul: "E-Musrenbang Kota Metro",
    perangkatDaerah: "Bapperida",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Platform digital untuk musyawarah perencanaan pembangunan yang melibatkan partisipasi masyarakat secara online."
  },
  {
    judul: "SEKELIK PBJ (Seputar Kegiatan dan Klinik Pengadaan Barang/Jasa)",
    perangkatDaerah: "Bagian PBJ",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Pusat layanan konsultasi dan informasi pengadaan barang dan jasa."
  },
  {
    judul: "SIGAP RTLH (Sistem Informasi Geospasial Rumah Tidak layak Huni)",
    perangkatDaerah: "Dinas Perkim",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Sistem informasi berbasis peta untuk pendataan dan monitoring rumah tidak layak huni."
  },
  {
    judul: "Pintar Digital (Pemanfaatan informasi tata ruang digital)",
    perangkatDaerah: "DPUTR",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Platform digital untuk akses informasi tata ruang dan perencanaan kota."
  },
  {
    judul: "GERTAK PSU",
    perangkatDaerah: "Dinas Perkim",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Gerakan penataan dan pengelolaan prasarana, sarana, dan utilitas umum perumahan."
  },
  {
    judul: "Agro Edu Wisata",
    perangkatDaerah: "DKP3",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Pengembangan wisata edukasi pertanian untuk pembelajaran dan rekreasi."
  },
  {
    judul: "TAPIS IDAMAN (Optimalisasi Tata Kelola Data Spasial Berbasis Webgis Terintegrasi Untuk Mendukung Perencanaan Pembangunan Daerah)",
    perangkatDaerah: "Bapperida",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Sistem informasi geospasial terintegrasi untuk mendukung perencanaan pembangunan daerah."
  },
  {
    judul: "GEMALA (Gerakan Metro Bahagia Lindungi Karya)",
    perangkatDaerah: "Disporapar",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program perlindungan hak kekayaan intelektual bagi pelaku ekonomi kreatif."
  },
  {
    judul: "KARTU METRO BAHAGIA",
    perangkatDaerah: "Disdikbud",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Kartu identitas untuk mengakses berbagai layanan pendidikan dan kebudayaan di Kota Metro."
  },
  {
    judul: "Gedor Kandang Sapi Gercep",
    perangkatDaerah: "DKP3",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pembinaan peternakan sapi dengan pendekatan door to door yang cepat dan responsif."
  },
  {
    judul: "SENANDUNG BULAN (Sistem Penanganan dan Perlindungan Bina Unggul Lansia)",
    perangkatDaerah: "Dinsos",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Sistem terintegrasi untuk penanganan dan perlindungan lanjut usia."
  },
  {
    judul: "SI IDAMAN (Sistem Informasi Dukcapil Mandiri)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Platform layanan mandiri untuk pengurusan dokumen kependudukan secara online."
  },
  {
    judul: "KREASI SI PULAN (Kerja Sama, Kolaborasi, dan Integrasi Data Sipil Putusan Pengadilan)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Integrasi data administrasi kependudukan dengan putusan pengadilan untuk akurasi data."
  },
  {
    judul: "Si PAI (Sistem Informasi Pengelolaan Administrasi Pendidikan)",
    perangkatDaerah: "Disdikbud",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Sistem informasi untuk pengelolaan administrasi pendidikan secara terpadu."
  },
  {
    judul: "PEPADUN (Pelayanan penerbitan dokumen bagi penduduk rentan administrasi kependudukan)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Layanan khusus penerbitan dokumen kependudukan bagi penduduk rentan."
  },
  {
    judul: "LANSIA BAHAGIA (Kerja Sama Pelayanan Administrasi Kependudukan Dan Pencatatan Sipil Untuk Lanjut Usia Bahagia)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program kolaborasi pelayanan administrasi kependudukan yang ramah lansia."
  },
  {
    judul: "BERSIH NODA (Pembersihan Data Anomali Kependudukan)",
    perangkatDaerah: "Disdukcapil",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Program pembersihan dan validasi data kependudukan dari anomali dan duplikasi."
  },
  {
    judul: "AYO SEKOLAH",
    perangkatDaerah: "Disdikbud",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program gerakan untuk meningkatkan partisipasi pendidikan dan mengurangi angka putus sekolah."
  },

  // ═══════════════ KATEGORI PENDIDIKAN (16 Inovasi) ═══════════════
  {
    judul: "MBAK JUM SMS (Membatik Jumputan SDN 1 Metro Selatan)",
    perangkatDaerah: "SDN 1 Metro Selatan",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pembelajaran batik jumputan sebagai bagian dari pelestarian budaya lokal."
  },
  {
    judul: "MENU BAKMI (Menumbuhkan serta Mengembangkan Bakat dan Minat di Pendidikan Dasar)",
    perangkatDaerah: "SD Negeri 7 Metro Pusat",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pengembangan bakat dan minat siswa sekolah dasar secara terstruktur."
  },
  {
    judul: "HARUM (Hari Kunjung Guru Menginspirasi)",
    perangkatDaerah: "SD Negeri 7 Metro Pusat",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program kunjungan guru ke rumah siswa untuk memberikan motivasi dan inspirasi."
  },
  {
    judul: "KEGIATAN JUBER (Jumat Berkah)",
    perangkatDaerah: "TK Negeri",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Kegiatan rutin Jumat yang mengajarkan nilai-nilai kebaikan dan keberkahan pada anak usia dini."
  },
  {
    judul: "Ngekham (Mengenalkan Adat dan Budaya Khas Lampung)",
    perangkatDaerah: "SMP Negeri 6 Metro",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pengenalan dan pelestarian adat serta budaya khas Lampung kepada siswa."
  },
  {
    judul: "SI MASTER (Sistem Informasi Manajemen Sekolah Terpadu)",
    perangkatDaerah: "SMP Negeri 7 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Sistem informasi digital untuk pengelolaan administrasi dan akademik sekolah secara terpadu."
  },
  {
    judul: "Gerakan Aksi Sekolah Anti Bullying (GASING)",
    perangkatDaerah: "SDN 11 MP",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pencegahan dan penanganan perundungan di lingkungan sekolah."
  },
  {
    judul: "Game Edukasi METROBOY (Mempelajari Pengetahuan Tentang Kota Metro)",
    perangkatDaerah: "SMPN 9 Metro",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Game edukatif untuk mengenalkan sejarah, budaya, dan potensi Kota Metro kepada siswa."
  },
  {
    judul: "SIGER-MERDEKA (Sistem Informasi dan Gelar Modul Edukasi Kurikulum Merdeka)",
    perangkatDaerah: "SMP Negeri 3 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Platform digital untuk implementasi kurikulum merdeka dengan fokus pada kearifan lokal tari Cangget Lampung."
  },
  {
    judul: "SERASI HEBAT",
    perangkatDaerah: "SDN 1 Metro utara",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pembentukan karakter siswa yang selaras, harmonis, dan berprestasi."
  },
  {
    judul: "PANTER MASEHI (Pemanfaatan Aplikasi NutriEdu terhadap Pemahaman Siswa tentang Pola Makan Sehat dan Bergizi)",
    perangkatDaerah: "SMPN 3 Metro",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Aplikasi edukasi gizi untuk meningkatkan pemahaman siswa tentang pola makan sehat."
  },
  {
    judul: "SILAB MATA (Sistem Informasi Laboratorium IPA, Manajemen dan Tata Kelola)",
    perangkatDaerah: "SMP Negeri 6 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Sistem digital untuk manajemen dan tata kelola laboratorium IPA sekolah."
  },
  {
    judul: "ANTING MERAH (Anti Stunting Meraih Berkah)",
    perangkatDaerah: "SMPN 4 Metro",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program edukasi dan pencegahan stunting di lingkungan sekolah."
  },
  {
    judul: "GEMAR CAPER (GErakan MAksimalkan Ruang Digital Cegah Aksi Perundungan)",
    perangkatDaerah: "SMP Negeri 1 Metro",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Gerakan pencegahan cyberbullying dan perundungan digital di kalangan pelajar."
  },
  {
    judul: "ADISKA",
    perangkatDaerah: "SD Negeri 6 MP",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program inovatif untuk meningkatkan kualitas pembelajaran di sekolah dasar."
  },
  {
    judul: "GERBANG LAMPUNG",
    perangkatDaerah: "SMP Negeri 2 Metro",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Gerakan pembudayaan nilai-nilai kearifan lokal Lampung di kalangan pelajar."
  },

  // ═══════════════ KATEGORI KESEHATAN (8 Inovasi) ═══════════════
  {
    judul: "SI BATOUX (Satu Bulan Satu Kali Balita Test Mantoux)",
    perangkatDaerah: "Puskesmas Purwosari",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program skrining TB pada balita secara rutin setiap bulan melalui test mantoux."
  },
  {
    judul: "EDUMY (Edukasi Mingguan Ahmad Yani)",
    perangkatDaerah: "RSUD Ahmad Yani",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program edukasi kesehatan mingguan untuk meningkatkan literasi kesehatan masyarakat."
  },
  {
    judul: "GRADASI (Gerakan Remaja Cerdas Sehat Berprestasi)",
    perangkatDaerah: "Puskesmas Margorejo",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program pembinaan kesehatan remaja untuk mewujudkan generasi yang cerdas, sehat, dan berprestasi."
  },
  {
    judul: "CEMARA",
    perangkatDaerah: "PKM Karangrejo",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program layanan kesehatan inovatif di Puskesmas Karangrejo."
  },
  {
    judul: "Saputangan",
    perangkatDaerah: "PKM Yosomulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program kesehatan masyarakat di wilayah Yosomulyo."
  },
  {
    judul: "MAMA CETING",
    perangkatDaerah: "PKM Tejoagung",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Program layanan kesehatan ibu dan anak di Puskesmas Tejoagung."
  },
  {
    judul: "KLUNTING",
    perangkatDaerah: "PKM Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Inovasi pelayanan kesehatan di Puskesmas Mulyojati."
  },
  {
    judul: "Gemar Beraksi",
    perangkatDaerah: "Puskesmas Yosomulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2027",
    ringkasan: "Gerakan masyarakat aktif untuk kesehatan di wilayah Yosomulyo."
  },
  {
    judul: "SPARK (Sistem Pemantauan Anggaran dan Realisasi Kinerja)",
    perangkatDaerah: "Bagian Administrasi Pembangunan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2027",
    ringkasan: "Sistem pemantauan anggaran dan realisasi kinerja berbasis digital untuk meningkatkan transparansi dan akuntabilitas pengelolaan anggaran pembangunan daerah secara real-time."
  }
];

// Fungsi untuk mendapatkan daftar inovasi berdasarkan role
function getDaftarInovasiByRole(role) {
  if (role === 'juri_sid') {
    return daftarInovasiSID; // 56 inovasi untuk juri SID
  } else {
    return daftarInovasiJudulLengkap; // 106 inovasi untuk juri judul
  }
}

// Default: gunakan array gabungan atau array pertama
// Variable ini akan di-override di setiap halaman sesuai role yang login
let daftarInovasi = daftarInovasiJudulLengkap;
