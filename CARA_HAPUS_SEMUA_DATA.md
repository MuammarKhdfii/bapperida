# 🗑️ CARA HAPUS SEMUA DATA PENILAIAN

## ⚠️ PERINGATAN

Fitur ini akan menghapus **SEMUA data penilaian dari SEMUA juri**, bukan hanya data dari akun yang sedang login.

---

## 🎯 APA YANG DIHAPUS?

Ketika klik tombol **"🗑️ Hapus Data"**:

1. ✗ **Semua penilaian dari SEMUA juri**
   - Juri Judul (3 orang)
   - Juri Indikator (3 orang)

2. ✗ **Semua data di localStorage**
   - `draf_iid2026_all`
   - `draf_iid2026_last`
   - `iid2026_selected`

3. ✗ **Semua data di Firebase Cloud**
   - Path: `/penilaian/`
   - Semua inovasi yang sudah dinilai

4. ✗ **Seluruh ranking**
   - Dashboard perangkingan akan kosong
   - Progress juri kembali 0/3

---

## 📋 CARA PAKAI

### Step 1: Klik Tombol "Hapus Data"

Di halaman index.html, scroll ke section **"Dashboard Perangkingan Inovasi"**:

```
┌─────────────────────────────────────────┐
│ 🏅 Dashboard Perangkingan Inovasi       │
│                                         │
│ [☁️ Force Sync] [🔄 Refresh] [🗑️ Hapus Data] │
└─────────────────────────────────────────┘
                                    ↑
                              Klik tombol ini
```

---

### Step 2: Konfirmasi dengan Mengetik

Akan muncul prompt box dengan pesan:

```
⚠️ HAPUS SEMUA DATA PENILAIAN?

Ini akan menghapus:
✗ Semua penilaian dari SEMUA juri
✗ Semua data di localStorage
✗ Semua data di Firebase (Cloud)
✗ Seluruh ranking akan hilang

⚠️ TINDAKAN INI TIDAK DAPAT DIBATALKAN!

Ketik 'HAPUS SEMUA' untuk konfirmasi:
```

**Ketik exactly**: `HAPUS SEMUA` (huruf besar semua)

---

### Step 3: Klik OK

Setelah ketik "HAPUS SEMUA" dengan benar:
- Klik **OK**
- Sistem akan hapus semua data

---

### Step 4: Hasil

Akan muncul alert:

```
✅ Semua data berhasil dihapus!

• localStorage: Cleared
• Firebase: Cleared
• Semua juri: Data terhapus

Halaman akan di-refresh.
```

Klik **OK** → Halaman refresh → Dashboard kosong

---

## 🔒 KEAMANAN

### Double Confirmation:

1. **Klik tombol** → Muncul prompt
2. **Ketik "HAPUS SEMUA"** → Exactly (case-sensitive)
3. **Klik OK** → Baru terhapus

Jika salah ketik (misal: "hapus semua", "HAPUS", "DELETE ALL"), akan muncul:

```
Penghapusan dibatalkan.
```

---

## 🎯 USE CASES

### 1. Reset untuk Testing Baru

**Scenario**: Mau mulai test dari awal dengan data bersih

**Steps**:
1. Klik "Hapus Data"
2. Ketik "HAPUS SEMUA"
3. OK
4. Mulai test fresh

---

### 2. Hapus Data Development

**Scenario**: Sudah banyak test data di development, mau clean up

**Steps**:
1. Pastikan Firebase OFF (localhost)
2. Klik "Hapus Data"
3. Confirm
4. Data localhost terhapus, production aman

---

### 3. Reset Production (HATI-HATI!)

**Scenario**: Mau reset semua data production untuk mulai event baru

**Steps**:
1. **BACKUP DULU** (export Firebase data)
2. Pastikan semua juri sudah tahu
3. Klik "Hapus Data" di production
4. Confirm dengan "HAPUS SEMUA"
5. Semua data terhapus

---

## ⚠️ JIKA SALAH HAPUS

### Tidak Ada Undo!

Setelah data terhapus dari Firebase, **TIDAK BISA dikembalikan** kecuali:

1. **Ada backup Firebase**
   - Export data sebelumnya dari Firebase Console
   - Import kembali

2. **Ada copy localStorage**
   - Jika ada backup localStorage di browser lain
   - Copy data `draf_iid2026_all` dari browser yang belum terhapus

---

## 🔧 BACKUP SEBELUM HAPUS (Recommended)

### Backup Firebase Data:

**Via Firebase Console**:
```
1. Go to: https://console.firebase.google.com/
2. Pilih project: bapperida-penilaian
3. Realtime Database → Data tab
4. Klik ⋮ (menu) → Export JSON
5. Save file: backup-YYYY-MM-DD.json
```

### Backup localStorage:

**Via Browser Console**:
```javascript
// Copy semua data localStorage
const backup = {
  allDraf: localStorage.getItem('draf_iid2026_all'),
  last: localStorage.getItem('draf_iid2026_last'),
  selected: localStorage.getItem('iid2026_selected')
};

// Download as JSON
const blob = new Blob([JSON.stringify(backup, null, 2)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `backup-localStorage-${new Date().toISOString().split('T')[0]}.json`;
a.click();
```

---

## 🔄 RESTORE DARI BACKUP

### Restore Firebase:

**Via Firebase Console**:
```
1. Go to: Firebase Console → Realtime Database
2. Klik ⋮ (menu) → Import JSON
3. Pilih file backup: backup-YYYY-MM-DD.json
4. Confirm → Data restored
```

### Restore localStorage:

**Via Browser Console**:
```javascript
// Load backup JSON (paste content dari file backup)
const backup = {
  allDraf: "...", // paste dari backup file
  last: "...",
  selected: "..."
};

// Restore to localStorage
localStorage.setItem('draf_iid2026_all', backup.allDraf);
localStorage.setItem('draf_iid2026_last', backup.last);
localStorage.setItem('iid2026_selected', backup.selected);

console.log('✅ Restored from backup');
location.reload();
```

---

## 📊 CONSOLE LOG

Saat hapus data, console akan menunjukkan:

```
🗑️ Starting delete all data...
✅ localStorage cleared
✅ Firebase data cleared
✅ Delete all data complete
```

Jika ada error:
```
❌ Error clearing Firebase: [error message]
```

---

## 🎯 PERMISSION

**Siapa yang bisa hapus?**

- ✅ **Semua juri** bisa klik tombol "Hapus Data"
- ✅ Tidak perlu admin/coordinator role
- ⚠️ **Hati-hati**: Juri manapun bisa hapus SEMUA data

**Recommended**: 
- Hanya coordinator yang tahu password "HAPUS SEMUA"
- Atau custom permission di future update

---

## 🔮 FUTURE IMPROVEMENTS

Possible enhancements:

- [ ] Tambah role "admin" yang bisa hapus
- [ ] Auto-backup sebelum hapus
- [ ] Soft delete (trash bin)
- [ ] Selective delete (per kategori/juri)
- [ ] Confirm via email/OTP

---

**Developer**: Kiro AI Assistant  
**Date**: October 2, 2026  
**Version**: 1.0  
**Status**: Production Ready ✅

---

*End of Document*
