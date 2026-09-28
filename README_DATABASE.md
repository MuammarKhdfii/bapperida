# 📊 SISTEM PENILAIAN INOVASI DAERAH 2027

## BAPPERIDA Kota Metro - Database & Backend Implementation Guide

---

## 📑 Daftar Dokumen

1. **README_DATABASE.md** (Dokumen ini) - Ringkasan & Quick Start
2. **DATABASE_DOCUMENTATION.md** - Dokumentasi lengkap struktur database
3. **API_GUIDE.md** - Panduan API endpoint dan implementasi
4. **database_schema.sql** - Script SQL untuk membuat database
5. **database_seed.sql** - Script SQL untuk data awal

---

## 🎯 Ringkasan Sistem

### Tentang
Sistem Penilaian Inovasi Daerah adalah aplikasi web untuk mengelola dan menilai inovasi-inovasi yang diajukan oleh Organisasi Perangkat Daerah (OPD) di Kota Metro. Sistem ini mendukung penilaian oleh multiple juri dengan 2 jenis penilaian:

1. **Penilaian Judul Inovasi** - 6 kriteria kualitas (max 63 poin)
2. **Penilaian Indikator SID** - 20 indikator (No. 16-35, max 90 poin)

### Status Saat Ini
- ✅ **Frontend**: Sudah lengkap (HTML, CSS, JavaScript)
- ✅ **Storage**: Menggunakan localStorage (browser)
- ⏳ **Backend**: Perlu dibangun (PHP/Node.js + MySQL)
- ⏳ **Database**: Schema sudah siap, perlu implementasi

---

## 🚀 Quick Start

### Step 1: Install Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database dan tabel
mysql -u root -p < database_schema.sql

# Isi data awal
mysql -u root -p < database_seed.sql
```

### Step 2: Konfigurasi Backend

Buat file `config/database.php`:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'db_inovasi_daerah');
define('DB_USER', 'root');
define('DB_PASS', 'your_password');

$dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
$pdo = new PDO($dsn, DB_USER, DB_PASS);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>
```

### Step 3: Testing

```php
<?php
require_once 'config/database.php';

// Test query
$stmt = $pdo->query("SELECT COUNT(*) as total FROM users");
$result = $stmt->fetch();
echo "Jumlah pengguna: " . $result['total'];
// Output: Jumlah pengguna: 6
?>
```

---

## 📊 Struktur Database

### Overview

| Kategori | Tabel | Jumlah |
|----------|-------|--------|
| **Manajemen Pengguna** | users | 1 |
| **Data Master OPD** | kategori_opd, perangkat_daerah, bentuk_inovasi | 3 |
| **Data Master Inovasi** | inovasi | 1 |
| **Kriteria & Parameter** | kriteria_judul, parameter_kriteria_judul, indikator_sid, parameter_indikator_sid | 4 |
| **Data Penilaian** | penilaian_judul, penilaian_indikator, penilaian_monev, penilaian_video | 4 |
| **Rekapitulasi** | rekap_penilaian, ranking_inovasi | 2 |
| **Sistem** | log_aktivitas, pengaturan_sistem, dokumen_pendukung | 3 |
| **TOTAL** | | **18 Tabel** |

### Tabel Kunci

#### 1. users
Menyimpan data admin dan juri

| user_id | username | nama | role | password |
|---------|----------|------|------|----------|
| 1 | admin | Administrator | admin | admin2027 |
| 2 | eva.rolia | Dr. Ir. Eva Rolia | juri_judul | juri2027 |
| 5 | sowiyah | Prof. Dr. Dra. Sowiyah | juri_sid | juri2027 |

**Role:**
- `admin` - Super Admin (akses penuh)
- `juri_judul` - Juri Penilaian Judul (3 orang)
- `juri_sid` - Juri Penilaian SID (3 orang)

#### 2. inovasi
Data inovasi yang dinilai

