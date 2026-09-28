// ══════════════════════════════════════════
//  judul.js — Halaman Penilaian Judul Inovasi
// ══════════════════════════════════════════

// ── State ──
const judulState = {};
JURI_LIST_JUDUL.forEach(j => { judulState[j] = {}; });
let activeJuriJudul = "";
let namaInovasi     = "";

// ── Init ──
initScrollTop("scrollTopBtn");

// Ambil inovasi yang dipilih dari landing
namaInovasi = localStorage.getItem("iid2026_selected") || "";

// Tampilkan kartu inovasi
const inovasiCard = document.getElementById("inovasiCardJudul");
const noWarn      = document.getElementById("noInovasiWarn");
if (namaInovasi) {
  const meta = daftarInovasi.find(i => i.judul === namaInovasi) || {};
  document.getElementById("icJudul").textContent    = namaInovasi;
  document.getElementById("icPD").textContent       = "🏛️ " + (meta.perangkatDaerah || "—");
  document.getElementById("icBentuk").textContent   = "📂 " + (meta.bentuk || "—");
  document.getElementById("icTahun").textContent    = "📅 " + (meta.waktu || "—");
  document.getElementById("icRingkasan").textContent = meta.ringkasan || "—";
  inovasiCard.style.display = "block";
  inovasiCard.classList.add("card-animate");
  noWarn.style.display = "none";
} else {
  inovasiCard.style.display = "none";
  noWarn.style.display      = "block";
}

// Restore state dari localStorage
const restored = loadJudulFromStorage(namaInovasi);
if (restored.judulState) {
  Object.keys(restored.judulState).forEach(j => {
    if (judulState[j] !== undefined) judulState[j] = restored.judulState[j];
  });
}

// ── Render Kriteria ──
function renderJudul() {
  const c = document.getElementById("judulContainer");
  c.innerHTML = "";
  kriteriaJudul.forEach((item, idx) => {
    const card = document.createElement("article");
    card.className = "indicator";
    card.style.animationDelay = (idx * 0.05) + "s";
    card.innerHTML = `
      <div class="indicator-head">
        <div class="indicator-title">
          <span class="indicator-number">${item.no}.</span>${esc(item.nama)}
        </div>
        <div class="meta">Bobot: ${item.bobot}</div>
      </div>
      <div class="kriteria-desc">${esc(item.deskripsi)}</div>
      <div class="options">
        ${item.parameter.map((p, i) => `
          <div class="option">
            <input type="radio" id="k${item.no}p${i+1}" name="k-${item.no}" value="${i+1}">
            <label for="k${item.no}p${i+1}">
              <div class="option-title">Nilai ${i+1}</div>
              <div class="option-text">${esc(p)}</div>
            </label>
          </div>`).join("")}
      </div>
      <div class="result">Skor kriteria: <b id="rk${item.no}">0.00</b></div>`;
    c.appendChild(card);
    card.querySelectorAll("input[type=radio]").forEach(el =>
      el.addEventListener("change", () => { saveJudulState(); calculateJudul(); }));
  });
  if (activeJuriJudul) loadJudulState(activeJuriJudul);
}

function saveJudulState() {
  if (!activeJuriJudul) return;
  kriteriaJudul.forEach(item => {
    const sel = document.querySelector(`input[name="k-${item.no}"]:checked`);
    judulState[activeJuriJudul][item.no] = sel ? sel.value : "";
  });
}

function loadJudulState(juri) {
  kriteriaJudul.forEach(item => {
    const val = judulState[juri]?.[item.no] || "";
    document.querySelectorAll(`input[name="k-${item.no}"]`).forEach(x => x.checked = false);
    if (val) {
      const el = document.querySelector(`input[name="k-${item.no}"][value="${val}"]`);
      if (el) el.checked = true;
    }
  });
  calculateJudul();
}

