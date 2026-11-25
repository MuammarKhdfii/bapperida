// ══════════════════════════════════════════
//  oral.js — Penilaian Oral Presentation
//  10 Parameter Berbobot | Skala 1–5
//  Tersedia untuk: juri_judul | juri_sid | admin
// ══════════════════════════════════════════

// ── Route Guard ──
const SESSION = requireAuth(["juri_judul", "juri_sid", "admin"]);
if (!SESSION) throw new Error("Unauthorized");

// ── Render navbar session ──
renderSessionNav("sessionNav");

// ── 10 Parameter Penilaian Oral ──────────────────────────────────────────────
const ORAL_PARAMS = [
  {
    no: 1,
    nama: "Kualitas media dan materi paparan",
    bobot: 8,
    fokus: "Keterbacaan dan ketepatan slide/media; konsistensi desain; kualitas tabel/grafik; akurasi ejaan/angka; kejelasan sumber data; kesiapan teknis media.",
    rubrik: [
      "Media tidak dapat digunakan/tidak tersedia, atau berisi kekeliruan mendasar yang membuat paparan tidak dapat dinilai secara wajar.",
      "Banyak slide sulit dibaca, data/visual tidak jelas atau tidak berlabel; media mengganggu pemahaman substansi.",
      "Media cukup terbaca; beberapa slide padat/tidak konsisten atau sebagian grafik/sumber kurang jelas, tetapi pesan utama masih dapat diikuti.",
      "Media jelas dan konsisten; terdapat kekurangan kecil pada tata letak, label, atau sumber yang tidak mengubah pemahaman utama.",
      "Seluruh media terbaca jelas dan konsisten; visual mendukung pesan; grafik/tabel berlabel dan mudah ditafsirkan; angka, istilah, dan sumber tercantum; tidak ada gangguan teknis berarti."
    ]
  },
  {
    no: 2,
    nama: "Sistematika, struktur penulisan, kelengkapan isi, dan fokus paparan",
    bobot: 10,
    fokus: "Urutan logis; keterhubungan masalah–tujuan–metode/proses–hasil/manfaat–simpulan; proporsi isi; konsistensi alur; ketepatan fokus.",
    rubrik: [
      "Paparan tidak memiliki struktur yang dapat dikenali; tujuan, proses, dan simpulan tidak saling terkait.",
      "Urutan tidak konsisten; beberapa bagian pokok hilang/tidak terhubung; fokus sering menyimpang sehingga pesan sulit dipahami.",
      "Struktur dapat diikuti, tetapi ada bagian penting yang kurang runtut, berulang, atau kurang terhubung; fokus sesekali melebar.",
      "Alur logis dengan satu-dua bagian kurang transisi/proporsional; fokus dan hubungan antarbagiannya tetap jelas.",
      "Alur sangat logis dan runtut; seluruh bagian pokok tersambung jelas; fokus terjaga; simpulan menjawab tujuan dan didukung isi paparan."
    ]
  },
  {
    no: 3,
    nama: "Kejelasan masalah, tujuan, dan relevansi riset/inovasi",
    bobot: 10,
    fokus: "Rumusan masalah/kebutuhan pengguna; baseline atau kondisi awal; akar masalah; tujuan terukur; keterkaitan dengan tugas/fungsi perangkat daerah dan kebutuhan layanan.",
    rubrik: [
      "Masalah/kebutuhan dan tujuan tidak jelas, atau tidak menunjukkan relevansi terhadap tugas/fungsi maupun kebutuhan publik.",
      "Masalah kurang terdefinisi; tujuan tidak terukur atau relevansinya lemah; bukti kondisi awal minim.",
      "Masalah dan tujuan disampaikan, tetapi masih umum; baseline atau hubungan dengan tugas/kebutuhan pengguna terbatas.",
      "Masalah dan tujuan jelas serta relevan; dukungan baseline/analisis akar masalah ada, tetapi belum lengkap pada satu aspek.",
      "Masalah spesifik dan didukung baseline/sumber; akar masalah dan kelompok terdampak jelas; tujuan terukur serta langsung relevan dengan tugas/fungsi atau kebutuhan layanan."
    ]
  },
  {
    no: 4,
    nama: "Penguasaan substansi, kebaruan, data, dan metode/landasan kerja",
    bobot: 12,
    fokus: "Akurasi penjelasan; penguasaan data/sumber; logika metode atau proses; pembanding/kebaruan; keterbatasan dan asumsi; konsistensi klaim.",
    rubrik: [
      "Tidak mampu menjelaskan substansi dasar; informasi utama saling bertentangan atau tidak ada dasar yang dapat diperiksa.",
      "Penguasaan dangkal; terdapat ketidaktepatan data/konsep atau ketidakjelasan metode; klaim tidak cukup didukung.",
      "Memahami pokok inovasi/riset; data atau metode dijelaskan secara umum; kebaruan/pembanding dan keterbatasan belum kuat.",
      "Substansi dikuasai baik; metode dan sumber relevan; unsur pembeda dijelaskan, dengan kekurangan kecil pada justifikasi atau batasan.",
      "Penjelasan akurat dan mendalam; data/sumber dapat ditelusuri; metode/proses tepat dan dijustifikasi; kebaruan/unsur pembeda teridentifikasi; asumsi serta keterbatasan diakui."
    ]
  },
  {
    no: 5,
    nama: "Kejelasan rancangan, proses pelaksanaan, dan tata kelola implementasi",
    bobot: 10,
    fokus: "Tahapan dan alur kerja; pembagian peran; SOP/prosedur; sumber daya dan teknologi; keluaran; mekanisme monitoring/evaluasi; status implementasi.",
    rubrik: [
      "Tidak ada rancangan/proses implementasi yang dapat dipahami atau rancangan tidak sesuai dengan tujuan yang dinyatakan.",
      "Rencana pelaksanaan tidak operasional; peran dan proses utama tidak jelas; sumber daya/monitoring tidak diperhitungkan.",
      "Gambaran pelaksanaan ada, tetapi beberapa tahapan, peran, kebutuhan sumber daya, atau monitoring belum jelas.",
      "Rancangan dan peran utama jelas; mekanisme implementasi tersedia, dengan satu unsur tata kelola belum terperinci.",
      "Tahapan, alur, penanggung jawab, SOP, kebutuhan sumber daya, keluaran, dan monitoring dijelaskan jelas; status aktual/persiapan dibedakan."
    ]
  },
  {
    no: 6,
    nama: "Manfaat serta kontribusi terhadap efisiensi dan efektivitas kerja/pelayanan",
    bobot: 15,
    fokus: "Perubahan waktu, biaya, beban kerja, produktivitas, kesalahan, mutu/akses layanan; indikator, baseline, target, capaian aktual; bukti dan penerima manfaat.",
    rubrik: [
      "Tidak dapat menunjukkan manfaat yang relevan, atau klaim manfaat bertentangan dengan informasi/bukti yang disampaikan.",
      "Manfaat dinyatakan secara umum; hubungan dengan efisiensi/efektivitas lemah; indikator dan bukti tidak memadai.",
      "Manfaat masuk akal dan relevan, tetapi sebagian besar masih berupa uraian kualitatif atau target; pengukuran dampak terbatas.",
      "Manfaat dan indikator terukur jelas; tersedia baseline atau data capaian yang relevan, tetapi bukti/perbandingan belum lengkap.",
      "Manfaat langsung pada efisiensi/efektivitas dijelaskan dengan indikator terukur; baseline dan capaian aktual didukung bukti yang dapat ditelusuri; target/proyeksi dipisahkan tegas."
    ]
  },
  {
    no: 7,
    nama: "Kelayakan, pengelolaan risiko, keberlanjutan, dan potensi replikasi",
    bobot: 10,
    fokus: "Kesesuaian regulasi/kewenangan; kebutuhan biaya, SDM, sarana; risiko dan mitigasi; pemeliharaan/pembiayaan lanjutan; skalabilitas dan adaptasi.",
    rubrik: [
      "Tidak ada pertimbangan kelayakan/risiko/keberlanjutan, atau terdapat hambatan mendasar yang tidak dijawab.",
      "Kelayakan belum teruji; kebutuhan sumber daya dan risiko utama terabaikan; keberlanjutan sangat bergantung pada asumsi.",
      "Sebagian kebutuhan dan risiko telah diidentifikasi; pembiayaan lanjutan, mitigasi, atau replikasi belum didukung analisis memadai.",
      "Kelayakan dan keberlanjutan cukup kuat; risiko utama dikenali, meski mitigasi atau kebutuhan replikasi belum rinci.",
      "Kelayakan teknis, kelembagaan, anggaran, dan regulasi dianalisis; risiko utama dan mitigasi jelas; keberlanjutan serta syarat replikasi realistis."
    ]
  },
  {
    no: 8,
    nama: "Disiplin dan ketepatan penggunaan waktu paparan",
    bobot: 5,
    fokus: "Durasi aktual dibandingkan alokasi resmi panitia. Ukur sejak aba-aba mulai sampai peserta menyatakan paparan selesai; gangguan teknis dari panitia dicatat terpisah.",
    rubrik: [
      "Durasi aktual <70% atau >130% dari alokasi, atau paparan dihentikan karena pelanggaran batas waktu.",
      "Durasi aktual 70–<80% atau >120–130% dari alokasi.",
      "Durasi aktual 80–<90% atau >110–120% dari alokasi.",
      "Durasi aktual 90–<95% atau >105–110% dari alokasi.",
      "Durasi aktual berada pada 95–105% dari alokasi waktu."
    ]
  },
  {
    no: 9,
    nama: "Teknik komunikasi, public speaking, sikap, dan profesionalitas penyaji",
    bobot: 10,
    fokus: "Kejelasan suara dan bahasa; alur tutur; kontak dengan audiens; pengelolaan waktu/transisi; respons nonverbal yang relevan; kesantunan dan kesiapan profesional.",
    rubrik: [
      "Komunikasi tidak memungkinkan substansi dipahami, atau perilaku tidak profesional secara nyata menghambat proses penilaian.",
      "Penyampaian sering tidak jelas/monoton atau sulit diikuti; interaksi kurang tepat; perilaku mengganggu kelancaran paparan.",
      "Pesan utama dapat dipahami; tempo/volume/kontak audiens atau struktur tutur belum konsisten; profesionalitas tetap terjaga.",
      "Komunikasi efektif dan profesional; terdapat kekurangan kecil pada tempo, artikulasi, transisi, atau interaksi tanpa mengganggu pemahaman.",
      "Penyampaian jelas, terstruktur, meyakinkan, dan mudah diikuti; interaksi audiens proporsional; sikap santun dan profesional sepanjang sesi."
    ]
  },
  {
    no: 10,
    nama: "Kualitas jawaban/tanggapan atas pertanyaan, kritik, saran, dan masukan",
    bobot: 10,
    fokus: "Relevansi jawaban; ketepatan fakta; penggunaan bukti; penalaran; keterbukaan; kemampuan mengakui keterbatasan dan menjelaskan tindak lanjut.",
    rubrik: [
      "Tidak menjawab substansi pertanyaan, memberikan informasi yang nyata-nyata bertentangan, atau menolak dialog secara tidak profesional.",
      "Jawaban sering tidak tepat/tidak tuntas; argumentasi lemah atau defensif; tidak menjelaskan dasar klaim.",
      "Menjawab sebagian besar pertanyaan; uraian cenderung umum atau bukti terbatas; tanggapan terhadap masukan cukup terbuka.",
      "Jawaban relevan dan umumnya akurat; alasan/bukti tersedia; ada bagian yang belum mendalam tetapi tidak menghindar.",
      "Menjawab langsung dan lengkap; argumen logis serta berbasis data/bukti; menanggapi kritik secara konstruktif; mengakui batas pengetahuan dan menawarkan tindak lanjut yang relevan."
    ]
  }
];