| Field | Type | Keterangan |
|-------|------|------------|
| inovasi_id | INT | Primary Key |
| opd_id | INT | FK ke perangkat_daerah |
| bentuk_id | INT | FK ke bentuk_inovasi |
| judul_inovasi | VARCHAR(500) | Judul inovasi |
| ringkasan | TEXT | Ringkasan singkat |
| tahun_implementasi | YEAR | Tahun (2025-2027) |
| status_inovasi | ENUM | draft/dalam_penilaian/selesai |

#### 3. kriteria_judul (6 kriteria)

| No | Kriteria | Bobot | Max |
|----|----------|-------|-----|
| 1 | Kebaruan & Orisinalitas | 5 | 15 |
| 2 | Relevansi & Dampak | 5 | 15 |
| 3 | Kelayakan & Implementasi | 4 | 12 |
| 4 | Keberlanjutan | 3 | 9 |
| 5 | Kolaborasi | 2 | 6 |
| 6 | Dokumentasi | 2 | 6 |
| **TOTAL** | | **21** | **63** |

**Formula Skor:**
```
Skor = Nilai (1-3) × Bobot
```

#### 4. indikator_sid (20 indikator aktif)

| No Tampil | No Asli | Indikator | Bobot | Tipe |
|-----------|---------|-----------|-------|------|
| 1 | 16 | Regulasi Inovasi | 3.0 | radio |
| 2 | 17 | Ketersediaan SDM | 2.0 | radio |
| 3 | 18 | Dukungan Anggaran | 2.0 | radio |
| ... | ... | ... | ... | ... |
| 18 | 33 | Kemanfaatan Inovasi | 3.0 | radio |
| 19 | 34 | Monev | 0 | monev |
| 20 | 35 | Video Inovasi | 0 | video |

**Catatan:**
- No. 1-15 (SPD) **DIKECUALIKAN**
- No. 36 **DIKECUALIKAN**
- Total bobot radio: **30 poin**
- Max skor: **90 poin** (30 × 3)

#### 5. penilaian_judul
Hasil penilaian dari juri

| Field | Keterangan |
|-------|------------|
| inovasi_id | Inovasi yang dinilai |
| juri_id | Juri yang menilai |
| kriteria_id | Kriteria ke-berapa |
| nilai_dipilih | 1, 2, atau 3 |
| skor | nilai × bobot |
| status_penilaian | draft atau final |

**Unique Constraint:**
```sql
UNIQUE KEY unique_penilaian (inovasi_id, juri_id, kriteria_id)
```
→ Satu juri hanya bisa nilai satu kriteria sekali untuk satu inovasi

#### 6. ranking_inovasi
Peringkat berdasarkan rata-rata skor

| Field | Formula |
|-------|---------|
| rata_rata_judul | AVG(skor_judul_semua_juri) |
| rata_rata_indikator | AVG(skor_indikator_semua_juri) |
| rata_rata_total | rata_rata_judul + rata_rata_indikator |
| peringkat | ORDER BY rata_rata_total DESC |

**Contoh:**
```
Inovasi A dinilai oleh:
- Juri 1: Judul=57, Indikator=82
- Juri 2: Judul=54, Indikator=85
- Juri 3: Judul=60, Indikator=80

Rata-rata Judul = (57+54+60)/3 = 57
Rata-rata Indikator = (82+85+80)/3 = 82.33
Total = 57 + 82.33 = 139.33
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost/bapperida/api/v1
```

### Auth

```http
POST   /api/v1/auth/login          # Login
POST   /api/v1/auth/logout         # Logout
GET    /api/v1/auth/me             # Get profile
```

### Inovasi

```http
GET    /api/v1/inovasi             # List semua inovasi
GET    /api/v1/inovasi/{id}        # Detail inovasi
POST   /api/v1/inovasi             # Create (admin only)
PUT    /api/v1/inovasi/{id}        # Update (admin only)
DELETE /api/v1/inovasi/{id}        # Delete (admin only)
```

### Penilaian

