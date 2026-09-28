# 📦 CARA INSTALL DATABASE - STEP BY STEP

## Sistem Penilaian Inovasi Daerah Kota Metro 2027

---

## 🎯 PRASYARAT

Pastikan Anda sudah install:
- ✅ MySQL Server 5.7+ atau MariaDB 10.3+
- ✅ MySQL Command Line Client atau phpMyAdmin
- ✅ File `database_complete.sql` sudah tersedia

---

## 📋 METODE INSTALASI

Ada 3 cara untuk install database:

### **Metode 1: MySQL Command Line (REKOMENDASI)** ⭐
### **Metode 2: phpMyAdmin GUI**
### **Metode 3: MySQL Workbench**

---

## 🚀 METODE 1: MySQL Command Line (REKOMENDASI)

### **Windows:**

```cmd
# 1. Buka Command Prompt (CMD)
# 2. Masuk ke folder tempat database_complete.sql berada
cd "d:\Downloads\Dokumen dari Muammar Khadafi\bapperida"

# 3. Login ke MySQL
mysql -u root -p

# 4. Setelah masuk, jalankan script
source database_complete.sql

# Atau bisa langsung dari luar MySQL
mysql -u root -p < database_complete.sql
```

### **Linux/Mac:**

```bash
# 1. Buka Terminal
# 2. Masuk ke folder database
cd /path/to/bapperida/

# 3. Jalankan import
mysql -u root -p < database_complete.sql
```

---

### ✅ **Output yang Diharapkan:**

```
Enter password: ********
Query OK, 1 row affected (0.01 sec)
Database changed
Query OK, 0 rows affected (0.05 sec)
Query OK, 0 rows affected (0.03 sec)
...
Query OK, 105 rows affected (0.02 sec)
Records: 105  Duplicates: 0  Warnings: 0
Query OK, 2 rows affected (0.01 sec)
Query OK, 4 rows affected (0.01 sec)
```

### ❌ **Jika Ada Error:**

#### **Error 1: "Access denied for user 'root'"**
```
Solusi:
1. Pastikan password MySQL benar
2. Atau gunakan user lain yang punya privilege CREATE DATABASE
```

#### **Error 2: "Database already exists"**
```
Solusi:
1. Drop database lama dulu:
   DROP DATABASE IF EXISTS db_inovasi_daerah;
2. Atau edit database_complete.sql, uncomment baris:
   -- DROP DATABASE IF EXISTS db_inovasi_daerah;
```

#### **Error 3: Syntax error near "END$$"**
```
Solusi:
✅ SUDAH DIPERBAIKI!
File database_complete.sql yang baru sudah tidak ada error ini.
Pastikan menggunakan versi terbaru.
```

---

## 🖥️ METODE 2: phpMyAdmin (GUI)

### **Langkah-langkah:**

1. **Buka phpMyAdmin**
   ```
   http://localhost/phpmyadmin
   ```

2. **Login dengan user root**

3. **Create Database Manual** (jika diperlukan)
   - Klik tab "Databases"
   - Nama database: `db_inovasi_daerah`
   - Collation: `utf8mb4_unicode_ci`
   - Klik "Create"

4. **Import File SQL**
   - Pilih database `db_inovasi_daerah`
   - Klik tab "Import"
   - Klik "Choose File"
   - Pilih `database_complete.sql`
   - Format: SQL
   - **PENTING:** Centang "Enable foreign key checks"
   - Klik "Go"

5. **Tunggu Proses Import**
   - Progress bar akan muncul
   - Waktu: ~10-30 detik (tergantung spesifikasi)

6. **Verifikasi**
   - Cek sidebar kiri, harus ada 18 tabel
   - Klik tabel `inovasi`, harus ada 105 records
   - Klik tabel `users`, harus ada 6 records

---

### ⚠️ **Troubleshooting phpMyAdmin:**

#### **Error: "No data was received to import"**
```
Solusi:
1. Cek ukuran file, pastikan tidak 0 byte
2. Cek php.ini:
   upload_max_filesize = 64M
   post_max_size = 64M
   max_execution_time = 300
3. Restart Apache/Nginx
```

