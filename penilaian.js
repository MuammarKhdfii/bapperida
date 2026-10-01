// ══════════════════════════════════════════
//  penilaian.js — 1 Form: Judul + Indikator
//  Route guard: juri_judul | juri_sid
// ══════════════════════════════════════════

// ── Route Guard — harus dipanggil pertama ──
const SESSION = requireAuth(["juri_judul", "juri_sid"]);
if (!SESSION) throw new Error("Unauthorized"); // stop execution if redirect happened

// ── Load innovation data based on role ──
daftarInovasi = getDaftarInovasiByRole(SESSION.role);
console.log(`[penilaian.js] Loaded ${daftarInovasi.length} innovations for role: ${SESSION.role}`);

// ── Tentukan form berdasarkan role ──
const ROLE        = SESSION.role;            // "juri_judul" | "juri_sid"
const SHOW_JUDUL  = ROLE === "juri_judul";
const SHOW_SID    = ROLE === "juri_sid";

// Render navbar session
renderSessionNav("sessionNav");

// Update hero badge sesuai role
const heroBadge = document.getElementById("heroBadgeRole");
if (heroBadge) {
  heroBadge.textContent = ROLE === "juri_judul"
    ? "PENILAIAN JUDUL INOVASI"
    : "PENILAIAN INDIKATOR SID";
}

// Sembunyikan section yang tidak relevan segera (sebelum render)
if (!SHOW_JUDUL) {
  document.querySelectorAll(".section-judul-wrapper").forEach(el => el.style.display = "none");
}
if (!SHOW_SID) {
  document.querySelectorAll(".section-indikator-wrapper").forEach(el => el.style.display = "none");
}

// ── State untuk juri yang sedang login ──
// judulState / juriState hanya untuk user ini
const judulState = { [SESSION.nama]: {} };
const juriState  = { [SESSION.nama]: { radio:{}, monev:{}, monevKet:{}, videoUrl:{}, videoKet:{} } };
const notesState = { [SESSION.nama]: { catatan: "", rekomendasi: "" } };
const signatureState = { [SESSION.nama]: "" };

let namaInovasi = "";

// ── Fungsi Logout Juri (harus didefinisikan di atas untuk onclick di HTML) ──
window.logoutJuri = function() {
  try {
    // Simpan data jika fungsi saveAll tersedia
    if (typeof saveAll === 'function') {
      saveAll(false);
    }
  } catch(e) {
    console.warn('Error saat menyimpan:', e);
  }
  // Panggil logout dari auth.js
  logout();
};

// ── Init ──
initScrollTop("scrollTopBtn");
namaInovasi = localStorage.getItem("iid2026_selected") || "";

// Isi kartu inovasi
if (namaInovasi) {
  const meta = daftarInovasi.find(i => i.judul === namaInovasi) || {};
  document.getElementById("heroJudulInovasi").textContent = namaInovasi;
  document.getElementById("heroPDInovasi").textContent    = meta.perangkatDaerah || "—";
  document.getElementById("icJudul").textContent     = namaInovasi;
  document.getElementById("icPD").textContent        = "🏛️ " + (meta.perangkatDaerah || "—");
  document.getElementById("icBentuk").textContent    = "📂 " + (meta.bentuk || "—");
  document.getElementById("icTahun").textContent     = "📅 " + (meta.waktu || "—");
  document.getElementById("icRingkasan").textContent = meta.ringkasan || "—";
  
  // Populate Google Drive links
  const gdriveCard = document.getElementById("googleDriveCard");
  const gdriveContainer = document.getElementById("gdriveLinksContainer");
  
  if (meta.googleDriveLinks && meta.googleDriveLinks.length > 0) {
    gdriveCard.style.display = "block";
    gdriveContainer.innerHTML = meta.googleDriveLinks.map((link, idx) => `
      <div class="gdrive-link-item">
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="gdrive-link" title="${link.description}">
          <span class="gdrive-link-icon">📄</span>
          <span class="gdrive-link-text">${link.name}</span>
          <span class="gdrive-link-arrow">→</span>
        </a>
        <div class="gdrive-tooltip">${link.description}</div>
      </div>
    `).join("");
  } else {
    gdriveCard.style.display = "none";
  }
  
  // Tampilkan flash card Bukti Dukung hanya untuk Juri SID
  const buktiDukungCard = document.getElementById("buktiDukungCard");
  if (ROLE === "juri_sid" && buktiDukungCard) {
    buktiDukungCard.style.display = "block";
  }
} else {
  document.getElementById("heroJudulInovasi").textContent = "Form Penilaian";
  document.getElementById("heroPDInovasi").textContent    = "Kembali ke beranda untuk memilih inovasi";
}