function calculateJudul() {
  let total = 0;
  const maxVal = kriteriaJudul.reduce((s, i) => s + 3 * i.bobot, 0);
  kriteriaJudul.forEach(item => {
    const sel   = document.querySelector(`input[name="k-${item.no}"]:checked`);
    const score = sel ? Number(sel.value) * item.bobot : 0;
    total += score;
    const el = document.getElementById(`rk${item.no}`);
    if (el) { el.textContent = score.toFixed(2); el.classList.remove("updated"); void el.offsetWidth; el.classList.add("updated"); }
  });

  // Kelengkapan: berapa kriteria sudah diisi
  const terisi     = kriteriaJudul.filter(item =>
    document.querySelector(`input[name="k-${item.no}"]:checked`)
  ).length;
  const pctLengkap = Math.round((terisi / kriteriaJudul.length) * 100);
  animateCounter(document.getElementById("scoreJudul"),    total.toFixed(2));
  animateCounter(document.getElementById("scoreJudulPct"), total.toFixed(2) + " / " + maxVal);

  const juriEl = document.getElementById("scoreJuriAktif");
  if (juriEl) animateCounter(juriEl, activeJuriJudul
    ? activeJuriJudul.split(",")[0].split(" ").slice(-2).join(" ") : "—");

  // Progress bar = kelengkapan pengisian (100% saat semua 6 kriteria terisi)
  const pb = document.getElementById("progressBar");
  if (pb) {
    pb.style.width = pctLengkap + "%";
    pb.style.background = pctLengkap === 100
      ? "linear-gradient(90deg,#10b981,#16a34a)"
      : "linear-gradient(90deg,#155eef,#7c3aed,#06b6d4)";
  }
  const pctEl = document.getElementById("summaryPct");
  if (pctEl) pctEl.textContent = pctLengkap + "% terisi (" + terisi + "/" + kriteriaJudul.length + " kriteria)";

  // Summary grid
  const grid = document.getElementById("summaryGrid");
  if (grid) {
    grid.innerHTML = kriteriaJudul.map(item => {
      const sel   = document.querySelector(`input[name="k-${item.no}"]:checked`);
      const score = sel ? Number(sel.value) * item.bobot : 0;
      return `<div><span>${item.no}. ${esc(item.nama)}</span><b>${score.toFixed(2)} / ${3*item.bobot}</b></div>`;
    }).join("") + `<div style="grid-column:1/-1;border-top:1px solid var(--border);padding-top:8px;margin-top:4px"><span><b>TOTAL</b></span><b>${total.toFixed(2)} / ${maxVal}</b></div>`;
  }

  // Summary info
  const si = document.getElementById("summaryJuri");
  if (si) {
    si.style.display = (namaInovasi || activeJuriJudul) ? "grid" : "none";
    const e1 = document.getElementById("sumInovasi"); if (e1) e1.textContent = namaInovasi || "—";
    const e2 = document.getElementById("sumJuri");    if (e2) e2.textContent = activeJuriJudul || "—";
  }

  updateJuriStatus();
}

// ── Juri Tabs ──
function setActiveJuriJudul(juri) {
  if (activeJuriJudul) saveJudulState();
  activeJuriJudul = juri;
  document.querySelectorAll(".juri-tab-judul").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.juri === juri));
  loadJudulState(juri);
}

document.querySelectorAll(".juri-tab-judul").forEach(btn =>
  btn.addEventListener("click", () => setActiveJuriJudul(btn.dataset.juri)));

// Restore juri aktif
if (restored.activeJuriJudul) setTimeout(() => setActiveJuriJudul(restored.activeJuriJudul), 50);

// ── Status Juri ──
function updateJuriStatus() {
  const rowEl    = document.getElementById("juriStatusRow");
  const badgesEl = document.getElementById("juriStatusBadges");
  const sumEl    = document.getElementById("juriStatusSummary");
  if (!rowEl || !namaInovasi) { if (rowEl) rowEl.style.display = "none"; return; }

  let dinilai = 0, html = "";
  JURI_LIST_JUDUL.forEach(juri => {
    const state = judulState[juri] || {};
    const done  = kriteriaJudul.some(k => state[k.no]);
    const isMe  = juri === activeJuriJudul;
    if (done) dinilai++;
    let skor = 0;
    if (done) kriteriaJudul.forEach(k => { if (state[k.no]) skor += Number(state[k.no]) * k.bobot; });
    html += `
      <div class="juri-status-badge ${done?"status-done":"status-pending"} ${isMe?"status-active":""}">
        <span class="status-dot ${done?"dot-done":"dot-pending"}"></span>
        <span class="status-juri-name">${juri.split(",")[0].split(" ").slice(-2).join(" ")}</span>
        ${done ? `<span class="status-skor">${skor.toFixed(2)}</span><span class="status-check">✓</span>`
               : `<span class="status-belum">Belum</span>`}
      </div>`;
  });
  badgesEl.innerHTML = html;
  const total = JURI_LIST_JUDUL.length;
  sumEl.textContent = dinilai === 0 ? "Belum ada juri menilai"
    : dinilai === total ? "✅ Semua juri selesai"
    : `${dinilai} dari ${total} juri`;
  sumEl.className = "juri-status-summary " +
    (dinilai === 0 ? "summary-none" : dinilai === total ? "summary-complete" : "summary-partial");
  rowEl.style.display = "flex";
  rowEl.classList.remove("status-animate"); void rowEl.offsetWidth; rowEl.classList.add("status-animate");
}

