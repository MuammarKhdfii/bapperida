# Ringkasan Penyimpanan Data Penilaian Inovasi

## ✅ Data yang Disimpan ke Database

### 1. **Informasi Inovasi** (Metadata)
- ✅ Nama Inovasi
- ✅ Perangkat Daerah (OPD)
- ✅ Bentuk Inovasi
- ✅ Tahun Inovasi
- ✅ Ringkasan Inovasi
- ✅ Kategori (OPD/Pendidikan/Kesehatan)
- ✅ Timestamp Created & Updated

### 2. **Data User/Juri** (Per Penilai)
- ✅ Nama Lengkap Juri
- ✅ Email Juri
- ✅ Role (Juri Judul / Juri SID)
- ✅ Label Role
- ✅ Timestamp Terakhir Update

### 3. **Penilaian Judul Inovasi** (6 Kriteria)
Per juri, menyimpan:
- ✅ Kriteria 1: Kesesuaian dengan Urusan Pemerintahan
- ✅ Kriteria 2: Bentuk Inovasi
- ✅ Kriteria 3: Tematik Inovasi
- ✅ Kriteria 4: Inisiator Inovasi
- ✅ Kriteria 5: Jenis Inovasi
- ✅ Kriteria 6: Waktu Uji Coba

**Detail yang tersimpan:**
- Nilai parameter yang dipilih (1, 2, atau 3)
- Bobot kriteria
- Skor per kriteria (nilai × bobot)
- Total skor judul

### 4. **Penilaian Indikator SID** (20 Indikator + 2 Khusus)

**Indikator Reguler (Nilai 1-3):**
- ✅ Indikator 16: Rancang Bangun
- ✅ Indikator 17: Tujuan & Manfaat
- ✅ Indikator 18: Hasil Inovasi
- ✅ Indikator 19: Anggaran (Indikator Teknis)
- ✅ Indikator 20: Profil Bisnis
- ✅ Indikator 21: SDM
- ✅ Indikator 23: Penghargaan
- ✅ Indikator 24: Kemudahan Direplikasi
- ✅ Indikator 25: Kemanfaatan
- ✅ Indikator 26: Kebaruan
- ✅ Indikator 27: Potensi Transfer Pengetahuan
- ✅ Indikator 28: Peran Serta Aktor
- ✅ Indikator 29: Perbaikan Proses
- ✅ Indikator 30: Dukungan Pimpinan
- ✅ Indikator 31: Kolaborasi
- ✅ Indikator 32: Operasionalisasi
- ✅ Indikator 33: Kecepatan
- ✅ Indikator 34: Ekonomi Biaya
- ✅ Indikator 35: Efektivitas
- ✅ Indikator 36: Kejelasan Sasaran

**Indikator Khusus:**
- ✅ Indikator 22 (Monev): Jumlah dokumen + keterangan
- ✅ Indikator 37 (Video): URL video + judul video

**Detail yang tersimpan:**
- Nilai parameter yang dipilih (1, 2, atau 3)
- Bobot indikator
- Skor per indikator (nilai × bobot)
- Total skor SID

**Catatan:**
- ❌ Indikator 1-15 (SPD) TIDAK disimpan (diabaikan)
- ✅ Indikator skip tetap tercatat (dengan alasan skip)

### 5. **Catatan Penilaian** (Per Juri)
- ✅ Catatan umum hasil penilaian
- ✅ Rekomendasi perbaikan untuk OPD
- ✅ Status ada/tidaknya catatan (boolean)
- ✅ Status ada/tidaknya rekomendasi (boolean)

### 6. **Tanda Tangan Digital** (Per Juri)
- ✅ Tanda tangan dalam format base64 PNG
- ✅ Status ada/tidaknya tanda tangan (boolean)

### 7. **Skor dan Perhitungan**

**Per Juri:**
- ✅ Total Skor Penilaian Judul
- ✅ Total Skor Penilaian Indikator SID
- ✅ Total Skor Gabungan (Judul + SID)

**Agregat (untuk Ranking):**
- ✅ Rata-rata skor judul dari semua juri judul
- ✅ Rata-rata skor SID dari semua juri SID
- ✅ Total skor gabungan untuk ranking
- ✅ Jumlah juri yang sudah menilai (judul & SID)

### 8. **Audit Trail** (Tracking)
- ✅ Siapa yang menilai (nama juri)
- ✅ Kapan dinilai (timestamp)
- ✅ Perubahan terakhir (last updated)
- ✅ Status kelengkapan penilaian
  - Ada catatan?
  - Ada rekomendasi?
  - Ada tanda tangan?

### 9. **Status Penilaian**
- ✅ Status per juri (sudah/belum)
- ✅ Progress kelengkapan (%)
- ✅ Juri aktif terakhir
- ✅ Tanggal terakhir disimpan