```http
GET    /api/v1/kriteria-judul      # Get 6 kriteria
GET    /api/v1/indikator-sid       # Get 20 indikator
GET    /api/v1/penilaian/judul/{inovasi_id}      # Get penilaian judul
POST   /api/v1/penilaian/judul                   # Save penilaian judul
GET    /api/v1/penilaian/indikator/{inovasi_id}  # Get penilaian indikator
POST   /api/v1/penilaian/indikator               # Save penilaian indikator
POST   /api/v1/penilaian/batch-save              # Save judul + indikator
```

### Dashboard & Ranking

```http
GET    /api/v1/dashboard/stats     # Statistik umum
GET    /api/v1/dashboard/inovasi   # Rekap per inovasi
GET    /api/v1/dashboard/juri      # Rekap per juri
GET    /api/v1/ranking/top/{n}     # Top N ranking
GET    /api/v1/ranking/kategori/{kategori}  # Ranking by kategori
GET    /api/v1/export/{format}     # Export (excel/pdf/csv)
```

### Contoh Request

**Login:**
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "eva.rolia",
  "password": "juri2027"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "user_id": 2,
      "nama": "Dr. Ir. Eva Rolia",
      "role": "juri_judul"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
  }
}
```

**Save Penilaian:**
```http
POST /api/v1/penilaian/judul
Authorization: Bearer <token>
Content-Type: application/json

{
  "inovasi_id": 1,
  "penilaian": [
    {
      "kriteria_id": 1,
      "nilai_dipilih": 3,
      "catatan": "Sangat inovatif"
    },
    {
      "kriteria_id": 2,
      "nilai_dipilih": 2
    }
  ],
  "status": "draft"
}
```

---

## 🔄 Migrasi dari localStorage

### Cara Kerja Migrasi

```javascript
// 1. Ambil semua data dari localStorage
const allData = JSON.parse(localStorage.getItem('iid2026_all_draf') || '{}');

// 2. Kirim ke backend
const response = await fetch('/api/v1/migrate/from-localstorage', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(allData)
});

// 3. Backend proses dan simpan ke database
const result = await response.json();

if (result.success) {
    // 4. Backup data lama
    localStorage.setItem('iid2026_backup', JSON.stringify(allData));
    
    // 5. (Opsional) Hapus data lama
    // localStorage.removeItem('iid2026_all_draf');
    
    alert('Migrasi berhasil!');
}
```

### Backend Migrasi Script

Lihat file `API_GUIDE.md` bagian "Migrasi dari localStorage" untuk implementasi lengkap PHP.

---

## 🔐 Security Checklist

### ❌ Yang HARUS Diganti

1. **Password Default**
   ```sql
   -- Ganti semua password dengan bcrypt hash
   UPDATE users SET password = '$2y$10$...' WHERE user_id = 1;
   ```

2. **Database Credentials**
   ```php
   // JANGAN hardcode di code
   // Gunakan environment variables
   $dbPass = getenv('DB_PASSWORD');
   ```

3. **JWT Secret**
   ```php
   // Generate secret yang kuat
   $jwtSecret = bin2hex(random_bytes(32));
   ```

### ✅ Best Practices

- ✅ Gunakan HTTPS di production
- ✅ Validasi semua input
- ✅ Prepared statements untuk SQL
- ✅ Rate limiting untuk API
- ✅ CSRF protection untuk form
- ✅ XSS prevention (escape output)
- ✅ Log semua aktivitas penting
- ✅ Backup database berkala

---

## 📝 Stored Procedures

### 1. Update Rekap Penilaian

```sql
CALL update_rekap_penilaian(inovasi_id, juri_id);
```

Fungsi:
- Hitung total skor judul
- Hitung total skor indikator
- Update tabel `rekap_penilaian`
- Set status lengkap (belum/sebagian/lengkap)

### 2. Update Ranking

```sql
CALL update_ranking_inovasi(inovasi_id);
```

Fungsi:
- Hitung rata-rata skor dari semua juri
- Update tabel `ranking_inovasi`
- Set peringkat berdasarkan total skor

### 3. Auto-Trigger

```sql
-- Otomatis dipanggil saat insert/update penilaian
CREATE TRIGGER after_penilaian_judul_change
AFTER INSERT ON penilaian_judul
FOR EACH ROW
BEGIN
    CALL update_rekap_penilaian(NEW.inovasi_id, NEW.juri_id);
    CALL update_ranking_inovasi(NEW.inovasi_id);
