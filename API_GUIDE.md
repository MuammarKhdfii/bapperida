# 🔌 PANDUAN API - SISTEM PENILAIAN INOVASI DAERAH

## BAPPERIDA KOTA METRO 2027

---

## 📋 Daftar Isi
- [1. Arsitektur API](#1-arsitektur-api)
- [2. Autentikasi](#2-autentikasi)
- [3. Endpoint Users & Auth](#3-endpoint-users--auth)
- [4. Endpoint Inovasi](#4-endpoint-inovasi)
- [5. Endpoint Penilaian](#5-endpoint-penilaian)
- [6. Endpoint Dashboard & Ranking](#6-endpoint-dashboard--ranking)
- [7. Response Format](#7-response-format)
- [8. Error Handling](#8-error-handling)

---

## 1. Arsitektur API

### Struktur Folder
```
api/
├── config/
│   ├── database.php       # Koneksi database
│   └── config.php          # Konfigurasi umum
├── middleware/
│   └── auth.php            # Middleware autentikasi
├── controllers/
│   ├── AuthController.php
│   ├── InovasiController.php
│   ├── PenilaianController.php
│   └── DashboardController.php
├── models/
│   ├── User.php
│   ├── Inovasi.php
│   ├── Penilaian.php
│   └── Ranking.php
└── routes/
    └── api.php             # Definisi routes
```

### Base URL
```
https://bapperida.metro.go.id/api/v1
```

atau lokal:
```
http://localhost/bapperida/api/v1
```

---

## 2. Autentikasi

### Login Flow
1. User submit username + password
2. Server validasi credentials
3. Server generate JWT token atau session
4. Client simpan token di localStorage/cookie
5. Setiap request kirim token di header

### JWT Token Format
```http
Authorization: Bearer <token>
```

### Session Cookie (Alternative)
```http
Cookie: session_id=<session_id>
```

---

## 3. Endpoint Users & Auth

### 3.1 Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "eva.rolia",
  "password": "juri2027"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "user_id": 2,
      "username": "eva.rolia",
      "nama": "Dr. Ir. Eva Rolia, M.T., M.K.M.",
      "role": "juri_judul",
      "label": "Juri Judul Inovasi"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "redirect": "index.html"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Username atau password salah"
}
```

### 3.2 Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

### 3.3 Get Session/Profile

```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": 2,
    "username": "eva.rolia",
    "nama": "Dr. Ir. Eva Rolia, M.T., M.K.M.",
    "role": "juri_judul",
    "label": "Juri Judul Inovasi",
    "last_login": "2027-01-15 10:30:00"
  }
}
```

### 3.4 Get All Users (Admin Only)

```http
GET /api/v1/users
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "user_id": 1,
      "username": "admin",
      "nama": "Administrator",
      "role": "admin",
      "is_active": true
    },
    {
      "user_id": 2,
      "username": "eva.rolia",
      "nama": "Dr. Ir. Eva Rolia, M.T., M.K.M.",
      "role": "juri_judul",
      "is_active": true
    }
  ]
}
```

---

## 4. Endpoint Inovasi

### 4.1 Get All Inovasi

```http
GET /api/v1/inovasi
Authorization: Bearer <token>
```

**Query Parameters:**
- `kategori` (optional): `opd`, `pendidikan`, `kesehatan`
- `tahun` (optional): `2025`, `2026`
- `status` (optional): `draft`, `dalam_penilaian`, `selesai`
- `search` (optional): keyword pencarian

**Example:**
```http
GET /api/v1/inovasi?kategori=opd&tahun=2026&search=digital
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "inovasi_id": 1,
      "judul_inovasi": "Digitalisasi Laporan Ikhtisar Pengawasan APIP",
      "perangkat_daerah": "Inspektorat Daerah",
      "kategori_opd": "OPD",
      "bentuk_inovasi": "Tata Kelola Pemerintahan Daerah",
      "ringkasan": "Transformasi pengelolaan...",
      "tahun_implementasi": 2026,
      "status_inovasi": "dalam_penilaian"
    }
  ],
  "total": 95
}
```

### 4.2 Get Detail Inovasi

```http
GET /api/v1/inovasi/{id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "inovasi_id": 1,
    "judul_inovasi": "Digitalisasi Laporan Ikhtisar Pengawasan APIP",
    "perangkat_daerah": {
      "opd_id": 1,
      "nama_opd": "Inspektorat Daerah",
      "kategori": "OPD"
    },
    "bentuk_inovasi": {
      "bentuk_id": 1,
      "nama_bentuk": "Tata Kelola Pemerintahan Daerah"
    },
    "ringkasan": "Transformasi pengelolaan...",
    "latar_belakang": "...",
    "tujuan": "...",
    "manfaat": "...",
    "tahun_implementasi": 2026,
    "status_inovasi": "dalam_penilaian",
    "created_at": "2026-01-10 08:00:00"
  }
}
```

### 4.3 Create Inovasi (Admin Only)

```http
POST /api/v1/inovasi
Authorization: Bearer <token>
Content-Type: application/json

