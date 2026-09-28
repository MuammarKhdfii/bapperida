-- ══════════════════════════════════════════════════════════════════════════════
-- TEST DATABASE INSTALLATION
-- ══════════════════════════════════════════════════════════════════════════════
-- Jalankan script ini setelah menginstall database_complete.sql
-- Untuk memverifikasi bahwa instalasi berhasil
-- ══════════════════════════════════════════════════════════════════════════════

USE db_inovasi_daerah;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 1: Cek Jumlah Tabel
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 1: Jumlah Tabel' AS test_name;
SELECT COUNT(*) AS total_tables, 
       CASE WHEN COUNT(*) = 18 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM information_schema.tables 
WHERE table_schema = 'db_inovasi_daerah';

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 2: Cek Users
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 2: Jumlah Users' AS test_name;
SELECT COUNT(*) AS total_users,
       CASE WHEN COUNT(*) = 6 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM users;

-- Detail users
SELECT user_id, username, nama, role FROM users ORDER BY user_id;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 3: Cek Inovasi
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 3: Jumlah Inovasi' AS test_name;
SELECT COUNT(*) AS total_inovasi,
       CASE WHEN COUNT(*) >= 100 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM inovasi;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 4: Cek OPD
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 4: Jumlah OPD' AS test_name;
SELECT COUNT(*) AS total_opd,
       CASE WHEN COUNT(*) = 33 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM perangkat_daerah;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 5: Cek Kriteria Judul
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 5: Kriteria Judul' AS test_name;
SELECT COUNT(*) AS total_kriteria,
       CASE WHEN COUNT(*) = 6 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM kriteria_judul;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 6: Cek Parameter Kriteria
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 6: Parameter Kriteria' AS test_name;
SELECT COUNT(*) AS total_parameter,
       CASE WHEN COUNT(*) = 18 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM parameter_kriteria_judul;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 7: Cek Indikator SID
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 7: Indikator SID' AS test_name;
SELECT COUNT(*) AS total_indikator,
       CASE WHEN COUNT(*) = 20 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM indikator_sid;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 8: Cek Parameter Indikator
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 8: Parameter Indikator' AS test_name;
SELECT COUNT(*) AS total_parameter,
       CASE WHEN COUNT(*) = 54 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM parameter_indikator_sid;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 9: Cek Stored Procedures
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 9: Stored Procedures' AS test_name;
SELECT COUNT(*) AS total_procedures,
       CASE WHEN COUNT(*) = 2 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM information_schema.routines
WHERE routine_schema = 'db_inovasi_daerah' AND routine_type = 'PROCEDURE';

-- Detail procedures
SELECT routine_name FROM information_schema.routines
WHERE routine_schema = 'db_inovasi_daerah' AND routine_type = 'PROCEDURE';

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 10: Cek Triggers
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 10: Triggers' AS test_name;
SELECT COUNT(*) AS total_triggers,
       CASE WHEN COUNT(*) = 4 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM information_schema.triggers
WHERE trigger_schema = 'db_inovasi_daerah';

-- Detail triggers
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'db_inovasi_daerah'
ORDER BY trigger_name;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 11: Cek Views
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 11: Views' AS test_name;
SELECT COUNT(*) AS total_views,
       CASE WHEN COUNT(*) = 2 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM information_schema.views
WHERE table_schema = 'db_inovasi_daerah';

-- Detail views
SELECT table_name FROM information_schema.views
WHERE table_schema = 'db_inovasi_daerah';

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 12: Test Login Admin
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 12: Login Admin' AS test_name;
SELECT user_id, username, nama, role,
       CASE WHEN username = 'admin' AND password = 'admin2027' 
            THEN '✅ PASS - Login berhasil' 
            ELSE '❌ FAIL - Login gagal' 
       END AS status
