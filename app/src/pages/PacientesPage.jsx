import { useState, useEffect } from 'react';
import pacienteService from '../services/pacienteService';
import Modal from '../components/Modal';

export default function PacientesPage({ t }) {
  const tp = t.pacientes;
  const [pacientes, setPacientes] = useState([]);
  const [filtered, setFiltered]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm] = useState({ nome: '', dataNascimento: '', carteirinha: '', cpf: '' });
  const [error, setError]   = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await pacienteService.getAll();
      setPacientes(data);
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
    setFiltered(pacientes.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      p.cpf.includes(q) ||
      p.carteirinha.toLowerCase().includes(q)
    ));
  }, [search, pacientes]);

  const openNew = () => {
    setEditing(null);
    setForm({ nome: '', dataNascimento: '', carteirinha: '', cpf: '' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      nome: p.nome,
      dataNascimento: p.dataNascimento ? p.dataNascimento.split('T')[0] : '',
      carteirinha: p.carteirinha,
      cpf: p.cpf,
    });
    setError('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(tp.confirmDelete)) return;
    try {
      const { data } = await pacienteService.remove(id);
      showToast(data.message); 
      load();
    } catch {
      showToast(t.common.error, 'error');
    }
  };

  const handleSubmit = async () => {
    if (!form.nome || !form.carteirinha || !form.cpf) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const { data } = editing
      ? await pacienteService.update(editing.id, form)
      : await pacienteService.create(form);
      showToast(data.message);
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.error || t.common.error);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-info">
          <h2>{tp.title}</h2>
          <p>{tp.subtitle}</p>
        </div>
        <button className="btn-primary" onClick={openNew}>{tp.newBtn}</button>
      </div>

      <div className="page-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="label">{tp.total}</div>
            <div className="value blue">{pacientes.length}</div>
          </div>
          <div className="stat-card">
            <div className="label">{tp.tableCarteirinha}</div>
            <div className="value">{pacientes[pacientes.length - 1]?.carteirinha || '—'}</div>
          </div>
          <div className="stat-card">
            <div className="label">CPF</div>
            <div className="value green">{pacientes.length > 0 ? '✓' : '—'}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>{pacientes.length} {tp.title}</h3>
            <input
              className="search-input"
              placeholder={tp.search}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="table-wrap">
            {loading ? (
              <div className="loading">{t.common.loading}</div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">{tp.empty}</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>{tp.tableNome}</th>
                    <th>{tp.tableNascimento}</th>
                    <th>{tp.tableCarteirinha}</th>
                    <th>{tp.tableCPF}</th>
                    <th>{tp.tableAcoes}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{formatDate(p.dataNascimento)}</td>
                      <td>{p.carteirinha}</td>
                      <td>{p.cpf}</td>
                      <td>
                        <div className="actions">
                          <button className="btn-edit"   onClick={() => openEdit(p)}>{tp.editar}</button>
                          <button className="btn-delete" onClick={() => handleDelete(p.id)}>{tp.excluir}</button>
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
          title={editing ? tp.modalTitleEdit : tp.modalTitleNew}
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>{tp.cancelar}</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? '...' : tp.salvar}
              </button>
            </>
          }
        >
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label>{tp.tableNome} *</label>
            <input className="form-input" placeholder={tp.nomePlaceholder}
              value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          </div>
          <div className="form-group">
            <label>{tp.tableNascimento}</label>
            <input className="form-input" type="date"
              value={form.dataNascimento} onChange={e => setForm({ ...form, dataNascimento: e.target.value })} />
          </div>
          <div className="form-group">
            <label>{tp.tableCarteirinha} *</label>
            <input className="form-input" placeholder={tp.carteirinhaPlaceholder}
              value={form.carteirinha} onChange={e => setForm({ ...form, carteirinha: e.target.value })} />
          </div>
          <div className="form-group">
            <label>CPF *</label>
            <input className="form-input" placeholder={tp.cpfPlaceholder} maxLength={11}
              value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value.replace(/\D/g, '') })} />
          </div>
        </Modal>
      )}

      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </>
  );
}