{
  "opd_id": 1,
  "bentuk_id": 1,
  "judul_inovasi": "Sistem Baru Inovasi",
  "ringkasan": "Deskripsi singkat...",
  "latar_belakang": "...",
  "tujuan": "...",
  "manfaat": "...",
  "tahun_implementasi": 2027
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inovasi berhasil ditambahkan",
  "data": {
    "inovasi_id": 96,
    "judul_inovasi": "Sistem Baru Inovasi"
  }
}
```

### 4.4 Update Inovasi (Admin Only)

```http
PUT /api/v1/inovasi/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "judul_inovasi": "Judul Baru",
  "ringkasan": "Ringkasan baru..."
}
```

### 4.5 Delete Inovasi (Admin Only)

```http
DELETE /api/v1/inovasi/{id}
Authorization: Bearer <token>
```

---

## 5. Endpoint Penilaian

### 5.1 Get Kriteria Judul

```http
GET /api/v1/kriteria-judul
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "kriteria_id": 1,
      "nomor_kriteria": 1,
      "nama_kriteria": "Kebaruan & Orisinalitas",
      "bobot": 5,
      "deskripsi": "Sejauh mana inovasi menghadirkan...",
      "parameter": [
        {
          "parameter_id": 1,
          "nilai_parameter": 1,
          "deskripsi_parameter": "Modifikasi kecil..."
        },
        {
          "parameter_id": 2,
          "nilai_parameter": 2,
          "deskripsi_parameter": "Adaptasi dengan penyesuaian..."
        },
        {
          "parameter_id": 3,
          "nilai_parameter": 3,
          "deskripsi_parameter": "Gagasan benar-benar baru..."
        }
      ]
    }
  ]
}
```

### 5.2 Get Indikator SID

```http
GET /api/v1/indikator-sid
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "indikator_id": 1,
      "nomor_indikator": 16,
      "nomor_tampil": 1,
      "nama_indikator": "Infrastruktur Teknologi: Regulasi Inovasi Daerah",
      "bobot": 3.0,
      "tipe_indikator": "radio",
      "keterangan": "Regulasi landasan operasional inovasi",
      "parameter": [
        {
          "parameter_id": 1,
          "nilai_parameter": 1,
          "deskripsi_parameter": "SK Kepala Daerah..."
        },
        {
          "parameter_id": 2,
          "nilai_parameter": 2,
          "deskripsi_parameter": "Peraturan Kepala Daerah..."
        },
        {
          "parameter_id": 3,
          "nilai_parameter": 3,
          "deskripsi_parameter": "Peraturan Daerah..."
        }
      ]
    }
  ]
}
```

### 5.3 Get Penilaian Judul (By Inovasi & Juri)

```http
GET /api/v1/penilaian/judul/{inovasi_id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "inovasi_id": 1,
    "juri_id": 2,
    "penilaian": [
      {
        "kriteria_id": 1,
        "nama_kriteria": "Kebaruan & Orisinalitas",
        "nilai_dipilih": 3,
        "skor": 15.00,
        "catatan": null,
        "status_penilaian": "final"
      },
      {
        "kriteria_id": 2,
        "nama_kriteria": "Relevansi & Dampak",
        "nilai_dipilih": 2,
        "skor": 10.00,
        "catatan": null,
        "status_penilaian": "draft"
      }
    ],
    "total_skor": 25.00,
    "kelengkapan": 33.33
  }
}
```

### 5.4 Save Penilaian Judul

```http
POST /api/v1/penilaian/judul
Authorization: Bearer <token>
Content-Type: application/json

