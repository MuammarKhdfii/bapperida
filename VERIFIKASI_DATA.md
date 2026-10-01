# Panduan Verifikasi Data Tersimpan

## Cara Memeriksa Data di Browser

### 1. Buka Browser Console
- Tekan **F12** atau **Ctrl+Shift+I**
- Pilih tab **Console**

### 2. Cek Data di localStorage

#### Lihat Semua Data Penilaian
```javascript
// Load data
const allData = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
console.log("Total inovasi dinilai:", Object.keys(allData).length);
console.log("Data lengkap:", allData);
```

#### Lihat Data Inovasi Tertentu
```javascript
const namaInovasi = "SIANCIL"; // Ganti dengan nama inovasi
const data = allData[namaInovasi];

if (data) {
  console.log("=== INFORMASI INOVASI ===");
  console.log("Nama:", data.namaInovasi);
  console.log("OPD:", data.perangkatDaerah);
  console.log("Kategori:", data.kategori);
  console.log("Bentuk:", data.bentukInovasi);
  console.log("Tahun:", data.tahun);
  
  console.log("\n=== JURI YANG MENILAI ===");
  console.log("Juri Judul:", Object.keys(data.judulState || {}));
  console.log("Juri SID:", Object.keys(data.juriState || {}));
  
  console.log("\n=== SKOR ===");
  console.log("Skor Judul per Juri:", data.skorJudulPerJuri);
  console.log("Skor SID per Juri:", data.skorPerJuri);
  
  console.log("\n=== USER METADATA ===");
  console.log(data.userMetadata);
} else {
  console.log("❌ Inovasi tidak ditemukan");
}
```

#### Lihat Penilaian Juri Tertentu
```javascript
const namaJuri = "Mustafa Akhyar, S.E."; // Ganti dengan nama juri
const inovasi = "SIANCIL"; // Ganti dengan nama inovasi
const data = allData[inovasi];

if (data) {
  console.log("=== PENILAIAN JUDUL ===");
  console.log(data.judulState[namaJuri]);
  
  console.log("\n=== PENILAIAN INDIKATOR ===");
  console.log("Radio (indikator reguler):", data.juriState[namaJuri]?.radio);
  console.log("Monev:", data.juriState[namaJuri]?.monev);
  console.log("Video:", data.juriState[namaJuri]?.videoUrl);
  
  console.log("\n=== CATATAN & REKOMENDASI ===");
  console.log(data.notesState[namaJuri]);
  
  console.log("\n=== SKOR ===");
  console.log("Skor Judul:", data.skorJudulPerJuri[namaJuri]);
  console.log("Skor SID:", data.skorPerJuri[namaJuri]);
  console.log("Total:", (data.skorJudulPerJuri[namaJuri] || 0) + (data.skorPerJuri[namaJuri] || 0));
}
```

### 3. Cek Struktur Data Lengkap

```javascript
// Fungsi helper untuk memeriksa kelengkapan data
async function verifikasiData() {
  const allData = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
  
  console.log("╔═══════════════════════════════════════════╗");
  console.log("║     VERIFIKASI DATA PENILAIAN INOVASI     ║");
  console.log("╚═══════════════════════════════════════════╝\n");
  
  const totalInovasi = Object.keys(allData).length;
  console.log("📊 Total inovasi yang dinilai:", totalInovasi);
  
  if (totalInovasi === 0) {
    console.log("⚠️  Belum ada data penilaian");
    return;
  }
  
  let lengkapCount = 0;
  let sebagianCount = 0;
  
  Object.entries(allData).forEach(([namaInovasi, data]) => {
    const juriJudul = Object.keys(data.judulState || {}).length;
    const juriSID = Object.keys(data.juriState || {}).length;
    const totalJuri = juriJudul + juriSID;
    
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📋 ${namaInovasi}`);
    console.log(`   OPD: ${data.perangkatDaerah || '—'}`);
    console.log(`   Kategori: ${data.kategori || '—'}`);
    console.log(`   Bentuk: ${data.bentukInovasi || '—'}`);
    console.log(`   Tahun: ${data.tahun || '—'}`);
    console.log(`   Created: ${data.createdAt || '—'}`);
    console.log(`   Updated: ${data.savedAt || '—'}`);
    
    console.log(`\n   👥 Juri yang Menilai:`);
    console.log(`      • Juri Judul: ${juriJudul} orang`);
    console.log(`      • Juri SID: ${juriSID} orang`);
    console.log(`      • Total: ${totalJuri} penilaian`);
    
    // Detail per juri
    Object.entries(data.userMetadata || {}).forEach(([juri, meta]) => {
      console.log(`\n   ✏️  ${juri}:`);
      console.log(`      Role: ${meta.role}`);
      console.log(`      Skor Judul: ${meta.skorJudul || 0}`);
      console.log(`      Skor SID: ${meta.skorIndikator || 0}`);
      console.log(`      Total Skor: ${meta.totalSkor || 0}`);
      console.log(`      Catatan: ${meta.hasCatatan ? '✅' : '❌'}`);
      console.log(`      Rekomendasi: ${meta.hasRekomendasi ? '✅' : '❌'}`);
      console.log(`      Tanda Tangan: ${meta.hasSignature ? '✅' : '❌'}`);
      console.log(`      Last Update: ${new Date(meta.lastUpdated).toLocaleString('id-ID')}`);
      
      if (meta.hasCatatan && meta.hasRekomendasi && meta.hasSignature) {
        lengkapCount++;
      } else {
        sebagianCount++;
      }
    });
  });
  
  console.log(`\n╔═══════════════════════════════════════════╗`);
  console.log(`║              RINGKASAN STATUS             ║`);
  console.log(`╚═══════════════════════════════════════════╝`);
  console.log(`📊 Total Inovasi: ${totalInovasi}`);
  console.log(`✅ Penilaian Lengkap: ${lengkapCount}`);
  console.log(`⚠️  Penilaian Sebagian: ${sebagianCount}`);
  console.log(`\n✅ VERIFIKASI SELESAI\n`);
}

