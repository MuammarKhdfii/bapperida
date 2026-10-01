# Struktur Database Penilaian Inovasi

## Storage Key
- **localStorage Key**: `draf_iid2026_all`
- **Firebase Realtime Database Path**: `/penilaian/{namaInovasi}`

## Struktur Data Lengkap

```json
{
  "draf_iid2026_all": {
    "NAMA_INOVASI_1": {
      // === METADATA INOVASI ===
      "namaInovasi": "string",
      "perangkatDaerah": "string",
      "bentukInovasi": "string", 
      "tahun": "string",
      "ringkasan": "string",
      "kategori": "opd|pendidikan|kesehatan",
      "createdAt": "ISO8601 timestamp",
      "savedAt": "ISO8601 timestamp",
      "activeJuri": "string (nama juri terakhir yang edit)",
      
      // === STATE PENILAIAN JUDUL ===
      "judulState": {
        "NAMA_JURI_1": {
          "1": "1|2|3",  // Kriteria 1: nilai parameter
          "2": "1|2|3",  // Kriteria 2: nilai parameter
          "3": "1|2|3",  // Kriteria 3: nilai parameter
          "4": "1|2|3",  // Kriteria 4: nilai parameter
          "5": "1|2|3",  // Kriteria 5: nilai parameter
          "6": "1|2|3"   // Kriteria 6: nilai parameter
        },
        "NAMA_JURI_2": { ... }
      },
      
      // === STATE PENILAIAN INDIKATOR SID ===
      "juriState": {
        "NAMA_JURI_1": {
          "radio": {
            "16": "1|2|3",  // Indikator 16: nilai parameter
            "17": "1|2|3",  // Indikator 17: nilai parameter
            "18": "1|2|3",  // Indikator 18: nilai parameter
            "19": "1|2|3",  // Indikator 19: nilai parameter
            "20": "1|2|3",  // Indikator 20: nilai parameter
            "21": "1|2|3",  // Indikator 21: nilai parameter
            "23": "1|2|3",  // Indikator 23: nilai parameter
            "24": "1|2|3",  // Indikator 24: nilai parameter
            "25": "1|2|3",  // Indikator 25: nilai parameter
            "26": "1|2|3",  // Indikator 26: nilai parameter
            "27": "1|2|3",  // Indikator 27: nilai parameter
            "28": "1|2|3",  // Indikator 28: nilai parameter
            "29": "1|2|3",  // Indikator 29: nilai parameter
            "30": "1|2|3",  // Indikator 30: nilai parameter
            "31": "1|2|3",  // Indikator 31: nilai parameter
            "32": "1|2|3",  // Indikator 32: nilai parameter
            "33": "1|2|3",  // Indikator 33: nilai parameter
            "34": "1|2|3",  // Indikator 34: nilai parameter
            "35": "1|2|3",  // Indikator 35: nilai parameter
            "36": "1|2|3"   // Indikator 36: nilai parameter
          },
          "monev": {
            "22": "number"  // Indikator 22: jumlah dokumen monev
          },
          "monevKet": {
            "22": "string"  // Indikator 22: keterangan monev
          },
          "videoUrl": {
            "37": "string"  // Indikator 37: URL video
          },
          "videoKet": {
            "37": "string"  // Indikator 37: judul/keterangan video
          }
        },
        "NAMA_JURI_2": { ... }
      },
      
      // === CATATAN DAN REKOMENDASI ===
      "notesState": {
        "NAMA_JURI_1": {
          "catatan": "string (catatan penilaian)",
          "rekomendasi": "string (rekomendasi perbaikan)"
        },
        "NAMA_JURI_2": { ... }
      },
      
      // === TANDA TANGAN DIGITAL ===
      "signatureState": {
        "NAMA_JURI_1": "data:image/png;base64,...",
        "NAMA_JURI_2": "data:image/png;base64,..."
      },
      
      // === SKOR PER JURI ===
      "skorJudulPerJuri": {
        "NAMA_JURI_1": 85.50,  // float (2 decimal)
        "NAMA_JURI_2": 78.00
      },
      
      "skorPerJuri": {
        "NAMA_JURI_1": 92.30,  // float (2 decimal)
        "NAMA_JURI_2": 88.75
      },
      
      // === METADATA USER (AUDIT TRAIL) ===
      "userMetadata": {
        "NAMA_JURI_1": {
          "nama": "string",
          "email": "string",
          "role": "juri_judul|juri_sid",
          "label": "string (display label)",
          "lastUpdated": "ISO8601 timestamp",
          "skorJudul": 85.50,
          "skorIndikator": 92.30,
          "totalSkor": 177.80,
          "hasCatatan": true,
          "hasRekomendasi": true,
          "hasSignature": true
        },
        "NAMA_JURI_2": { ... }
      }
    },
    
    "NAMA_INOVASI_2": { ... },
    "NAMA_INOVASI_3": { ... }
  }
}
```

## Penjelasan Field