END;
```

---

## 📊 Query Penting

### Dashboard Admin

```sql
-- Rekap lengkap dengan ranking
SELECT 
    i.judul_inovasi,
    pd.nama_opd,
    ri.rata_rata_total,
    ri.peringkat,
    ri.status_penilaian
FROM inovasi i
LEFT JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
LEFT JOIN ranking_inovasi ri ON i.inovasi_id = ri.inovasi_id
WHERE i.is_active = TRUE
ORDER BY ri.peringkat ASC;
```

### Top 10 Ranking

```sql
SELECT 
    ri.peringkat,
    i.judul_inovasi,
    pd.nama_opd,
    ri.rata_rata_total
FROM ranking_inovasi ri
JOIN inovasi i ON ri.inovasi_id = i.inovasi_id
JOIN perangkat_daerah pd ON i.opd_id = pd.opd_id
ORDER BY ri.peringkat ASC
LIMIT 10;
```

### Rekap Per Juri

```sql
SELECT 
    u.nama AS juri,
    COUNT(*) AS total_dinilai,
    AVG(rp.skor_total) AS rata_rata_skor
FROM rekap_penilaian rp
JOIN users u ON rp.juri_id = u.user_id
GROUP BY u.user_id
ORDER BY rata_rata_skor DESC;
```

---

## 📚 File Structure Rekomendasi

```
bapperida/
├── api/
│   ├── config/
│   │   ├── database.php
│   │   └── config.php
│   ├── middleware/
│   │   └── auth.php
│   ├── controllers/
│   │   ├── AuthController.php
│   │   ├── InovasiController.php
│   │   ├── PenilaianController.php
│   │   └── DashboardController.php
│   ├── models/
│   │   ├── User.php
│   │   ├── Inovasi.php
│   │   └── Penilaian.php
│   └── routes.php
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── penilaian.html
│   ├── login.html
│   ├── css/
│   │   ├── style.css
│   │   ├── landing.css
│   │   └── penilaian.css
│   └── js/
│       ├── auth.js
│       ├── data.js
│       ├── penilaian.js
│       ├── inovasi.js
│       └── shared.js
├── database/
│   ├── database_schema.sql
│   └── database_seed.sql
├── docs/
│   ├── DATABASE_DOCUMENTATION.md
│   ├── API_GUIDE.md
│   └── README_DATABASE.md
├── .env
└── .htaccess
```

---

## 🧪 Testing

### Unit Test Example

```php
<?php
// tests/PenilaianTest.php

class PenilaianTest extends PHPUnit\Framework\TestCase {
    private $db;
    private $controller;
    
    public function setUp(): void {
        $this->db = new PDO(/* test database */);
        $this->controller = new PenilaianController($this->db);
    }
    
    public function testSavePenilaianJudul() {
        $request = [
            'inovasi_id' => 1,
            'penilaian' => [
                [
                    'kriteria_id' => 1,
                    'nilai_dipilih' => 3
                ]
            ]
        ];
        
        $user = ['user_id' => 2, 'role' => 'juri_judul'];
        
        $result = $this->controller->savePenilaianJudul($request, $user);
        
        $this->assertTrue($result['success']);
        $this->assertEquals(15.00, $result['data']['total_skor']);
    }
}
```

### API Test with Postman

Import collection dari `API_GUIDE.md` dan jalankan test suite.

---

## 🎓 Tutorial Singkat

### 1. Setup Database (5 menit)

```bash
# Clone repository
git clone https://github.com/bapperida-metro/inovasi-2027.git
cd inovasi-2027

# Import database
mysql -u root -p < database/database_schema.sql
mysql -u root -p < database/database_seed.sql
```

### 2. Konfigurasi Backend (5 menit)

```bash
# Copy environment template
cp .env.example .env

