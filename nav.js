// nav.js — sidebar, protección de sesión y dark mode
(function () {

  // ── PROTECCIÓN DE SESIÓN ──────────────────────────────
  if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'login.html';
    return;
  }

  const userName = sessionStorage.getItem('userName') || 'Usuario';
  const userRole = sessionStorage.getItem('userRole') || 'Empleado';
  const initials = userName.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  // ── TEMA ─────────────────────────────────────────────
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcons(next);
  }

  function updateIcons(theme) {
    const sun  = document.getElementById('nav-icon-sun');
    const moon = document.getElementById('nav-icon-moon');
    const lbl  = document.getElementById('theme-label');
    if (sun)  sun.style.display  = theme === 'dark' ? 'block' : 'none';
    if (moon) moon.style.display = theme === 'dark' ? 'none'  : 'block';
    if (lbl)  lbl.textContent    = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  }

  function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
  }

  // ── LINKS ─────────────────────────────────────────────
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = [
    { href: 'index.html',        icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5L10 3l7 5.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5z"/><path d="M7 18v-6h6v6"/></svg>',   label: 'Inicio' },
    { href: 'noticias.html',     icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>', label: 'Noticias', badge: '3' },
    { href: 'directorio.html',   icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="3"/><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>', label: 'Directorio' },
    { href: 'documentos.html',   icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4M7 9h6M7 12h6M7 15h4"/></svg>', label: 'Documentos' },
    { href: 'servicios-it.html', icon: '<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="2"/><path d="M7 18h6M10 14v4"/></svg>', label: 'Servicios IT' },
  ];

  document.body.insertAdjacentHTML('afterbegin', `
    <aside class="sidebar">
      <a class="sidebar-logo" href="index.html">
        <div class="logo-icon">IT</div>
        <div class="logo-text">
          <span class="logo-name">TechCorp S.L.</span>
          <span class="logo-sub">INTRANET v1.0</span>
        </div>
      </a>
      <nav class="sidebar-nav">
        <span class="nav-section-label">Principal</span>
        ${links.map(l => `<a href="${l.href}" class="nav-link${current===l.href?' active':''}">${l.icon}${l.label}${l.badge?`<span class="nav-badge">${l.badge}</span>`:''}</a>`).join('')}
        <span class="nav-section-label" style="margin-top:8px;">Preferencias</span>
        <button class="nav-link" id="theme-btn" onclick="window.__toggleTheme()" style="background:none;border:none;cursor:pointer;width:100%;text-align:left;">
          <svg id="nav-icon-sun" class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" style="display:none"><circle cx="10" cy="10" r="4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/></svg>
          <svg id="nav-icon-moon" class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M17 12A7 7 0 119 4a5 5 0 008 8z"/></svg>
          <span id="theme-label">Modo oscuro</span>
        </button>
        <button class="nav-link" onclick="window.__logout()" style="background:none;border:none;cursor:pointer;width:100%;text-align:left;color:rgba(255,100,100,0.7);">
          <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3h4a1 1 0 011 1v12a1 1 0 01-1 1h-4M8 14l4-4-4-4M12 10H2"/></svg>
          Cerrar sesión
        </button>
      </nav>
      <div class="sidebar-footer">
        <div class="user-card">
          <div class="avatar">${initials}</div>
          <div class="user-info">
            <div class="user-name">${userName}</div>
            <div class="user-role">${userRole}</div>
          </div>
        </div>
      </div>
    </aside>`);

  window.__toggleTheme = toggleTheme;
  window.__logout = logout;
  updateIcons(savedTheme);

})();