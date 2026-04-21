const db = require('../config/database');

const PacienteModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT id, nome, dataNascimento, carteirinha, cpf FROM pacientes ORDER BY id'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT id, nome, dataNascimento, carteirinha, cpf FROM pacientes WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create({ nome, dataNascimento, carteirinha, cpf }) {
    const [result] = await db.query(
      'INSERT INTO pacientes (nome, dataNascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)',
      [nome, dataNascimento || null, carteirinha, cpf]
    );
    return result;
  },

  async update(id, { nome, dataNascimento, carteirinha, cpf }) {
    const [result] = await db.query(
      `UPDATE pacientes 
       SET nome = ?, dataNascimento = ?, carteirinha = ?, cpf = ?
       WHERE id = ?`,
      [nome, dataNascimento || null, carteirinha, cpf, id]
    );
    return result;
  },

  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM pacientes WHERE id = ?',
      [id]
    );
    return result;
  },
};

module.exports = PacienteModel;