// ── Simpan ──
function doSave(showAnim = true) {
  saveJudulState();
  if (!namaInovasi) { alert("Inovasi belum dipilih. Kembali ke halaman utama."); return; }
  if (!activeJuriJudul) { alert("Pilih juri terlebih dahulu."); return; }

  // Validasi: semua 6 kriteria wajib diisi
  const belumDiisi = kriteriaJudul.filter(item =>
    !document.querySelector(`input[name="k-${item.no}"]:checked`)
  );
  if (belumDiisi.length > 0) {
    const namaKriteria = belumDiisi.map(k => `• ${k.no}. ${k.nama}`).join("\n");
    alert(`❌ Penilaian belum lengkap!\n\nKriteria berikut belum diisi:\n${namaKriteria}\n\nSemua kriteria wajib diisi sebelum menyimpan.`);
    // Highlight kriteria yang belum diisi
    kriteriaJudul.forEach(item => {
      const card = document.querySelector(`article[data-no="k${item.no}"]`);
      if (!card) return;
      const filled = document.querySelector(`input[name="k-${item.no}"]:checked`);
      card.classList.toggle("indicator-required-warn", !filled);
    });
    return;
  }

  // Hapus highlight setelah semua terisi
  document.querySelectorAll(".indicator-required-warn").forEach(el => el.classList.remove("indicator-required-warn"));

  saveJudulToStorage(namaInovasi, judulState, activeJuriJudul);
  if (!showAnim) return;
  const btn  = document.getElementById("saveBtn");
  const fab  = document.getElementById("fabSaveJudul");
  const icon = document.getElementById("fabIconJudul");
  [btn].forEach(b => { if (!b) return; const o=b.textContent; b.textContent="✅ Tersimpan!"; b.style.background="linear-gradient(135deg,#10b981,#059669)"; setTimeout(()=>{b.textContent=o;b.style.background="";},2000); });
  if (fab)  { fab.classList.add("saved");  if (icon) icon.textContent="✅"; setTimeout(()=>{ fab.classList.remove("saved"); if(icon) icon.textContent="💾"; },2000); }
}

document.getElementById("saveBtn").addEventListener("click", () => doSave(true));

// ── Reset ──
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!activeJuriJudul) { alert("Pilih juri terlebih dahulu."); return; }
  if (!confirm(`Reset semua penilaian judul untuk juri "${activeJuriJudul}"?`)) return;
  judulState[activeJuriJudul] = {};
  // Hapus semua pilihan radio
  kriteriaJudul.forEach(item => {
    document.querySelectorAll(`input[name="k-${item.no}"]`).forEach(x => x.checked = false);
  });
  calculateJudul();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Auto-save saat keluar halaman
window.addEventListener("beforeunload", () => { saveJudulState(); saveJudulToStorage(namaInovasi, judulState, activeJuriJudul); });

// ── Expand/Collapse ──
document.getElementById("expandAllBtn").addEventListener("click", function() {
  const collapsed = this.dataset.state === "collapsed";
  document.querySelectorAll("#judulContainer .options, #judulContainer .kriteria-desc, #judulContainer .result")
    .forEach(el => { el.style.display = collapsed ? "" : "none"; });
  this.textContent = collapsed ? "🔽 Buka Semua" : "🔼 Tutup Semua";
  this.dataset.state = collapsed ? "" : "collapsed";
});

// ── Print ──
document.getElementById("printBtn").addEventListener("click", () => {
  if (!activeJuriJudul) { alert("Pilih juri terlebih dahulu."); return; }
  document.getElementById("pNamaInovasi").textContent = namaInovasi || "—";
  document.getElementById("pNamaJuri").textContent    = activeJuriJudul;
  document.getElementById("pSignJuri").textContent    = `( ${activeJuriJudul} )`;
  document.getElementById("pTanggal").textContent     = new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});

  let total = 0;
  const max = kriteriaJudul.reduce((s, i) => s + 3 * i.bobot, 0);
  const tbody = document.getElementById("pTableBody");
  tbody.innerHTML = "";
  kriteriaJudul.forEach(item => {
    const val   = judulState[activeJuriJudul]?.[item.no] || "";
    const score = val ? Number(val) * item.bobot : 0;
    total += score;
    const tr = document.createElement("tr");
    tr.className = score > 0 ? "pt-filled" : "pt-empty";
    tr.innerHTML = `
      <td class="pt-no">${item.no}</td>
      <td class="pt-nama">${esc(item.nama)}</td>
      <td class="pt-bobot">${item.bobot}</td>
      <td class="pt-param">${val||"—"}</td>
      <td class="pt-nilai">${score > 0 ? score.toFixed(2) : "—"}</td>
      <td class="pt-ket">${val ? esc(item.parameter[Number(val)-1]) : "—"}</td>`;
    tbody.appendChild(tr);
  });
  document.getElementById("pTotal").textContent      = total.toFixed(2);
  document.getElementById("pTotalSkor").textContent  = `${total.toFixed(2)} / ${max}`;
  window.print();
});

// ── Init ──
renderJudul();
calculateJudul();
