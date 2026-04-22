import { useState, useEffect } from 'react';
import translations from './i18n/translations';
import { setLanguageHeader } from './services/api';
import Sidebar from './components/Sidebar';
import MedicosPage from './pages/MedicosPage';
import PacientesPage from './pages/PacientesPage';
import './App.css';

export default function App() {
  const [page, setPage] = useState('medicos');
  const [lang, setLang] = useState('pt');
  const t = translations[lang];

  useEffect(() => {
    setLanguageHeader(lang);
  }, [lang]);

  return (
    <div className="app-layout">
      <Sidebar
        t={t}
        page={page}
        lang={lang}
        onNavigate={setPage}
        onLangChange={setLang}
      />
      <div className="main-content">
        {page === 'medicos'
          ? <MedicosPage t={t} lang={lang} />
          : <PacientesPage t={t} lang={lang} />
        }
      </div>
    </div>
  );
}