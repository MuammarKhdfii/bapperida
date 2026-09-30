-- ══════════════════════════════════════════════════════════════════
--  DATA AWAL SISTEM PENILAIAN INOVASI DAERAH KOTA METRO 2027
-- ══════════════════════════════════════════════════════════════════
-- File ini berisi data master dan data awal untuk sistem
-- ══════════════════════════════════════════════════════════════════

USE db_inovasi_daerah;

-- ══════════════════════════════════════════════════════════════════
-- 1. INSERT USERS (Admin & Juri)
-- ══════════════════════════════════════════════════════════════════
-- Password akan di-hash di aplikasi, untuk demo gunakan plaintext
-- Dalam production, gunakan bcrypt atau algoritma hashing yang aman
-- ══════════════════════════════════════════════════════════════════

INSERT INTO users (username, password, nama, role, label, email) VALUES
-- Super Admin
('admin', 'admin2027', 'Administrator', 'admin', 'Super Admin', 'admin@metro.go.id'),

-- Juri Judul Inovasi
('eva.rolia', 'juri2027', 'Dr. Ir. Eva Rolia, M.T., M.K.M.', 'juri_judul', 'Juri Judul Inovasi', 'eva.rolia@metro.go.id'),
('arif.joko', 'juri2027', 'Ir. Arif Joko Arwoko', 'juri_judul', 'Juri Judul Inovasi', 'arif.joko@metro.go.id'),
('mustafa', 'juri2027', 'Mustafa Akhyar, S.E.', 'juri_judul', 'Juri Judul Inovasi', 'mustafa@metro.go.id'),

-- Juri Penilaian SID
('sowiyah', 'juri2027', 'Prof. Dr. Dra. Sowiyah M.Pd.', 'juri_sid', 'Juri Penilaian SID', 'sowiyah@metro.go.id'),
('etik.puji', 'juri2027', 'Prof. Dr. Ir. Etik Puji Handayani, M.Si.', 'juri_sid', 'Juri Penilaian SID', 'etik.puji@metro.go.id');

-- ══════════════════════════════════════════════════════════════════
-- 2. INSERT KATEGORI OPD
-- ══════════════════════════════════════════════════════════════════

INSERT INTO kategori_opd (kode_kategori, nama_kategori, deskripsi) VALUES
('OPD', 'OPD Utama', 'Organisasi Perangkat Daerah utama tingkat kota'),
('PENDIDIKAN', 'UPTD Pendidikan', 'Unit Pelaksana Teknis Daerah bidang Pendidikan (SD, SMP, dll)'),
('KESEHATAN', 'UPTD Kesehatan', 'Unit Pelaksana Teknis Daerah bidang Kesehatan (Puskesmas, RSUD, dll)');

-- ══════════════════════════════════════════════════════════════════
-- 3. INSERT BENTUK INOVASI
-- ══════════════════════════════════════════════════════════════════

INSERT INTO bentuk_inovasi (kode_bentuk, nama_bentuk, deskripsi) VALUES
('TATA_KELOLA', 'Tata Kelola Pemerintahan Daerah', 'Inovasi dalam tata kelola dan administrasi pemerintahan'),
('LAYANAN_PUBLIK', 'Pelayanan Publik', 'Inovasi dalam pelayanan kepada masyarakat'),
('TATA_KELOLA_LAYANAN', 'Tata Kelola Pemerintahan Daerah dan Pelayanan Publik', 'Inovasi yang mencakup tata kelola dan pelayanan publik');

-- ══════════════════════════════════════════════════════════════════
-- 4. INSERT KRITERIA JUDUL (6 Kriteria)
-- ══════════════════════════════════════════════════════════════════

INSERT INTO kriteria_judul (nomor_kriteria, nama_kriteria, bobot, deskripsi, urutan) VALUES
(1, 'Kebaruan & Orisinalitas', 5, 
 'Sejauh mana inovasi menghadirkan ide/pendekatan baru yang belum pernah diterapkan sebelumnya di lingkungan pemerintah daerah.', 1),

