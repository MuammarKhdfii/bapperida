// ══════════════════════════════════════════
//  KONSTANTA JURI
// ══════════════════════════════════════════
const JURI_LIST       = ["Prof. Dr. Dra. Sowiyah M.Pd.", "Prof. Dr. Ir. Etik Puji Handayani, M.Si.", "Dr. Ir. Eva Rolia, M.T., M.K.M."];
const JURI_LIST_JUDUL = ["Dr. Ir. Eva Rolia, M.T., M.K.M.", "Ir. Arif Joko Arwoko", "Mustafa Akhyar, S.E."];

// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
// State per juri indikator SID
const juriState = {};
JURI_LIST.forEach(j => {
  juriState[j] = { radio:{}, monev:{}, monevKet:{}, videoUrl:{}, videoKet:{} };
});

// State per juri penilaian judul (kriteria 1–6)
// judulState[namaJuri][no_kriteria] = nilai parameter (1/2/3)
const judulState = {};
JURI_LIST_JUDUL.forEach(j => { judulState[j] = {}; });

let activeJuri      = "";   // juri SID aktif
let activeJuriJudul = "";   // juri judul aktif
let activeInovasi   = "";
let currentStep     = 1;

// ══════════════════════════════════════════
//  DOM REFS
// ══════════════════════════════════════════
const namaInovasiInput = document.getElementById("namaInovasi");
const namaJuriSelect   = document.getElementById("namaJuri");
const container        = document.getElementById("indicatorContainer");
const scoreSPD         = document.getElementById("scoreSPD");
const scoreSID         = document.getElementById("scoreSID");
const scoreTotal       = document.getElementById("scoreTotal");
const summarySPD       = document.getElementById("summarySPD");
const summarySID       = document.getElementById("summarySID");
const summaryTotal     = document.getElementById("summaryTotal");
const percentage       = document.getElementById("percentage");
const progressBar      = document.getElementById("progressBar");

// ══════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════
function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

function animateCounter(el, newVal) {
  if (!el) return;
  el.classList.remove("score-pop");
  void el.offsetWidth;
  el.textContent = newVal;
  el.classList.add("score-pop");
}

// ══════════════════════════════════════════
//  NAVIGASI STEP
// ══════════════════════════════════════════
function goToStep(n) {
  if (n === 2 && !namaInovasiInput.value) {
    alert("Pilih nama inovasi terlebih dahulu sebelum melanjutkan.");
    return;
  }
  currentStep = n;
  document.getElementById("step1").style.display = n === 1 ? "block" : "none";
  document.getElementById("step2").style.display = n === 2 ? "block" : "none";

  const item1 = document.getElementById("stepItem1");
  const item2 = document.getElementById("stepItem2");
  item1.classList.toggle("active",    n === 1);
  item1.classList.toggle("completed", n === 2);
  item2.classList.toggle("active",    n === 2);
  document.getElementById("stepConnectorLine").classList.toggle("filled", n === 2);

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (n === 2) {
    render();
    calculate();
  } else {
    renderJudul();
    calculateJudul();
  }
}

document.getElementById("nextToStep2Btn").addEventListener("click", () => goToStep(2));
document.getElementById("backToStep1Btn").addEventListener("click", () => goToStep(1));

// ══════════════════════════════════════════
//  RENDER — STEP 1: KRITERIA JUDUL
// ══════════════════════════════════════════
function renderJudul() {
  const c = document.getElementById("judulContainer");
  c.innerHTML = "";

  kriteriaJudul.forEach(item => {
    const card = document.createElement("article");
    card.className = "indicator";
    card.dataset.no = "k" + item.no;
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
            <input type="radio" id="k${item.no}p${i+1}" name="kriteria-${item.no}" value="${i+1}">
            <label for="k${item.no}p${i+1}">
              <div class="option-title">Nilai ${i+1}</div>
              <div class="option-text">${esc(p)}</div>
            </label>
          </div>`).join("")}
      </div>
      <div class="result">Skor kriteria: <b id="result-k${item.no}">0.00</b></div>`;
    c.appendChild(card);
    card.querySelectorAll("input[type=radio]").forEach(el =>
      el.addEventListener("change", () => { saveJudulState(); calculateJudul(); }));
  });

  // Muat state juri judul aktif
  if (activeJuriJudul) loadJudulState(activeJuriJudul);
}

function saveJudulState() {
  if (!activeJuriJudul) return;
  kriteriaJudul.forEach(item => {
    const sel = document.querySelector(`input[name="kriteria-${item.no}"]:checked`);
    judulState[activeJuriJudul][item.no] = sel ? sel.value : "";
  });
}

function loadJudulState(juri) {
  kriteriaJudul.forEach(item => {
    const val = judulState[juri]?.[item.no] || "";
    document.querySelectorAll(`input[name="kriteria-${item.no}"]`)
      .forEach(x => x.checked = false);
    if (val) {
      const el = document.querySelector(`input[name="kriteria-${item.no}"][value="${val}"]`);
      if (el) el.checked = true;
    }
  });
  calculateJudul();
}