### Metadata Inovasi
- **namaInovasi**: Nama lengkap inovasi
- **perangkatDaerah**: Nama OPD/instansi pemilik inovasi
- **bentukInovasi**: Jenis bentuk inovasi (misal: Digital, Pelayanan, dll)
- **tahun**: Tahun inovasi dibuat
- **ringkasan**: Deskripsi singkat inovasi
- **kategori**: Kategori otomatis berdasarkan perangkatDaerah
  - `opd`: OPD umum
  - `pendidikan`: Dinas Pendidikan, sekolah
  - `kesehatan`: Puskesmas, RSUD, Dinas Kesehatan
- **createdAt**: Timestamp pertama kali data dibuat
- **savedAt**: Timestamp terakhir data diupdate
- **activeJuri**: Nama juri terakhir yang melakukan penilaian

### State Penilaian Judul
- **judulState**: Berisi penilaian 6 kriteria judul per juri
- Setiap kriteria bernilai 1, 2, atau 3 (parameter yang dipilih)
- Skor = nilai × bobot kriteria

### State Penilaian Indikator SID  
- **juriState.radio**: Penilaian indikator reguler (16-21, 23-36)
- **juriState.monev**: Jumlah dokumen monev (indikator 22)
- **juriState.monevKet**: Keterangan dokumen monev
- **juriState.videoUrl**: Link video inovasi (indikator 37)
- **juriState.videoKet**: Judul/deskripsi video
- Indikator 1-15 (SPD) diabaikan
- Indikator tertentu di-skip sesuai kondisi

### Catatan dan Rekomendasi
- **notesState**: Berisi catatan dan rekomendasi per juri
- **catatan**: Catatan umum hasil penilaian
- **rekomendasi**: Rekomendasi perbaikan untuk OPD

### Tanda Tangan Digital
- **signatureState**: Tanda tangan digital dalam format base64 PNG
- Disimpan per juri

### Skor
- **skorJudulPerJuri**: Total skor penilaian judul per juri
- **skorPerJuri**: Total skor penilaian indikator SID per juri
- Dihitung otomatis saat save

### Metadata User (Audit Trail)
- **userMetadata**: Informasi lengkap tentang juri yang menilai
- Menyimpan:
  - Data user (nama, email, role)
  - Timestamp terakhir update
  - Skor yang diperoleh
  - Status kelengkapan (catatan, rekomendasi, tanda tangan)

## Fungsi Storage

### Simpan Data
```javascript
await saveAllDraf(all)
```
- Simpan ke localStorage dengan key `draf_iid2026_all`
- Jika Firebase enabled, sync ke Firebase Realtime Database

### Load Data
```javascript
const all = await loadAllDraf()
```
- Load dari localStorage
- Jika Firebase enabled, ambil dari Firebase

### Save dengan Validasi
```javascript
await doSaveWithValidation()
```
- Validasi semua field wajib sudah diisi
- Hitung skor otomatis
- Simpan dengan metadata lengkap
- Redirect ke dashboard sesuai kategori

## Firebase Sync

Saat `ENABLE_FIREBASE = true` di `firebase-config.js`:

1. **Save**: Data disimpan ke localStorage DAN Firebase
2. **Load**: Data diambil dari Firebase (fallback localStorage)
3. **Real-time**: Perubahan di Firebase akan sync otomatis ke semua device
4. **Struktur Firebase**: 
   ```
   /penilaian
     /NAMA_INOVASI_1
       {...data lengkap...}
     /NAMA_INOVASI_2
       {...data lengkap...}
   ```

## Export/Import Data

### Export ke JSON
```javascript
const data = await loadAllDraf();
const json = JSON.stringify(data, null, 2);
// Download atau copy json
```

### Import dari JSON
```javascript
const importedData = JSON.parse(jsonString);
await saveAllDraf(importedData);
```

## Keamanan Data

- ✅ Data disimpan per user/juri
- ✅ Audit trail lengkap (siapa, kapan, apa)
- ✅ Timestamp untuk tracking perubahan
- ✅ Metadata untuk validasi dan reporting
- ✅ Backup otomatis ke Firebase (jika enabled)

## Query Data

### Ambil semua penilaian inovasi tertentu
```javascript
const all = await loadAllDraf();
const dataInovasi = all["NAMA_INOVASI"];
```

### Ambil skor juri tertentu
```javascript
const skorJudul = dataInovasi.skorJudulPerJuri["NAMA_JURI"];
const skorSID = dataInovasi.skorPerJuri["NAMA_JURI"];
const total = skorJudul + skorSID;
```

### Ambil catatan juri
```javascript
const notes = dataInovasi.notesState["NAMA_JURI"];
const catatan = notes?.catatan || "";
const rekomendasi = notes?.rekomendasi || "";
```

### Cek status kelengkapan
```javascript
const userMeta = dataInovasi.userMetadata["NAMA_JURI"];
const lengkap = userMeta?.hasCatatan && 
                userMeta?.hasRekomendasi && 
                userMeta?.hasSignature;
```

## Update: 1 Oktober 2026
- ✅ Struktur database diperluas untuk audit trail
- ✅ Metadata inovasi disimpan lengkap
- ✅ User metadata untuk tracking
- ✅ Support Firebase Realtime Database
- ✅ Async/await untuk semua operasi storage
