import { useState, useEffect } from 'react';
import medicoService from '../services/medicoService';
import Modal from '../components/Modal';

export default function MedicosPage({ t }) {
  const tm = t.medicos;
  const [medicos, setMedicos]     = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState({ nome: '', CRM: '', UFCRM: '' });
  const [error, setError]         = useState('');
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await medicoService.getAll();
      setMedicos(data);
      setFiltered(data);
    } catch {
      showToast(t.common.error, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(medicos.filter(m =>
      m.nome.toLowerCase().includes(q) ||
      m.CRM.toLowerCase().includes(q) ||
      m.UFCRM.toLowerCase().includes(q)
    ));
  }, [search, medicos]);

  const openNew = () => {
    setEditing(null);
    setForm({ nome: '', CRM: '', UFCRM: '' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({ nome: m.nome, CRM: m.CRM, UFCRM: m.UFCRM });
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(tm.confirmDelete)) return;
    try {
      const { data } = await medicoService.remove(id);
      showToast(data.message);
      load();
    } catch {
      showToast(t.common.error, 'error');
    }
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.CRM || !form.UFCRM) {
      setError('Preencha todos os campos.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const { data } = editing
      ? await medicoService.update(editing.id, form)
      : await medicoService.create(form);
      showToast(data.message);
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.error || t.common.error);
    } finally {
      setSaving(false);
    }
  };

  const badgeClass = (uf) => {
    const map = { CE: 'badge-ce', SP: 'badge-sp', RJ: 'badge-rj', MG: 'badge-mg' };
    return map[uf?.toUpperCase()] || 'badge-default';
  };

  const estados = [...new Set(medicos.map(m => m.UFCRM))].length;

  return (
    <>
      <div className="topbar">
        <div className="topbar-info">
          <h2>{tm.title}</h2>
          <p>{tm.subtitle}</p>
        </div>
        <button className="btn-primary" onClick={openNew}>{tm.newBtn}</button>
      </div>

      <div className="page-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="label">{tm.total}</div>
            <div className="value blue">{medicos.length}</div>
          </div>
          <div className="stat-card">
            <div className="label">{tm.estados}</div>
            <div className="value">{estados}</div>
          </div>
          <div className="stat-card">
            <div className="label">CRM</div>
            <div className="value green">{medicos[medicos.length - 1]?.CRM || '—'}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{medicos.length} {tm.title}</h3>
            <input
              className="search-input"
              placeholder={tm.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="table-wrap">
            {loading ? (
              <div className="loading">{t.common.loading}</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">{tm.empty}</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>{tm.tableNome}</th>
                    <th>{tm.tableCRM}</th>
                    <th>{tm.tableUF}</th>
                    <th>{tm.tableAcoes}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(m => (
                    <tr key={m.id}>
                      <td>{m.nome}</td>
                      <td>{m.CRM}</td>
                      <td><span className={`badge ${badgeClass(m.UFCRM)}`}>{m.UFCRM}</span></td>
                      <td>
                        <div className="actions">
                          <button className="btn-edit"   onClick={() => openEdit(m)}>{tm.editar}</button>
                          <button className="btn-delete" onClick={() => handleDelete(m.id)}>{tm.excluir}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          title={editing ? tm.modalTitleEdit : tm.modalTitleNew}
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>{tm.cancelar}</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? '...' : tm.salvar}
              </button>
            </>
          }
        >
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label>{tm.tableNome}</label>
            <input className="form-input" placeholder={tm.nomePlaceholder}
              value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          </div>
          <div className="form-group">
            <label>{tm.tableCRM}</label>
            <input className="form-input" placeholder={tm.crmPlaceholder}
              value={form.CRM} onChange={e => setForm({ ...form, CRM: e.target.value })} />
          </div>
          <div className="form-group">
            <label>{tm.tableUF}</label>
            <input className="form-input" placeholder={tm.ufPlaceholder} maxLength={2}
              value={form.UFCRM} onChange={e => setForm({ ...form, UFCRM: e.target.value.toUpperCase() })} />
          </div>
        </Modal>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  );
}