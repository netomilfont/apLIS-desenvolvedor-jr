const messages = {
  pt: {
    created:   'Paciente criado com sucesso',
    updated:   'Paciente atualizado com sucesso',
    deleted:   'Paciente deletado com sucesso',
    notFound:  'Paciente não encontrado',
    dupCpf:    'CPF já cadastrado',
    required:  'Campos nome, carteirinha e cpf são obrigatórios',
    serverErr: 'Erro interno do servidor',
  },
  en: {
    created:   'Patient created successfully',
    updated:   'Patient updated successfully',
    deleted:   'Patient deleted successfully',
    notFound:  'Patient not found',
    dupCpf:    'CPF already registered',
    required:  'Fields nome, carteirinha and cpf are required',
    serverErr: 'Internal server error',
  },
};

function getMessages(req) {
  const lang = (req.headers['accept-language'] || 'pt')
    .toLowerCase()
    .startsWith('en') ? 'en' : 'pt';
  return messages[lang];
}

module.exports = getMessages;