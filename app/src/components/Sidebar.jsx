export default function Sidebar({ t, page, lang, onNavigate, onLangChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>{t.sidebar.title}</h1>
        <p>{t.sidebar.subtitle}</p>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${page === 'medicos' ? 'active' : ''}`}
          onClick={() => onNavigate('medicos')}
        >
          <span className="nav-icon medicos" />
          {t.sidebar.medicos}
        </button>

        <button
          className={`nav-item ${page === 'pacientes' ? 'active' : ''}`}
          onClick={() => onNavigate('pacientes')}
        >
          <span className="nav-icon pacientes" />
          {t.sidebar.pacientes}
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="lang-switcher">
          <button
            className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
            onClick={() => onLangChange('pt')}
          >PT</button>
          <button
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => onLangChange('en')}
          >EN</button>
        </div>
      </div>
    </aside>
  );
}