// ── Warna bobot badge per parameter (10 warna) ────────────────────────────────
const BOBOT_COLORS = [
  "indigo", "emerald", "amber", "violet", "sky",
  "rose", "teal", "purple", "orange", "cyan"
];

// ── State ─────────────────────────────────────────────────────────────────────
let namaInovasi = localStorage.getItem("iid2026_selected") || "";
let oralState   = {}; // { paramNo: nilaiStr }
let oralNotes   = { catatan: "", rekomendasi: "" };
let namaPresenter = "";
let asalPD = "";

// ── Init inovasi card ─────────────────────────────────────────────────────────
(async function init() {
  if (!namaInovasi) {
    console.warn("namaInovasi kosong, redirect ke index.html");
    window.location.href = "index.html";
    return;
  }

  const allMeta = typeof getDaftarInovasiByRole === "function"
    ? getDaftarInovasiByRole(SESSION.role)
    : (typeof daftarInovasi !== "undefined" ? daftarInovasi : []);
  const meta = allMeta.find(i => i.judul === namaInovasi) || {};

  document.getElementById("heroJudulInovasi").textContent = namaInovasi;
  document.getElementById("heroPDInovasi").textContent    = meta.perangkatDaerah || "—";
  document.getElementById("icJudul").textContent          = namaInovasi;
  document.getElementById("icPD").textContent             = "🏛️ " + (meta.perangkatDaerah || "—");
  document.getElementById("icBentuk").textContent         = "📂 " + (meta.bentuk || "—");
  document.getElementById("icTahun").textContent          = "📅 " + (meta.waktu || "—");

  namaPresenter = meta.inisiator || meta.namaPresenter || "";
  asalPD        = meta.perangkatDaerah || "";
  const elPresenter = document.getElementById("inputPresenter");
  const elPD        = document.getElementById("inputPD");
  const elJudul     = document.getElementById("inputJudul");
  if (elPresenter) elPresenter.value = namaPresenter;
  if (elPD)        elPD.value        = asalPD;
  if (elJudul)     elJudul.value     = namaInovasi;

  await restoreState();

  renderOralForm();
  calculate();
  loadNotesUI();

  // Inisialisasi scroll top
  if (typeof initScrollTop === "function") initScrollTop("scrollTopBtn");

})().catch(e => console.error("[oral.js init]", e));