(2, 'Relevansi & Dampak terhadap Pelayanan Publik', 5, 
 'Seberapa signifikan inovasi ini berkontribusi pada peningkatan kualitas layanan publik atau penyelesaian masalah nyata di masyarakat.', 2),

(3, 'Kelayakan & Kemudahan Implementasi', 4, 
 'Tingkat kemudahan pelaksanaan inovasi ditinjau dari ketersediaan sumber daya, regulasi, dan kapasitas OPD pelaksana.', 3),

(4, 'Keberlanjutan', 3, 
 'Potensi inovasi untuk dipertahankan jangka panjang dan direplikasi oleh OPD atau daerah lain.', 4),

(5, 'Kolaborasi & Keterlibatan Pemangku Kepentingan', 2, 
 'Tingkat keterlibatan berbagai pihak (lintas OPD, akademisi, swasta, komunitas, masyarakat) dalam pengembangan dan pelaksanaan inovasi.', 5),

(6, 'Dokumentasi & Kemampuan Presentasi', 2, 
 'Kualitas dokumentasi inovasi (proposal, laporan, bukti pendukung) dan kemampuan OPD dalam mempresentasikan inovasi secara sistematis.', 6);

-- ══════════════════════════════════════════════════════════════════
-- 5. INSERT PARAMETER KRITERIA JUDUL
-- ══════════════════════════════════════════════════════════════════

-- Kriteria 1: Kebaruan & Orisinalitas
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(1, 1, 'Modifikasi kecil dari praktik yang sudah ada, tidak ada perbedaan signifikan', 1),
(1, 2, 'Adaptasi atau pengembangan dari inovasi yang sudah ada dengan beberapa penyesuaian bermakna', 2),
(1, 3, 'Gagasan atau pendekatan yang benar-benar baru, belum pernah diterapkan di instansi manapun', 3);

-- Kriteria 2: Relevansi & Dampak
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(2, 1, 'Dampak terbatas, hanya dirasakan oleh sebagian kecil pengguna internal OPD', 1),
(2, 2, 'Berdampak pada pelayanan publik dengan cakupan menengah, ada bukti peningkatan terukur', 2),
(2, 3, 'Dampak luas dan signifikan, dirasakan langsung oleh masyarakat dengan hasil yang terukur dan terdokumentasi', 3);

-- Kriteria 3: Kelayakan & Kemudahan Implementasi
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(3, 1, 'Membutuhkan sumber daya besar dan regulasi baru, implementasi sulit dilakukan', 1),
(3, 2, 'Dapat diimplementasikan dengan penyesuaian moderat pada sumber daya dan regulasi yang ada', 2),
(3, 3, 'Mudah diimplementasikan, sesuai kapasitas OPD, regulasi sudah mendukung, sumber daya tersedia', 3);

-- Kriteria 4: Keberlanjutan & Skalabilitas
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(4, 1, 'Bergantung pada individu tertentu atau anggaran khusus, sulit direplikasi', 1),
(4, 2, 'Berpotensi berkelanjutan dengan dukungan tertentu, ada peluang replikasi terbatas', 2),
(4, 3, 'Mandiri secara kelembagaan, mudah direplikasi, sudah atau berpotensi diadopsi daerah lain', 3);

-- Kriteria 5: Kolaborasi & Keterlibatan
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(5, 1, 'Dilaksanakan secara internal satu OPD, tidak melibatkan pihak eksternal', 1),
(5, 2, 'Melibatkan 2–3 pemangku kepentingan dari unsur yang berbeda', 2),
(5, 3, 'Melibatkan banyak pemangku kepentingan lintas sektor (minimal 4 unsur) secara aktif dan terstruktur', 3);

