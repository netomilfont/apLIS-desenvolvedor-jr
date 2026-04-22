import { apiNode } from './api';

const BASE = '/api/v1/pacientes';

const pacienteService = {
  getAll:  ()         => apiNode.get(BASE),
  getById: (id)       => apiNode.get(`${BASE}/${id}`),
  create:  (data)     => apiNode.post(BASE, data),
  update:  (id, data) => apiNode.put(`${BASE}/${id}`, data),
  remove:  (id)       => apiNode.delete(`${BASE}/${id}`),
};

export default pacienteService;