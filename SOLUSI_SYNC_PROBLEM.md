# 🔴 SOLUSI: Data Tidak Sync Antar Perangkat

**Masalah:** User lain sudah menilai tapi data tidak muncul di perangkat saya

**Status Update:** ✅ Realtime sync sudah diaktifkan di semua halaman

---

## 🎯 Langkah Pertama: Gunakan Diagnostic Tool

### **Buka halaman test ini:**
```
test-firebase.html
```

Tool ini akan **otomatis mengecek**:
1. ✅ Firebase configuration (ENABLE_FIREBASE, firebaseInitialized)
2. ✅ Firebase connection status
3. ✅ Data di Firebase (berapa banyak, apa saja)
4. ✅ Perbandingan localStorage vs Firebase
5. ✅ Test write ke Firebase

**Tool ini akan memberitahu masalah spesifik dan cara fixnya!**

---

## 📋 Kemungkinan Penyebab & Solusi

### 1. **Firebase Rules Belum Di-Set** ⭐ PALING SERING

**Gejala:**
- Console error: `PERMISSION_DENIED`
- Test firebase write gagal
- Data tidak tersimpan ke Firebase

**Solusi:**

1. **Buka Firebase Console:**
   - https://console.firebase.google.com/
   - Pilih project: **bapperida-penilaian**

2. **Set Database Rules:**
   - Klik **Realtime Database** di sidebar
   - Tab **Rules**
   - Copy-paste rules ini:
   ```json
   {
     "rules": {
       "penilaian": {
         ".read": true,
         ".write": true
       },
       "test_connection": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

3. **Publish:**
   - Klik tombol **Publish**
   - Tunggu 1-2 menit

4. **Test:**
   - Buka `test-firebase.html`
   - Klik "Test Write"
   - Harus berhasil ✅

---

### 2. **Firebase Belum Aktif di Perangkat**

**Cek di header aplikasi:**
- ✅ **☁️ Multi-Device Sync** = Firebase AKTIF
- ❌ **💾 Local Only** = Firebase MATI

**Solusi jika mati:**

1. Buka `firebase-config.js`
2. Cari baris: `const ENABLE_FIREBASE = ...`
3. Pastikan: `const ENABLE_FIREBASE = true;`
4. Save file
5. Hard refresh browser: **Ctrl + Shift + R** (Windows) atau **Cmd + Shift + R** (Mac)

---

### 3. **Data Teman Belum Tersimpan ke Firebase**

**Cek di perangkat teman:**

1. Buka Console browser (F12)
2. Saat klik tombol "Simpan", harus muncul:
   ```
   💾 Saving data for: [NAMA_INOVASI]
   ☁️ Synced to Firebase  ← HARUS ADA!
   ✅ saveAll COMPLETE
   ```

**Jika tidak ada "Synced to Firebase":**
- Firebase tidak aktif di perangkat teman
- Teman perlu aktifkan Firebase (lihat solusi #2)
- Atau ada error connection

---

### 4. **URL Berbeda Antar Perangkat**

**Masalah:**
- Teman pakai `localhost`, Anda pakai `GitHub Pages`
- LocalStorage TIDAK akan sync karena beda domain

**Solusi:**
- **Semua harus pakai URL yang SAMA!**
- Pilih salah satu:
  - Semua pakai GitHub Pages: `https://[username].github.io/bapperida`
  - ATAU semua pakai localhost

**Catatan:** Firebase akan sync, tapi localStorage tetap terpisah per domain.

---

### 5. **Data Ada di Firebase Tapi Tidak Muncul**

**Solusi Cepat:**

1. **Gunakan Force Sync:**
   - Buka halaman Dashboard (index.html)
   - Scroll ke section **Dashboard Perangkingan**
   - Klik tombol **☁️ Force Sync**
   - Tunggu notifikasi sukses
   - Data akan muncul!

2. **Atau manual via Console:**
   ```javascript
   // Clear localStorage
   localStorage.removeItem("draf_iid2026_all");
   
   // Force reload from Firebase
   await cloudStorage.loadAllDraf();
   
   // Reload page
   location.reload();
   ```

---

## ✅ Checklist: Pastikan Semuanya Benar

### Di Perangkat Teman (yang menilai):
- [ ] Firebase status: **☁️ Multi-Device Sync** (bukan 💾 Local Only)
- [ ] Isi penilaian lengkap
- [ ] Klik **Simpan**
- [ ] Console log muncul: **"☁️ Synced to Firebase"**
- [ ] Cek Firebase Console → Data tab → ada data `/penilaian/[nama_inovasi]`