-- Kriteria 6: Dokumentasi & Presentasi
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(6, 1, 'Dokumentasi tidak lengkap, presentasi kurang sistematis dan sulit dipahami', 1),
(6, 2, 'Dokumentasi cukup lengkap, presentasi cukup jelas namun masih ada kekurangan', 2),
(6, 3, 'Dokumentasi lengkap dan terstruktur, presentasi sangat jelas, mudah dipahami, didukung data dan bukti konkret', 3);

-- ══════════════════════════════════════════════════════════════════
-- 6. INSERT INDIKATOR SID (No. 16-35, dengan skip No. 1-15)
-- ══════════════════════════════════════════════════════════════════

-- Hanya indikator aktif (No. 16-35, skip No. 1-15 dan 36)
INSERT INTO indikator_sid (nomor_indikator, nomor_tampil, nama_indikator, bobot, tipe_indikator, keterangan, is_skip, urutan) VALUES
(16, 1, 'Infrastruktur Teknologi: Regulasi Inovasi Daerah', 3.0, 'radio', 
 'Regulasi landasan operasional inovasi', FALSE, 1),

(17, 2, 'Infrastruktur Teknologi: Ketersediaan & Peran SDM', 2.0, 'radio', 
 'Jumlah tim pengelola inovasi beserta peran', FALSE, 2),

(18, 3, 'Infrastruktur Teknologi: Dukungan Anggaran', 2.0, 'radio', 
 'Alokasi APBD untuk penerapan inovasi', FALSE, 3),

(19, 4, 'Kecanggihan Produk: Alat Kerja', 2.0, 'radio', 
 'Sarana/alat kerja operasional inovasi', FALSE, 4),

(20, 5, 'Kecanggihan Produk: Bimtek Inovasi', 1.0, 'radio', 
 'Peningkatan kapasitas pelaksana inovasi', FALSE, 5),

(21, 6, 'Kecanggihan Produk: Integrasi Program & Kegiatan Inovasi dalam RKPD', 2.0, 'radio', 
 'Pemuatan program inovasi dalam dokumen perencanaan', FALSE, 6),

(22, 7, 'Output Pengetahuan: Keterlibatan Aktor Inovasi', 1.0, 'radio', 
 'Unsur: akademisi, bisnis, komunitas, pemerintah, media', FALSE, 7),

(23, 8, 'Output Pengetahuan: Pelaksana Inovasi Daerah', 1.0, 'radio', 
 'Tingkatan penetapan tim pelaksana', FALSE, 8),

(24, 9, 'Output Pengetahuan: Jejaring Inovasi', 1.0, 'radio', 
 'Kolaborasi antar perangkat daerah', FALSE, 9),

(25, 10, 'Output Pengetahuan: Sosialisasi Inovasi Daerah', 1.0, 'radio', 
 'Penyebarluasan informasi kebijakan inovasi', FALSE, 10),

(26, 11, 'Kecepatan Bisnis Proses: Pedoman Teknis', 1.0, 'radio', 
 'Standar ketentuan manual penggunaan inovasi', FALSE, 11),

(27, 12, 'Kecepatan Bisnis Proses: Kemudahan Informasi Layanan', 1.0, 'radio', 
 'Metode: manual, hotline, medsos, online/website', FALSE, 12),

(28, 13, 'Kecepatan Bisnis Proses: Kemudahan Proses Inovasi (Kecepatan Layanan)', 2.0, 'radio', 
 'Durasi waktu standar operasional prosedur (SOP)', FALSE, 13),

(29, 14, 'Kecepatan Bisnis Proses: Penyelesaian Layanan Pengaduan', 1.0, 'radio', 
 'Rasio penanganan pengaduan/keluhan layanan', FALSE, 14),

(30, 15, 'Kecanggihan Produk: Layanan Terintegrasi', 2.0, 'radio', 
 'Penerapan prinsip interoperabilitas layanan', FALSE, 15),