{
  "inovasi_id": 1,
  "penilaian": [
    {
      "kriteria_id": 1,
      "nilai_dipilih": 3,
      "catatan": "Sangat inovatif"
    },
    {
      "kriteria_id": 2,
      "nilai_dipilih": 2,
      "catatan": null
    }
  ],
  "status": "draft"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Penilaian judul berhasil disimpan",
  "data": {
    "inovasi_id": 1,
    "juri_id": 2,
    "total_skor": 25.00,
    "jumlah_kriteria_dinilai": 2,
    "status": "draft"
  }
}
```

### 5.5 Finalize Penilaian Judul

```http
POST /api/v1/penilaian/judul/finalize
Authorization: Bearer <token>
Content-Type: application/json

{
  "inovasi_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Penilaian judul berhasil difinalisasi",
  "data": {
    "inovasi_id": 1,
    "juri_id": 2,
    "total_skor": 57.00,
    "status": "final"
  }
}
```

### 5.6 Get Penilaian Indikator

```http
GET /api/v1/penilaian/indikator/{inovasi_id}
Authorization: Bearer <token>
```

### 5.7 Save Penilaian Indikator

```http
POST /api/v1/penilaian/indikator
Authorization: Bearer <token>
Content-Type: application/json

{
  "inovasi_id": 1,
  "penilaian_radio": [
    {
      "indikator_id": 1,
      "nilai_dipilih": 3,
      "catatan": null
    }
  ],
  "penilaian_monev": [
    {
      "indikator_id": 19,
      "jumlah_dokumen": 5,
      "keterangan": "Dokumen monev lengkap"
    }
  ],
  "penilaian_video": [
    {
      "indikator_id": 20,
      "url_video": "https://youtube.com/watch?v=xxx",
      "judul_video": "Video Dokumentasi Inovasi"
    }
  ],
  "status": "draft"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Penilaian indikator berhasil disimpan",
  "data": {
    "inovasi_id": 1,
    "juri_id": 5,
    "total_skor": 82.00,
    "jumlah_indikator_dinilai": 18,
    "status": "draft"
  }
}
```

### 5.8 Batch Save (Judul + Indikator)

```http
POST /api/v1/penilaian/batch-save
Authorization: Bearer <token>
Content-Type: application/json

{
  "inovasi_id": 1,
  "penilaian_judul": [...],
  "penilaian_indikator": [...],
  "status": "final"
}
```

---

## 6. Endpoint Dashboard & Ranking

### 6.1 Dashboard Admin - Statistik Umum

```http
GET /api/v1/dashboard/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_inovasi": 95,
    "total_inovasi_dinilai": 78,
    "total_inovasi_lengkap": 45,
    "total_juri": 6,
    "juri_aktif": 5,
    "rata_rata_skor": 67.5,
    "inovasi_tertinggi": {
      "inovasi_id": 5,
      "judul": "SITEGGRASI SP2D",
      "skor": 89.75
    },
    "progress_penilaian": {
      "judul": {
        "selesai": 60,
        "sebagian": 15,
        "belum": 20
      },
      "indikator": {
        "selesai": 55,
        "sebagian": 20,
        "belum": 20
      }
    }
  }
}
```

### 6.2 Dashboard - Rekap Per Inovasi

```http
GET /api/v1/dashboard/inovasi
Authorization: Bearer <token>
```

**Query Parameters:**
- `kategori`: filter by kategori
- `sort`: `ranking_asc`, `ranking_desc`, `nama_asc`, `nama_desc`
- `page`: pagination
- `limit`: jumlah per halaman (default 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "inovasi_id": 5,
      "judul_inovasi": "SITEGGRASI SP2D",
      "perangkat_daerah": "Badan Keuangan dan Aset Daerah",
      "kategori": "OPD",
      "rata_rata_judul": 54.33,
      "rata_rata_indikator": 35.42,
      "rata_rata_total": 89.75,
      "peringkat": 1,
      "jumlah_juri_judul": 3,
      "jumlah_juri_indikator": 3,
      "status_penilaian": "lengkap",
      "detail_juri": [
        {
          "nama_juri": "Dr. Ir. Eva Rolia",
          "role": "juri_judul",
          "skor_judul": 57.00,
          "skor_indikator": 36.00
        },
        {
          "nama_juri": "Ir. Arif Joko Arwoko",
          "role": "juri_judul",
          "skor_judul": 54.00,
          "skor_indikator": null
        }
      ]
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_records": 95,
    "per_page": 20
  }
}
```