### Di Perangkat Anda (yang melihat):
- [ ] URL yang **sama** dengan teman (localhost atau GitHub Pages)
- [ ] Firebase status: **☁️ Multi-Device Sync**
- [ ] Klik **☁️ Force Sync** di dashboard
- [ ] ATAU hard refresh: **Ctrl + Shift + R**
- [ ] Data teman muncul!

### Di Firebase Console:
- [ ] Database Rules sudah di-set (`.read: true`, `.write: true`)
- [ ] Data ada di tab **Data** → `/penilaian`
- [ ] Tidak ada error di tab **Usage**

---

## 🎯 Workflow Ideal: Cara Benar Multi-User

### User A (Juri pertama):
1. Login dengan akun (misal: Eva Rolia)
2. Cek header: ☁️ Multi-Device Sync ← HARUS ADA
3. Pilih inovasi
4. Isi penilaian
5. Klik **Simpan**
6. Console: "☁️ Synced to Firebase" ← HARUS MUNCUL
7. ✅ Done

### User B (Juri kedua - perangkat berbeda):
1. Login dengan akun yang **sama** (Eva Rolia)
2. Cek header: ☁️ Multi-Device Sync ← HARUS ADA
3. **Option 1:** Klik **☁️ Force Sync** untuk tarik data terbaru
4. **Option 2:** Tunggu 2-3 detik, data akan muncul otomatis (real-time)
5. Data User A akan muncul!
6. Bisa lanjut edit atau lihat

### User C (Juri lain - akun berbeda):
1. Login dengan akun **berbeda** (misal: Joko Arif)
2. Cek header: ☁️ Multi-Device Sync
3. Klik **☁️ Force Sync** atau tunggu
4. Data Eva Rolia dan Joko Arif akan muncul di ranking
5. Tapi form penilaian tetap per juri (tidak campur)

---

## 🔧 Debugging Commands (Console Browser)

### Cek Status Firebase:
```javascript
console.log('Firebase enabled:', ENABLE_FIREBASE);
console.log('Firebase initialized:', firebaseInitialized);
cloudStorage.checkConnection().then(console.log);
```

### Lihat Data LocalStorage:
```javascript
const local = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
console.log('LocalStorage items:', Object.keys(local).length);
console.table(Object.keys(local));
```

### Lihat Data Firebase:
```javascript
cloudStorage.loadAllDraf().then(data => {
  console.log('Firebase items:', Object.keys(data).length);
  console.table(Object.keys(data));
});
```

### Force Sync Manual:
```javascript
// Clear local cache
localStorage.removeItem("draf_iid2026_all");

// Pull from Firebase
await cloudStorage.loadAllDraf();

// Reload
location.reload();
```

### Upload Local Data ke Firebase:
```javascript
// Jika ada data di localStorage tapi tidak di Firebase
const local = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");

for (const [nama, data] of Object.entries(local)) {
  await cloudStorage.saveDraf(nama, data);
  console.log('Uploaded:', nama);
}

console.log('✅ All data uploaded to Firebase');
```

---

## 🆘 Masih Bermasalah?

### Langkah Terakhir:

1. **Buka `test-firebase.html`** di browser
2. Screenshot semua hasil test (5 tests)
3. Buka Firebase Console → Realtime Database → Data tab
4. Screenshot data yang ada di `/penilaian`
5. Share screenshots untuk diagnosis lebih lanjut

### Informasi yang dibutuhkan:
- URL yang digunakan (localhost atau GitHub Pages?)
- Browser & versi
- Akun yang digunakan (nama juri)
- Nama inovasi yang bermasalah
- Screenshot console logs (F12)
- Screenshot Firebase Console data tab

---

## 📱 Notifikasi Real-time

**Fitur baru:**

Ketika juri lain menyimpan penilaian, Anda akan melihat:

1. **Popup notification** di kanan bawah:
   ```
   🔴 Update Real-time
   
   [Nama Juri] baru saja menilai [Nama Inovasi]
   ```

2. **Sound notification** (suara kecil)

3. **Live indicator** di header (muncul 3 detik)

4. **Auto-refresh:**
   - Ranking table otomatis update
   - Dropdown inovasi otomatis update
   - Status cards otomatis update

**Tidak perlu refresh halaman!**

---

## 📞 Contact Support

Jika semua cara di atas tidak berhasil, kemungkinan:
- Firebase project ada masalah
- Browser blocking Firebase
- Firewall/proxy blocking connection
- Firebase quota exceeded

Gunakan `test-firebase.html` untuk diagnosis akurat!

---

**Update:** 1 Oktober 2026  
**Status:** ✅ Realtime sync aktif di semua halaman  
**Test Tool:** `test-firebase.html` tersedia  
**Force Sync:** ☁️ Tombol tersedia di Dashboard

