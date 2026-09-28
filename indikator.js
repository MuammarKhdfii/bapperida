// ══════════════════════════════════════════
//  indikator.js — Penilaian Indikator SID
//  - Hanya indikator SID aktif (sidIndicators)
//  - Nomor tampil mulai dari 1
//  - Total = skor indikator + rata-rata skor judul
// ══════════════════════════════════════════

// ── State ──
const juriState = {};
JURI_LIST.forEach(j => {
  juriState[j] = { radio:{}, monev:{}, monevKet:{}, videoUrl:{}, videoKet:{} };
});
let activeJuri  = "";
let namaInovasi = "";

// ── Init ──
initScrollTop("scrollTopBtn");
namaInovasi = localStorage.getItem("iid2026_selected") || "";

// Tampilkan kartu inovasi
const inovasiCard = document.getElementById("inovasiCardInd");
const noWarn      = document.getElementById("noInovasiWarnInd");
if (namaInovasi) {
  const meta = daftarInovasi.find(i => i.judul === namaInovasi) || {};
  document.getElementById("icJudulInd").textContent     = namaInovasi;
  document.getElementById("icPDInd").textContent        = "🏛️ " + (meta.perangkatDaerah || "—");
  document.getElementById("icBentukInd").textContent    = "📂 " + (meta.bentuk || "—");
  document.getElementById("icTahunInd").textContent     = "📅 " + (meta.waktu || "—");
  document.getElementById("icRingkasanInd").textContent = meta.ringkasan || "—";
  inovasiCard.style.display = "block";
  inovasiCard.classList.add("card-animate");
  noWarn.style.display = "none";
} else {
  inovasiCard.style.display = "none";
  noWarn.style.display      = "block";
}

// Restore state dari localStorage
const restored = loadIndikatorFromStorage(namaInovasi);
if (restored.juriState) {
  Object.keys(restored.juriState).forEach(j => {
    if (juriState[j]) juriState[j] = restored.juriState[j];
  });
}

// ── DOM refs ──
const container  = document.getElementById("indicatorContainer");
const scoreSID   = document.getElementById("scoreSID");
const scoreTotal = document.getElementById("scoreTotal");
const summarySID = document.getElementById("summarySID");
const summaryTotal = document.getElementById("summaryTotal");
const percentage   = document.getElementById("percentage");
const progressBar  = document.getElementById("progressBar");