// Restore state hanya untuk user yang login - wrapped in async IIFE
(async function restoreState() {
  const allDraf = await loadAllDraf();
  if (namaInovasi && allDraf[namaInovasi]) {
    const d = allDraf[namaInovasi];
    if (d.judulState?.[SESSION.nama]) judulState[SESSION.nama] = d.judulState[SESSION.nama];
    if (d.juriState?.[SESSION.nama])  juriState[SESSION.nama]  = d.juriState[SESSION.nama];
    if (d.notesState?.[SESSION.nama]) notesState[SESSION.nama] = d.notesState[SESSION.nama];
    if (d.signatureState?.[SESSION.nama]) signatureState[SESSION.nama] = d.signatureState[SESSION.nama];
  }

  // Sembunyikan session login grid, tampilkan form langsung
  const loginSection = document.getElementById("sessionLogin");
  if (loginSection) loginSection.style.display = "none";
  const sessionActive = document.getElementById("sessionActive");
  if (sessionActive) sessionActive.style.display = "block";

  // Update session bar dengan data dari auth session
  const barNama = document.getElementById("sessionNamaJuri");
  const barRole = document.getElementById("sessionRoleJuri");
  if (barNama) barNama.textContent = SESSION.nama;
  if (barRole) barRole.textContent = SESSION.label;

  render();
  calculate();
  loadNotesState();
  initSignatureCanvas();
})().catch(err => console.error('[restoreState] Error:', err));

// ── Load Notes State ──
function loadNotesState() {
  const notesCatatan = document.getElementById("notesCatatan");
  const notesRekomendasi = document.getElementById("notesRekomendasi");
  
  if (notesCatatan) {
    notesCatatan.value = notesState[SESSION.nama]?.catatan || "";
    notesCatatan.addEventListener("input", saveNotesState);
  }
  
  if (notesRekomendasi) {
    notesRekomendasi.value = notesState[SESSION.nama]?.rekomendasi || "";
    notesRekomendasi.addEventListener("input", saveNotesState);
  }
}

function saveNotesState() {
  const notesCatatan = document.getElementById("notesCatatan");
  const notesRekomendasi = document.getElementById("notesRekomendasi");
  
  notesState[SESSION.nama] = {
    catatan: notesCatatan?.value || "",
    rekomendasi: notesRekomendasi?.value || ""
  };
}

// ── Render kartu pilih juri ──
function renderSessionGrid() {
  const grid = document.getElementById("sessionJuriGrid");
  grid.innerHTML = SEMUA_JURI.map((j, idx) => {
    const st     = getStatusJuri(j);
    const dotCls = st.pct === 100 ? "dot-complete" : st.pct > 0 ? "dot-partial" : "dot-idle";
    return `
      <div class="session-juri-card" onclick="loginJuri(${idx})" style="animation-delay:${idx*0.06}s">
        <div class="sjc-avatar">${j.nama[0]}</div>
        <div class="sjc-info">
          <div class="sjc-nama">${j.nama}</div>
          <div class="sjc-role">${j.role}</div>
          <div class="sjc-tags">
            ${j.tipe.includes("judul")     ? '<span class="sjc-tag tag-judul">🏆 Judul</span>'     : ""}
            ${j.tipe.includes("indikator") ? '<span class="sjc-tag tag-ind">📊 Indikator</span>'  : ""}
          </div>
        </div>
        <div class="sjc-status">
          <span class="lc-status-dot ${dotCls}"></span>
          <span class="sjc-pct">${st.pct}%</span>
        </div>
      </div>`;
  }).join("");
}

function getStatusJuri(jObj) {
  const j     = jObj.nama;
  let terisi  = 0, total = 0;
  if (jObj.tipe.includes("judul")) {
    kriteriaJudul.forEach(k => { total++; if (judulState[j]?.[k.no]) terisi++; });
  }
  if (jObj.tipe.includes("indikator")) {
    sidIndicators.filter(i => !i.type && i.parameter?.length > 0).forEach(i => {
      total++; if (juriState[j]?.radio?.[i.originalNo]) terisi++;
    });
  }
  return { terisi, total, pct: total > 0 ? Math.round((terisi/total)*100) : 0 };
}

