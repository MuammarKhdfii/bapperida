# Panduan Testing Role-Based Innovation System

## Cara Test Sistem

### 1. Test Juri SID (56 Inovasi) ✅ DATA LENGKAP

#### Login:
- Username: `sowiyah` atau `etik.puji` (Juri SID murni)
- Password: `juri2027`

#### Atau login dengan multiple roles:
- Username: `eva.rolia`
- Password: `juri2027`
- **Pilih role:** "Juri Penilaian SID"

#### Yang Harus Terlihat:
1. **Dropdown "Pilih Inovasi"** → Menampilkan **56 inovasi**
2. **Progress Indicator** → Total: **56 inovasi**
3. **Console Log** (F12) → `Loaded 56 innovations for role: juri_sid`

#### Verifikasi 56 Inovasi:
Dropdown harus menampilkan:
- **32 inovasi OPD** (seperti: POSYANDUWANLING, Peksos Go To School 2.0, dll)
- **16 inovasi Pendidikan** (seperti: MBAK JUM SMS, MENU BAKMI, HARUM, dll)
- **8 inovasi Kesehatan** (seperti: SI BATOUX, EDUMY, GRADASI, dll)

---

### 2. Test Juri Judul (105 Inovasi) ⚠️ MASIH PLACEHOLDER

#### Login:
- Username: `arif.joko` atau `mustafa` (Juri Judul murni)
- Password: `juri2027`

#### Atau login dengan multiple roles:
- Username: `eva.rolia`
- Password: `juri2027`
- **Pilih role:** "Juri Judul Inovasi"

#### Yang Harus Terlihat:
1. **Dropdown "Pilih Inovasi"** → Menampilkan **3 inovasi** (placeholder)
   - Digitalisasi Laporan Ikhtisar Pengawasan APIP
   - Klinik Konsultasi Pengawasan APIP
   - Klinik Inovasi Daerah Kota Metro (Kovi Darat)
2. **Progress Indicator** → Total: **3 inovasi** (seharusnya 105)
3. **Console Log** (F12) → `Loaded 3 innovations for role: juri_judul`

**⚠️ CATATAN:** Setelah data 105 inovasi dilengkapi di `inovasi.js`, angka ini akan berubah menjadi 105.

---

### 3. Test Multiple Roles (eva.rolia)

#### Login:
- Username: `eva.rolia`
- Password: `juri2027`

#### Langkah:
1. Setelah login, akan muncul **pilihan role**
2. Pilih **"Juri Judul Inovasi"** → Lihat 3 inovasi (placeholder, harusnya 105)
3. Logout (tombol ↩ Keluar di pojok kanan atas)
4. Login lagi dengan `eva.rolia`
5. Pilih **"Juri Penilaian SID"** → Lihat 56 inovasi ✅

**Hasil yang Diharapkan:**
- Setiap kali login dengan role berbeda, jumlah inovasi yang tampil berbeda
- Data tersimpan per-role (penilaian Juri Judul terpisah dari Juri SID)

---

### 4. Test Fitur Locking & Edit

#### Scenario 1: Nilai Inovasi Baru
1. Login sebagai Juri SID
2. Pilih inovasi yang **belum dinilai**
3. Klik "Mulai Penilaian Inovasi"
4. Isi form penilaian
5. Klik tombol 💾 **SIMPAN**
6. Akan redirect ke `index.html` dengan tab kategori yang sesuai

#### Scenario 2: Inovasi Sudah Dinilai (Locked)
1. Kembali ke `index.html`
2. Lihat dropdown → Inovasi yang sudah dinilai akan muncul dengan:
   - **✓ [Nama Inovasi] (Sudah Dinilai)**
   - Warna hijau
   - Disabled (tidak bisa dipilih)
3. Lihat section **"Inovasi yang Sudah Anda Nilai"**
4. Akan muncul card dengan tombol **✏️ Edit Penilaian**

#### Scenario 3: Edit Penilaian
1. Klik tombol **✏️ Edit Penilaian** pada card inovasi
2. Akan masuk ke form penilaian dengan data yang sudah tersimpan
3. Ubah penilaian
4. Klik tombol 💾 **SIMPAN**
5. Data terupdate

---

### 5. Test Progress Indicator

#### Untuk Juri SID (56 total):
- **Sudah Dinilai:** Menampilkan jumlah inovasi yang sudah dinilai
- **Belum Dinilai:** 56 - sudah dinilai
- **Total Inovasi:** 56