### 6.3 Ranking - Top N

```http
GET /api/v1/ranking/top/{n}
Authorization: Bearer <token>
```

**Example:**
```http
GET /api/v1/ranking/top/10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "peringkat": 1,
      "inovasi_id": 5,
      "judul_inovasi": "SITEGGRASI SP2D",
      "perangkat_daerah": "BKAD",
      "kategori": "OPD",
      "rata_rata_total": 89.75,
      "badge": "🥇"
    },
    {
      "peringkat": 2,
      "inovasi_id": 3,
      "judul_inovasi": "Klinik Inovasi Daerah",
      "perangkat_daerah": "BAPPERIDA",
      "kategori": "OPD",
      "rata_rata_total": 87.25,
      "badge": "🥈"
    }
  ]
}
```

### 6.4 Ranking by Kategori

```http
GET /api/v1/ranking/kategori/{kategori}
Authorization: Bearer <token>
```

**Example:**
```http
GET /api/v1/ranking/kategori/opd
GET /api/v1/ranking/kategori/pendidikan
GET /api/v1/ranking/kategori/kesehatan
```

### 6.5 Dashboard - Rekap Per Juri

```http
GET /api/v1/dashboard/juri
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "user_id": 2,
      "nama_juri": "Dr. Ir. Eva Rolia, M.T., M.K.M.",
      "role": "juri_judul",
      "inovasi_dinilai": 45,
      "rata_rata_skor": 54.8,
      "status_penilaian": {
        "lengkap": 40,
        "sebagian": 5,
        "belum": 50
      }
    }
  ]
}
```

### 6.6 Export Data

```http
GET /api/v1/export/{format}
Authorization: Bearer <token>
```

**Formats:**
- `excel`: Download Excel (.xlsx)
- `pdf`: Download PDF
- `csv`: Download CSV

**Query Parameters:**
- `inovasi_id` (optional): Export specific inovasi
- `juri_id` (optional): Export specific juri
- `kategori` (optional): Filter by kategori

**Example:**
```http
GET /api/v1/export/excel?kategori=opd
```

**Response:**
```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="rekap_penilaian_2027.xlsx"

[Binary file content]
```

---