// Jalankan verifikasi
verifikasiData();
```

### 4. Export Data ke File JSON

```javascript
// Export semua data ke JSON
function exportDataToJSON() {
  const allData = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
  const jsonString = JSON.stringify(allData, null, 2);
  
  // Create download
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `penilaian-inovasi-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('✅ Data berhasil di-export!');
}

// Jalankan export
exportDataToJSON();
```

### 5. Cek Ukuran Storage

```javascript
function cekUkuranStorage() {
  const data = localStorage.getItem("draf_iid2026_all") || "{}";
  const sizeInBytes = new Blob([data]).size;
  const sizeInKB = (sizeInBytes / 1024).toFixed(2);
  const sizeInMB = (sizeInBytes / 1024 / 1024).toFixed(2);
  
  console.log("💾 Ukuran Storage:");
  console.log(`   ${sizeInBytes} bytes`);
  console.log(`   ${sizeInKB} KB`);
  console.log(`   ${sizeInMB} MB`);
  
  const limit = 5 * 1024 * 1024; // 5MB
  const percentage = ((sizeInBytes / limit) * 100).toFixed(2);
  console.log(`\n   Usage: ${percentage}% dari 5MB limit browser`);
  
  if (sizeInBytes > limit * 0.8) {
    console.warn("⚠️  Storage hampir penuh! Pertimbangkan backup & cleanup");
  }
}

cekUkuranStorage();
```

## Verifikasi via Firebase Console

Jika Firebase enabled:

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **bapperida-penilaian**
3. Klik **Realtime Database** di sidebar
4. Lihat node `/penilaian`
5. Expand untuk melihat semua inovasi dan datanya

## Checklist Verifikasi

### ✅ Data Wajib Tersimpan

Untuk setiap inovasi yang dinilai, pastikan ada:

- [ ] `namaInovasi` (string)
- [ ] `perangkatDaerah` (string)
- [ ] `kategori` (opd/pendidikan/kesehatan)
- [ ] `bentukInovasi` (string)
- [ ] `tahun` (string)
- [ ] `judulState` (object per juri)
- [ ] `juriState` (object per juri)
- [ ] `notesState` (object per juri)
- [ ] `signatureState` (object per juri)
- [ ] `skorJudulPerJuri` (object)
- [ ] `skorPerJuri` (object)
- [ ] `userMetadata` (object per juri)
- [ ] `savedAt` (ISO timestamp)

### ✅ Data Per Juri

Untuk setiap juri yang menilai, pastikan ada:

- [ ] Penilaian judul (6 kriteria) ATAU
- [ ] Penilaian SID (20 indikator)
- [ ] Catatan penilaian
- [ ] Rekomendasi
- [ ] Tanda tangan digital
- [ ] Skor yang dihitung
- [ ] User metadata lengkap

## Troubleshooting

### Masalah: Data tidak tersimpan

**Solusi:**
1. Cek console untuk error
2. Pastikan `saveAll()` dipanggil dengan await
3. Cek apakah button Simpan berhasil (animasi ✅)
4. Coba clear cache dan reload

### Masalah: Data hilang setelah refresh

**Solusi:**
1. Cek apakah localStorage masih ada data
2. Pastikan tidak ada auto-clear cookies/storage
3. Pastikan tidak menggunakan Incognito/Private mode
4. Enable Firebase untuk backup cloud

### Masalah: Ranking tidak muncul

**Solusi:**
1. Cek apakah data ada di localStorage
2. Cek console untuk error async/await
3. Hard refresh (Ctrl+Shift+R)
4. Cek fungsi `renderLandingRanking()` dipanggil

### Masalah: Data corrupt/invalid

**Solusi:**
1. Export data ke JSON terlebih dahulu (backup)
2. Clear localStorage
3. Import data kembali atau input ulang

## Kontak Support

Jika ada masalah dengan data:
1. Export data dulu sebagai backup
2. Screenshot console error
3. Kirim ke developer dengan detail:
   - Browser & versi
   - Langkah reproduksi error
   - Data backup JSON

---

**Update: 1 Oktober 2026**
- ✅ Panduan verifikasi data lengkap
- ✅ Script debugging siap pakai
- ✅ Export/import guide
- ✅ Troubleshooting common issues
