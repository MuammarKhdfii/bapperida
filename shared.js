// ══════════════════════════════════════════════════════
//  SHARED.JS — State bersama semua halaman
//  Dimuat di: index.html, judul.html, indikator.html
// ══════════════════════════════════════════════════════

// ── Daftar Juri ──
const JURI_LIST = [
  "Prof. Dr. Dra. Sowiyah M.Pd.",
  "Prof. Dr. Ir. Etik Puji Handayani, M.Si.",
  "Dr. Ir. Eva Rolia, M.T., M.K.M."
];
const JURI_LIST_JUDUL = [
  "Dr. Ir. Eva Rolia, M.T., M.K.M.",
  "Ir. Arif Joko Arwoko",
  "Mustafa Akhyar, S.E."
];

// ── Storage keys ──
const KEY_ALL   = "draf_iid2026_all";  // konsisten dengan semua halaman
const KEY_LAST  = "draf_iid2026_last";
const KEY_THEME = "iid2026_theme";

// ── Storage helpers ──
function loadAllDraf() {
  try { return JSON.parse(localStorage.getItem(KEY_ALL) || "{}"); }
  catch(e) { return {}; }
}
function saveAllDraf(all) {
  localStorage.setItem(KEY_ALL, JSON.stringify(all));
}
function getLastInovasi() {
  return localStorage.getItem(KEY_LAST) || "";
}
function setLastInovasi(judul) {
  localStorage.setItem(KEY_LAST, judul);
}

// ── Simpan state penilaian judul untuk 1 inovasi ──
function saveJudulToStorage(namaInovasi, judulState, activeJuriJudul) {
  if (!namaInovasi) return;
  const all  = loadAllDraf();
  const prev = all[namaInovasi] || {};

  // Hitung skor per juri judul
  const skorJudulPerJuri = {};
  JURI_LIST_JUDUL.forEach(juri => {
    let t = 0;
    if (typeof kriteriaJudul !== "undefined") {
      kriteriaJudul.forEach(k => {
        const v = judulState[juri]?.[k.no] || "";
        if (v) t += Number(v) * k.bobot;
      });
    }
    skorJudulPerJuri[juri] = parseFloat(t.toFixed(2));
  });

  all[namaInovasi] = {
    ...prev,
    namaInovasi,
    savedAt       : new Date().toISOString(),
    judulState    : JSON.parse(JSON.stringify(judulState)),
    skorJudulPerJuri,
    activeJuriJudul: activeJuriJudul || ""
  };
  saveAllDraf(all);
  setLastInovasi(namaInovasi);
}

// ── Simpan state penilaian indikator untuk 1 inovasi ──
function saveIndikatorToStorage(namaInovasi, juriState, activeJuri) {
  if (!namaInovasi) return;
  const all  = loadAllDraf();
  const prev = all[namaInovasi] || {};

  // Hitung skor per juri
  const skorPerJuri = {};
  JURI_LIST.forEach(juri => {
    let t = 0;
    if (typeof indicators !== "undefined") {
      indicators.forEach(item => {
        if (item.no <= 15 || item.skip || item.type) return;
        const v = juriState[juri]?.radio?.[item.no] || "";
        if (v) t += Number(v) * item.bobot;
      });
    }
    skorPerJuri[juri] = parseFloat(t.toFixed(2));
  });

  all[namaInovasi] = {
    ...prev,
    namaInovasi,
    savedAt   : new Date().toISOString(),
    juriState : JSON.parse(JSON.stringify(juriState)),
    skorPerJuri,
    activeJuri: activeJuri || ""
  };
  saveAllDraf(all);
  setLastInovasi(namaInovasi);
}

// ── Baca state judul dari storage ──
function loadJudulFromStorage(namaInovasi) {
  if (!namaInovasi) return { judulState: {}, activeJuriJudul: "" };
  const all  = loadAllDraf();
  const draf = all[namaInovasi] || {};
  return {
    judulState    : draf.judulState     || {},
    activeJuriJudul: draf.activeJuriJudul || ""
  };
}

// ── Baca state indikator dari storage ──
function loadIndikatorFromStorage(namaInovasi) {
  if (!namaInovasi) return { juriState: {}, activeJuri: "" };
  const all  = loadAllDraf();
  const draf = all[namaInovasi] || {};
  return {
    juriState : draf.juriState  || {},
    activeJuri: draf.activeJuri || ""
  };
}

// ── Ringkasan status per inovasi (untuk landing) ──
function getInovasiStatus(namaInovasi) {
  const all  = loadAllDraf();
  const draf = all[namaInovasi];
  if (!draf) return { hasJudul: false, hasIndikator: false, judulJuri: 0, indikatorJuri: 0 };

  const judulJuri = JURI_LIST_JUDUL.filter(j => {
    const st = draf.judulState?.[j] || {};
    return Object.values(st).some(v => v);
  }).length;

  const indikatorJuri = JURI_LIST.filter(j => {
    const st = draf.juriState?.[j] || {};
    return Object.values(st.radio || {}).some(v => v);
  }).length;

  return {
    hasJudul     : judulJuri > 0,
    hasIndikator : indikatorJuri > 0,
    judulJuri,
    indikatorJuri,
    savedAt      : draf.savedAt || ""
  };
}

// ── Dark mode ──
function initTheme(btnId) {
  const btn  = document.getElementById(btnId);
  const root = document.documentElement;
  const saved = localStorage.getItem(KEY_THEME) || "light";
  root.setAttribute("data-theme", saved);
  if (btn) btn.setAttribute("data-theme", saved);
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      btn.setAttribute("data-theme", next);
      localStorage.setItem(KEY_THEME, next);
    });
  }
}

// ── Escape HTML ──
function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

// ── Animasi counter pop ──
function animateCounter(el, newVal) {
  if (!el) return;
  el.classList.remove("score-pop");
  void el.offsetWidth;
  el.textContent = newVal;
  el.classList.add("score-pop");
}

// ── Scroll to top button ──
function initScrollTop(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > document.documentElement.scrollHeight * 0.4);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ── Hitung total gabungan (judul + indikator) per juri ──
// Catatan: juri judul dan juri indikator BERBEDA daftarnya,
// sehingga total gabungan dihitung sebagai:
//   rata-rata skor judul (dari JURI_LIST_JUDUL) + rata-rata skor indikator (dari JURI_LIST)
function getTotalGabungan(namaInovasi) {
  const all  = loadAllDraf();
  const draf = all[namaInovasi];
  if (!draf) return { skorJudul: 0, skorIndikator: 0, total: 0 };

  // Rata-rata skor judul dari juri judul yang sudah menilai
  const skorJudulArr = Object.values(draf.skorJudulPerJuri || {}).filter(s => s > 0);
  const skorJudul    = skorJudulArr.length > 0
    ? skorJudulArr.reduce((a, b) => a + b, 0) / skorJudulArr.length
    : 0;

  // Rata-rata skor indikator dari juri indikator yang sudah menilai
  const skorIndArr = Object.values(draf.skorPerJuri || {}).filter(s => s > 0);
  const skorIndikator = skorIndArr.length > 0
    ? skorIndArr.reduce((a, b) => a + b, 0) / skorIndArr.length
    : 0;

  return {
    skorJudul    : parseFloat(skorJudul.toFixed(2)),
    skorIndikator: parseFloat(skorIndikator.toFixed(2)),
    total        : parseFloat((skorJudul + skorIndikator).toFixed(2))
  };
}