#### Untuk Juri Judul (3 total, harusnya 105):
- **Sudah Dinilai:** Menampilkan jumlah inovasi yang sudah dinilai
- **Belum Dinilai:** 3 - sudah dinilai (harusnya 105 - sudah dinilai)
- **Total Inovasi:** 3 (harusnya 105)

---

### 6. Test Dashboard Ranking

1. Setelah beberapa juri menilai inovasi
2. Scroll ke section **"🏅 Dashboard Perangkingan Inovasi"**
3. Klik tab:
   - **📋 Semua** → Menampilkan semua inovasi
   - **🏛️ OPD** → Filter inovasi kategori OPD
   - **🎓 UPTD Pendidikan** → Filter inovasi kategori Pendidikan
   - **🏥 UPTD Kesehatan** → Filter inovasi kategori Kesehatan

#### Verifikasi:
- Inovasi ter-rank berdasarkan **total skor** (rata-rata dari semua juri)
- Menampilkan skor per jenis penilaian
- Menampilkan jumlah juri yang sudah menilai

---

### 7. Debug dengan Console Log

Buka **Developer Tools** (F12) → Tab **Console**

#### Saat di `index.html`:
```
Loaded 56 innovations for role: juri_sid
```
atau
```
Loaded 3 innovations for role: juri_judul
```

#### Saat di `penilaian.html`:
```
[penilaian.js] Loaded 56 innovations for role: juri_sid
```
atau
```
[penilaian.js] Loaded 3 innovations for role: juri_judul
```

#### Saat Save:
```
=== saveAll START ===
Skor Judul: [angka]
Skor Indikator: [angka]
Saving data: [object]
=== saveAll COMPLETE ===
```

---

### 8. Test Print Output

#### Juri SID:
1. Isi penilaian untuk 20 indikator SID
2. Klik tombol **🖨️ Cetak**
3. Print preview akan menampilkan:
   - Heading: **"PENILAIAN INDIKATOR SID"**
   - Tabel: 20 indikator dengan nilai dan deskripsi
   - Total skor maksimal: sesuai dengan bobot 20 indikator

#### Juri Judul:
1. Isi penilaian untuk 6 kriteria judul
2. Klik tombol **🖨️ Cetak**
3. Print preview akan menampilkan:
   - Heading: **"PENILAIAN JUDUL INOVASI"**
   - Tabel: 6 kriteria dengan nilai dan deskripsi
   - Total skor maksimal: sesuai dengan bobot 6 kriteria

---

## Checklist Testing

### ✅ Test yang Bisa Dilakukan Sekarang:
- [x] Login sebagai Juri SID
- [x] Lihat 56 inovasi di dropdown
- [x] Progress indicator menghitung dari 56
- [x] Pilih dan nilai inovasi
- [x] Simpan penilaian
- [x] Inovasi terkunci setelah dinilai
- [x] Tombol edit penilaian muncul
- [x] Edit penilaian yang sudah ada
- [x] Dashboard ranking menampilkan data
- [x] Print output untuk Juri SID (20 indikator)
- [x] Multiple roles (eva.rolia) switch antara Juri Judul dan Juri SID

### ⚠️ Test yang Menunggu Data 105 Inovasi:
- [ ] Login sebagai Juri Judul
- [ ] Lihat 105 inovasi di dropdown
- [ ] Progress indicator menghitung dari 105
- [ ] Print output untuk Juri Judul (6 kriteria)

---

## Troubleshooting

### Masalah: Dropdown hanya menampilkan 3 inovasi untuk Juri Judul
**Solusi:** Ini normal, data 105 inovasi masih placeholder. Lengkapi array `daftarInovasiJudulLengkap` di file `inovasi.js`.

### Masalah: Console menampilkan error "daftarInovasi is not defined"
**Solusi:** Refresh halaman dengan **Ctrl+Shift+R** (hard refresh).

### Masalah: Setelah login role tidak berubah
**Solusi:** Logout → Clear browser cache → Login lagi.

### Masalah: Inovasi tidak terkunci setelah dinilai
**Solusi:** Pastikan sudah klik tombol **💾 SIMPAN** dan konfirmasi berhasil.

---

**Update Terakhir:** 30 September 2026  
**Status:** Sistem berfungsi, menunggu data lengkap 105 inovasi untuk Juri Judul