# Edit .env
nano .env
```

```env
DB_HOST=localhost
DB_NAME=db_inovasi_daerah
DB_USER=root
DB_PASS=your_password

JWT_SECRET=your_jwt_secret_here
APP_URL=http://localhost/bapperida
```

### 3. Test Koneksi (2 menit)

```bash
# Akses test endpoint
curl http://localhost/bapperida/api/v1/test

# Output:
# {"success":true,"message":"API berjalan dengan baik"}
```

### 4. Login Test (3 menit)

```bash
# Test login
curl -X POST http://localhost/bapperida/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin2027"}'

# Output:
# {"success":true,"data":{"token":"eyJ..."}}
```

### 5. Frontend Integration (10 menit)

Edit `js/auth.js`:

```javascript
// Ganti fungsi login
async function login(username, password) {
    const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    });
    
    const result = await response.json();
    
    if (result.success) {
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        window.location.href = result.data.redirect;
    } else {
        alert(result.message);
    }
}
```

---

## 🐛 Troubleshooting

### Issue 1: Koneksi Database Gagal

**Error:**
```
SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'
```

**Solusi:**
```bash
# Reset password MySQL
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### Issue 2: CORS Error

**Error:**
```
Access to fetch at 'http://localhost/api' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solusi:**
```php
<?php
// Tambahkan di awal file API
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### Issue 3: JWT Token Invalid

**Error:**
```json
{"success":false,"error_code":"AUTH_002"}
```

**Solusi:**
- Cek apakah token expired
- Pastikan JWT secret sama saat generate dan verify
- Refresh token dari login endpoint

---

## 📞 Support & Contact

**Tim Pengembang:**
- **Koordinator**: BAPPERIDA Kota Metro
- **Email**: bapperida@metro.go.id
- **Telepon**: (0725) 123456

**Repository:**
- GitHub: https://github.com/bapperida-metro/inovasi-2027
- GitLab: https://gitlab.com/bapperida-metro/inovasi-2027

**Dokumentasi:**
- Online: https://docs.bapperida.metro.go.id
- Wiki: https://github.com/bapperida-metro/inovasi-2027/wiki

---

## 📝 Changelog

### Version 1.0.0 (2027-01-15)
- ✅ Database schema lengkap (18 tabel)
- ✅ Seed data untuk 6 users dan master data
- ✅ API endpoints documentation
- ✅ Stored procedures untuk auto-update
- ✅ Security guidelines
- ✅ Migration script dari localStorage

### Planned for Version 1.1.0
- 🔄 Real-time notifications
- 🔄 Advanced analytics dashboard
- 🔄 Bulk import inovasi from Excel
- 🔄 Email notifications untuk juri
- 🔄 Mobile responsive improvements

---

## ⭐ Credits

**Dikembangkan oleh:**
- Badan Perencanaan, Penelitian dan Pengembangan Daerah (BAPPERIDA)
- Dinas Komunikasi, Informatika dan Statistik
- Pemerintah Kota Metro

**Tahun:** 2027  
**Versi:** 1.0.0  
**Lisensi:** Proprietary - Pemerintah Kota Metro

---

## 🎯 Next Steps

1. ✅ **Database Setup** - Jalankan schema dan seed
2. ✅ **Backend Development** - Implementasi API endpoints
3. ⏳ **Frontend Integration** - Hubungkan dengan API
4. ⏳ **Testing** - Unit test dan integration test
5. ⏳ **Deployment** - Deploy ke production server
6. ⏳ **Training** - Pelatihan untuk juri dan admin
7. ⏳ **Go Live** - Launch sistem ke publik

---

**Selamat menggunakan Sistem Penilaian Inovasi Daerah 2027! 🚀**

Untuk pertanyaan lebih lanjut, silakan merujuk ke:
- **DATABASE_DOCUMENTATION.md** - Detail struktur database
- **API_GUIDE.md** - Panduan implementasi API

---

Dokumen dibuat: 28 Desember 2024  
Last updated: 28 Desember 2024  
Penyusun: Tim BAPPERIDA Kota Metro
