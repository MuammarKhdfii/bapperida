# Troubleshooting - Data Tidak Sync Antar Perangkat

## 🔴 Masalah: Teman sudah menilai tapi data tidak muncul di perangkat saya

### Penyebab Umum:

1. **Firebase belum aktif** di salah satu perangkat
2. **Firebase rules belum di-set** dengan benar
3. **URL berbeda** (localhost vs GitHub Pages)
4. **Data belum di-save dengan benar**
5. **Cache browser** belum di-clear

---

## ✅ Solusi Cepat: Force Sync

### Langkah 1: Gunakan Tombol Force Sync

1. **Di perangkat Anda**, buka halaman utama
2. Scroll ke **Dashboard Perangkingan Inovasi**
3. Klik tombol **☁️ Force Sync**
4. Tunggu proses sync selesai
5. Data teman Anda akan muncul!

**Cara Kerja Force Sync:**
- Hapus data localStorage lokal
- Force reload dari Firebase Cloud
- Update semua tampilan

### Langkah 2: Verifikasi Firebase Status

Cek header aplikasi, pastikan muncul:
- **☁️ Multi-Device Sync** ✅ (Firebase aktif)
- BUKAN **💾 Local Only** ❌ (Firebase off)

---

## 🔍 Diagnosis Lengkap

### Test 1: Cek Firebase Enabled

**Di Console Browser (F12):**
```javascript
console.log('Firebase enabled:', ENABLE_FIREBASE);
console.log('Firebase initialized:', firebaseInitialized);
```

**Expected:**
```
Firebase enabled: true
Firebase initialized: true
```

**Jika false:**
- Buka `firebase-config.js`
- Pastikan `ENABLE_FIREBASE = true`
- Hard refresh (Ctrl+Shift+R)

### Test 2: Cek Firebase Connection

```javascript
cloudStorage.checkConnection().then(status => {
  console.log('Firebase connection:', status);
});
```

**Expected:**
```
Firebase connection: { connected: true, source: 'firebase' }
```

**Jika not connected:**
- Cek internet connection
- Cek Firebase Database Rules
- Hard refresh browser

### Test 3: Cek Data di Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Project: **bapperida-penilaian**
3. **Realtime Database** → Tab **Data**
4. Cek apakah data inovasi ada di `/penilaian`

**Jika tidak ada data:**
- Teman Anda belum save dengan benar
- Atau Firebase belum aktif di perangkat teman

### Test 4: Cek localStorage vs Firebase

```javascript
// Data di localStorage lokal
const localData = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
console.log('localStorage:', Object.keys(localData));

// Data di Firebase
cloudStorage.loadAllDraf().then(data => {
  console.log('Firebase:', Object.keys(data));
});
```

**Compare:**
- Jika beda, berarti data belum sync
- Gunakan Force Sync untuk pull dari Firebase

---

## 🚨 Skenario Masalah & Solusi

### Scenario 1: Teman pakai localhost, saya pakai GitHub Pages

**Masalah:**
- URL berbeda = localStorage berbeda
- Data tidak akan pernah sync karena beda domain

**Solusi:**
- **Pastikan kedua pakai URL yang sama!**
- Semua pakai GitHub Pages: `https://[username].github.io/bapperida`
- ATAU semua pakai localhost: `http://localhost:8000`

### Scenario 2: Firebase rules belum di-publish

**Gejala:**
- Error di console: `PERMISSION_DENIED`
- Data tidak tersimpan ke Firebase

**Solusi:**
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Realtime Database → **Rules**
3. Set rules:
```json
{
  "rules": {
    "penilaian": {
      ".read": true,
      ".write": true
    }
  }
}
```
4. Klik **Publish**
5. Tunggu 1-2 menit
6. Force Sync di aplikasi

### Scenario 3: Teman belum save dengan benar

**Cek di perangkat teman:**
1. Buka Console (F12)
2. Cek log saat klik Simpan:
```
💾 Saving data for: [NAMA_INOVASI]
☁️ Synced to Firebase  ← HARUS ADA INI
✅ saveAll COMPLETE
```

**Jika tidak ada "Synced to Firebase":**
- Firebase tidak aktif di perangkat teman
- Teman perlu aktifkan Firebase
- Atau simpan ulang

### Scenario 4: Cache browser

**Solusi:**
1. Hard refresh: **Ctrl+Shift+R** (Windows) atau **Cmd+Shift+R** (Mac)
2. Atau clear cache:
   - Chrome: Settings → Privacy → Clear browsing data
   - Pilih: Cached images and files
   - Time range: All time
   - Clear data
