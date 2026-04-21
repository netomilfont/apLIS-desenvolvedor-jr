const express        = require('express');
const cors           = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/pacientes', pacienteRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Backend Node rodando na porta ${PORT}`);
});