(31, 16, 'Kecanggihan Produk: Replikasi Inovasi Daerah', 3.0, 'radio', 
 'Frekuensi adopsi/replikasi oleh pemda lain', FALSE, 16),

(32, 17, 'Kecepatan Bisnis Proses: Kecepatan Penciptaan Inovasi', 2.0, 'radio', 
 'Satuan waktu riset dan pengembangan inovasi', FALSE, 17),

(33, 18, 'Jumlah Inovasi & Hasil Kreatif: Kemanfaatan Inovasi', 3.0, 'radio', 
 'Dari 6 kriteria kemanfaatan, cukup pilih 3 kriteria yang paling relevan (cakupan penerima manfaat, efisiensi unit, atau efisiensi biaya)', FALSE, 18),

(34, 19, 'Jumlah Inovasi & Hasil Kreatif: Monev (Monitoring & Evaluasi)', 0, 'monev', 
 'Unggah atau masukkan data dokumen Monev (Monitoring dan Evaluasi) inovasi daerah', FALSE, 19),

(35, 20, 'Jumlah Inovasi & Hasil Kreatif: Video Inovasi', 0, 'video', 
 'Masukkan link/URL video dokumentasi inovasi daerah (YouTube, Google Drive, dll.)', FALSE, 20);

-- ══════════════════════════════════════════════════════════════════
-- 7. INSERT PARAMETER INDIKATOR SID
-- ══════════════════════════════════════════════════════════════════

-- Indikator 16: Regulasi Inovasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(1, 1, 'SK Kepala Daerah / SK Perangkat Daerah', 1),
(1, 2, 'Peraturan Kepala Daerah (Perkada)', 2),
(1, 3, 'Peraturan Daerah (Perda)', 3);

-- Indikator 17: Ketersediaan SDM
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(2, 1, '1 - 10 SDM', 1),
(2, 2, '11 - 30 SDM', 2),
(2, 3, 'Lebih dari 30 SDM', 3);

-- Indikator 18: Dukungan Anggaran
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(3, 1, 'Anggaran pada 1 tahun anggaran (T-2/T-1/T-0)', 1),
(3, 2, 'Anggaran pada 2 tahun berturut-turut', 2),
(3, 3, 'Anggaran pada 3 tahun (T-2, T-1, T-0)', 3);

-- Indikator 19: Alat Kerja
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(4, 1, 'Manual / non-elektronik', 1),
(4, 2, 'Didukung perangkat elektronik', 2),
(4, 3, 'Sistem informasi online / daring / AI', 3);

-- Indikator 20: Bimtek
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(5, 1, 'Pernah 1 kali bimtek dalam 3 tahun terakhir', 1),
(5, 2, 'Pernah 2 kali bimtek dalam 3 tahun terakhir', 2),
(5, 3, 'Pernah 3 kali atau lebih bimtek dalam 3 tahun terakhir', 3);

-- Indikator 21: Integrasi RKPD
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(6, 1, 'Dalam RKPD T-1 atau T-2', 1),
(6, 2, 'Dalam RKPD T-1 dan T-2', 2),
(6, 3, 'Dalam RKPD T-1, T-2, dan T-0', 3);

-- Indikator 22: Keterlibatan Aktor
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(7, 1, 'Melibatkan 3 Aktor', 1),
(7, 2, 'Melibatkan 4 Aktor', 2),
(7, 3, 'Melibatkan 5 Aktor atau lebih', 3);

-- Indikator 23: Pelaksana Inovasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(8, 1, 'Ada pelaksana tapi tanpa surat penugasan', 1),
(8, 2, 'Ditetapkan dengan Surat Penugasan Perangkat Daerah', 2),
(8, 3, 'Ditetapkan dengan SK/Surat Perintah Kepala Daerah', 3);

