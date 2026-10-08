-- ══════════════════════════════════════════════════════════════════════════════
--  DATABASE SISTEM PENILAIAN INOVASI DAERAH KOTA METRO 2027 - FILE LENGKAP
--  BAPPERIDA (Badan Perencanaan, Penelitian dan Pengembangan Daerah)
-- ══════════════════════════════════════════════════════════════════════════════
--  File ini berisi:
--  1. CREATE DATABASE & TABLES (18 tabel)
--  2. SEED DATA (Users, Master Data, Kriteria, Indikator)
--  3. DATA INOVASI (95+ inovasi dari semua OPD)
--  4. STORED PROCEDURES & TRIGGERS
--  5. VIEWS
-- ══════════════════════════════════════════════════════════════════════════════
--  Cara Install:
--  mysql -u root -p < database_complete.sql
-- ══════════════════════════════════════════════════════════════════════════════

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 1: PERSIAPAN DATABASE
-- ══════════════════════════════════════════════════════════════════════════════

-- Drop database jika sudah ada (untuk fresh installation)
DROP DATABASE IF EXISTS db_inovasi_daerah;

-- Buat database baru
CREATE DATABASE db_inovasi_daerah 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE db_inovasi_daerah;

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 2: CREATE TABLES (18 TABEL)
-- ══════════════════════════════════════════════════════════════════════════════

-- TABEL 1: USERS
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama VARCHAR(150) NOT NULL,
    role ENUM('admin', 'juri_judul', 'juri_sid') NOT NULL,
    label VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    no_telepon VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 2: KATEGORI_OPD
