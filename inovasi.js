// ══════════════════════════════════════════
//  DATA INOVASI DAERAH KOTA METRO 2027
// ══════════════════════════════════════════
const daftarInovasi = [
  {
    judul: "Digitalisasi Laporan Ikhtisar Pengawasan APIP",
    perangkatDaerah: "Inspektorat Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Digitalisasi Laporan Ikhtisar Pengawasan APIP merupakan langkah transformasi pengelolaan dan konsolidasi data hasil pengawasan internal pemerintah daerah dari sistem manual menjadi sistem terintegrasi secara elektronik. Inovasi ini menyajikan rangkuman (ikhtisar) hasil pemeriksaan, reviu, evaluasi, dan pemantauan secara real-time, akurat, dan terstruktur. Melalui platform ini, Kepala Daerah dan Sekretaris Daerah mendapatkan gambaran menyeluruh mengenai kinerja tata kelola, peta risiko, serta tingkat kepatuhan OPD sebagai bahan pengambilan keputusan strategis."
  },
  {
    judul: "Klinik Konsultasi Pengawasan APIP",
    perangkatDaerah: "Inspektorat Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Klinik Konsultasi dan Pengawasan APIP merupakan transformasi layanan pengawasan dari model konvensional yang berfokus pada penindakan (watchdog) menjadi pendekatan reaktif-preventif dan kemitraan (consultative partner). Layanan ini hadir sebagai fasilitas pusat konsultasi, reviu, serta pendampingan tata kelola pemerintahan, keuangan, dan manajemen risiko bagi seluruh OPD. Melalui skema tatap muka maupun online, inovasi ini bertujuan mencegah pelanggaran sejak dini (Early Warning System), percepatan perbaikan tata kelola, dan memberikan nilai tambah dalam pencapaian tujuan strategis perangkat daerah."
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
    ringkasan: "Tanah Harapan 2.0 merupakan inovasi pengembangan lanjutan dari program sebelumnya yang bertujuan untuk meningkatkan kualitas perencanaan pembangunan berbasis data dan partisipasi masyarakat di Kota Metro."
  },
  {
    judul: "SITEGGRASI SP2D (Sistem Terintegrasi Penerbitan SP2D Elektronik)",
    perangkatDaerah: "Badan Keuangan dan Aset Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Merupakan pembaharuan tata kelola keuangan Pemerintah Kota Metro yang mengintegrasikan Sistem Informasi Pemerintahan Daerah (SIPD) secara elektronik berbasis host-to-host dengan sistem cash management PT Bank Lampung. Bertujuan mengeliminasi proses manual, mempercepat pemindahbukuan dana dari RKUD ke pihak ketiga, menyediakan dashboard pemantauan status pencairan secara transparan bagi OPD, serta mempermudah rekonsiliasi kas harian dan penataan arsip digital secara akuntabel."
  },
  {
    judul: "JEJAK DANA (Jaringan Evaluasi dan Jejak Aliran Dana Non-Kas Daerah)",
    perangkatDaerah: "Badan Keuangan dan Aset Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi penatausahaan dan penyusunan laporan keuangan yang berfokus pada identifikasi, rekonsiliasi, serta pencatatan terintegrasi atas penerimaan dan pengeluaran dana transfer pusat atau hibah/bantuan langsung (DAK Nonfisik, BOS, dana Kapitasi JKN) tanpa melalui pencatatan awal di RKUD. Memastikan seluruh aliran dana pusat yang semula tidak terlihat dapat tersaji secara akurat, akuntabel, dan real-time dalam LKPD sesuai standar akuntansi pemerintahan."
  },
  {
    judul: "CERMAT RKUD (Cash Early Reminder, Monitoring dan Analisis Terpadu RKUD)",
    perangkatDaerah: "Badan Keuangan dan Aset Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi tata kelola RKUD yang menghadirkan sistem peringatan dini berbasis pemantauan saldo kas secara real-time. Sistem otomatis memberikan notifikasi kepada Kuasa BUD saat posisi kas menyentuh ambang batas minimum aman (safety cash balance). Mencegah risiko krisis likuiditas, mengoptimalkan manajemen kas daerah, serta memastikan keberlangsungan pemenuhan kewajiban belanja Pemerintah Daerah secara tepat waktu dan akuntabel."
  },
  {
    judul: "METAS (Metro Asset Service)",
    perangkatDaerah: "Badan Pendapatan Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Penerapan pemesanan gedung/aset daerah dengan menggunakan aplikasi berbasis web. METAS memudahkan masyarakat dan instansi dalam melakukan pemesanan dan pengelolaan penggunaan aset milik Pemerintah Kota Metro secara digital, transparan, dan efisien."
  },
  {
    judul: "Sistem Informasi Dashboard Data ASN",
    perangkatDaerah: "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "SI-DATA ASN adalah sistem informasi berbasis web yang dirancang untuk mengelola dan menyajikan data kepegawaian Aparatur Sipil Negara (ASN) secara cepat dan real-time dalam bentuk dashboard interaktif. Dikembangkan untuk mendukung tata kelola ASN yang modern, transparan, dan akuntabel sesuai prinsip SPBE. Proses penyajian informasi kepegawaian menjadi lebih cepat dan terintegrasi dalam satu platform digital."
  },
  {
    judul: "SI GEMBIRA (Sistem Gerakan Metro Bersih Dari Narkotika)",
    perangkatDaerah: "Badan Kesatuan Bangsa dan Politik",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi daerah berbasis digital untuk meningkatkan efektivitas P4GN melalui satu platform yang mudah diakses masyarakat. Memiliki 5 menu utama: edukasi bahaya narkotika, pelaporan dugaan penyalahgunaan, informasi akses layanan rehabilitasi, konsultasi, serta mapping wilayah narkotika untuk mendukung pemetaan program P4GN berbasis data."
  },
  {
    judul: "SYNDTAKER (Pemanfaatan Synology Drive Guna Mewujudkan Efektivitas dan Efisiensi Tata Kelola Perencanaan di Bagian Keuangan Sekretariat DPRD)",
    perangkatDaerah: "Sekretariat DPRD",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Mewujudkan tata kelola bahan-bahan perencanaan yang lebih efektif, efisien, terintegrasi, serta akuntabel di sub-substansi Perencanaan Bagian Keuangan Sekretariat DPRD. Sekretariat DPRD mampu menyediakan informasi perencanaan yang akurat, relevan, dan dapat diakses tepat waktu sebagai landasan kuat bagi pimpinan dan anggota DPRD dalam pengambilan keputusan."
  },
  {
    judul: "TAPE UDANG (Penggunaan Taplink Dalam Penyelenggaraan Rapat-Rapat Bagian Perundangan dan Persidangan di Sekretariat DPRD Kota Metro)",
    perangkatDaerah: "Sekretariat DPRD",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Mengintegrasikan berbagi tautan, dokumen dan layanan hanya dalam satu halaman untuk lebih mudah dan menarik. Taplink dilakukan sesuai kontrol akses, pemantauan kinerja dan audit berkala sesuai dengan kebijakan penggunaan, memudahkan penyelenggaraan rapat-rapat di Sekretariat DPRD Kota Metro."
  },
  {
    judul: "BIDIKSIPA (Bantuan Pendidikan Guru PAUD yang sedang menempuh S1)",
    perangkatDaerah: "Dinas Pendidikan dan Kebudayaan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Program Bantuan Pendidikan S1 bagi Guru PAUD yang sedang menempuh jenjang S1. Inovasi ini bertujuan meningkatkan kualifikasi akademik guru PAUD di Kota Metro agar memenuhi standar pendidikan nasional, sehingga kualitas layanan pendidikan anak usia dini semakin meningkat."
  },
  {
    judul: "PPKSP (Pendampingan Permasalahan Kekerasan di Satuan Pendidikan)",
    perangkatDaerah: "Dinas Pendidikan dan Kebudayaan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2025",
    ringkasan: "Aplikasi pelayanan untuk peserta didik mencakup layanan mutasi, kesalahan ijazah, pengganti ijazah, dan penanganan permasalahan kekerasan di satuan pendidikan. Memberikan pendampingan yang sistematis dan responsif terhadap berbagai permasalahan yang terjadi di lingkungan sekolah."
  },
  {
    judul: "Ayo Sekolah",
    perangkatDaerah: "Dinas Pendidikan dan Kebudayaan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2025",
    ringkasan: "Program jemput bola bagi warga Kota Metro untuk menuntaskan buta huruf. Inovasi ini hadir sebagai upaya percepatan pengentasan buta aksara melalui pendekatan aktif mendatangi warga yang belum mendapatkan akses pendidikan dasar."
  },
  {
    judul: "GEMAR SEHATI (Gerakan menuju Remaja Sehat dan Aktif)",
    perangkatDaerah: "Dinas Kesehatan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan derajat kesehatan remaja di lingkungan sekolah melalui pembentukan kader kesehatan remaja, penguatan jejaring komunikasi antar sekolah, pembinaan UKS/M, serta pelaksanaan dan evaluasi Cek Kesehatan Gratis (CKG) di sekolah. Mendorong peran aktif remaja sebagai agen perubahan kesehatan sekaligus memperkuat layanan kesehatan promotif dan preventif di lingkungan pendidikan."
  },
  {
    judul: "SATRIA (Sasaran terjadwal Rutin Air Limbah)",
    perangkatDaerah: "Dinas Pekerjaan Umum dan Tata Ruang",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Mengubah pola penanganan limbah dari reaktif (menunggu mampet) menjadi preventif (terjadwal). SATRIA memastikan setiap infrastruktur air limbah domestik milik warga mendapatkan perawatan secara berkala demi menjaga kelestarian lingkungan dan kesehatan masyarakat."
  },
  {
    judul: "SIGAP TPU (Sistem Informasi Geospasial Tempat Pemakaman Umum)",
    perangkatDaerah: "Dinas Perumahan dan Kawasan Permukiman",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Sistem informasi berbasis digital dan geospasial untuk pendataan, pemetaan, pengelolaan, dan pemantauan Tempat Pemakaman Umum (TPU) secara terintegrasi. Informasi mengenai lokasi akurat, mudah diperbarui, dan dapat digunakan sebagai dasar perencanaan serta pengambilan kebijakan Pemerintah Kota Metro dalam penyediaan dan pengelolaan TPU."
  },
  {
    judul: "SIGAP PSU (Sistem Informasi Geospasial Prasarana, dan Utilitas Umum)",
    perangkatDaerah: "Dinas Perumahan dan Kawasan Permukiman",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi berbasis teknologi informasi untuk meningkatkan efektivitas pendataan, inventarisasi, verifikasi, serah terima, serta pengelolaan PSU Perumahan. Mengintegrasikan data administrasi, teknis, lokasi geospasial, dokumentasi, dan status pengelolaan PSU untuk mendukung percepatan proses serah terima dan memastikan PSU dapat dikelola secara optimal."
  },
  {
    judul: "RESPONTIBKUMDA (Responsif Penertiban hukum Daerah Kota Metro)",
    perangkatDaerah: "Satuan Polisi Pamong Praja",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi yang mewujudkan penegakkan Perda yang humanis dan akuntabel sesuai SOP dengan meningkatkan kecepatan respons penanganan pelanggaran terhadap masyarakat."
  },
  {
    judul: "SRIKANDI BAHAGIA (Strategi responsive dan Inovatif Praja Wanita: Berkomunikasi dengan baik, Aman dalam bertindak, Humanis dalam melayani, Adaptif terhadap situasi, Gesit dalam merespon, Integratif dalam koordinasi, Akuntabel dalam pelaksanaan, Pelayanan dan pemdampingan masyarakat)",
    perangkatDaerah: "Satuan Polisi Pamong Praja",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Praja Wanita Satpol PP memiliki posisi strategis dalam pelayanan masyarakat karena pendekatan komunikasi yang lebih persuasif, empatik, dan sensitif dapat menciptakan suasana yang lebih nyaman dan terbuka. SRIKANDI BAHAGIA tidak mengurangi ketegasan Satpol PP dalam menegakkan aturan, tetapi menghadirkan cara bertindak yang lebih komunikatif, humanis, responsif, dan berkeadilan."
  },
  {
    judul: "RESEP TAWA (Reaksi Cepat Tanggap Satwa)",
    perangkatDaerah: "Dinas Pemadam Kebakaran",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Meningkatkan respons cepat, kemampuan dan keterampilan petugas pemadam kebakaran dan penyelamatan dalam mengevakuasi satwa liar/berbahaya yang masuk ke dalam atau berada di lingkungan rumah warga."
  },
  {
    judul: "HANJAK SAGITA (Harapan, Akses, Jaringan, dan Kemandirian – Sistem Aksi gerak Inklusif dan tanggap)",
    perangkatDaerah: "Dinas Sosial dan Pemberdayaan Masyarakat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi Dinas Sosial Kota Metro yang memberdayakan penyandang disabilitas dan keluarganya melalui pendekatan holistik: Harapan, Aspirasi, Nyata, Jaringan, Akses, dan Kemandirian dalam Sistem Aksi Gerak Inklusif dan Tanggap Aktif. Program ini memastikan layanan sosial membangun kemandirian melalui akses jaringan, pendampingan, dan solusi nyata bagi kelompok rentan di Kota Metro."
  },
  {
    judul: "LENTERA KENCANA (Layanan Terintegrasi dan Responsif – Kanal Empatik, Cepat dan Aman)",
    perangkatDaerah: "Dinas Sosial dan Pemberdayaan Masyarakat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan pengaduan sosial yang menghadirkan layanan terpadu, responsif, empatik, cepat, nyaman, aman, dan mudah diakses masyarakat. Setiap aduan diterima, diverifikasi, diidentifikasi, kemudian ditindaklanjuti melalui asesmen, intervensi, rujukan, pendampingan, dan pemantauan. Mendorong pelayanan sosial yang lebih humanis, inklusif, transparan, dan berorientasi pada penyelesaian masalah."
  },
  {
    judul: "SEKOLAH KELUARGA SAI BANGGA (Saling Asah, Asuh, dan Asih Menuju Keluarga Tangguh, Berdaya, dan Membanggakan)",
    perangkatDaerah: "Dinas Pemberdayaan Perempuan, Perlindungan Anak, Pengendalian Penduduk dan Keluarga Berencana",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pembelajaran bagi keluarga untuk meningkatkan pengetahuan, keterampilan, dan sikap dalam mewujudkan keluarga berkualitas, mencegah stunting, mencegah perkawinan anak, serta melindungi perempuan dan anak melalui pendekatan edukatif, partisipatif, dan kolaboratif. Materi meliputi pengasuhan positif, pencegahan stunting (1000 HPK), kesehatan reproduksi, perlindungan perempuan dan anak, serta ketahanan keluarga."
  },
  {
    judul: "QUARSA (Gerakan Qurban Aman dan Sehat)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Integrasi pengawasan qurban berbasis kolaborasi pemerintah dan Baznas berupa sistem pengawasan berbasis titik lokasi masjid/mushola yang fokus terhadap 6 risiko utama: umur hewan kurban, SKKH, pemotongan betina produktif, praktik penyembelihan (kesrawan), penanganan daging, dan pengelolaan limbah. Menggunakan pendekatan form terstandar (low cost system) serta penguatan edukasi panitia."
  },
  {
    judul: "SIEMBEK SEHAT (Sistem Integrasi Keamanan Penerbitan Pemotongan Kambing Sehingga One Health Aman Terawasi)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Sistem terpadu pengendalian pemotongan kambing di Kota Metro yang mengintegrasikan penertiban pemotongan di luar RPH, penguatan layanan RPH, pemeriksaan kesehatan hewan, serta pengelolaan lingkungan berbasis kolaborasi lintas sektor."
  },
  {
    judul: "TELAM (Teras Pangan Lokal Kota Metro)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Teras Pangan Lokal merupakan upaya peningkatan pengetahuan masyarakat mengenai pengolahan pangan lokal yang sehat, bergizi, beragam, aman, dan bernilai ekonomi melalui kegiatan edukasi, demonstrasi, dan praktik pengolahan pangan lokal. Peserta tidak hanya memperoleh materi teori, tetapi juga praktik langsung pengolahan bahan pangan lokal menjadi produk yang menarik, bergizi dan bernilai jual."
  },
  {
    judul: "PosTer Pangan (Pos pengawasan Terpadu Keamanan Pangan)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pasar tani sebagai wadah pemasaran produk pertanian secara digital dan non-digital dengan konsep fresh from farm. Untuk memastikan keamanan pangan dilakukan pengawasan dan pengujian keamanan pangan terhadap produk yang beredar baik pangan segar maupun pangan olahan."
  },
  {
    judul: "Gerakan Metro Peduli Pangan",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Aksi penyelamatan pangan sebagai upaya pencegahan dan pengurangan sisa pangan melalui kolaborasi dengan pihak luar dari unsur pemerintah daerah, asosiasi, swasta/pelaku usaha, bank pangan/penggiat penyelamat pangan, civitas akademika, komunitas, media dan masyarakat."
  },
  {
    judul: "BESOLEK (Besuk Online Efektif)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Besuk pasien rawat inap UPTD RSH Kota Metro yang dilaksanakan dengan cara video call antara pemilik hewan rawat inap dan petugas pada jam besuk. Pemilik hewan dapat melihat hewan kesayangannya secara live, mengetahui perkembangan kondisi pasien, konsultasi, dan memberikan persetujuan tindakan tambahan."
  },
  {
    judul: "PERMATA (Peternakan Mandiri Ayam Perkotaan)",
    perangkatDaerah: "Dinas Ketahanan Pangan, Pertanian dan Perikanan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Gerakan mengajak masyarakat perkotaan untuk melakukan budidaya ayam skala rumah tangga secara mandiri dengan konsep urban farming. Dilaksanakan di tengah situasi lahan yang semakin sempit dengan sinergi antara pemerintah, swasta, komunitas, akademisi dan media di Kota Metro."
  },
  {
    judul: "SIKEPAY (Sistem Informasi Kepatuhan dan Pembayaran Retribusi Sampah)",
    perangkatDaerah: "Dinas Lingkungan Hidup",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan efektivitas pemungutan retribusi melalui aplikasi pembayaran retribusi sampah berbasis digital (nontunai/non-budgeter). Terintegrasi dengan Bank Lampung untuk kanal pembayaran dan dengan Diskominfo untuk dukungan sistem informasi."
  },
  {
    judul: "SABAR (Sakai Sambayan Bersih dan Retribusi)",
    perangkatDaerah: "Dinas Lingkungan Hidup",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi edukasi dan pemberdayaan masyarakat berbasis kearifan lokal dalam pemilahan sampah dan peningkatan kepatuhan membayar retribusi persampahan. Sosialisasi keliling menggunakan mobil satgas dengan jingle/lagu yang menarik dan mudah diingat, pembayaran dapat dilakukan langsung ke mobil satgas via QRIS."
  },
  {
    judul: "MEKHANAI ADMINDUK (MANAJEMEN Keamanan Informasi Administrasi kependudukan)",
    perangkatDaerah: "Dinas Kependudukan dan Pencatatan Sipil",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi yang bertujuan memperkuat keamanan informasi kependudukan di era transformasi digital, berfokus pada perlindungan data penduduk dari risiko kebocoran, penyalahgunaan, dan gangguan layanan melalui penerapan tata kelola keamanan informasi yang sistematis."
  },
  {
    judul: "Jemput Bola SI APDI (Sistem Administrasi Pemanfaatan IKD untuk Digitalisasi Bantuan Sosial)",
    perangkatDaerah: "Dinas Kependudukan dan Pencatatan Sipil",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program bantuan sosial digitalisasi agar penyalurannya tepat sasaran, cepat, dan transparan. IKD menjadi kunci verifikasi identitas melalui teknologi face recognition dan integrasi data kependudukan untuk mencegah pemalsuan identitas. Disdukcapil mempercepat aktivasi IKD agar bansos berbasis IKD dapat berjalan optimal."
  },
  {
    judul: "SI AKSI (Sistem Integrasi Akta, KK, dan KIA Siap Melayani)",
    perangkatDaerah: "Dinas Kependudukan dan Pencatatan Sipil",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi yang mengintegrasikan penerbitan Kartu Keluarga (KK), Akta Kelahiran, dan Kartu Identitas Anak (KIA) dalam satu kali proses pelayanan. Memudahkan masyarakat memperoleh tiga dokumen sekaligus secara cepat, mudah, dan efisien, sekaligus menjamin hak identitas anak sejak lahir."
  },
  {
    judul: "TERANGIN",
    perangkatDaerah: "Dinas Perhubungan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi digital berupa aplikasi layanan pengaduan penerangan jalan umum (PJU) berbasis AI dan geolokasi. Menghubungkan masyarakat dan Dinas Perhubungan dalam satu ekosistem pengaduan PJU berbasis digital. Masyarakat dapat melaporkan kerusakan PJU secara mudah dan memantau tindak lanjutnya."
  },
  {
    judul: "SINADI (Sistem Informasi Layanan Digital)",
    perangkatDaerah: "Dinas Komunikasi, Informatika dan Statistik",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan publik berbasis web yang mengintegrasikan seluruh layanan Dinas Komunikasi, Informatika dan Statistik Kota Metro dalam satu portal layanan terpadu. Pengguna dapat mengakses layanan, melakukan pendaftaran, mengunggah dokumen, memantau progress, menerima notifikasi, serta mengunduh hasil layanan secara elektronik."
  },
  {
    judul: "Jumat Djajan Metro Bahagia",
    perangkatDaerah: "Dinas Koperasi, Usaha kecil dan Menengah, dan Ketenagakerjaan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Bazar UMKM yang dilaksanakan satu bulan dua kali setiap hari Jumat dengan melibatkan UMKM binaan maupun UMKM lokal Kota Metro. Menjadi sarana promosi, pemasaran, dan pengembangan usaha melalui penyediaan tempat berjualan yang strategis serta sosialisasi dan edukasi bagi pelaku usaha."
  },
  {
    judul: "KLIK-MPP (Konsultasi Layanan Interaktif dan Komprehensif Mal Pelayanan Publik)",
    perangkatDaerah: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Penyediaan Konsultasi Virtual (Live Chatbox) yang disematkan langsung pada situs web resmi MPP Kota Metro. Masyarakat cukup membuka situs web, mengeklik ikon chat, dan memilih instansi tujuan. Sistem otomatis menghubungkan percakapan ke layar komputer petugas gerai terkait untuk memberikan panduan informasi perizinan."
  },
  {
    judul: "LARIS (Layanan Asistensi Registrasi Perizinan Berusaha Pedagang Pasar)",
    perangkatDaerah: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Layanan bergerak (jemput bola) di mana petugas perizinan secara proaktif turun langsung mendatangi pasar-pasar tradisional di Kota Metro. Memberikan pendampingan teknis pembuatan NIB bagi pedagang secara menyeluruh hingga tuntas di tempat, mengatasi hambatan pedagang dalam mengurus perizinan secara mandiri."
  },
  {
    judul: "GEMALA HUB (Pusat Integrasi Gerakan metro Kreatif Lindungi Karya)",
    perangkatDaerah: "Dinas Pemuda dan Olahraga, Pariwisata dan Ekonomi Kreatif",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program transformasi digital pelayanan publik yang memfasilitasi pendaftaran HKI secara digital, pendataan dan klasifikasi pelaku ekonomi kreatif ke dalam 21 subsektor, konsultasi dan pendampingan real-time, serta peta interaktif ekonomi kreatif Kota Metro."
  },
  {
    judul: "Titik Baca Koleksi Digital/E-book",
    perangkatDaerah: "Dinas Perpustakaan dan Kearsipan Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pengadaan Titik Baca Koleksi Digital (e-book) berbasis QR Code sebagai langkah strategis, murah dan cepat untuk memperluas jangkauan layanan perpustakaan hingga ke ruang-ruang publik, menjawab kebutuhan masyarakat khususnya siswa sekolah akan akses bacaan digital yang mudah dan gratis."
  },
  {
    judul: "Gebyar IKM Kota Metro",
    perangkatDaerah: "Dinas Perindustrian dan Perdagangan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Kegiatan berbentuk eksibisi yang menghadirkan berbagai produk industri kecil dan menengah di Kota Metro. Bertujuan mempromosikan produk IKM kepada masyarakat luas, menjadi wadah temu bisnis, meningkatkan penggunaan produk industri lokal, serta mendorong pertumbuhan ekonomi di Kota Metro."
  },
  {
    judul: "GEBRAK SIAGA (Gerakan Bersama Latihan Kesiapsiagaan Bencana)",
    perangkatDaerah: "Badan Penanggulangan Bencana Daerah",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan pencegahan dan kesiapan aparat serta masyarakat dalam penanggulangan bencana Daerah Kota Metro melalui gerakan bersama latihan kesiapsiagaan secara rutin dan terstruktur."
  },
  {
    judul: "PEKA SEKELIK PBJ (Peningkatan Kapasitas Seputar kegiatan dan Klinik Pengadaan Barang/Jasa)",
    perangkatDaerah: "Sekretariat Daerah – Bagian Pengadaan Barang dan Jasa",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi digital untuk mengoptimalkan monitoring dan pengelolaan PBJ dengan dua fitur utama: pemantauan Sisa Kemampuan Paket (SKP) penyedia untuk pengendalian paket pekerjaan konstruksi, dan fitur konsultasi pengadaan sebagai sarana komunikasi digital interaktif antara OPD dengan Bagian Pengadaan Barang dan Jasa."
  },
  {
    judul: "RAKOR CERDAS (Rapat Koordinasi Digital, Cepat, Efektif, Responsif, Transparan dan Terukur)",
    perangkatDaerah: "Sekretariat Daerah – Bagian Pemerintahan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi rapat koordinasi berbasis digital yang mewujudkan pelaksanaan rapat yang cepat, efektif, responsif, transparan, dan terukur di lingkungan Pemerintah Kota Metro."
  },
  {
    judul: "PETRA (Pengajuan dan Tracking Produk Hukum)",
    perangkatDaerah: "Sekretariat Daerah – Bagian Hukum",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem digital untuk pengajuan dan pelacakan (tracking) status produk hukum di lingkungan Pemerintah Kota Metro, meningkatkan transparansi dan efisiensi proses pembentukan produk hukum daerah."
  },
  {
    judul: "IBU SITE (Informasi Bagian Umum Berbasis Website)",
    perangkatDaerah: "Sekretariat Daerah – Bagian Umum",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem informasi berbasis digital (website) yang dirancang untuk mengelola, memantau, dan menyajikan informasi seluruh kegiatan pada Bagian Umum Setda Kota Metro. Mentransformasi proses administrasi dan koordinasi internal yang sebelumnya manual menjadi serba digital, terintegrasi, dan real-time."
  },
  {
    judul: "AMAD (Alih Media Arsip Digital)",
    perangkatDaerah: "Sekretariat Daerah – Bagian Umum",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program pengelolaan kearsipan digital yang diperkuat melalui Perwali No. 21 Tahun 2025 tentang pedoman alih media arsip. Mentransformasi sistem kearsipan konvensional menjadi berbasis digital terpadu di lingkungan Sekretariat Daerah Kota Metro."
  },
  {
    judul: "SI CANTIK (Sahabat Ibu Cakap Literasi Keuangan Syariah)",
    perangkatDaerah: "Sekretariat Daerah – Bagian Perekonomian",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan literasi keuangan syariah bagi ibu-ibu di Kota Metro sebagai sahabat dalam memahami dan mengimplementasikan prinsip-prinsip keuangan syariah dalam kehidupan sehari-hari."
  },
  {
    judul: "PELITA METRO UTARA (Pelayanan Terintegrasi, Cepat, Mudah, Transparan dan ramah)",
    perangkatDaerah: "Kecamatan Metro Utara",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan yang mengintegrasikan pelayanan langsung dengan pemanfaatan teknologi informasi, penyediaan informasi pelayanan, pendampingan masyarakat, pelayanan prioritas bagi kelompok rentan, pelayanan jemput bola, pengelolaan pengaduan, Survei Kepuasan Masyarakat serta monitoring dan evaluasi pelayanan."
  },
  {
    judul: "KALAP (Kantor Lapangan)",
    perangkatDaerah: "Kecamatan Metro Selatan",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Tim monitoring Kecamatan melakukan penjaringan aspirasi masyarakat terkait pelayanan terhadap kelurahan dan kecamatan. Kegiatan dilakukan di kantor kelurahan dengan memberikan informasi, himbauan, sosialisasi serta menampung aspirasi masyarakat."
  },
  {
    judul: "KLIB PBB (Kemudahan Layanan Input Berbayar Pajak Bumi Bangunan)",
    perangkatDaerah: "Kecamatan Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi membantu wajib pajak dalam membayar PBB melalui online aplikasi dan mobile banking. Pihak kecamatan dan kelurahan membantu mensosialisasikan dan memberikan kemudahan layanan pembayaran pajak, dengan tujuan agar wajib pajak taat pajak dan tidak menimbulkan kebocoran anggaran."
  },
  {
    judul: "GERCEP PDN (Gerakan Cepat Pelayanan Dispenssasi Nikah)",
    perangkatDaerah: "Kecamatan Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Pelayanan pembuatan Dispensasi Nikah kepada masyarakat yang dapat diselesaikan dalam waktu singkat (kurang lebih 30 menit) dengan syarat berkas yang dibawa warga/masyarakat sudah lengkap semua."
  },
  {
    judul: "JEMPOL SIMOTI (Jemput Pelayanan Kolaborasi Silaturahmi Metro Timur)",
    perangkatDaerah: "Kecamatan Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan langsung dengan konsep kolaborasi antar OPD dan lembaga kemasyarakatan kelurahan untuk meningkatkan layanan publik administrasi kependudukan, kesehatan, perizinan, pemenuhan stok darah, percepatan PAD sektor PBB-P2, intervensi stunting dan layanan sosial lainnya."
  },
  {
    judul: "SIMDAPLH (Sistem Informasi Data Perencanaan Pembangunan dan Pelestarian Lingkungan Hidup)",
    perangkatDaerah: "Kecamatan Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi menyediakan data untuk membantu proses perencanaan pembangunan agar sesuai kondisi fisik lapangan baik tentang infrastruktur, jalan, drainase, jembatan, dan PJU. Menggunakan partisipasi aparatur dan lembaga kemasyarakatan kelurahan untuk pengumpulan data dan dokumentasi secara digital."
  },
  {
    judul: "DULUR PENTING (Dua Telur untuk Penurunan Stunting)",
    perangkatDaerah: "Kecamatan Metro Barat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Gerakan gotong royong dan kolaborasi lintas stakeholder untuk pemenuhan asupan protein bagi keluarga yang memiliki anak berisiko stunting dan ibu hamil. Mengumpulkan telur secara sukarela dari ASN di Kecamatan Metro Barat dan dibagikan secara berkala pada minggu ke-3 setiap bulannya."
  },
  {
    judul: "Pa K Ce (Pasar Kuliner Ngece)",
    perangkatDaerah: "Kecamatan Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Wadah UMKM masyarakat Kelurahan Yosomulyo untuk mengembangkan usaha kuliner dan meningkatkan perekonomian warga. Diinisiasi sebagai bentuk pemberdayaan dan pengembangan potensi ekonomi masyarakat melalui pasar kuliner yang digerakkan secara gotong royong."
  },
  {
    judul: "EDUMY (Edukasi Mingguan RSUD Jenderal Ahmad Yani)",
    perangkatDaerah: "UPTD. RSUD Ahmad Yani",
    bentuk: "Tata Kelola Pemerintahan Daerah dan Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program edukasi kesehatan dalam format bincang santai (health talk) bersama dokter spesialis, dokter umum, dan tenaga kesehatan. EDUMY Podcast ditayangkan rutin satu kali seminggu melalui kanal YouTube resmi RSUD Jenderal Ahmad Yani Metro, memungkinkan masyarakat mengikuti edukasi kesehatan secara fleksibel."
  },
  {
    judul: "AMBULAN SIAGA (Jemput Sakit Pulang Sehat)",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan transportasi kesehatan yang memberikan layanan cepat untuk penjemputan pasien dalam kondisi darurat maupun pengantaran pasien setelah selesai menjalani perawatan. Bertujuan memberikan pelayanan yang cepat, aman, nyaman, dan mudah diakses oleh masyarakat."
  },
  {
    judul: "Bincang Sehat Sumber Sari Bantul",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi promosi kesehatan melalui diskusi interaktif, penyuluhan, dan wawancara mengenai berbagai topik kesehatan yang dikemas menarik dan dipublikasikan melalui media sosial resmi rumah sakit. Bertujuan meningkatkan literasi kesehatan masyarakat dan memperluas jangkauan informasi kesehatan."
  },
  {
    judul: "Pelayanan Kesehatan terpadu Bahagia",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi kolaboratif antara RSUD Sumbersari Bantul dengan Puskesmas Margorejo yang mengintegrasikan pelayanan kesehatan antara FKTP dan FKRTL. Mempermudah proses rujukan pasien, memangkas waktu tunggu pelayanan, dan memberikan pelayanan yang lebih efektif, efisien, dan berkesinambungan."
  },
  {
    judul: "Ambulance Sehat (Dokter Spesialis Keliling)",
    perangkatDaerah: "UPTD. RSUD Sumbersari Bantul",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan luar gedung yang menghadirkan dokter spesialis secara langsung ke wilayah kecamatan melalui sistem jemput bola. Meningkatkan pemerataan akses pelayanan kesehatan spesialistik dan mendekatkan pelayanan kepada masyarakat."
  },
  {
    judul: "STIMIKOL (Stiker Minum Obat dan Kontrol)",
    perangkatDaerah: "UPTD. Puskesmas Yosomulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi untuk meningkatkan kepatuhan ODGJ dalam minum obat dan kontrol rutin melalui stiker pengingat yang dipasang di rumah pasien. Dipantau oleh keluarga, kader kesehatan jiwa, dan tenaga kesehatan melalui kunjungan dan monitoring berkala untuk mencegah putus obat dan kekambuhan."
  },
  {
    judul: "PENGANTIN (Pengantar obat Rutin)",
    perangkatDaerah: "UPTD. Puskesmas Yosomulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Layanan pengantaran obat rutin bagi ODGJ yang kesulitan mengakses fasilitas kesehatan. Melalui kunjungan rumah, petugas juga memantau kepatuhan minum obat, kondisi pasien, serta memberikan edukasi kepada keluarga untuk meningkatkan akses pelayanan kesehatan jiwa."
  },
  {
    judul: "GAS CEK (Gerakan Aksi Skrining dan Cek Kesehatan)",
    perangkatDaerah: "UPTD. Puskesmas Purwosari",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pelayanan kesehatan jemput bola yang mengintegrasikan CKG, skrining PTM, dan penyakit prioritas langsung di tengah masyarakat (balai RW, pengajian, pasar, sekolah, pondok pesantren). Dilengkapi bonus layanan EKG dan USG skrining sesuai indikasi untuk memudahkan masyarakat memperoleh berbagai pemeriksaan dalam satu kunjungan."
  },
  {
    judul: "GAS JENTIK (Gerakan Aksi Santri Pantau Jentik)",
    perangkatDaerah: "UPTD. Puskesmas Purwosari",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi pemberdayaan santri sebagai kader Jumantik di pondok pesantren untuk mencegah DBD dan penyakit tular vektor. Melalui pelatihan, pemeriksaan jentik, Gerakan 3M Plus, edukasi PHBS, dan pemantauan rutin, santri berperan aktif menjaga lingkungan bebas jentik."
  },
  {
    judul: "MARI PERGI KE PELANGI (Mari Perbaikan Gizi ke Pelayanan Lengkap Gizi)",
    perangkatDaerah: "UPTD. Puskesmas Margorejo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Program gerakan masyarakat dan pelayanan kesehatan terpadu untuk mempercepat penurunan angka masalah gizi (stunting, gizi kurang, dan gizi buruk) pada balita. Pelangi merupakan akronim dari Pelayanan Lengkap Gizi, mencerminkan pendekatan komprehensif dari hulu ke hilir dalam menangani kasus malnutrisi anak."
  },
  {
    judul: "KEMUDI (Kader Edukasi Melalui Teknologi Digital)",
    perangkatDaerah: "UPTD. Puskesmas Tejoagung",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi meningkatkan kapasitas kader kesehatan dalam menyampaikan edukasi melalui pemanfaatan teknologi digital. Kader mendapatkan pelatihan pembuatan materi edukasi, desain dan editing sederhana, pemanfaatan media sosial dan WhatsApp, serta penggunaan AI sebagai alat bantu menyusun konten edukasi kesehatan."
  },
  {
    judul: "CERDAS PTM (Cek Rutin, Deteksi Dini, Atasi dan Sehatkan Penyakit Tidak Menular)",
    perangkatDaerah: "UPTD. Puskesmas Iringmulyo",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi mendekatkan pelayanan promotif dan preventif kepada masyarakat melalui pemeriksaan rutin, deteksi dini, edukasi, tindak lanjut, serta pemantauan faktor risiko PTM secara berkesinambungan di RT/RW, perkantoran, pusat perbelanjaan, sekolah hingga universitas."
  },
  {
    judul: "GEMA DUET TB Serius Terpadu (Gerakan Bersama Dukung Eliminasi TB Satu Hari Satu Suspek Terpadu)",
    perangkatDaerah: "UPTD. Puskesmas Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi meningkatkan cakupan penemuan suspek TB sehingga penemuan kasus TBC meningkat dan dapat diobati sampai sembuh. Bekerjasama dengan kader, lintas program dan lintas sektoral untuk memperluas jangkauan dan mempercepat eliminasi TBC tahun 2030."
  },
  {
    judul: "MACAN SETIA (Remaja Cantik Sehat Tanpa Anemia)",
    perangkatDaerah: "UPTD. Puskesmas Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi menumbuhkan kesadaran remaja putri akan pentingnya mencegah anemia dan mewujudkan remaja putri yang sehat, cerdas, bebas anemia, produktif dan siap menjadi calon ibu yang sehat guna menurunkan angka stunting Kota Metro."
  },
  {
    judul: "PETASAN BANTING (Pemantauan dan Pengentasan Balita Stunting)",
    perangkatDaerah: "UPTD. Puskesmas Mulyojati",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi kunjungan lapangan kepada seluruh balita untuk pemantauan, memastikan pertumbuhan dan perkembangan secara optimal. Memperkuat keterlibatan lintas program dan lintas sektor dalam upaya pencegahan stunting."
  },
  {
    judul: "BUNDA MANIS (Bersama Untuk Peduli, Lakukan Pemeriksaan IVA dan SADANIS)",
    perangkatDaerah: "UPTD. Puskesmas Banjarsari",
    bentuk: "Pelayanan Publik",
    waktu: "2026",
    ringkasan: "Inovasi meningkatkan kesadaran dan cakupan deteksi dini kanker leher rahim serta kanker payudara pada perempuan usia 30–50 tahun melalui edukasi, ajakan pemeriksaan, pelayanan IVA dan SADANIS secara berkala, serta pendampingan oleh tenaga kesehatan bersama kader kesehatan."
  },
  {
    judul: "PENDEKAR MIKAT (Pendidikan Karaketer Melalui Minat dan Bakat)",
    perangkatDaerah: "SD Aisyah Metro",
    bentuk: "Inovasi Daerah Lainnya",
    waktu: "2026",
    ringkasan: "Inovasi yang dilakukan SD Aisyiyah Metro dengan mengambil kegiatan yang sangat digemari siswa, yaitu minat dan bakat siswa itu sendiri, sebagai wahana pendidikan karakter yang menyenangkan dan bermakna."
  },
  {
    judul: "BINAR KENTARA (Bina keterampilan dan Kecakapan Anak untuk Kemandirian dan karya Nyata)",
    perangkatDaerah: "SD Muhammadiyah Buya Hamka",
    bentuk: "Inovasi Daerah Lainnya",
    waktu: "2026",
    ringkasan: "Inovasi cara sekolah memastikan life skill benar-benar menjadi kompetensi anak. Bina Keterampilan dan Kecakapan Anak Untuk Kemandirian dan Karya Nyata, memastikan siswa memiliki kemampuan praktis yang dapat diterapkan dalam kehidupan sehari-hari."
  },
  {
    judul: "SI TAQWA",
    perangkatDaerah: "SDIT Annawawi Metro",
    bentuk: "Inovasi Daerah Lainnya",
    waktu: "2026",
    ringkasan: "Digitalisasi setoran hafalan real-time dan transparansi laporan harian ke orang tua via WhatsApp otomatis/melalui website SDIT ANNAWAWI, memudahkan pemantauan perkembangan hafalan Al-Quran siswa oleh orang tua."
  },
  {
    judul: "Pramuka Bergerak, Sekolah Berdampak",
    perangkatDaerah: "UPTD SD Negeri 1 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Pramuka sebagai motor penggerak kegiatan di sekolah. Inovasi ini menjadikan kegiatan kepramukaan sebagai basis pengembangan karakter, kepemimpinan, dan kemandirian siswa yang berdampak positif bagi seluruh ekosistem sekolah."
  },
  {
    judul: "SI PANDU HATI (Sistem Pendampingan dan Asesmen Terpadu Inklusi Berbasis Humanis, Aktif, Tepat dan Inovatif)",
    perangkatDaerah: "UPTD SD Negeri 2 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem layanan pendampingan psikososial yang mengintegrasikan guru BK, Guru Pembimbing Khusus, dan komunitas orang tua. Memberikan pendampingan dan asesmen terpadu bagi siswa inklusi secara humanis, aktif, tepat, dan inovatif."
  },
  {
    judul: "SMART BERKARAKTER (Sekolah maju dengan Aktifitas dan Transformatif Berbasis Karakter)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Upaya UPTD SDN 6 Metro Timur untuk meningkatkan kualitas pembelajaran siswa tidak hanya berprestasi di bidang akademik tapi juga non-akademik, terutama dalam pembentukan karakter dengan meningkatkan budaya positif dan pembiasaan yang baik."
  },
  {
    judul: "SEBALUNG (Sehari Berbahasa Lampung)",
    perangkatDaerah: "UPTD SD Negeri 4 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Program pembiasaan Sehari Berbahasa Lampung untuk melestarikan bahasa dan budaya Lampung di lingkungan sekolah dasar, menumbuhkan rasa cinta terhadap budaya lokal pada siswa sejak dini."
  },
  {
    judul: "PROLASIA (Program Layanan Literasi dan Numerasi serta Agama)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program Layanan Literasi dan Numerasi serta Agama di Sekolah Dasar merupakan investasi jangka panjang untuk masa depan bangsa, mengintegrasikan penguatan kemampuan literasi, numerasi, dan pendidikan agama secara terpadu."
  },
  {
    judul: "PKN (Perpustakaan Kami Nyaman)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi yang berfokus pada menciptakan pengalaman yang positif bagi pengunjung perpustakaan sekolah, sehingga siswa merasa nyaman dan termotivasi untuk gemar membaca."
  },
  {
    judul: "KREASI (Kreatif, Ramah Lingkungan, Edukatif, Asri, Sehat, dan Inspiratif)",
    perangkatDaerah: "UPTD SD Negeri 7 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Gerakan inovasi sekolah yang mengajak seluruh warga sekolah untuk mengolah sampah menjadi sesuatu yang bermanfaat, mewujudkan lingkungan sekolah yang kreatif, ramah lingkungan, edukatif, asri, sehat, dan inspiratif."
  },
  {
    judul: "JUR-LINK (Jurnal Online Via Link)",
    perangkatDaerah: "UPTD SD Negeri 9 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Transformasi Pengisian Catatan Mengajar Harian Guru Berbasis Tautan Web Terintegrasi, memudahkan guru dalam mendokumentasikan kegiatan pembelajaran secara digital dan efisien."
  },
  {
    judul: "TISAKU (Tiket Sampahku)",
    perangkatDaerah: "UPTD SD Negeri 11 Metro Pusat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi bertujuan untuk mengurangi volume sampah nonorganik di lingkungan sekolah melalui sistem tiket sampah yang mendorong siswa untuk aktif memilah dan mendaur ulang sampah."
  },
  {
    judul: "DEBAR BERSINAR (Digital, Edukatif, Berbudaya, religious, Bersih, Inovatif, ramah Anak)",
    perangkatDaerah: "UPTD SD Negeri 8 Metro Barat",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Pembelajaran digital yang kreatif, inovatif, berbudaya sebagai sumber belajar yang menyenangkan, mengintegrasikan nilai-nilai digital, edukatif, berbudaya, religius, bersih, inovatif, dan ramah anak."
  },
  {
    judul: "SARI BELANG (Sai Hari Berbudaya Lampung)",
    perangkatDaerah: "UPTD SD Negeri 4 Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi pembiasaan mengenal dan memahami budaya Lampung di lingkungan SDN 4 Metro Selatan yang dilakukan di hari Senin, sebagai upaya pelestarian budaya dan bahasa Lampung di kalangan siswa."
  },
  {
    judul: "BERHIAS (Bersih, Hijau, Sehat)",
    perangkatDaerah: "UPTD SD Negeri 6 Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program perencanaan, pelaksanaan, dan evaluasi pemanfaatan lahan kosong di lingkungan sekolah untuk menciptakan lingkungan yang bersih, hijau, dan sehat."
  },
  {
    judul: "GELAS ANTIK (Gerakan Literasi Sekolah Antusias Intelektual dan Kreatif)",
    perangkatDaerah: "UPTD SD Negeri 8 Metro Selatan",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Gerakan Literasi Sekolah yang mendorong siswa untuk antusias, intelektual, dan kreatif dalam kegiatan membaca dan menulis di lingkungan sekolah."
  },
  {
    judul: "SATU PERSONAL (Sabtu Permainan Tradisional)",
    perangkatDaerah: "UPTD SD Negeri 9 Metro Timur",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Program kegiatan permainan dan olahraga berbasis budaya kearifan lokal yang dilaksanakan setiap hari Sabtu, melestarikan permainan tradisional dan mempererat hubungan sosial antar siswa."
  },
  {
    judul: "SMART-MU (Sistem Manajemen Akurat, Responsif dan Terpadu)",
    perangkatDaerah: "UPTD SD Negeri 2 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Digitalisasi Pengelolaan Sekolah Berbasis Aplikasi meliputi layanan surat, pengaduan, pengumuman sekolah, penilaian, dan absensi. Mewujudkan sistem manajemen sekolah yang akurat, responsif, dan terpadu."
  },
  {
    judul: "SELASIH (Selasa Berliterasi Hebat)",
    perangkatDaerah: "UPTD SD Negeri 3 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program pembiasaan literasi hebat yang dilaksanakan setiap hari Selasa, mendorong siswa untuk aktif membaca dan mengembangkan kemampuan literasi secara konsisten dan menyenangkan."
  },
  {
    judul: "SEMAR (Sistem Edukasi Model Aktivitas dan Pembiasaan Rutin)",
    perangkatDaerah: "UPTD SD Negeri 4 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Sistem edukasi berbasis model aktivitas dan pembiasaan rutin untuk membentuk karakter dan disiplin siswa melalui kegiatan-kegiatan terstruktur yang dilaksanakan secara konsisten setiap hari."
  },
  {
    judul: "MANTAB (Manasik Haji dan edukasi Tentang Amal Berkurban)",
    perangkatDaerah: "UPTD SD Negeri 5 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Inovasi pembelajaran keagamaan yang dilaksanakan setiap bulan Dzulhijah, mengintegrasikan praktik manasik haji dan edukasi tentang amal berkurban untuk menanamkan pemahaman keagamaan yang mendalam pada siswa sejak dini."
  },
  {
    judul: "SIBUNI (Literasi Budaya dan Seni)",
    perangkatDaerah: "UPTD SD Negeri 7 Metro Utara",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Gerakan untuk mengedukasi peserta didik serta seluruh warga sekolah agar dapat mengenal, memahami, dan melestarikan budaya dan seni daerah melalui program literasi budaya dan seni yang terstruktur."
  },
  {
    judul: "BINTANG BBQ (Bina Karakter dan tanggung Jawab melalui Bina Baca Al-Quran)",
    perangkatDaerah: "UPTD SMP Negeri 1 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Kegiatan Bina Baca Al-Qur'an bertujuan meningkatkan kemampuan literasi Al-Qur'an peserta didik sekaligus membangun karakter dan budaya sekolah yang religius melalui pembiasaan membaca, mempelajari, menghayati, dan mengamalkan nilai-nilai Al-Qur'an dalam kehidupan sehari-hari."
  },
  {
    judul: "E-SAPA SPANDA (Elektronik Saran, Aspirasi, dan Pengaduan SMPN 2/Spanda)",
    perangkatDaerah: "UPTD SMP Negeri 2 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Mengintegrasikan berbagai layanan sekolah secara efektif, transparan, responsif, dan mudah diakses. Mencakup administrasi guru, laporan hasil belajar murid, media pembelajaran, kehadiran, penyampaian saran, aspirasi, dan pengaduan, serta layanan publik sekolah lainnya."
  },
  {
    judul: "PANTER MASEHI (Pemanfaatan Aplikasi Nutriedu Terhadap Pola Makan Sehat Dan Bergizi)",
    perangkatDaerah: "UPTD SMP Negeri 2 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2025",
    ringkasan: "Pemanfaatan Aplikasi Nutriedu terhadap pola makan sehat dan bergizi, membantu siswa dalam memahami dan menerapkan pola makan yang sehat melalui teknologi digital."
  },
  {
    judul: "GEMA SUCI (Generasi Muda Menghapal dan Mengamalkan Kitab Suci)",
    perangkatDaerah: "UPTD SMP Negeri 4 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Generasi Muda Menghafal dan Mengamalkan Kitab Suci, mendorong siswa untuk tidak hanya menghafal tetapi juga mengamalkan nilai-nilai Al-Qur'an dalam kehidupan sehari-hari."
  },
  {
    judul: "PELITA QURANI (Pembiasaan Literasi Al-Quran untuk Generasi Berkarakter)",
    perangkatDaerah: "UPTD SMP Negeri 6 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Kegiatan pembiasaan Literasi Al-Qur'an untuk Generasi Berkarakter yang dilaksanakan setiap hari Rabu, membentuk generasi muda yang berkarakter, berakhlak mulia, dan cinta Al-Qur'an."
  },
  {
    judul: "SIGARAN ATI (Aplikasi Kebugaran Sehat Anak Indonesia)",
    perangkatDaerah: "UPTD SMP Negeri 7 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Inovasi yang dirancang untuk menjawab masalah rendahnya kebugaran jasmani siswa melalui pendekatan edutech-gamification yang terukur, menggabungkan teknologi pendidikan dengan elemen permainan untuk meningkatkan motivasi siswa dalam berolahraga."
  },
  {
    judul: "KELINTANG MAS (Kelas Literasi Narasi Tari dan Drama Bahasa Lampung Media Apresiasi Siswa)",
    perangkatDaerah: "UPTD SMP Negeri 7 Metro",
    bentuk: "Tata Kelola Pemerintahan Daerah",
    waktu: "2026",
    ringkasan: "Program pembelajaran kreatif yang menggabungkan literasi, narasi, tari dan drama berbahasa Lampung sebagai media apresiasi seni bagi siswa, melestarikan budaya Lampung melalui pendekatan seni pertunjukan yang menyenangkan."
  }
];
