const PacienteModel = require('../models/pacienteModel');

const PacienteController = {
  async index(req, res) {
    try {
      const pacientes = await PacienteModel.getAll();
      res.json(pacientes);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
  },

  async store(req, res) {
    const { nome, dataNascimento, carteirinha, cpf } = req.body;

    if (!nome || !carteirinha || !cpf) {
      return res.status(422).json({
        error: 'Campos nome, carteirinha e cpf são obrigatórios'
      });
    }

    try {
      await PacienteModel.create({ nome, dataNascimento, carteirinha, cpf });
      res.status(201).json({ message: 'Paciente criado com sucesso' });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'CPF já cadastrado' });
      }
      res.status(500).json({ error: 'Erro ao criar paciente' });
    }
  },
};

module.exports = PacienteController;