function calculateJudul() {
  let total = 0;
  const max = kriteriaJudul.reduce((s, i) => s + 3 * i.bobot, 0);

  kriteriaJudul.forEach(item => {
    const sel = document.querySelector(`input[name="kriteria-${item.no}"]:checked`);
    const score = sel ? Number(sel.value) * item.bobot : 0;
    total += score;
    const el = document.getElementById(`result-k${item.no}`);
    if (el) {
      el.textContent = score.toFixed(2);
      el.classList.remove("updated");
      void el.offsetWidth;
      el.classList.add("updated");
    }
  });

  const pct = max > 0 ? Math.min(100, (total / max) * 100) : 0;

  animateCounter(document.getElementById("scoreJudul"),    total.toFixed(2));
  animateCounter(document.getElementById("scoreJudulPct"), pct.toFixed(1) + "%");

  const juriEl = document.getElementById("scoreJuriJudulAktif");
  if (juriEl) {
    const shortJuri = activeJuriJudul
      ? activeJuriJudul.split(",")[0].split(" ").slice(-2).join(" ")
      : "—";
    animateCounter(juriEl, shortJuri);
  }

  // Progress bar
  const pb = document.getElementById("progressBarJudul");
  if (pb) pb.style.width = pct + "%";
  const pctEl = document.getElementById("percentageJudul");
  if (pctEl) pctEl.textContent = pct.toFixed(2) + "%";

  // Summary grid
  const grid = document.getElementById("summaryJudulGrid");
  if (grid) {
    grid.innerHTML = kriteriaJudul.map(item => {
      const sel   = document.querySelector(`input[name="kriteria-${item.no}"]:checked`);
      const score = sel ? Number(sel.value) * item.bobot : 0;
      return `<div><span>${item.no}. ${esc(item.nama)}</span><b>${score.toFixed(2)} / ${(3*item.bobot).toFixed(0)}</b></div>`;
    }).join("") + `<div style="grid-column:1/-1;border-top:1px solid var(--border);padding-top:8px"><span><b>Total</b></span><b>${total.toFixed(2)} / ${max}</b></div>`;
  }

  // Summary info
  const namaInovasi = namaInovasiInput.value.trim();
  const summaryInfo = document.getElementById("summaryJudulInfo");
  if (summaryInfo) {
    summaryInfo.style.display = (namaInovasi || activeJuriJudul) ? "grid" : "none";
    const el1 = document.getElementById("summaryJudulNamaInovasi");
    const el2 = document.getElementById("summaryJudulNamaJuri");
    if (el1) el1.textContent = namaInovasi || "—";
    if (el2) el2.textContent = activeJuriJudul || "—";
  }

  updateJuriStatusJudul();
}

// ══════════════════════════════════════════
//  JURI TABS — STEP 1 (JUDUL)
// ══════════════════════════════════════════
function setActiveJuriJudul(juri) {
  if (activeJuriJudul) saveJudulState();
  activeJuriJudul = juri;
  document.querySelectorAll(".juri-tab-judul").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.juriJudul === juri));
  loadJudulState(juri);
}

function updateJuriStatusJudul() {
  const rowEl    = document.getElementById("juriStatusRowJudul");
  const badgesEl = document.getElementById("juriStatusBadgesJudul");
  const summaryEl = document.getElementById("juriStatusSummaryJudul");
  if (!rowEl) return;

  const judul = namaInovasiInput.value;
  if (!judul) { rowEl.style.display = "none"; return; }

  let dinilaiCount = 0;
  let html = "";
  JURI_LIST_JUDUL.forEach(juri => {
    const state  = judulState[juri] || {};
    const done   = kriteriaJudul.some(k => state[k.no]);
    const isMe   = juri === activeJuriJudul;
    if (done) dinilaiCount++;

    // Hitung skor
    let skor = 0;
    if (done) kriteriaJudul.forEach(k => { if (state[k.no]) skor += Number(state[k.no]) * k.bobot; });

    html += `
      <div class="juri-status-badge ${done ? "status-done" : "status-pending"} ${isMe ? "status-active" : ""}">
        <span class="status-dot ${done ? "dot-done" : "dot-pending"}"></span>
        <span class="status-juri-name">${juri.split(",")[0].split(" ").slice(-2).join(" ")}</span>
        ${done ? `<span class="status-skor">${skor.toFixed(2)}</span><span class="status-check">✓</span>`
                : `<span class="status-belum">Belum</span>`}
      </div>`;
  });

  badgesEl.innerHTML = html;
  const total = JURI_LIST_JUDUL.length;
  summaryEl.textContent = dinilaiCount === 0 ? "Belum ada juri menilai"
    : dinilaiCount === total ? "✅ Semua juri selesai"
    : `${dinilaiCount} dari ${total} juri menilai`;
  summaryEl.className = "juri-status-summary " +
    (dinilaiCount === 0 ? "summary-none" : dinilaiCount === total ? "summary-complete" : "summary-partial");
  rowEl.style.display = "flex";
  rowEl.classList.remove("status-animate");
  void rowEl.offsetWidth;
  rowEl.classList.add("status-animate");
}

document.querySelectorAll(".juri-tab-judul").forEach(btn =>
  btn.addEventListener("click", () => setActiveJuriJudul(btn.dataset.juriJudul)));

// Expand/Collapse judul
document.getElementById("expandAllJudulBtn").addEventListener("click", function() {
  const expanded = this.dataset.state !== "collapsed";
  document.querySelectorAll("#judulContainer .options, #judulContainer .kriteria-desc, #judulContainer .result").forEach(el => {
    el.style.display = expanded ? "none" : "";
  });
  this.textContent = expanded ? "🔼 Buka Semua" : "🔽 Tutup Semua";
  this.dataset.state = expanded ? "collapsed" : "";
});

