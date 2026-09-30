// ══════════════════════════════════════════
//  penilaian.js — 1 Form: Judul + Indikator
//  Route guard: juri_judul | juri_sid
// ══════════════════════════════════════════

// ── Route Guard — harus dipanggil pertama ──
const SESSION = requireAuth(["juri_judul", "juri_sid"]);
if (!SESSION) throw new Error("Unauthorized"); // stop execution if redirect happened

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
    ? "🏆 PENILAIAN JUDUL INOVASI"
    : "📊 PENILAIAN INDIKATOR SID";
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
} else {
  document.getElementById("heroJudulInovasi").textContent = "Form Penilaian";
  document.getElementById("heroPDInovasi").textContent    = "Kembali ke beranda untuk memilih inovasi";
}

// Restore state hanya untuk user yang login
const allDraf = loadAllDraf();
if (namaInovasi && allDraf[namaInovasi]) {
  const d = allDraf[namaInovasi];
  if (d.judulState?.[SESSION.nama]) judulState[SESSION.nama] = d.judulState[SESSION.nama];
  if (d.juriState?.[SESSION.nama])  juriState[SESSION.nama]  = d.juriState[SESSION.nama];
  if (d.notesState?.[SESSION.nama]) notesState[SESSION.nama] = d.notesState[SESSION.nama];
  
  // Check if this is edit mode
  const isEditMode = (d.skorPerJuri && d.skorPerJuri[SESSION.nama] > 0) || 
                     (d.skorJudulPerJuri && d.skorJudulPerJuri[SESSION.nama] > 0);
  
  if (isEditMode) {
    // Show edit mode badge
    const heroBadge = document.getElementById("heroBadgeRole");
    if (heroBadge) {
      heroBadge.innerHTML = `✏️ MODE EDIT PENILAIAN`;
      heroBadge.style.background = "linear-gradient(135deg, #0ea5e9, #0284c7)";
    }
  }
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
function saveAll(showAnim = false) {
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

  const all = loadAllDraf();
  
  // Update atau create entry
  if (!all[namaInovasi]) {
    all[namaInovasi] = {
      namaInovasi,
      judulState: {},
      juriState: {},
      notesState: {},
      skorJudulPerJuri: {},
      skorPerJuri: {}
    };
  }

  // Update state untuk juri ini
  all[namaInovasi].judulState[SESSION.nama] = JSON.parse(JSON.stringify(judulState[SESSION.nama]));
  all[namaInovasi].juriState[SESSION.nama] = JSON.parse(JSON.stringify(juriState[SESSION.nama]));
  all[namaInovasi].notesState[SESSION.nama] = JSON.parse(JSON.stringify(notesState[SESSION.nama]));
  all[namaInovasi].skorJudulPerJuri[SESSION.nama] = parseFloat(skorJudul.toFixed(2));
  all[namaInovasi].skorPerJuri[SESSION.nama] = parseFloat(skorInd.toFixed(2));
  all[namaInovasi].savedAt = new Date().toISOString();
  all[namaInovasi].activeJuri = SESSION.nama;

  console.log('Saving data:', all[namaInovasi]);
  
  saveAllDraf(all);
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

function doSaveWithValidation() {
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
  
  // Check if this is an edit (user already assessed before)
  const allDraf = loadAllDraf();
  const existingDraf = allDraf[namaInovasi];
  const isEdit = existingDraf && 
    ((existingDraf.skorPerJuri && existingDraf.skorPerJuri[SESSION.nama] > 0) ||
     (existingDraf.skorJudulPerJuri && existingDraf.skorJudulPerJuri[SESSION.nama] > 0));
  
  // Save
  saveAll(true);
  
  console.log('=== Save complete ===');
  
  // Show success message
  if (isEdit) {
    alert('✅ Penilaian berhasil diperbarui!\n\nKlik OK untuk kembali ke halaman utama.');
  } else {
    alert('✅ Penilaian berhasil disimpan!\n\nKlik OK untuk kembali ke halaman utama.');
  }
  
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
  printBtnEl.addEventListener("click", () => {
    saveJudulStateLocal(); 
    saveIndikatorStateLocal();
    saveNotesState();
    
    document.getElementById("pNamaInovasi").textContent = namaInovasi || "—";
    document.getElementById("pNamaJuri").textContent    = SESSION.nama;
    document.getElementById("pSignJuri").textContent    = `( ${SESSION.nama} )`;
    document.getElementById("pTanggal").textContent     = new Date().toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});

    // Tabel judul (6 kriteria)
    let totJudul = 0;
    const tbJ = document.getElementById("pTableJudul"); 
    tbJ.innerHTML = "";
    kriteriaJudul.forEach(k => {
      const v = judulState[SESSION.nama]?.[k.no] || "";
      const s = v ? Number(v) * k.bobot : 0; 
      totJudul += s;
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
    document.getElementById("pTotalJudul").textContent = totJudul.toFixed(2);
    
    // Update total skor di meta
    const pTotalSkor = document.getElementById("pTotalSkor");
    if (pTotalSkor) {
      pTotalSkor.textContent = `${totJudul.toFixed(2)} / 63`;
    }

    // Catatan dan Rekomendasi
    const catatan = notesState[SESSION.nama]?.catatan || "Tidak ada catatan";
    const rekomendasi = notesState[SESSION.nama]?.rekomendasi || "Tidak ada rekomendasi";
    document.getElementById("pCatatan").textContent = catatan;
    document.getElementById("pRekomendasi").textContent = rekomendasi;

    // Print
    window.print();
  });
}

// ── Init ──
renderSessionGrid();