## 7. Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operasi berhasil",
  "data": {
    // ... data response
  },
  "meta": {
    "timestamp": "2027-01-15T10:30:00Z",
    "version": "1.0"
  }
}
```

### Pagination Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_records": 200,
    "per_page": 20,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## 8. Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "Deskripsi error",
  "error_code": "ERROR_CODE",
  "details": {
    // ... error details
  }
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat |
| 400 | Bad Request | Request tidak valid |
| 401 | Unauthorized | Token tidak valid atau tidak ada |
| 403 | Forbidden | Tidak memiliki akses |
| 404 | Not Found | Resource tidak ditemukan |
| 422 | Unprocessable Entity | Validasi gagal |
| 500 | Internal Server Error | Error di server |

### Error Codes

```javascript
const ERROR_CODES = {
  // Authentication Errors
  'AUTH_001': 'Token tidak valid',
  'AUTH_002': 'Token expired',
  'AUTH_003': 'Unauthorized access',
  'AUTH_004': 'Invalid credentials',
  
  // Validation Errors
  'VAL_001': 'Data tidak lengkap',
  'VAL_002': 'Format data tidak valid',
  'VAL_003': 'Nilai parameter tidak valid',
  
  // Resource Errors
  'RES_001': 'Inovasi tidak ditemukan',
  'RES_002': 'User tidak ditemukan',
  'RES_003': 'Penilaian tidak ditemukan',
  
  // Business Logic Errors
  'BUS_001': 'Penilaian sudah difinalisasi',
  'BUS_002': 'Penilaian belum lengkap',
  'BUS_003': 'Akses ditolak untuk role ini'
};
```

### Example Error Responses

**401 - Unauthorized:**
```json
{
  "success": false,
  "message": "Token tidak valid atau sudah expired",
  "error_code": "AUTH_002"
}
```

**422 - Validation Error:**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "error_code": "VAL_001",
  "details": {
    "inovasi_id": ["Field inovasi_id wajib diisi"],
    "nilai_dipilih": ["Nilai harus antara 1-3"]
  }
}
```

**403 - Forbidden:**
```json
{
  "success": false,
  "message": "Anda tidak memiliki akses ke resource ini",
  "error_code": "AUTH_003"
}
```

---

## 📚 Contoh Implementasi

### JavaScript (Fetch API)

```javascript
// Helper function untuk API call
async function apiCall(endpoint, method = 'GET', data = null) {
    const token = localStorage.getItem('auth_token');
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(`/api/v1${endpoint}`, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Request gagal');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Contoh penggunaan
async function login(username, password) {
    const result = await apiCall('/auth/login', 'POST', {
        username,
        password
    });
    
    if (result.success) {
        localStorage.setItem('auth_token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        window.location.href = result.data.redirect;
    }
}

async function savePenilaianJudul(inovasiId, penilaian) {
    const result = await apiCall('/penilaian/judul', 'POST', {
        inovasi_id: inovasiId,
        penilaian: penilaian,
        status: 'draft'
    });
    
    return result;
}

async function getRanking() {
    const result = await apiCall('/ranking/top/10');
    return result.data;
}
```

### PHP (Backend Example)