// ── Render — hanya sidIndicators, nomor dari 1 ──
function render() {
  container.innerHTML = "";

  sidIndicators.forEach((item, idx) => {
    const dispNo = item.displayNo; // 1, 2, 3, ...

    // Monev
    if (item.type === "monev") {
      const card = document.createElement("article");
      card.className = "indicator indicator-special-input";
      card.dataset.no = item.originalNo;
      card.innerHTML = `
        <div class="indicator-head">
          <div class="indicator-title"><span class="indicator-number">${dispNo}.</span>${esc(item.nama)}</div>
          <span class="badge-type badge-monev">📋 Monev</span>
        </div>
        <div class="special-input-block">
          <div class="special-input-field">
            <label for="monev-${item.originalNo}">Jumlah Dokumen Monev</label>
            <input id="monev-${item.originalNo}" type="number" min="0" step="1" value="0">
            <span class="input-hint">Jumlah dokumen Monev tersedia</span>
          </div>
          <div class="special-input-field">
            <label for="monevket-${item.originalNo}">Keterangan</label>
            <textarea id="monevket-${item.originalNo}" rows="2" placeholder="Keterangan (opsional)…"></textarea>
          </div>
        </div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
      container.appendChild(card);
      card.querySelector(`#monev-${item.originalNo}`).addEventListener("input", saveCurrentState);
      card.querySelector(`#monevket-${item.originalNo}`).addEventListener("input", saveCurrentState);
      return;
    }

    // Video
    if (item.type === "video") {
      const card = document.createElement("article");
      card.className = "indicator indicator-special-input";
      card.dataset.no = item.originalNo;
      card.innerHTML = `
        <div class="indicator-head">
          <div class="indicator-title"><span class="indicator-number">${dispNo}.</span>${esc(item.nama)}</div>
          <span class="badge-type badge-video">🎥 Video</span>
        </div>
        <div class="special-input-block">
          <div class="special-input-field">
            <label for="video-url-${item.originalNo}">Link / URL Video</label>
            <input id="video-url-${item.originalNo}" type="url" placeholder="https://youtube.com/…">
            <span class="input-hint">YouTube, Google Drive, dll.</span>
          </div>
          <div class="special-input-field">
            <label for="video-ket-${item.originalNo}">Judul Video</label>
            <input id="video-ket-${item.originalNo}" type="text" placeholder="Judul video…">
          </div>
          <div id="video-preview-${item.originalNo}" class="video-preview" style="display:none">
            <a id="video-link-${item.originalNo}" href="#" target="_blank" rel="noopener" class="video-link-preview">🔗 Buka video</a>
          </div>
        </div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
      container.appendChild(card);
      const urlInput = card.querySelector(`#video-url-${item.originalNo}`);
      const preview  = card.querySelector(`#video-preview-${item.originalNo}`);
      const linkEl   = card.querySelector(`#video-link-${item.originalNo}`);
      urlInput.addEventListener("input", () => {
        const val = urlInput.value.trim();
        linkEl.href = val;
        preview.style.display = val.startsWith("http") ? "block" : "none";
        saveCurrentState();
      });
      card.querySelector(`#video-ket-${item.originalNo}`).addEventListener("input", saveCurrentState);
      return;
    }

    // Indikator biasa
    const card = document.createElement("article");
    card.className = "indicator";
    card.style.animationDelay = (idx * 0.03) + "s";
    card.innerHTML = `
      <div class="indicator-head">
        <div class="indicator-title">
          <span class="indicator-number">${dispNo}.</span>${esc(item.nama)}
        </div>
        <div class="meta">Bobot: ${item.bobot}</div>
      </div>
      <div class="options">
        ${item.parameter.map((p, i) => `
          <div class="option">
            <input type="radio" id="i${item.originalNo}p${i+1}" name="ind-${item.originalNo}" value="${i+1}">
            <label for="i${item.originalNo}p${i+1}">
              <div class="option-title">Parameter ${i+1} — Nilai ${i+1}</div>
              <div class="option-text">${esc(p)}</div>
            </label>
          </div>`).join("")}
      </div>
      <div class="result">Skor: <b id="res-${item.originalNo}">0.00</b></div>
      <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
    container.appendChild(card);
    card.querySelectorAll("input[type=radio]").forEach(el =>
      el.addEventListener("change", () => { saveCurrentState(); calculate(); }));
  });

  if (activeJuri) loadState(activeJuri);
}

// ── State helpers ──
function saveCurrentState() {
  if (!activeJuri) return;
  const s = juriState[activeJuri];
  sidIndicators.forEach(item => {
    if (item.type === "monev") {
      s.monev[item.originalNo]    = document.getElementById(`monev-${item.originalNo}`)?.value || "0";
      s.monevKet[item.originalNo] = document.getElementById(`monevket-${item.originalNo}`)?.value || "";
    } else if (item.type === "video") {
      s.videoUrl[item.originalNo] = document.getElementById(`video-url-${item.originalNo}`)?.value || "";
      s.videoKet[item.originalNo] = document.getElementById(`video-ket-${item.originalNo}`)?.value || "";
    } else {
      const sel = document.querySelector(`input[name="ind-${item.originalNo}"]:checked`);
      s.radio[item.originalNo] = sel ? sel.value : "";
    }
  });
}

function loadState(juri) {
  const s = juriState[juri];
  sidIndicators.forEach(item => {
    if (item.type === "monev") {
      const n = document.getElementById(`monev-${item.originalNo}`);
      const k = document.getElementById(`monevket-${item.originalNo}`);
      if (n) n.value = s.monev[item.originalNo] ?? "0";
      if (k) k.value = s.monevKet[item.originalNo] ?? "";
    } else if (item.type === "video") {
      const u = document.getElementById(`video-url-${item.originalNo}`);
      const k = document.getElementById(`video-ket-${item.originalNo}`);
      const p = document.getElementById(`video-preview-${item.originalNo}`);
      const l = document.getElementById(`video-link-${item.originalNo}`);
      if (u) u.value = s.videoUrl[item.originalNo] ?? "";
      if (k) k.value = s.videoKet[item.originalNo] ?? "";
      const url = s.videoUrl[item.originalNo] ?? "";
      if (p) p.style.display = url.startsWith("http") ? "block" : "none";
      if (l) l.href = url;
    } else {
      const val = s.radio[item.originalNo] ?? "";
      document.querySelectorAll(`input[name="ind-${item.originalNo}"]`).forEach(x => x.checked = false);
      if (val) {
        const el = document.querySelector(`input[name="ind-${item.originalNo}"][value="${val}"]`);
        if (el) el.checked = true;
      }
    }
  });
}

// ── Calculate — skor indikator + ambil skor judul dari storage ──
function calculate() {
  let sid = 0;

  sidIndicators.forEach(item => {
    if (item.type) return; // monev/video tidak hitung skor
    const sel   = document.querySelector(`input[name="ind-${item.originalNo}"]:checked`);
    const score = sel ? Number(sel.value) * item.bobot : 0;
    const el    = document.getElementById(`res-${item.originalNo}`);
    if (el) {
      el.textContent = score.toFixed(2);
      el.classList.remove("updated"); void el.offsetWidth; el.classList.add("updated");
    }
    sid += score;
  });

  // Ambil rata-rata skor judul dari storage (sudah dinilai juri judul)
  const gabungan     = getTotalGabungan(namaInovasi);
  const skorJudul    = gabungan.skorJudul;
  const totalGabungan = parseFloat((sid + skorJudul).toFixed(2));

  // Max: indikator SID + max judul (63)
  const sidMax   = sidIndicators.filter(i => !i.type).reduce((s, i) => s + 3 * i.bobot, 0);
  const judulMax = 63;
  const totalMax = sidMax + judulMax;

  // Kelengkapan pengisian: hitung hanya indikator dengan parameter radio (bukan monev/video)
  const indBiasa  = sidIndicators.filter(i => !i.type && Array.isArray(i.parameter) && i.parameter.length > 0);
  const terisiInd = indBiasa.filter(i =>
    document.querySelector(`input[name="ind-${i.originalNo}"]:checked`)
  ).length;

  // 100% = semua indikator radio sudah terisi
  const pctLengkap = indBiasa.length > 0
    ? Math.min(100, Math.round((terisiInd / indBiasa.length) * 100))
    : 0;

  // Update status juri
  updateJuriStatus();

  // Update summary
  const si = document.getElementById("summaryInfo");
  if (si) {
    si.style.display = (namaInovasi || activeJuri) ? "grid" : "none";
    const e1 = document.getElementById("summaryNamaInovasi"); if (e1) e1.textContent = namaInovasi || "—";
    const e2 = document.getElementById("summaryNamaJuri");    if (e2) e2.textContent = activeJuri || "—";
  }

  animateCounter(document.getElementById("scorePct"),         pctLengkap + "%");
  animateCounter(scoreSID,                                     sid.toFixed(2));
  animateCounter(scoreTotal,                                   totalGabungan.toFixed(2));
  animateCounter(document.getElementById("scoreJudulDisplay"), skorJudul.toFixed(2));

  summarySID.textContent   = `${sid.toFixed(2)} / ${sidMax.toFixed(0)}`;
  summaryTotal.textContent = `${totalGabungan.toFixed(2)} / ${totalMax.toFixed(0)}`;
  percentage.textContent   = `${pctLengkap}% terisi (${terisiInd}/${indBiasa.length} indikator)`;
  progressBar.style.width  = pctLengkap + "%";
  progressBar.style.background = pctLengkap === 100
    ? "linear-gradient(90deg,#10b981,#16a34a)"
    : "linear-gradient(90deg,#155eef,#7c3aed,#06b6d4)";
}

// ── Juri Tabs ──
function setActiveJuri(juri) {
  if (activeJuri) saveCurrentState();
  activeJuri = juri;
  document.querySelectorAll(".juri-tab").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.juri === juri));
  loadState(juri);
  calculate();
  updateJuriStatus();
}
document.querySelectorAll(".juri-tab").forEach(btn =>
  btn.addEventListener("click", () => setActiveJuri(btn.dataset.juri)));

if (restored.activeJuri) setTimeout(() => setActiveJuri(restored.activeJuri), 50);

// ── Status Juri ──
function updateJuriStatus() {
  const rowEl    = document.getElementById("juriStatusRow");
  const badgesEl = document.getElementById("juriStatusBadges");
  const sumEl    = document.getElementById("juriStatusSummary");
  if (!rowEl || !namaInovasi) { if (rowEl) rowEl.style.display = "none"; return; }

  let dinilai = 0, html = "";
  JURI_LIST.forEach(juri => {
    const done  = sidIndicators.some(item => !item.type && juriState[juri]?.radio?.[item.originalNo]);
    const isMe  = juri === activeJuri;
    if (done) dinilai++;
    let skor = 0;
    if (done) sidIndicators.forEach(item => {
      if (!item.type) {
        const v = juriState[juri]?.radio?.[item.originalNo] || "";
        if (v) skor += Number(v) * item.bobot;
      }
    });
    const name = juri.replace(/Prof\. Dr\. (Dra\. |Ir\. )?/, "").split(",")[0].split(" ").slice(0, 2).join(" ");
    html += `
      <div class="juri-status-badge ${done ? "status-done" : "status-pending"} ${isMe ? "status-active" : ""}">
        <span class="status-dot ${done ? "dot-done" : "dot-pending"}"></span>
        <span class="status-juri-name">${name}</span>
        ${done
          ? `<span class="status-skor">${skor.toFixed(2)}</span><span class="status-check">✓</span>`
          : `<span class="status-belum">Belum</span>`}
      </div>`;
  });
  badgesEl.innerHTML = html;
  const total = JURI_LIST.length;
  sumEl.textContent = dinilai === 0 ? "Belum ada juri" : dinilai === total ? "✅ Semua juri selesai" : `${dinilai}/${total} juri`;
  sumEl.className = "juri-status-summary " +
    (dinilai === 0 ? "summary-none" : dinilai === total ? "summary-complete" : "summary-partial");
  rowEl.style.display = "flex";
  rowEl.classList.remove("status-animate"); void rowEl.offsetWidth; rowEl.classList.add("status-animate");
}

// ── Simpan ──
function doSave() {
  saveCurrentState();
  if (!namaInovasi) { alert("Inovasi belum dipilih."); return; }
  if (!activeJuri)  { alert("Pilih juri terlebih dahulu."); return; }
  saveIndikatorToStorage(namaInovasi, juriState, activeJuri);
  const btn = document.getElementById("saveBtn");
  if (!btn) return;
  const orig = btn.textContent;
  btn.textContent = "✅ Tersimpan!";
  btn.style.background = "linear-gradient(135deg,#10b981,#059669)";
  setTimeout(() => { btn.textContent = orig; btn.style.background = ""; }, 2000);
}
document.getElementById("saveBtn").addEventListener("click", doSave);
window.addEventListener("beforeunload", () => {
  saveCurrentState();
  saveIndikatorToStorage(namaInovasi, juriState, activeJuri);
});

// ── Expand/Collapse ──
document.getElementById("expandAllBtn").addEventListener("click", function() {
  const collapsed = this.dataset.state === "collapsed";
  document.querySelectorAll(".indicator:not(.indicator-special-input) .options, .indicator .ket, .indicator .result")
    .forEach(el => { el.style.display = collapsed ? "" : "none"; });
  this.textContent = collapsed ? "🔽 Buka Semua" : "🔼 Tutup Semua";
  this.dataset.state = collapsed ? "" : "collapsed";
});

// ── Reset ──
document.getElementById("resetBtn").addEventListener("click", () => {
  if (!activeJuri) { alert("Pilih juri terlebih dahulu."); return; }
  if (!confirm(`Reset penilaian untuk juri "${activeJuri}"?`)) return;
  juriState[activeJuri] = { radio:{}, monev:{}, monevKet:{}, videoUrl:{}, videoKet:{} };
  loadState(activeJuri);
  calculate();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── Print ──
document.getElementById("printBtn").addEventListener("click", () => {
  if (!activeJuri) { alert("Pilih juri terlebih dahulu."); return; }
  const namaJuri = activeJuri;
  document.getElementById("printNamaInovasi").textContent = namaInovasi || "—";
  document.getElementById("printNamaJuri").textContent    = namaJuri;
  document.getElementById("printSignJuri").textContent    = `( ${namaJuri} )`;
  document.getElementById("printTanggal").textContent     =
    new Date().toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" });

  let sid = 0;
  const sidMax = sidIndicators.filter(i => !i.type).reduce((s, i) => s + 3 * i.bobot, 0);
  const tbody  = document.getElementById("printTableBody");
  tbody.innerHTML = "";

  sidIndicators.forEach(item => {
    const tr = document.createElement("tr");
    if (item.type === "monev") {
      const val = juriState[activeJuri]?.monev?.[item.originalNo] || "0";
      tr.className = "pt-special";
      tr.innerHTML = `<td class="pt-no">${item.displayNo}</td><td class="pt-nama">${esc(item.nama)}</td><td>—</td><td colspan="2">📋 ${val} dok</td><td>—</td>`;
      tbody.appendChild(tr); return;
    }
    if (item.type === "video") {
      const url = juriState[activeJuri]?.videoUrl?.[item.originalNo] || "";
      tr.className = "pt-special";
      tr.innerHTML = `<td class="pt-no">${item.displayNo}</td><td class="pt-nama">${esc(item.nama)}</td><td>—</td><td colspan="2">🎥 ${url ? "Tersedia" : "Belum"}</td><td>—</td>`;
      tbody.appendChild(tr); return;
    }
    const v  = juriState[activeJuri]?.radio?.[item.originalNo] || "";
    const sc = v ? Number(v) * item.bobot : 0;
    sid += sc;
    tr.className = sc > 0 ? "pt-filled" : "pt-empty";
    tr.innerHTML = `
      <td class="pt-no">${item.displayNo}</td>
      <td class="pt-nama">${esc(item.nama)}</td>
      <td class="pt-bobot">${item.bobot}</td>
      <td class="pt-param">${v || "—"}</td>
      <td class="pt-nilai">${sc > 0 ? sc.toFixed(2) : "—"}</td>
      <td class="pt-ket">${v ? esc(item.parameter[Number(v) - 1] || "") : "—"}</td>`;
    tbody.appendChild(tr);
  });

  const gabungan = getTotalGabungan(namaInovasi);
  const total    = sid + gabungan.skorJudul;
  const pct      = ((sidMax + 63) > 0 ? Math.min(100, total / (sidMax + 63) * 100) : 0).toFixed(2);

  document.getElementById("printTotalSkor").textContent  = total.toFixed(2);
  document.getElementById("printMaxSkor").textContent    = `Maks: ${(sidMax + 63).toFixed(0)}`;
  document.getElementById("printSkorTotal").textContent  = `${total.toFixed(2)} / ${(sidMax + 63).toFixed(0)}`;
  document.getElementById("printPercentage").textContent = `${pct}%`;
  window.print();
});

// ── Dashboard Modal ──
const dashModal = document.getElementById("dashboardModal");
document.getElementById("viewDashboardBtn").addEventListener("click", () => { updateDashboard(); dashModal.style.display = "flex"; });
document.querySelector(".close-modal").addEventListener("click", () => { dashModal.style.display = "none"; });
window.addEventListener("click", e => { if (e.target === dashModal) dashModal.style.display = "none"; });

function updateDashboard() {
  document.getElementById("dashboardNamaInovasi").textContent = namaInovasi || "—";
  document.getElementById("dashboardNamaJuri").textContent    = activeJuri || "—";
  const tbody = document.getElementById("dashboardTableBody");
  tbody.innerHTML = "";
  let sidTotal = 0;
  sidIndicators.forEach(item => {
    const row = document.createElement("tr");
    if (item.type) {
      row.className = "special-row";
      row.innerHTML = `<td class="col-no">${item.displayNo}</td><td class="indicator-name">${esc(item.nama)}</td><td>—</td><td colspan="3" class="special-cell">—</td><td class="score-cell">—</td>`;
      tbody.appendChild(row); return;
    }
    const sel   = document.querySelector(`input[name="ind-${item.originalNo}"]:checked`);
    const sp    = Number(sel?.value || 0);
    const score = sp > 0 ? sp * item.bobot : 0;
    sidTotal   += score;
    row.className = score === 0 ? "empty-row" : "filled-row";
    row.innerHTML = `
      <td class="col-no">${item.displayNo}</td>
      <td class="indicator-name">${esc(item.nama)}</td>
      <td class="col-bobot">${item.bobot}</td>
      <td class="param-cell ${sp === 1 ? "selected" : ""}">${(1 * item.bobot).toFixed(2)}</td>
      <td class="param-cell ${sp === 2 ? "selected" : ""}">${(2 * item.bobot).toFixed(2)}</td>
      <td class="param-cell ${sp === 3 ? "selected" : ""}">${(3 * item.bobot).toFixed(2)}</td>
      <td class="score-cell">${score.toFixed(2)}</td>`;
    tbody.appendChild(row);
  });

  // Tambahkan baris skor judul
  const gabungan = getTotalGabungan(namaInovasi);
  const judulRow = document.createElement("tr");
  judulRow.className = "special-row";
  judulRow.innerHTML = `
    <td class="col-no">★</td>
    <td class="indicator-name"><b>Rata-rata Skor Judul Inovasi</b></td>
    <td class="col-bobot">—</td>
    <td colspan="3" class="special-cell">Dari ${JURI_LIST_JUDUL.length} juri khusus</td>
    <td class="score-cell" style="color:#d97706;font-weight:900">${gabungan.skorJudul.toFixed(2)}</td>`;
  tbody.appendChild(judulRow);

  const totalRow = document.createElement("tr");
  totalRow.className = "total-row";
  totalRow.innerHTML = `<td colspan="6" class="total-label"><strong>🎯 TOTAL GABUNGAN (Indikator + Judul)</strong></td><td class="total-value"><strong>${(sidTotal + gabungan.skorJudul).toFixed(2)}</strong></td>`;
  tbody.appendChild(totalRow);

  document.getElementById("dashboardGrandTotal").textContent = (sidTotal + gabungan.skorJudul).toFixed(2);
  document.getElementById("dashboardSPDTotal").textContent   = "—";
  document.getElementById("dashboardSIDTotal").textContent   = sidTotal.toFixed(2);
}

// ── Ranking ──
function getKategori(pd) {
  if (!pd) return "opd";
  const p = pd.toLowerCase();
  if (p.includes("puskesmas") || p.includes("rsud")) return "kesehatan";
  if (p.includes("sd negeri") || p.includes("smp negeri") || p.includes("sd aisyah") || p.includes("sd muhammadiyah") || p.includes("sdit")) return "pendidikan";
  return "opd";
}
function loadRankingData() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY_ALL) || "{}");
    return Object.entries(raw).map(([k, d]) => {
      // Gabungkan rata-rata indikator + rata-rata judul
      const sp  = d.skorPerJuri || {};
      const sjp = d.skorJudulPerJuri || {};
      const indArr  = Object.values(sp).filter(s => s > 0);
      const judArr  = Object.values(sjp).filter(s => s > 0);
      const avgInd  = indArr.length  > 0 ? indArr.reduce((a, b) => a + b, 0) / indArr.length  : 0;
      const avgJud  = judArr.length  > 0 ? judArr.reduce((a, b) => a + b, 0) / judArr.length  : 0;
      const rataRata = parseFloat((avgInd + avgJud).toFixed(2));
      const jm       = [...new Set([...Object.keys(sp).filter(j => sp[j] > 0), ...Object.keys(sjp).filter(j => sjp[j] > 0)])];
      const meta     = daftarInovasi.find(i => i.judul === k) || {};
      return { judul:k, perangkatDaerah:meta.perangkatDaerah||"—", kategori:getKategori(meta.perangkatDaerah), skorPerJuri:sp, juriYgMenilai:jm, rataRata, savedAt:d.savedAt||"" };
    }).sort((a, b) => b.rataRata - a.rataRata);
  } catch(e) { return []; }
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
      <div class="rk-header"><div class="rk-judul">${esc(item.judul)}</div><div class="rk-avg"><span class="rk-avg-label">Total</span><span class="rk-avg-val">${item.rataRata.toFixed(2)}</span></div></div>
      <div class="rk-meta"><span class="rk-pd">🏛️ ${esc(item.perangkatDaerah)}</span>${date?`<span class="rk-date">💾 ${date}</span>`:""}</div>
      <div class="rk-juri-row">${cells}</div>
    </div></div>`;
}
function renderRankingList(id, items, max=10) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!items.length) { el.innerHTML=`<div class="rk-empty"><div class="rk-empty-icon">📭</div><div class="rk-empty-title">Belum ada data</div><div class="rk-empty-sub">Nilai dan simpan beberapa inovasi.</div></div>`; return; }
  let html = `<div class="rk-section-title">🏅 Top ${Math.min(max,items.length)}</div>`;
  html += items.slice(0,max).map((item,i) => renderRankingCard(item,i+1)).join("");
  const rest = items.slice(max);
  if (rest.length) html += `<details class="rk-rest"><summary class="rk-rest-toggle">Lihat ${rest.length} lainnya ▾</summary><div class="rk-rest-list">${rest.map((item,i) => renderRankingCard(item,max+i+1)).join("")}</div></details>`;
  el.innerHTML = html;
}
function renderAllRanking() {
  const all = loadRankingData();
  renderRankingList("ranking-list-opd",        all.filter(i => i.kategori==="opd"), 10);
  renderRankingList("ranking-list-pendidikan",  all.filter(i => i.kategori==="pendidikan"), 10);
  renderRankingList("ranking-list-kesehatan",   all.filter(i => i.kategori==="kesehatan"), 10);
  const ji = document.getElementById("rankingJuriInfo");
  if (ji) {
    const js = new Set(all.flatMap(i => i.juriYgMenilai));
    ji.innerHTML = `<span class="rk-info-badge">📊 ${all.length} inovasi</span><span class="rk-info-badge">👤 ${[...js].join(", ")||"—"}</span>`;
  }
}
const rankModal = document.getElementById("rankingModal");
document.getElementById("viewRankingBtn").addEventListener("click", () => { renderAllRanking(); rankModal.style.display="flex"; });
document.querySelector(".close-ranking").addEventListener("click", () => { rankModal.style.display="none"; });
window.addEventListener("click", e => { if (e.target === rankModal) rankModal.style.display="none"; });
document.getElementById("rankingRefreshBtn").addEventListener("click", renderAllRanking);
document.getElementById("rankingClearBtn").addEventListener("click", () => {
  if (!confirm("Hapus semua data?")) return;
  localStorage.removeItem(KEY_ALL); localStorage.removeItem(KEY_LAST);
  renderAllRanking();
});
document.querySelectorAll(".ranking-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".ranking-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".ranking-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab)?.classList.add("active");
  });
});

