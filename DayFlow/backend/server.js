const express = require('express');
const app = express();

app.use(express.json());

// Importando rotas
const authRoutes = require('./routes/auth.routes');

app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('🚀 API DayFlow rodando na porta 3000');
});
