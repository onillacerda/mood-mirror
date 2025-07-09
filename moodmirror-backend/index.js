const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const moodRoutes = require('./routes/moodRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

app.use('/api/moods', moodRoutes);

app.get('/', (req, res) => {
  res.send('MoodMirror API rodando 🚀');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
});