3. Reload halaman
4. Klik **Force Sync**

### Scenario 5: Data ada di Firebase tapi tidak muncul

**Solusi:**
1. Klik **☁️ Force Sync**
2. Atau manual di console:
```javascript
// Clear localStorage
localStorage.removeItem("draf_iid2026_all");

// Force reload dari Firebase
cloudStorage.loadAllDraf().then(data => {
  console.log('Loaded:', Object.keys(data).length, 'items');
  location.reload();
});
```

---

## 📋 Checklist Sync Berhasil

### ✅ Perangkat Teman (yang menilai):
- [ ] Firebase enabled (`ENABLE_FIREBASE = true`)
- [ ] Firebase status: ☁️ Multi-Device Sync
- [ ] Isi penilaian lengkap
- [ ] Klik **Simpan**
- [ ] Console log: "☁️ Synced to Firebase"
- [ ] Data muncul di Firebase Console

### ✅ Perangkat Anda (yang lihat):
- [ ] Buka URL yang **sama** dengan teman
- [ ] Firebase enabled
- [ ] Firebase status: ☁️ Multi-Device Sync
- [ ] Klik **☁️ Force Sync**
- [ ] Data teman muncul!

---

## 🎯 Workflow Ideal

### Perangkat A (Teman):
1. Login dengan akun (misal: Mustafa)
2. Cek status: ☁️ Multi-Device Sync
3. Pilih inovasi
4. Isi penilaian
5. Klik Simpan
6. Lihat console: "☁️ Synced to Firebase"
7. ✅ Done

### Perangkat B (Anda):
1. Login dengan akun yang **sama** (Mustafa)
2. Cek status: ☁️ Multi-Device Sync
3. Klik **☁️ Force Sync** (untuk paksa reload)
4. Atau refresh halaman beberapa kali
5. Data teman muncul di "Edit Penilaian"
6. ✅ Bisa lanjut edit

---

## 🔧 Command Debugging

### Force Reload dari Firebase
```javascript
// Clear cache lokal
localStorage.removeItem("draf_iid2026_all");

// Load fresh dari Firebase
await cloudStorage.loadAllDraf();

// Reload page
location.reload();
```

### Cek Perbedaan Data
```javascript
const local = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
const firebase = await cloudStorage.loadAllDraf();

console.log('Local inovasi:', Object.keys(local));
console.log('Firebase inovasi:', Object.keys(firebase));
console.log('Diff:', 
  Object.keys(firebase).filter(k => !Object.keys(local).includes(k))
);
```

### Manual Sync Satu Inovasi
```javascript
const namaInovasi = "SIANCIL"; // ganti dengan nama inovasi

// Load dari Firebase
const snapshot = await firebase.database()
  .ref(`penilaian/${namaInovasi}`)
  .once('value');
  
const data = snapshot.val();
console.log('Data:', data);

// Save ke localStorage
const all = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
all[namaInovasi] = data;
localStorage.setItem("draf_iid2026_all", JSON.stringify(all));

// Reload
location.reload();
```

---

## 💡 Tips Mencegah Masalah Sync

1. **Selalu gunakan URL yang sama** di semua perangkat
2. **Pastikan Firebase status: ☁️ Multi-Device Sync** sebelum mulai
3. **Klik Force Sync** setiap kali buka aplikasi di perangkat baru
4. **Hard refresh** (Ctrl+Shift+R) jika ada update kode
5. **Jangan edit bersamaan** di 2 perangkat (wait turn)

---

## 📞 Masih Bermasalah?

### Langkah Terakhir:

1. **Screenshot:**
   - Firebase status di header
   - Console log (F12)
   - Firebase Console (data tab)

2. **Info yang dibutuhkan:**
   - URL yang digunakan (localhost / GitHub Pages)
   - Browser & versi
   - Akun yang digunakan
   - Nama inovasi yang bermasalah

3. **Test sederhana:**
   ```javascript
   // Di console browser
   console.log('ENABLE_FIREBASE:', ENABLE_FIREBASE);
   console.log('firebaseInitialized:', firebaseInitialized);
   cloudStorage.checkConnection().then(console.log);
   ```

---

**Update:** 1 Oktober 2026
**Status:** ✅ Force Sync Feature Added
**Tombol:** ☁️ Force Sync di Dashboard
