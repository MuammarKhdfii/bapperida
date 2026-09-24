const container = document.getElementById("indicatorContainer");
const scoreSPD = document.getElementById("scoreSPD");
const scoreSID = document.getElementById("scoreSID");
const scoreTotal = document.getElementById("scoreTotal");
const summarySPD = document.getElementById("summarySPD");
const summarySID = document.getElementById("summarySID");
const summaryTotal = document.getElementById("summaryTotal");
const percentage = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar");

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

function render() {
  let currentSection = "";
  container.innerHTML = "";

  indicators.forEach(item => {
    const section = item.no <= 15 ? "SATUAN PEMERINTAH DAERAH (SPD)" : "SATUAN INOVASI DAERAH (SID)";
    if (section !== currentSection) {
      currentSection = section;
      const h = document.createElement("h2");
      h.className = "section-title";
      h.textContent = section + (section.includes("SPD") ? " — Maksimal 63" : " — Maksimal 187");
      container.appendChild(h);
    }

    const card = document.createElement("article");
    card.className = "indicator";
    card.dataset.no = item.no;

    if (item.special) {
      card.innerHTML = `
        <div class="indicator-head">
          <div class="indicator-title"><span class="indicator-number">${item.no}.</span>${esc(item.nama)}</div>
          <div class="meta">Bobot: 0,38 / inovasi</div>
        </div>
        <div class="special-input">
          <div>
            <label for="innovation-${item.no}">Jumlah inovasi</label>
            <input id="innovation-${item.no}" type="number" min="0" max="200" step="1" value="0">
          </div>
          <div class="result">Skor: <b id="special-result-${item.no}">0</b></div>
        </div>
        <div class="ket"><b>Aturan:</b> ${esc(item.keterangan)}</div>
      `;
      container.appendChild(card);
      card.querySelector("input").addEventListener("input", calculate);
    } else {
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
                <div class="option-title">Parameter ${i+1} — Nilai ${item.bobot}</div>
                <div class="option-text">${esc(p)}</div>
              </label>
            </div>
          `).join("")}
        </div>
        <div class="result">Skor indikator: <b id="result-${item.no}">0</b></div>
        <div class="ket"><b>Keterangan:</b> ${esc(item.keterangan)}</div>
      `;
      container.appendChild(card);
      card.querySelectorAll("input[type=radio]").forEach(el => el.addEventListener("change", calculate));
    }
  });
}

function calculate() {
  let spd = 0, sid = 0;

  indicators.forEach(item => {
    let score = 0;
    if (item.special) {
      const input = document.getElementById(`innovation-${item.no}`);
      const n = Math.max(0, Math.min(200, Number(input?.value || 0)));
      score = n * 0.38;
      const result = document.getElementById(`special-result-${item.no}`);
      if (result) result.textContent = score.toFixed(2);
    } else {
      const selected = document.querySelector(`input[name="indicator-${item.no}"]:checked`);
      // All parameters have value of 1, so score is always 1 × bobot
      if (selected) {
        score = 1 * item.bobot;
      }
      const result = document.getElementById(`result-${item.no}`);
      if (result) result.textContent = score.toFixed(2);
    }

    if (item.no <= 15) spd += score;
    else sid += score;
  });

  const total = spd + sid;
  const max = 250;
  const pct = Math.min(100, (total / max) * 100);

  scoreSPD.textContent = spd.toFixed(2);
  scoreSID.textContent = sid.toFixed(2);
  scoreTotal.textContent = total.toFixed(2);
  summarySPD.textContent = `${spd.toFixed(2)} / 63`;
  summarySID.textContent = `${sid.toFixed(2)} / 187`;
  summaryTotal.textContent = `${total.toFixed(2)} / 250`;
  percentage.textContent = pct.toFixed(2) + "%";
  progressBar.style.width = pct + "%";
}

document.getElementById("resetBtn").addEventListener("click", () => {
  document.querySelectorAll("input[type=radio]").forEach(x => x.checked = false);
  document.querySelectorAll('input[type=number]').forEach(x => x.value = 0);
  calculate();
  window.scrollTo({top:0, behavior:"smooth"});
});

document.getElementById("printBtn").addEventListener("click", () => window.print());