#### **Error: "Script timeout"**
```
Solusi:
1. Tingkatkan timeout di php.ini:
   max_execution_time = 600
2. Atau gunakan MySQL Command Line
```

#### **Error: "MySQL server has gone away"**
```
Solusi:
1. Edit my.ini atau my.cnf:
   max_allowed_packet = 64M
2. Restart MySQL service
```

---

## 🔧 METODE 3: MySQL Workbench

### **Langkah-langkah:**

1. **Buka MySQL Workbench**

2. **Connect ke MySQL Server**
   - Klik connection yang aktif
   - Masukkan password

3. **Open SQL Script**
   - Menu: File → Open SQL Script
   - Pilih `database_complete.sql`

4. **Execute Script**
   - Klik icon "Lightning" (Execute)
   - Atau tekan `Ctrl+Shift+Enter`

5. **Monitor Execution**
   - Lihat "Output" panel di bawah
   - Pastikan tidak ada error

6. **Refresh Schema**
   - Klik kanan "Schemas" → Refresh All
   - `db_inovasi_daerah` harus muncul

---

## ✅ VERIFIKASI INSTALASI

### **1. Cek Manual di MySQL:**

```sql
-- Gunakan database
USE db_inovasi_daerah;

-- Cek jumlah tabel (harus 18)
SHOW TABLES;

-- Cek jumlah inovasi (harus 105+)
SELECT COUNT(*) FROM inovasi;

-- Cek users (harus 6)
SELECT username, nama, role FROM users;

-- Cek stored procedures (harus 2)
SHOW PROCEDURE STATUS WHERE Db = 'db_inovasi_daerah';

-- Cek triggers (harus 4)
SHOW TRIGGERS;

-- Cek views (harus 2)
SHOW FULL TABLES WHERE TABLE_TYPE LIKE 'VIEW';
```

---

### **2. Test Otomatis (REKOMENDASI):**

Jalankan file test yang sudah disediakan:

```bash
mysql -u root -p < test_database.sql
```

**Output yang diharapkan:**
```
test_name: TEST 1: Jumlah Tabel
total_tables: 18
status: ✅ PASS

test_name: TEST 2: Jumlah Users
total_users: 6
status: ✅ PASS

test_name: TEST 3: Jumlah Inovasi
total_inovasi: 105
status: ✅ PASS

...

RINGKASAN TEST INSTALASI
═══════════════════════════
Tabel           18    18   ✅
Users            6     6   ✅
Inovasi        105  100+   ✅
OPD             33    33   ✅
...
Jika semua status ✅ maka instalasi BERHASIL!
```

---

## 🔐 KEAMANAN SETELAH INSTALL

### **1. SEGERA Ganti Password Default!**

```sql
-- Ganti password admin (gunakan bcrypt di production!)
UPDATE users SET password = 'password_baru_yang_kuat' WHERE username = 'admin';

-- Ganti password semua juri
UPDATE users SET password = 'password_baru_yang_kuat' WHERE role LIKE 'juri%';
```

### **2. Buat User Database Khusus**

```sql
-- Jangan gunakan root di production!
CREATE USER 'bapperida_user'@'localhost' IDENTIFIED BY 'password_sangat_kuat_123!@#';

-- Berikan akses ke database
GRANT ALL PRIVILEGES ON db_inovasi_daerah.* TO 'bapperida_user'@'localhost';

-- Reload privileges
FLUSH PRIVILEGES;
```

### **3. Backup Database**

```bash
# Backup pertama kali
mysqldump -u root -p db_inovasi_daerah > backup_awal_$(date +%Y%m%d).sql

# Setup backup otomatis (Linux/Mac - crontab)
# Backup setiap hari jam 02:00
0 2 * * * mysqldump -u root -p[PASSWORD] db_inovasi_daerah > /backup/db_$(date +\%Y\%m\%d).sql
```

---

## 📊 STATISTIK DATABASE YANG TERINSTALL