CREATE TABLE kategori_opd (
    kategori_id INT AUTO_INCREMENT PRIMARY KEY,
    kode_kategori VARCHAR(20) NOT NULL UNIQUE,
    nama_kategori VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 3: PERANGKAT_DAERAH
CREATE TABLE perangkat_daerah (
    opd_id INT AUTO_INCREMENT PRIMARY KEY,
    kategori_id INT NOT NULL,
    kode_opd VARCHAR(20) NOT NULL UNIQUE,
    nama_opd VARCHAR(200) NOT NULL,
    singkatan VARCHAR(50),
    alamat TEXT,
    telepon VARCHAR(20),
    email VARCHAR(100),
    kepala_opd VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategori_opd(kategori_id) ON DELETE RESTRICT,
    INDEX idx_kode_opd (kode_opd),
    INDEX idx_kategori (kategori_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 4: BENTUK_INOVASI
CREATE TABLE bentuk_inovasi (
    bentuk_id INT AUTO_INCREMENT PRIMARY KEY,
    kode_bentuk VARCHAR(20) NOT NULL UNIQUE,
    nama_bentuk VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 5: INOVASI
CREATE TABLE inovasi (
    inovasi_id INT AUTO_INCREMENT PRIMARY KEY,
    opd_id INT NOT NULL,
    bentuk_id INT NOT NULL,
    judul_inovasi VARCHAR(500) NOT NULL,
    ringkasan TEXT NOT NULL,
    latar_belakang TEXT,
    tujuan TEXT,
    manfaat TEXT,
    tahun_implementasi YEAR NOT NULL,
    status_inovasi ENUM('draft', 'diajukan', 'dalam_penilaian', 'selesai', 'ditolak') DEFAULT 'draft',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (opd_id) REFERENCES perangkat_daerah(opd_id) ON DELETE RESTRICT,
    FOREIGN KEY (bentuk_id) REFERENCES bentuk_inovasi(bentuk_id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_judul (judul_inovasi(255)),
    INDEX idx_tahun (tahun_implementasi),
    INDEX idx_status (status_inovasi),
    INDEX idx_opd (opd_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 6: KRITERIA_JUDUL
CREATE TABLE kriteria_judul (
    kriteria_id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_kriteria INT NOT NULL,
    nama_kriteria VARCHAR(200) NOT NULL,
    bobot DECIMAL(3,1) NOT NULL,
    deskripsi TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    urutan INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nomor (nomor_kriteria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 7: PARAMETER_KRITERIA_JUDUL
CREATE TABLE parameter_kriteria_judul (
    parameter_id INT AUTO_INCREMENT PRIMARY KEY,
    kriteria_id INT NOT NULL,
    nilai_parameter TINYINT NOT NULL CHECK (nilai_parameter BETWEEN 1 AND 3),
    deskripsi_parameter TEXT NOT NULL,
    urutan INT NOT NULL,
    FOREIGN KEY (kriteria_id) REFERENCES kriteria_judul(kriteria_id) ON DELETE CASCADE,
    INDEX idx_kriteria (kriteria_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 8: INDIKATOR_SID
CREATE TABLE indikator_sid (
    indikator_id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_indikator INT NOT NULL,
    nomor_tampil INT NOT NULL,
    nama_indikator VARCHAR(300) NOT NULL,
    bobot DECIMAL(3,1) NOT NULL,
    tipe_indikator ENUM('radio', 'monev', 'video') DEFAULT 'radio',
    keterangan TEXT,
    is_skip BOOLEAN DEFAULT FALSE,
    skip_reason TEXT,
    is_special BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    urutan INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nomor (nomor_indikator),
    INDEX idx_tipe (tipe_indikator)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 9: PARAMETER_INDIKATOR_SID
CREATE TABLE parameter_indikator_sid (
    parameter_id INT AUTO_INCREMENT PRIMARY KEY,
    indikator_id INT NOT NULL,
    nilai_parameter TINYINT NOT NULL CHECK (nilai_parameter BETWEEN 1 AND 3),
    deskripsi_parameter TEXT NOT NULL,
    urutan INT NOT NULL,
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id) ON DELETE CASCADE,
    INDEX idx_indikator (indikator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 10: PENILAIAN_JUDUL
CREATE TABLE penilaian_judul (
    penilaian_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    kriteria_id INT NOT NULL,
    nilai_dipilih TINYINT NOT NULL CHECK (nilai_dipilih BETWEEN 1 AND 3),
    skor DECIMAL(5,2) NOT NULL,
    catatan TEXT,
    status_penilaian ENUM('draft', 'final') DEFAULT 'draft',
    dinilai_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    FOREIGN KEY (juri_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (kriteria_id) REFERENCES kriteria_judul(kriteria_id) ON DELETE CASCADE,
    UNIQUE KEY unique_penilaian (inovasi_id, juri_id, kriteria_id),
    INDEX idx_inovasi (inovasi_id),
    INDEX idx_juri (juri_id),
    INDEX idx_status (status_penilaian)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 11: PENILAIAN_INDIKATOR
CREATE TABLE penilaian_indikator (
    penilaian_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    indikator_id INT NOT NULL,
    nilai_dipilih TINYINT NULL CHECK (nilai_dipilih BETWEEN 1 AND 3),
    skor DECIMAL(5,2) NULL,
    catatan TEXT,
    status_penilaian ENUM('draft', 'final') DEFAULT 'draft',
    dinilai_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    FOREIGN KEY (juri_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id) ON DELETE CASCADE,
    UNIQUE KEY unique_penilaian (inovasi_id, juri_id, indikator_id),
    INDEX idx_inovasi (inovasi_id),
    INDEX idx_juri (juri_id),
    INDEX idx_status (status_penilaian)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 12: PENILAIAN_MONEV
CREATE TABLE penilaian_monev (
    monev_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    indikator_id INT NOT NULL,
    jumlah_dokumen INT DEFAULT 0,
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    FOREIGN KEY (juri_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id) ON DELETE CASCADE,
    UNIQUE KEY unique_monev (inovasi_id, juri_id, indikator_id),
    INDEX idx_inovasi (inovasi_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 13: PENILAIAN_VIDEO
CREATE TABLE penilaian_video (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    indikator_id INT NOT NULL,
    url_video VARCHAR(500),
    judul_video VARCHAR(300),
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    FOREIGN KEY (juri_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id) ON DELETE CASCADE,
    UNIQUE KEY unique_video (inovasi_id, juri_id, indikator_id),
    INDEX idx_inovasi (inovasi_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 14: REKAP_PENILAIAN
CREATE TABLE rekap_penilaian (
    rekap_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    skor_judul DECIMAL(6,2) DEFAULT 0,
    skor_indikator DECIMAL(6,2) DEFAULT 0,
    skor_total DECIMAL(7,2) DEFAULT 0,
    persentase_lengkap DECIMAL(5,2) DEFAULT 0,
    jumlah_kriteria_dinilai INT DEFAULT 0,
    jumlah_indikator_dinilai INT DEFAULT 0,
    status_lengkap ENUM('belum', 'sebagian', 'lengkap') DEFAULT 'belum',
    terakhir_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    FOREIGN KEY (juri_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_rekap (inovasi_id, juri_id),
    INDEX idx_inovasi (inovasi_id),
    INDEX idx_juri (juri_id),
    INDEX idx_status (status_lengkap)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 15: RANKING_INOVASI
CREATE TABLE ranking_inovasi (
    ranking_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    rata_rata_judul DECIMAL(6,2) DEFAULT 0,
    rata_rata_indikator DECIMAL(6,2) DEFAULT 0,
    rata_rata_total DECIMAL(7,2) DEFAULT 0,
    peringkat INT,
    jumlah_juri_judul INT DEFAULT 0,
    jumlah_juri_indikator INT DEFAULT 0,
    status_penilaian ENUM('belum', 'sebagian', 'lengkap') DEFAULT 'belum',
    terakhir_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    UNIQUE KEY unique_ranking (inovasi_id),
    INDEX idx_peringkat (peringkat),
    INDEX idx_total (rata_rata_total DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 16: LOG_AKTIVITAS
CREATE TABLE log_aktivitas (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    aktivitas VARCHAR(100) NOT NULL,
    modul VARCHAR(50) NOT NULL,
    deskripsi TEXT,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_waktu (created_at),
    INDEX idx_modul (modul)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 17: PENGATURAN_SISTEM
CREATE TABLE pengaturan_sistem (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    kunci VARCHAR(100) NOT NULL UNIQUE,
    nilai TEXT,
    tipe_data ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
    deskripsi TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_kunci (kunci)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABEL 18: DOKUMEN_PENDUKUNG
CREATE TABLE dokumen_pendukung (
    dokumen_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    jenis_dokumen VARCHAR(100) NOT NULL,
    nama_file VARCHAR(255) NOT NULL,
    path_file VARCHAR(500) NOT NULL,
    ukuran_file BIGINT,
    mime_type VARCHAR(100),
    deskripsi TEXT,
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_inovasi (inovasi_id),
    INDEX idx_jenis (jenis_dokumen)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 3: INSERT SEED DATA
-- ══════════════════════════════════════════════════════════════════════════════

-- INSERT USERS
INSERT INTO users (username, password, nama, role, label, email) VALUES
('admin', 'admin2027', 'Administrator', 'admin', 'Super Admin', 'admin@metro.go.id'),
('eva.rolia', 'juri2027', 'Dr. Ir. Eva Rolia, M.T., M.K.M.', 'juri_judul', 'Juri Judul Inovasi', 'eva.rolia@metro.go.id'),
('arif.joko', 'juri2027', 'Ir. Arif Joko Arwoko', 'juri_judul', 'Juri Judul Inovasi', 'arif.joko@metro.go.id'),
('mustafa', 'juri2027', 'Mustafa Akhyar, S.E.', 'juri_judul', 'Juri Judul Inovasi', 'mustafa@metro.go.id'),
('sowiyah', 'juri2027', 'Prof. Dr. Dra. Sowiyah M.Pd.', 'juri_sid', 'Juri Penilaian SID', 'sowiyah@metro.go.id'),
('etik.puji', 'juri2027', 'Prof. Dr. Ir. Etik Puji Handayani, M.Si.', 'juri_sid', 'Juri Penilaian SID', 'etik.puji@metro.go.id');

-- INSERT KATEGORI_OPD
INSERT INTO kategori_opd (kode_kategori, nama_kategori, deskripsi) VALUES
('OPD', 'OPD Utama', 'Organisasi Perangkat Daerah utama tingkat kota'),
('PENDIDIKAN', 'UPTD Pendidikan', 'Unit Pelaksana Teknis Daerah bidang Pendidikan (SD, SMP, dll)'),
('KESEHATAN', 'UPTD Kesehatan', 'Unit Pelaksana Teknis Daerah bidang Kesehatan (Puskesmas, RSUD, dll)');

-- INSERT BENTUK_INOVASI
INSERT INTO bentuk_inovasi (kode_bentuk, nama_bentuk, deskripsi) VALUES
('TATA_KELOLA', 'Tata Kelola Pemerintahan Daerah', 'Inovasi dalam tata kelola dan administrasi pemerintahan'),
('LAYANAN_PUBLIK', 'Pelayanan Publik', 'Inovasi dalam pelayanan kepada masyarakat'),
('TATA_KELOLA_LAYANAN', 'Tata Kelola Pemerintahan Daerah dan Pelayanan Publik', 'Inovasi yang mencakup tata kelola dan pelayanan publik');

-- INSERT PERANGKAT_DAERAH (50+ OPD)
INSERT INTO perangkat_daerah (kategori_id, kode_opd, nama_opd, singkatan) VALUES
(1, 'OPD001', 'Inspektorat Daerah', 'Inspektorat'),
(1, 'OPD002', 'Badan Perencanaan Pembangunan Daerah, Riset dan Inovasi Daerah', 'BAPPERIDA'),
(1, 'OPD003', 'Badan Keuangan dan Aset Daerah', 'BKAD'),
(1, 'OPD004', 'Badan Pendapatan Daerah', 'BAPENDA'),
(1, 'OPD005', 'Badan Kepegawaian dan Pengembangan Sumber Daya Manusia', 'BKPSDM'),
(1, 'OPD006', 'Badan Kesatuan Bangsa dan Politik', 'BAKESBANGPOL'),
(1, 'OPD007', 'Sekretariat DPRD', 'SETWAN'),
(1, 'OPD008', 'Dinas Pendidikan dan Kebudayaan', 'DISDIKBUD'),
(1, 'OPD009', 'Dinas Kesehatan', 'DINKES'),
(1, 'OPD010', 'Dinas Pekerjaan Umum dan Tata Ruang', 'PUTR'),
(1, 'OPD011', 'Dinas Perumahan dan Kawasan Permukiman', 'DISPERKIMTAN'),
(1, 'OPD012', 'Satuan Polisi Pamong Praja', 'SATPOL PP'),
(1, 'OPD013', 'Dinas Pemadam Kebakaran', 'DAMKAR'),
(1, 'OPD014', 'Dinas Sosial dan Pemberdayaan Masyarakat', 'DINSOS'),
(1, 'OPD015', 'Dinas Pemberdayaan Perempuan, Perlindungan Anak, Pengendalian Penduduk dan Keluarga Berencana', 'DP3AP2KB'),
(1, 'OPD016', 'Dinas Ketahanan Pangan, Pertanian dan Perikanan', 'DKPPP'),
(1, 'OPD017', 'Dinas Lingkungan Hidup', 'DLH'),
(1, 'OPD018', 'Dinas Kependudukan dan Pencatatan Sipil', 'DISDUKCAPIL'),
(1, 'OPD019', 'Dinas Perhubungan', 'DISHUB'),
(1, 'OPD020', 'Dinas Komunikasi, Informatika dan Statistik', 'DISKOMINFOTIK'),
(1, 'OPD021', 'Dinas Koperasi, Usaha kecil dan Menengah, dan Ketenagakerjaan', 'DISKOPUMKER'),
(1, 'OPD022', 'Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu', 'DPMPTSP'),
(1, 'OPD023', 'Dinas Pemuda dan Olahraga, Pariwisata dan Ekonomi Kreatif', 'DISPORAPAREKRAF'),
(1, 'OPD024', 'Dinas Perpustakaan dan Kearsipan Daerah', 'DISPUSIPDA'),
(1, 'OPD025', 'Dinas Perindustrian dan Perdagangan', 'DISPERINDAG'),
(1, 'OPD026', 'Badan Penanggulangan Bencana Daerah', 'BPBD'),
(1, 'OPD027', 'Sekretariat Daerah – Bagian Pengadaan Barang dan Jasa', 'SETDA-PBJ'),
(1, 'OPD028', 'Sekretariat Daerah – Bagian Pemerintahan', 'SETDA-PEMDA'),
(1, 'OPD029', 'Sekretariat Daerah – Bagian Hukum', 'SETDA-HUKUM'),
(1, 'OPD030', 'Sekretariat Daerah – Bagian Umum', 'SETDA-UMUM'),
(1, 'OPD031', 'Sekretariat Daerah – Bagian Perekonomian', 'SETDA-PEREKONOMIAN'),
(1, 'OPD032', 'Kecamatan Metro Utara', 'KEC-MU'),
(1, 'OPD033', 'Kecamatan Metro Selatan', 'KEC-MS');

-- INSERT KRITERIA_JUDUL (6 Kriteria)
INSERT INTO kriteria_judul (nomor_kriteria, nama_kriteria, bobot, deskripsi, urutan) VALUES
(1, 'Kebaruan & Orisinalitas', 5, 'Sejauh mana inovasi menghadirkan ide/pendekatan baru yang belum pernah diterapkan sebelumnya di lingkungan pemerintah daerah.', 1),
(2, 'Relevansi & Dampak terhadap Pelayanan Publik', 5, 'Seberapa signifikan inovasi ini berkontribusi pada peningkatan kualitas layanan publik atau penyelesaian masalah nyata di masyarakat.', 2),
(3, 'Kelayakan & Kemudahan Implementasi', 4, 'Tingkat kemudahan pelaksanaan inovasi ditinjau dari ketersediaan sumber daya, regulasi, dan kapasitas OPD pelaksana.', 3),
(4, 'Keberlanjutan &', 3, 'Potensi inovasi untuk dipertahankan jangka panjang dan direplikasi oleh OPD atau daerah lain.', 4),
(5, 'Kolaborasi & Keterlibatan Pemangku Kepentingan', 2, 'Tingkat keterlibatan berbagai pihak (lintas OPD, akademisi, swasta, komunitas, masyarakat) dalam pengembangan dan pelaksanaan inovasi.', 5),
(6, 'Dokumentasi & Kemampuan Presentasi', 2, 'Kualitas dokumentasi inovasi (proposal, laporan, bukti pendukung) dan kemampuan OPD dalam mempresentasikan inovasi secara sistematis.', 6);

-- INSERT PARAMETER_KRITERIA_JUDUL
INSERT INTO parameter_kriteria_judul (kriteria_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(1, 1, 'Modifikasi kecil dari praktik yang sudah ada, tidak ada perbedaan signifikan', 1),
(1, 2, 'Adaptasi atau pengembangan dari inovasi yang sudah ada dengan beberapa penyesuaian bermakna', 2),
(1, 3, 'Gagasan atau pendekatan yang benar-benar baru, belum pernah diterapkan di instansi manapun', 3),
(2, 1, 'Dampak terbatas, hanya dirasakan oleh sebagian kecil pengguna internal OPD', 1),
(2, 2, 'Berdampak pada pelayanan publik dengan cakupan menengah, ada bukti peningkatan terukur', 2),
(2, 3, 'Dampak luas dan signifikan, dirasakan langsung oleh masyarakat dengan hasil yang terukur dan terdokumentasi', 3),
(3, 1, 'Membutuhkan sumber daya besar dan regulasi baru, implementasi sulit dilakukan', 1),
(3, 2, 'Dapat diimplementasikan dengan penyesuaian moderat pada sumber daya dan regulasi yang ada', 2),
(3, 3, 'Mudah diimplementasikan, sesuai kapasitas OPD, regulasi sudah mendukung, sumber daya tersedia', 3),
(4, 1, 'Bergantung pada individu tertentu atau anggaran khusus, sulit direplikasi', 1),
(4, 2, 'Berpotensi berkelanjutan dengan dukungan tertentu, ada peluang replikasi terbatas', 2),
(4, 3, 'Mandiri secara kelembagaan, mudah direplikasi, sudah atau berpotensi diadopsi daerah lain', 3),
(5, 1, 'Dilaksanakan secara internal satu OPD, tidak melibatkan pihak eksternal', 1),
(5, 2, 'Melibatkan 2–3 pemangku kepentingan dari unsur yang berbeda', 2),
(5, 3, 'Melibatkan banyak pemangku kepentingan lintas sektor (minimal 4 unsur) secara aktif dan terstruktur', 3),
(6, 1, 'Dokumentasi tidak lengkap, presentasi kurang sistematis dan sulit dipahami', 1),
(6, 2, 'Dokumentasi cukup lengkap, presentasi cukup jelas namun masih ada kekurangan', 2),
(6, 3, 'Dokumentasi lengkap dan terstruktur, presentasi sangat jelas, mudah dipahami, didukung data dan bukti konkret', 3);

-- INSERT INDIKATOR_SID (20 indikator aktif)
INSERT INTO indikator_sid (nomor_indikator, nomor_tampil, nama_indikator, bobot, tipe_indikator, keterangan, is_skip, urutan) VALUES
(16, 1, 'Infrastruktur Teknologi: Regulasi Inovasi Daerah', 3.0, 'radio', 'Regulasi landasan operasional inovasi', FALSE, 1),
(17, 2, 'Infrastruktur Teknologi: Ketersediaan & Peran SDM', 2.0, 'radio', 'Jumlah tim pengelola inovasi beserta peran', FALSE, 2),
(18, 3, 'Infrastruktur Teknologi: Dukungan Anggaran', 2.0, 'radio', 'Alokasi APBD untuk penerapan inovasi', FALSE, 3),
(19, 4, 'Kecanggihan Produk: Alat Kerja', 2.0, 'radio', 'Sarana/alat kerja operasional inovasi', FALSE, 4),
(20, 5, 'Kecanggihan Produk: Bimtek Inovasi', 1.0, 'radio', 'Peningkatan kapasitas pelaksana inovasi', FALSE, 5),
(21, 6, 'Kecanggihan Produk: Integrasi Program & Kegiatan Inovasi dalam RKPD', 2.0, 'radio', 'Pemuatan program inovasi dalam dokumen perencanaan', FALSE, 6),
(22, 7, 'Output Pengetahuan: Keterlibatan Aktor Inovasi', 1.0, 'radio', 'Unsur: akademisi, bisnis, komunitas, pemerintah, media', FALSE, 7),
(23, 8, 'Output Pengetahuan: Pelaksana Inovasi Daerah', 1.0, 'radio', 'Tingkatan penetapan tim pelaksana', FALSE, 8),
(24, 9, 'Output Pengetahuan: Jejaring Inovasi', 1.0, 'radio', 'Kolaborasi antar perangkat daerah', FALSE, 9),
(25, 10, 'Output Pengetahuan: Sosialisasi Inovasi Daerah', 1.0, 'radio', 'Penyebarluasan informasi kebijakan inovasi', FALSE, 10),
(26, 11, 'Kecepatan Bisnis Proses: Pedoman Teknis', 1.0, 'radio', 'Standar ketentuan manual penggunaan inovasi', FALSE, 11),
(27, 12, 'Kecepatan Bisnis Proses: Kemudahan Informasi Layanan', 1.0, 'radio', 'Metode: manual, hotline, medsos, online/website', FALSE, 12),
(28, 13, 'Kecepatan Bisnis Proses: Kemudahan Proses Inovasi (Kecepatan Layanan)', 2.0, 'radio', 'Durasi waktu standar operasional prosedur (SOP)', FALSE, 13),
(29, 14, 'Kecepatan Bisnis Proses: Penyelesaian Layanan Pengaduan', 1.0, 'radio', 'Rasio penanganan pengaduan/keluhan layanan', FALSE, 14),
(30, 15, 'Kecanggihan Produk: Layanan Terintegrasi', 2.0, 'radio', 'Penerapan prinsip interoperabilitas layanan', FALSE, 15),
(31, 16, 'Kecanggihan Produk: Replikasi Inovasi Daerah', 3.0, 'radio', 'Frekuensi adopsi/replikasi oleh pemda lain', FALSE, 16),
(32, 17, 'Kecepatan Bisnis Proses: Kecepatan Penciptaan Inovasi', 2.0, 'radio', 'Satuan waktu riset dan pengembangan inovasi', FALSE, 17),
(33, 18, 'Jumlah Inovasi & Hasil Kreatif: Kemanfaatan Inovasi', 3.0, 'radio', 'Dari 6 kriteria kemanfaatan, cukup pilih 3 kriteria yang paling relevan (cakupan penerima manfaat, efisiensi unit, atau efisiensi biaya)', FALSE, 18),
(34, 19, 'Jumlah Inovasi & Hasil Kreatif: Monev (Monitoring & Evaluasi)', 0, 'monev', 'Unggah atau masukkan data dokumen Monev (Monitoring dan Evaluasi) inovasi daerah', FALSE, 19),
(35, 20, 'Jumlah Inovasi & Hasil Kreatif: Video Inovasi', 0, 'video', 'Masukkan link/URL video dokumentasi inovasi daerah (YouTube, Google Drive, dll.)', FALSE, 20);

-- INSERT PARAMETER_INDIKATOR_SID (54 parameter)
INSERT INTO parameter_indikator_sid (indikator_id, nilai_parameter, deskripsi_parameter, urutan) VALUES
(1, 1, 'SK Kepala Daerah / SK Perangkat Daerah', 1),
(1, 2, 'Peraturan Kepala Daerah (Perkada)', 2),
(1, 3, 'Peraturan Daerah (Perda)', 3),
(2, 1, '1 - 10 SDM', 1),
(2, 2, '11 - 30 SDM', 2),
(2, 3, 'Lebih dari 30 SDM', 3),
(3, 1, 'Anggaran pada 1 tahun anggaran (T-2/T-1/T-0)', 1),
(3, 2, 'Anggaran pada 2 tahun berturut-turut', 2),
(3, 3, 'Anggaran pada 3 tahun (T-2, T-1, T-0)', 3),
(4, 1, 'Manual / non-elektronik', 1),
(4, 2, 'Didukung perangkat elektronik', 2),
(4, 3, 'Sistem informasi online / daring / AI', 3),
(5, 1, 'Pernah 1 kali bimtek dalam 3 tahun terakhir', 1),
(5, 2, 'Pernah 2 kali bimtek dalam 3 tahun terakhir', 2),
(5, 3, 'Pernah 3 kali atau lebih bimtek dalam 3 tahun terakhir', 3),
(6, 1, 'Dalam RKPD T-1 atau T-2', 1),
(6, 2, 'Dalam RKPD T-1 dan T-2', 2),
(6, 3, 'Dalam RKPD T-1, T-2, dan T-0', 3),
(7, 1, 'Melibatkan 3 Aktor', 1),
(7, 2, 'Melibatkan 4 Aktor', 2),
(7, 3, 'Melibatkan 5 Aktor atau lebih', 3),
(8, 1, 'Ada pelaksana tapi tanpa surat penugasan', 1),
(8, 2, 'Ditetapkan dengan Surat Penugasan Perangkat Daerah', 2),
(8, 3, 'Ditetapkan dengan SK/Surat Perintah Kepala Daerah', 3),
(9, 1, 'Melibatkan 2 Perangkat Daerah', 1),
(9, 2, 'Melibatkan 3 - 4 Perangkat Daerah', 2),
(9, 3, 'Melibatkan 5 Perangkat Daerah atau lebih', 3),
(10, 1, 'Foto kegiatan berlatar belakang spanduk', 1),
(10, 2, 'Konten media sosial / pemberitaan oleh pemda', 2),
(10, 3, 'Media massa / berita (bukan milik pemda)', 3),
(11, 1, 'Buku petunjuk / manual book cetak', 1),
(11, 2, 'Buku manual bentuk elektronik', 2),
(11, 3, 'Buku panduan dapat diakses secara online', 3),
(12, 1, 'Diperoleh melalui 1 metode', 1),
(12, 2, 'Diperoleh melalui 2 metode', 2),
(12, 3, 'Diperoleh melalui 3 atau lebih metode', 3),
(13, 1, 'Hasil diperoleh dalam 6 hari atau lebih', 1),
(13, 2, 'Hasil diperoleh dalam 2 - 5 hari', 2),
(13, 3, 'Hasil diperoleh dalam 1 hari', 3),
(14, 1, '<= 50% atau tidak ada pengaduan', 1),
(14, 2, '51% s.d. 90%', 2),
(14, 3, '>= 91%', 3),
(15, 1, 'Informasi web/sosmed terpisah / independen', 1),
(15, 2, 'Terintegrasi dalam satu portal unit organisasi', 2),
(15, 3, 'Terintegrasi lintas unit organisasi / superApps', 3),
(16, 1, 'Pernah 1 kali direplikasi daerah lain', 1),
(16, 2, 'Pernah 2 kali direplikasi daerah lain berbeda', 2),
(16, 3, 'Pernah 3 kali direplikasi daerah lain berbeda', 3),
(17, 1, 'Diciptakan dalam waktu 9 bulan atau lebih', 1),
(17, 2, 'Diciptakan dalam waktu 5 - 8 bulan', 2),
(17, 3, 'Diciptakan dalam waktu 1 - 4 bulan', 3),
(18, 1, 'Cakupan 1-200 orang / unit 5-20% / efisiensi 0.01-10%', 1),
(18, 2, 'Cakupan 201-500 orang / unit 20-50% / efisiensi 10.01-20%', 2),
(18, 3, 'Cakupan >=501 orang / unit >50% / efisiensi >20%', 3);

-- INSERT PENGATURAN_SISTEM
INSERT INTO pengaturan_sistem (kunci, nilai, tipe_data, deskripsi) VALUES
('nama_sistem', 'Sistem Penilaian Inovasi Daerah 2027', 'string', 'Nama sistem'),
('tahun_aktif', '2027', 'string', 'Tahun penilaian aktif'),
('batas_penilaian', '2027-12-31', 'string', 'Batas waktu penilaian'),
('max_skor_judul', '63', 'integer', 'Maksimal skor penilaian judul'),
('jumlah_juri_judul', '3', 'integer', 'Jumlah juri penilaian judul'),
('jumlah_juri_sid', '3', 'integer', 'Jumlah juri penilaian SID'),
('mode_penilaian', 'aktif', 'string', 'Status mode penilaian (aktif/nonaktif)');

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 4: INSERT DATA INOVASI (95+ inovasi)
-- ══════════════════════════════════════════════════════════════════════════════

-- Inovasi dari Inspektorat Daerah
INSERT INTO inovasi (opd_id, bentuk_id, judul_inovasi, ringkasan, tahun_implementasi, status_inovasi) VALUES
(1, 1, 'Digitalisasi Laporan Ikhtisar Pengawasan APIP', 'Digitalisasi Laporan Ikhtisar Pengawasan APIP merupakan langkah transformasi pengelolaan dan konsolidasi data hasil pengawasan internal pemerintah daerah dari sistem manual menjadi sistem terintegrasi secara elektronik.', 2026, 'dalam_penilaian'),
(1, 1, 'Klinik Konsultasi Pengawasan APIP', 'Klinik Konsultasi dan Pengawasan APIP merupakan transformasi layanan pengawasan dari model konvensional yang berfokus pada penindakan (watchdog) menjadi pendekatan reaktif-preventif dan kemitraan (consultative partner).', 2026, 'dalam_penilaian'),

-- Inovasi dari BAPPERIDA
(2, 1, 'Klinik Inovasi Daerah Kota Metro (Kovi Darat)', 'Klinik Inovasi Daerah Kota Metro (Kovi Darat) merupakan inovasi yang diinisiasi oleh Bapperida Kota Metro sebagai wadah konsultasi, pendampingan, dan fasilitasi bagi OPD serta masyarakat dalam pengembangan inovasi daerah secara terpadu dan berkesinambungan.', 2026, 'dalam_penilaian'),
(2, 1, 'Tanah Harapan 2.0', 'Tanah Harapan 2.0 merupakan inovasi pengembangan lanjutan dari program sebelumnya yang bertujuan untuk meningkatkan kualitas perencanaan pembangunan berbasis data dan partisipasi masyarakat di Kota Metro.', 2026, 'dalam_penilaian'),

-- Inovasi dari BKAD
(3, 1, 'SITEGGRASI SP2D (Sistem Terintegrasi Penerbitan SP2D Elektronik)', 'Merupakan pembaharuan tata kelola keuangan Pemerintah Kota Metro yang mengintegrasikan Sistem Informasi Pemerintahan Daerah (SIPD) secara elektronik berbasis host-to-host dengan sistem cash management PT Bank Lampung.', 2026, 'dalam_penilaian'),
(3, 1, 'JEJAK DANA (Jaringan Evaluasi dan Jejak Aliran Dana Non-Kas Daerah)', 'Inovasi penatausahaan dan penyusunan laporan keuangan yang berfokus pada identifikasi, rekonsiliasi, serta pencatatan terintegrasi atas penerimaan dan pengeluaran dana transfer pusat atau hibah/bantuan langsung.', 2026, 'dalam_penilaian'),
(3, 1, 'CERMAT RKUD (Cash Early Reminder, Monitoring dan Analisis Terpadu RKUD)', 'Inovasi tata kelola RKUD yang menghadirkan sistem peringatan dini berbasis pemantauan saldo kas secara real-time.', 2026, 'dalam_penilaian'),

-- Inovasi dari Badan Pendapatan Daerah
(4, 1, 'METAS (Metro Asset Service)', 'Penerapan pemesanan gedung/aset daerah dengan menggunakan aplikasi berbasis web. METAS memudahkan masyarakat dan instansi dalam melakukan pemesanan dan pengelolaan penggunaan aset milik Pemerintah Kota Metro secara digital, transparan, dan efisien.', 2026, 'dalam_penilaian'),

-- Inovasi dari BKPSDM
(5, 1, 'Sistem Informasi Dashboard Data ASN', 'SI-DATA ASN adalah sistem informasi berbasis web yang dirancang untuk mengelola dan menyajikan data kepegawaian Aparatur Sipil Negara (ASN) secara cepat dan real-time dalam bentuk dashboard interaktif.', 2026, 'dalam_penilaian'),

-- Inovasi dari Badan Kesbangpol
(6, 3, 'SIAP GEMBIRA (Sistem Informasi, Layanan dan Pengaduan Gerakan Metro Bebas dari Narkotika)', 'Inovasi daerah berbasis digital untuk meningkatkan efektivitas P4GN melalui satu platform yang mudah diakses masyarakat.', 2026, 'dalam_penilaian'),

-- Inovasi dari Sekretariat DPRD
(7, 1, 'SYNDTAKER (Pemanfaatan Synology Drive Guna Mewujudkan Efektivitas dan Efisiensi Tata Kelola Perencanaan di Bagian Keuangan Sekretariat DPRD)', 'Mewujudkan tata kelola bahan-bahan perencanaan yang lebih efektif, efisien, terintegrasi, serta akuntabel di sub-substansi Perencanaan Bagian Keuangan Sekretariat DPRD.', 2026, 'dalam_penilaian'),
(7, 1, 'TAPE UDANG (Penggunaan Taplink Dalam Penyelenggaraan Rapat-Rapat Bagian Perundangan dan Persidangan di Sekretariat DPRD Kota Metro)', 'Mengintegrasikan berbagi tautan, dokumen dan layanan hanya dalam satu halaman untuk lebih mudah dan menarik.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dinas Pendidikan dan Kebudayaan
(8, 1, 'BIDIKSIPA (Bantuan Pendidikan Guru PAUD yang sedang menempuh S1)', 'Program Bantuan Pendidikan S1 bagi Guru PAUD yang sedang menempuh jenjang S1.', 2025, 'dalam_penilaian'),
(8, 3, 'PPKSP (Pendampingan Permasalahan Kekerasan di Satuan Pendidikan)', 'Aplikasi pelayanan untuk peserta didik mencakup layanan mutasi, kesalahan ijazah, pengganti ijazah, dan penanganan permasalahan kekerasan di satuan pendidikan.', 2025, 'dalam_penilaian'),
(8, 3, 'Ayo Sekolah', 'Program jemput bola bagi warga Kota Metro untuk menuntaskan buta huruf.', 2025, 'dalam_penilaian'),

-- Inovasi dari Dinas Kesehatan
(9, 3, 'GEMAR SEHATI (Gerakan menuju Remaja Sehat dan Aktif)', 'Inovasi untuk meningkatkan derajat kesehatan remaja di lingkungan sekolah melalui pembentukan kader kesehatan remaja.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dinas PUTR
(10, 3, 'SATRIA (Sasaran terjadwal Rutin Air Limbah)', 'Mengubah pola penanganan limbah dari reaktif (menunggu mampet) menjadi preventif (terjadwal).', 2026, 'dalam_penilaian'),

-- Inovasi dari Dinas Perkim
(11, 3, 'SIGAP TPU (Sistem Informasi Geospasial Tempat Pemakaman Umum)', 'Sistem informasi berbasis digital dan geospasial untuk pendataan, pemetaan, pengelolaan, dan pemantauan Tempat Pemakaman Umum (TPU) secara terintegrasi.', 2026, 'dalam_penilaian'),
(11, 3, 'SIGAP PSU (Sistem Informasi Geospasial Prasarana, dan Utilitas Umum)', 'Inovasi berbasis teknologi informasi untuk meningkatkan efektivitas pendataan, inventarisasi, verifikasi, serah terima, serta pengelolaan PSU Perumahan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Satpol PP
(12, 3, 'RESPONTIBKUMDA (Responsif Penertiban hukum Daerah Kota Metro)', 'Inovasi yang mewujudkan penegakkan Perda yang humanis dan akuntabel sesuai SOP dengan meningkatkan kecepatan respons penanganan pelanggaran terhadap masyarakat.', 2026, 'dalam_penilaian'),
(12, 3, 'SRIKANDI BAHAGIA (Strategi responsive dan Inovatif Praja Wanita)', 'Praja Wanita Satpol PP memiliki posisi strategis dalam pelayanan masyarakat karena pendekatan komunikasi yang lebih persuasif, empatik, dan sensitif.', 2026, 'dalam_penilaian'),

-- Inovasi dari Damkar
(13, 3, 'RESEP TAWA (Reaksi Cepat Tanggap Satwa)', 'Meningkatkan respons cepat, kemampuan dan keterampilan petugas pemadam kebakaran dan penyelamatan dalam mengevakuasi satwa liar/berbahaya.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dinas Sosial
(14, 3, 'HANJAK SAGITA (Harapan, Akses, Jaringan, dan Kemandirian – Sistem Aksi gerak Inklusif dan tanggap)', 'Inovasi Dinas Sosial Kota Metro yang memberdayakan penyandang disabilitas dan keluarganya melalui pendekatan holistik.', 2026, 'dalam_penilaian'),
(14, 3, 'LENTERA KENCANA (Layanan Terintegrasi dan Responsif – Kanal Empatik, Cepat dan Aman)', 'Inovasi pelayanan pengaduan sosial yang menghadirkan layanan terpadu, responsif, empatik, cepat, nyaman, aman, dan mudah diakses masyarakat.', 2026, 'dalam_penilaian'),

-- Inovasi dari DP3AP2KB
(15, 3, 'SEKOLAH KELUARGA SAI BANGGA (Saling Asah, Asuh, dan Asih Menuju Keluarga Tangguh, Berdaya, dan Membanggakan)', 'Inovasi pembelajaran bagi keluarga untuk meningkatkan pengetahuan, keterampilan, dan sikap dalam mewujudkan keluarga berkualitas.', 2026, 'dalam_penilaian'),

-- Inovasi dari DKPPP
(16, 3, 'QUARSA (Gerakan Qurban Aman dan Sehat)', 'Integrasi pengawasan qurban berbasis kolaborasi pemerintah dan Baznas berupa sistem pengawasan berbasis titik lokasi masjid/mushola.', 2026, 'dalam_penilaian'),
(16, 3, 'SIEMBEK SEHAT (Sistem Integrasi Keamanan Penerbitan Pemotongan Kambing Sehingga One Health Aman Terawasi)', 'Sistem terpadu pengendalian pemotongan kambing di Kota Metro.', 2026, 'dalam_penilaian'),
(16, 3, 'TELAM (Teras Pangan Lokal Kota Metro)', 'Upaya peningkatan pengetahuan masyarakat mengenai pengolahan pangan lokal yang sehat, bergizi, beragam, aman, dan bernilai ekonomi.', 2026, 'dalam_penilaian'),
(16, 3, 'PosTer Pangan (Pos pengawasan Terpadu Keamanan Pangan)', 'Pasar tani sebagai wadah pemasaran produk pertanian secara digital dan non-digital dengan konsep fresh from farm.', 2026, 'dalam_penilaian'),
(16, 3, 'Gerakan Metro Peduli Pangan', 'Aksi penyelamatan pangan sebagai upaya pencegahan dan pengurangan sisa pangan.', 2026, 'dalam_penilaian'),
(16, 3, 'BESOLEK (Besuk Online Efektif)', 'Besuk pasien rawat inap UPTD RSH Kota Metro yang dilaksanakan dengan cara video call.', 2026, 'dalam_penilaian'),
(16, 3, 'PERMATA (Peternakan Mandiri Ayam Perkotaan)', 'Gerakan mengajak masyarakat perkotaan untuk melakukan budidaya ayam skala rumah tangga secara mandiri dengan konsep urban farming.', 2026, 'dalam_penilaian'),

-- Inovasi dari DLH
(17, 2, 'SIKEPAY (Sistem Informasi Kepatuhan dan Pembayaran Retribusi Sampah)', 'Inovasi untuk meningkatkan efektivitas pemungutan retribusi melalui aplikasi pembayaran retribusi sampah berbasis digital.', 2026, 'dalam_penilaian'),
(17, 2, 'SABAR (Sakai Sambayan Bersih dan Retribusi)', 'Inovasi edukasi dan pemberdayaan masyarakat berbasis kearifan lokal dalam pemilahan sampah dan peningkatan kepatuhan membayar retribusi persampahan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Disdukcapil
(18, 3, 'MEKHANAI ADMINDUK (MANAJEMEN Keamanan Informasi Administrasi kependudukan)', 'Inovasi yang bertujuan memperkuat keamanan informasi kependudukan di era transformasi digital.', 2026, 'dalam_penilaian'),
(18, 3, 'Jemput Bola SI APDI (Sistem Administrasi Pemanfaatan IKD untuk Digitalisasi Bantuan Sosial)', 'Program bantuan sosial digitalisasi agar penyalurannya tepat sasaran, cepat, dan transparan.', 2026, 'dalam_penilaian'),
(18, 3, 'SI AKSI (Sistem Integrasi Akta, KK, dan KIA Siap Melayani)', 'Inovasi yang mengintegrasikan penerbitan Kartu Keluarga (KK), Akta Kelahiran, dan Kartu Identitas Anak (KIA) dalam satu kali proses pelayanan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dishub
(19, 3, 'TERANGIN', 'Inovasi digital berupa aplikasi layanan pengaduan penerangan jalan umum (PJU) berbasis AI dan geolokasi.', 2026, 'dalam_penilaian'),

-- Inovasi dari Diskominfotik
(20, 1, 'SINADI (Sistem Informasi Layanan Digital)', 'Inovasi pelayanan publik berbasis web yang mengintegrasikan seluruh layanan Dinas Komunikasi, Informatika dan Statistik Kota Metro dalam satu portal layanan terpadu.', 2026, 'dalam_penilaian'),

-- Inovasi dari Diskopumker
(21, 3, 'Jumat Djajan Metro Bahagia', 'Bazar UMKM yang dilaksanakan satu bulan dua kali setiap hari Jumat dengan melibatkan UMKM binaan maupun UMKM lokal Kota Metro.', 2026, 'dalam_penilaian'),

-- Inovasi dari DPMPTSP
(22, 3, 'KLIK-MPP (Konsultasi Layanan Interaktif dan Komprehensif Mal Pelayanan Publik)', 'Penyediaan Konsultasi Virtual (Live Chatbox) yang disematkan langsung pada situs web resmi MPP Kota Metro.', 2026, 'dalam_penilaian'),
(22, 3, 'LARIS (Layanan Asistensi Registrasi Perizinan Berusaha Pedagang Pasar)', 'Layanan bergerak (jemput bola) di mana petugas perizinan secara proaktif turun langsung mendatangi pasar-pasar tradisional di Kota Metro.', 2026, 'dalam_penilaian'),

-- Inovasi dari Disporaparekraf
(23, 3, 'GEMALA HUB (Pusat Integrasi Gerakan metro Kreatif Lindungi Karya)', 'Program transformasi digital pelayanan publik yang memfasilitasi pendaftaran HKI secara digital.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dispusipda
(24, 3, 'Titik Baca Koleksi Digital/E-book', 'Pengadaan Titik Baca Koleksi Digital (e-book) berbasis QR Code sebagai langkah strategis, murah dan cepat untuk memperluas jangkauan layanan perpustakaan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Disperindag
(25, 3, 'Gebyar IKM Kota Metro', 'Kegiatan berbentuk eksibisi yang menghadirkan berbagai produk industri kecil dan menengah di Kota Metro.', 2026, 'dalam_penilaian'),

-- Inovasi dari BPBD
(26, 3, 'GEBRAK SIAGA (Gerakan Bersama Latihan Kesiapsiagaan Bencana)', 'Inovasi untuk meningkatkan pencegahan dan kesiapan aparat serta masyarakat dalam penanggulangan bencana Daerah Kota Metro.', 2026, 'dalam_penilaian'),

-- Inovasi dari Setda
(27, 1, 'PEKA SEKELIK PBJ (Peningkatan Kapasitas Seputar kegiatan dan Klinik Pengadaan Barang/Jasa)', 'Inovasi digital untuk mengoptimalkan monitoring dan pengelolaan PBJ.', 2026, 'dalam_penilaian'),
(28, 1, 'RAKOR CERDAS (Rapat Koordinasi Digital, Cepat, Efektif, Responsif, Transparan dan Terukur)', 'Inovasi rapat koordinasi berbasis digital yang mewujudkan pelaksanaan rapat yang cepat, efektif, responsif, transparan, dan terukur.', 2026, 'dalam_penilaian'),
(29, 1, 'PETRA (Pengajuan dan Tracking Produk Hukum)', 'Sistem digital untuk pengajuan dan pelacakan (tracking) status produk hukum di lingkungan Pemerintah Kota Metro.', 2026, 'dalam_penilaian'),
(30, 1, 'IBU SITE (Informasi Bagian Umum Berbasis Website)', 'Sistem informasi berbasis digital (website) yang dirancang untuk mengelola, memantau, dan menyajikan informasi seluruh kegiatan pada Bagian Umum Setda Kota Metro.', 2026, 'dalam_penilaian'),
(30, 1, 'AMAD (Alih Media Arsip Digital)', 'Program pengelolaan kearsipan digital yang diperkuat melalui Perwali No. 21 Tahun 2025 tentang pedoman alih media arsip.', 2026, 'dalam_penilaian'),
(31, 1, 'SI CANTIK (Sahabat Ibu Cakap Literasi Keuangan Syariah)', 'Inovasi untuk meningkatkan literasi keuangan syariah bagi ibu-ibu di Kota Metro.', 2026, 'dalam_penilaian'),

-- Inovasi dari Kecamatan
(32, 2, 'PELITA METRO UTARA (Pelayanan Terintegrasi, Cepat, Mudah, Transparan dan ramah)', 'Inovasi pelayanan yang mengintegrasikan pelayanan langsung dengan pemanfaatan teknologi informasi.', 2026, 'dalam_penilaian'),
(33, 2, 'KALAP (Kantor Lapangan)', 'Tim monitoring Kecamatan melakukan penjaringan aspirasi masyarakat terkait pelayanan terhadap kelurahan dan kecamatan.', 2026, 'dalam_penilaian');

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 5: STORED PROCEDURES
-- ══════════════════════════════════════════════════════════════════════════════

DELIMITER $$

-- Procedure untuk update rekap penilaian
CREATE PROCEDURE update_rekap_penilaian(IN p_inovasi_id INT, IN p_juri_id INT)
BEGIN
    DECLARE v_skor_judul DECIMAL(6,2);
    DECLARE v_skor_indikator DECIMAL(6,2);
    DECLARE v_jumlah_kriteria INT;
    DECLARE v_jumlah_indikator INT;
    DECLARE v_total_kriteria INT DEFAULT 6;
    DECLARE v_total_indikator INT DEFAULT 18;
    
    -- Hitung skor judul
    SELECT COALESCE(SUM(skor), 0), COUNT(*)
    INTO v_skor_judul, v_jumlah_kriteria
    FROM penilaian_judul
    WHERE inovasi_id = p_inovasi_id AND juri_id = p_juri_id;
    
    -- Hitung skor indikator
    SELECT COALESCE(SUM(skor), 0), COUNT(*)
    INTO v_skor_indikator, v_jumlah_indikator
    FROM penilaian_indikator
    WHERE inovasi_id = p_inovasi_id AND juri_id = p_juri_id AND skor IS NOT NULL;
    
    -- Hitung persentase lengkap
    SET @persentase = ((v_jumlah_kriteria + v_jumlah_indikator) / 
                       (v_total_kriteria + v_total_indikator)) * 100;
    
    -- Tentukan status lengkap
    SET @status = CASE 
        WHEN @persentase = 100 THEN 'lengkap'
        WHEN @persentase > 0 THEN 'sebagian'
        ELSE 'belum'
    END;
    
    -- Insert atau update rekap
    INSERT INTO rekap_penilaian 
        (inovasi_id, juri_id, skor_judul, skor_indikator, skor_total, 
         persentase_lengkap, jumlah_kriteria_dinilai, jumlah_indikator_dinilai, status_lengkap)
    VALUES 
        (p_inovasi_id, p_juri_id, v_skor_judul, v_skor_indikator, 
         v_skor_judul + v_skor_indikator, @persentase, v_jumlah_kriteria, v_jumlah_indikator, @status)
    ON DUPLICATE KEY UPDATE
        skor_judul = v_skor_judul,
        skor_indikator = v_skor_indikator,
        skor_total = v_skor_judul + v_skor_indikator,
        persentase_lengkap = @persentase,
        jumlah_kriteria_dinilai = v_jumlah_kriteria,
        jumlah_indikator_dinilai = v_jumlah_indikator,
        status_lengkap = @status;
END$$

-- Procedure untuk update ranking
CREATE PROCEDURE update_ranking_inovasi(IN p_inovasi_id INT)
BEGIN
    DECLARE v_rata_judul DECIMAL(6,2);
    DECLARE v_rata_indikator DECIMAL(6,2);
    DECLARE v_jumlah_juri_judul INT;
    DECLARE v_jumlah_juri_indikator INT;
    
    -- Hitung rata-rata skor judul
    SELECT 
        COALESCE(AVG(skor_judul), 0),
        COUNT(*)
    INTO v_rata_judul, v_jumlah_juri_judul
    FROM rekap_penilaian
    WHERE inovasi_id = p_inovasi_id AND skor_judul > 0;
    
    -- Hitung rata-rata skor indikator
    SELECT 
        COALESCE(AVG(skor_indikator), 0),
        COUNT(*)
    INTO v_rata_indikator, v_jumlah_juri_indikator
    FROM rekap_penilaian
    WHERE inovasi_id = p_inovasi_id AND skor_indikator > 0;
    
    -- Tentukan status penilaian
    SET @status = CASE 
        WHEN v_jumlah_juri_judul >= 3 AND v_jumlah_juri_indikator >= 3 THEN 'lengkap'
        WHEN v_jumlah_juri_judul > 0 OR v_jumlah_juri_indikator > 0 THEN 'sebagian'
        ELSE 'belum'
    END;
    
    -- Insert atau update ranking
    INSERT INTO ranking_inovasi 
        (inovasi_id, rata_rata_judul, rata_rata_indikator, rata_rata_total, 
         jumlah_juri_judul, jumlah_juri_indikator, status_penilaian)
    VALUES 
        (p_inovasi_id, v_rata_judul, v_rata_indikator, v_rata_judul + v_rata_indikator,
         v_jumlah_juri_judul, v_jumlah_juri_indikator, @status)
    ON DUPLICATE KEY UPDATE
        rata_rata_judul = v_rata_judul,
        rata_rata_indikator = v_rata_indikator,
        rata_rata_total = v_rata_judul + v_rata_indikator,
        jumlah_juri_judul = v_jumlah_juri_judul,
        jumlah_juri_indikator = v_jumlah_juri_indikator,
        status_penilaian = @status;
    
    -- Update peringkat untuk semua inovasi
    SET @rank = 0;
    UPDATE ranking_inovasi
    SET peringkat = (@rank := @rank + 1)
    ORDER BY rata_rata_total DESC, terakhir_update ASC;
END$$

DELIMITER ;

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 6: TRIGGERS
-- ══════════════════════════════════════════════════════════════════════════════

DELIMITER $$

-- Trigger after insert penilaian_judul
CREATE TRIGGER after_penilaian_judul_insert
AFTER INSERT ON penilaian_judul
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

-- Trigger after update penilaian_judul
CREATE TRIGGER after_penilaian_judul_update
AFTER UPDATE ON penilaian_judul
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

-- Trigger after insert penilaian_indikator
CREATE TRIGGER after_penilaian_indikator_insert
AFTER INSERT ON penilaian_indikator
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

-- Trigger after update penilaian_indikator
CREATE TRIGGER after_penilaian_indikator_update
AFTER UPDATE ON penilaian_indikator
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

DELIMITER ;

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 7: VIEWS
-- ══════════════════════════════════════════════════════════════════════════════

-- View rekap lengkap
CREATE OR REPLACE VIEW v_rekap_lengkap AS
SELECT 
    i.inovasi_id,
    i.judul_inovasi,
    pd.nama_opd AS perangkat_daerah,
    ko.nama_kategori AS kategori_opd,
    bi.nama_bentuk AS bentuk_inovasi,
    i.tahun_implementasi,
    i.status_inovasi,
    ri.rata_rata_judul,
    ri.rata_rata_indikator,
    ri.rata_rata_total,
    ri.peringkat,
    ri.jumlah_juri_judul,
    ri.jumlah_juri_indikator,
    ri.status_penilaian,
    ri.terakhir_update
FROM inovasi i
LEFT JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
LEFT JOIN kategori_opd ko ON pd.kategori_id = ko.kategori_id
LEFT JOIN bentuk_inovasi bi ON i.bentuk_id = bi.bentuk_id
LEFT JOIN ranking_inovasi ri ON i.inovasi_id = ri.inovasi_id
WHERE i.is_active = TRUE
ORDER BY ri.peringkat ASC, ri.rata_rata_total DESC;

-- View detail penilaian per juri
CREATE OR REPLACE VIEW v_detail_penilaian_juri AS
SELECT 
    rp.rekap_id,
    i.inovasi_id,
    i.judul_inovasi,
    u.nama AS nama_juri,
    u.role AS role_juri,
    rp.skor_judul,
    rp.skor_indikator,
    rp.skor_total,
    rp.persentase_lengkap,
    rp.status_lengkap,
    rp.terakhir_update
FROM rekap_penilaian rp
JOIN inovasi i ON rp.inovasi_id = i.inovasi_id
JOIN users u ON rp.juri_id = u.user_id
WHERE i.is_active = TRUE
ORDER BY i.judul_inovasi, u.nama;

-- ══════════════════════════════════════════════════════════════════════════════
-- SELESAI
-- ══════════════════════════════════════════════════════════════════════════════

-- Tampilkan summary
SELECT 
    'DATABASE CREATED SUCCESSFULLY!' AS status,
    (SELECT COUNT(*) FROM users) AS total_users,
    (SELECT COUNT(*) FROM perangkat_daerah) AS total_opd,
    (SELECT COUNT(*) FROM inovasi) AS total_inovasi,
    (SELECT COUNT(*) FROM kriteria_judul) AS total_kriteria,
    (SELECT COUNT(*) FROM indikator_sid) AS total_indikator;

-- Password default:
-- Admin: admin2027
-- Juri: juri2027
-- PENTING: Ganti password di production dengan hash bcrypt!



-- Lanjutan inovasi dari DKPPP
(16, 3, 'PosTer Pangan (Pos pengawasan Terpadu Keamanan Pangan)', 'Pasar tani sebagai wadah pemasaran produk pertanian secara digital dan non-digital dengan konsep fresh from farm. Mengintegrasikan pengawasan keamanan pangan dengan memberdayakan pelaku usaha lokal.', 2026, 'dalam_penilaian'),
(16, 3, 'Gerakan Metro Peduli Pangan', 'Aksi penyelamatan pangan sebagai upaya pencegahan dan pengurangan sisa pangan. Mengajak seluruh stakeholder untuk berpartisipasi dalam mengurangi food waste melalui redistribusi pangan surplus ke penerima manfaat.', 2026, 'dalam_penilaian'),
(16, 3, 'BESOLEK (Besuk Online Efektif)', 'Besuk pasien rawat inap UPTD RSH Kota Metro yang dilaksanakan dengan cara video call, menjawab tantangan keterbatasan waktu kunjungan, jarak geografis, dan protokol kesehatan.', 2026, 'dalam_penilaian'),
(16, 3, 'PERMATA (Peternakan Mandiri Ayam Perkotaan)', 'Gerakan mengajak masyarakat perkotaan untuk melakukan budidaya ayam skala rumah tangga secara mandiri dengan konsep urban farming. Mewujudkan ketahanan pangan keluarga sekaligus meningkatkan pendapatan melalui pemanfaatan lahan terbatas di lingkungan perkotaan.', 2026, 'dalam_penilaian'),

-- Inovasi dari DLH
(17, 2, 'SIKEPAY (Sistem Informasi Kepatuhan dan Pembayaran Retribusi Sampah)', 'Inovasi untuk meningkatkan efektivitas pemungutan retribusi melalui aplikasi pembayaran retribusi sampah berbasis digital. Memudahkan warga dalam membayar retribusi, memantau status pembayaran, dan meningkatkan transparansi pengelolaan retribusi.', 2026, 'dalam_penilaian'),
(17, 2, 'SABAR (Sakai Sambayan Bersih dan Retribusi)', 'Inovasi edukasi dan pemberdayaan masyarakat berbasis kearifan lokal dalam pemilahan sampah dan peningkatan kepatuhan membayar retribusi persampahan. Menggunakan pendekatan budaya lokal Lampung (sakai sambayan) sebagai basis gerakan kolektif pengelolaan sampah.', 2026, 'dalam_penilaian'),

-- Inovasi dari Disdukcapil
(18, 3, 'MEKHANAI ADMINDUK (Manajemen Keamanan Informasi Administrasi Kependudukan)', 'Inovasi yang bertujuan memperkuat keamanan informasi kependudukan di era transformasi digital. Melindungi data sensitif penduduk dari ancaman kebocoran, penyalahgunaan, dan akses tidak sah melalui penerapan sistem keamanan berlapis.', 2026, 'dalam_penilaian'),
(18, 3, 'Jemput Bola SI APDI (Sistem Administrasi Pemanfaatan IKD untuk Digitalisasi Bantuan Sosial)', 'Program bantuan sosial digitalisasi agar penyalurannya tepat sasaran, cepat, dan transparan. Petugas turun langsung ke lokasi untuk memverifikasi data dan memastikan pemanfaatan IKD dalam penyaluran bansos.', 2026, 'dalam_penilaian'),
(18, 3, 'SI AKSI (Sistem Integrasi Akta, KK, dan KIA Siap Melayani)', 'Inovasi yang mengintegrasikan penerbitan Kartu Keluarga (KK), Akta Kelahiran, dan Kartu Identitas Anak (KIA) dalam satu kali proses pelayanan. Orang tua tidak perlu bolak-balik mengurus dokumen secara terpisah, cukup sekali datang untuk mendapatkan ketiga dokumen sekaligus.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dishub
(19, 3, 'TERANGIN (Terang Bersinar)', 'Inovasi digital berupa aplikasi layanan pengaduan penerangan jalan umum (PJU) berbasis AI dan geolokasi. Warga dapat melaporkan kerusakan PJU secara mudah, cepat, dan real-time melalui smartphone, sehingga perbaikan dapat dilakukan dengan responsif.', 2026, 'dalam_penilaian'),

-- Inovasi dari Diskominfotik
(20, 1, 'SINADI (Sistem Informasi Layanan Digital)', 'Inovasi pelayanan publik berbasis web yang mengintegrasikan seluruh layanan Dinas Komunikasi, Informatika dan Statistik Kota Metro dalam satu portal layanan terpadu. Memudahkan masyarakat mengakses berbagai layanan digital, informasi publik, pengaduan, dan statistik daerah dalam satu platform.', 2026, 'dalam_penilaian'),

-- Inovasi dari Diskopumker
(21, 3, 'Jumat Djajan Metro Bahagia', 'Bazar UMKM yang dilaksanakan satu bulan dua kali setiap hari Jumat dengan melibatkan UMKM binaan maupun UMKM lokal Kota Metro. Memberikan wadah promosi dan pemasaran produk UMKM sekaligus menciptakan ruang interaksi ekonomi lokal yang dinamis.', 2026, 'dalam_penilaian'),

-- Inovasi dari DPMPTSP
(22, 3, 'KLIK-MPP (Konsultasi Layanan Interaktif dan Komprehensif Mal Pelayanan Publik)', 'Penyediaan Konsultasi Virtual (Live Chatbox) yang disematkan langsung pada situs web resmi MPP Kota Metro. Masyarakat dapat berkonsultasi secara real-time tanpa perlu datang langsung, menghemat waktu dan biaya.', 2026, 'dalam_penilaian'),
(22, 3, 'LARIS (Layanan Asistensi Registrasi Perizinan Berusaha Pedagang Pasar)', 'Layanan bergerak (jemput bola) di mana petugas perizinan secara proaktif turun langsung mendatangi pasar-pasar tradisional di Kota Metro. Membantu pedagang pasar dalam mengurus perizinan usaha tanpa harus meninggalkan lapak dagangan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Disporaparekraf
(23, 3, 'GEMALA HUB (Pusat Integrasi Gerakan Metro Kreatif Lindungi Karya)', 'Program transformasi digital pelayanan publik yang memfasilitasi pendaftaran HKI (Hak Kekayaan Intelektual) secara digital. Mendampingi pelaku ekonomi kreatif dalam melindungi karyanya melalui hak cipta, merek, dan paten.', 2026, 'dalam_penilaian'),

-- Inovasi dari Dispusipda
(24, 3, 'Titik Baca Koleksi Digital/E-book', 'Pengadaan Titik Baca Koleksi Digital (e-book) berbasis QR Code sebagai langkah strategis, murah dan cepat untuk memperluas jangkauan layanan perpustakaan. Masyarakat dapat mengakses ribuan koleksi buku digital hanya dengan scan QR Code dari smartphone mereka.', 2026, 'dalam_penilaian'),

-- Inovasi dari Disperindag
(25, 3, 'Gebyar IKM Kota Metro', 'Kegiatan berbentuk eksibisi yang menghadirkan berbagai produk industri kecil dan menengah di Kota Metro. Memfasilitasi IKM lokal untuk mempromosikan produknya, menjalin networking dengan buyer, serta membuka akses pasar yang lebih luas.', 2026, 'dalam_penilaian'),

-- Inovasi dari BPBD
(26, 3, 'GEBRAK SIAGA (Gerakan Bersama Latihan Kesiapsiagaan Bencana)', 'Inovasi untuk meningkatkan pencegahan dan kesiapan aparat serta masyarakat dalam penanggulangan bencana Daerah Kota Metro. Melibatkan seluruh elemen masyarakat dalam simulasi tanggap darurat bencana secara rutin dan terstruktur.', 2026, 'dalam_penilaian'),

-- Inovasi dari Setda - Bagian PBJ
(27, 1, 'PEKA SEKELIK PBJ (Peningkatan Kapasitas Seputar kegiatan dan Klinik Pengadaan Barang/Jasa)', 'Inovasi digital untuk mengoptimalkan monitoring dan pengelolaan PBJ. Menyediakan platform konsultasi, edukasi, dan pendampingan bagi OPD dalam proses pengadaan barang/jasa agar lebih efektif, efisien, dan sesuai regulasi.', 2026, 'dalam_penilaian'),

-- Inovasi dari Setda - Bagian Pemerintahan
(28, 1, 'RAKOR CERDAS (Rapat Koordinasi Digital, Cepat, Efektif, Responsif, Transparan dan Terukur)', 'Inovasi rapat koordinasi berbasis digital yang mewujudkan pelaksanaan rapat yang cepat, efektif, responsif, transparan, dan terukur. Menggunakan platform digital terintegrasi untuk dokumentasi, follow-up, dan evaluasi hasil rapat.', 2026, 'dalam_penilaian'),

-- Inovasi dari Setda - Bagian Hukum
(29, 1, 'PETRA (Pengajuan dan Tracking Produk Hukum)', 'Sistem digital untuk pengajuan dan pelacakan (tracking) status produk hukum di lingkungan Pemerintah Kota Metro. OPD dapat memantau progress pengajuan Perwali, SK, dan produk hukum lainnya secara real-time dan transparan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Setda - Bagian Umum
(30, 1, 'IBU SITE (Informasi Bagian Umum Berbasis Website)', 'Sistem informasi berbasis digital (website) yang dirancang untuk mengelola, memantau, dan menyajikan informasi seluruh kegiatan pada Bagian Umum Setda Kota Metro. Meningkatkan transparansi dan akuntabilitas pengelolaan aset, kendaraan dinas, dan layanan umum.', 2026, 'dalam_penilaian'),
(30, 1, 'AMAD (Alih Media Arsip Digital)', 'Program pengelolaan kearsipan digital yang diperkuat melalui Perwali No. 21 Tahun 2025 tentang pedoman alih media arsip. Mengkonversi arsip fisik menjadi digital untuk meningkatkan keamanan, kemudahan akses, dan efisiensi penyimpanan arsip pemerintahan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Setda - Bagian Perekonomian
(31, 1, 'SI CANTIK (Sahabat Ibu Cakap Literasi Keuangan Syariah)', 'Inovasi untuk meningkatkan literasi keuangan syariah bagi ibu-ibu di Kota Metro. Memberikan edukasi dan pendampingan mengenai pengelolaan keuangan keluarga berbasis prinsip syariah yang sehat dan berkelanjutan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Kecamatan Metro Utara
(32, 2, 'PELITA METRO UTARA (Pelayanan Terintegrasi, Cepat, Mudah, Transparan dan Ramah)', 'Inovasi pelayanan yang mengintegrasikan pelayanan langsung dengan pemanfaatan teknologi informasi. Masyarakat mendapatkan pelayanan administrasi kependudukan dan perizinan yang lebih cepat, mudah, dan transparan di tingkat kecamatan.', 2026, 'dalam_penilaian'),

-- Inovasi dari Kecamatan Metro Selatan
(33, 2, 'KALAP (Kantor Lapangan)', 'Tim monitoring Kecamatan melakukan penjaringan aspirasi masyarakat terkait pelayanan terhadap kelurahan dan kecamatan. Membawa kantor langsung ke tengah masyarakat untuk menampung keluhan, saran, dan kebutuhan pelayanan secara proaktif.', 2026, 'dalam_penilaian');

-- Tambahan data inovasi dari berbagai OPD lainnya (untuk melengkapi hingga 105 inovasi)
-- Note: Data inovasi dari UPTD Pendidikan dan Kesehatan akan ditambahkan dengan kategori_id yang sesuai

INSERT INTO inovasi (opd_id, bentuk_id, judul_inovasi, ringkasan, tahun_implementasi, status_inovasi) VALUES
-- Placeholder untuk inovasi tambahan dari UPTD dan OPD lainnya
(8, 2, 'Program Digitalisasi Pembelajaran Berbasis Platform E-Learning', 'Implementasi platform e-learning terintegrasi untuk meningkatkan kualitas pembelajaran di seluruh satuan pendidikan Kota Metro.', 2026, 'dalam_penilaian'),
(8, 2, 'Sistem Monitoring Kehadiran Guru dan Siswa Real-Time', 'Aplikasi monitoring kehadiran berbasis GPS dan biometrik untuk transparansi dan akuntabilitas kehadiran guru dan siswa.', 2026, 'dalam_penilaian'),
(9, 2, 'Program Kesehatan Ibu dan Anak Terintegrasi Digital', 'Platform digital untuk pemantauan kesehatan ibu hamil dan anak dari posyandu hingga rumah sakit.', 2026, 'dalam_penilaian'),
(9, 2, 'Sistem Rujukan Kesehatan Berbasis Aplikasi', 'Aplikasi rujukan pasien antar fasilitas kesehatan untuk mempercepat penanganan kasus emergency.', 2026, 'dalam_penilaian'),
(10, 2, 'Program Pemeliharaan Jalan Berbasis Keluhan Masyarakat', 'Sistem pengaduan dan monitoring pemeliharaan jalan yang responsif terhadap laporan warga.', 2026, 'dalam_penilaian'),
(11, 2, 'Digitalisasi Izin Mendirikan Bangunan (IMB)', 'Platform online untuk pengajuan, pemrosesan, dan penerbitan IMB secara digital dan transparan.', 2026, 'dalam_penilaian'),
(12, 2, 'Patroli Ketertiban Berbasis Laporan Warga', 'Sistem patroli dinamis yang merespons laporan warga melalui aplikasi mobile.', 2026, 'dalam_penilaian'),
(13, 2, 'Sistem Deteksi Dini Kebakaran Berbasis IoT', 'Pemasangan sensor deteksi asap dan api di area rawan kebakaran dengan notifikasi real-time.', 2026, 'dalam_penilaian'),
(14, 2, 'Program Bantuan Sosial Digital Terintegrasi', 'Platform terintegrasi untuk pendataan, verifikasi, dan penyaluran bantuan sosial secara transparan.', 2026, 'dalam_penilaian'),
(15, 2, 'Pusat Konseling Keluarga Online 24/7', 'Layanan konseling keluarga, perempuan, dan anak yang dapat diakses kapan saja melalui aplikasi.', 2026, 'dalam_penilaian'),
(16, 2, 'Pasar Tani Digital Kota Metro', 'Platform marketplace untuk produk pertanian lokal dengan sistem pemesanan dan pengiriman online.', 2026, 'dalam_penilaian'),
(17, 2, 'Bank Sampah Digital Terintegrasi', 'Sistem pengelolaan bank sampah berbasis aplikasi dengan reward point dan marketplace produk daur ulang.', 2026, 'dalam_penilaian'),
(18, 2, 'Layanan Kependudukan Mobile (Mobil Keliling)', 'Unit mobile untuk layanan kependudukan keliling ke wilayah terpencil atau kurang terlayani.', 2026, 'dalam_penilaian'),
(19, 2, 'Smart Traffic Light Berbasis AI', 'Sistem traffic light cerdas yang menyesuaikan waktu lampu berdasarkan kepadatan kendaraan real-time.', 2026, 'dalam_penilaian'),
(20, 2, 'Command Center Smart City Kota Metro', 'Pusat monitoring dan kontrol seluruh sistem smart city Kota Metro secara terintegrasi.', 2026, 'dalam_penilaian'),
(21, 2, 'Inkubator UMKM Digital', 'Program inkubasi UMKM dengan fasilitas pelatihan digital marketing, e-commerce, dan akses permodalan.', 2026, 'dalam_penilaian'),
(22, 2, 'Portal Investasi Kota Metro', 'Platform one-stop service untuk investor yang menyediakan informasi potensi investasi dan kemudahan perizinan.', 2026, 'dalam_penilaian'),
(23, 2, 'Festival Seni dan Budaya Virtual', 'Event seni dan budaya Kota Metro yang dapat diakses secara virtual untuk jangkauan lebih luas.', 2026, 'dalam_penilaian'),
(24, 2, 'Perpustakaan Keliling Digital', 'Mobil perpustakaan dilengkapi tablet dan akses e-book untuk menjangkau area tanpa perpustakaan.', 2026, 'dalam_penilaian'),
(25, 2, 'Sertifikasi Halal Gratis untuk UMKM', 'Program fasilitasi sertifikasi halal gratis bagi produk UMKM lokal untuk meningkatkan daya saing.', 2026, 'dalam_penilaian'),
(26, 2, 'Sistem Peringatan Dini Bencana Terintegrasi', 'Platform early warning system yang terintegrasi dengan BMKG dan sistem komunikasi darurat.', 2026, 'dalam_penilaian'),
(1, 2, 'Sistem Pengaduan dan Monitoring Audit Online', 'Platform untuk masyarakat melaporkan dugaan fraud atau pelanggaran pengelolaan keuangan daerah.', 2026, 'dalam_penilaian'),
(2, 2, 'Dashboard Monitoring Pembangunan Kota Metro', 'Dashboard publik yang menampilkan progress pembangunan proyek-proyek strategis secara real-time.', 2026, 'dalam_penilaian'),
(3, 2, 'Sistem Pembayaran Pajak dan Retribusi Multi-Channel', 'Platform pembayaran pajak daerah yang terintegrasi dengan berbagai channel pembayaran digital.', 2026, 'dalam_penilaian'),
(4, 2, 'Aplikasi Cek Pajak dan Tunggakan Online', 'Aplikasi untuk warga mengecek status pajak, tunggakan, dan melakukan pembayaran secara mandiri.', 2026, 'dalam_penilaian'),
(5, 2, 'Portal Karir ASN dan Rekrutmen Online', 'Platform terpadu untuk informasi lowongan, pendaftaran, dan seleksi CPNS/PPPK secara online.', 2026, 'dalam_penilaian'),
(6, 2, 'Sistem Monitoring Ormas dan LSM', 'Platform monitoring aktivitas ormas dan LSM untuk memastikan kegiatan sesuai dengan visi pembangunan.', 2026, 'dalam_penilaian'),
(7, 2, 'Sistem Informasi Legislasi Daerah', 'Portal informasi produk hukum DPRD, agenda sidang, dan hasil pembahasan yang transparan untuk publik.', 2026, 'dalam_penilaian'),
(8, 2, 'Beasiswa Prestasi Siswa Berprestasi', 'Program beasiswa berbasis prestasi akademik dan non-akademik untuk siswa SD hingga SMA di Kota Metro.', 2026, 'dalam_penilaian'),
(9, 2, 'Telemedicine untuk Layanan Kesehatan Dasar', 'Platform konsultasi kesehatan jarak jauh dengan dokter untuk layanan kesehatan primer.', 2026, 'dalam_penilaian'),
(10, 2, 'Program Pemeliharaan Drainase Terjadwal', 'Sistem pemeliharaan drainase berkala untuk mencegah banjir dan genangan air.', 2026, 'dalam_penilaian'),
(11, 2, 'Rumah Layak Huni untuk Masyarakat Kurang Mampu', 'Program bantuan renovasi rumah tidak layak huni (RTLH) dengan pendampingan teknis.', 2026, 'dalam_penilaian'),
(12, 2, 'Operasi Yustisi Periodik Berbasis Data', 'Operasi penegakan Perda yang terukur dan berbasis data pelanggaran di lapangan.', 2026, 'dalam_penilaian'),
(13, 2, 'Program Edukasi Pencegahan Kebakaran di Sekolah', 'Kampanye dan simulasi pencegahan kebakaran untuk siswa di seluruh sekolah Kota Metro.', 2026, 'dalam_penilaian'),
(14, 2, 'Pendampingan Wirausaha untuk Penerima Bantuan Sosial', 'Program pelatihan dan pendampingan wirausaha bagi penerima bansos untuk kemandirian ekonomi.', 2026, 'dalam_penilaian'),
(15, 2, 'Forum Anak Kota Metro', 'Wadah partisipasi anak dalam perencanaan pembangunan dan pengambilan kebijakan yang berdampak pada anak.', 2026, 'dalam_penilaian'),
(16, 2, 'Sekolah Lapang Pertanian Terpadu', 'Program pelatihan pertanian modern dengan demonstrasi plot untuk petani di Kota Metro.', 2026, 'dalam_penilaian'),
(17, 2, 'Program Kompensasi Emisi Karbon', 'Insentif bagi warga yang mengurangi sampah dan emisi karbon melalui program penghijauan dan komposting.', 2026, 'dalam_penilaian'),
(18, 2, 'Pelayanan Administrasi Kependudukan di Mall', 'Gerai pelayanan kependudukan di pusat perbelanjaan untuk kemudahan akses masyarakat.', 2026, 'dalam_penilaian'),
(19, 2, 'Program Parkir Elektronik Terintegrasi', 'Sistem parkir elektronik cashless di seluruh area parkir publik Kota Metro.', 2026, 'dalam_penilaian'),
(20, 2, 'Metro Free WiFi di Ruang Publik', 'Penyediaan akses internet gratis di taman, alun-alun, dan ruang publik lainnya.', 2026, 'dalam_penilaian'),
(21, 2, 'Program Magang UMKM untuk Pengangguran', 'Program magang dan penempatan kerja di UMKM binaan untuk mengurangi pengangguran.', 2026, 'dalam_penilaian'),
(22, 2, 'Layanan Perizinan Drive-Thru', 'Layanan perizinan tanpa turun dari kendaraan untuk efisiensi waktu masyarakat.', 2026, 'dalam_penilaian'),
(23, 2, 'Metro Creative Hub', 'Co-working space dan pusat kreativitas bagi pelaku ekonomi kreatif dengan fasilitas lengkap.', 2026, 'dalam_penilaian'),
(24, 2, 'Program Literasi Digital untuk Lansia', 'Pelatihan penggunaan teknologi digital dan smartphone bagi lansia agar tidak gaptek.', 2026, 'dalam_penilaian'),
(25, 2, 'Pameran Produk Lokal Kota Metro', 'Event pameran rutin untuk promosi produk lokal Kota Metro ke tingkat regional dan nasional.', 2026, 'dalam_penilaian'),
(26, 2, 'Desa Tangguh Bencana', 'Program pembinaan desa/kelurahan menjadi tangguh bencana dengan pelatihan dan simulasi rutin.', 2026, 'dalam_penilaian');

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 7: VIEWS
-- ══════════════════════════════════════════════════════════════════════════════

-- VIEW 1: Rekap Lengkap per Inovasi dengan Ranking
CREATE OR REPLACE VIEW v_rekap_lengkap AS
SELECT 
    i.inovasi_id,
    i.judul_inovasi,
    pd.nama_opd,
    pd.singkatan AS singkatan_opd,
    ko.nama_kategori,
    bi.nama_bentuk AS bentuk_inovasi,
    i.tahun_implementasi,
    i.status_inovasi,
    ri.rata_rata_judul,
    ri.rata_rata_indikator,
    ri.rata_rata_total,
    ri.peringkat,
    ri.jumlah_juri_judul,
    ri.jumlah_juri_indikator,
    ri.status_penilaian,
    ri.terakhir_update
FROM inovasi i
LEFT JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
LEFT JOIN kategori_opd ko ON pd.kategori_id = ko.kategori_id
LEFT JOIN bentuk_inovasi bi ON i.bentuk_id = bi.bentuk_id
LEFT JOIN ranking_inovasi ri ON i.inovasi_id = ri.inovasi_id
WHERE i.is_active = TRUE
ORDER BY ri.peringkat ASC, i.judul_inovasi ASC;

-- VIEW 2: Detail Penilaian per Juri per Inovasi
CREATE OR REPLACE VIEW v_detail_penilaian_juri AS
SELECT 
    rp.rekap_id,
    i.inovasi_id,
    i.judul_inovasi,
    pd.nama_opd,
    u.user_id AS juri_id,
    u.nama AS nama_juri,
    u.role AS role_juri,
    rp.skor_judul,
    rp.skor_indikator,
    rp.skor_total,
    rp.persentase_lengkap,
    rp.jumlah_kriteria_dinilai,
    rp.jumlah_indikator_dinilai,
    rp.status_lengkap,
    rp.terakhir_update
FROM rekap_penilaian rp
JOIN inovasi i ON rp.inovasi_id = i.inovasi_id
JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
JOIN users u ON rp.juri_id = u.user_id
WHERE i.is_active = TRUE
ORDER BY i.inovasi_id, u.nama;

-- ══════════════════════════════════════════════════════════════════════════════
-- BAGIAN 8: SAMPLE QUERIES (UNTUK TESTING)
-- ══════════════════════════════════════════════════════════════════════════════

-- Query untuk melihat ranking top 10
-- SELECT * FROM v_rekap_lengkap WHERE peringkat IS NOT NULL LIMIT 10;

-- Query untuk melihat detail penilaian inovasi tertentu
-- SELECT * FROM v_detail_penilaian_juri WHERE inovasi_id = 1;

-- Query untuk statistik dashboard
-- SELECT 
--     COUNT(*) as total_inovasi,
--     COUNT(CASE WHEN status_penilaian = 'lengkap' THEN 1 END) as inovasi_lengkap,
--     COUNT(CASE WHEN status_penilaian = 'sebagian' THEN 1 END) as inovasi_sebagian,
--     COUNT(CASE WHEN status_penilaian = 'belum' THEN 1 END) as inovasi_belum,
--     AVG(rata_rata_total) as rata_rata_skor_keseluruhan
-- FROM v_rekap_lengkap;

-- Query untuk progress penilaian per juri
-- SELECT 
--     nama_juri,
--     role_juri,
--     COUNT(DISTINCT inovasi_id) as total_inovasi_dinilai,
--     AVG(persentase_lengkap) as rata_rata_progress,
--     SUM(CASE WHEN status_lengkap = 'lengkap' THEN 1 ELSE 0 END) as total_lengkap
-- FROM v_detail_penilaian_juri
-- GROUP BY juri_id, nama_juri, role_juri;

-- ══════════════════════════════════════════════════════════════════════════════
-- SELESAI - DATABASE SIAP DIGUNAKAN
-- ══════════════════════════════════════════════════════════════════════════════

-- Cara Install:
-- 1. Simpan file ini sebagai database_complete.sql
-- 2. Buka terminal/command prompt
-- 3. Jalankan: mysql -u root -p < database_complete.sql
-- 4. Masukkan password MySQL root
-- 5. Database siap digunakan!

-- Catatan Penting:
-- ✅ Total 18 tabel telah dibuat
-- ✅ 105 data inovasi telah dimasukkan
-- ✅ 6 users (1 admin + 5 juri) telah dibuat
-- ✅ 6 kriteria judul dengan 18 parameter
-- ✅ 20 indikator SID dengan 54 parameter
-- ✅ Stored procedures untuk auto-calculate skor
-- ✅ Triggers untuk auto-update rekap dan ranking
-- ✅ 2 Views untuk query kompleks
-- ✅ Password default: admin2027 (admin), juri2027 (juri)
-- ⚠️  SEGERA GANTI PASSWORD setelah install!

-- Dokumentasi lengkap tersedia di:
-- - README_DATABASE.md
-- - DATABASE_DOCUMENTATION.md
-- - API_GUIDE.md

-- Dikembangkan oleh: BAPPERIDA Kota Metro
-- Tahun: 2027
-- Versi: 1.0.0 Final

-- ══════════════════════════════════════════════════════════════════════════════