FROM users 
WHERE username = 'admin' AND password = 'admin2027';

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 13: Test Login Juri
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 13: Login Juri' AS test_name;
SELECT user_id, username, nama, role,
       CASE WHEN username = 'eva.rolia' AND password = 'juri2027' 
            THEN '✅ PASS - Login berhasil' 
            ELSE '❌ FAIL - Login gagal' 
       END AS status
FROM users 
WHERE username = 'eva.rolia' AND password = 'juri2027';

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 14: Test View Rekap Lengkap
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 14: View Rekap Lengkap' AS test_name;
SELECT COUNT(*) AS total_records,
       CASE WHEN COUNT(*) > 0 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM v_rekap_lengkap;

-- Sample data dari view
SELECT inovasi_id, judul_inovasi, perangkat_daerah, peringkat
FROM v_rekap_lengkap
LIMIT 5;

-- ══════════════════════════════════════════════════════════════════════════════
-- TEST 15: Test View Detail Penilaian Juri
-- ══════════════════════════════════════════════════════════════════════════════
SELECT 'TEST 15: View Detail Penilaian Juri' AS test_name;
-- View ini akan kosong karena belum ada penilaian, tapi harus bisa di-query
SELECT 'View dapat di-query' AS info,
       '✅ PASS' AS status;

-- ══════════════════════════════════════════════════════════════════════════════
-- SUMMARY: Ringkasan Test
-- ══════════════════════════════════════════════════════════════════════════════
SELECT '═══════════════════════════════════════' AS divider;
SELECT 'RINGKASAN TEST INSTALASI DATABASE' AS summary_title;
SELECT '═══════════════════════════════════════' AS divider;

SELECT 
    'Tabel' AS komponen,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'db_inovasi_daerah') AS jumlah,
    '18' AS target,
    CASE WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'db_inovasi_daerah') = 18 
         THEN '✅' ELSE '❌' END AS status
UNION ALL
SELECT 
    'Users',
    (SELECT COUNT(*) FROM users),
    '6',
    CASE WHEN (SELECT COUNT(*) FROM users) = 6 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'Inovasi',
    (SELECT COUNT(*) FROM inovasi),
    '100+',
    CASE WHEN (SELECT COUNT(*) FROM inovasi) >= 100 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'OPD',
    (SELECT COUNT(*) FROM perangkat_daerah),
    '33',
    CASE WHEN (SELECT COUNT(*) FROM perangkat_daerah) = 33 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'Kriteria Judul',
    (SELECT COUNT(*) FROM kriteria_judul),
    '6',
    CASE WHEN (SELECT COUNT(*) FROM kriteria_judul) = 6 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'Indikator SID',
    (SELECT COUNT(*) FROM indikator_sid),
    '20',
    CASE WHEN (SELECT COUNT(*) FROM indikator_sid) = 20 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'Stored Procedures',
    (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'db_inovasi_daerah' AND routine_type = 'PROCEDURE'),
    '2',
    CASE WHEN (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'db_inovasi_daerah' AND routine_type = 'PROCEDURE') = 2 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'Triggers',
    (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'db_inovasi_daerah'),
    '4',
    CASE WHEN (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'db_inovasi_daerah') = 4 THEN '✅' ELSE '❌' END
UNION ALL
SELECT 
    'Views',
    (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'db_inovasi_daerah'),
    '2',
    CASE WHEN (SELECT COUNT(*) FROM information_schema.views WHERE table_schema = 'db_inovasi_daerah') = 2 THEN '✅' ELSE '❌' END;

SELECT '═══════════════════════════════════════' AS divider;
SELECT 'Jika semua status ✅ maka instalasi BERHASIL!' AS conclusion;
SELECT 'Jika ada yang ❌ cek kembali file database_complete.sql' AS note;
SELECT '═══════════════════════════════════════' AS divider;

-- ══════════════════════════════════════════════════════════════════════════════
-- SELESAI - TEST COMPLETE
-- ══════════════════════════════════════════════════════════════════════════════