// ══════════════════════════════════════════
//  RENDER — STEP 2: INDIKATOR SID
// ══════════════════════════════════════════
function render() {
  container.innerHTML = "";

  const spdItems  = indicators.filter(i => i.no <= 15);
  const spdSection = document.createElement("div");
  spdSection.className = "skipped-section";
  spdSection.innerHTML = `
    <div class="skipped-section-header">
      <div class="skipped-section-title">
        <span class="skipped-icon">🚫</span>
        <div>
          <h2>SATUAN PEMERINTAH DAERAH (SPD) — Dikecualikan</h2>
          <p>Dokumen SPD tidak memiliki korelasi terhadap penilaian inovasi OPD, sehingga <strong>tidak perlu diisi</strong>.</p>
        </div>
      </div>
      <button class="toggle-skipped-btn" onclick="toggleSkipped(this)" aria-expanded="false">Lihat Detail ▾</button>
    </div>
    <div class="skipped-items-list" style="display:none">
      ${spdItems.map(item => `
        <div class="skipped-item">
          <span class="skipped-no">${item.no}</span>
          <span class="skipped-name">${esc(item.nama)}</span>
          <span class="skipped-badge">Dikecualikan (SPD)</span>
        </div>`).join("")}
    </div>`;
  container.appendChild(spdSection);

  const sidHeading = document.createElement("h2");
  sidHeading.className = "section-title";
  sidHeading.textContent = "SATUAN INOVASI DAERAH (SID)";
  container.appendChild(sidHeading);

  indicators.filter(i => i.no > 15).forEach(item => {
    if (item.skip) {
      const card = document.createElement("article");
      card.className = "indicator indicator-skipped";
      card.innerHTML = `
        <div class="indicator-head">
          <div class="indicator-title"><span class="indicator-number">${item.no}.</span>${esc(item.nama)}</div>
          <span class="badge-skip">Diabaikan</span>
        </div>
        <div class="skip-reason"><span class="skip-icon">ℹ️</span>${esc(item.skipReason)}</div>`;
      container.appendChild(card);
      return;
    }
    if (item.type === "monev") {
      const card = document.createElement("article");
      card.className = "indicator indicator-special-input";
      card.dataset.no = item.no;
      card.innerHTML = `
        <div class="indicator-head">
          <div class="indicator-title"><span class="indicator-number">${item.no}.</span>${esc(item.nama)}</div>
          <span class="badge-type badge-monev">📋 Monev</span>
        </div>
        <div class="special-input-block">
          <div class="special-input-field">
            <label for="monev-${item.no}">Jumlah Dokumen Monev</label>
            <input id="monev-${item.no}" type="number" min="0" step="1" value="0">
            <span class="input-hint">Masukkan jumlah dokumen Monev yang tersedia</span>
          </div>
          <div class="special-input-field">
            <label for="monev-ket-${item.no}">Keterangan</label>
            <textarea id="monev-ket-${item.no}" rows="2" placeholder="Keterangan tambahan (opsional)…"></textarea>
          </div>
        </div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
      container.appendChild(card);
      card.querySelector(`#monev-${item.no}`).addEventListener("input", saveCurrentState);
      card.querySelector(`#monev-ket-${item.no}`).addEventListener("input", saveCurrentState);
      return;
    }
    if (item.type === "video") {
      const card = document.createElement("article");
      card.className = "indicator indicator-special-input";
      card.dataset.no = item.no;
      card.innerHTML = `
        <div class="indicator-head">
          <div class="indicator-title"><span class="indicator-number">${item.no}.</span>${esc(item.nama)}</div>
          <span class="badge-type badge-video">🎥 Video</span>
        </div>
        <div class="special-input-block">
          <div class="special-input-field">
            <label for="video-url-${item.no}">Link / URL Video</label>
            <input id="video-url-${item.no}" type="url" placeholder="https://youtube.com/…">
            <span class="input-hint">YouTube, Google Drive, dll.</span>
          </div>
          <div class="special-input-field">
            <label for="video-ket-${item.no}">Judul Video</label>
            <input id="video-ket-${item.no}" type="text" placeholder="Judul video inovasi…">
          </div>
          <div id="video-preview-${item.no}" class="video-preview" style="display:none">
            <a id="video-link-${item.no}" href="#" target="_blank" rel="noopener" class="video-link-preview">🔗 Buka video</a>
          </div>
        </div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
      container.appendChild(card);
      const urlInput = card.querySelector(`#video-url-${item.no}`);
      const preview  = card.querySelector(`#video-preview-${item.no}`);
      const linkEl   = card.querySelector(`#video-link-${item.no}`);
      urlInput.addEventListener("input", () => {
        const val = urlInput.value.trim();
        linkEl.href = val;
        preview.style.display = val.startsWith("http") ? "block" : "none";
        saveCurrentState();
      });
      card.querySelector(`#video-ket-${item.no}`).addEventListener("input", saveCurrentState);
      return;
    }
    const card = document.createElement("article");
    card.className = "indicator";
    card.dataset.no = item.no;
    card.innerHTML = `
      <div class="indicator-head">
        <div class="indicator-title"><span class="indicator-number">${item.no}.</span>${esc(item.nama)}</div>
        <div class="meta">Bobot: ${item.bobot}</div>
      </div>
      <div class="options">
        ${item.parameter.map((p, i) => `
          <div class="option">
            <input type="radio" id="i${item.no}p${i+1}" name="indicator-${item.no}" value="${i+1}">
            <label for="i${item.no}p${i+1}">
              <div class="option-title">Parameter ${i+1} — Nilai ${i+1}</div>
              <div class="option-text">${esc(p)}</div>
            </label>
          </div>`).join("")}
      </div>
      <div class="result">Skor indikator: <b id="result-${item.no}">0.00</b></div>
      <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
    container.appendChild(card);
    card.querySelectorAll("input[type=radio]").forEach(el =>
      el.addEventListener("change", () => { saveCurrentState(); calculate(); }));
  });
}

// ══════════════════════════════════════════
//  STATE SID
// ══════════════════════════════════════════
function saveCurrentState() {
  if (!activeJuri) return;
  const s = juriState[activeJuri];
  indicators.forEach(item => {
    if (item.no <= 15 || item.skip) return;
    if (item.type === "monev") {
      s.monev[item.no]    = document.getElementById(`monev-${item.no}`)?.value || "0";
      s.monevKet[item.no] = document.getElementById(`monev-ket-${item.no}`)?.value || "";
    } else if (item.type === "video") {
      s.videoUrl[item.no] = document.getElementById(`video-url-${item.no}`)?.value || "";
      s.videoKet[item.no] = document.getElementById(`video-ket-${item.no}`)?.value || "";
    } else {
      const sel = document.querySelector(`input[name="indicator-${item.no}"]:checked`);
      s.radio[item.no] = sel ? sel.value : "";
    }
  });
}

function loadState(juri) {
  if (!juri) {
    document.querySelectorAll("input[type=radio]").forEach(x => x.checked = false);
    document.querySelectorAll("input[type=number]").forEach(x => x.value = 0);
    document.querySelectorAll("input[type=url]").forEach(x => x.value = "");
    document.querySelectorAll("textarea").forEach(x => x.value = "");
    document.querySelectorAll(".video-preview").forEach(x => x.style.display = "none");
    return;
  }
  const s = juriState[juri];
  indicators.forEach(item => {
    if (item.no <= 15 || item.skip) return;
    if (item.type === "monev") {
      const n = document.getElementById(`monev-${item.no}`);
      const k = document.getElementById(`monev-ket-${item.no}`);
      if (n) n.value = s.monev[item.no] ?? "0";
      if (k) k.value = s.monevKet[item.no] ?? "";
    } else if (item.type === "video") {
      const u = document.getElementById(`video-url-${item.no}`);
      const k = document.getElementById(`video-ket-${item.no}`);
      const p = document.getElementById(`video-preview-${item.no}`);
      const l = document.getElementById(`video-link-${item.no}`);
      if (u) u.value = s.videoUrl[item.no] ?? "";
      if (k) k.value = s.videoKet[item.no] ?? "";
      const url = s.videoUrl[item.no] ?? "";
      if (p) p.style.display = url.startsWith("http") ? "block" : "none";
      if (l) l.href = url;
    } else {
      const val = s.radio[item.no] ?? "";
      document.querySelectorAll(`input[name="indicator-${item.no}"]`).forEach(x => x.checked = false);
      if (val) {
        const el = document.querySelector(`input[name="indicator-${item.no}"][value="${val}"]`);
        if (el) el.checked = true;
      }
    }
  });
}

// ══════════════════════════════════════════
//  CALCULATE SID
// ══════════════════════════════════════════
function calculate() {
  let sid = 0;
  indicators.forEach(item => {
    if (item.no <= 15 || item.skip || item.type) return;
    const sel = document.querySelector(`input[name="indicator-${item.no}"]:checked`);
    const score = sel ? Number(sel.value) * item.bobot : 0;
    const el = document.getElementById(`result-${item.no}`);
    if (el) {
      el.textContent = score.toFixed(2);
      el.classList.remove("updated"); void el.offsetWidth; el.classList.add("updated");
    }
    sid += score;
  });

  updateJuriStatus();

  const namaInovasi = namaInovasiInput.value.trim();
  const namaJuri    = namaJuriSelect.value;
  const summaryInfo = document.getElementById("summaryInfo");
  if (summaryInfo) {
    summaryInfo.style.display = (namaInovasi || namaJuri) ? "grid" : "none";
    const el1 = document.getElementById("summaryNamaInovasi");
    const el2 = document.getElementById("summaryNamaJuri");
    if (el1) el1.textContent = namaInovasi || "—";
    if (el2) el2.textContent = namaJuri || "—";
  }

  const sidMax = indicators
    .filter(i => i.no > 15 && !i.skip && !i.type)
    .reduce((sum, i) => sum + 3 * i.bobot, 0);
  const pct = sidMax > 0 ? Math.min(100, (sid / sidMax) * 100) : 0;

  animateCounter(document.getElementById("scorePct"), pct.toFixed(1) + "%");
  scoreSPD.textContent = "—";
  animateCounter(scoreSID,   sid.toFixed(2));
  animateCounter(scoreTotal, sid.toFixed(2));
  summarySPD.textContent  = "Dikecualikan";
  summarySID.textContent  = `${sid.toFixed(2)} / ${sidMax.toFixed(0)}`;
  summaryTotal.textContent = `${sid.toFixed(2)} / ${sidMax.toFixed(0)}`;
  percentage.textContent  = pct.toFixed(2) + "%";
  progressBar.style.width = pct + "%";
}

// ══════════════════════════════════════════
//  JURI TABS — STEP 2 (SID)
// ══════════════════════════════════════════
function setActiveJuri(juri) {
  if (activeJuri) saveCurrentState();
  activeJuri = juri;
  namaJuriSelect.value = juri;
  document.querySelectorAll(".juri-tab").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.juri === juri));
  loadState(juri);
  calculate();
  updateJuriStatus();
}

document.querySelectorAll(".juri-tab").forEach(btn =>
  btn.addEventListener("click", () => setActiveJuri(btn.dataset.juri)));

namaJuriSelect.addEventListener("change", () => setActiveJuri(namaJuriSelect.value));

// ══════════════════════════════════════════
//  STATUS JURI SID
// ══════════════════════════════════════════
function hitungSkorJuriDariState(juri, state) {
  let total = 0;
  indicators.forEach(item => {
    if (item.no <= 15 || item.skip || item.type) return;
    const v = state?.[juri]?.radio?.[item.no] || "";
    if (v) total += Number(v) * item.bobot;
  });
  return parseFloat(total.toFixed(2));
}
function sudahDinilai(juri, state) {
  return indicators.some(item => {
    if (item.no <= 15 || item.skip || item.type) return false;
    return !!(state?.[juri]?.radio?.[item.no]);
  });
}
function updateJuriStatus() {
  const rowEl     = document.getElementById("juriStatusRow");
  const badgesEl  = document.getElementById("juriStatusBadges");
  const summaryEl = document.getElementById("juriStatusSummary");
  if (!rowEl) return;

  const judul = namaInovasiInput.value;
  if (!judul) { rowEl.style.display = "none"; return; }

  const allDraf = (() => { try { return JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}"); } catch(e) { return {}; } })();
  const savedState = allDraf[judul]?.juriState || {};

  let dinilaiCount = 0;
  let html = "";
  JURI_LIST.forEach(juri => {
    const stateToCheck = Object.keys(savedState).length > 0 ? savedState : juriState;
    const done  = sudahDinilai(juri, stateToCheck);
    const skor  = done ? hitungSkorJuriDariState(juri, stateToCheck) : 0;
    const isMe  = juri === activeJuri;
    if (done) dinilaiCount++;
    html += `
      <div class="juri-status-badge ${done ? "status-done" : "status-pending"} ${isMe ? "status-active" : ""}">
        <span class="status-dot ${done ? "dot-done" : "dot-pending"}"></span>
        <span class="status-juri-name">${juri.replace(/Prof\. Dr\. (Dra\. |Ir\. )?/,"").split(",")[0].split(" ").slice(0,2).join(" ")}</span>
        ${done ? `<span class="status-skor">${skor.toFixed(2)}</span><span class="status-check">✓</span>`
                : `<span class="status-belum">Belum</span>`}
      </div>`;
  });
  badgesEl.innerHTML = html;
  const total = JURI_LIST.length;
  summaryEl.textContent = dinilaiCount === 0 ? "Belum ada juri menilai"
    : dinilaiCount === total ? "✅ Semua juri selesai"
    : `${dinilaiCount} dari ${total} juri menilai`;
  summaryEl.className = "juri-status-summary " +
    (dinilaiCount === 0 ? "summary-none" : dinilaiCount === total ? "summary-complete" : "summary-partial");
  rowEl.style.display = "flex";
  rowEl.classList.remove("status-animate"); void rowEl.offsetWidth; rowEl.classList.add("status-animate");
}

// ══════════════════════════════════════════
//  NAMA INOVASI CHANGE
// ══════════════════════════════════════════
namaInovasiInput.addEventListener("change", () => {
  activeInovasi = namaInovasiInput.value.trim();
  updateInovasiCard();
  updateJuriStatusJudul();
  if (currentStep === 1) calculateJudul();
  else calculate();
});

// ══════════════════════════════════════════
//  KARTU DESKRIPSI INOVASI
// ══════════════════════════════════════════
function updateInovasiCard() {
  const judul = namaInovasiInput.value;
  const card  = document.getElementById("inovasiCard");
  if (!judul) { card.style.display = "none"; return; }
  const data = daftarInovasi.find(i => i.judul === judul);
  if (!data) { card.style.display = "none"; return; }
  document.getElementById("inovasiCardJudul").textContent   = data.judul;
  document.getElementById("inovasiCardPD").textContent      = "🏛️ " + data.perangkatDaerah;
  document.getElementById("inovasiCardBentuk").textContent  = "📂 " + data.bentuk;
  document.getElementById("inovasiCardTahun").textContent   = "📅 " + data.waktu;
  document.getElementById("inovasiCardRingkasan").textContent = data.ringkasan;
  card.style.display = "block";
  card.classList.remove("card-animate"); void card.offsetWidth; card.classList.add("card-animate");
}

// ══════════════════════════════════════════
//  TOGGLE SPD
// ══════════════════════════════════════════
function toggleSkipped(btn) {
  const list     = btn.closest(".skipped-section").querySelector(".skipped-items-list");
  const expanded = btn.getAttribute("aria-expanded") === "true";
  list.style.display = expanded ? "none" : "block";
  btn.setAttribute("aria-expanded", String(!expanded));
  btn.textContent = expanded ? "Lihat Detail ▾" : "Sembunyikan ▴";
}

// ══════════════════════════════════════════
//  EXPAND/COLLAPSE INDIKATOR SID
// ══════════════════════════════════════════
document.getElementById("expandAllBtn").addEventListener("click", function() {
  const expanded = this.dataset.state !== "collapsed";
  document.querySelectorAll(".indicator:not(.indicator-skipped):not(.indicator-special-input) .options,\
    .indicator .ket, .indicator .result").forEach(el => {
    el.style.display = expanded ? "none" : "";
  });
  this.textContent = expanded ? "🔼 Buka Semua" : "🔽 Tutup Semua";
  this.dataset.state = expanded ? "collapsed" : "";
});

// ══════════════════════════════════════════
//  RESET
// ══════════════════════════════════════════
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!activeJuri) { alert("Pilih juri terlebih dahulu."); return; }
  if (!confirm(`Reset penilaian indikator untuk juri "${activeJuri}"?`)) return;
  juriState[activeJuri] = { radio:{}, monev:{}, monevKet:{}, videoUrl:{}, videoKet:{} };
  loadState(activeJuri);
  calculate();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ══════════════════════════════════════════
//  PRINT
// ══════════════════════════════════════════
document.getElementById("printBtn").addEventListener("click", () => {
  const namaInovasi = namaInovasiInput.value.trim() || "—";
  const namaJuri    = activeJuri || activeJuriJudul || "—";

  document.getElementById("printNamaInovasi").textContent = namaInovasi;
  document.getElementById("printNamaJuri").textContent    = namaJuri;
  document.getElementById("printSignJuri").textContent    = `( ${namaJuri} )`;
  document.getElementById("printJuriJudul").textContent   = "Juri: " + (activeJuriJudul || "—");
  document.getElementById("printJuriIndikator").textContent = "Juri: " + (activeJuri || "—");
  document.getElementById("printTanggal").textContent     =
    new Date().toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" });

  // Tabel penilaian judul
  const tbodyJudul = document.getElementById("printTableJudulBody");
  tbodyJudul.innerHTML = "";
  let totalJudul = 0;
  const maxJudul = kriteriaJudul.reduce((s, i) => s + 3 * i.bobot, 0);
  kriteriaJudul.forEach(item => {
    const val   = judulState[activeJuriJudul]?.[item.no] || "";
    const score = val ? Number(val) * item.bobot : 0;
    totalJudul += score;
    const tr = document.createElement("tr");
    tr.className = score > 0 ? "pt-filled" : "pt-empty";
    tr.innerHTML = `
      <td class="pt-no">${item.no}</td>
      <td class="pt-nama">${esc(item.nama)}</td>
      <td class="pt-bobot">${item.bobot}</td>
      <td class="pt-param">${val || "—"}</td>
      <td class="pt-nilai">${score > 0 ? score.toFixed(2) : "—"}</td>
      <td class="pt-ket">${val ? esc(item.parameter[Number(val)-1]) : "—"}</td>`;
    tbodyJudul.appendChild(tr);
  });
  document.getElementById("printTotalJudul").textContent = totalJudul.toFixed(2);
  document.getElementById("printMaxJudul").textContent   = `Maks: ${maxJudul}`;

  // Tabel indikator SID
  let sid = 0;
  const sidMax = indicators.filter(i => i.no > 15 && !i.skip && !i.type)
    .reduce((sum, i) => sum + 3 * i.bobot, 0);
  const tbody = document.getElementById("printTableBody");
  tbody.innerHTML = "";
  indicators.filter(i => i.no > 15).forEach(item => {
    if (item.skip) {
      const tr = document.createElement("tr");
      tr.className = "pt-skipped";
      tr.innerHTML = `<td class="pt-no">${item.no}</td><td class="pt-nama">${esc(item.nama)}</td><td colspan="4" class="pt-skipped-cell">— Diabaikan —</td>`;
      tbody.appendChild(tr); return;
    }
    if (item.type === "monev") {
      const val = juriState[activeJuri]?.monev?.[item.no] || "0";
      const tr  = document.createElement("tr");
      tr.className = "pt-special";
      tr.innerHTML = `<td class="pt-no">${item.no}</td><td class="pt-nama">${esc(item.nama)}</td><td class="pt-bobot">—</td><td class="pt-param" colspan="2">📋 ${val} dokumen</td><td class="pt-nilai">—</td>`;
      tbody.appendChild(tr); return;
    }
    if (item.type === "video") {
      const url = juriState[activeJuri]?.videoUrl?.[item.no] || "";
      const tr  = document.createElement("tr");
      tr.className = "pt-special";
      tr.innerHTML = `<td class="pt-no">${item.no}</td><td class="pt-nama">${esc(item.nama)}</td><td class="pt-bobot">—</td><td class="pt-param" colspan="2">🎥 ${url ? "Tersedia" : "Belum diisi"}</td><td class="pt-nilai">—</td>`;
      tbody.appendChild(tr); return;
    }
    const paramVal = juriState[activeJuri]?.radio?.[item.no] || "";
    const score    = paramVal ? Number(paramVal) * item.bobot : 0;
    sid += score;
    const tr = document.createElement("tr");
    tr.className = score > 0 ? "pt-filled" : "pt-empty";
    tr.innerHTML = `
      <td class="pt-no">${item.no}</td>
      <td class="pt-nama">${esc(item.nama)}</td>
      <td class="pt-bobot">${item.bobot}</td>
      <td class="pt-param">${paramVal || "—"}</td>
      <td class="pt-nilai">${score > 0 ? score.toFixed(2) : "—"}</td>
      <td class="pt-ket">${paramVal ? esc(item.parameter[Number(paramVal)-1] || "") : "—"}</td>`;
    tbody.appendChild(tr);
  });
  const pct = sidMax > 0 ? Math.min(100, (sid / sidMax) * 100).toFixed(2) : "0.00";
  document.getElementById("printTotalSkor").textContent  = sid.toFixed(2);
  document.getElementById("printMaxSkor").textContent    = `Maks: ${sidMax.toFixed(0)}`;
  document.getElementById("printSkorTotal").textContent  = `${sid.toFixed(2)} / ${sidMax.toFixed(0)}`;
  document.getElementById("printPercentage").textContent = `${pct}%`;

  window.print();
});

// ══════════════════════════════════════════
//  DASHBOARD MODAL
// ══════════════════════════════════════════
const dashboardModal  = document.getElementById("dashboardModal");
const viewDashboardBtn = document.getElementById("viewDashboardBtn");
const closeModalBtn   = document.querySelector(".close-modal");
viewDashboardBtn.addEventListener("click", () => { updateDashboard(); dashboardModal.style.display = "flex"; });
closeModalBtn.addEventListener("click", () => { dashboardModal.style.display = "none"; });
window.addEventListener("click", e => { if (e.target === dashboardModal) dashboardModal.style.display = "none"; });

function updateDashboard() {
  document.getElementById("dashboardNamaInovasi").textContent = namaInovasiInput.value.trim() || "—";
  document.getElementById("dashboardNamaJuri").textContent    = activeJuri || "—";
  const tbody = document.getElementById("dashboardTableBody");
  tbody.innerHTML = "";
  let sidTotal = 0;
  indicators.filter(i => i.no > 15).forEach(item => {
    const row = document.createElement("tr");
    if (item.skip) {
      row.className = "skipped-row";
      row.innerHTML = `<td class="col-no">${item.no}</td><td class="indicator-name">${esc(item.nama)}</td><td class="col-bobot">—</td><td colspan="3" class="skipped-cell">— Diabaikan —</td><td class="score-cell skipped-score">—</td>`;
      tbody.appendChild(row); return;
    }
    if (item.type) {
      row.className = "special-row";
      row.innerHTML = `<td class="col-no">${item.no}</td><td class="indicator-name">${esc(item.nama)}</td><td class="col-bobot"><span class="badge-${item.type}-sm">${item.type}</span></td><td colspan="3" class="special-cell">—</td><td class="score-cell">—</td>`;
      tbody.appendChild(row); return;
    }
    const sel   = document.querySelector(`input[name="indicator-${item.no}"]:checked`);
    const sp    = Number(sel?.value || 0);
    const score = sp > 0 ? sp * item.bobot : 0;
    sidTotal   += score;
    row.className = score === 0 ? "empty-row" : "filled-row";
    row.innerHTML = `
      <td class="col-no">${item.no}</td>
      <td class="indicator-name">${esc(item.nama)}</td>
      <td class="col-bobot">${item.bobot}</td>
      <td class="param-cell ${sp===1?"selected":""}">${(1*item.bobot).toFixed(2)}</td>
      <td class="param-cell ${sp===2?"selected":""}">${(2*item.bobot).toFixed(2)}</td>
      <td class="param-cell ${sp===3?"selected":""}">${(3*item.bobot).toFixed(2)}</td>
      <td class="score-cell">${score.toFixed(2)}</td>`;
    tbody.appendChild(row);
  });
  const sidMax = indicators.filter(i => i.no > 15 && !i.skip && !i.type).reduce((s, i) => s + 3 * i.bobot, 0);
  const totalRow = document.createElement("tr");
  totalRow.className = "total-row";
  totalRow.innerHTML = `<td colspan="6" class="total-label"><strong>🎯 TOTAL SID</strong></td><td class="total-value"><strong>${sidTotal.toFixed(2)}</strong></td>`;
  tbody.appendChild(totalRow);
  document.getElementById("dashboardGrandTotal").textContent = sidTotal.toFixed(2);
  document.getElementById("dashboardSPDTotal").textContent   = "—";
  document.getElementById("dashboardSIDTotal").textContent   = sidTotal.toFixed(2);
}

// ══════════════════════════════════════════
//  FAB SIMPAN DRAF
// ══════════════════════════════════════════
(function initFAB() {
  const fab     = document.getElementById("fabSave");
  const fabIcon = document.getElementById("fabIcon");

  function loadAllDraf() { try { return JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}"); } catch(e) { return {}; } }
  function saveAllDraf(all) { localStorage.setItem("draf_iid2026_all", JSON.stringify(all)); }

  // Auto-restore
  const allDraf = loadAllDraf();
  const lastKey = localStorage.getItem("draf_iid2026_last");
  if (lastKey && allDraf[lastKey]) {
    try {
      const draf = allDraf[lastKey];
      namaInovasiInput.value = draf.namaInovasi || "";
      updateInovasiCard();
      if (draf.juriState)  Object.keys(draf.juriState).forEach(j => { if (juriState[j]) juriState[j] = draf.juriState[j]; });
      if (draf.judulState) Object.keys(draf.judulState).forEach(j => { if (judulState[j]) judulState[j] = draf.judulState[j]; });
      if (draf.activeJuri) setTimeout(() => setActiveJuri(draf.activeJuri), 50);
    } catch(e) {}
  }

  fab.addEventListener("click", () => {
    if (fab.classList.contains("loading")) return;
    saveCurrentState();
    saveJudulState();
    const judulInovasi = namaInovasiInput.value.trim();
    if (!judulInovasi) { alert("Pilih nama inovasi terlebih dahulu."); return; }

    const skorPerJuri = {};
    JURI_LIST.forEach(juri => {
      let t = 0;
      indicators.forEach(item => {
        if (item.no <= 15 || item.skip || item.type) return;
        const v = juriState[juri]?.radio[item.no] || "";
        if (v) t += Number(v) * item.bobot;
      });
      skorPerJuri[juri] = t;
    });
    const skorJudulPerJuri = {};
    JURI_LIST_JUDUL.forEach(juri => {
      let t = 0;
      kriteriaJudul.forEach(k => {
        const v = judulState[juri]?.[k.no] || "";
        if (v) t += Number(v) * k.bobot;
      });
      skorJudulPerJuri[juri] = t;
    });

    const all = loadAllDraf();
    all[judulInovasi] = {
      namaInovasi  : judulInovasi,
      activeJuri, savedAt: new Date().toISOString(),
      juriState   : JSON.parse(JSON.stringify(juriState)),
      judulState  : JSON.parse(JSON.stringify(judulState)),
      skorPerJuri, skorJudulPerJuri
    };
    saveAllDraf(all);
    localStorage.setItem("draf_iid2026_last", judulInovasi);

    fab.classList.add("loading"); fabIcon.textContent = "⏳";
    setTimeout(() => {
      fab.classList.remove("loading"); fab.classList.add("saved"); fabIcon.textContent = "✅";
      setTimeout(() => { fab.classList.remove("saved"); fabIcon.textContent = "💾"; }, 2000);
    }, 800);
  });
})();

// ══════════════════════════════════════════
//  DARK MODE
// ══════════════════════════════════════════
(function initTheme() {
  const btn  = document.getElementById("themeToggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", saved);
  btn.setAttribute("data-theme", saved);
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    btn.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ══════════════════════════════════════════
//  SCROLL TO TOP
// ══════════════════════════════════════════
(function initScrollTop() {
  const btn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > document.documentElement.scrollHeight * 0.5);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// ══════════════════════════════════════════
//  SPLIT BUTTON EKSPOR
// ══════════════════════════════════════════
(function initExportSplit() {
  const toggleBtn = document.getElementById("exportDropdownToggle");
  const dropdown  = document.getElementById("exportDropdown");
  const wrap      = document.getElementById("exportSplitWrap");
  toggleBtn.addEventListener("click", e => { e.stopPropagation(); const open = dropdown.classList.toggle("open"); toggleBtn.setAttribute("aria-expanded", String(open)); });
  document.addEventListener("click", e => { if (!wrap.contains(e.target)) { dropdown.classList.remove("open"); toggleBtn.setAttribute("aria-expanded","false"); } });
  document.getElementById("exportPdfBtn").addEventListener("click", () => { dropdown.classList.remove("open"); document.getElementById("printBtn").click(); });
  document.getElementById("exportExcelBtn").addEventListener("click", () => {
    dropdown.classList.remove("open");
    if (!activeJuri) { alert("Pilih juri terlebih dahulu."); return; }
    const namaInovasi = namaInovasiInput.value.trim() || "—";
    const rows = [
      ["Indeks Inovasi Daerah 2027 — Hasil Penilaian"],
      ["Nama Inovasi", namaInovasi], ["Nama Juri Indikator", activeJuri], ["Tanggal", new Date().toLocaleDateString("id-ID")],
      [], ["No","Nama Indikator","Bobot","Param Dipilih","Nilai Indikator","Deskripsi Parameter"]
    ];
    let total = 0;
    indicators.filter(i => i.no > 15).forEach(item => {
      if (item.skip) { rows.push([item.no, item.nama, "—", "Diabaikan","—","—"]); return; }
      if (item.type) { rows.push([item.no, item.nama, "—", "—","—", item.keterangan]); return; }
      const v = juriState[activeJuri].radio[item.no] || "";
      const s = v ? Number(v) * item.bobot : 0;
      total += s;
      rows.push([item.no, item.nama, item.bobot, v||"—", s>0?s.toFixed(2):"—", v?(item.parameter[Number(v)-1]||""):"—"]);
    });
    rows.push([], ["","","","TOTAL SKOR SID", total.toFixed(2)]);
    const csv  = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type:"text/csv;charset=utf-8;" });
    const a    = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `Penilaian_${namaInovasi.replace(/\s+/g,"_")}_${activeJuri}.csv`; a.click();
    URL.revokeObjectURL(a.href);
  });
})();

// ══════════════════════════════════════════
//  TOOLTIP
// ══════════════════════════════════════════
(function initTooltips() {
  document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".tooltip-btn:focus").forEach(b => b.blur()); });
})();

// ══════════════════════════════════════════
//  DASHBOARD RANKING
// ══════════════════════════════════════════
function getKategori(pd) {
  if (!pd) return "opd";
  const p = pd.toLowerCase();
  if (p.includes("puskesmas") || p.includes("rsud")) return "kesehatan";
  if (p.includes("sd negeri") || p.includes("smp negeri") || p.includes("sd aisyah") || p.includes("sd muhammadiyah") || p.includes("sdit")) return "pendidikan";
  return "opd";
}
function loadRankingData() {
  try {
    const raw = JSON.parse(localStorage.getItem("draf_iid2026_all") || "{}");
    console.log('📊 Raw data from localStorage:', raw);
    console.log('📊 Keys found:', Object.keys(raw));
    
    const results = Object.entries(raw).map(([judulKey, draf]) => {
      console.log('Processing:', judulKey, draf);
      const sp = draf.skorPerJuri || {};
      const jm = Object.entries(sp).filter(([,s]) => s > 0).map(([j]) => j);
      const rt = jm.length > 0 ? Object.values(sp).reduce((a,b)=>a+b,0) / jm.length : 0;
      const meta = daftarInovasi.find(i => i.judul === judulKey) || {};
      return { judul:judulKey, perangkatDaerah:meta.perangkatDaerah||"—", kategori:getKategori(meta.perangkatDaerah), skorPerJuri:sp, juriYgMenilai:jm, rataRata:parseFloat(rt.toFixed(2)), savedAt:draf.savedAt||"" };
    }).sort((a,b) => b.rataRata - a.rataRata);
    
    console.log('📊 Processed results:', results);
    return results;
  } catch(e) { 
    console.error('❌ Error loading ranking data:', e);
    return []; 
  }
}
function renderRankingCard(item, rank) {
  const medal = rank===1?"🥇":rank===2?"🥈":rank===3?"🥉":`#${rank}`;
  const rk    = rank<=3?`rank-top rank-${rank}`:rank<=10?"rank-normal":"rank-below";
  const cells = JURI_LIST.map(j => {
    const s = item.skorPerJuri[j] ?? 0;
    return `<div class="rk-juri-cell ${s>0?"has-score":"no-score"}"><span class="rk-juri-name">${j.replace(/Prof\. Dr\. (Dra\. |Ir\. )?/,"").split(",")[0].split(" ").slice(0,2).join(" ")}</span><span class="rk-juri-val">${s>0?s.toFixed(2):"—"}</span></div>`;
  }).join("");
  const date = item.savedAt ? new Date(item.savedAt).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}) : "";
  return `<div class="rk-card ${rk}">
    <div class="rk-rank">${medal}</div>
    <div class="rk-content">
      <div class="rk-header"><div class="rk-judul">${esc(item.judul)}</div><div class="rk-avg"><span class="rk-avg-label">Rata-rata</span><span class="rk-avg-val">${item.rataRata.toFixed(2)}</span></div></div>
      <div class="rk-meta"><span class="rk-pd">🏛️ ${esc(item.perangkatDaerah)}</span>${date?`<span class="rk-date">💾 ${date}</span>`:""}</div>
      <div class="rk-juri-row">${cells}<div class="rk-juri-cell juri-total"><span class="rk-juri-name">Dinilai</span><span class="rk-juri-val">${item.juriYgMenilai.length}/${JURI_LIST.length}</span></div></div>
    </div></div>`;
}
function renderRankingList(id, items, max=10) {
  const el = document.getElementById(id);
  if (!el) return;
  if (items.length === 0) { el.innerHTML = `<div class="rk-empty"><div class="rk-empty-icon">📭</div><div class="rk-empty-title">Belum ada data tersimpan</div><div class="rk-empty-sub">Nilai beberapa inovasi lalu klik 💾 Simpan Hasil.</div></div>`; return; }
  let html = `<div class="rk-section-title">🏅 Top ${Math.min(max,items.length)} Inovasi</div>`;
  html += items.slice(0,max).map((item,i) => renderRankingCard(item,i+1)).join("");
  const rest = items.slice(max);
  if (rest.length) html += `<details class="rk-rest"><summary class="rk-rest-toggle">Lihat ${rest.length} inovasi lainnya ▾</summary><div class="rk-rest-list">${rest.map((item,i) => renderRankingCard(item,max+i+1)).join("")}</div></details>`;
  el.innerHTML = html;
}
function renderAllRanking() {
  const all = loadRankingData();
  renderRankingList("ranking-list-opd",        all.filter(i=>i.kategori==="opd"), 10);
  renderRankingList("ranking-list-pendidikan",  all.filter(i=>i.kategori==="pendidikan"), 10);
  renderRankingList("ranking-list-kesehatan",   all.filter(i=>i.kategori==="kesehatan"), 10);
  const ji = document.getElementById("rankingJuriInfo");
  if (ji) {
    const js = new Set(all.flatMap(i=>i.juriYgMenilai));
    ji.innerHTML = `<span class="rk-info-badge">📊 ${all.length} inovasi</span><span class="rk-info-badge">👤 ${[...js].join(", ")||"—"}</span>`;
  }
}
(function initRankingModal() {
  const modal    = document.getElementById("rankingModal");
  const openBtn  = document.getElementById("viewRankingBtn");
  const closeBtn = document.querySelector(".close-ranking");
  openBtn.addEventListener("click", () => { renderAllRanking(); modal.style.display = "flex"; });
  closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
  document.getElementById("rankingRefreshBtn").addEventListener("click", () => { renderAllRanking(); });
  document.getElementById("rankingClearBtn").addEventListener("click", () => {
    if (!confirm("Hapus semua data penilaian tersimpan?")) return;
    localStorage.removeItem("draf_iid2026_all"); localStorage.removeItem("draf_iid2026_last");
    renderAllRanking();
  });
  document.querySelectorAll(".ranking-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ranking-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".ranking-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("panel-"+tab.dataset.tab)?.classList.add("active");
    });
  });
})();

// ══════════════════════════════════════════
//  INIT — mulai di step 1
// ══════════════════════════════════════════
renderJudul();
calculateJudul();

// Render dashboard ranking saat page load
renderAllRanking();
console.log('✅ Dashboard ranking initialized');
