-- ══════════════════════════════════════════════════════════════════
--  DATABASE SISTEM PENILAIAN INOVASI DAERAH KOTA METRO 2027
--  BAPPERIDA (Badan Perencanaan, Penelitian dan Pengembangan Daerah)
-- ══════════════════════════════════════════════════════════════════
-- Dibuat untuk menggantikan sistem localStorage dengan database relational
-- yang lebih scalable, aman, dan mudah dikelola
-- ══════════════════════════════════════════════════════════════════

-- Drop database jika sudah ada (untuk fresh installation)
-- DROP DATABASE IF EXISTS db_inovasi_daerah;

-- Buat database baru
CREATE DATABASE IF NOT EXISTS db_inovasi_daerah 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE db_inovasi_daerah;

-- ══════════════════════════════════════════════════════════════════
-- TABEL 1: USERS (Pengguna Sistem)
-- ══════════════════════════════════════════════════════════════════
-- Menyimpan data pengguna: Admin dan Juri
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 2: KATEGORI_OPD
-- ══════════════════════════════════════════════════════════════════
-- Kategori Organisasi Perangkat Daerah
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE kategori_opd (
    kategori_id INT AUTO_INCREMENT PRIMARY KEY,
    kode_kategori VARCHAR(20) NOT NULL UNIQUE,
    nama_kategori VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ══════════════════════════════════════════════════════════════════
-- TABEL 3: PERANGKAT_DAERAH (OPD)
-- ══════════════════════════════════════════════════════════════════
-- Organisasi Perangkat Daerah yang mengajukan inovasi
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 4: BENTUK_INOVASI
-- ══════════════════════════════════════════════════════════════════
-- Jenis/bentuk inovasi daerah
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE bentuk_inovasi (
    bentuk_id INT AUTO_INCREMENT PRIMARY KEY,
    kode_bentuk VARCHAR(20) NOT NULL UNIQUE,
    nama_bentuk VARCHAR(150) NOT NULL,
    deskripsi TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ══════════════════════════════════════════════════════════════════
-- TABEL 5: INOVASI
-- ══════════════════════════════════════════════════════════════════
-- Data inovasi yang diajukan oleh OPD
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 6: KRITERIA_JUDUL
-- ══════════════════════════════════════════════════════════════════
-- Kriteria penilaian judul inovasi (6 kriteria)
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 7: PARAMETER_KRITERIA_JUDUL
-- ══════════════════════════════════════════════════════════════════
-- Parameter penilaian untuk setiap kriteria judul (nilai 1-3)
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE parameter_kriteria_judul (
    parameter_id INT AUTO_INCREMENT PRIMARY KEY,
    kriteria_id INT NOT NULL,
    nilai_parameter TINYINT NOT NULL CHECK (nilai_parameter BETWEEN 1 AND 3),
    deskripsi_parameter TEXT NOT NULL,
    urutan INT NOT NULL,
    FOREIGN KEY (kriteria_id) REFERENCES kriteria_judul(kriteria_id) ON DELETE CASCADE,
    INDEX idx_kriteria (kriteria_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ══════════════════════════════════════════════════════════════════
-- TABEL 8: INDIKATOR_SID
-- ══════════════════════════════════════════════════════════════════
-- Indikator Sistem Inovasi Daerah (No. 16-35)
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 9: PARAMETER_INDIKATOR_SID
-- ══════════════════════════════════════════════════════════════════
-- Parameter penilaian untuk setiap indikator SID (nilai 1-3)
-- ══════════════════════════════════════════════════════════════════

CREATE TABLE parameter_indikator_sid (
    parameter_id INT AUTO_INCREMENT PRIMARY KEY,
    indikator_id INT NOT NULL,
    nilai_parameter TINYINT NOT NULL CHECK (nilai_parameter BETWEEN 1 AND 3),
    deskripsi_parameter TEXT NOT NULL,
    urutan INT NOT NULL,
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id) ON DELETE CASCADE,
    INDEX idx_indikator (indikator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ══════════════════════════════════════════════════════════════════
-- TABEL 10: PENILAIAN_JUDUL
-- ══════════════════════════════════════════════════════════════════
-- Hasil penilaian judul inovasi oleh juri
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 11: PENILAIAN_INDIKATOR
-- ══════════════════════════════════════════════════════════════════
-- Hasil penilaian indikator SID oleh juri
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 12: PENILAIAN_MONEV
-- ══════════════════════════════════════════════════════════════════
-- Data monitoring & evaluasi untuk indikator khusus
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 13: PENILAIAN_VIDEO
-- ══════════════════════════════════════════════════════════════════
-- Data video dokumentasi inovasi
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 14: REKAP_PENILAIAN
-- ══════════════════════════════════════════════════════════════════
-- Rekapitulasi total skor per inovasi per juri
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 15: RANKING_INOVASI
-- ══════════════════════════════════════════════════════════════════
-- Peringkat inovasi berdasarkan rata-rata skor
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 16: LOG_AKTIVITAS
-- ══════════════════════════════════════════════════════════════════
-- Log semua aktivitas pengguna untuk audit trail
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 17: PENGATURAN_SISTEM
-- ══════════════════════════════════════════════════════════════════
-- Konfigurasi sistem
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- TABEL 18: DOKUMEN_PENDUKUNG
-- ══════════════════════════════════════════════════════════════════
-- Dokumen pendukung inovasi
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- VIEW: v_rekap_lengkap
-- ══════════════════════════════════════════════════════════════════
-- View untuk dashboard dengan data lengkap
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- VIEW: v_detail_penilaian_juri
-- ══════════════════════════════════════════════════════════════════
-- View detail penilaian per juri
-- ══════════════════════════════════════════════════════════════════

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

-- ══════════════════════════════════════════════════════════════════
-- END OF SCHEMA DEFINITION
-- ══════════════════════════════════════════════════════════════════
