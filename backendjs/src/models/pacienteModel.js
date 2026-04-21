const db = require('../config/database');

const PacienteModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT id, nome, dataNascimento, carteirinha, cpf FROM pacientes ORDER BY id'
    );
    return rows;
  },

  async create({ nome, dataNascimento, carteirinha, cpf }) {
    const [result] = await db.query(
      'INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)',
      [nome, dataNascimento || null, carteirinha, cpf]
    );
    return result;
  },
};

module.exports = PacienteModel;