```php
<?php
// api/controllers/PenilaianController.php

class PenilaianController {
    private $db;
    
    public function __construct($database) {
        $this->db = $database;
    }
    
    public function savePenilaianJudul($request, $user) {
        try {
            // Validasi input
            $validator = $this->validatePenilaianJudul($request);
            if (!$validator['valid']) {
                return $this->errorResponse($validator['errors'], 422);
            }
            
            $inovasiId = $request['inovasi_id'];
            $juriId = $user['user_id'];
            $penilaian = $request['penilaian'];
            
            // Begin transaction
            $this->db->beginTransaction();
            
            $totalSkor = 0;
            
            // Loop setiap kriteria
            foreach ($penilaian as $item) {
                $kriteriaId = $item['kriteria_id'];
                $nilaiDipilih = $item['nilai_dipilih'];
                $catatan = $item['catatan'] ?? null;
                
                // Ambil bobot
                $stmt = $this->db->prepare(
                    "SELECT bobot FROM kriteria_judul WHERE kriteria_id = ?"
                );
                $stmt->execute([$kriteriaId]);
                $kriteria = $stmt->fetch();
                
                if (!$kriteria) {
                    throw new Exception("Kriteria tidak ditemukan");
                }
                
                $skor = $nilaiDipilih * $kriteria['bobot'];
                $totalSkor += $skor;
                
                // Insert atau update penilaian
                $stmt = $this->db->prepare("
                    INSERT INTO penilaian_judul 
                        (inovasi_id, juri_id, kriteria_id, nilai_dipilih, skor, catatan, status_penilaian) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                        nilai_dipilih = ?, 
                        skor = ?, 
                        catatan = ?,
                        status_penilaian = ?
                ");
                
                $status = $request['status'] ?? 'draft';
                
                $stmt->execute([
                    $inovasiId, $juriId, $kriteriaId, $nilaiDipilih, $skor, $catatan, $status,
                    $nilaiDipilih, $skor, $catatan, $status
                ]);
            }
            
            // Update rekap
            $this->updateRekapPenilaian($inovasiId, $juriId);
            
            // Update ranking
            $this->updateRankingInovasi($inovasiId);
            
            // Commit transaction
            $this->db->commit();
            
            // Log aktivitas
            $this->logActivity($juriId, 'SIMPAN_PENILAIAN_JUDUL', 
                "Menyimpan penilaian judul untuk inovasi ID $inovasiId");
            
            return $this->successResponse([
                'inovasi_id' => $inovasiId,
                'juri_id' => $juriId,
                'total_skor' => $totalSkor,
                'jumlah_kriteria_dinilai' => count($penilaian),
                'status' => $status
            ], 'Penilaian judul berhasil disimpan');
            
        } catch (Exception $e) {
            $this->db->rollBack();
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    
    private function validatePenilaianJudul($request) {
        $errors = [];
        
        if (empty($request['inovasi_id'])) {
            $errors['inovasi_id'] = 'Field inovasi_id wajib diisi';
        }
        
        if (empty($request['penilaian']) || !is_array($request['penilaian'])) {
            $errors['penilaian'] = 'Field penilaian harus berupa array';
        }
        
        foreach ($request['penilaian'] as $item) {
            if (empty($item['kriteria_id'])) {
                $errors['kriteria_id'] = 'kriteria_id tidak boleh kosong';
            }
            
            if (!isset($item['nilai_dipilih']) || $item['nilai_dipilih'] < 1 || $item['nilai_dipilih'] > 3) {
                $errors['nilai_dipilih'] = 'nilai_dipilih harus antara 1-3';
            }
        }
        
        return [
            'valid' => empty($errors),
            'errors' => $errors
        ];
    }
    
    private function successResponse($data, $message = 'Success') {
        return [
            'success' => true,
            'message' => $message,
            'data' => $data
        ];
    }
    
    private function errorResponse($message, $code = 400) {
        http_response_code($code);
        return [
            'success' => false,
            'message' => $message
        ];
    }
}
```

---

## 🔐 Security Best Practices

### 1. Password Hashing
```php
// JANGAN gunakan plain text!
$password = 'juri2027';

// Gunakan bcrypt
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Verifikasi
if (password_verify($inputPassword, $hashedPassword)) {
    // Password benar
}
```

### 2. SQL Injection Prevention
```php
// ❌ JANGAN seperti ini
$query = "SELECT * FROM users WHERE username = '$username'";

// ✅ Gunakan prepared statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
```

### 3. XSS Prevention
```php
// Escape output
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
```

### 4. CSRF Protection
```php
// Generate CSRF token
$token = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $token;

// Validasi
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    die('CSRF token tidak valid');
}
```

### 5. Rate Limiting
```php
// Batasi request per IP
$redis = new Redis();
$key = 'rate_limit:' . $_SERVER['REMOTE_ADDR'];
$limit = 100; // 100 requests
$window = 3600; // per hour

$current = $redis->incr($key);
if ($current == 1) {
    $redis->expire($key, $window);
}

if ($current > $limit) {
    http_response_code(429);
    die('Too many requests');
}
```

---

## 📝 Testing

### Postman Collection Example

```json
{
  "info": {
    "name": "Sistem Penilaian Inovasi API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"eva.rolia\",\n  \"password\": \"juri2027\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{base_url}}/auth/login",
              "host": ["{{base_url}}"],
              "path": ["auth", "login"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost/bapperida/api/v1"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

---

Dokumen dibuat: 28 Desember 2024  
Versi: 1.0  
Tim BAPPERIDA Kota Metro
