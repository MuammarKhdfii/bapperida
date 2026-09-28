# 📊 DOKUMENTASI DATABASE SISTEM PENILAIAN INOVASI DAERAH 2027

## BAPPERIDA KOTA METRO

---

## 📋 Daftar Isi
- [1. Gambaran Umum Sistem](#1-gambaran-umum-sistem)
- [2. Struktur Database](#2-struktur-database)
- [3. Panduan Instalasi](#3-panduan-instalasi)
- [4. Migrasi dari localStorage ke Database](#4-migrasi-dari-localstorage-ke-database)
- [5. Diagram ERD](#5-diagram-erd)
- [6. Query Penting](#6-query-penting)

---

## 1. Gambaran Umum Sistem

### Tentang Sistem
Sistem Penilaian Inovasi Daerah adalah aplikasi berbasis web untuk mengelola penilaian inovasi-inovasi yang diajukan oleh Organisasi Perangkat Daerah (OPD) di Kota Metro.

### Fitur Utama
- ✅ **Autentikasi Multi-Role**: Admin, Juri Judul, Juri SID
- ✅ **Penilaian Judul Inovasi**: 6 kriteria dengan bobot berbeda
- ✅ **Penilaian Indikator SID**: 20 indikator (No. 16-35)
- ✅ **Dashboard Admin**: Rekapitulasi lengkap semua penilaian
- ✅ **Ranking Otomatis**: Berdasarkan rata-rata skor dari semua juri
- ✅ **Cetak & Ekspor**: PDF dan Excel

### Teknologi
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: PHP (rekomendasi) atau Node.js
- **Database**: MySQL/MariaDB
- **Storage Saat Ini**: localStorage (browser)

---

## 2. Struktur Database

### 📊 **18 Tabel Utama**

#### **A. Manajemen Pengguna**

##### 1. `users`
Menyimpan data pengguna sistem (Admin dan Juri)

```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- hash dengan bcrypt
    nama VARCHAR(150) NOT NULL,
    role ENUM('admin', 'juri_judul', 'juri_sid') NOT NULL,
    label VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    no_telepon VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

**Data Pengguna:**
| Username | Role | Nama Lengkap | Fungsi |
|----------|------|--------------|--------|
| admin | admin | Administrator | Lihat semua data |
| eva.rolia | juri_judul & juri_sid | Dr. Ir. Eva Rolia | Juri ganda |
| arif.joko | juri_judul | Ir. Arif Joko Arwoko | Juri judul |
| mustafa | juri_judul | Mustafa Akhyar, S.E. | Juri judul |
| sowiyah | juri_sid | Prof. Dr. Dra. Sowiyah M.Pd. | Juri SID |
| etik.puji | juri_sid | Prof. Dr. Ir. Etik Puji Handayani | Juri SID |

---

#### **B. Data Master OPD**

##### 2. `kategori_opd`
Klasifikasi jenis OPD

```sql
CREATE TABLE kategori_opd (
    kategori_id INT AUTO_INCREMENT PRIMARY KEY,
    kode_kategori VARCHAR(20) NOT NULL UNIQUE,
    nama_kategori VARCHAR(100) NOT NULL,
    deskripsi TEXT
);
```

**Data:**
- `OPD` - OPD Utama (Dinas, Badan, Inspektorat, dll)
- `PENDIDIKAN` - UPTD Pendidikan (SD, SMP Negeri/Swasta)
- `KESEHATAN` - UPTD Kesehatan (Puskesmas, RSUD)

##### 3. `perangkat_daerah`
Data OPD yang mengajukan inovasi

```sql
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
    FOREIGN KEY (kategori_id) REFERENCES kategori_opd(kategori_id)
);
```

---

#### **C. Data Master Inovasi**

##### 4. `bentuk_inovasi`
Jenis/bentuk inovasi daerah

```sql
CREATE TABLE bentuk_inovasi (
    bentuk_id INT AUTO_INCREMENT PRIMARY KEY,
    kode_bentuk VARCHAR(20) NOT NULL UNIQUE,
    nama_bentuk VARCHAR(150) NOT NULL,
    deskripsi TEXT
);
```

**Data:**
- `TATA_KELOLA` - Tata Kelola Pemerintahan Daerah
- `LAYANAN_PUBLIK` - Pelayanan Publik
- `TATA_KELOLA_LAYANAN` - Gabungan keduanya

##### 5. `inovasi`
Data inovasi yang dinilai

```sql
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
    status_inovasi ENUM('draft', 'diajukan', 'dalam_penilaian', 'selesai', 'ditolak'),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (opd_id) REFERENCES perangkat_daerah(opd_id),
    FOREIGN KEY (bentuk_id) REFERENCES bentuk_inovasi(bentuk_id)
);
```

**Contoh Data:**
```sql
INSERT INTO inovasi (opd_id, bentuk_id, judul_inovasi, ringkasan, tahun_implementasi) VALUES
(1, 1, 'Digitalisasi Laporan Ikhtisar Pengawasan APIP', 
 'Transformasi pengelolaan hasil pengawasan...', 2026);
```

---

#### **D. Kriteria dan Parameter Penilaian**

##### 6. `kriteria_judul`
6 Kriteria Penilaian Judul Inovasi

```sql
CREATE TABLE kriteria_judul (
    kriteria_id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_kriteria INT NOT NULL,
    nama_kriteria VARCHAR(200) NOT NULL,
    bobot DECIMAL(3,1) NOT NULL,
    deskripsi TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    urutan INT NOT NULL
);
```

**Data 6 Kriteria:**

| No | Kriteria | Bobot | Skor Max |
|----|----------|-------|----------|
| 1 | Kebaruan & Orisinalitas | 5 | 15 |
| 2 | Relevansi & Dampak | 5 | 15 |
| 3 | Kelayakan & Kemudahan | 4 | 12 |
| 4 | Keberlanjutan & Skalabilitas | 3 | 9 |
| 5 | Kolaborasi & Keterlibatan | 2 | 6 |
| 6 | Dokumentasi & Presentasi | 2 | 6 |
| **TOTAL** | | **21** | **63** |

##### 7. `parameter_kriteria_judul`
Parameter untuk setiap kriteria (nilai 1-3)

```sql
CREATE TABLE parameter_kriteria_judul (
    parameter_id INT AUTO_INCREMENT PRIMARY KEY,
    kriteria_id INT NOT NULL,
    nilai_parameter TINYINT NOT NULL CHECK (nilai_parameter BETWEEN 1 AND 3),
    deskripsi_parameter TEXT NOT NULL,
    urutan INT NOT NULL,
    FOREIGN KEY (kriteria_id) REFERENCES kriteria_judul(kriteria_id)
);
```

**Contoh Parameter:**
- Kriteria 1, Nilai 1: "Modifikasi kecil dari praktik yang sudah ada"
- Kriteria 1, Nilai 2: "Adaptasi dengan penyesuaian bermakna"
- Kriteria 1, Nilai 3: "Gagasan benar-benar baru, belum pernah diterapkan"

##### 8. `indikator_sid`
20 Indikator SID yang aktif (No. 16-35)

```sql
CREATE TABLE indikator_sid (
    indikator_id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_indikator INT NOT NULL,      -- Nomor asli: 16-35
    nomor_tampil INT NOT NULL,          -- Nomor tampilan: 1-20
    nama_indikator VARCHAR(300) NOT NULL,
    bobot DECIMAL(3,1) NOT NULL,
    tipe_indikator ENUM('radio', 'monev', 'video') DEFAULT 'radio',
    keterangan TEXT,
    is_skip BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);
```

**Daftar 20 Indikator Aktif:**

| No Tampil | No Asli | Nama Indikator | Bobot | Tipe |
|-----------|---------|----------------|-------|------|
| 1 | 16 | Regulasi Inovasi Daerah | 3.0 | radio |
| 2 | 17 | Ketersediaan & Peran SDM | 2.0 | radio |
| 3 | 18 | Dukungan Anggaran | 2.0 | radio |
| 4 | 19 | Alat Kerja | 2.0 | radio |
| 5 | 20 | Bimtek Inovasi | 1.0 | radio |
| 6 | 21 | Integrasi dalam RKPD | 2.0 | radio |
| 7 | 22 | Keterlibatan Aktor | 1.0 | radio |
| 8 | 23 | Pelaksana Inovasi | 1.0 | radio |
| 9 | 24 | Jejaring Inovasi | 1.0 | radio |
| 10 | 25 | Sosialisasi Inovasi | 1.0 | radio |
| 11 | 26 | Pedoman Teknis | 1.0 | radio |
| 12 | 27 | Kemudahan Informasi | 1.0 | radio |
| 13 | 28 | Kecepatan Layanan | 2.0 | radio |
| 14 | 29 | Penyelesaian Pengaduan | 1.0 | radio |
| 15 | 30 | Layanan Terintegrasi | 2.0 | radio |
| 16 | 31 | Replikasi Inovasi | 3.0 | radio |
| 17 | 32 | Kecepatan Penciptaan | 2.0 | radio |
| 18 | 33 | Kemanfaatan Inovasi | 3.0 | radio |
| 19 | 34 | Monev (Dokumen) | 0 | monev |
| 20 | 35 | Video Inovasi | 0 | video |
| **TOTAL BOBOT** | | | **30** | |

**Catatan:**
- No. 1-15 (SPD) dan No. 36 **DIKECUALIKAN**
- Indikator 19-20 tidak menghasilkan skor (tipe khusus)

##### 9. `parameter_indikator_sid`
Parameter untuk setiap indikator (nilai 1-3)

```sql
CREATE TABLE parameter_indikator_sid (
    parameter_id INT AUTO_INCREMENT PRIMARY KEY,
    indikator_id INT NOT NULL,
    nilai_parameter TINYINT NOT NULL CHECK (nilai_parameter BETWEEN 1 AND 3),
    deskripsi_parameter TEXT NOT NULL,
    urutan INT NOT NULL,
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id)
);
```

---

#### **E. Data Penilaian**

##### 10. `penilaian_judul`
Hasil penilaian judul oleh juri

```sql
CREATE TABLE penilaian_judul (
    penilaian_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    kriteria_id INT NOT NULL,
    nilai_dipilih TINYINT NOT NULL CHECK (nilai_dipilih BETWEEN 1 AND 3),
    skor DECIMAL(5,2) NOT NULL,  -- nilai × bobot
    catatan TEXT,
    status_penilaian ENUM('draft', 'final') DEFAULT 'draft',
    dinilai_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    FOREIGN KEY (juri_id) REFERENCES users(user_id),
    FOREIGN KEY (kriteria_id) REFERENCES kriteria_judul(kriteria_id),
    UNIQUE KEY unique_penilaian (inovasi_id, juri_id, kriteria_id)
);
```

**Contoh Data:**
```sql
-- Juri Eva Rolia menilai inovasi ID 1, kriteria 1, memilih nilai 3
INSERT INTO penilaian_judul (inovasi_id, juri_id, kriteria_id, nilai_dipilih, skor) 
VALUES (1, 2, 1, 3, 15.00);  -- 3 × 5 = 15
```

##### 11. `penilaian_indikator`
Hasil penilaian indikator SID oleh juri

```sql
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
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    FOREIGN KEY (juri_id) REFERENCES users(user_id),
    FOREIGN KEY (indikator_id) REFERENCES indikator_sid(indikator_id),
    UNIQUE KEY unique_penilaian (inovasi_id, juri_id, indikator_id)
);
```

##### 12. `penilaian_monev`
Data dokumen monitoring & evaluasi

```sql
CREATE TABLE penilaian_monev (
    monev_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    indikator_id INT NOT NULL,  -- Indikator No. 34
    jumlah_dokumen INT DEFAULT 0,
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    UNIQUE KEY unique_monev (inovasi_id, juri_id, indikator_id)
);
```

##### 13. `penilaian_video`
Data video dokumentasi inovasi

```sql
CREATE TABLE penilaian_video (
    video_id INT AUTO_INCREMENT PRIMARY KEY,
    inovasi_id INT NOT NULL,
    juri_id INT NOT NULL,
    indikator_id INT NOT NULL,  -- Indikator No. 35
    url_video VARCHAR(500),
    judul_video VARCHAR(300),
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    UNIQUE KEY unique_video (inovasi_id, juri_id, indikator_id)
);
```

---

#### **F. Rekapitulasi dan Ranking**

##### 14. `rekap_penilaian`
Rekapitulasi skor per inovasi per juri

```sql
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
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    FOREIGN KEY (juri_id) REFERENCES users(user_id),
    UNIQUE KEY unique_rekap (inovasi_id, juri_id)
);
```

##### 15. `ranking_inovasi`
Peringkat inovasi berdasarkan rata-rata skor

```sql
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
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    UNIQUE KEY unique_ranking (inovasi_id)
);
```

**Cara Menghitung Ranking:**
```
1. Rata-rata Skor Judul = SUM(skor_judul_per_juri) / jumlah_juri_judul
2. Rata-rata Skor Indikator = SUM(skor_indikator_per_juri) / jumlah_juri_indikator
3. Total = Rata-rata Judul + Rata-rata Indikator
4. Ranking: ORDER BY rata_rata_total DESC
```

---

#### **G. Sistem dan Audit**

##### 16. `log_aktivitas`
Log semua aktivitas untuk audit trail

```sql
CREATE TABLE log_aktivitas (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    aktivitas VARCHAR(100) NOT NULL,
    modul VARCHAR(50) NOT NULL,
    deskripsi TEXT,
    ip_address VARCHAR(45),
    user_agent VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

**Contoh Log:**
```sql
INSERT INTO log_aktivitas (user_id, aktivitas, modul, deskripsi) VALUES
(2, 'LOGIN', 'AUTH', 'Juri Eva Rolia berhasil login'),
(2, 'SIMPAN_PENILAIAN', 'JUDUL', 'Menyimpan penilaian inovasi ID 5'),
(3, 'CETAK_LAPORAN', 'LAPORAN', 'Mencetak laporan penilaian');
```

##### 17. `pengaturan_sistem`
Konfigurasi sistem

```sql
CREATE TABLE pengaturan_sistem (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    kunci VARCHAR(100) NOT NULL UNIQUE,
    nilai TEXT,
    tipe_data ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
    deskripsi TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);
```

##### 18. `dokumen_pendukung`
File dokumen pendukung inovasi

```sql
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
    FOREIGN KEY (inovasi_id) REFERENCES inovasi(inovasi_id),
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);
```

---

## 3. Panduan Instalasi

### **Step 1: Persiapan Database**

```bash
# Login ke MySQL
mysql -u root -p

# Jalankan script schema
mysql -u root -p < database_schema.sql

# Jalankan script seed data
mysql -u root -p < database_seed.sql
```

### **Step 2: Konfigurasi Koneksi**

Buat file `config/database.php`:

```php
<?php
// Konfigurasi Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'db_inovasi_daerah');
define('DB_USER', 'root');
define('DB_PASS', 'password_anda');
define('DB_CHARSET', 'utf8mb4');

// Koneksi PDO
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Koneksi database gagal: " . $e->getMessage());
}
?>
```

### **Step 3: Testing Koneksi**

```php
<?php
require_once 'config/database.php';

// Test query
$stmt = $pdo->query("SELECT COUNT(*) as total FROM users");
$result = $stmt->fetch();
echo "Jumlah pengguna: " . $result['total'];
?>
```

---

## 4. Migrasi dari localStorage ke Database

### **Script PHP untuk Migrasi**

```php
<?php
// migrate_from_localstorage.php
require_once 'config/database.php';

// Terima data JSON dari localStorage
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Loop setiap inovasi
foreach ($data as $judul_inovasi => $penilaian) {
    
    // 1. Cari/buat data inovasi
    $stmt = $pdo->prepare("SELECT inovasi_id FROM inovasi WHERE judul_inovasi = ?");
    $stmt->execute([$judul_inovasi]);
    $inovasi = $stmt->fetch();
    
    if (!$inovasi) {
        // Insert inovasi baru
        $stmt = $pdo->prepare("INSERT INTO inovasi (opd_id, bentuk_id, judul_inovasi, ringkasan, tahun_implementasi, status_inovasi) VALUES (1, 1, ?, ?, 2026, 'dalam_penilaian')");
        $stmt->execute([$judul_inovasi, 'Ringkasan']);
        $inovasi_id = $pdo->lastInsertId();
    } else {
        $inovasi_id = $inovasi['inovasi_id'];
    }
    
    // 2. Migrasi penilaian judul
    if (isset($penilaian['judulState'])) {
        foreach ($penilaian['judulState'] as $nama_juri => $nilai_kriteria) {
            // Cari juri_id
            $stmt = $pdo->prepare("SELECT user_id FROM users WHERE nama = ?");
            $stmt->execute([$nama_juri]);
            $juri = $stmt->fetch();
            if (!$juri) continue;
            $juri_id = $juri['user_id'];
            
            // Loop setiap kriteria
            foreach ($nilai_kriteria as $kriteria_no => $nilai) {
                if (empty($nilai)) continue;
                
                // Hitung skor
                $stmt = $pdo->prepare("SELECT kriteria_id, bobot FROM kriteria_judul WHERE nomor_kriteria = ?");
                $stmt->execute([$kriteria_no]);
                $kriteria = $stmt->fetch();
                if (!$kriteria) continue;
                
                $skor = $nilai * $kriteria['bobot'];
                
                // Insert penilaian
                $stmt = $pdo->prepare("
                    INSERT INTO penilaian_judul (inovasi_id, juri_id, kriteria_id, nilai_dipilih, skor, status_penilaian) 
                    VALUES (?, ?, ?, ?, ?, 'final')
                    ON DUPLICATE KEY UPDATE nilai_dipilih = ?, skor = ?
                ");
                $stmt->execute([$inovasi_id, $juri_id, $kriteria['kriteria_id'], $nilai, $skor, $nilai, $skor]);
            }
        }
    }
    
    // 3. Migrasi penilaian indikator
    if (isset($penilaian['juriState'])) {
        foreach ($penilaian['juriState'] as $nama_juri => $data_juri) {
            $stmt = $pdo->prepare("SELECT user_id FROM users WHERE nama = ?");
            $stmt->execute([$nama_juri]);
            $juri = $stmt->fetch();
            if (!$juri) continue;
            $juri_id = $juri['user_id'];
            
            // Radio values
            if (isset($data_juri['radio'])) {
                foreach ($data_juri['radio'] as $indikator_no => $nilai) {
                    if (empty($nilai)) continue;
                    
                    $stmt = $pdo->prepare("SELECT indikator_id, bobot FROM indikator_sid WHERE nomor_indikator = ?");
                    $stmt->execute([$indikator_no]);
                    $indikator = $stmt->fetch();
                    if (!$indikator) continue;
                    
                    $skor = $nilai * $indikator['bobot'];
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO penilaian_indikator (inovasi_id, juri_id, indikator_id, nilai_dipilih, skor, status_penilaian) 
                        VALUES (?, ?, ?, ?, ?, 'final')
                        ON DUPLICATE KEY UPDATE nilai_dipilih = ?, skor = ?
                    ");
                    $stmt->execute([$inovasi_id, $juri_id, $indikator['indikator_id'], $nilai, $skor, $nilai, $skor]);
                }
            }
            
            // Monev data
            if (isset($data_juri['monev'])) {
                foreach ($data_juri['monev'] as $indikator_no => $jumlah) {
                    $keterangan = $data_juri['monevKet'][$indikator_no] ?? '';
                    
                    $stmt = $pdo->prepare("SELECT indikator_id FROM indikator_sid WHERE nomor_indikator = ? AND tipe_indikator = 'monev'");
                    $stmt->execute([$indikator_no]);
                    $indikator = $stmt->fetch();
                    if (!$indikator) continue;
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO penilaian_monev (inovasi_id, juri_id, indikator_id, jumlah_dokumen, keterangan) 
                        VALUES (?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE jumlah_dokumen = ?, keterangan = ?
                    ");
                    $stmt->execute([$inovasi_id, $juri_id, $indikator['indikator_id'], $jumlah, $keterangan, $jumlah, $keterangan]);
                }
            }
            
            // Video data
            if (isset($data_juri['videoUrl'])) {
                foreach ($data_juri['videoUrl'] as $indikator_no => $url) {
                    $judul = $data_juri['videoKet'][$indikator_no] ?? '';
                    
                    $stmt = $pdo->prepare("SELECT indikator_id FROM indikator_sid WHERE nomor_indikator = ? AND tipe_indikator = 'video'");
                    $stmt->execute([$indikator_no]);
                    $indikator = $stmt->fetch();
                    if (!$indikator) continue;
                    
                    $stmt = $pdo->prepare("
                        INSERT INTO penilaian_video (inovasi_id, juri_id, indikator_id, url_video, judul_video) 
                        VALUES (?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE url_video = ?, judul_video = ?
                    ");
                    $stmt->execute([$inovasi_id, $juri_id, $indikator['indikator_id'], $url, $judul, $url, $judul]);
                }
            }
        }
    }
    
    // 4. Update rekap
    update_rekap_penilaian($pdo, $inovasi_id);
}

// 5. Update ranking
update_ranking_inovasi($pdo);

echo json_encode(['success' => true, 'message' => 'Migrasi berhasil']);

function update_rekap_penilaian($pdo, $inovasi_id) {
    // ... implementasi update rekap ...
}

function update_ranking_inovasi($pdo) {
    // ... implementasi update ranking ...
}
?>
```

### **JavaScript untuk Kirim Data**

```javascript
// migrate.js
async function migrateToDatabase() {
    // Ambil semua data dari localStorage
    const allData = JSON.parse(localStorage.getItem('iid2026_all_draf') || '{}');
    
    // Kirim ke server
    const response = await fetch('/api/migrate_from_localstorage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(allData)
    });
    
    const result = await response.json();
    
    if (result.success) {
        alert('Migrasi berhasil! Data telah tersimpan ke database.');
        // Backup localStorage
        localStorage.setItem('iid2026_all_draf_backup', JSON.stringify(allData));
        // Hapus data lama (opsional)
        // localStorage.removeItem('iid2026_all_draf');
    } else {
        alert('Migrasi gagal: ' + result.message);
    }
}

// Panggil fungsi
migrateToDatabase();
```

---

## 5. Diagram ERD

```
┌─────────────────┐
│     USERS       │
│─────────────────│
│ • user_id (PK)  │◄───┐
│ • username      │    │
│ • password      │    │
│ • nama          │    │
│ • role          │    │
└─────────────────┘    │
                       │
        ┌──────────────┴──────────────────────────────────┐
        │                                                  │
┌───────┴──────────┐  ┌────────────────────┐  ┌──────────┴───────────┐
│ PENILAIAN_JUDUL  │  │ PENILAIAN_INDIKATOR│  │  REKAP_PENILAIAN     │
│──────────────────│  │────────────────────│  │──────────────────────│
│ • penilaian_id   │  │ • penilaian_id     │  │ • rekap_id          │
│ • inovasi_id (FK)│  │ • inovasi_id (FK)  │  │ • inovasi_id (FK)   │
│ • juri_id (FK)   │  │ • juri_id (FK)     │  │ • juri_id (FK)      │
│ • kriteria_id(FK)│  │ • indikator_id(FK) │  │ • skor_judul        │
│ • nilai_dipilih  │  │ • nilai_dipilih    │  │ • skor_indikator    │
│ • skor           │  │ • skor             │  │ • skor_total        │
└──────────────────┘  └────────────────────┘  └─────────────────────┘
         │                      │
         │                      │
         └──────────┬───────────┘
                    │
             ┌──────┴─────────┐
             │    INOVASI     │
             │────────────────│
             │ • inovasi_id   │
             │ • opd_id (FK)  │──────┐
             │ • bentuk_id(FK)│──┐   │
             │ • judul_inovasi│  │   │
             │ • ringkasan    │  │   │
             │ • tahun_impl.  │  │   │
             └────────────────┘  │   │
                    │            │   │
          ┌─────────┴────────┐   │   │
          │                  │   │   │
┌─────────┴──────────┐  ┌───┴───┴───┴──────────┐
│ RANKING_INOVASI    │  │ PERANGKAT_DAERAH     │
│────────────────────│  │──────────────────────│
│ • ranking_id       │  │ • opd_id (PK)        │
│ • inovasi_id (FK)  │  │ • kategori_id (FK)   │
│ • rata_rata_judul  │  │ • nama_opd           │
│ • rata_rata_sid    │  └──────────────────────┘
│ • rata_rata_total  │            │
│ • peringkat        │  ┌─────────┴──────────┐
└────────────────────┘  │  KATEGORI_OPD      │
                        │────────────────────│
┌───────────────────────┐ • kategori_id (PK) │
│ KRITERIA_JUDUL      │ │ • nama_kategori    │
│─────────────────────│ └────────────────────┘
│ • kriteria_id (PK)  │
│ • nama_kriteria     │
│ • bobot             │  ┌──────────────────────┐
└─────────────────────┘  │ BENTUK_INOVASI       │
         │               │──────────────────────│
┌────────┴───────────────┤ • bentuk_id (PK)     │
│ PARAMETER_KRITERIA_  │ │ • nama_bentuk        │
│ JUDUL                │ └──────────────────────┘
│──────────────────────│
│ • parameter_id (PK)  │
│ • kriteria_id (FK)   │
│ • nilai_parameter    │
│ • deskripsi_param.   │
└──────────────────────┘

┌─────────────────────┐
│ INDIKATOR_SID       │
│─────────────────────│
│ • indikator_id (PK) │
│ • nomor_indikator   │
│ • nomor_tampil      │
│ • nama_indikator    │
│ • bobot             │
│ • tipe_indikator    │
└─────────────────────┘
         │
┌────────┴────────────────┐
│ PARAMETER_INDIKATOR_SID │
│─────────────────────────│
│ • parameter_id (PK)     │
│ • indikator_id (FK)     │
│ • nilai_parameter       │
│ • deskripsi_parameter   │
└─────────────────────────┘
```

---

## 6. Query Penting

### **A. Laporan Dashboard Admin**

```sql
-- Rekap lengkap semua inovasi dengan ranking
SELECT 
    i.inovasi_id,
    i.judul_inovasi,
    pd.nama_opd AS perangkat_daerah,
    ko.nama_kategori AS kategori,
    bi.nama_bentuk AS bentuk_inovasi,
    ri.rata_rata_judul,
    ri.rata_rata_indikator,
    ri.rata_rata_total,
    ri.peringkat,
    ri.jumlah_juri_judul,
    ri.jumlah_juri_indikator,
    ri.status_penilaian
FROM inovasi i
LEFT JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
LEFT JOIN kategori_opd ko ON pd.kategori_id = ko.kategori_id
LEFT JOIN bentuk_inovasi bi ON i.bentuk_id = bi.bentuk_id
LEFT JOIN ranking_inovasi ri ON i.inovasi_id = ri.inovasi_id
WHERE i.is_active = TRUE
ORDER BY ri.peringkat ASC;
```

### **B. Detail Penilaian Per Inovasi**

```sql
-- Skor detail per juri untuk satu inovasi
SELECT 
    u.nama AS nama_juri,
    u.role,
    rp.skor_judul,
    rp.skor_indikator,
    rp.skor_total,
    rp.persentase_lengkap,
    rp.status_lengkap
FROM rekap_penilaian rp
JOIN users u ON rp.juri_id = u.user_id
WHERE rp.inovasi_id = 1  -- ID inovasi
ORDER BY u.nama;
```

### **C. Top 10 Ranking**

```sql
-- Top 10 inovasi berdasarkan skor total
SELECT 
    ri.peringkat,
    i.judul_inovasi,
    pd.nama_opd,
    ri.rata_rata_total,
    ri.rata_rata_judul,
    ri.rata_rata_indikator
FROM ranking_inovasi ri
JOIN inovasi i ON ri.inovasi_id = i.inovasi_id
JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
WHERE ri.peringkat IS NOT NULL
ORDER BY ri.peringkat ASC
LIMIT 10;
```

### **D. Update Rekap Penilaian (Stored Procedure)**

```sql
DELIMITER $$

CREATE PROCEDURE update_rekap_penilaian(IN p_inovasi_id INT, IN p_juri_id INT)
BEGIN
    DECLARE v_skor_judul DECIMAL(6,2);
    DECLARE v_skor_indikator DECIMAL(6,2);
    DECLARE v_jumlah_kriteria INT;
    DECLARE v_jumlah_indikator INT;
    DECLARE v_total_kriteria INT DEFAULT 6;
    DECLARE v_total_indikator INT DEFAULT 18; -- 18 indikator radio
    
    -- Hitung skor judul
    SELECT COALESCE(SUM(skor), 0), COUNT(*)
    INTO v_skor_judul, v_jumlah_kriteria
    FROM penilaian_judul
    WHERE inovasi_id = p_inovasi_id AND juri_id = p_juri_id;
    
    -- Hitung skor indikator
    SELECT COALESCE(SUM(skor), 0), COUNT(*)
    INTO v_skor_indikator, v_jumlah_indikator
    FROM penilaian_indikator
    WHERE inovasi_id = p_inovasi_id AND juri_id = p_juri_id;
    
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

DELIMITER ;
```

### **E. Update Ranking (Stored Procedure)**

```sql
DELIMITER $$

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
```

### **F. Trigger Auto-Update**

```sql
-- Trigger setelah insert/update penilaian judul
DELIMITER $$

CREATE TRIGGER after_penilaian_judul_change
AFTER INSERT ON penilaian_judul
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

CREATE TRIGGER after_penilaian_judul_update
AFTER UPDATE ON penilaian_judul
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

-- Trigger setelah insert/update penilaian indikator
CREATE TRIGGER after_penilaian_indikator_change
AFTER INSERT ON penilaian_indikator
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

CREATE TRIGGER after_penilaian_indikator_update
AFTER UPDATE ON penilaian_indikator
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END$$

DELIMITER ;
```

---

## 🎯 Kesimpulan

Database ini dirancang untuk:
1. ✅ **Skalabilitas**: Dapat menampung ribuan inovasi
2. ✅ **Integritas Data**: Foreign keys dan constraints
3. ✅ **Performa**: Indexing pada kolom yang sering di-query
4. ✅ **Audit Trail**: Log aktivitas lengkap
5. ✅ **Fleksibilitas**: Mudah dimodifikasi sesuai kebutuhan

**Password default semua user**: `juri2027` atau `admin2027`

> ⚠️ **PENTING**: Ganti semua password dengan hash bcrypt di production!

---

Dokumen dibuat: 28 Desember 2024  
Versi: 1.0  
Penyusun: Tim BAPPERIDA Kota Metro
