import { apiPHP } from './api';

const BASE = '/api/v1/medicos';

const medicoService = {
  getAll:          ()         => apiPHP.get(BASE),
  getById:         (id)       => apiPHP.get(`${BASE}/${id}`),
  create:          (data)     => apiPHP.post(BASE, data),
  update:          (id, data) => apiPHP.put(`${BASE}/${id}`, data),
  remove:          (id)       => apiPHP.delete(`${BASE}/${id}`),
};

export default medicoService;