// ── Login juri ──
function loginJuri(idx) {
  activeJuri = SEMUA_JURI[idx];
  document.getElementById("sessionLogin").style.display  = "none";
  document.getElementById("sessionActive").style.display = "block";
  document.getElementById("sessionNamaJuri").textContent = SESSION.nama;
  document.getElementById("sessionRoleJuri").textContent = activeJuri.role;

  // Tampil/sembunyikan section sesuai tipe
  const showJudul = SHOW_JUDUL;
  const showInd   = SHOW_SID;
  document.querySelectorAll(".section-judul-wrapper").forEach(el => el.style.display = showJudul ? "" : "none");
  document.querySelectorAll(".section-indikator-wrapper").forEach(el => el.style.display = showInd ? "" : "none");

  render();
  calculate();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Render Kriteria Judul ──
function renderJudul() {
  const c = document.getElementById("judulContainer");
  c.innerHTML = "";
  kriteriaJudul.forEach((item, idx) => {
    const card = document.createElement("article");
    card.className = "indicator";
    card.style.animationDelay = (idx * 0.04) + "s";
    card.dataset.noJudul = item.no;
    card.innerHTML = `
      <div class="indicator-head">
        <div class="indicator-title"><span class="indicator-number">${item.no}.</span>${esc(item.nama)}</div>
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
      <div class="result">Skor: <b id="rk${item.no}">0.00</b></div>`;
    c.appendChild(card);
    card.querySelectorAll("input[type=radio]").forEach(el =>
      el.addEventListener("change", () => { saveJudulStateLocal(); calculate(); }));
  });
  loadJudulStateLocal();
}

function saveJudulStateLocal() {
  kriteriaJudul.forEach(k => {
    const sel = document.querySelector(`input[name="k-${k.no}"]:checked`);
    judulState[SESSION.nama][k.no] = sel ? sel.value : "";
  });
}
function loadJudulStateLocal() {
  kriteriaJudul.forEach(k => {
    const val = judulState[SESSION.nama]?.[k.no] || "";
    document.querySelectorAll(`input[name="k-${k.no}"]`).forEach(x => x.checked = false);
    if (val) { const el = document.querySelector(`input[name="k-${k.no}"][value="${val}"]`); if (el) el.checked = true; }
  });
}

// ── Render Indikator SID ──
function renderIndikator() {
  const c = document.getElementById("indicatorContainer");
  c.innerHTML = "";
  sidIndicators.forEach((item, idx) => {
    if (item.type === "monev") {
      const card = document.createElement("article");
      card.className = "indicator indicator-special-input"; card.dataset.no = item.originalNo;
      card.innerHTML = `
        <div class="indicator-head"><div class="indicator-title"><span class="indicator-number">${item.displayNo}.</span>${esc(item.nama)}</div><span class="badge-type badge-monev">📋 Monev</span></div>
        <div class="special-input-block">
          <div class="special-input-field"><label for="monev-${item.originalNo}">Jumlah Dokumen Monev</label><input id="monev-${item.originalNo}" type="number" min="0" step="1" value="0"><span class="input-hint">Jumlah dokumen Monev tersedia</span></div>
          <div class="special-input-field"><label for="monevket-${item.originalNo}">Keterangan</label><textarea id="monevket-${item.originalNo}" rows="2" placeholder="Keterangan (opsional)…"></textarea></div>
        </div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
      c.appendChild(card);
      card.querySelector(`#monev-${item.originalNo}`).addEventListener("input", saveIndikatorStateLocal);
      card.querySelector(`#monevket-${item.originalNo}`).addEventListener("input", saveIndikatorStateLocal);
      return;
    }
    if (item.type === "video") {
      const card = document.createElement("article");
      card.className = "indicator indicator-special-input"; card.dataset.no = item.originalNo;
      card.innerHTML = `
        <div class="indicator-head"><div class="indicator-title"><span class="indicator-number">${item.displayNo}.</span>${esc(item.nama)}</div><span class="badge-type badge-video">🎥 Video</span></div>
        <div class="special-input-block">
          <div class="special-input-field"><label for="video-url-${item.originalNo}">Link / URL Video</label><input id="video-url-${item.originalNo}" type="url" placeholder="https://…"><span class="input-hint">YouTube, Google Drive, dll.</span></div>
          <div class="special-input-field"><label for="video-ket-${item.originalNo}">Judul Video</label><input id="video-ket-${item.originalNo}" type="text" placeholder="Judul video…"></div>
          <div id="video-preview-${item.originalNo}" class="video-preview" style="display:none"><a id="video-link-${item.originalNo}" href="#" target="_blank" rel="noopener" class="video-link-preview">🔗 Buka video</a></div>
        </div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
      c.appendChild(card);
      const urlInput = card.querySelector(`#video-url-${item.originalNo}`);
      urlInput.addEventListener("input", () => {
        const val = urlInput.value.trim();
        const l = card.querySelector(`#video-link-${item.originalNo}`);
        const p = card.querySelector(`#video-preview-${item.originalNo}`);
        if (l) l.href = val; if (p) p.style.display = val.startsWith("http") ? "block" : "none";
        saveIndikatorStateLocal();
      });
      card.querySelector(`#video-ket-${item.originalNo}`).addEventListener("input", saveIndikatorStateLocal);
      return;
    }
    const card = document.createElement("article");
    card.className = "indicator"; card.style.animationDelay = (idx * 0.03) + "s";
    card.innerHTML = `
      <div class="indicator-head"><div class="indicator-title"><span class="indicator-number">${item.displayNo}.</span>${esc(item.nama)}</div><div class="meta">Bobot: ${item.bobot}</div></div>
      <div class="options">
        ${item.parameter.map((p, i) => `
          <div class="option">
            <input type="radio" id="i${item.originalNo}p${i+1}" name="ind-${item.originalNo}" value="${i+1}">
            <label for="i${item.originalNo}p${i+1}"><div class="option-title">Parameter ${i+1} — Nilai ${i+1}</div><div class="option-text">${esc(p)}</div></label>
          </div>`).join("")}
      </div>
      <div class="result">Skor: <b id="res-${item.originalNo}">0.00</b></div>
      <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>`;
    c.appendChild(card);
    card.querySelectorAll("input[type=radio]").forEach(el =>
      el.addEventListener("change", () => { saveIndikatorStateLocal(); calculate(); }));
  });
  loadIndikatorStateLocal();
}

function saveIndikatorStateLocal() {
  const s = juriState[SESSION.nama];
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
function loadIndikatorStateLocal() {
  const s = juriState[SESSION.nama];
  sidIndicators.forEach(item => {
    if (item.type === "monev") {
      const n = document.getElementById(`monev-${item.originalNo}`); if (n) n.value = s.monev[item.originalNo] ?? "0";
      const k = document.getElementById(`monevket-${item.originalNo}`); if (k) k.value = s.monevKet[item.originalNo] ?? "";
    } else if (item.type === "video") {
      const u = document.getElementById(`video-url-${item.originalNo}`); if (u) u.value = s.videoUrl[item.originalNo] ?? "";
      const k = document.getElementById(`video-ket-${item.originalNo}`); if (k) k.value = s.videoKet[item.originalNo] ?? "";
      const url = s.videoUrl[item.originalNo] ?? "";
      const p = document.getElementById(`video-preview-${item.originalNo}`); if (p) p.style.display = url.startsWith("http") ? "block" : "none";
      const l = document.getElementById(`video-link-${item.originalNo}`); if (l) l.href = url;
    } else {
      const val = s.radio[item.originalNo] ?? "";
      document.querySelectorAll(`input[name="ind-${item.originalNo}"]`).forEach(x => x.checked = false);
      if (val) { const el = document.querySelector(`input[name="ind-${item.originalNo}"][value="${val}"]`); if (el) el.checked = true; }
    }
  });
}

function render() {
  if (SHOW_JUDUL)  renderJudul();
  if (SHOW_SID)    renderIndikator();
}

// ── Calculate ──
function calculate() {
  const showJudul = SHOW_JUDUL;
  const showInd   = SHOW_SID;

  // Skor judul
  let skorJudul = 0;
  const maxJudul = kriteriaJudul.reduce((s, k) => s + 3 * k.bobot, 0);
  if (showJudul) {
    kriteriaJudul.forEach(k => {
      const sel   = document.querySelector(`input[name="k-${k.no}"]:checked`);
      const score = sel ? Number(sel.value) * k.bobot : 0;
      skorJudul += score;
      const el = document.getElementById(`rk${k.no}`);
      if (el) { el.textContent = score.toFixed(2); el.classList.remove("updated"); void el.offsetWidth; el.classList.add("updated"); }
    });
  }

  // Skor indikator
  let skorInd = 0;
  const maxInd = sidIndicators.filter(i => !i.type && i.parameter?.length > 0).reduce((s, i) => s + 3 * i.bobot, 0);
  if (showInd) {
    sidIndicators.forEach(item => {
      if (item.type) return;
      const sel   = document.querySelector(`input[name="ind-${item.originalNo}"]:checked`);
      const score = sel ? Number(sel.value) * item.bobot : 0;
      skorInd += score;
      const el = document.getElementById(`res-${item.originalNo}`);
      if (el) { el.textContent = score.toFixed(2); el.classList.remove("updated"); void el.offsetWidth; el.classList.add("updated"); }
    });
  }

  const total    = parseFloat((skorJudul + skorInd).toFixed(2));
  const maxTotal = (showJudul ? maxJudul : 0) + (showInd ? maxInd : 0);

  // Kelengkapan
  let terisi = 0, totalItem = 0;
  if (showJudul)  { kriteriaJudul.forEach(k => { totalItem++; if (document.querySelector(`input[name="k-${k.no}"]:checked`)) terisi++; }); }
  if (showInd)    { sidIndicators.filter(i => !i.type && i.parameter?.length > 0).forEach(i => { totalItem++; if (document.querySelector(`input[name="ind-${i.originalNo}"]:checked`)) terisi++; }); }
  const pct = totalItem > 0 ? Math.min(100, Math.round((terisi / totalItem) * 100)) : 0;

  // Update UI
  animateCounter(document.getElementById("scoreJudul"),          skorJudul.toFixed(2));
  animateCounter(document.getElementById("scoreSID"),            skorInd.toFixed(2));
  animateCounter(document.getElementById("scoreGabungan"),       total.toFixed(2));
  animateCounter(document.getElementById("scoreLengkap"),        pct + "%");
  animateCounter(document.getElementById("scoreJudulHeader"),    skorJudul.toFixed(2));
  animateCounter(document.getElementById("scoreSIDHeader"),      skorInd.toFixed(2));

  const gabMax = document.getElementById("scoreGabunganMax");
  if (gabMax) gabMax.textContent = `/ ${maxTotal.toFixed(0)}`;
  const sidMax = document.getElementById("scoreSIDMax");
  if (sidMax) sidMax.textContent = `/ ${maxInd.toFixed(0)}`;

  const detEl = document.getElementById("scoreLengkapDetail");
  if (detEl) detEl.textContent = `${terisi} / ${totalItem} item`;

  const pb  = document.getElementById("progressBar");
  const pb2 = document.getElementById("progressBar2");
  [pb, pb2].forEach(b => {
    if (!b) return;
    b.style.width = pct + "%";
    b.style.background = pct === 100
      ? "linear-gradient(90deg,#10b981,#16a34a)"
      : "linear-gradient(90deg,#155eef,#7c3aed,#06b6d4)";
  });

  const pctEl = document.getElementById("progressLabel");
  if (pctEl) pctEl.textContent = pct + "%";
  const pctEl2 = document.getElementById("summaryPct");
  if (pctEl2) pctEl2.textContent = pct + "%";

  // Summary
  const si = document.getElementById("summaryInfo");
  if (si) {
    si.style.display = (namaInovasi) ? "grid" : "none";
    const e1 = document.getElementById("sumInovasi"); if (e1) e1.textContent = namaInovasi || "—";
    const e2 = document.getElementById("sumJuri");    if (e2) e2.textContent = SESSION.nama || "—";
  }
  const sj = document.getElementById("sumJudul");   if (sj) sj.textContent = `${skorJudul.toFixed(2)} / ${maxJudul.toFixed(0)}`;
  const si2 = document.getElementById("sumIndikator"); if (si2) si2.textContent = `${skorInd.toFixed(2)} / ${maxInd.toFixed(0)}`;
  const st  = document.getElementById("sumTotal");   if (st)  st.textContent  = `${total.toFixed(2)} / ${maxTotal.toFixed(0)}`;
}

// ── Simpan ──
async function saveAll(showAnim = false) {
  console.log('=== saveAll START ===');
  
  saveJudulStateLocal();
  saveIndikatorStateLocal();
  saveNotesState();

  // Hitung skor untuk juri yang sedang login
  let skorJudul = 0;
  if (SHOW_JUDUL) {
    kriteriaJudul.forEach(k => {
      const v = judulState[SESSION.nama]?.[k.no] || "";
      if (v) skorJudul += Number(v) * k.bobot;
    });
  }

  let skorInd = 0;
  if (SHOW_SID) {
    sidIndicators.filter(i => !i.type).forEach(i => {
      const v = juriState[SESSION.nama]?.radio?.[i.originalNo] || "";
      if (v) skorInd += Number(v) * i.bobot;
    });
  }

  console.log('Skor Judul:', skorJudul);
  console.log('Skor Indikator:', skorInd);

  const all = await loadAllDraf();
  
  // Dapatkan metadata inovasi
  const metaInovasi = daftarInovasi.find(i => i.judul === namaInovasi) || {};
  
  // Tentukan kategori inovasi
  const kategori = getKategoriInovasi(metaInovasi.perangkatDaerah);
  
  // Update atau create entry dengan struktur lengkap
  if (!all[namaInovasi]) {
    all[namaInovasi] = {
      namaInovasi,
      perangkatDaerah: metaInovasi.perangkatDaerah || "",
      bentukInovasi: metaInovasi.bentuk || "",
      tahun: metaInovasi.waktu || "",
      ringkasan: metaInovasi.ringkasan || "",
      kategori: kategori,
      judulState: {},
      juriState: {},
      notesState: {},
      signatureState: {},
      skorJudulPerJuri: {},
      skorPerJuri: {},
      userMetadata: {},
      createdAt: new Date().toISOString()
    };
  }

  // Update state untuk juri ini
  all[namaInovasi].judulState[SESSION.nama] = JSON.parse(JSON.stringify(judulState[SESSION.nama]));
  all[namaInovasi].juriState[SESSION.nama] = JSON.parse(JSON.stringify(juriState[SESSION.nama]));
  all[namaInovasi].notesState[SESSION.nama] = JSON.parse(JSON.stringify(notesState[SESSION.nama]));
  all[namaInovasi].signatureState = all[namaInovasi].signatureState || {};
  all[namaInovasi].signatureState[SESSION.nama] = signatureState[SESSION.nama] || "";
  all[namaInovasi].skorJudulPerJuri[SESSION.nama] = parseFloat(skorJudul.toFixed(2));
  all[namaInovasi].skorPerJuri[SESSION.nama] = parseFloat(skorInd.toFixed(2));
  all[namaInovasi].savedAt = new Date().toISOString();
  all[namaInovasi].activeJuri = SESSION.nama;
  
  // Update metadata inovasi (jika belum ada)
  all[namaInovasi].perangkatDaerah = metaInovasi.perangkatDaerah || all[namaInovasi].perangkatDaerah || "";
  all[namaInovasi].bentukInovasi = metaInovasi.bentuk || all[namaInovasi].bentukInovasi || "";
  all[namaInovasi].tahun = metaInovasi.waktu || all[namaInovasi].tahun || "";
  all[namaInovasi].ringkasan = metaInovasi.ringkasan || all[namaInovasi].ringkasan || "";
  all[namaInovasi].kategori = kategori;
  
  // Simpan metadata user untuk audit trail
  if (!all[namaInovasi].userMetadata[SESSION.nama]) {
    all[namaInovasi].userMetadata[SESSION.nama] = {};
  }
  all[namaInovasi].userMetadata[SESSION.nama] = {
    nama: SESSION.nama,
    email: SESSION.email || "",
    role: SESSION.role,
    label: SESSION.label,
    lastUpdated: new Date().toISOString(),
    skorJudul: parseFloat(skorJudul.toFixed(2)),
    skorIndikator: parseFloat(skorInd.toFixed(2)),
    totalSkor: parseFloat((skorJudul + skorInd).toFixed(2)),
    hasCatatan: !!(notesState[SESSION.nama]?.catatan),
    hasRekomendasi: !!(notesState[SESSION.nama]?.rekomendasi),
    hasSignature: !!(signatureState[SESSION.nama])
  };

  console.log('Saving data:', all[namaInovasi]);
  
  await saveAllDraf(all);
  setLastInovasi(namaInovasi);

  console.log('=== saveAll COMPLETE ===');

  if (!showAnim) return;

  // Animasi tombol FAB
  const fabIcon = document.getElementById("fabIcon");
  const fab     = document.getElementById("fabSave");
  if (fab && fabIcon) {
    fab.classList.add("saved"); 
    fabIcon.textContent = "✅";
    setTimeout(() => { 
      fab.classList.remove("saved"); 
      fabIcon.textContent = "💾"; 
    }, 2000);
  }
}

async function doSaveWithValidation() {
  console.log('=== doSaveWithValidation START ===');
  console.log('namaInovasi:', namaInovasi);
  console.log('SESSION:', SESSION);
  
  if (!namaInovasi) { 
    alert("Inovasi belum dipilih."); 
    return; 
  }

  saveJudulStateLocal();
  saveIndikatorStateLocal();

  // Validasi: semua wajib diisi
  const belumJudul = SHOW_JUDUL
    ? kriteriaJudul.filter(k => !document.querySelector(`input[name="k-${k.no}"]:checked`))
    : [];
  const belumInd = SHOW_SID
    ? sidIndicators.filter(i => !i.type && i.parameter?.length > 0 && !document.querySelector(`input[name="ind-${i.originalNo}"]:checked`))
    : [];

  console.log('Belum judul:', belumJudul.length);
  console.log('Belum ind:', belumInd.length);

  if (belumJudul.length > 0 || belumInd.length > 0) {
    let msg = "❌ Penilaian belum lengkap!\n\nBelum diisi:\n";
    if (belumJudul.length) msg += belumJudul.map(k => `• Judul – ${k.nama}`).join("\n") + "\n";
    if (belumInd.length)   msg += belumInd.map(i => `• Indikator ${i.displayNo} – ${i.nama}`).join("\n");
    alert(msg);
    // Highlight
    document.querySelectorAll(".indicator-required-warn").forEach(el => el.classList.remove("indicator-required-warn"));
    belumJudul.forEach(k => { const el = document.querySelector(`article[data-no-judul="${k.no}"]`); if (el) el.classList.add("indicator-required-warn"); });
    belumInd.forEach(i   => { const el = document.querySelector(`article[data-no="${i.originalNo}"]`); if (el) el.classList.add("indicator-required-warn"); });
    return;
  }

  console.log('=== Validation passed, saving... ===');
  document.querySelectorAll(".indicator-required-warn").forEach(el => el.classList.remove("indicator-required-warn"));
  
  // Save
  await saveAll(true);  // ← Make it await
  
  console.log('=== Save complete ===');
  
  // Show success message
  alert('✅ Penilaian berhasil disimpan!\n\nKlik OK untuk kembali ke halaman utama.');
  
  // Redirect ke index.html dengan kategori yang sesuai
  const meta = daftarInovasi.find(i => i.judul === namaInovasi) || {};
  const kategori = getKategoriInovasi(meta.perangkatDaerah);
  
  console.log('Redirecting to:', `index.html#tab-${kategori}`);
  
  window.location.href = `index.html#tab-${kategori}`;
}

// Expose ke global scope
window.doSaveWithValidation = doSaveWithValidation;

// Fungsi untuk menentukan kategori inovasi
function getKategoriInovasi(pd) {
  if (!pd) return "opd";
  const p = pd.toLowerCase();
  
  console.log('Checking kategori for:', pd);
  
  // Kesehatan
  if (p.includes("puskesmas") || p.includes("rsud") || p.includes("kesehatan")) {
    console.log('-> kesehatan');
    return "kesehatan";
  }
  
  // Pendidikan
  if (p.includes("dinas pendidikan") || p.includes("pendidikan dan kebudayaan") ||
      p.includes("sd negeri") || p.includes("smp negeri") || p.includes("sma negeri") ||
      p.includes("sd aisyah") || p.includes("sd muhammadiyah") || p.includes("sdit") ||
      p.includes("uptd pendidikan") || p.includes("sekolah")) {
    console.log('-> pendidikan');
    return "pendidikan";
  }
  
  // Default: OPD
  console.log('-> opd (default)');
  return "opd";
}

// ── Event listeners ──
// Reset button
const resetBtnEl = document.getElementById("resetBtn");
if (resetBtnEl) {
  resetBtnEl.addEventListener("click", () => {
    if (!confirm(`Reset semua penilaian untuk ${SESSION.nama}?`)) return;
    judulState[SESSION.nama] = {};
    juriState[SESSION.nama]  = { radio:{}, monev:{}, monevKet:{}, videoUrl:{}, videoKet:{} };
    render(); calculate();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const expandAllBtnEl = document.getElementById("expandAllBtn");
if (expandAllBtnEl) {
  expandAllBtnEl.addEventListener("click", function() {
    const collapsed = this.dataset.state === "collapsed";
    document.querySelectorAll(".indicator:not(.indicator-special-input) .options, .indicator .ket, .indicator .result, .kriteria-desc").forEach(el => {
      el.style.display = collapsed ? "" : "none";
    });
    this.textContent  = collapsed ? "🔽 Buka Semua" : "🔼 Tutup Semua";
    this.dataset.state = collapsed ? "" : "collapsed";
  });
}

window.addEventListener("beforeunload", () => saveAll(false));

// ── Print ──
const printBtnEl = document.getElementById("printBtn");
if (printBtnEl) {
  printBtnEl.addEventListener("click", async () => {
    console.log('=== PRINT BUTTON CLICKED ===');
    
    // Save current state first
    saveJudulStateLocal(); 
    saveIndikatorStateLocal();
    saveNotesState();
    
    // Load saved data from localStorage to ensure we have the latest
    const allDraf = await loadAllDraf();
    const savedData = allDraf[namaInovasi];
    
    console.log('Current innovation:', namaInovasi);
    console.log('Saved data exists:', !!savedData);
    console.log('judulState for current user:', judulState[SESSION.nama]);
    
    // If saved data exists, use it (for edit mode)
    if (savedData && savedData.judulState && savedData.judulState[SESSION.nama]) {
      console.log('Loading saved judulState from localStorage');
      Object.assign(judulState[SESSION.nama], savedData.judulState[SESSION.nama]);
    }
    
    document.getElementById("pNamaInovasi").textContent = namaInovasi || "—";
    document.getElementById("pNamaJuri").textContent    = SESSION.nama;
    document.getElementById("pSignJuri").textContent    = `( ${SESSION.nama} )`;
    document.getElementById("pTanggal").textContent     = new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});

    // Tentukan apakah juri judul atau juri SID
    const isJuriSID = ROLE === "juri_sid";
    
    console.log('Juri type:', isJuriSID ? 'SID' : 'JUDUL');

    // Update heading dan label sesuai tipe juri
    const sectionHeading = document.getElementById("pSectionHeading");
    const tableHeaderNama = document.getElementById("pTableHeaderNama");
    const totalLabel = document.getElementById("pTotalLabel");
    const totalMax = document.getElementById("pTotalMax");
    
    if (isJuriSID) {
      if (sectionHeading) sectionHeading.textContent = "PENILAIAN INDIKATOR SID";
      if (tableHeaderNama) tableHeaderNama.textContent = "Indikator";
      if (totalLabel) totalLabel.textContent = "TOTAL SKOR INDIKATOR SID";
    } else {
      if (sectionHeading) sectionHeading.textContent = "PENILAIAN JUDUL INOVASI";
      if (tableHeaderNama) tableHeaderNama.textContent = "Kriteria";
      if (totalLabel) totalLabel.textContent = "TOTAL SKOR JUDUL";
    }

    // Tabel print
    let totalSkor = 0;
    const tbJ = document.getElementById("pTableJudul"); 
    tbJ.innerHTML = "";
    
    if (isJuriSID) {
      // JURI SID: Tampilkan 20 indikator
      console.log('Building print table for SID indicators');
      
      // Load saved data
      if (savedData && savedData.juriState && savedData.juriState[SESSION.nama]) {
        console.log('Loading saved juriState from localStorage');
        Object.assign(juriState[SESSION.nama], savedData.juriState[SESSION.nama]);
      }
      
      // Filter hanya indikator yang punya parameter (bukan monev/video)
      const regularIndicators = sidIndicators.filter(i => !i.type && i.parameter && i.parameter.length > 0);
      console.log('Regular indicators count:', regularIndicators.length);
      
      // Hitung max score
      const maxSID = regularIndicators.reduce((sum, i) => sum + (3 * i.bobot), 0);
      if (totalMax) totalMax.textContent = `Maks: ${maxSID.toFixed(0)}`;
      
      regularIndicators.forEach(ind => {
        const v = juriState[SESSION.nama]?.radio?.[ind.originalNo] || "";
        const s = v ? Number(v) * ind.bobot : 0;
        totalSkor += s;
        
        console.log(`Indikator ${ind.displayNo}: value=${v}, score=${s.toFixed(2)}`);
        
        const tr = document.createElement("tr");
        tr.className = s > 0 ? "pt-filled" : "pt-empty";
        tr.innerHTML = `
          <td class="pt-no">${ind.displayNo}</td>
          <td class="pt-nama">${esc(ind.nama)}</td>
          <td class="pt-bobot">${ind.bobot}</td>
          <td class="pt-param">${v||"—"}</td>
          <td class="pt-nilai">${s>0?s.toFixed(2):"—"}</td>
          <td class="pt-ket">${v?esc(ind.parameter[Number(v)-1]):"—"}</td>`;
        tbJ.appendChild(tr);
      });
      
    } else {
      // JURI JUDUL: Tampilkan 6 kriteria
      console.log('Building print table with', kriteriaJudul.length, 'criteria');
      
      // Load saved data
      if (savedData && savedData.judulState && savedData.judulState[SESSION.nama]) {
        console.log('Loading saved judulState from localStorage');
        Object.assign(judulState[SESSION.nama], savedData.judulState[SESSION.nama]);
      }
      
      if (totalMax) totalMax.textContent = "Maks: 63";
      
      kriteriaJudul.forEach(k => {
        const v = judulState[SESSION.nama]?.[k.no] || "";
        const s = v ? Number(v) * k.bobot : 0; 
        totalSkor += s;
        
        console.log(`Kriteria ${k.no}: value=${v}, score=${s.toFixed(2)}`);
        
        const tr = document.createElement("tr"); 
        tr.className = s > 0 ? "pt-filled" : "pt-empty";
        tr.innerHTML = `
          <td class="pt-no">${k.no}</td>
          <td class="pt-nama">${esc(k.nama)}</td>
          <td class="pt-bobot">${k.bobot}</td>
          <td class="pt-param">${v||"—"}</td>
          <td class="pt-nilai">${s>0?s.toFixed(2):"—"}</td>
          <td class="pt-ket">${v?esc(k.parameter[Number(v)-1]):"—"}</td>`;
        tbJ.appendChild(tr);
      });
    }
    
    console.log('Total score:', totalSkor.toFixed(2));
    
    document.getElementById("pTotalJudul").textContent = totalSkor.toFixed(2);
    
    // Update total skor di meta
    const pTotalSkor = document.getElementById("pTotalSkor");
    if (pTotalSkor) {
      if (isJuriSID) {
        const maxSID = sidIndicators.filter(i => !i.type && i.parameter && i.parameter.length > 0).reduce((sum, i) => sum + (3 * i.bobot), 0);
        pTotalSkor.textContent = `${totalSkor.toFixed(2)} / ${maxSID.toFixed(0)}`;
      } else {
        pTotalSkor.textContent = `${totalSkor.toFixed(2)} / 63`;
      }
    }

    // Catatan dan Rekomendasi
    const catatan = notesState[SESSION.nama]?.catatan || "Tidak ada catatan";
    const rekomendasi = notesState[SESSION.nama]?.rekomendasi || "Tidak ada rekomendasi";
    document.getElementById("pCatatan").textContent = catatan;
    document.getElementById("pRekomendasi").textContent = rekomendasi;

    // Tambahkan tanda tangan digital ke print area
    console.log('=== PRINT: Checking signature ===');
    console.log('Current user:', SESSION.nama);
    console.log('Signature state:', signatureState[SESSION.nama] ? 'EXISTS' : 'NOT FOUND');
    console.log('Signature length:', signatureState[SESSION.nama]?.length || 0);
    
    const signatureImageContainer = document.getElementById("pSignatureImage");
    if (signatureImageContainer && signatureState[SESSION.nama]) {
      console.log('Injecting signature to print area');
      signatureImageContainer.innerHTML = `<img src="${signatureState[SESSION.nama]}" alt="Tanda tangan ${SESSION.nama}" class="print-signature-img">`;
    } else if (signatureImageContainer) {
      console.log('No signature found, clearing container');
      signatureImageContainer.innerHTML = "";
    } else {
      console.error('pSignatureImage container not found!');
    }

    // Print
    window.print();
  });
}

// ── Init ──
renderSessionGrid();

// ══════════════════════════════════════════
//  SIGNATURE CANVAS
// ══════════════════════════════════════════

function initSignatureCanvas() {
  const canvas = document.getElementById('signatureCanvas');
  const clearBtn = document.getElementById('clearSignatureBtn');
  const placeholder = document.getElementById('signaturePlaceholder');
  const canvasWrapper = document.querySelector('.signature-canvas-wrapper');
  const statusEl = document.getElementById('signatureStatus');
  
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  
  // Set canvas size to match display size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Restore signature if exists
    if (signatureState[SESSION.nama]) {
      const img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        updateSignatureStatus(true);
      };
      img.src = signatureState[SESSION.nama];
    }
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Drawing configuration
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Get coordinates relative to canvas
  function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }
  
  // Start drawing
  function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    const coords = getCoordinates(e);
    lastX = coords.x;
    lastY = coords.y;
    
    // Hide placeholder on first draw
    if (placeholder) {
      placeholder.classList.add('hidden');
    }
  }
  
  // Draw
  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const coords = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    lastX = coords.x;
    lastY = coords.y;
  }
  
  // Stop drawing
  function stopDrawing(e) {
    if (!isDrawing) return;
    e.preventDefault();
    isDrawing = false;
    
    // Save signature as base64
    saveSignature();
  }
  
  // Save signature
  function saveSignature() {
    const dataURL = canvas.toDataURL('image/png');
    signatureState[SESSION.nama] = dataURL;
    updateSignatureStatus(true);
    
    // Auto-save to localStorage
    saveAll(false);
  }
  
  // Clear signature
  function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    signatureState[SESSION.nama] = "";
    updateSignatureStatus(false);
    
    if (placeholder) {
      placeholder.classList.remove('hidden');
    }
    
    // Auto-save to localStorage
    saveAll(false);
  }
  
  // Update status indicator
  function updateSignatureStatus(hasSig) {
    if (!statusEl || !canvasWrapper) return;
    
    if (hasSig) {
      statusEl.textContent = "Tanda tangan tersimpan";
      statusEl.className = "signature-status signature-status-signed";
      canvasWrapper.classList.add('has-signature');
    } else {
      statusEl.textContent = "Belum ada tanda tangan";
      statusEl.className = "signature-status signature-status-empty";
      canvasWrapper.classList.remove('has-signature');
    }
  }
  
  // Mouse events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  // Touch events for mobile/tablet
  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);
  canvas.addEventListener('touchcancel', stopDrawing);
  
  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Hapus tanda tangan? Aksi ini tidak dapat dibatalkan.')) {
        clearSignature();
      }
    });
  }
  
  // Initial status check
  if (signatureState[SESSION.nama]) {
    updateSignatureStatus(true);
    if (placeholder) {
      placeholder.classList.add('hidden');
    }
  }
}
