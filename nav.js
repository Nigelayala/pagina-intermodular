// nav.js — inyecta el sidebar en todas las páginas
(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html',      icon: iconHome,      label: 'Inicio' },
    { href: 'noticias.html',   icon: iconNews,      label: 'Noticias', badge: '3' },
    { href: 'directorio.html', icon: iconDir,       label: 'Directorio' },
    { href: 'documentos.html', icon: iconDocs,      label: 'Documentos' },
    { href: 'servicios-it.html', icon: iconIT,      label: 'Servicios IT' },
  ];

  function iconHome() {
    return `<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5L10 3l7 5.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5z"/><path d="M7 18v-6h6v6"/></svg>`;
  }
  function iconNews() {
    return `<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>`;
  }
  function iconDir() {
    return `<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="3"/><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`;
  }
  function iconDocs() {
    return `<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M12 2v4h4M7 9h6M7 12h6M7 15h4"/></svg>`;
  }
  function iconIT() {
    return `<svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="2"/><path d="M7 18h6M10 14v4"/></svg>`;
  }

  const html = `
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
        ${links.map(l => `
          <a href="${l.href}" class="nav-link${current === l.href ? ' active' : ''}">
            ${l.icon()}
            ${l.label}
            ${l.badge ? `<span class="nav-badge">${l.badge}</span>` : ''}
          </a>`).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="user-card">
          <div class="avatar">AD</div>
          <div class="user-info">
            <div class="user-name">Admin</div>
            <div class="user-role">Administrador</div>
          </div>
        </div>
      </div>
    </aside>`;

  document.body.insertAdjacentHTML('afterbegin', html);
})();