## 📊 Format Storage

### LocalStorage
**Key:** `draf_iid2026_all`

**Format:** JSON Object
```json
{
  "Inovasi A": { ...data lengkap... },
  "Inovasi B": { ...data lengkap... },
  "Inovasi C": { ...data lengkap... }
}
```

### Firebase Realtime Database
**Path:** `/penilaian/{namaInovasi}`

**Struktur:**
```
/penilaian
  /Inovasi_A
    - namaInovasi
    - perangkatDaerah
    - judulState
    - juriState
    - notesState
    - signatureState
    - skorJudulPerJuri
    - skorPerJuri
    - userMetadata
    - ...
  /Inovasi_B
    - ...
```

## 🔄 Sinkronisasi Data

### Mode localStorage Only (Default)
- Data disimpan hanya di browser lokal
- Tidak sync antar perangkat
- Faster, no network dependency

### Mode Firebase Sync (Jika Enabled)
- Data disimpan ke localStorage DAN Firebase
- Auto-sync antar perangkat
- Real-time updates
- Backup otomatis ke cloud
- Requires internet connection

### Cara Mengaktifkan Firebase:
1. Buka `firebase-config.js`
2. Ubah `ENABLE_FIREBASE = false` menjadi `true`
3. Pastikan Firebase SDK sudah di-load di HTML
4. Refresh browser

## 📥 Export/Import Data

### Export Data (Backup Manual)
1. Buka Browser Console (F12)
2. Jalankan:
```javascript
const data = await loadAllDraf();
console.log(JSON.stringify(data, null, 2));
```
3. Copy JSON dan simpan ke file

### Import Data (Restore)
1. Buka Browser Console (F12)
2. Paste data JSON
3. Jalankan:
```javascript
const importedData = {...paste JSON...};
await saveAllDraf(importedData);
```

## 🔒 Keamanan Data

### Yang TIDAK Disimpan:
- ❌ Password/credentials juri
- ❌ Data pribadi sensitif
- ❌ Session token
- ❌ Indikator SPD (1-15) yang tidak relevan

### Yang Disimpan dengan Aman:
- ✅ Hanya data penilaian
- ✅ Metadata non-sensitif
- ✅ Audit trail untuk transparansi
- ✅ Enkripsi base64 untuk tanda tangan

## 📋 Checklist Kelengkapan Data

Setiap penilaian dianggap LENGKAP jika:
- ✅ Semua kriteria judul sudah dinilai (1-6)
- ✅ Semua indikator SID sudah dinilai (16-36)
- ✅ Catatan sudah diisi
- ✅ Rekomendasi sudah diisi
- ✅ Tanda tangan sudah dibuat

## 🎯 Use Cases

### 1. Dashboard Ranking
Query: Ambil semua inovasi, hitung rata-rata skor, urutkan desc

### 2. Rekap Per Juri
Query: Ambil userMetadata untuk juri tertentu dari semua inovasi

### 3. Status Kelengkapan
Query: Cek notesState, signatureState, dan hitung progress

### 4. Audit & Reporting
Query: Ambil semua timestamp, userMetadata untuk laporan

### 5. Replikasi Inovasi
Query: Ambil data lengkap satu inovasi untuk replikasi

## 📊 Statistik Database

**Per Inovasi:**
- ~50 KB data (dengan semua penilaian)
- ~10 KB per juri (state + metadata)

**Untuk 105 Inovasi:**
- Total: ~5.25 MB
- Per juri: ~1 MB

**Kapasitas:**
- localStorage: 5-10 MB (browser limit)
- Firebase: 1 GB free tier (cukup untuk ribuan inovasi)

## 🔧 Maintenance

### Clear Data (Reset)
```javascript
localStorage.removeItem("draf_iid2026_all");
localStorage.removeItem("draf_iid2026_last");
```

### Backup Berkala
Jalankan export setiap minggu untuk backup manual

### Monitor Storage
```javascript
const size = new Blob([localStorage.getItem("draf_iid2026_all")]).size;
console.log("Storage size:", (size / 1024).toFixed(2), "KB");
```

## 📝 Update Log

**1 Oktober 2026:**
- ✅ Struktur database diperluas
- ✅ Semua data user, judul, indikator tersimpan
- ✅ Kategori otomatis berdasarkan OPD
- ✅ Catatan dan rekomendasi disimpan per juri
- ✅ Tanda tangan digital support
- ✅ Audit trail lengkap
- ✅ Firebase sync ready
- ✅ Async/await semua operasi

---

**Kesimpulan:**
✅ SEMUA data penilaian (user, judul, indikator, kategori, catatan, rekomendasi, tanda tangan) tersimpan lengkap ke database (localStorage + Firebase)