// ── Restore state dari storage ────────────────────────────────────────────────
async function restoreState() {
  const all = await loadAllDraf();
  const d   = all[namaInovasi];
  if (!d) return;

  const sanitized = SESSION.nama.replace(/[\.,#$\[\]\/]/g, "_");
  const raw = d.oralState?.[SESSION.nama] || d.oralState?.[sanitized];
  if (raw) oralState = { ...raw };

  const notes = d.oralNotes?.[SESSION.nama] || d.oralNotes?.[sanitized];
  if (notes) oralNotes = { ...notes };

  if (d.oralIdentitas) {
    const elPresenter = document.getElementById("inputPresenter");
    const elPD        = document.getElementById("inputPD");
    const elJudul     = document.getElementById("inputJudul");
    if (elPresenter && d.oralIdentitas.presenter) elPresenter.value = d.oralIdentitas.presenter;
    if (elPD        && d.oralIdentitas.pd)        elPD.value        = d.oralIdentitas.pd;
    if (elJudul     && d.oralIdentitas.judul)     elJudul.value     = d.oralIdentitas.judul;
  }
}

// ── Render 10 kartu parameter ─────────────────────────────────────────────────
function renderOralForm() {
  const container = document.getElementById("oralContainer");
  if (!container) return;
  container.innerHTML = "";

  // Build sidebar + bottom nav pills
  const sidebar   = document.getElementById("quickNavSidebar");
  const bottomNav = document.getElementById("bottomNavPills");
  if (sidebar)   sidebar.innerHTML   = "";
  if (bottomNav) bottomNav.innerHTML = "";

  ORAL_PARAMS.forEach((param, idx) => {
    const colorName = BOBOT_COLORS[idx] || "indigo";
    const card = document.createElement("article");
    card.className = "oral-card oral-card-unfilled";
    card.dataset.no = param.no;
    card.id = `oral-card-${param.no}`;
    card.style.animationDelay = (idx * 0.04) + "s";

    // Build 5 option buttons
    const optButtons = param.rubrik.map((desc, i) => {
      const val = i + 1;
      return `<label class="oral-opt-btn oral-opt-${val}" for="oral-${param.no}-val${val}" id="oral-optlabel-${param.no}-${val}">
        <input type="radio"
          id="oral-${param.no}-val${val}"
          name="oral-${param.no}"
          value="${val}"
          class="oral-radio-hidden">
        <span class="oral-opt-num">${val}</span>
        <span class="oral-opt-desc">${esc(desc)}</span>
        <span class="oral-opt-check">✓</span>
      </label>`;
    }).join("");

    card.innerHTML = `
      <div class="oral-card-header" id="oral-card-header-${param.no}">
        <div class="oral-card-num">${param.no}</div>
        <div class="oral-card-info">
          <div class="oral-card-nama">${esc(param.nama)}</div>
        </div>
        <div class="oral-bobot-badge oral-bobot-${colorName}">Bobot ${param.bobot}%</div>
        <div class="oral-card-check hidden" id="oral-card-check-${param.no}">✓ Dipilih</div>
      </div>
      <div class="oral-fokus">${esc(param.fokus)}</div>
      <div class="oral-options-grid" id="oral-opts-${param.no}">
        ${optButtons}
      </div>
      <div class="oral-result">
        Skor terbobot: <b id="oral-skor-${param.no}">0.00</b> <small>/ ${param.bobot}</small>
        <div class="oral-skor-bar"><div class="oral-skor-bar-fill" id="oral-skor-bar-${param.no}" style="width:0%"></div></div>
      </div>`;

    container.appendChild(card);

    // Bind radio change — "change" untuk keyboard, "click" pada label untuk mouse/touch
    card.querySelectorAll("input[type=radio]").forEach(el => {
      el.addEventListener("change", () => {
        oralState[param.no] = el.value;  // tulis langsung
        saveStateLocal();
        calculate();
        updateCardHighlight(param.no, el.value);
        updateRubrikHighlight(param.no, el.value);
      });
    });
    card.querySelectorAll("label.oral-opt-btn").forEach(lbl => {
      lbl.addEventListener("click", () => {
        const radio = document.getElementById(lbl.htmlFor);
        if (!radio) return;
        const val = radio.value;
        // Pastikan radio checked sebelum state diperbarui
        requestAnimationFrame(() => {
          oralState[param.no] = val;
          saveStateLocal();
          calculate();
          updateCardHighlight(param.no, val);
          updateRubrikHighlight(param.no, val);
        });
      });
    });

    // Build quick nav pill (sidebar)
    if (sidebar) {
      const pill = document.createElement("a");
      pill.className = "quick-nav-pill empty";
      pill.id = `qnp-${param.no}`;
      pill.textContent = param.no;
      pill.title = `Parameter ${param.no}`;
      pill.href = "#";
      pill.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById(`oral-card-${param.no}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      sidebar.appendChild(pill);
    }

    // Build bottom nav pill (mobile)
    if (bottomNav) {
      const bp = document.createElement("a");
      bp.className = "bnp-pill empty";
      bp.id = `bnp-${param.no}`;
      bp.textContent = param.no;
      bp.title = `Parameter ${param.no}`;
      bp.href = "#";
      bp.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById(`oral-card-${param.no}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      bottomNav.appendChild(bp);
    }
  });

  // On desktop: expand fokus by default
  if (window.innerWidth >= 1100) {
    document.querySelectorAll(".oral-fokus-content").forEach(el => {
      el.style.display = "";
    });
    document.querySelectorAll(".oral-fokus-toggle").forEach(btn => {
      btn.textContent = "🎯 Fokus Observasi ▼";
    });
  }

  loadStateLocal();
}

// ── Toggle fokus & rubrik ─────────────────────────────────────────────────────
function toggleFokus(no) {
  const content = document.getElementById(`oral-fokus-${no}`);
  const btn = content?.previousElementSibling;
  if (!content) return;
  const open = content.style.display !== "none";
  content.style.display = open ? "none" : "";
  if (btn) btn.textContent = open ? "🎯 Fokus Observasi ▶" : "🎯 Fokus Observasi ▼";
}

function toggleRubrik(no) {
  const panel = document.getElementById(`oral-rubrik-${no}`);
  const btn = panel?.previousElementSibling;
  if (!panel) return;
  const open = panel.style.display !== "none" && panel.style.display !== "";
  panel.style.display = open ? "none" : "block";
  if (btn) btn.textContent = open ? "📖 Lihat Rubrik Lengkap ▼" : "📖 Tutup Rubrik ▲";
}

// ── Simpan & load state ke variabel lokal ─────────────────────────────────────
function saveStateLocal() {
  ORAL_PARAMS.forEach(p => {
    const sel = document.querySelector(`input[name="oral-${p.no}"]:checked`);
    oralState[p.no] = sel ? sel.value : "";
  });
}

function loadStateLocal() {
  ORAL_PARAMS.forEach(p => {
    const val = oralState[p.no] || "";
    document.querySelectorAll(`input[name="oral-${p.no}"]`).forEach(x => x.checked = false);
    if (val) {
      const el = document.querySelector(`input[name="oral-${p.no}"][value="${val}"]`);
      if (el) el.checked = true;
    }
    if (val) {
      updateCardHighlight(p.no, val);
      updateRubrikHighlight(p.no, val);
    }
  });
}

// ── Hitung skor ───────────────────────────────────────────────────────────────
function calculate() {
  let totalSkorTerbobot = 0;
  let terisi = 0;
  const total = ORAL_PARAMS.length;

  ORAL_PARAMS.forEach(p => {
    const sel = document.querySelector(`input[name="oral-${p.no}"]:checked`);
    const nilai = sel ? Number(sel.value) : 0;
    // Rumus: (Nilai ÷ 5) × Bobot
    const skorTerbobot = (nilai / 5) * p.bobot;
    totalSkorTerbobot += skorTerbobot;
    if (nilai > 0) terisi++;

    const el = document.getElementById(`oral-skor-${p.no}`);
    if (el) {
      el.classList.remove("updated");
      void el.offsetWidth;
      el.textContent = skorTerbobot.toFixed(2);
      el.classList.add("updated");
    }

    // Mini progress bar per kartu
    const barFill = document.getElementById(`oral-skor-bar-${p.no}`);
    if (barFill) {
      const pct = p.bobot > 0 ? (skorTerbobot / p.bobot) * 100 : 0;
      barFill.style.width = pct.toFixed(1) + "%";
    }
  });

  const pct = total > 0 ? Math.round((terisi / total) * 100) : 0;
  const nilaiAkhir = totalSkorTerbobot.toFixed(2);

  // Scoreboard
  animateCounter(document.getElementById("scoreTotal"),    nilaiAkhir);
  animateCounter(document.getElementById("scoreTerisi"),   terisi + " / " + total);
  animateCounter(document.getElementById("scorePct"),      pct + "%");

  // Kategori
  const katEl = document.getElementById("scoreKategori");
  if (katEl) {
    const { label, cls } = getKategori(totalSkorTerbobot);
    katEl.textContent  = label;
    katEl.className    = "oral-kat-badge " + cls;
  }

  // Highlight kartu interpretasi sesuai nilai akhir
  highlightInterpretasi(totalSkorTerbobot);

  // Progress bar
  const pb = document.getElementById("progressBar");
  if (pb) {
    pb.style.width = pct + "%";
    if (pct === 100) {
      pb.classList.add("complete");
    } else {
      pb.classList.remove("complete");
    }
  }
  const pctLabel = document.getElementById("progressLabel");
  if (pctLabel) pctLabel.textContent = pct + "%";

  const pctInBar = document.getElementById("progressPctLabel");
  if (pctInBar) pctInBar.textContent = pct > 10 ? pct + "%" : "";

  const counter = document.getElementById("progressCounter");
  if (counter) counter.textContent = `${terisi} dari ${total} parameter terisi`;

  // Ringkasan bawah
  const sumTotal = document.getElementById("sumTotal");
  const sumPct   = document.getElementById("summaryPct");
  const pb2      = document.getElementById("progressBar2");
  if (sumTotal) sumTotal.textContent = `${nilaiAkhir} / 100`;
  if (sumPct)   sumPct.textContent   = pct + "%";
  if (pb2) {
    pb2.style.width = pct + "%";
    if (pct === 100) pb2.classList.add("complete");
    else             pb2.classList.remove("complete");
  }

  // Donut chart
  updateDonutChart(totalSkorTerbobot);

  // Nav pills
  updateNavQuickPills();
}

// ── Kategori nilai akhir ──────────────────────────────────────────────────────
function getKategori(skor) {
  if (skor >= 90) return { label: "Sangat Kuat",     cls: "kat-sangat-kuat" };
  if (skor >= 80) return { label: "Kuat",             cls: "kat-kuat" };
  if (skor >= 70) return { label: "Memadai",          cls: "kat-memadai" };
  if (skor >= 60) return { label: "Perlu Penguatan",  cls: "kat-perlu" };
  return             { label: "Belum Memadai",     cls: "kat-belum" };
}

// ── Highlight kartu interpretasi sesuai nilai akhir ───────────────────────────
function highlightInterpretasi(skor) {
  const grid = document.getElementById("interpretasiGrid");
  if (!grid) return;
  grid.querySelectorAll(".kat-box").forEach(box => {
    const min = parseFloat(box.dataset.min);
    const max = parseFloat(box.dataset.max);
    // skor masuk rentang [min, max) — kecuali 90–100 inklusif keduanya
    const aktif = skor >= min && (max === 100 ? skor <= max : skor < max);
    box.classList.toggle("kat-active", aktif && skor > 0);
  });
}

// ── Donut chart update ────────────────────────────────────────────────────────
function updateDonutChart(skor) {
  const circle = document.getElementById("donutFill");
  if (!circle) return;

  const r = 45;
  const circumference = 2 * Math.PI * r; // ≈ 282.74

  const offset = circumference - (Math.min(skor, 100) / 100) * circumference;
  circle.setAttribute("stroke-dashoffset", offset.toFixed(2));

  // Color by kategori
  let color = "#ef4444"; // <60
  if (skor >= 90)      color = "#1C768F";
  else if (skor >= 80) color = "#0d5a70";
  else if (skor >= 70) color = "#FA991C";
  else if (skor >= 60) color = "#d97d10";
  circle.setAttribute("stroke", color);
}

// ── Card highlight update ─────────────────────────────────────────────────────
function updateCardHighlight(paramNo, nilaiStr) {
  const card   = document.getElementById(`oral-card-${paramNo}`);
  const header = document.getElementById(`oral-card-header-${paramNo}`);
  const check  = document.getElementById(`oral-card-check-${paramNo}`);

  if (!card) return;

  // Remove all filled classes
  card.className = "oral-card";
  if (header) header.className = "oral-card-header";

  if (!nilaiStr) {
    card.classList.add("oral-card-unfilled");
    if (check) check.classList.add("hidden");
    // Clear selected state on option buttons
    for (let i = 1; i <= 5; i++) {
      const lbl = document.getElementById(`oral-optlabel-${paramNo}-${i}`);
      if (lbl) lbl.classList.remove("selected");
    }
    return;
  }

  const val = Number(nilaiStr);
  card.classList.add(`oral-card-filled-${val}`);
  if (header) header.classList.add(`hdr-val-${val}`);
  if (check)  check.classList.remove("hidden");

  // Highlight option buttons
  for (let i = 1; i <= 5; i++) {
    const lbl = document.getElementById(`oral-optlabel-${paramNo}-${i}`);
    if (lbl) {
      if (i === val) lbl.classList.add("selected");
      else           lbl.classList.remove("selected");
    }
  }
}

// ── Rubrik highlight update ───────────────────────────────────────────────────
function updateRubrikHighlight(paramNo, nilaiStr) {
  const val = Number(nilaiStr) || 0;
  for (let i = 1; i <= 5; i++) {
    const item = document.getElementById(`oral-rubrik-${paramNo}-lv${i}`);
    if (!item) continue;
    // Remove all active classes
    item.classList.remove("active-1","active-2","active-3","active-4","active-5");
    if (i === val) item.classList.add(`active-${val}`);
  }
}

// ── Nav quick pills update ────────────────────────────────────────────────────
function updateNavQuickPills() {
  ORAL_PARAMS.forEach(p => {
    const filled = !!(oralState[p.no]);
    const cls    = filled ? "filled" : "empty";

    const sidebarPill  = document.getElementById(`qnp-${p.no}`);
    const mobilePill   = document.getElementById(`bnp-${p.no}`);

    if (sidebarPill) {
      sidebarPill.className = `quick-nav-pill ${cls}`;
    }
    if (mobilePill) {
      mobilePill.className = `bnp-pill ${cls}`;
    }
  });
}

// ── Toast notification ────────────────────────────────────────────────────────
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut .3s ease both";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Notes ─────────────────────────────────────────────────────────────────────
function loadNotesUI() {
  const c = document.getElementById("notesCatatan");
  const r = document.getElementById("notesRekomendasi");
  if (c) { c.value = oralNotes.catatan || ""; c.addEventListener("input", saveNotesLocal); }
  if (r) { r.value = oralNotes.rekomendasi || ""; r.addEventListener("input", saveNotesLocal); }
}

function saveNotesLocal() {
  oralNotes.catatan     = document.getElementById("notesCatatan")?.value  || "";
  oralNotes.rekomendasi = document.getElementById("notesRekomendasi")?.value || "";
}

// ── Simpan ke storage ─────────────────────────────────────────────────────────
async function saveOral(showAnim = false) {
  if (!namaInovasi) { alert("Inovasi belum dipilih."); return; }

  // Baca ulang dari DOM sebelum simpan untuk memastikan nilai terbaru
  saveStateLocal();
  saveNotesLocal();

  // Verifikasi oralState tidak kosong — fallback baca langsung dari DOM
  const stateEmpty = ORAL_PARAMS.every(p => !oralState[p.no]);
  if (stateEmpty) {
    ORAL_PARAMS.forEach(p => {
      const sel = document.querySelector(`input[name="oral-${p.no}"]:checked`);
      oralState[p.no] = sel ? sel.value : "";
    });
  }

  let totalSkor = 0;
  ORAL_PARAMS.forEach(p => {
    const v = oralState[p.no] || "";
    if (v) totalSkor += (Number(v) / 5) * p.bobot;
  });

  console.log('[saveOral] oralState:', JSON.stringify(oralState));
  console.log('[saveOral] totalSkor:', totalSkor);

  const all = await loadAllDraf();
  if (!all[namaInovasi]) {
    all[namaInovasi] = { namaInovasi, createdAt: new Date().toISOString() };
  }

  const sanitized = SESSION.nama.replace(/[\.,#$\[\]\/]/g, "_");

  all[namaInovasi].oralState = all[namaInovasi].oralState || {};
  all[namaInovasi].oralState[sanitized] = { ...oralState };

  all[namaInovasi].oralNotes = all[namaInovasi].oralNotes || {};
  all[namaInovasi].oralNotes[sanitized] = { ...oralNotes };

  all[namaInovasi].oralIdentitas = {
    presenter: document.getElementById("inputPresenter")?.value || "",
    judul:     document.getElementById("inputJudul")?.value     || namaInovasi,
    pd:        document.getElementById("inputPD")?.value        || ""
  };

  all[namaInovasi].oralSkorPerJuri = all[namaInovasi].oralSkorPerJuri || {};
  all[namaInovasi].oralSkorPerJuri[sanitized] = parseFloat(totalSkor.toFixed(2));

  all[namaInovasi].oralUserMetadata = all[namaInovasi].oralUserMetadata || {};
  all[namaInovasi].oralUserMetadata[sanitized] = {
    namaOriginal : SESSION.nama,
    role         : SESSION.role,
    label        : SESSION.label,
    totalSkor    : parseFloat(totalSkor.toFixed(2)),
    lastUpdated  : new Date().toISOString()
  };

  all[namaInovasi].savedAt = new Date().toISOString();

  // Simpan ke localStorage dulu (cepat)
  const KEY_ALL = "draf_iid2026_all";
  localStorage.setItem(KEY_ALL, JSON.stringify(all));

  // Simpan HANYA 1 inovasi ini ke Firebase (bukan semua 178 inovasi)
  if (typeof cloudStorage !== 'undefined') {
    try {
      await cloudStorage.saveDraf(namaInovasi, all[namaInovasi]);
    } catch(e) {
      console.error('[saveOral] Firebase error:', e);
      // localStorage sudah tersimpan, tidak perlu alert
    }
  }

  setLastInovasi(namaInovasi);
}

// ── Buka Modal Final ──────────────────────────────────────────────────────────
function openFinalModal() {
  saveStateLocal();

  const grid = document.getElementById("modalFinalGrid");
  if (!grid) return;
  grid.innerHTML = "";

  let total = 0;
  ORAL_PARAMS.forEach(p => {
    const v     = oralState[p.no] || "";
    const skor  = v ? (Number(v) / 5) * p.bobot : 0;
    total += skor;

    const row = document.createElement("div");
    row.className = "mfg-row";

    const valColors = ["", "#f97316", "#5a7a8a", "#FA991C", "#1C768F", "#0d5a70"];
    const color = v ? valColors[Number(v)] : "#94a3b8";

    row.innerHTML = `
      <span class="mfg-no">${p.no}</span>
      <span class="mfg-nama" title="${esc(p.nama)}">${esc(p.nama)}</span>
      <span class="mfg-nilai" style="color:${color}">${v || "—"}</span>
      <span class="mfg-skor">${skor > 0 ? skor.toFixed(2) : "—"}</span>`;
    grid.appendChild(row);
  });

  const totEl = document.getElementById("modalFinalTotal");
  if (totEl) totEl.textContent = total.toFixed(2);

  const modal = document.getElementById("modalFinalOral");
  if (modal) modal.style.display = "flex";
}

// ── Validasi & simpan final ───────────────────────────────────────────────────
window.doSaveOral = async function() {
  if (!namaInovasi) { alert("Inovasi belum dipilih."); return; }

  saveStateLocal();

  const belum = ORAL_PARAMS.filter(p => !oralState[p.no]);
  if (belum.length > 0) {
    // Highlight dan scroll ke kartu pertama yang belum
    document.querySelectorAll(".indicator-required-warn")
      .forEach(el => el.classList.remove("indicator-required-warn"));
    belum.forEach(p => {
      const el = document.querySelector(`article[data-no="${p.no}"]`);
      if (el) el.classList.add("indicator-required-warn");
    });
    const firstCard = document.querySelector(`article[data-no="${belum[0].no}"]`);
    if (firstCard) firstCard.scrollIntoView({ behavior: "smooth", block: "center" });

    showToast(`❌ ${belum.length} parameter belum diisi`, "error");
    return;
  }

  document.querySelectorAll(".indicator-required-warn")
    .forEach(el => el.classList.remove("indicator-required-warn"));

  openFinalModal();
};

// ── Konfirmasi final dari modal ───────────────────────────────────────────────
window.konfirmasiFinalOral = async function(lanjut) {
  const modal = document.getElementById("modalFinalOral");
  if (!lanjut) {
    if (modal) modal.style.display = "none";
    return;
  }

  const btn = document.getElementById("btnFinalKonfirmasi");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `⏳ Menyimpan… <span class="btn-spinner"></span>`;
  }

  await saveOral(true);

  if (modal) modal.style.display = "none";
  if (btn)   { btn.disabled = false; btn.innerHTML = "✅ Konfirmasi & Simpan"; }

  showToast("✅ Penilaian berhasil disimpan!", "success");
  setTimeout(() => { window.location.href = "index.html"; }, 1500);
};

// ── Draft ─────────────────────────────────────────────────────────────────────

// ── Reset ─────────────────────────────────────────────────────────────────────
window.resetOral = function() {
  if (!confirm(`Reset semua penilaian oral presentation untuk ${SESSION.nama}?\nTindakan ini tidak dapat dibatalkan.`)) return;
  oralState = {};
  oralNotes = { catatan: "", rekomendasi: "" };
  document.querySelectorAll("input[type=radio][name^='oral-']").forEach(x => x.checked = false);
  ORAL_PARAMS.forEach(p => {
    updateCardHighlight(p.no, "");
    updateRubrikHighlight(p.no, "");
  });
  const c = document.getElementById("notesCatatan");
  const r = document.getElementById("notesRekomendasi");
  if (c) c.value = "";
  if (r) r.value = "";
  calculate();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ── Print ─────────────────────────────────────────────────────────────────────
window.printOral = function() {
  saveStateLocal();
  saveNotesLocal();

  document.getElementById("pNamaPresenter").textContent =
    document.getElementById("inputPresenter")?.value || "—";
  document.getElementById("pJudulInovasi").textContent  =
    document.getElementById("inputJudul")?.value     || namaInovasi || "—";
  document.getElementById("pAsalPD").textContent        =
    document.getElementById("inputPD")?.value        || "—";
  document.getElementById("pNamaJuri").textContent      = SESSION.nama;
  document.getElementById("pTanggal").textContent       =
    new Date().toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" });

  let total = 0;
  const tbody = document.getElementById("pTableOral");
  tbody.innerHTML = "";
  ORAL_PARAMS.forEach(p => {
    const v = oralState[p.no] || "";
    const skor = v ? (Number(v) / 5) * p.bobot : 0;
    total += skor;
    const tr = document.createElement("tr");
    tr.className = skor > 0 ? "pt-filled" : "pt-empty";
    tr.innerHTML = `
      <td class="pt-no">${p.no}</td>
      <td class="pt-nama">${esc(p.nama)}</td>
      <td class="pt-bobot">${p.bobot}%</td>
      <td class="pt-param">${v || "—"}</td>
      <td class="pt-nilai">${skor > 0 ? skor.toFixed(2) : "—"}</td>
      <td class="pt-ket">${v ? esc(p.rubrik[Number(v) - 1]) : "—"}</td>`;
    tbody.appendChild(tr);
  });

  document.getElementById("pTotalOral").textContent = total.toFixed(2);
  const kat = getKategori(total);
  document.getElementById("pKategori").textContent  = kat.label;

  document.getElementById("pCatatan").textContent      = oralNotes.catatan     || "—";
  document.getElementById("pRekomendasi").textContent  = oralNotes.rekomendasi || "—";

  window.print();
};

// ── Modal overlay click handler ───────────────────────────────────────────────
document.addEventListener("click", e => {
  // Tutup modal final klik overlay
  const finalModal = document.getElementById("modalFinalOral");
  if (e.target === finalModal) finalModal.style.display = "none";
});

// Simpan saat tutup tab
window.addEventListener("beforeunload", () => { saveStateLocal(); saveOral(false); });
