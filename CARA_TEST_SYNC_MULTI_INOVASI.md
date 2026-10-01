# 🔄 CARA TEST SYNC MULTI-INOVASI

## ✅ MASALAH SUDAH FIXED

Kode sudah diupdate untuk **otomatis sanitize** nama juri yang mengandung karakter ilegal (titik, koma, dll).

### Apa yang Sudah Diperbaiki:

1. ✅ **Auto-Sanitization**: Setiap kali juri menyimpan penilaian, nama juri otomatis dibersihkan
   - `"Dr. Ir. Eva Rolia, M.T., M.K.M."` → `"Dr_ Ir_ Eva Rolia_ M_T__ M_K_M_"`
   - Karakter ilegal (`.`, `,`, `#`, `$`, `[`, `]`, `/`) diganti dengan `_`

2. ✅ **Backward Compatible**: Bisa membaca data lama (dengan nama asli) DAN data baru (dengan nama sanitized)

3. ✅ **Nama Asli Tetap Tersimpan**: Nama asli juri disimpan di `userMetadata` untuk keperluan tampilan

---

## 📝 CARA TEST SYNC

### Persiapan:
1. Buka aplikasi di **2 perangkat berbeda** (atau 2 browser berbeda)
2. Login sebagai juri yang berbeda di setiap perangkat
3. Pastikan Firebase Rules sudah diset (lihat `CARA_FIX_SYNC.txt`)

### Test Case 1: Sync Inovasi Pertama ✅
**Perangkat 1** (Juri A):
1. Pilih inovasi: **"Ayo Sekolah"**
2. Isi beberapa penilaian judul/indikator
3. Klik **Simpan** → akan muncul alert sukses
4. Klik **OK** → redirect ke index.html

**Perangkat 2** (Juri B):
1. Buka index.html
2. Pilih inovasi: **"Ayo Sekolah"** (inovasi yang sama)
3. Isi penilaian → Klik **Simpan**
4. **HASIL EXPECTED**: Data Juri A dan Juri B bisa terlihat di dashboard

### Test Case 2: Sync Inovasi Kedua ✅
**Perangkat 1** (Juri A):
1. Kembali ke index.html
2. Pilih inovasi LAIN: **"E-Tilang"**
3. Isi penilaian → Simpan

**Perangkat 2** (Juri B):
1. Kembali ke index.html
2. Pilih inovasi yang SAMA: **"E-Tilang"**
3. Isi penilaian → Simpan
4. **HASIL EXPECTED**: Data sync dengan sempurna

### Test Case 3: Buka Dashboard
**Salah satu perangkat**:
1. Buka `dashboard.html`
2. **HASIL EXPECTED**:
   - Semua inovasi yang sudah dinilai muncul di tabel
   - Status penilaian per juri terlihat
   - Skor rata-rata terupdate
   - Data dari semua juri terlihat

---

## 🔍 CONSOLE COMMANDS UNTUK DEBUGGING

### 1️⃣ Cek Data Firebase (Semua Inovasi)
```javascript
// Buka console browser (F12), paste & enter:
firebase.database().ref('penilaian').once('value').then(snap => {
  const data = snap.val();
  console.log('📊 FIREBASE DATA:');
  console.log('Total inovasi:', Object.keys(data || {}).length);
  
  Object.entries(data || {}).forEach(([key, val]) => {
    console.log('\n--- ' + key + ' ---');
    console.log('Juri yang sudah menilai:');
    
    // Judul
    if (val.judulState) {
      console.log('  Judul:', Object.keys(val.judulState));
    }
    
    // Indikator
    if (val.juriState) {
      console.log('  Indikator:', Object.keys(val.juriState));
    }
    
    // Skor
    if (val.skorJudulPerJuri) {
      console.log('  Skor Judul:', val.skorJudulPerJuri);
    }
    if (val.skorPerJuri) {
      console.log('  Skor Indikator:', val.skorPerJuri);
    }
  });
});
```

### 2️⃣ Cek Data Inovasi Spesifik
```javascript
// Ganti "Ayo_Sekolah" dengan nama inovasi (spasi jadi underscore)
const namaInovasi = "Ayo_Sekolah";

firebase.database().ref('penilaian').child(namaInovasi).once('value').then(snap => {
  const data = snap.val();
  console.log('📋 DATA INOVASI:', namaInovasi);
  console.log('Data:', data);
  
  if (data) {
    console.log('\n✅ Juri Judul:');
    Object.keys(data.judulState || {}).forEach(juri => {
      console.log('  -', juri);
      console.log('    Skor:', data.skorJudulPerJuri?.[juri]);
    });
    
    console.log('\n✅ Juri Indikator:');
    Object.keys(data.juriState || {}).forEach(juri => {
      console.log('  -', juri);
      console.log('    Skor:', data.skorPerJuri?.[juri]);
    });
  }
});
```

