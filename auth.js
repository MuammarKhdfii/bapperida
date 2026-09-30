// ══════════════════════════════════════════
//  AUTH.JS — Autentikasi, Session, Route Guard
//  Pure client-side (localStorage session)
// ══════════════════════════════════════════

const SESSION_KEY = "iid_session";

// ── Daftar Pengguna ──────────────────────
const USERS = [
  // Super Admin
  {
    username: "admin",
    password: "admin2027",
    nama    : "Administrator",
    roles   : ["admin"],
    label   : "Super Admin"
  },
  // Juri Judul Inovasi
  {
    username: "eva.rolia",
    password: "juri2027",
    nama    : "Dr. Ir. Eva Rolia, M.T., M.K.M.",
    roles   : ["juri_judul", "juri_sid"],  // Multiple roles
    label   : "Juri Judul & SID"
  },
  {
    username: "arif.joko",
    password: "juri2027",
    nama    : "Ir. Arif Joko Arwoko",
    roles   : ["juri_judul"],
    label   : "Juri Judul Inovasi"
  },
  {
    username: "mustafa",
    password: "juri2027",
    nama    : "Mustafa Akhyar, S.E.",
    roles   : ["juri_judul"],
    label   : "Juri Judul Inovasi"
  },
  // Juri Penilaian SID
  {
    username: "sowiyah",
    password: "juri2027",
    nama    : "Prof. Dr. Dra. Sowiyah M.Pd.",
    roles   : ["juri_sid"],
    label   : "Juri Penilaian SID"
  },
  {
    username: "etik.puji",
    password: "juri2027",
    nama    : "Prof. Dr. Ir. Etik Puji Handayani, M.Si.",
    roles   : ["juri_sid"],
    label   : "Juri Penilaian SID"
  }
];

// ── Role Config ──────────────────────────
const ROLE_CONFIG = {
  admin: {
    redirect  : "dashboard.html",  // admin langsung ke dashboard
    label     : "Super Admin",
    color     : "#7c3aed",
    icon      : "",
    allowPages: ["dashboard.html", "index.html"]
  },
  juri_judul: {
    redirect  : "index.html",      // juri ke beranda dulu → pilih inovasi
    label     : "Juri Judul Inovasi",
    color     : "#134e5e",
    icon      : "",
    allowPages: ["index.html", "penilaian.html"]
  },
  juri_sid: {
    redirect  : "index.html",      // juri ke beranda dulu → pilih inovasi
    label     : "Juri Penilaian SID",
    color     : "#1e3a8a",
    icon      : "",
    allowPages: ["index.html", "penilaian.html"]
  }
};

// ── Session Helpers ──────────────────────
function setSession(user) {
  const session = {
    username : user.username,
    nama     : user.nama,
    role     : user.role,
    label    : user.label,
    loginAt  : new Date().toISOString()
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return getSession() !== null;
}

// ── Login ────────────────────────────────
function login(username, password) {
  const user = USERS.find(
    u => u.username === username.trim().toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, msg: "Username atau password salah." };
  
  // Jika user hanya punya 1 role, langsung set session
  if (user.roles.length === 1) {
    const session = setSession({...user, role: user.roles[0]});
    return { ok: true, session, redirect: ROLE_CONFIG[user.roles[0]].redirect };
  }
  
  // Jika user punya multiple roles, simpan sementara dan minta pilih role
  return { ok: true, needRoleSelection: true, user: user };
}

// ── Login dengan role yang dipilih ────────
function loginWithRole(user, selectedRole) {
  if (!user.roles.includes(selectedRole)) {
    return { ok: false, msg: "Role tidak valid." };
  }
  const session = setSession({...user, role: selectedRole, label: ROLE_CONFIG[selectedRole].label});
  return { ok: true, session, redirect: ROLE_CONFIG[selectedRole].redirect };
}

// ── Logout ───────────────────────────────
function logout() {
  if (!confirm("Anda yakin ingin keluar?")) {
    return false;
  }
  clearSession();
  window.location.href = "login.html";
  return true;
}

// ══════════════════════════════════════════
//  ROUTE GUARD — panggil di setiap halaman
//  requireRole("admin") atau requireRole(["juri_judul","juri_sid"])
// ══════════════════════════════════════════
function requireAuth(allowedRoles) {
  const session = getSession();

  // Belum login → ke login
  if (!session) {
    window.location.replace("login.html");
    return null;
  }

  // Role tidak diizinkan → ke halaman sesuai role mereka
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (!roles.includes(session.role)) {
    const correctPage = ROLE_CONFIG[session.role]?.redirect || "login.html";
    window.location.replace(correctPage);
    return null;
  }

  return session;
}

// ── Render navbar session ────────────────
function renderSessionNav(containerId = "sessionNav") {
  const session = getSession();
  const el      = document.getElementById(containerId);
  if (!el || !session) return;

  const cfg = ROLE_CONFIG[session.role] || {};
  const iconHtml = cfg.icon ? `<span class="snav-icon">${cfg.icon}</span>` : '';
  
  el.innerHTML = `
    <div class="snav-user">
      ${iconHtml}
      <div class="snav-info">
        <div class="snav-nama">${session.nama}</div>
        <div class="snav-role" style="background:rgba(255,255,255,0.25);color:white;font-weight:800;">${cfg.label}</div>
      </div>
    </div>
    <button class="snav-logout" type="button">↩ Keluar</button>`;
  
  // Attach event listener to logout button immediately
  const btn = el.querySelector('.snav-logout');
  console.log('Logout button found:', btn); // Debug
  if (btn) {
    btn.onclick = function(e) {
      console.log('Logout clicked!'); // Debug
      e.preventDefault();
      e.stopPropagation();
      if (confirm("Anda yakin ingin keluar?")) {
        clearSession();
        window.location.href = "login.html";
      }
      return false;
    };
    console.log('Event handler attached'); // Debug
  }
}

// ── Handle logout dengan proper event ────
window.handleLogout = function() {
  logout();
};