-- Indikator 24: Jejaring Inovasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(9, 1, 'Melibatkan 2 Perangkat Daerah', 1),
(9, 2, 'Melibatkan 3 - 4 Perangkat Daerah', 2),
(9, 3, 'Melibatkan 5 Perangkat Daerah atau lebih', 3);

-- Indikator 25: Sosialisasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(10, 1, 'Foto kegiatan berlatar belakang spanduk', 1),
(10, 2, 'Konten media sosial / pemberitaan oleh pemda', 2),
(10, 3, 'Media massa / berita (bukan milik pemda)', 3);

-- Indikator 26: Pedoman Teknis
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(11, 1, 'Buku petunjuk / manual book cetak', 1),
(11, 2, 'Buku manual bentuk elektronik', 2),
(11, 3, 'Buku panduan dapat diakses secara online', 3);

-- Indikator 27: Kemudahan Informasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(12, 1, 'Diperoleh melalui 1 metode', 1),
(12, 2, 'Diperoleh melalui 2 metode', 2),
(12, 3, 'Diperoleh melalui 3 atau lebih metode', 3);

-- Indikator 28: Kecepatan Layanan
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(13, 1, 'Hasil diperoleh dalam 6 hari atau lebih', 1),
(13, 2, 'Hasil diperoleh dalam 2 - 5 hari', 2),
(13, 3, 'Hasil diperoleh dalam 1 hari', 3);

-- Indikator 29: Penyelesaian Pengaduan
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(14, 1, '<= 50% atau tidak ada pengaduan', 1),
(14, 2, '51% s.d. 90%', 2),
(14, 3, '>= 91%', 3);

-- Indikator 30: Layanan Terintegrasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(15, 1, 'Informasi web/sosmed terpisah / independen', 1),
(15, 2, 'Terintegrasi dalam satu portal unit organisasi', 2),
(15, 3, 'Terintegrasi lintas unit organisasi / superApps', 3);

-- Indikator 31: Replikasi
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(16, 1, 'Pernah 1 kali direplikasi daerah lain', 1),
(16, 2, 'Pernah 2 kali direplikasi daerah lain berbeda', 2),
(16, 3, 'Pernah 3 kali direplikasi daerah lain berbeda', 3);

-- Indikator 32: Kecepatan Penciptaan
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(17, 1, 'Diciptakan dalam waktu 9 bulan atau lebih', 1),
(17, 2, 'Diciptakan dalam waktu 5 - 8 bulan', 2),
(17, 3, 'Diciptakan dalam waktu 1 - 4 bulan', 3);

-- Indikator 33: Kemanfaatan
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(18, 1, 'Cakupan 1-200 orang / unit 5-20% / efisiensi 0.01-10%', 1),
(18, 2, 'Cakupan 201-500 orang / unit 20-50% / efisiensi 10.01-20%', 2),
(18, 3, 'Cakupan >=501 orang / unit >50% / efisiensi >20%', 3);

-- ══════════════════════════════════════════════════════════════════
-- 8. INSERT PENGATURAN SISTEM
-- ══════════════════════════════════════════════════════════════════

INSERT INTO pengaturan_sistem (kunci, nilai, tipe_data, deskripsi) VALUES
('nama_sistem', 'Sistem Penilaian Inovasi Daerah 2027', 'string', 'Nama sistem'),
('tahun_aktif', '2027', 'string', 'Tahun penilaian aktif'),
('batas_penilaian', '2027-12-31', 'string', 'Batas waktu penilaian'),
('max_skor_judul', '63', 'integer', 'Maksimal skor penilaian judul'),
('jumlah_juri_judul', '3', 'integer', 'Jumlah juri penilaian judul'),
('jumlah_juri_sid', '3', 'integer', 'Jumlah juri penilaian SID'),
('mode_penilaian', 'aktif', 'string', 'Status mode penilaian (aktif/nonaktif)');

-- ══════════════════════════════════════════════════════════════════
-- END OF SEED DATA
-- ══════════════════════════════════════════════════════════════════
