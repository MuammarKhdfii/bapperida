# 🔄 Sinkronisasi Data Antar Perangkat

## 🎯 Tujuan

Memungkinkan juri (misalnya Mustafa) melakukan penilaian di perangkat A, dan data otomatis tersinkron ke perangkat B secara real-time.

## 📊 Status Saat Ini

❌ **BELUM AKTIF** - Sistem masih menggunakan localStorage (data tersimpan per browser)

## ✅ Cara Mengaktifkan

Ikuti panduan lengkap di **[SETUP_FIREBASE.md](./SETUP_FIREBASE.md)**

### Quick Summary:

1. **Buat Firebase Project** di https://console.firebase.google.com/
2. **Enable Realtime Database**
3. **Copy Firebase Config** ke `firebase-config.js`
4. **Set `ENABLE_FIREBASE = true`** di `firebase-config.js`
5. **Tambahkan Firebase SDK** ke file HTML
6. **Deploy** ke GitHub Pages

⏱️ **Estimasi waktu setup:** 10-15 menit

## 🔧 File yang Perlu Diupdate

### 1. `firebase-config.js`
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  // ... (copy dari Firebase Console)
};

const ENABLE_FIREBASE = true;  // ← Ubah jadi true
```

### 2. Tambahkan ke `index.html`, `penilaian.html`, `dashboard.html`
```html
<!-- Sebelum </body>, sebelum script lain -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
<script src="firebase-config.js"></script>
```

## 🧪 Testing

1. Buka aplikasi di Chrome (Perangkat A)
2. Login sebagai Mustafa
3. Nilai inovasi "SIANCIL"
4. Simpan penilaian
5. Buka aplikasi di Firefox/HP (Perangkat B)
6. Login sebagai Mustafa
7. ✅ Data penilaian "SIANCIL" sudah muncul!

## 💡 Catatan Penting

- **Gratis** untuk penggunaan internal (< 100 juri)
- **Real-time** - update otomatis tanpa refresh
- **Fallback** - Jika offline, tetap bisa menggunakan localStorage
- **Aman** - Bisa ditambahkan autentikasi untuk production

## 📞 Bantuan

Jika ada kesulitan setup, baca dokumentasi lengkap di `SETUP_FIREBASE.md`

---

**File terkait:**
- `firebase-config.js` - Konfigurasi Firebase
- `shared.js` - Logic storage (sudah support Firebase)
- `SETUP_FIREBASE.md` - Panduan setup lengkap