// ── Split Button Export ──
(function(){
  const tog=document.getElementById("exportDropdownToggle"), dd=document.getElementById("exportDropdown"), wrap=document.getElementById("exportSplitWrap");
  tog.addEventListener("click", e => { e.stopPropagation(); const open=dd.classList.toggle("open"); tog.setAttribute("aria-expanded",String(open)); });
  document.addEventListener("click", e => { if (!wrap.contains(e.target)) { dd.classList.remove("open"); tog.setAttribute("aria-expanded","false"); } });
  document.getElementById("exportPdfBtn").addEventListener("click", () => { dd.classList.remove("open"); document.getElementById("printBtn").click(); });
  document.getElementById("exportExcelBtn").addEventListener("click", () => {
    dd.classList.remove("open");
    if (!activeJuri) { alert("Pilih juri dulu."); return; }
    const rows = [["Penilaian Indikator — 2027"],["Inovasi",namaInovasi],["Juri",activeJuri],["Tanggal",new Date().toLocaleDateString("id-ID")],[],["No","Nama Indikator","Bobot","Param","Skor","Deskripsi"]];
    let total = 0;
    sidIndicators.forEach(item => {
      if (item.type) { rows.push([item.displayNo,item.nama,"—","—","—",item.keterangan]); return; }
      const v = juriState[activeJuri].radio[item.originalNo]||"";
      const s = v ? Number(v)*item.bobot : 0; total += s;
      rows.push([item.displayNo,item.nama,item.bobot,v||"—",s>0?s.toFixed(2):"—",v?(item.parameter[Number(v)-1]||""):"—"]);
    });
    rows.push([],[],["","","","TOTAL INDIKATOR",total.toFixed(2)]);
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download=`Indikator_${namaInovasi.replace(/\s+/g,"_")}_${activeJuri}.csv`; a.click();
    URL.revokeObjectURL(a.href);
  });
})();

// ── FAB ──
(function(){
  const fab=document.getElementById("fabSave"), icon=document.getElementById("fabIcon");
  if (!fab) return;
  fab.addEventListener("click", () => {
    if (fab.classList.contains("loading")) return;
    saveCurrentState();
    if (!namaInovasi) { alert("Inovasi belum dipilih."); return; }
    saveIndikatorToStorage(namaInovasi, juriState, activeJuri);
    fab.classList.add("loading"); icon.textContent="⏳";
    setTimeout(() => { fab.classList.remove("loading"); fab.classList.add("saved"); icon.textContent="✅"; setTimeout(()=>{fab.classList.remove("saved");icon.textContent="💾";},2000); }, 800);
  });
})();

// ── Init ──
render();
calculate();