| Komponen | Jumlah | Keterangan |
|----------|--------|------------|
| **Tabel** | 18 | Termasuk master data, penilaian, rekap |
| **Users** | 6 | 1 admin + 5 juri |
| **Inovasi** | 105 | Dari 33 OPD |
| **OPD** | 33 | Organisasi Perangkat Daerah |
| **Kriteria Judul** | 6 | Dengan 18 parameter |
| **Indikator SID** | 20 | Dengan 54 parameter |
| **Stored Procedures** | 2 | Auto-calculate skor |
| **Triggers** | 4 | Auto-update rekap & ranking |
| **Views** | 2 | Query kompleks |
| **Ukuran Database** | ~2-5 MB | Sebelum ada data penilaian |

---

## 🔍 STRUKTUR DATABASE

```
db_inovasi_daerah/
├── Master Data
│   ├── users (6 records)
│   ├── kategori_opd (3 records)
│   ├── perangkat_daerah (33 records)
│   └── bentuk_inovasi (3 records)
├── Data Inovasi
│   └── inovasi (105 records)
├── Kriteria & Indikator
│   ├── kriteria_judul (6 records)
│   ├── parameter_kriteria_judul (18 records)
│   ├── indikator_sid (20 records)
│   └── parameter_indikator_sid (54 records)
├── Data Penilaian
│   ├── penilaian_judul
│   ├── penilaian_indikator
│   ├── penilaian_monev
│   └── penilaian_video
├── Rekapitulasi
│   ├── rekap_penilaian
│   └── ranking_inovasi
└── Sistem
    ├── log_aktivitas
    ├── pengaturan_sistem (7 records)
    └── dokumen_pendukung
```

---

## 🎓 TEST LOGIN

### **Test Login Admin:**

```sql
SELECT * FROM users 
WHERE username = 'admin' AND password = 'admin2027';
```

**Output yang diharapkan:**
```
user_id: 1
username: admin
nama: Administrator
role: admin
```

### **Test Login Juri:**

```sql
SELECT * FROM users 
WHERE username = 'eva.rolia' AND password = 'juri2027';
```

**Output yang diharapkan:**
```
user_id: 2
username: eva.rolia
nama: Dr. Ir. Eva Rolia, M.T., M.K.M.
role: juri_judul
```

---

## 📞 SUPPORT

### **Jika Mengalami Masalah:**

1. **Cek Error Log MySQL**
   ```bash
   # Linux/Mac
   tail -f /var/log/mysql/error.log
   
   # Windows
   # Cek di: C:\ProgramData\MySQL\MySQL Server X.X\Data\*.err
   ```

2. **Jalankan Test Database**
   ```bash
   mysql -u root -p < test_database.sql
   ```

3. **Hubungi Tim Pengembang**
   - Email: bapperida@metro.go.id
   - Telepon: (0725) 123456

---

## ✅ CHECKLIST INSTALASI

- [ ] MySQL/MariaDB sudah terinstall
- [ ] File `database_complete.sql` sudah tersedia
- [ ] Jalankan import database
- [ ] Verifikasi 18 tabel sudah ada
- [ ] Verifikasi 105 inovasi sudah ada
- [ ] Test login admin berhasil
- [ ] Test login juri berhasil
- [ ] Jalankan `test_database.sql` untuk verifikasi lengkap
- [ ] Ganti password default
- [ ] Buat user database khusus (bukan root)
- [ ] Setup backup otomatis
- [ ] Dokumentasi access credentials

---

## 🎉 SELESAI!

Jika semua langkah di atas berhasil, database Anda sudah siap digunakan!

**Next Steps:**
1. ✅ Database sudah siap
2. ⏳ Implementasi Backend API (PHP/Node.js)
3. ⏳ Integrasi Frontend dengan API
4. ⏳ Testing & Deployment

---

**Dokumen dibuat:** 28 Desember 2024  
**Versi:** 1.0.0  
**Tim:** BAPPERIDA Kota Metro

**🚀 SELAMAT! DATABASE SIAP DIGUNAKAN! 🚀**
