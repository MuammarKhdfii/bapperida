# 🔥 Setup Firebase untuk Sinkronisasi Data

Dokumen ini menjelaskan cara mengaktifkan sinkronisasi data penilaian antar perangkat menggunakan Firebase Realtime Database.

## 📋 Kenapa Firebase?

Saat ini sistem menggunakan **localStorage** yang bersifat lokal per browser. Jika Mustafa login di perangkat A dan B, data tidak sinkron karena tersimpan di masing-masing browser.

Dengan Firebase, semua data tersimpan di cloud dan otomatis sinkron real-time ke semua perangkat.

## 🚀 Langkah-langkah Setup

### 1. Buat Project Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik **"Add project"** atau **"Create a project"**
3. Nama project: `bapperida-penilaian` (atau sesuai keinginan)
4. Disable Google Analytics (tidak perlu untuk project ini)
5. Klik **Create project**

### 2. Tambahkan Web App

1. Di Firebase Console, klik icon **Web** (</>) untuk menambahkan web app
2. Nama app: `Sistem Penilaian Inovasi`
3. **Jangan** centang "Set up Firebase Hosting" (sudah pakai GitHub Pages)
4. Klik **Register app**
5. Copy semua kode konfigurasi yang muncul (akan digunakan nanti)

### 3. Enable Realtime Database

1. Di menu sidebar Firebase Console, klik **"Realtime Database"**
2. Klik **"Create Database"**
3. Pilih lokasi: **Asia Southeast (singapore)** (paling dekat)
4. Pilih mode: **"Start in test mode"** (untuk development)
5. Klik **Enable**

### 4. Setup Database Rules

Setelah database dibuat, klik tab **"Rules"** dan ganti dengan rules berikut:

```json
{
  "rules": {
    "penilaian": {
      ".read": true,
      ".write": true,
      "$inovasiKey": {
        ".validate": "newData.hasChildren(['namaInovasi', 'savedAt'])"
      }
    }
  }
}
```

**⚠️ PENTING:**
- Rules ini membolehkan siapa saja read/write (cocok untuk internal/testing)
- Untuk production, gunakan Firebase Authentication
- Publish rules dengan klik **"Publish"**

### 5. Update Konfigurasi di Code

1. Buka file `firebase-config.js`
2. Cari bagian `firebaseConfig` dan ganti dengan config dari Firebase Console:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // Ganti dengan API Key Anda
  authDomain: "bapperida-penilaian.firebaseapp.com",
  databaseURL: "https://bapperida-penilaian-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bapperida-penilaian",
  storageBucket: "bapperida-penilaian.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

3. Set `ENABLE_FIREBASE` menjadi `true`:

```javascript
const ENABLE_FIREBASE = true;
```

### 6. Tambahkan Firebase SDK ke HTML

Tambahkan script Firebase SDK sebelum tag `</body>` di semua file HTML yang perlu sinkronisasi:

**File yang perlu ditambahkan:**
- `index.html`
- `penilaian.html`
- `dashboard.html`

**Kode yang ditambahkan** (taruh sebelum `<script src="data.js"></script>`):

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

<!-- Firebase Config -->
<script src="firebase-config.js"></script>
```

### 7. Update `shared.js`

Ganti fungsi `saveAllDraf()` dan `loadAllDraf()` agar menggunakan Firebase:

```javascript
// Ganti fungsi lama dengan yang baru
async function saveAllDraf(all) {
  // Simpan ke semua inovasi sekaligus
  const promises = Object.entries(all).map(([key, value]) => 
    cloudStorage.saveDraf(key, value)
  );
  
  await Promise.all(promises);
  console.log('✅ All data saved');
}

async function loadAllDraf() {
  return await cloudStorage.loadAllDraf();
}
```

### 8. Testing

1. Deploy ke GitHub Pages
2. Buka di 2 browser/perangkat berbeda
3. Login sebagai Mustafa di kedua perangkat
4. Lakukan penilaian di perangkat A
5. Refresh perangkat B → data sudah terupdate!

## 🔍 Cara Cek Data di Firebase

1. Buka Firebase Console → Realtime Database
2. Lihat struktur data di tab "Data":
```
penilaian/
  └── SIANCIL_dot_._dot_._dot_/
      ├── namaInovasi: "SIANCIL..."
      ├── judulState: {...}
      ├── juriState: {...}
      ├── savedAt: "2026-01-01T10:00:00.000Z"
      └── activeJuri: "Mustafa Akhyar, S.E."
```

## ⚡ Fitur Real-time

Setelah setup, sistem akan:
- ✅ Auto-sync data ke cloud setiap kali menyimpan
- ✅ Auto-load data terbaru dari cloud saat buka halaman
- ✅ Real-time update (opsional, bisa ditambahkan listener)
- ✅ Fallback ke localStorage jika offline

## 🛠️ Troubleshooting

### Data tidak tersinkron
- Cek browser console untuk error
- Pastikan `ENABLE_FIREBASE = true`
- Cek Firebase Console → Database Rules
- Pastikan internet connected

### Error "Permission denied"
- Database Rules belum di-set dengan benar
- Update rules sesuai petunjuk di atas

### Firebase SDK not loaded
- Pastikan CDN script sudah ditambahkan ke HTML
- Cek network tab di DevTools

## 💰 Biaya

Firebase Realtime Database **GRATIS** untuk:
- 1 GB stored data
- 10 GB/month downloaded
- 100 simultaneous connections

Untuk 5-10 juri dengan data penilaian, ini lebih dari cukup.

## 🔐 Security (Production)

Untuk production, update database rules:

```json
{
  "rules": {
    "penilaian": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

Dan implementasikan Firebase Authentication.

## 📚 Referensi

- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database/web/start)
- [Database Rules](https://firebase.google.com/docs/database/security)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

**Status:** ⏸️ Firebase disabled by default (localStorage mode)  
**Untuk enable:** Set `ENABLE_FIREBASE = true` di `firebase-config.js`