### 3️⃣ Force Reload dari Firebase
```javascript
// Reload semua data dari Firebase ke localStorage
cloudStorage.loadAllDraf().then(data => {
  console.log('🔄 RELOAD COMPLETE');
  console.log('Total inovasi:', Object.keys(data).length);
  
  Object.keys(data).forEach(nama => {
    console.log('\n✅', nama);
    const d = data[nama];
    
    if (d.judulState) {
      console.log('  Juri Judul:', Object.keys(d.judulState));
    }
    if (d.juriState) {
      console.log('  Juri Indikator:', Object.keys(d.juriState));
    }
  });
  
  // Optional: reload halaman untuk refresh UI
  // location.reload();
});
```

### 4️⃣ Test Koneksi Firebase
```javascript
cloudStorage.checkConnection().then(status => {
  console.log('🌐 FIREBASE STATUS:');
  console.log('Connected:', status.connected);
  console.log('Source:', status.source);
  
  if (status.connected) {
    console.log('✅ Firebase Online - Data sync aktif');
  } else {
    console.log('⚠️ Firebase Offline - Menggunakan localStorage');
  }
});
```

### 5️⃣ Lihat Nama Juri yang Tersanitize
```javascript
// Cek bagaimana nama juri disimpan di Firebase
const juriList = [
  "Prof. Dr. Dra. Sowiyah M.Pd.",
  "Prof. Dr. Ir. Etik Puji Handayani, M.Si.",
  "Dr. Ir. Eva Rolia, M.T., M.K.M.",
  "Ir. Arif Joko Arwoko",
  "Mustafa Akhyar, S.E."
];

console.log('📝 SANITIZED JURY NAMES:');
juriList.forEach(nama => {
  const sanitized = nama.replace(/[\.,#$\[\]\/]/g, '_');
  console.log(`Original: "${nama}"`);
  console.log(`Sanitized: "${sanitized}"`);
  console.log('---');
});
```

---

## 🚨 TROUBLESHOOTING

### Masalah: Data tidak sync antar perangkat

**Solusi 1**: Cek Firebase Rules
```javascript
// Run di console:
fetch('https://bapperida-penilaian-default-rtdb.asia-southeast1.firebasedatabase.app/.json')
  .then(r => r.json())
  .then(data => {
    console.log('Firebase reachable:', !!data);
  })
  .catch(e => {
    console.error('Firebase error:', e);
  });
```

**Solusi 2**: Clear cache & reload
```javascript
// Clear localStorage & reload dari Firebase
localStorage.clear();
location.reload();
```

**Solusi 3**: Cek koneksi internet
```javascript
console.log('Online:', navigator.onLine);
```

### Masalah: Data hilang setelah reload

**Penyebab**: localStorage tidak tersync dengan Firebase

**Solusi**: Force sync
```javascript
cloudStorage.loadAllDraf().then(() => {
  console.log('✅ Data reloaded from Firebase');
  location.reload();
});
```

---

## ✅ CHECKLIST SEBELUM DEPLOY

- [ ] Firebase Rules sudah diset (`{"rules": {"penilaian": {".read": true, ".write": true}}}`)
- [ ] `ENABLE_FIREBASE = true` di `firebase-config.js`
- [ ] Test dengan 2 perangkat berbeda
- [ ] Test dengan multiple inovasi (minimal 3)
- [ ] Test dengan juri yang berbeda (judul & indikator)
- [ ] Cek dashboard menampilkan semua data
- [ ] Test reload halaman (data tetap ada)
- [ ] Test offline mode (localStorage fallback)

---

## 📊 EXPECTED RESULTS

Setelah test di atas, expected results:

1. ✅ Setiap juri bisa menilai multiple inovasi
2. ✅ Data sync real-time antar perangkat
3. ✅ Dashboard menampilkan semua penilaian
4. ✅ Tidak ada error `FirebaseError: First argument contains illegal characters`
5. ✅ Nama juri dengan titik/koma tersimpan dengan benar (otomatis sanitized)
6. ✅ Data tetap ada setelah reload halaman
7. ✅ Offline mode fallback ke localStorage

---

## 🎯 FINAL NOTE

**TIDAK PERLU MANUAL SANITIZATION LAGI!**

Sebelumnya, anda harus manual sanitize data via console. Sekarang:
- ✅ **Automatic**: Semua nama juri otomatis disanitize saat simpan
- ✅ **Transparent**: User tidak perlu tahu tentang sanitization
- ✅ **Backward Compatible**: Bisa load data lama & baru

**Cukup test seperti biasa, sistem akan handle sanitization otomatis.**

---

Last updated: 2026-10-01
