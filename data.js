const indicators = [
  {
    "no": 1,
    "nama": "Institusi: Visi dan Misi",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Kepala Daerah memiliki Misi Inovasi",
      "Kepala Daerah memiliki Visi Inovasi",
      "Kepala Daerah memiliki Misi dan Visi Inovasi"
    ],
    "keterangan": "Berdasarkan dokumen RPJMD / Perkada"
  },
  {
    "no": 2,
    "nama": "Institusi: APBD Tepat Waktu & Mandatory Spending",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Tepat waktu 1 thn terakhir & penuhi 2 komponen mandatory",
      "Tepat waktu 2 thn terakhir & penuhi 3 komponen mandatory",
      "Tepat waktu 3 thn terakhir & penuhi >3 komponen mandatory"
    ],
    "keterangan": "Cakupan 4 komponen mandatory spending (Pendidikan 20%, Kesehatan 10%, Infrastruktur 40% DTU, Pegawai 30%)"
  },
  {
    "no": 3,
    "nama": "Institusi: Kualitas Peningkatan Perizinan",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "<= -50.32%",
      "-50.33% s.d. 8.16%",
      ">= 8.17%"
    ],
    "keterangan": "Persentase peningkatan jumlah izin diterbitkan DPMPTSP (T-1 vs T-2)"
  },
  {
    "no": 4,
    "nama": "Sumber Daya Manusia: Jumlah Pendapatan Perkapita",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "<= 2.04%",
      "2.05% s.d. 5.23%",
      ">= 5.23%"
    ],
    "keterangan": "Berdasarkan data BPS harga konstan (T-1 vs T-2)"
  },
  {
    "no": 5,
    "nama": "Sumber Daya Manusia: Penurunan Tingkat Pengangguran Terbuka (TPT)",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Progres <= 0.00 / TPT >= 5.91",
      "Progres 0.01-0.36 / TPT 2.34-5.92",
      "Progres >= 0.36 / TPT <= 2.35"
    ],
    "keterangan": "Gabungan nilai progres penurunan dan besaran TPT tahun T-1"
  },
  {
    "no": 6,
    "nama": "Sumber Daya Manusia: Jumlah Peningkatan Investasi",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "<= -47.42%",
      "-47.43% s.d. 94.75%",
      ">= 94.76%"
    ],
    "keterangan": "Persentase realisasi investasi dalam rupiah (T-1 vs T-2)"
  },
  {
    "no": 7,
    "nama": "Sumber Daya Manusia: Jumlah Peningkatan PAD",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "<= -5.14%",
      "-5.15% s.d. 33.84%",
      ">= 33.85%"
    ],
    "keterangan": "Persentase peningkatan PAD (T-1 vs T-2)"
  },
  {
    "no": 8,
    "nama": "Sumber Daya Manusia: Opini BPK",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "TMP/Disclaimer atau TW/Adverse",
      "WDP/Qualified",
      "WTP/Unqualified"
    ],
    "keterangan": "Opini BPK atas laporan keuangan Pemda tahun T-1"
  },
  {
    "no": 9,
    "nama": "Sumber Daya Manusia: Nilai Capaian LAKIP",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Kisaran D dan C",
      "Kisaran B",
      "Kisaran A"
    ],
    "keterangan": "Nilai akhir SAKIP Pemda tahun T-1"
  },
  {
    "no": 10,
    "nama": "Sumber Daya Manusia: Penurunan Angka Kemiskinan",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Progres <= 0.07 / Penduduk miskin >= 13.10",
      "Progres 0.08-1.15 / Penduduk miskin 4.81-13.11",
      "Progres >= 1.16 / Penduduk miskin <= 4.82"
    ],
    "keterangan": "Gabungan progres penurunan dan persentase penduduk miskin T-1"
  },
  {
    "no": 11,
    "nama": "Sumber Daya Manusia: Nilai IPM",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Peningkatan <=0.55 atau Capaian <=69.99",
      "Peningkatan 0.56-0.90 atau Capaian 70.00-79.99",
      "Peningkatan >=0.90 atau Capaian >=80.00"
    ],
    "keterangan": "Berdasarkan data IPM BPS"
  },
  {
    "no": 12,
    "nama": "Sumber Daya Manusia: Penghargaan Bagi Inovator",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Piagam tingkat pemda",
      "Piagam & reward/insentif tingkat pemda",
      "Piagam, insentif, dan mekanisme kontrol pembudayaan inovasi"
    ],
    "keterangan": "Penghargaan dalam 2 tahun terakhir"
  },
  {
    "no": 13,
    "nama": "Ekosistem Inovasi & Kebijakan: Rekomendasi Kebijakan & IKK",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "1-3 Rekomendasi / Kualifikasi Cukup-Kurang",
      "4-7 Rekomendasi / Kualifikasi Baik",
      ">7 Rekomendasi / Kualifikasi Unggul/Sangat Baik"
    ],
    "keterangan": "Dinilai dari jumlah policy brief/paper dan Indeks Kualitas Kebijakan"
  },
  {
    "no": 14,
    "nama": "Ekosistem Inovasi & Kebijakan: Rencana Induk & Peta Jalan Pemajuan Iptek (RIPJ PID)",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Masih berbentuk Rancangan RIPJ PID",
      "Dokumen RIPJ PID selesai dan disepakati",
      "Dokumen RIPJ PID ditetapkan dalam Perkada"
    ],
    "keterangan": "Dokumen perencanaan Iptek daerah"
  },
  {
    "no": 15,
    "nama": "Ekosistem Inovasi & Kebijakan: Fasilitasi HAKI atas Inovasi Daerah",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Sosialisasi HAKI",
      "Sosialisasi & fasilitasi administratif pendaftaran HAKI",
      "Sosialisasi, fasilitasi administratif, serta insentif/pembiayaan HAKI"
    ],
    "keterangan": "Bentuk fasilitasi pemda terhadap hak kekayaan intelektual"
  },
  {
    "no": 16,
    "nama": "Infrastruktur Teknologi: Regulasi Inovasi Daerah",
    "bobot": 3.0,
    "special": false,
    "parameter": [
      "SK Kepala Daerah / SK Perangkat Daerah",
      "Peraturan Kepala Daerah (Perkada)",
      "Peraturan Daerah (Perda)"
    ],
    "keterangan": "Regulasi landasan operasional inovasi"
  },
  {
    "no": 17,
    "nama": "Infrastruktur Teknologi: Ketersediaan & Peran SDM",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "1 - 10 SDM",
      "11 - 30 SDM",
      "Lebih dari 30 SDM"
    ],
    "keterangan": "Jumlah tim pengelola inovasi beserta peran"
  },
  {
    "no": 18,
    "nama": "Infrastruktur Teknologi: Dukungan Anggaran",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Anggaran pada 1 tahun anggaran (T-2/T-1/T-0)",
      "Anggaran pada 2 tahun berturut-turut",
      "Anggaran pada 3 tahun (T-2, T-1, T-0)"
    ],
    "keterangan": "Alokasi APBD untuk penerapan inovasi"
  },
  {
    "no": 19,
    "nama": "Kecanggihan Produk: Alat Kerja",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Manual / non-elektronik",
      "Didukung perangkat elektronik",
      "Sistem informasi online / daring / AI"
    ],
    "keterangan": "Sarana/alat kerja operasional inovasi"
  },
  {
    "no": 20,
    "nama": "Kecanggihan Produk: Bimtek Inovasi",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Pernah 1 kali bimtek dalam 3 tahun terakhir",
      "Pernah 2 kali bimtek dalam 3 tahun terakhir",
      "Pernah 3 kali atau lebih bimtek dalam 3 tahun terakhir"
    ],
    "keterangan": "Peningkatan kapasitas pelaksana inovasi"
  },
  {
    "no": 21,
    "nama": "Kecanggihan Produk: Integrasi Program & Kegiatan Inovasi dalam RKPD",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Dalam RKPD T-1 atau T-2",
      "Dalam RKPD T-1 dan T-2",
      "Dalam RKPD T-1, T-2, dan T-0"
    ],
    "keterangan": "Pemuatan program inovasi dalam dokumen perencanaan"
  },
  {
    "no": 22,
    "nama": "Output Pengetahuan: Keterlibatan Aktor Inovasi",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Melibatkan 3 Aktor",
      "Melibatkan 4 Aktor",
      "Melibatkan 5 Aktor atau lebih"
    ],
    "keterangan": "Unsur: akademisi, bisnis, komunitas, pemerintah, media"
  },
  {
    "no": 23,
    "nama": "Output Pengetahuan: Pelaksana Inovasi Daerah",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Ada pelaksana tapi tanpa surat penugasan",
      "Ditetapkan dengan Surat Penugasan Perangkat Daerah",
      "Ditetapkan dengan SK/Surat Perintah Kepala Daerah"
    ],
    "keterangan": "Tingkatan penetapan tim pelaksana"
  },
  {
    "no": 24,
    "nama": "Output Pengetahuan: Jejaring Inovasi",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Melibatkan 2 Perangkat Daerah",
      "Melibatkan 3 - 4 Perangkat Daerah",
      "Melibatkan 5 Perangkat Daerah atau lebih"
    ],
    "keterangan": "Kolaborasi antar perangkat daerah"
  },
  {
    "no": 25,
    "nama": "Output Pengetahuan: Sosialisasi Inovasi Daerah",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Foto kegiatan berlatar belakang spanduk",
      "Konten media sosial / pemberitaan oleh pemda",
      "Media massa / berita (bukan milik pemda)"
    ],
    "keterangan": "Penyebarluasan informasi kebijakan inovasi"
  },
  {
    "no": 26,
    "nama": "Kecepatan Bisnis Proses: Pedoman Teknis",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Buku petunjuk / manual book cetak",
      "Buku manual bentuk elektronik",
      "Buku panduan dapat diakses secara online"
    ],
    "keterangan": "Standar ketentuan manual penggunaan inovasi"
  },
  {
    "no": 27,
    "nama": "Kecepatan Bisnis Proses: Kemudahan Informasi Layanan",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "Diperoleh melalui 1 metode",
      "Diperoleh melalui 2 metode",
      "Diperoleh melalui 3 atau lebih metode"
    ],
    "keterangan": "Metode: manual, hotline, medsos, online/website"
  },
  {
    "no": 28,
    "nama": "Kecepatan Bisnis Proses: Kemudahan Proses Inovasi (Kecepatan Layanan)",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Hasil diperoleh dalam 6 hari atau lebih",
      "Hasil diperoleh dalam 2 - 5 hari",
      "Hasil diperoleh dalam 1 hari"
    ],
    "keterangan": "Durasi waktu standar operasional prosedur (SOP)"
  },
  {
    "no": 29,
    "nama": "Kecepatan Bisnis Proses: Penyelesaian Layanan Pengaduan",
    "bobot": 1.0,
    "special": false,
    "parameter": [
      "<= 50% atau tidak ada pengaduan",
      "51% s.d. 90%",
      ">= 91%"
    ],
    "keterangan": "Rasio penanganan pengaduan/keluhan layanan"
  },
  {
    "no": 30,
    "nama": "Kecanggihan Produk: Layanan Terintegrasi",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Informasi web/sosmed terpisah / independen",
      "Terintegrasi dalam satu portal unit organisasi",
      "Terintegrasi lintas unit organisasi / superApps"
    ],
    "keterangan": "Penerapan prinsip interoperabilitas layanan"
  },
  {
    "no": 31,
    "nama": "Kecanggihan Produk: Replikasi Inovasi Daerah",
    "bobot": 3.0,
    "special": false,
    "parameter": [
      "Pernah 1 kali direplikasi daerah lain",
      "Pernah 2 kali direplikasi daerah lain berbeda",
      "Pernah 3 kali direplikasi daerah lain berbeda"
    ],
    "keterangan": "Frekuensi adopsi/replikasi oleh pemda lain"
  },
  {
    "no": 32,
    "nama": "Kecepatan Bisnis Proses: Kecepatan Penciptaan Inovasi",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Diciptakan dalam waktu 9 bulan atau lebih",
      "Diciptakan dalam waktu 5 - 8 bulan",
      "Diciptakan dalam waktu 1 - 4 bulan"
    ],
    "keterangan": "Satuan waktu riset dan pengembangan inovasi"
  },
  {
    "no": 33,
    "nama": "Jumlah Inovasi & Hasil Kreatif: Kemanfaatan Inovasi",
    "bobot": 3.0,
    "special": false,
    "parameter": [
      "Cakupan 1-200 orang / unit 5-20% / efisiensi 0.01-10%",
      "Cakupan 201-500 orang / unit 20-50% / efisiensi 10.01-20%",
      "Cakupan >=501 orang / unit >50% / efisiensi >20%"
    ],
    "keterangan": "Parameter dampak nyata, efisiensi, dan jumlah penerima"
  },
  {
    "no": 34,
    "nama": "Jumlah Inovasi & Hasil Kreatif: Jumlah Inovasi Daerah",
    "bobot": 0.38,
    "special": true,
    "parameter": [],
    "keterangan": "Skor = Jumlah inovasi x 0,38 (Maksimal 200 inovasi = 76 poin)"
  },
  {
    "no": 35,
    "nama": "Jumlah Inovasi & Hasil Kreatif: Penghargaan Inovasi Tingkat Nasional",
    "bobot": 2.0,
    "special": false,
    "parameter": [
      "Pernah 1 kali dalam 3 tahun terakhir",
      "Pernah 2 kali dalam 3 tahun terakhir",
      "Pernah 3 kali atau lebih dalam 3 tahun terakhir"
    ],
    "keterangan": "Penghargaan inovasi dari Kementerian/Lembaga atau Top 99/45"
  },
  {
    "no": 36,
    "nama": "Jumlah Inovasi & Hasil Kreatif: Penghargaan Inovasi Tingkat Internasional",
    "bobot": 3.0,
    "special": false,
    "parameter": [
      "Pernah 1 kali dalam 3 tahun terakhir",
      "Pernah 2 kali dalam 3 tahun terakhir",
      "Pernah 3 kali atau lebih dalam 3 tahun terakhir"
    ],
    "keterangan": "Penghargaan inovasi dari organisasi/lembaga internasional"
  }
];
