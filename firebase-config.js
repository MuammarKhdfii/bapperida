// ══════════════════════════════════════════
//  FIREBASE CONFIGURATION
//  Sinkronisasi data penilaian antar perangkat
// ══════════════════════════════════════════

// INSTRUKSI SETUP:
// 1. Buat project di https://console.firebase.google.com/
// 2. Tambahkan Web App
// 3. Copy config dari Firebase Console ke bawah ini
// 4. Enable Realtime Database di Firebase Console
// 5. Set Database Rules ke mode test (baca dokumentasi di bawah)

// CONFIG FIREBASE - GANTI DENGAN CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyD_jH61Dcn7z4urJ_ZSdfRlzoHP-bkcW",
  authDomain: "bapperida-penilaian.firebaseapp.com",
  databaseURL: "https://bapperida-penilaian-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bapperida-penilaian",
  storageBucket: "bapperida-penilaian.firebasestorage.app",
  messagingSenderId: "682206573836",
  appId: "1:682206573836:web:ab0e491c08b0d9ae11c129",
  measurementId: "G-QCLGQZ6LG5"
};

// Flag untuk enable/disable Firebase
// Set ke true untuk mengaktifkan sinkronisasi antar perangkat
const ENABLE_FIREBASE = false;  // ← DISABLE dulu untuk testing

// Initialize Firebase (akan di-load dari CDN di HTML)
let database = null;
let firebaseInitialized = false;

function initFirebase() {
  if (!ENABLE_FIREBASE) {
    console.log('Firebase disabled, using localStorage only');
    return false;
  }

  try {
    // Check if Firebase SDK is loaded
    if (typeof firebase === 'undefined') {
      console.error('Firebase SDK not loaded! Add Firebase CDN to HTML.');
      return false;
    }

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    database = firebase.database();
    firebaseInitialized = true;
    console.log('✅ Firebase initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return false;
  }
}

// ══════════════════════════════════════════
//  STORAGE WRAPPER - Auto fallback localStorage
// ══════════════════════════════════════════

const cloudStorage = {
  
  // Simpan data penilaian
  async saveDraf(namaInovasi, data) {
    console.log('💾 Saving data for:', namaInovasi);
    
    // Selalu simpan ke localStorage sebagai backup
    const allLocal = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
    allLocal[namaInovasi] = data;
    localStorage.setItem("draf_iid2026_all", JSON.stringify(allLocal));
    
    // Jika Firebase enabled, simpan juga ke cloud
    if (firebaseInitialized && database) {
      try {
        const sanitizedKey = sanitizeFirebaseKey(namaInovasi);
        await database.ref(`penilaian/${sanitizedKey}`).set(data);
        console.log('☁️ Synced to Firebase');
        return { success: true, source: 'firebase' };
      } catch (error) {
        console.error('Firebase save error:', error);
        return { success: true, source: 'localStorage' };
      }
    }
    
    return { success: true, source: 'localStorage' };
  },
  
  // Load semua data penilaian
  async loadAllDraf() {
    console.log('📥 Loading all drafts...');
    
    // Load dari localStorage dulu
    const localData = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
    
    // Jika Firebase tidak enabled, return localStorage
    if (!firebaseInitialized || !database) {
      console.log('📂 Using localStorage only');
      return localData;
    }
    
    // Load dari Firebase
    try {
      const snapshot = await database.ref('penilaian').once('value');
      const firebaseData = snapshot.val() || {};
      
      // Merge: Firebase data overwrites localStorage
      const merged = { ...localData };
      
      Object.keys(firebaseData).forEach(sanitizedKey => {
        const originalKey = desanitizeFirebaseKey(sanitizedKey);
        merged[originalKey] = firebaseData[sanitizedKey];
      });
      
      // Update localStorage dengan data terbaru dari Firebase
      localStorage.setItem("draf_iid2026_all", JSON.stringify(merged));
      
      console.log('☁️ Loaded from Firebase:', Object.keys(firebaseData).length, 'items');
      console.log('📊 Total merged:', Object.keys(merged).length, 'items');
      
      return merged;
    } catch (error) {
      console.error('Firebase load error:', error);
      console.log('📂 Fallback to localStorage');
      return localData;
    }
  },
  
  // Real-time listener untuk perubahan data
  onDataChange(namaInovasi, callback) {
    if (!firebaseInitialized || !database) return;
    
    const sanitizedKey = sanitizeFirebaseKey(namaInovasi);
    const ref = database.ref(`penilaian/${sanitizedKey}`);
    
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log('🔄 Data changed for:', namaInovasi);
        callback(data);
      }
    });
    
    return () => ref.off('value');
  },
  
  // Check koneksi Firebase
  async checkConnection() {
    if (!firebaseInitialized || !database) {
      return { connected: false, source: 'localStorage' };
    }
    
    try {
      const ref = database.ref('.info/connected');
      const snapshot = await ref.once('value');
      const connected = snapshot.val() === true;
      
      return {
        connected,
        source: connected ? 'firebase' : 'localStorage'
      };
    } catch (error) {
      return { connected: false, source: 'localStorage' };
    }
  }
};

// Utility: Sanitize key untuk Firebase (tidak boleh ada karakter khusus)
function sanitizeFirebaseKey(key) {
  return key
    .replace(/\./g, '_dot_')
    .replace(/\$/g, '_dollar_')
    .replace(/#/g, '_hash_')
    .replace(/\[/g, '_lbracket_')
    .replace(/\]/g, '_rbracket_')
    .replace(/\//g, '_slash_');
}

function desanitizeFirebaseKey(key) {
  return key
    .replace(/_dot_/g, '.')
    .replace(/_dollar_/g, '$')
    .replace(/_hash_/g, '#')
    .replace(/_lbracket_/g, '[')
    .replace(/_rbracket_/g, ']')
    .replace(/_slash_/g, '/');
}

// Auto-init when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebase);
} else {
  initFirebase();
}