// Dashboard functionality
const dashboardModal = document.getElementById("dashboardModal");
const viewDashboardBtn = document.getElementById("viewDashboardBtn");
const closeModalBtn = document.querySelector(".close-modal");

viewDashboardBtn.addEventListener("click", () => {
  updateDashboard();
  dashboardModal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  dashboardModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === dashboardModal) {
    dashboardModal.style.display = "none";
  }
});

function updateDashboard() {
  const tbody = document.getElementById("dashboardTableBody");
  tbody.innerHTML = "";
  let spdTotal = 0;
  let sidTotal = 0;
  let lastSection = "";

  indicators.forEach(item => {
    const section = item.no <= 15 ? "SPD" : "SID";
    
    // Add section divider
    if (section !== lastSection) {
      lastSection = section;
      const dividerRow = document.createElement("tr");
      dividerRow.className = "section-divider";
      dividerRow.innerHTML = `
        <td colspan="7" class="section-header">
          ${section === "SPD" ? "📋 SATUAN PEMERINTAH DAERAH (SPD) — Maksimal 63" : "💡 SATUAN INOVASI DAERAH (SID) — Maksimal 187"}
        </td>
      `;
      tbody.appendChild(dividerRow);
    }

    let score = 0;
    let selectedParam = 0;

    if (item.special) {
      const input = document.getElementById(`innovation-${item.no}`);
      const n = Math.max(0, Math.min(200, Number(input?.value || 0)));
      score = n * 0.38;
      selectedParam = -1; // special indicator
    } else {
      const selected = document.querySelector(`input[name="indicator-${item.no}"]:checked`);
      selectedParam = Number(selected?.value || 0);
      // All parameters have value of 1, so score is always 1 × bobot
      if (selectedParam > 0) {
        score = 1 * item.bobot;
      }
    }

    const row = document.createElement("tr");
    if (score === 0 && selectedParam !== -1) {
      row.className = "empty-row";
    } else if (score > 0) {
      row.className = "filled-row";
    }

    if (item.special) {
      // Special row for indicator 34
      const input = document.getElementById(`innovation-${item.no}`);
      const n = Number(input?.value || 0);
      row.innerHTML = `
        <td class="col-no">${item.no}</td>
        <td class="indicator-name">${esc(item.nama)}</td>
        <td class="col-bobot">${item.bobot}</td>
        <td colspan="3" class="special-cell">${n} inovasi × ${item.bobot} = ${score.toFixed(2)}</td>
        <td class="score-cell">${score.toFixed(2)}</td>
      `;
    } else {
      // Calculate values for each parameter (Parameter 1/2/3 each equals 1, multiplied by bobot)
      const param1Value = (1 * item.bobot).toFixed(2);
      const param2Value = (1 * item.bobot).toFixed(2);
      const param3Value = (1 * item.bobot).toFixed(2);
      
      row.innerHTML = `
        <td class="col-no">${item.no}</td>
        <td class="indicator-name">${esc(item.nama)}</td>
        <td class="col-bobot">${item.bobot}</td>
        <td class="param-cell ${selectedParam === 1 ? 'selected' : ''}">${param1Value}</td>
        <td class="param-cell ${selectedParam === 2 ? 'selected' : ''}">${param2Value}</td>
        <td class="param-cell ${selectedParam === 3 ? 'selected' : ''}">${param3Value}</td>
        <td class="score-cell">${score.toFixed(2)}</td>
      `;
    }
    
    tbody.appendChild(row);

    if (item.no <= 15) {
      spdTotal += score;
    } else {
      sidTotal += score;
    }
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.className = "total-row";
  totalRow.innerHTML = `
    <td colspan="6" class="total-label"><strong>🎯 TOTAL KESELURUHAN (36 ASPEK)</strong></td>
    <td class="total-value"><strong>${(spdTotal + sidTotal).toFixed(2)}</strong></td>
  `;
  tbody.appendChild(totalRow);

  const grandTotal = spdTotal + sidTotal;
  document.getElementById("dashboardGrandTotal").textContent = grandTotal.toFixed(2);
  document.getElementById("dashboardSPDTotal").textContent = spdTotal.toFixed(2);
  document.getElementById("dashboardSIDTotal").textContent = sidTotal.toFixed(2);
}

render();
calculate();
