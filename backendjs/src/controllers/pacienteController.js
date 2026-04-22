const PacienteModel = require('../models/pacienteModel');
const getMessages   = require('../config/messages');

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  return true;
}

const PacienteController = {
  async index(req, res) {
    try {
      const pacientes = await PacienteModel.getAll();
      res.json(pacientes);
    } catch (err) {
      const msg = getMessages(req);
      res.status(500).json({ error: msg.serverErr });
    }
  },

  async show(req, res) {
    const msg = getMessages(req);
    try {
      const paciente = await PacienteModel.getById(req.params.id);
      if (!paciente) {
        return res.status(404).json({ error: msg.notFound });
      }
      res.json(paciente);
    } catch (err) {
      res.status(500).json({ error: msg.serverErr });
    }
  },

  async store(req, res) {
    const msg = getMessages(req);
    const { nome, dataNascimento, carteirinha, cpf } = req.body;

    if (!nome || !carteirinha || !cpf) {
      return res.status(422).json({ error: msg.required });
    }

    if (!validarCPF(cpf)) {
      return res.status(422).json({ error: 'CPF inválido' });
    }

    try {
      await PacienteModel.create({ nome, dataNascimento, carteirinha, cpf });
      res.status(201).json({ message: msg.created });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: msg.dupCpf });
      }
      res.status(500).json({ error: msg.serverErr });
    }
  },

  async update(req, res) {
    const msg = getMessages(req);
    const { nome, dataNascimento, carteirinha, cpf } = req.body;

    if (!nome || !carteirinha || !cpf) {
      return res.status(422).json({ error: msg.required });
    }

    if (!validarCPF(cpf)) {
      return res.status(422).json({ error: 'CPF inválido' });
    }

    try {
      const exists = await PacienteModel.getById(req.params.id);
      if (!exists) {
        return res.status(404).json({ error: msg.notFound });
      }

      await PacienteModel.update(req.params.id, { nome, dataNascimento, carteirinha, cpf });
      res.json({ message: msg.updated });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: msg.dupCpf });
      }
      res.status(500).json({ error: msg.serverErr });
    }
  },

  async destroy(req, res) {
    const msg = getMessages(req);
    try {
      const exists = await PacienteModel.getById(req.params.id);
      if (!exists) {
        return res.status(404).json({ error: msg.notFound });
      }

      await PacienteModel.delete(req.params.id);
      res.json({ message: msg.deleted });
    } catch (err) {
      res.status(500).json({ error: msg.serverErr });
    }
  },
};

module.exports = PacienteController;